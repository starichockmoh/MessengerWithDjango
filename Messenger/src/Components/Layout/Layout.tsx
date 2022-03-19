import React from "react";
import {AppLayout, Search, ChannelHeader, Channels, InfoHeader, Info, Content, Footer} from "./Layout.styled";
import {ChannelList} from "../ChannelsList/ChannelList";
import {ChannelInput} from "../ChannelInput/ChannelInput";
import {Header} from "../ChannelHeader/ChannelHeader";
import {ChannelFooter} from "../FooterContent/ChannelFooter/ChannelFooter";
import {DialogInput} from "../FooterContent/DialogFooter/Dialoginput";
import {ChannelInfo} from "../ChannelInfo/ChannelInfo";
import {ContentBlock} from "../Content/Content";
import {FooterComponent} from "../FooterContent/FooterComponent";
import {useSelector} from "react-redux";
import {AppStateType} from "../../Redux/Store";
import {WithColor} from "../../HOC/withColor";

const ChannelInputWithColors = WithColor(ChannelInput)

export const Layout: React.FC = () => {
    const LayOutColor = useSelector((state: AppStateType) => state.App.LayOutColor)
    return <AppLayout>
        <Search color={LayOutColor}>
            <ChannelInputWithColors/>
        </Search>
        <ChannelHeader color={LayOutColor}>
            <Header isChannel={true} name={'1337 const'} subscribers={46000}/>
        </ChannelHeader>
        <InfoHeader color={LayOutColor}>
            Channel Info
        </InfoHeader>
        <Channels color={LayOutColor}>
            <ChannelList/>
        </Channels>
        <Content>
            <ContentBlock/>
        </Content>
        <Info color={LayOutColor}>
            <ChannelInfo/>
        </Info>
        <Footer color={LayOutColor}>
            <FooterComponent/>
        </Footer>
    </AppLayout>
}