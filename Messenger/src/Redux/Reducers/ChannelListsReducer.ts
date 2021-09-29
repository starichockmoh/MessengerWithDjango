import {ActionsType, ChannelDetailType, ChannelType, NullableType} from "../../Types/Types";

export type ChannelListPageType = 'CHANNELS' | 'DIALOGS'

const InitialState = {
    CurrentList: 'CHANNELS' as ChannelListPageType,
    Channels: null as NullableType<Array<ChannelType>>,
    CurrentChannel: null as NullableType<ChannelDetailType>
}

type InitialStateType = typeof InitialState

export const ChannelListsReducer = (state= InitialState, action: ChannelListsACType):InitialStateType => {
    switch (action.type) {
        case "CHANNEL_LISTS/SET_LIST":
            return {
                ...state,
                CurrentList: action.list
            }
        case "CHANNEL_LISTS/SET_CHANNELS":
            return {
                ...state,
                Channels: action.channels
            }
        case "CHANNEL_LISTS/SET_DETAILS":
            return {
                ...state,
                CurrentChannel: action.channel
            }
        default:
            return state
    }
}
type ChannelListsACType = ActionsType<typeof ChannelListsAC>

export const ChannelListsAC = {
    SetList: (list: ChannelListPageType) => ({type: "CHANNEL_LISTS/SET_LIST", list} as const),
    SetChannels: (channels: Array<ChannelType>) => ({type: "CHANNEL_LISTS/SET_CHANNELS", channels} as const),
    SetDetails: (channel: ChannelDetailType | null) => ({type: "CHANNEL_LISTS/SET_DETAILS", channel} as const),
}