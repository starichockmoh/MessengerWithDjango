import {ActionsType} from "../../Types/Types";


const InitialState = {
    isAuth: false,
    current_page: 'IN' as 'IN' | 'UP',
    error: '',
    user_created: false
}

type InitialStateType = typeof InitialState

export const AuthReducer = (state= InitialState, action: AuthACType):InitialStateType => {
    switch (action.type) {
        case "AUTH/SET_AUTH": {
            return {
                ...state,
                isAuth: action.auth
            }
        }
        case "AUTH/SET_ERROR": {
            return {
                ...state,
                error: action.error
            }
        }
        case "AUTH/SET_PAGE":{
            return {
                ...state,
                current_page: action.page
            }
        }
        case "AUTH/SET_CREATED_USER":{
            return {
                ...state,
                user_created: action.success
            }
        }
        default:
            return state
    }
}
type AuthACType = ActionsType<typeof AuthAC>

export const AuthAC = {
    SetAuth: (auth: boolean) => ({type: "AUTH/SET_AUTH", auth} as const),
    SetError: (error: string) => ({type: "AUTH/SET_ERROR", error} as const),
    SetPage:(page: 'IN' | 'UP') => ({type: "AUTH/SET_PAGE", page} as const),
    SetCreatedUser: (success: boolean) => ({type: "AUTH/SET_CREATED_USER", success} as const)
}