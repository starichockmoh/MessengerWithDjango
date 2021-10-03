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
    addit_image: Array<UserPhotoType>
}

export type UserPhotoType = {
    id: number
    image: string
    user: number
}

export type ParticipantType = {
    addit_image: Array<UserPhotoType>
    first_name: string
    is_online: boolean
    last_active: null | string
    last_name: string
    pk: number
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
    participants: Array<ParticipantType>
    pk: number
    push_notification: Array<number>
}

export type MessageImageType = {
    id: number
    image: string
    message: any
    sender: number
    thread: number
}

export type MessageType = {
    datetime: string
    get_images: Array<MessageImageType>
    pk: number
    sender: number
    text: string
    thread: number
    who_deleted_the_message:Array<number>
}


export type ChannelType = {
    creator: ParticipantType
    avatar: string
    description: string
    get_posts: Array<PostType>
    pk: number
    title: string
}

export type PostType = {
    channel: number
    datetime: string
    get_comments: Array<CommentType>
    id: number
    text: string
    views: number
}

export type CommentType = {
    author: number
    datetime: string
    id: number
    post: number
    text: string

}

export type ChannelDetailType = {
    admins: Array<ParticipantType>
    creator: number //будет объект
    avatar: string
    description: string
    get_posts: Array<PostType>
    id: number
    title: string
    participents: Array<ParticipantType>
}

export type DialogDetailsType = {
    archive: Array<number>
    deleted: Array<number>
    get_messeges: Array<MessageType>
    participants: Array<ParticipantType>
    pk: number
    push_notification: Array<number>
}

export type NullableType<MT> = null | MT

type PropertiesType<T> = T extends {[key: string]: infer U} ? U : never

export type ActionsType<T extends {[key: string]: (...arg: any[]) => any} > = ReturnType<PropertiesType<T>>