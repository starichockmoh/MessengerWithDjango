import axios from "axios";
import {AuthUserProfileType} from "../Types/Types";


const Instance = axios.create({
    baseURL: 'http://127.0.0.1:8000',
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('token')}`,
    }
});

type DataType = {
    refresh: string
    access: string
}

export const authAPI = {
    async login(name: string, password: string) {
        const response = await Instance.post<DataType>('/account/api/token/', {
            username: name,
            password: password
        })
        return response
    },

    async auth() {
        const response: {data: AuthUserProfileType, status: number} = await axios({
            method: 'get',
            url: 'http://127.0.0.1:8000/account/api/current_profile/',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('token')}`,
            }
        })
        return response
    },
}


