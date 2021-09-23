import {ActionsType, DialogType} from "../../Types/Types";


const InitialState = {
    Dialogs: null as null | Array<DialogType>
}

type InitialStateType = typeof InitialState

export const DialogsReducer = (state= InitialState, action: DialogsACType):InitialStateType => {
    switch (action.type) {
        case "DIALOGS/SET_DIALOGS":
            return {
                ...state,
                Dialogs: action.dialogs
            }

        default:
            return state
    }
}
type DialogsACType = ActionsType<typeof DialogsAC>

export const DialogsAC = {
    SetDialogs: (dialogs: Array<DialogType>) => ({type: "DIALOGS/SET_DIALOGS", dialogs} as const)
}