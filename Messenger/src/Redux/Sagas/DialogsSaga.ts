import {call, put, SagaReturnType, take, takeEvery} from "redux-saga/effects";
import {profileAPI} from "../../Api/ProfileAPI";
import {ProfileAC} from "../Reducers/ProfileReducer";
import {ChangedProfileType} from "../../Types/Types";
import {dialogsAPI} from "../../Api/DialogsAPI";
import {DialogsAC} from "../Reducers/DialogsReducer";



export const ActivateDialogsSaga = {
    Dialogs: (is_archive: boolean) => ({type: "DIALOGS_SAGAS/GET_DIALOGS", is_archive} as const),

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


