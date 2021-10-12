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
    const [InputValue, SetInputValue] = useState('')


    const onInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        SetInputValue(e.target.value)
    }


    const SendMessage = () => {
        if (UserName) {
            dispatch(StartChatSagaActions.SendMessageAC(InputValue, UserName))
            SetInputValue('')
        }
    }


    return <DialogInputBlock name={'dialog_input'}>
        <Form.Item name={'dialog_input_photos'}>
            <Upload name="dialog_input_photos" maxCount={10} listType={"text"}>
                <DialogInputButton type={"link"} icon={<PaperClipIcon/>}/>
            </Upload>
        </Form.Item>
        <Form.Item name={"dialog_input_text"}>
            <DialogTextArea
                // onChange={onInputChange}
                // value={InputValue}
                bordered={false}
                autoSize={{maxRows: 1}}
                placeholder={'Write a message...'}/>
        </Form.Item>
        <Form.Item name={"dialog_input_smiles"}>
            <DialogInputButton type={"link"} icon={<SmileIcon/>}/>
        </Form.Item>
        <Form.Item>
            {InputValue
                ? <DialogInputButton onClick={SendMessage} type={"link"} icon={<SendIcon/>}/>
                : <DialogInputButton type={"link"} icon={<AudioIcon/>}/>}
        </Form.Item>
        {/*<DialogUpload/>*/}
    </DialogInputBlock>
}
