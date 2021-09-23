export type AuthUserProfileType = {
    pk: number
    last_active: null | string
    is_online: boolean
    first_name: string
    last_name: string
    about_user: string
    username: string
    friends: Array<any>
    telephone: string
}

export type UserProfileType = {
    pk: number
    last_active: null | string
    is_online: boolean
    first_name: string
    last_name: string
    about_user: string
    username: string
    friends: Array<any>
    telephone: string
}

export type ChangedProfileType = {
    first_name?: string
    last_name?: string
    telephone?: string
    about_user?: string
}


export type DialogType = {
    archive: Array<number>
    get_messeges: Array<MessageType>
    participants: Array<number>
    pk: number
    push_notification: Array<number>
}


export type MessageType = {
    datetime: string
    get_images: []
    pk: number
    sender: number
    text: string
    thread: number
    who_deleted_the_message:Array<number>
}

export type NullableType<MT> = null | MT

type PropertiesType<T> = T extends {[key: string]: infer U} ? U : never

export type ActionsType<T extends {[key: string]: (...arg: any[]) => any} > = ReturnType<PropertiesType<T>>