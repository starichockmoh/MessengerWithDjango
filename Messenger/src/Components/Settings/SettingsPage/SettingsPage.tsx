import React, {useEffect} from "react";
import {
    AdInfo_Name, AdInfo_Online, AdvancedIcon,
    Avatar_UserAvatar, ChatIcon, EditIcon, FAQIcon, FoldersIcon, NotificationsIcon, SecurityIcon,
    Settings, SettingsItem,
    UserBlock,
    UserBlock_AdInfo,
    UserBlock_Avatar
} from "./SettingsPage.styled"
import seva from "./../../../Assets/photo_2017-11-03_18-44-32.jpg"
import {SideHeader} from "../../LeftSideBar/SideHeader";
import {Upload} from "antd";
import {CustomNavLink, SpecialLine} from "../../Common/CommonElements.styled";
import {StyledComponent} from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../../Redux/Store";
import {ActivateProfileSaga} from "../../../Redux/Sagas/ProfileSaga";

export const SettingsPage: React.FC = () => {
    const dispatch = useDispatch()
    const UserID = useSelector((state: AppStateType) => state.Profile.AuthProfile?.pk)

    useEffect(() => {
        UserID && dispatch(ActivateProfileSaga.Profile(UserID))
    }, [UserID])

    const UserData = useSelector((state: AppStateType) => state.Profile.Profile)
    return <Settings>
        <SideHeader header={'Settings'}/>
        {UserData && <UserProfile Avatar={seva} Name={UserData.username} Is_online={UserData.is_online}/>}
        <SpecialLine/>
        <SettingsElement Setting={'Edit profile'} Icon={EditIcon} Link={'/edit_profile'}/>
        <SettingsElement Setting={'Security'} Icon={SecurityIcon} Link={'/edit_profile'}/>
        <SettingsElement Setting={'Chats'} Icon={ChatIcon} Link={'/edit_profile'}/>
        <SettingsElement Setting={'Folders'} Icon={FoldersIcon} Link={'/edit_profile'}/>
        <SettingsElement Setting={'Advanced'} Icon={AdvancedIcon} Link={'/edit_profile'}/>
        <SpecialLine/>
        <SettingsElement Setting={'FAQ'} Icon={FAQIcon} Link={'/edit_profile'}/>
        <SettingsElement Setting={'Ask a Question'} AddStyle={{color: "#08c"}} Link={'/edit_profile'}/>
    </Settings>
}


type UserProfilePropsType = {
    Avatar: string
    Name: string
    Is_online: boolean
}
const UserProfile: React.FC<UserProfilePropsType> = ({Name, Avatar, Is_online}) => {
    return <UserBlock>
        <UserBlock_Avatar>
            <Avatar_UserAvatar src={Avatar}/>
        </UserBlock_Avatar>
        <UserBlock_AdInfo>
            <AdInfo_Name>
                {Name}
            </AdInfo_Name>
            <AdInfo_Online>
                {Is_online? "online" : "offline"}
            </AdInfo_Online>
        </UserBlock_AdInfo>
    </UserBlock>
}

type SettingsElementPropsType = {
    Icon?: StyledComponent<any, any, any, any>
    Setting: string
    AddStyle?: { color: string }
    Link: string
}
const SettingsElement: React.FC<SettingsElementPropsType> =
    ({Setting, Icon, AddStyle, Link}) => {
        return <SettingsItem>
            {Icon ? <Icon/> : <div/>}
            <div style={AddStyle}>
                <CustomNavLink to={Link} style={AddStyle}>
                    {Setting}
                </CustomNavLink>
            </div>
        </SettingsItem>
    }