import {ActionsType, CommentType, MessageType, PostType} from "../../Types/Types";


export type ContentStateType = 'COMMENTS' | 'MESSAGES' | 'POSTS'

const InitialState = {
    Messages: null as null | Array<MessageType>,
    Posts: null as null | Array<PostType>,
    Comments: null as null | Array<CommentType>,
    ContentState: null as null | ContentStateType
}

type InitialStateType = typeof InitialState

export const ContentReducer = (state= InitialState, action: ContentACType):InitialStateType => {
    switch (action.type) {
        case "CONTENT/SET_MESSAGES":
            return {
                ...state,
                Messages: action.messages
            }
        case "CONTENT/SET_POSTS":
            return {
                ...state,
                Posts: action.posts
            }
        case "CONTENT/SET_COMMENTS":
            return {
                ...state,
                Comments: action.comments
            }
        case "CONTENT/SET_STATE":
            return {
                ...state,
                ContentState: action.state
            }
        default:
            return state
    }
}
type ContentACType = ActionsType<typeof ContentAC>

export const ContentAC = {
    SetMessages: (messages: Array<MessageType>) => ({type: "CONTENT/SET_MESSAGES", messages} as const),
    SetPosts: (posts: Array<PostType>) => ({type: "CONTENT/SET_POSTS", posts} as const),
    SetComments: (comments: Array<CommentType>) => ({type: "CONTENT/SET_COMMENTS", comments} as const),
    SetContentState: (state: ContentStateType | null) => ({type: "CONTENT/SET_STATE", state} as const),
}