import axios from "axios";
import {AuthUserProfileType, ChangedProfileType, UserProfileType} from "../Types/Types";


type ProfileResponseType = UserProfileType

export const profileAPI = {
    async get_profile(ID: number) {
        const response: {data: UserProfileType, status: number} = await axios({
            method: 'get',
            url: `http://127.0.0.1:8000/account/api/profile/${ID}/`,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('token')}`,
            }
        })
        return response
    },
    async change_profile (data: ChangedProfileType) {
        const response: {data: UserProfileType, status: number} = await axios({
            method: 'put',
            url: `http://127.0.0.1:8000/account/api/current_profile/`,
            data: data,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('token')}`,
            }
        })
        return response
    },
    async add_photo (data: any) {
        const response: {data: any, status: number} = await axios({
            method: 'put',
            url: `http://127.0.0.1:8000/account/api/current_profile/`,
            data: data,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('token')}`,
            }
        })
        return response
    },
}
