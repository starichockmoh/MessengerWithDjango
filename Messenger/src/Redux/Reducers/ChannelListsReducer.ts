import {ActionsType} from "../../Types/Types";

export type ChannelListPageType = 'CHANNELS' | 'DIALOGS'

const InitialState = {
    CurrentList: 'CHANNELS' as ChannelListPageType
}

type InitialStateType = typeof InitialState

export const ChannelListsReducer = (state= InitialState, action: ChannelListsACType):InitialStateType => {
    switch (action.type) {
        case "CHANNEL_LISTS/SET_LIST":
            return {
                ...state,
                CurrentList: action.list
            }
        default:
            return state
    }
}
type ChannelListsACType = ActionsType<typeof ChannelListsAC>

export const ChannelListsAC = {
    SetList: (list: ChannelListPageType) => ({type: "CHANNEL_LISTS/SET_LIST", list} as const)
}