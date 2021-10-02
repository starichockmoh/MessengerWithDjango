import {call, put, SagaReturnType, take, delay, fork, takeEvery} from "redux-saga/effects"
import {authAPI} from "../../Api/AuthAPI";
import {AuthAC} from "../Reducers/AuthReducer";
import {AppAC} from "../Reducers/AppReducer";
import {ProfileAC} from "../Reducers/ProfileReducer";
import {ChannelListsAC} from "../Reducers/ChannelListsReducer";
import {DialogsAC} from "../Reducers/DialogsReducer";
import {ContentAC} from "../Reducers/ContentReducer";

export const ActivateAuthSaga = {
    Login: (password: string, name: string) => ({type: "AUTH_SAGAS/LOGIN", password, name} as const),
    Logout: () => ({type: "AUTH_SAGAS/LOGOUT"} as const),
    Auth: () => ({type: "AUTH_SAGAS/AUTH"} as const)
}

type LoginData = SagaReturnType<typeof authAPI.login>
type AuthData = SagaReturnType<typeof authAPI.auth>

export function* WatchLoginSaga() {
    while (true) {
        const {password, name} = yield take("AUTH_SAGAS/LOGIN")
        try {
            const data: LoginData = yield call(authAPI.login, name, password)
            yield call(() => localStorage.setItem('token', data.data.access))

        } catch (error) {
            yield put(AuthAC.SetError(error.message))
            yield delay(5000)
            yield put(AuthAC.SetError(''))
        }
        yield call(AuthSagaWorker)
    }
}


export function* WatchAuthSaga() {
    yield takeEvery("AUTH_SAGAS/AUTH", AuthSagaWorker)
}




export function* AuthSagaWorker() {
    if (!!localStorage.getItem('token')) {
        try {
            const data: AuthData = yield call(authAPI.auth)
            if (data.status === 200) {
                yield put(ProfileAC.SetAuthProfile(data.data))
                yield put(AuthAC.SetAuth(true))
                yield put(AppAC.SetInit(true))
            }
        } catch (error) {
            console.log(error) //Show error on screen
        }
    } else {
        yield put(AppAC.SetInit(true))
    }
}

export function* WatchLogoutSaga() {
    while (true) {
        yield take("AUTH_SAGAS/LOGOUT")
        yield call(() => localStorage.removeItem('token'))
        yield call(() => sessionStorage.clear())
        yield put(ChannelListsAC.SetChannels(null))
        yield put(ChannelListsAC.SetDetails(null))
        yield put(DialogsAC.SetDialogs(null))
        yield put(DialogsAC.SetDialogUser(null))
        yield put(DialogsAC.SetDetails(null))
        yield put(ContentAC.SetContentState(null))
        yield put(AuthAC.SetAuth(false))
    }
}