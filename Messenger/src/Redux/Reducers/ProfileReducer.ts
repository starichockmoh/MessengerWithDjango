import {ActionsType, NullableType, AuthUserProfileType, UserProfileType} from "../../Types/Types";


const InitialState = {
    AuthProfile: null as NullableType<AuthUserProfileType>,
    Profile: null as NullableType<UserProfileType>,
    IsFetching: false
}

type InitialStateType = typeof InitialState

export const ProfileReducer = (state= InitialState, action: ProfileACType):InitialStateType => {
    switch (action.type) {
        case "PROFILE/SET_AUTH_PROFILE":
            return {
                ...state,
                AuthProfile: action.auth_profile
            }
        case "PROFILE/SET_PROFILE":
            return {
                ...state,
                Profile: action.profile
            }
        case "PROFILE/SET_FETCHING":
            return {
                ...state,
                IsFetching: action.is_fetching
            }
        default:
            return state
    }
}
type ProfileACType = ActionsType<typeof ProfileAC>

export const ProfileAC = {
    SetAuthProfile: (auth_profile: AuthUserProfileType) => ({type: "PROFILE/SET_AUTH_PROFILE", auth_profile} as const),
    SetProfile: (profile: UserProfileType) => ({type: "PROFILE/SET_PROFILE", profile} as const),
    SetFetching: (is_fetching: boolean) => ({type: "PROFILE/SET_FETCHING", is_fetching} as const),

}