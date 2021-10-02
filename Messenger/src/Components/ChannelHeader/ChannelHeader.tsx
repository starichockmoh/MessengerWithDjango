import React from "react";
import {
    AdditionalData,
    HeaderBlock,
    IconsBlock,
    IconsBlockButton,
    MoreInfoIcon,
    Name, PhoneIcon,
    SearchIcon
} from "./ChannelHeader.styled"
import {Button, Dropdown, Menu} from "antd";
import {SearchOutlined} from "@ant-design/icons";
import {numberWithSpaces} from "../../Helper Functions/ToNiceNumber";
import {useSelector} from "react-redux";
import {AppStateType} from "../../Redux/Store";
import {ToNiceDate} from "../../Helper Functions/ToNiceDate";

type PropsType = {
    name: string
    subscribers?: number
    lastData?: string
    isChannel: boolean
}

const menu = <Menu>
    <Menu.Item key="0">Disable notifications</Menu.Item>
    <Menu.Item key="1">Share with contact</Menu.Item>
    <Menu.Item key="3">Edit contact</Menu.Item>
    <Menu.Item key="4">Delete contact</Menu.Item>
    <Menu.Item key="5">Export chat history</Menu.Item>
    <Menu.Item key="6">Delete chat</Menu.Item>
    <Menu.Item key="7">Clear history</Menu.Item>
</Menu>
const channelMenu = <Menu>
    <Menu.Item key="0">Disable notifications</Menu.Item>
    <Menu.Item key="1">View discussions</Menu.Item>
    <Menu.Item key="3">Export channel history</Menu.Item>
    <Menu.Item key="4">Leave channel</Menu.Item>
    <Menu.Item key="5">Report</Menu.Item>
</Menu>


export const Header: React.FC<PropsType> = ({subscribers, name, isChannel, lastData}) => {
    const ChannelData = useSelector((state: AppStateType) => state.ChannelLists.CurrentChannel)
    const DialogUser = useSelector((state: AppStateType) => state.Dialogs.DialogUser)

    return <HeaderBlock>
        <div>
            <Name>
                {!!ChannelData ? ChannelData.title : !!DialogUser ? DialogUser.username : ''}
            </Name>
            <AdditionalData>
                {!!ChannelData
                    ? numberWithSpaces(ChannelData.participents.length) + ' subscribers'
                    : !!DialogUser
                        ? 'last seen at ' + ToNiceDate(DialogUser.last_active ? DialogUser.last_active : '')
                        : null}
            </AdditionalData>
        </div>
        <IconsBlock>
            <IconsBlockButton type={"link"} icon={<SearchIcon/>}/>
            {!!DialogUser && <IconsBlockButton type={"link"} icon={<PhoneIcon/>}/>}
            <Dropdown overlay={!!ChannelData ? channelMenu : menu} trigger={['click']} placement={'bottomRight'}>
                <IconsBlockButton type={"link"} icon={<MoreInfoIcon/>}/>
            </Dropdown>
        </IconsBlock>


    </HeaderBlock>
}