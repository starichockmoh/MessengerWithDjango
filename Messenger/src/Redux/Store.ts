import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunkMiddleware from "redux-thunk";
import createSagaMiddleware from "redux-saga"
import {all} from "redux-saga/effects";
import {AppReducer} from "./Reducers/AppReducer";
import {ChannelInfoReducer} from "./Reducers/ChannelInfoReducer";
import {ChannelListsReducer} from "./Reducers/ChannelListsReducer";


const MainReducer = combineReducers({
    App: AppReducer,
    ChannelInfo: ChannelInfoReducer,
    ChannelLists: ChannelListsReducer,
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
}
sagaMiddleware.run(rootSaga)

export default store

// @ts-ignore
window.__store__ = store