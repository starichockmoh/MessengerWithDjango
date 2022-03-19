import {call, put, take, takeEvery, takeLatest} from "redux-saga/effects"
import {EmitterActionsType, messagesWSAPI} from "../../Api/MessagesWSAPI";
import {DialogsAC, MessagesWSAC} from "../Reducers/DialogsReducer";
import {MessageType} from "../../Types/Types";

export const StartChatSagaActions = {
    StartWsAC: (id: number) => ({type: "MESSAGES_WS_SAGA/START_WS", id} as const),
    SendMessageAC: (text: string, sender: string, photo?: any) => ({type: "MESSAGES_WS_SAGA/SEND_CHAT_MESSAGE", sender, text,photo} as const),
    ReceiveMessage: (message: MessageType)  => ({type: "MESSAGES_WS_SAGA/RECEIVE_MESSAGE", message} as const),
    CloseWSAC: () => ({type: "MESSAGES_WS_SAGA/CLOSE_WS_CHANNEL"} as const)
}

export type ReceiveMessageActionType = ReturnType<typeof StartChatSagaActions.ReceiveMessage>
type SendMessageActionType = ReturnType<typeof StartChatSagaActions.SendMessageAC>
type StartWSActionType = ReturnType<typeof StartChatSagaActions.StartWsAC>

export function* MessagesWSSagaWatcher() {
    yield takeEvery("MESSAGES_WS_SAGA/START_WS", function* (action: StartWSActionType){
        let channel: ReturnType<typeof messagesWSAPI.start> = yield call(messagesWSAPI.start, action.id)
        while (true) {
            const WSAction: EmitterActionsType  = yield take(channel)
            if (WSAction.type === "MESSAGES_WS_SAGA/TRY_TO_RECONNECT") {
                channel = yield call(messagesWSAPI.start, action.id)
            }
            else yield put(WSAction)
        }
    })


}

export function* ReceiveMessageSagaWatcher() {
    yield takeEvery("MESSAGES_WS_SAGA/RECEIVE_MESSAGE", function* (action: ReceiveMessageActionType){
        yield put(DialogsAC.SetMessage(action.message))
        yield put(DialogsAC.SetLastMessage(action.message))
    })


}

export function* SendMessageWSSagaWatcher() {
    yield takeLatest("MESSAGES_WS_SAGA/SEND_CHAT_MESSAGE", SendMessageWorker)
}


function* SendMessageWorker(action: SendMessageActionType) {
    yield call(messagesWSAPI.sendMessage, action.text, action.sender,action.photo)
}


export function* StopMessagesSagaWatcher() {
    yield takeEvery("MESSAGES_WS_SAGA/CLOSE_WS_CHANNEL", StopMessagesWSWorker)
}

function* StopMessagesWSWorker() {
    yield call(messagesWSAPI.stop)
    yield put(MessagesWSAC.SetWSStatus("CLOSED"))
}


