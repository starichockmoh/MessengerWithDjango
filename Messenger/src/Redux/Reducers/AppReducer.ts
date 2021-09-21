import {ActionsType} from "../../Types/Types";

const InitialState = {
    isActiveMenu: false,
    isInit: false
}

type InitialStateType = typeof InitialState

export const AppReducer = (state= InitialState, action: AppACType):InitialStateType => {
    switch (action.type) {
        case "APP/SET_IS_ACTIVE_MENU":
            return {
                ...state,
                isActiveMenu: action.isActiveMenu
            }
        case "APP/SET_IS_INIT":
            return {
                ...state,
                isInit: action.init
            }
        default:
            return state
    }
}
type AppACType = ActionsType<typeof AppAC>

export const AppAC = {
    SetMenu: (isActiveMenu: boolean) => ({type: "APP/SET_IS_ACTIVE_MENU", isActiveMenu} as const),
    SetInit: (init: boolean) => ({type: "APP/SET_IS_INIT", init} as const)
}

