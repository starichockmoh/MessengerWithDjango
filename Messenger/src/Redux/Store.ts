import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunkMiddleware from "redux-thunk";
import createSagaMiddleware from "redux-saga"
import {all,spawn} from "redux-saga/effects";
import {AppReducer} from "./Reducers/AppReducer";
import {ChannelInfoReducer} from "./Reducers/ChannelInfoReducer";
import {ChannelListsReducer} from "./Reducers/ChannelListsReducer";
import {AuthReducer} from "./Reducers/AuthReducer";
import {WatchAuthSaga, WatchLoginSaga, WatchLogoutSaga} from "./Sagas/AuthSaga";
import {ProfileReducer} from "./Reducers/ProfileReducer";
import {WatchAddProfilePhotoSaga, WatchProfileChangeSaga, WatchProfileSaga} from "./Sagas/ProfileSaga";
import {DialogsReducer} from "./Reducers/DialogsReducer";
import {WatchDialogsDetailsSaga, WatchDialogsSaga} from "./Sagas/DialogsSaga";
import {
    WatchChannelDetailsSaga,
    WatchChannelsSaga,
    WatchCreateChannelSaga,
    WatchCreatePostSaga
} from "./Sagas/ChannelsSaga";
import {ContentReducer} from "./Reducers/ContentReducer";
import {
    MessagesWSSagaWatcher,
    ReceiveMessageSagaWatcher,
    SendMessageWSSagaWatcher,
    StopMessagesSagaWatcher
} from "./Sagas/MessagesWSSaga";




const MainReducer = combineReducers({
    App: AppReducer,
    ChannelInfo: ChannelInfoReducer,
    ChannelLists: ChannelListsReducer,
    Auth: AuthReducer,
    Profile: ProfileReducer,
    Dialogs: DialogsReducer,
    Content: ContentReducer,
})

export type AppStateType = ReturnType<typeof MainReducer>
const sagaMiddleware = createSagaMiddleware()
// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(MainReducer, composeEnhancers(applyMiddleware(
    thunkMiddleware,
    sagaMiddleware
)));

function* rootSaga() {
    yield all([
        spawn(WatchAuthSaga),
        spawn(WatchLoginSaga),
        spawn(WatchLogoutSaga),
        spawn(WatchProfileSaga),
        spawn(WatchProfileChangeSaga),
        spawn(WatchDialogsSaga),
        spawn(WatchChannelsSaga),
        spawn(WatchChannelDetailsSaga),
        spawn(WatchDialogsDetailsSaga),
        spawn(WatchCreateChannelSaga),
        spawn(WatchCreatePostSaga),
        spawn(MessagesWSSagaWatcher),
        spawn(SendMessageWSSagaWatcher),
        spawn(StopMessagesSagaWatcher),
        spawn(ReceiveMessageSagaWatcher),
        spawn(WatchAddProfilePhotoSaga)
    ])
}
sagaMiddleware.run(rootSaga)

export default store

// @ts-ignore
window.__store__ = store