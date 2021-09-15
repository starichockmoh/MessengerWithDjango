import React from "react";
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

export const SettingsPage: React.FC = () => {
    return <Settings>
        <SideHeader header={'Settings'}/>
        <UserProfile Avatar={seva} Name={'Сева Борисян'}/>
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
}
const UserProfile: React.FC<UserProfilePropsType> = ({Name, Avatar}) => {
    return <UserBlock>
        <UserBlock_Avatar>
            <Avatar_UserAvatar src={Avatar}/>
        </UserBlock_Avatar>
        <UserBlock_AdInfo>
            <AdInfo_Name>
                {Name}
            </AdInfo_Name>
            <AdInfo_Online>
                online
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