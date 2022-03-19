import {ActionsType} from "../../Types/Types";

const InitialState = {
    isActiveMenu: false,
    isInit: false,
    LayOutColor: "#151E26" as "white" | "#151E26",
    MainContentColor: "white",
    AdditionalColorActive: "#2C5273" as "#2C5273" | "#08c",
    AdditionalColor: "#202B36" as "#202B36" | "#DCDCDC",
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
        case "APP/SET_APP_THEME":
            if (action.theme === "day") {
                return {
                    ...state,
                    LayOutColor: "white",
                    AdditionalColor: "#DCDCDC",
                    AdditionalColorActive: "#08c"
                }
            }
            return {
                ...state,
                LayOutColor: "#151E26",
                AdditionalColor: "#202B36",
                AdditionalColorActive: "#2C5273"
            }

        default:
            return state
    }
}
type AppACType = ActionsType<typeof AppAC>

export const AppAC = {
    SetMenu: (isActiveMenu: boolean) => ({type: "APP/SET_IS_ACTIVE_MENU", isActiveMenu} as const),
    SetInit: (init: boolean) => ({type: "APP/SET_IS_INIT", init} as const),
    SetTheme: (theme: string) => ({type: "APP/SET_APP_THEME", theme} as const)
}

