import axios from "axios";
import {AuthUserProfileType, ChangedProfileType, UserPhotoType, UserProfileType} from "../Types/Types";


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
    async add_photo (photo: File) {
        const formData = new FormData()
        formData.append("image", photo)
        const response: {data: UserPhotoType, status: number} = await axios({
            method: 'post',
            url: `http://127.0.0.1:8000/account/api/photo_of_user/`,
            data: formData,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('token')}`,
            }
        })
        return response
    },
}
