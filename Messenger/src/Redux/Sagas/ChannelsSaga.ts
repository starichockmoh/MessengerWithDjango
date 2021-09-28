import {call, put, SagaReturnType, take} from "redux-saga/effects";
import {dialogsAPI} from "../../Api/DialogsAPI";
import {DialogsAC} from "../Reducers/DialogsReducer";
import {channelAPI} from "../../Api/ChannelAPI";
import {ChannelListsAC} from "../Reducers/ChannelListsReducer";
import {ContentAC} from "../Reducers/ContentReducer";


export const ActivateChannelsSaga = {
    Channels: () => ({type: "CHANNELS_SAGAS/GET_CHANNELS"} as const),
    Details: (ID: number) => ({type: "CHANNELS_SAGAS/GET_DETAILS", ID} as const),

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
                yield put(ChannelListsAC.SetDetails(data.data))
                yield put(ContentAC.SetContentState("POSTS"))
            }
        } catch (error) {
            console.log(error)
        }
    }
}


