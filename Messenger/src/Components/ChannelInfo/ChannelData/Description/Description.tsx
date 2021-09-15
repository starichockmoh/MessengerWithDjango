import React from "react";
import {
    ChannelLink,
    Chapter,
    DescIcon,
    DescriptionBlock, DescriptionContent,
    DescriptionContentBlock, NotificationBlock, NotificationIcon, IconBlock, SettingsIcon, SettingsBlock
} from "./Description.styled"
import {ExclamationCircleOutlined} from "@ant-design/icons";
import { Switch } from "antd";
import { LineHr } from "../../../Common/CommonElements.styled";
import {useDispatch, useSelector} from "react-redux";
import {ChannelInfoAC} from "../../../../Redux/Reducers/ChannelInfoReducer";
const {SetPage} = ChannelInfoAC


type PropsType = {
    isChannel: boolean
    UserInfo?: {
        Mobile: string
        Bio: string
        UserName: string
    }
    ChannelInfo?: {
        Link: string
        Description: string
    }
    isAdmin?: true
}

export const Description: React.FC<PropsType> = ({isChannel, ChannelInfo, UserInfo}) => {
    const dispatch = useDispatch()

    return <DescriptionBlock>
        <IconBlock>
            <DescIcon/>
        </IconBlock>
        <DescriptionContentBlock>
            {ChannelInfo? <Channel ChannelInfo={ChannelInfo}/>: UserInfo? <User UserInfo={UserInfo}/> : null}
            <LineHr/>
        </DescriptionContentBlock>
        <IconBlock>
            <NotificationIcon/>
        </IconBlock>
        <NotificationBlock>
                Notifications
                <Switch size="small"/>
        </NotificationBlock>
        <IconBlock>
            <SettingsIcon/>
        </IconBlock>
        <SettingsBlock onClick={() => dispatch(SetPage("SETTINGS"))}>
            Channel Settings
        </SettingsBlock>
    </DescriptionBlock>
}





type ChannelPropsType = {
    ChannelInfo: {
        Link: string
        Description: string
    }
}
const Channel: React.FC<ChannelPropsType> = ({ChannelInfo}) => {
    return <>
        <ChannelLink>
            {ChannelInfo.Link}
        </ChannelLink>
        <Chapter>
            Link
        </Chapter>
        <DescriptionContent>
            {ChannelInfo.Description}
        </DescriptionContent>
        <Chapter>
            Description
        </Chapter>
    </>
}





type UserPropsType = {
    UserInfo: {
        Mobile: string
        Bio: string
        UserName: string
    }
}
const User: React.FC<UserPropsType> = ({UserInfo}) => {
    return <>
        <DescriptionContent>
            {UserInfo.Mobile}
        </DescriptionContent>
        <Chapter>
            Mobile
        </Chapter>
        <DescriptionContent>
            {UserInfo.Bio}
        </DescriptionContent>
        <Chapter>
            Bio
        </Chapter>
        <DescriptionContent>
            {UserInfo.UserName}
        </DescriptionContent>
        <Chapter>
            Username
        </Chapter>
    </>
}