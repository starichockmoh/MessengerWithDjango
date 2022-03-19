import React from "react";
import {MessageBlock, MessageData, MessageInfo, TickIcon} from "./Message.styled"
import {Image} from "antd";
import {useSelector} from "react-redux";
import {AppStateType} from "../../../../Redux/Store";

type PropsType = {
    Text?: string
    Media?: {
        photo?: string
    }
    Date: string
    IsFriend: boolean
}
export const Message: React.FC<PropsType> = ({Media, Text, Date, IsFriend}) => {
    const LayOutColor = useSelector((state: AppStateType) => state.App.LayOutColor)
    return <MessageBlock IsFriend={IsFriend} color={LayOutColor}>
        <div>
            <MessageInfo>
                {Text}
                {Media? Media.photo && <Image src={Media.photo}/> : null }
            </MessageInfo>
            {!Media?.photo &&
            <MessageData>
                {Date}
                {!IsFriend && <TickIcon/>}
            </MessageData>}
        </div>
    </MessageBlock>
}