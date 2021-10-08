import {
    ActionsType,
    DialogDetailsType,
    DialogType,
    MessageType,
    UserProfileType,
    WSStatusType
} from "../../Types/Types";


const InitialState = {
    Dialogs: null as null | Array<DialogType>,
    CurrentDialog: null as null | DialogDetailsType,
    DialogUser: null as null | UserProfileType,
    WSStatus: 'PENDING' as WSStatusType
}

type InitialStateType = typeof InitialState

export const DialogsReducer = (state= InitialState, action: DialogsACType | MessagesWSACType):InitialStateType => {
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
        case "DIALOGS/SET_WS_STATUS":
            return {
                ...state,
                WSStatus: action.WSStatus
            }
        case "DIALOGS/SET_LAST_MESSAGE":
            if (!!state.Dialogs && !!state.CurrentDialog) {
                const CurrentID = state.CurrentDialog?.pk
                let CopyDialogs = [...state.Dialogs]
                let ArrNum = 0 //индекс текущего диалога
                for (let i = 0; i < CopyDialogs.length; i += 1) {
                    if (CopyDialogs[i].pk === CurrentID) {
                        ArrNum = i
                        break
                    }
                }
                let TmpDialog = CopyDialogs.splice(ArrNum, 1)[0]
                TmpDialog.get_messeges.push(action.message)
                CopyDialogs.unshift(TmpDialog)
                return {
                    ...state,
                    Dialogs: CopyDialogs
                }
            }
            return {
                ...state
            }
        case "DIALOGS/SET_MESSAGE":
            if (!!state.CurrentDialog) {
                const Dialog: DialogDetailsType = {
                    get_messeges: [...state.CurrentDialog.get_messeges, action.message],
                    pk: state.CurrentDialog.pk,
                    participants: state.CurrentDialog.participants,
                    archive: state.CurrentDialog.archive,
                    deleted: state.CurrentDialog.deleted,
                    push_notification: state.CurrentDialog.push_notification
                }
                return {...state, CurrentDialog: Dialog}
            }
            return state
        default:
            return state
    }
}
type DialogsACType = ActionsType<typeof DialogsAC>
export type MessagesWSACType = ActionsType<typeof MessagesWSAC>

export const DialogsAC = {
    SetDialogs: (dialogs: Array<DialogType> | null ) => ({type: "DIALOGS/SET_DIALOGS", dialogs} as const),
    SetDetails: (details: DialogDetailsType | null) => ({type: "DIALOGS/SET_DETAILS", details} as const),
    SetDialogUser: (user: UserProfileType | null) => ({type: "DIALOGS/SET_DIALOG_USER", user} as const),
    SetLastMessage: (message: MessageType) => ({type: "DIALOGS/SET_LAST_MESSAGE", message} as const),
    SetMessage: (message: MessageType) => ({type: "DIALOGS/SET_MESSAGE", message} as const),
}

export const MessagesWSAC = {

    SetWSStatus: (WSStatus: WSStatusType) => ({type: "DIALOGS/SET_WS_STATUS", WSStatus} as const),
}