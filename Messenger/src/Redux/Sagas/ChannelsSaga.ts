import {call, put, SagaReturnType, take} from "redux-saga/effects";
import {dialogsAPI} from "../../Api/DialogsAPI";
import {DialogsAC} from "../Reducers/DialogsReducer";
import {channelAPI} from "../../Api/ChannelAPI";
import {ChannelListsAC} from "../Reducers/ChannelListsReducer";
import {ContentAC} from "../Reducers/ContentReducer";


export const ActivateChannelsSaga = {
    Channels: () => ({type: "CHANNELS_SAGAS/GET_CHANNELS"} as const),
    Details: (ID: number) => ({type: "CHANNELS_SAGAS/GET_DETAILS", ID} as const),
    CreateChannel: (avatar: any, title: string, description: string) =>
        ({type: "CHANNELS_SAGAS/CREATE_CHANNEL", avatar, title, description} as const),
    CreatePost: (text: string, channel: number) => ({type: "CHANNELS_SAGAS/CREATE_POST", text, channel} as const),

}

type ChannelsDataType = SagaReturnType<typeof channelAPI.get_channels>

export function* WatchChannelsSaga() {
    while (true) {
        yield take("CHANNELS_SAGAS/GET_CHANNELS")
        try {
            const data: ChannelsDataType = yield call(channelAPI.get_channels)
            if (data.status < 300) {
                yield put(ChannelListsAC.SetChannels(data.data.channels))
            }
        } catch (error) {
            console.log(error)
        }
    }
}

type ChannelDetailsType = SagaReturnType<typeof channelAPI.get_details>

export function* WatchChannelDetailsSaga() {
    while (true) {
        const {ID}: {ID: number} = yield take("CHANNELS_SAGAS/GET_DETAILS")
        try {
            const data: ChannelDetailsType = yield call(channelAPI.get_details, ID)
            if (data.status < 300) {
                sessionStorage.removeItem('CurrentDialogID')
                sessionStorage.setItem('CurrentChannelID', String(ID))
                yield put(DialogsAC.SetDetails(null))
                yield put(ChannelListsAC.SetDetails(data.data))
                yield put(ContentAC.SetContentState("POSTS"))
            }
        } catch (error) {
            console.log(error)
        }
    }
}

type CreateChannelActionType = {
    avatar: any
    title: string
    description: string
}
type NewChannelType = SagaReturnType<typeof channelAPI.create_channel>
export function* WatchCreateChannelSaga() {
    while (true) {
        const {description, title, avatar}: CreateChannelActionType = yield take("CHANNELS_SAGAS/CREATE_CHANNEL")
        try {
            const data: NewChannelType = yield call(channelAPI.create_channel, avatar, title, description )
            if (data.status < 300) {
                yield put(ChannelListsAC.SetChannelCreated(true))
                yield put(ChannelListsAC.SetNewChannel(data.data))
                yield put(ChannelListsAC.SetChannelCreated(false))
            }
        } catch (error) {
            console.log(error)
        }
    }
}

type CreatePostActionType = {
   text: string
    channel: number
}
type NewPostType = SagaReturnType<typeof channelAPI.create_post>
export function* WatchCreatePostSaga() {
    while (true) {
        const {text, channel}: CreatePostActionType = yield take("CHANNELS_SAGAS/CREATE_POST")
        try {
            const data: NewPostType = yield call(channelAPI.create_post, text, channel)
            if (data.status < 300) {
                yield put(ChannelListsAC.SetPostCreated(true))
                yield put(ChannelListsAC.SetNewPost(data.data))
                yield put(ActivateChannelsSaga.Channels())
                yield put(ChannelListsAC.SetPostCreated(false))
            }
        } catch (error) {
            console.log(error)
        }
    }
}


