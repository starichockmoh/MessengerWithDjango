import React, {useEffect, useState} from 'react';
import {LoginBlock, LoginStyled} from "./Login.styled";
import img from "../../Assets/LogImg.png"
import {useSelector} from "react-redux";
import {AppStateType} from "../../Redux/Store";
import {Alert, notification} from "antd";
import {LogForm} from "./LogForm";
import RegForm from "./RegForm";
import {Logo} from "./Logo";

const openNotification = (message: string) => {
    notification.open({
        message: 'Error was occurred',
        description: <Alert message={message} type="error" showIcon/>
    });
};

export const Login: React.FC = () => {
    const Page = useSelector((state: AppStateType) => state.Auth.current_page)
    const ErrorMessage = useSelector((state: AppStateType) => state.Auth.error)
    useEffect(() => {
        ErrorMessage && openNotification(ErrorMessage)
    },[ErrorMessage])

    return (
        <LoginStyled>
            <Logo/>
            <LoginBlock>
                {Page === 'IN'? <LogForm/> : <RegForm/>}
                <img className={"LogImg"} src={img} alt={'This is picture'}/>
            </LoginBlock>
        </LoginStyled>
    );
}

export default Login;