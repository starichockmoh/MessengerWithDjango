import React from "react";
import {MuteBlock, MuteButton} from "./ChannelFooter.styled"
import {Button} from "antd";

export const ChannelFooter: React.FC = () => {
    return <MuteBlock>
        <MuteButton type={"link"}>MUTE</MuteButton>
    </MuteBlock>
}