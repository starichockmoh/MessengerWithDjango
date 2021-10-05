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
import {useDispatch} from "react-redux";
import {StartChatSagaActions} from "../../../Redux/Sagas/CommentsSaga";



export const DialogInput: React.FC<{DialogID: number}> = ({DialogID}) => {
    const dispatch = useDispatch()

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
            ws = new WebSocket('ws://localhost:8000/ws/thread/5/')
            ws.addEventListener('close', CloseHandler)
            ws.addEventListener('error', ErrorHandler)
            ws.addEventListener('open', OpenHandler)
            ws.addEventListener('message', MessageHandler)
            SetWs(ws)
        }
        create()
        return () => {
            ws?.removeEventListener('open', OpenHandler)
            ws?.removeEventListener('error', ErrorHandler)
            ws?.removeEventListener('close', CloseHandler)
            ws?.removeEventListener('message', MessageHandler)
            ws?.close()
        }

    }, [])

    const SendMessage = () => {
        wsChannel?.send(JSON.stringify({
            'text': InputValue
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
