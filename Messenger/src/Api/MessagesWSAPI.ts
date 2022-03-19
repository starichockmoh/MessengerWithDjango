import {CommentType, MessageType} from "../Types/Types";
import {MessagesWSACType, MessagesWSAC} from "../Redux/Reducers/DialogsReducer"
import {eventChannel} from "redux-saga";
import {all} from "redux-saga/effects";
import {ReceiveMessageActionType, StartChatSagaActions} from "../Redux/Sagas/MessagesWSSaga";


let ws: WebSocket | null = null
export type EmitterActionsType = MessagesWSACType | {type: "MESSAGES_WS_SAGA/TRY_TO_RECONNECT"} | ReceiveMessageActionType
type EmitterType = (input: EmitterActionsType) => void
let emitter: EmitterType


type WSResponseMessageType = {
    message: MessageType
}


const MessageHandler = (e: MessageEvent) => {
    let MessagesData: WSResponseMessageType | null = null
    try {
        MessagesData = JSON.parse(e.data)
    } catch(e: any) {
        console.error(`Error parsing : ${e.data}`)
    }
    if (MessagesData) {
        return emitter(StartChatSagaActions.ReceiveMessage(MessagesData.message))
    }
}

const CloseHandler = () => {
    console.log("CLOSED")
    emitter(MessagesWSAC.SetWSStatus("CLOSED"))
    setTimeout(() => emitter({ type: "MESSAGES_WS_SAGA/TRY_TO_RECONNECT"}), 3000)

}

const OpenedHandler = () => {
    console.log("OPENED")
    emitter(MessagesWSAC.SetWSStatus("OPENED"))
}
const ErrorHandler = (e: any) => {
    console.log("ERROR")
    emitter(MessagesWSAC.SetWSStatus("ERROR"))
}

const CleanUp = () => {
    ws?.removeEventListener('close',CloseHandler)
    ws?.removeEventListener('message', MessageHandler)
    ws?.removeEventListener('open', OpenedHandler)
    ws?.removeEventListener('error', ErrorHandler)
    console.log('CLEAN')
    ws?.close()
}


const initWebsocket = (id: number) => {
    return eventChannel((emitt: EmitterType) => {
        emitter = emitt
        CleanUp()
        ws = new WebSocket(`ws://localhost:8000/ws/thread/${id}/`)
        ws.binaryType = "arraybuffer";
        ws.addEventListener('close', CloseHandler)
        ws.addEventListener('open', OpenedHandler)
        ws.addEventListener('error', ErrorHandler)
        ws.addEventListener('message', MessageHandler)
        return () => {

        }
    })
}


export const messagesWSAPI = {
    start(id: number) {
        return initWebsocket(id)
    },
    stop(){
        CleanUp()
    },
    sendMessage(text: string, sender: string, photo: any){
        ws?.send(JSON.stringify({
                    'text': text,
                    'sender' : sender,
                    'quantity': 0,
        }))

        // const reader = new FileReader()
        // // @ts-ignore
        // let rawData = new ArrayBuffer()
        // // @ts-ignore
        // reader.loadend = function() {
        // }
        // reader.onload = function(e) {
        //     // @ts-ignore
        //     rawData = e.target.result;
        //     debugger
        //     ws?.send(JSON.stringify({
        //         'text': text,
        //         'sender' : sender,
        //         'quantity': 1,
        //         'image0': rawData,
        //     }));
        //     alert("the File has been transferred.")
        // }
        // reader.readAsArrayBuffer(photo);

    }
}

