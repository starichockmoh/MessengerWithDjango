import {call, put, SagaReturnType, take, select} from "redux-saga/effects";
import {dialogsAPI} from "../../Api/DialogsAPI";
import {DialogsAC} from "../Reducers/DialogsReducer";
import {ContentAC} from "../Reducers/ContentReducer";
import {ChannelListsAC} from "../Reducers/ChannelListsReducer";
import {AppStateType} from "../Store";
import {profileAPI} from "../../Api/ProfileAPI";


export const ActivateDialogsSaga = {
    Dialogs: (is_archive: boolean) => ({type: "DIALOGS_SAGAS/GET_DIALOGS", is_archive} as const),
    Details: (ID: number) => ({type: "DIALOGS_SAGAS/GET_DETAILS", ID} as const),
    SendMessage: (dialogID: number, text: string) => ({type: "DIALOGS_SAGAS/SEND_MESSAGE", dialogID, text} as const),

}

type DialogsDataType = SagaReturnType<typeof dialogsAPI.get_active_dialogs>

export function* WatchDialogsSaga() {
    while (true) {
        const {is_archive} = yield take("DIALOGS_SAGAS/GET_DIALOGS")
        try {
            if (is_archive) {
                const Dialogs: DialogsDataType = yield call(dialogsAPI.get_archive_dialogs)
                yield put(DialogsAC.SetDialogs(Dialogs.data))
            } else {
                const Dialogs: DialogsDataType = yield call(dialogsAPI.get_active_dialogs)
                yield put(DialogsAC.SetDialogs(Dialogs.data))
            }
        } catch (error) {
            console.log(error)
        }
    }
}

type DialogsDetailsType = SagaReturnType<typeof dialogsAPI.get_details>
type DialogsUserType = SagaReturnType<typeof profileAPI.get_profile>

export function* WatchDialogsDetailsSaga() {
    while (true) {
        const {ID}: { ID: number } = yield take("DIALOGS_SAGAS/GET_DETAILS")
        try {
            const data: DialogsDetailsType = yield call(dialogsAPI.get_details, ID)
            if (data.status < 300) {
                sessionStorage.removeItem('CurrentChannelID')
                sessionStorage.setItem('CurrentDialogID', String(ID))
                const CurrentUserID: number = yield select((state: AppStateType) => state.Profile.AuthProfile?.pk)
                yield put(DialogsAC.SetDetails(data.data))
                yield put(ContentAC.SetContentState("MESSAGES"))
                yield put(ChannelListsAC.SetDetails(null))
                const DialogUserID = data.data.participants[0].pk !== CurrentUserID ? data.data.participants[0].pk : data.data.participants[1].pk
                const DialogUser: DialogsUserType = yield call(profileAPI.get_profile, DialogUserID)
                yield put(DialogsAC.SetDialogUser(DialogUser.data))
            }
        } catch (error) {
            console.log(error)
        }
    }
}

type SendMessageResType = SagaReturnType<typeof dialogsAPI.send_message>
type SendMessageActionType = {
    dialogID: number
    text: string
}
export function* WatchSendMessageSaga() {
    while (true) {
        try {
            const {dialogID, text} : SendMessageActionType = yield take("DIALOGS_SAGAS/SEND_MESSAGE")
            const data: SendMessageResType = yield call(dialogsAPI.send_message, dialogID, text)
            yield put(DialogsAC.SetMessage(data.data))
        } catch (error) {
            console.log(error)
        }
    }
}


