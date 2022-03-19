import {call, put, SagaReturnType, take, delay, takeEvery} from "redux-saga/effects"
import {authAPI} from "../../Api/AuthAPI";
import {AuthAC} from "../Reducers/AuthReducer";
import {AppAC} from "../Reducers/AppReducer";
import {ProfileAC} from "../Reducers/ProfileReducer";
import {ChannelListsAC} from "../Reducers/ChannelListsReducer";
import {DialogsAC} from "../Reducers/DialogsReducer";
import {ContentAC} from "../Reducers/ContentReducer";
import {AuthUserProfileType} from "../../Types/Types";

export const ActivateAuthSaga = {
    Login: (password: string, name: string) => ({type: "AUTH_SAGAS/LOGIN", password, name} as const),
    Logout: () => ({type: "AUTH_SAGAS/LOGOUT"} as const),
    Auth: () => ({type: "AUTH_SAGAS/AUTH"} as const),
    AppTheme: (theme: string) => ({type: "AUTH_SAGAS/APP_THEME", theme} as const),
    Registr: (username:string, password:string, email:string) => ({type: "AUTH_SAGAS/REGISTR", username, password, email} as const)
}

type LoginData = SagaReturnType<typeof authAPI.login>
type AuthData = SagaReturnType<typeof authAPI.auth>

export function* WatchLoginSaga() {
    while (true) {
        const {password, name} = yield take("AUTH_SAGAS/LOGIN")
        try {
            const data: LoginData = yield call(authAPI.login, name, password)
            yield call(() => localStorage.setItem('token', data.data.access))

        } catch (error: any) {
            yield put(AuthAC.SetError(error.message))
            yield delay(5000)
            yield put(AuthAC.SetError(''))
        }
        yield call(AppThemeSagaWorker)
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

export function* WatchRegistrSaga() {
    while (true) {
        const {username, password, email} = yield take("AUTH_SAGAS/REGISTR")
        try{
            const data: AuthUserProfileType = yield call(authAPI.registr, username,password,email)
            yield put(AuthAC.SetCreatedUser(true))
            yield put(AuthAC.SetCreatedUser(false))
            console.log(data)
        }catch (e){

        }
    }
}

export function* WatchAppThemeSaga() {
    while (true) {
        const {theme} = yield take("AUTH_SAGAS/APP_THEME")
        try {
            yield call(() => localStorage.setItem('app_theme', theme))
            yield call(AppThemeSagaWorker)
        } catch (error: any) {

        }

    }
}


export function* AppThemeSagaWorker() { //стартовая инициализация темы
    let Theme = localStorage.getItem("app_theme")

    if (!Theme) {
        yield call(() => localStorage.setItem('app_theme', "day"))
        Theme = "day"
    }
    yield put(AppAC.SetTheme(Theme))
}