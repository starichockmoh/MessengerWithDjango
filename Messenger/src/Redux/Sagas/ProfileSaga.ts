import {call, put, SagaReturnType, take, takeEvery} from "redux-saga/effects";
import {profileAPI} from "../../Api/ProfileAPI";
import {ProfileAC} from "../Reducers/ProfileReducer";
import {ChangedProfileType} from "../../Types/Types";



export const ActivateProfileSaga = {
    Profile: (ID: number) => ({type: "PROFILE_SAGAS/GET_PROFILE", ID} as const),
    AddPhoto: (photo: File) => ({type: "PROFILE_SAGAS/ADD_PHOTO", photo} as const),
    ChangeProfile: (data: ChangedProfileType) =>
        ({type: "PROFILE_SAGAS/CHANGE_PROFILE", ...data} as const)
}

type ProfileDataType = SagaReturnType<typeof profileAPI.get_profile>
export function* WatchProfileSaga() {
    while (true) {
        const {ID}: {ID: number} = yield take ("PROFILE_SAGAS/GET_PROFILE")
        try {
            const ProfileData: ProfileDataType = yield call(profileAPI.get_profile, ID)
            yield put(ProfileAC.SetProfile(ProfileData.data))
        } catch (error) {
            console.log(error) //Show error on screen
        }
    }
}

type NewProfileResponseType = SagaReturnType<typeof profileAPI.change_profile>

export function* WatchProfileChangeSaga() {
    while (true) {
        try {
            const NewProfile: ChangedProfileType = yield take( "PROFILE_SAGAS/CHANGE_PROFILE")
            yield put(ProfileAC.SetFetching(true))
            const ProfileResponse: NewProfileResponseType = yield call(profileAPI.change_profile, NewProfile)
            if (ProfileResponse.status === 201){
                yield put(ProfileAC.SetProfile(ProfileResponse.data))
                yield put(ProfileAC.SetFetching(false))
            }
        } catch (error) {
            console.log(error) //Show error on screen
        }
    }
}

type AddPhotoActionType = ReturnType<typeof ActivateProfileSaga.AddPhoto>
type AddPhotoResType = SagaReturnType<typeof profileAPI.add_photo>
export function* WatchAddProfilePhotoSaga() {
    while (true) {
        try {
            const action: AddPhotoActionType = yield take("PROFILE_SAGAS/ADD_PHOTO")
            const data: AddPhotoResType = yield call(profileAPI.add_photo, action.photo)
            if (data.status < 300) {
                yield put(ProfileAC.SetPhoto(data.data))
            }
        } catch (error) {
            console.log(error)
        }
    }
}

