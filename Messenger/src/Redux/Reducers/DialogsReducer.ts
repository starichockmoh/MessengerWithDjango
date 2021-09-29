import {ActionsType, DialogDetailsType, DialogType, UserProfileType} from "../../Types/Types";


const InitialState = {
    Dialogs: null as null | Array<DialogType>,
    CurrentDialog: null as null | DialogDetailsType,
    DialogUser: null as null | UserProfileType
}

type InitialStateType = typeof InitialState

export const DialogsReducer = (state= InitialState, action: DialogsACType):InitialStateType => {
    switch (action.type) {
        case "DIALOGS/SET_DIALOGS":
            return {
                ...state,
                Dialogs: action.dialogs
            }
        case "DIALOGS/SET_DETAILS":
            return {
                ...state,
                CurrentDialog: action.details
            }
        case "DIALOGS/SET_DIALOG_USER":
            return {
                ...state,
                DialogUser: action.user
            }
        default:
            return state
    }
}
type DialogsACType = ActionsType<typeof DialogsAC>

export const DialogsAC = {
    SetDialogs: (dialogs: Array<DialogType> ) => ({type: "DIALOGS/SET_DIALOGS", dialogs} as const),
    SetDetails: (details: DialogDetailsType | null) => ({type: "DIALOGS/SET_DETAILS", details} as const),
    SetDialogUser: (user: UserProfileType | null) => ({type: "DIALOGS/SET_DIALOG_USER", user} as const),
}