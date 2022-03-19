import React, {useEffect, useState} from 'react';
import {Redirect} from 'react-router-dom';
import {Alert, Button, Form, Image, notification} from "antd";
import {RegInput} from "./RegInput";
import {RegFormStyled} from "./Login.styled";
import img from "../../Assets/LogImgTwo.png";
import {useDispatch, useSelector} from "react-redux";
import {ActivateAuthSaga} from "../../Redux/Sagas/AuthSaga";
import {AuthAC} from "../../Redux/Reducers/AuthReducer";
import {AppStateType} from "../../Redux/Store";



type RegFormType = {
    username:string
    email:string
    password:string
    repeat_password:string
}
const openNotification = (message: string, type: "success" | "info" | "warning" | "error" | undefined, title:string) => {
    notification.open({
        message: title,
        description: <Alert message={message} type={type} showIcon/>
    });
};

export const RegForm: React.FC = () => {
    const dispatch = useDispatch()
    const isSuccess = useSelector((state:AppStateType) => state.Auth.user_created)

    const onFinish = (values: RegFormType) => {
        if (values.password !== values.repeat_password) openNotification('Пароли не совпадают', "error", "Ошибка!")
        else dispatch(ActivateAuthSaga.Registr(values.username,values.password, values.email))
    };

    useEffect(() => {
        if (isSuccess){
            openNotification("Пользователь успешно создан", "success", "Успех!")
            dispatch(AuthAC.SetPage('IN'))
        }

    },[isSuccess])

    return (
        <RegFormStyled>
            <div className={"LogImgTwoBlock"}>
                <Image preview={false} className={"LogImgTwo"} src={img}/>
            </div>
            <Form name="normal_login" className="login-form" onFinish={onFinish}>
                <span className={"input_name"}>ИМЯ</span>
                <RegInput placeholder={'Введите имя'} item_name="username"/>
                <span className={"input_name"}>ПОЧТА</span>
                <RegInput placeholder={'Введите адрес почты'} item_name={"email"}/>
                <span className={"input_name"}>ПАРОЛЬ</span>
                <RegInput placeholder={'Введите пароль'} is_password={true} item_name={"password"}/>
                <span className={"input_name"}>ПОВТОРИТЕ ПАРОЛЬ</span>
                <RegInput placeholder={'Введите пароль'} is_password={true} item_name={"repeat_password"}/>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Зарегистрироваться
                    </Button>
                </Form.Item>
                <Button className={"exit-button"} onClick={() => dispatch(AuthAC.SetPage('IN'))}>
                    Войти
                </Button>

            </Form>
        </RegFormStyled>
    );
}



export default RegForm;