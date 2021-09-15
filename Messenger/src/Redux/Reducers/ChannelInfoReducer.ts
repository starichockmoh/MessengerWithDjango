import {ActionsType} from "../../Types/Types";

export type ChannelInfoPageType = 'INFO' | 'IMAGES' | 'SETTINGS'

const InitialState = {
    CurrentPage: 'INFO' as ChannelInfoPageType
}

type InitialStateType = typeof InitialState

export const ChannelInfoReducer = (state= InitialState, action: ChannelInfoACType):InitialStateType => {
    switch (action.type) {
        case "CHANNEL_INFO/SET_PAGE":
            return {
                ...state,
                CurrentPage: action.page
            }
        default:
            return state
    }
}
type ChannelInfoACType = ActionsType<typeof ChannelInfoAC>

export const ChannelInfoAC = {
    SetPage: (page: ChannelInfoPageType) => ({type: "CHANNEL_INFO/SET_PAGE", page} as const)
}