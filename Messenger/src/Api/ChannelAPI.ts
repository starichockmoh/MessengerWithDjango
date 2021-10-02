import axios from "axios";
import {ChannelDetailType, ChannelType, PostType} from "../Types/Types";

type GetChannelsResType = {
    data: {
        channels: Array<ChannelType>
    }
    status: number
}

type GetDetailsResType<T> = {
    status: number
    data: T
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
        const response: GetDetailsResType<ChannelDetailType> = await axios({
            method: 'get',
            url: `http://127.0.0.1:8000/channel/api/channel/${ID}/`,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('token')}`,
            }
        })
        return response
    },
    async create_channel(avatar: any, title: string, description: string) {
        const formData = new FormData()
        formData.append("avatar", avatar)
        formData.append("title", title)
        formData.append("description",description)
        const response: GetDetailsResType<ChannelType> = await axios({
            method: 'post',
            url: `http://127.0.0.1:8000/channel/api/channels/`,
            data: formData,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('token')}`,
            }
        })
        return response
    },
    async create_post(text: string, channel: number) {
        const response: GetDetailsResType<PostType> = await axios({
            method: 'post',
            data: {
                text: text,
                channel: channel
            },
            url: `http://127.0.0.1:8000/channel/api/post/`,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('token')}`,
            }
        })
        return response
    },

}