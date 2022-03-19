import React from 'react';
import {Button, Form, Image} from "antd";
import {RegInput} from "./RegInput";
import {LoginFormStyled} from "./Login.styled";
import img from "../../Assets/LogImgTwo.png";
import { useDispatch } from 'react-redux';
import {ActivateAuthSaga} from "../../Redux/Sagas/AuthSaga";
import {AuthAC} from "../../Redux/Reducers/AuthReducer";

type ValuesType = {
    name: string
    password: string
}


export const LogForm: React.FC = () => {
    const dispatch = useDispatch()
    const onFinish = (values: ValuesType) => {
        dispatch(ActivateAuthSaga.Login(values.password, values.name))
    };
    return (
        <LoginFormStyled>
            <div className={"LogImgTwoBlock"}>
                <Image preview={false} className={"LogImgTwo"} src={img}/>
            </div>
            <Form name="normal_login" className="login-form" onFinish={onFinish}>
                <span className={"input_name"}>ЛОГИН</span>
                <RegInput placeholder={'Введите имя пользователя'} item_name={"name"}/>
                <span className={"input_name"}>ПАРОЛЬ</span>
                <RegInput placeholder={'Введите пароль'} is_password={true} item_name={"password"}/>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Войти
                    </Button>
                </Form.Item>
                <Button className={"exit-button"} onClick={() => dispatch(AuthAC.SetPage('UP'))}>
                    Зарегестрироваться
                </Button>
            </Form>

        </LoginFormStyled>
    );
}




