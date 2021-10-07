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



export const DialogInput: React.FC<{DialogID: number}> = () => {
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


    return <DialogInputBlock>
        <DialogInputButton type={"link"} icon = {<PaperClipIcon/>}/>
        <DialogTextArea onChange={onInputChange}
                        value={InputValue} bordered={false}
                        autoSize={{maxRows: 1}}
                        placeholder={'Write a message...'}/>
        <DialogInputButton type={"link"} icon = {<SmileIcon/>}/>
        {InputValue
            ? <DialogInputButton onClick={SendMessage} type={"link"} icon = {<SendIcon/>}/>
            : <DialogInputButton type={"link"} icon = {<AudioIcon/>}/>}
    </DialogInputBlock>
}
