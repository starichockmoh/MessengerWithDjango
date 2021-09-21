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


export type NullableType<MT> = null | MT

type PropertiesType<T> = T extends {[key: string]: infer U} ? U : never

export type ActionsType<T extends {[key: string]: (...arg: any[]) => any} > = ReturnType<PropertiesType<T>>