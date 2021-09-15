import React from "react";
import {MessageBlock, MessageData, MessageInfo, TickIcon} from "./Message.styled"
import {Image} from "antd";

type PropsType = {
    Text?: string
    Media?: {
        photo?: string
    }
    Date: string
    IsFriend: boolean
}
export const Message: React.FC<PropsType> = ({Media, Text, Date, IsFriend}) => {
    return <MessageBlock IsFriend={IsFriend}>
        <div>
            <MessageInfo>
                {Text}
                {Media? Media.photo && <Image src={Media.photo}/> : null }
            </MessageInfo>
            {!Media &&
            <MessageData>
                {Date}
                {!IsFriend && <TickIcon/>}
            </MessageData>}
        </div>
    </MessageBlock>
}