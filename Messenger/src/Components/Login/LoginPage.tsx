import React, {useState} from "react";
import {LoginBlock, LoginWrapper} from "./LoginPage.styled"
import {Form, Input, Button, Checkbox, PageHeader, Alert} from 'antd'
import {NullableType} from "../../Types/Types";
import {useDispatch, useSelector} from "react-redux";
import {ActivateAuthSaga} from "../../Redux/Sagas/AuthSaga";
import App from "../../App";
import {AppStateType} from "../../Redux/Store";


export const LoginPage: React.FC = () => {
    const [Page, SetPage] = useState<'UP' | 'IN'>('IN')
    return <LoginWrapper>
        {Page === 'UP'? <Up SetPage={SetPage}/> : <In SetPage={SetPage}/>}
    </LoginWrapper>
}




type InUpPropsType = {
    SetPage: (page: 'UP' | 'IN') => void
}
type LoginValuesType = {
    password: string
    remember: boolean
    username: string
}

const In: React.FC<InUpPropsType> = ({SetPage}) => {
    const dispatch = useDispatch()
    const onFinish = (values: LoginValuesType) => {
        dispatch(ActivateAuthSaga.Login(values.password, values.username))
    };
    const ErrorMessage = useSelector((state: AppStateType) => state.Auth.error)

    return <LoginBlock>
        {ErrorMessage && <Alert message="Error" description={ErrorMessage} type="error" showIcon/>}
        <PageHeader title={'LoginPage'}/>
        <Form name="basic"
              initialValues={{remember: true}} onFinish={onFinish} autoComplete="off">
            <Form.Item
                label="Username"
                name="username"
                rules={[{required: true, message: 'Please input your username!'}]}>
                <Input />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[{required: true, message: 'Please input your password!'}]}>
                <Input.Password />
            </Form.Item>

            <Form.Item name="remember" valuePropName="checked">
                <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item>
                <Button disabled={!!ErrorMessage} type="primary" htmlType="submit">
                    LogIn
                </Button>
            </Form.Item>
        </Form>
        <div>
            You have not account? Let`s create!
        </div>
        <Button type="link" onClick={() => SetPage('UP')}>
            LogUp
        </Button>
    </LoginBlock>
}


type ValuesType = {
    RepeatPassword: undefined | string
    password: undefined | string
    username: undefined | string
}
const Up: React.FC<InUpPropsType> = ({SetPage}) => {
    const [Error, SetError] = useState<NullableType<string>>(null)
    const onFinish = (values: ValuesType) => {
        if (values.RepeatPassword !== values.password){
            SetError('You don`t repeat password!')
            setTimeout(() => SetError(null), 5000)
        } else console.log('success')
    };

    const onFinishFailed = (errorInfo: {values:ValuesType}) => {
        console.log('Failed:', errorInfo);
    };
    return <LoginBlock>
        {Error && <Alert message="Error" description={Error} type="error" showIcon/>}
        <PageHeader title={'LogupPage'}/>
        <Form name="basic"
              initialValues={{remember: true}} onFinish={onFinish} onFinishFailed={onFinishFailed}
              autoComplete="off">
            <Form.Item
                label="Think of username"
                name="username"
                rules={[{required: true, message: 'Please input your username!'}]}>
                <Input />
            </Form.Item>

            <Form.Item
                label="Сome up with a password"
                name="password"
                rules={[{required: true, message: 'Please input your password!'}]}>
                <Input.Password />
            </Form.Item>

            <Form.Item
                label="Please repeat the password"
                name="RepeatPassword"
                rules={[{required: true, message: 'Please input your password!'}]}>
                <Input.Password />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit">
                    LogUp
                </Button>
            </Form.Item>
        </Form>
        <Button type="link" onClick={() => SetPage('IN')}>
            Back
        </Button>
    </LoginBlock>
}