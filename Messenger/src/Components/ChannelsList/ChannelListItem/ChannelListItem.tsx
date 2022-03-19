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
import {useDispatch, useSelector} from "react-redux";
import {ActivateChannelsSaga} from "../../../Redux/Sagas/ChannelsSaga";
import {ActivateDialogsSaga} from "../../../Redux/Sagas/DialogsSaga";
import {AppStateType} from "../../../Redux/Store";
import {WithColorType} from "../../../Types/Types";
import { CustomNavLink } from "../../Common/CommonElements.styled";

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
    const LayOutColor = useSelector((state: AppStateType) => state.App.LayOutColor)
    const AdditionalColorActive = useSelector((state: AppStateType) => state.App.AdditionalColorActive)
    const AdditionalColor = useSelector((state: AppStateType) => state.App.AdditionalColor)
    const SetDetails = () => {
        if (!props.IsArchived){
            if (props.IsChannel) {
                dispatch(ActivateChannelsSaga.Details(props.id? props.id: 1))
            } else {
                dispatch(ActivateDialogsSaga.Details(props.id? props.id: 1))
            }
        }
    }

    return <NavLink style={{color: LayOutColor === "white" ? "black" : "white"}}
                    to={props.IsArchived? '/archived_chats': '#'}>
        <ListItem onClick={SetDetails}
                  active = {props.IsActive}
                  color={LayOutColor}
                  additional_color={AdditionalColor}
                  active_color = {AdditionalColorActive}>
            <ChannelAvatar src={props.ChannelPhoto}/>
            <ChannelName> {props.IsChannel && <NotificationOutlined/>} {props.ChannelName} </ChannelName>
            <LastData>
                <LastMessageData>
                    {props.LastMessageDate}
                </LastMessageData>
            </LastData>
            <LastMessage style={props.IsArchived?
                {fontWeight: 600,color: LayOutColor === "white" ? "black" : "white"}: undefined}>
                <Media>{props.LastMessage.Media && props.LastMessage.Media + ', '}</Media>
                {props.LastMessage.Text}
            </LastMessage>
            <MessagesCount>
                <div style={{backgroundColor: LayOutColor === "white" ? "#BBBBBB" : "#3E546A", color: "white"}}>
                    {props.MessagesCount > 99 ? "99+" : props.MessagesCount}
                </div>
            </MessagesCount>
        </ListItem>
    </NavLink>

}