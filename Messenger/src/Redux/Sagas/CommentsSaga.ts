import {call, put, take, takeEvery, takeLatest} from "redux-saga/effects"
import {ActionsConstantsType} from "../../Types/Types";
import {CommentsActions} from "../Reducers/CommentsReducer";
import {commentsAPI, EmitterActionsType} from "../../Api/CommentsWSAPI";

export const StartChatSagaActions = {
    StartWsAC: (id: number) => ({type: "START_WS", id} as const),
    SendMessageAC: (message: string) => ({type: "SEND_CHAT_MESSAGE", message} as const),
    CloseWSAC: () => ({type: "CLOSE_WS_CHANNEL"} as const)
}

type SendMessageActionType = ReturnType<typeof StartChatSagaActions.SendMessageAC>
type StartChatSagaActionsConstants = ActionsConstantsType<typeof StartChatSagaActions>

export function* WSSagaWatcher() {
    yield takeEvery<StartChatSagaActionsConstants>("START_WS", function* (action: any){
        let channel: ReturnType<typeof commentsAPI.start> = yield call(commentsAPI.start, action.id)
        yield takeLatest<StartChatSagaActionsConstants, any>("SEND_CHAT_MESSAGE", SendMessageWorker)
        while (true) {
            const WSAction: EmitterActionsType  = yield take(channel)
            if (WSAction.type === "TRY_TO_RECONNECT") {
                channel = yield call(commentsAPI.start, 5)
            }
            else yield put(WSAction)
        }
    })
}
function* SendMessageWorker(action: SendMessageActionType) {
    yield call(commentsAPI.sendMessage, action.message)
}


export function* StopWSSagaWatcher() {
    yield takeEvery<StartChatSagaActionsConstants, any>("CLOSE_WS_CHANNEL", StopWSWorker)
}

function* StopWSWorker() {
    yield call(commentsAPI.stop)
    yield put(CommentsActions.SetWSStatus("PENDING"))
}


