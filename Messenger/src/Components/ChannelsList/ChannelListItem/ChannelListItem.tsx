import React, {useState} from "react";
import {
    ChannelAvatar,
    ListItem,
    LastData,
    LastMessage,
    MessagesCount,
    ChannelName,
    LastMessageData,
    Media
} from "./ChannelListItem.styled"
import {Avatar, Badge} from "antd";
import {NotificationOutlined} from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import {useDispatch} from "react-redux";
import {ActivateChannelsSaga} from "../../../Redux/Sagas/ChannelsSaga";
import {ActivateDialogsSaga} from "../../../Redux/Sagas/DialogsSaga";

type PropsType = {
    ChannelPhoto: string
    ChannelName: string
    LastMessageDate: string
    LastMessage: {
        Media: string | null
        Text: string | null
    }
    MessagesCount: number
    IsChannel: boolean
    IsArchived?: true
    id?: number
    IsActive?: boolean
}

export const ChannelListItem: React.FC<PropsType> = (props) => {
    const dispatch = useDispatch()
    const SetDetails = () => {
        if (!props.IsArchived){
            if (props.IsChannel) {
                dispatch(ActivateChannelsSaga.Details(props.id? props.id: 1))
            } else {
                dispatch(ActivateDialogsSaga.Details(props.id? props.id: 1))
            }
        }
    }

    return <NavLink to={props.IsArchived? '/archived_chats': '#'}>
        <ListItem onClick={SetDetails} active = {props.IsActive}>
            <ChannelAvatar src={props.ChannelPhoto}/>
            <ChannelName> {props.IsChannel && <NotificationOutlined/>} {props.ChannelName} </ChannelName>
            <LastData>
                <LastMessageData>
                    {props.LastMessageDate}
                </LastMessageData>
            </LastData>
            <LastMessage style={props.IsArchived? {color: 'black', fontWeight: 600}: undefined}>
                <Media>{props.LastMessage.Media && props.LastMessage.Media + ', '}</Media>
                {props.LastMessage.Text}
            </LastMessage>
            <MessagesCount>
                <Badge style={{backgroundColor: "#CDC5BF"}} showZero count={props.MessagesCount}/>
            </MessagesCount>
        </ListItem>
    </NavLink>

}