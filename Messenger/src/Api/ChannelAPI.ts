import axios from "axios";
import {ChannelDetailType, ChannelType} from "../Types/Types";

type GetChannelsResType = {
    data: {
        channels: Array<ChannelType>
    }
    status: number
}

type GetDetailsResType = {
    status: number
    data: ChannelDetailType
}


export const channelAPI = {
    async get_channels() {
        const response: GetChannelsResType = await axios({
            method: 'get',
            url: `http://127.0.0.1:8000/channel/api/channels/`,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('token')}`,
            }
        })
        return response
    },
    async get_details(ID: number) {
        const response: GetDetailsResType = await axios({
            method: 'get',
            url: `http://127.0.0.1:8000/channel/api/channel/${ID}/`,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('token')}`,
            }
        })
        return response
    },
}