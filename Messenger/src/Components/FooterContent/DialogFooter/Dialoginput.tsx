import React, {ChangeEvent, useEffect, useState} from "react";
import {
    AudioIcon,
    DialogInputBlock,
    DialogInputButton,
    DialogTextArea,
    PaperClipIcon, SendIcon,
    SmileIcon
} from "./Dialoginput.styled"
import {ActivateDialogsSaga} from "../../../Redux/Sagas/DialogsSaga";
import {useDispatch, useSelector} from "react-redux";
import {StartChatSagaActions} from "../../../Redux/Sagas/MessagesWSSaga";
import {AppStateType} from "../../../Redux/Store";
import {DialogsAC} from "../../../Redux/Reducers/DialogsReducer";
import {Form, Upload} from "antd";
import {EditAvatarButton} from "../../EditProfile/EditProfile.styled";
import {DialogUpload} from "./DialogUpload";


export const DialogInput: React.FC<{ DialogID: number }> = () => {
    const dispatch = useDispatch()

    const UserName = useSelector((state: AppStateType) => state.Profile.AuthProfile?.username)
    const DialogID = useSelector((state: AppStateType) => state.Dialogs.CurrentDialog?.pk)
    const LayOutColor = useSelector((state: AppStateType) => state.App.LayOutColor)

    const [form] = Form.useForm()

    const onFinish = (values: any) => {
        if (UserName) {
            dispatch(StartChatSagaActions.SendMessageAC(values.dialog_input_text, UserName))
                // , values.dialog_input_photos.fileList[0]))
        }
        form.resetFields()
    }

    const [isUploading, SetUploading] = useState(false)


    return <DialogInputBlock name={'dialog_input'} onFinish={onFinish} form={form} color={LayOutColor}>
        <Form.Item>
                <DialogInputButton onClick={() => SetUploading(true)} type={"link"} icon={<PaperClipIcon/>}/>
        </Form.Item>
        <Form.Item name={"dialog_input_text"}>
            <DialogTextArea
                bordered={false}
                autoSize={{maxRows: 1}}
                placeholder={'Write a message...'}/>
        </Form.Item>
        <Form.Item name={"dialog_input_smiles"}>
            <DialogInputButton type={"link"} icon={<SmileIcon/>}/>
        </Form.Item>
        <Form.Item
            noStyle
            shouldUpdate={(prevValues, currentValues) => prevValues.dialog_input_text !== currentValues.dialog_input_text}>
            {({getFieldValue}) => {
                return getFieldValue('dialog_input_text')
                    ? <DialogInputButton htmlType={"submit"} type={"link"} icon={<SendIcon/>}/>
                    : <DialogInputButton type={"link"} icon={<AudioIcon/>}/>
            }}
        </Form.Item>
        {/*<Form.Item noStyle shouldUpdate={isUploading}>*/}
        {/*    {() => {*/}
        {/*        return <DialogUpload/>*/}
        {/*    }}*/}
        {/*</Form.Item>*/}

    </DialogInputBlock>
}
