import React, {StrictMode, useEffect} from "react";
import {Provider, useDispatch, useSelector} from "react-redux";
import store, {AppStateType} from "./Redux/Store";
import {BrowserRouter, withRouter} from "react-router-dom";
import {Layout} from "./Components/Layout/Layout";
import "./Components/LeftSideBar/AnimationSideBar.css"
import {LeftSideBar} from "./Components/LeftSideBar/LeftSideBar";
import {LoginPage} from "./Components/Login/LoginPage";
import {ActivateAuthSaga} from "./Redux/Sagas/AuthSaga";


const App = () => {
    const isAuth = useSelector((state: AppStateType) => state.Auth.isAuth)
    const isInit  = useSelector((state: AppStateType) => state.App.isInit)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(ActivateAuthSaga.Auth())
    }, [])

    if (!isInit) return <div>
        Init...
    </div>
    if (isAuth && isInit) return <>
        <LeftSideBar/>
        <Layout/>
    </>
    return <LoginPage/>
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