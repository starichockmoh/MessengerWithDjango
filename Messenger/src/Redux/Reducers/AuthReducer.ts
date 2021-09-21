import {ActionsType} from "../../Types/Types";


const InitialState = {
    isAuth: false,
    error: ''
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
        default:
            return state
    }
}
type AuthACType = ActionsType<typeof AuthAC>

export const AuthAC = {
    SetAuth: (auth: boolean) => ({type: "AUTH/SET_AUTH", auth} as const),
    SetError: (error: string) => ({type: "AUTH/SET_ERROR", error} as const)
}