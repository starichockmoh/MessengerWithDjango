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
import {StartChatSagaActions} from "../../../Redux/Sagas/CommentsSaga";
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
    const [wsChannel, SetWs] = useState<WebSocket | null>(null)
    useEffect(() => {
        let ws: WebSocket
        const CloseHandler = () => {
            console.log('CLOSED')
            // setTimeout(create, 3000)
        }
        const OpenHandler = () => {
            console.log("OPEN")
        }
        const MessageHandler = (e: MessageEvent) => {
            dispatch(DialogsAC.SetMessages(e.data))
            console.log(e.data)

        }
        const ErrorHandler = (e: any) => {
            console.log("Error")
        }
        function create() {
            ws?.removeEventListener('close', CloseHandler)
            ws?.removeEventListener('open', OpenHandler)
            ws?.removeEventListener('message', MessageHandler)
            ws?.removeEventListener('error', ErrorHandler)
            ws?.close()
            // ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
            if (DialogID) {
                ws = new WebSocket(`ws://localhost:8000/ws/thread/${DialogID}/`)
                ws.addEventListener('close', CloseHandler)
                ws.addEventListener('error', ErrorHandler)
                ws.addEventListener('open', OpenHandler)
                ws.addEventListener('message', MessageHandler)
                SetWs(ws)
            }
        }
        create()
        return () => {
            ws?.removeEventListener('open', OpenHandler)
            ws?.removeEventListener('error', ErrorHandler)
            ws?.removeEventListener('close', CloseHandler)
            ws?.removeEventListener('message', MessageHandler)
            ws?.close()
        }

    }, [DialogID])

    const SendMessage = () => {
        // wsChannel?.send(InputValue)
        wsChannel?.send(JSON.stringify({
            'text': InputValue,
            'sender' : UserName
        }));
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
