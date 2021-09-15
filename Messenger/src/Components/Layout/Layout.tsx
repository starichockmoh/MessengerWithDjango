import React from "react";
import {AppLayout, Search, ChannelHeader, Channels, InfoHeader, Info, Content, Footer} from "./Layout.styled";
import {ChannelList} from "../ChannelsList/ChannelList";
import {ChannelInput} from "../ChannelInput/ChannelInput";
import {Header} from "../ChannelHeader/ChannelHeader";
import {ChannelFooter} from "../FooterContent/ChannelFooter/ChannelFooter";
import {DialogInput} from "../FooterContent/DialogFooter/Dialoginput";
import {ChannelInfo} from "../ChannelInfo/ChannelInfo";
import {ContentBlock} from "../Content/Content";



export const Layout: React.FC = () => {
    return <AppLayout>
        <Search>
            <ChannelInput/>
        </Search>
        <ChannelHeader>
            <Header isChannel={true} name={'1337 const'} subscribers={46000}/>
        </ChannelHeader>
        <InfoHeader>
            Channel Info
        </InfoHeader>
        <Channels>
            <ChannelList/>
        </Channels>
        <Content>
            <ContentBlock/>
        </Content>
        <Info>
            <ChannelInfo/>
        </Info>
        <Footer>
            <DialogInput/>
        </Footer>
    </AppLayout>
}