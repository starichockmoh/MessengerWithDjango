import React, {StrictMode, useEffect} from "react";
import {Provider, useDispatch, useSelector} from "react-redux";
import store, {AppStateType} from "./Redux/Store";
import {BrowserRouter, withRouter} from "react-router-dom";
import {Layout} from "./Components/Layout/Layout";
import "./Components/LeftSideBar/AnimationSideBar.css"
import {LeftSideBar} from "./Components/LeftSideBar/LeftSideBar";
import {ActivateAuthSaga} from "./Redux/Sagas/AuthSaga";
import Login from "./Components/Login/Login";


const App = () => {
    const isAuth = useSelector((state: AppStateType) => state.Auth.isAuth)
    const isInit  = useSelector((state: AppStateType) => state.App.isInit)
    const LayOutColor  = useSelector((state: AppStateType) => state.App.LayOutColor)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(ActivateAuthSaga.Auth())
    }, [])

    if (!isInit) return <div>
        Init...
    </div>
    if (isAuth && isInit) return <div style={{color: LayOutColor === "white" ? "black" : "white"}}>
        <LeftSideBar/>
        <Layout/>
    </div>
    return <Login/>
}
const AppRouter = withRouter(App)
const AppContainer = () => {
    return <StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <AppRouter/>
            </BrowserRouter>
        </Provider>
    </StrictMode>
}
export default AppContainer