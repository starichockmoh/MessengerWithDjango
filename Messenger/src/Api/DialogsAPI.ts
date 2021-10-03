import {ChangedProfileType, DialogDetailsType, DialogType, MessageType, UserProfileType} from "../Types/Types";
import axios from "axios";

export const dialogsAPI = {
    async get_active_dialogs() {
        const response: {data: Array<DialogType>, status: number} = await axios({
            method: 'get',
            url: `http://127.0.0.1:8000/thread/api/threads/`,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('token')}`,
            }
        })
        return response
    },
    async get_archive_dialogs() {
        const response: {data: Array<DialogType>, status: number} = await axios({
            method: 'get',
            url: `http://127.0.0.1:8000/thread/api/threads_archive/`,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('token')}`,
            }
        })
        return response
    },
    async get_details(ID: number) {
        const response: {data: DialogDetailsType, status: number} = await axios({
            method: 'get',
            url: `http://127.0.0.1:8000/thread/api/thread/${ID}/`,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('token')}`,
            }
        })
        return response
    },
    async send_message(DialogID: number, Text: string) {
        const response: {data: MessageType, status: number} = await axios({
            method: 'post',
            data: {
                text: Text,
                thread: DialogID
            },
            url: `http://127.0.0.1:8000/thread/api/write_messege/`,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('token')}`,
            }
        })
        return response
    },
    async create_dialog(participants: Array<number>) {
        const response: any = await axios({
            method: 'post',
            data: {
                "participants": [1, 2],
                "push_notification": [1, 2]
            },
            url: `http://127.0.0.1:8000/thread/api/threads/`,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('token')}`,
            }
        })
        return response
    },

}