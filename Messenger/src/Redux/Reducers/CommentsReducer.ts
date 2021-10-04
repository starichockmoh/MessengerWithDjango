import {ActionsType,  CommentType, WSStatusType} from "../../Types/Types";
import {v1} from "uuid"

let InitialState = {
    Comments: [] as Array<CommentType>,
    WSStatus: 'PENDING' as WSStatusType
}
export type InitialStateType = typeof InitialState


const CommentsReducer = (state = InitialState, action: CommentsActionsType): InitialStateType => {
    switch (action.type) {
        case "SET_CHAT_MESSAGES":
            return {
                ...state,
                Comments: [...state.Comments, ...action.ChatMessages]
            }
        case "SET_WS_STATUS":
            return {
                ...state,
                WSStatus: action.WSStatus
            }
        default:
            return state

    }
}

export type CommentsActionsType = ActionsType<typeof CommentsActions>

export const CommentsActions = {
    SetComments: (ChatMessages: Array<CommentType>) => ({type: "SET_CHAT_MESSAGES", ChatMessages} as const),
    SetWSStatus: (WSStatus: WSStatusType) => ({type: 'SET_WS_STATUS', WSStatus} as const),
}

export default CommentsReducer