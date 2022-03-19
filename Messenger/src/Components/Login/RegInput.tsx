import React, {useState} from "react";
import {Form} from "antd";
import {InputField, InputPassword} from "./Login.styled";
import {EyeInvisibleOutlined, EyeTwoTone} from "@ant-design/icons";

type RegInputPropsType = {
    is_password?: boolean
    placeholder: string
    item_name: string
}

export const RegInput: React.FC<RegInputPropsType> = ({is_password, placeholder, item_name}) => {
    const [is_focus, SetStatus] = useState(false)

    const settings = {
        bordered: false,
        onFocus: () => SetStatus(true),
        onBlur: () => SetStatus(false),
        placeholder: placeholder,
        autoComplete: 'new-password',
        style: {background: is_focus ? "#F8F8F8" : "rgba(239,239,239,1)"}
    }

    return <Form.Item rules={[{required: true, message: `Please input your ${item_name}!`,},]} name={item_name}>
        {is_password ?
            <InputPassword{...settings} iconRender={visible => (visible ? <EyeTwoTone/> : <EyeInvisibleOutlined/>)}/> :
            <InputField {...settings}/>}
    </Form.Item>
}
