import React, {useEffect} from "react";
import {
    Chapter,
    EditAvatar,
    EditAvatarButton,
    EditAvatarImage,
    EditItem,
    EditProfileBlock,
    EditUserName,
    NameIcon, PhoneIcon, UserNameIcon
} from "./EditProfile.styled"
import {SideHeader} from "../LeftSideBar/SideHeader";
import photo from "./../../Assets/maska.jpg"
import {Alert, Upload} from "antd";
import {EditIcon} from "../Contacts/Contacts.styled";
import {EditProfileItem} from "./EditProfileItem";
import TextArea from "antd/es/input/TextArea";
import { SpecialLine } from "../Common/CommonElements.styled";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../Redux/Store";
import {ActivateProfileSaga} from "../../Redux/Sagas/ProfileSaga";
import {profileAPI} from "../../Api/ProfileAPI";
import {ToNicePhoneNumber} from "../../Helper Functions/ToNicePhoneNumber";


export const EditProfile: React.FC = () => {
    const dispatch = useDispatch()
    const UserID = useSelector((state: AppStateType) => state.Profile.AuthProfile?.pk)

    useEffect(() => {
        UserID && dispatch(ActivateProfileSaga.Profile(UserID))
    }, [UserID])


    const UserData = useSelector((state: AppStateType) => state.Profile.Profile)
    if (UserData) return <EditProfileBlock>
        <SideHeader header={'Info'} prevLink={'Settings'}/>
        <EditAvatar>
            <div>
                <EditAvatarImage src={photo}/>
            </div>
            <div>
                <Upload>
                    <EditAvatarButton>SET PROFILE PHOTO</EditAvatarButton>
                </Upload>
            </div>
        </EditAvatar>
        <div>
            <EditProfileItem ChapterName={'First Name'} FormName={"first_name"}
                             Icon={NameIcon} InitialValue={UserData.first_name? UserData.first_name: 'Click to input'}/>
            <EditProfileItem ChapterName={'Last Name'} FormName={"last_name"}
                             Icon={UserNameIcon} InitialValue={UserData.last_name? UserData.last_name: 'Click to input'}/>
            <EditProfileItem ChapterName={'Phone number'}
                             Icon={PhoneIcon} FormName={"telephone"}
                             InitialValue={UserData.telephone? UserData.telephone: 'Click to input'}/>
        </div>
       <EditProfileItem InitialValue={UserData.about_user} ChapterName={"Bio"} Icon={NameIcon} FormName={"about_user"}/>
    </EditProfileBlock>
    else return <Alert message="Error" description={"Something Downloading Error (("} type="error" showIcon/>
}