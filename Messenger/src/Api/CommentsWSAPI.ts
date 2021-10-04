import {CommentType} from "../Types/Types";
import {CommentsActions, CommentsActionsType} from "../Redux/Reducers/CommentsReducer";
import {eventChannel} from "redux-saga";

let ws: WebSocket | null = null
export type EmitterActionsType = CommentsActionsType | {type: "TRY_TO_RECONNECT"}
type EmitterType = (input: EmitterActionsType) => void
let emitter: EmitterType


const MessageHandler = (e: MessageEvent) => {
    debugger
    let ChatMessages: Array<CommentType> | null = null
    try {
        ChatMessages = JSON.parse(e.data)
    } catch(e: any) {
        console.error(`Error parsing : ${e.data}`)
    }
    if (ChatMessages) {
        return emitter(CommentsActions.SetComments(ChatMessages))
    }
}

const CloseHandler = () => {
    console.log("CLOSED")
    emitter(CommentsActions.SetWSStatus("CLOSED"))
    // setTimeout(() => emitter({ type: "TRY_TO_RECONNECT"}), 3000)

}

const OpenedHandler = () => {
    console.log("OPENED")
    emitter(CommentsActions.SetWSStatus("OPENED"))
}
const ErrorHandler = () => {
    console.log("ERROR")
    emitter(CommentsActions.SetWSStatus("ERROR"))
}

const CleanUp = () => {
    ws?.removeEventListener('close',CloseHandler)
    ws?.removeEventListener('message', MessageHandler)
    ws?.removeEventListener('open', OpenedHandler)
    ws?.removeEventListener('error', ErrorHandler)
    ws?.close()
}


const initWebsocket = () => {
    return eventChannel((emitt: EmitterType) => {
        emitter = emitt
        CleanUp()
        ws = new WebSocket('ws://localhost:8000/ws/thread/5/')
        ws.addEventListener('close', CloseHandler)
        ws.addEventListener('open', OpenedHandler)
        ws.addEventListener('error', ErrorHandler)
        ws.addEventListener('message', MessageHandler)
        return () => {

        }
    })
}

export const commentsAPI = {
    start() {
        return initWebsocket()
    },
    stop(){
        CleanUp()
    },
    sendMessage(message: string){
        ws?.send(message)
    }
}

