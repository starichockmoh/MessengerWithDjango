import {ActionsType, ChannelDetailType, ChannelType, NullableType, PostType} from "../../Types/Types";


export type ChannelListPageType = 'CHANNELS' | 'DIALOGS'

const InitialState = {
    CurrentList: 'CHANNELS' as ChannelListPageType,
    Channels: null as NullableType<Array<ChannelType>>,
    CurrentChannel: null as NullableType<ChannelDetailType>,
    IsChannelCreated: false,
    IsPostCreated: false
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
        case "CHANNEL_LISTS/SET_CHANNEL_CREATED":
            return {
                ...state,
                IsChannelCreated: action.isSuccess
            }
        case "CHANNEL_LISTS/SET_NEW_CHANNEL":
            if (state.Channels) return {
                ...state,
                Channels: [...state.Channels, action.channel]
            }
            return state
        case "CHANNEL_LISTS/SET_POST_CREATED":
            return {
                ...state,
                IsPostCreated: action.isSuccess
            }
        case "CHANNEL_LISTS/SET_NEW_POST":
            if (!!state.CurrentChannel) {
                const Channel: ChannelDetailType = {
                    id: state.CurrentChannel.id,
                    admins: state.CurrentChannel.admins,
                    creator: state.CurrentChannel.creator,
                    title: state.CurrentChannel.title,
                    avatar: state.CurrentChannel.avatar,
                    participents: state.CurrentChannel.participents,
                    description: state.CurrentChannel.description,
                    get_posts: [...state.CurrentChannel.get_posts, action.post]
                }
                return {
                    ...state,
                    CurrentChannel: Channel
                }
            }
            return state
        default:
            return state
    }
}
type ChannelListsACType = ActionsType<typeof ChannelListsAC>

export const ChannelListsAC = {
    SetList: (list: ChannelListPageType) => ({type: "CHANNEL_LISTS/SET_LIST", list} as const),
    SetChannels: (channels: Array<ChannelType> | null) => ({type: "CHANNEL_LISTS/SET_CHANNELS", channels} as const),
    SetDetails: (channel: ChannelDetailType | null) => ({type: "CHANNEL_LISTS/SET_DETAILS", channel} as const),
    SetChannelCreated: (isSuccess: boolean) => ({type: "CHANNEL_LISTS/SET_CHANNEL_CREATED", isSuccess} as const),
    SetPostCreated: (isSuccess: boolean) => ({type: "CHANNEL_LISTS/SET_POST_CREATED", isSuccess} as const),
    SetNewChannel: (channel: ChannelType) => ({type: "CHANNEL_LISTS/SET_NEW_CHANNEL", channel} as const),
    SetNewPost: (post: PostType) => ({type: "CHANNEL_LISTS/SET_NEW_POST", post} as const),
}