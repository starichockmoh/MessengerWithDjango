import {call, put, SagaReturnType, take, takeEvery} from "redux-saga/effects";
import {profileAPI} from "../../Api/ProfileAPI";
import {ProfileAC} from "../Reducers/ProfileReducer";
import {ChangedProfileType} from "../../Types/Types";
import {dialogsAPI} from "../../Api/DialogsAPI";
import {DialogsAC} from "../Reducers/DialogsReducer";
import {ContentAC} from "../Reducers/ContentReducer";


export const ActivateDialogsSaga = {
    Dialogs: (is_archive: boolean) => ({type: "DIALOGS_SAGAS/GET_DIALOGS", is_archive} as const),
    Details: (ID: number) => ({type: "DIALOGS_SAGAS/GET_DETAILS", ID} as const),

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

export function* WatchDialogsDetailsSaga() {
    while (true) {
        const {ID}: {ID: number} = yield take("DIALOGS_SAGAS/GET_DETAILS")
        try {
            const data: DialogsDetailsType = yield call(dialogsAPI.get_details, ID)
            if (data.status < 300) {
                sessionStorage.removeItem('CurrentChannelID')
                sessionStorage.setItem('CurrentDialogID', String(ID))
                yield put(DialogsAC.SetDetails(data.data))
                yield put(ContentAC.SetContentState("MESSAGES"))
            }
        } catch (error) {
            console.log(error)
        }
    }
}


