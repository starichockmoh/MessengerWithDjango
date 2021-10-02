import React, {useEffect, useState} from "react";
import {
    AddInfoBlock, AudioIcon, FilesIcon, IconBlock, ImageIcon,
    InfoTitle,
    InfoTitleAddInfo,
    InfoTitleAvatar,
    InfoTitleAvatarBlock,
    InfoTitleName, LinksIcon, MediaBlock, MediaContent, MediaContentLink, VideoIcon, VoiceIcon
} from "./ChannelData.styled";
import consta from "../../../Assets/1337.jpg";
import {Description} from "./Description/Description";
import {ChannelOptions} from "./Options/ChannelOptions";
import {ChannelInfoAC, ChannelInfoPageType} from "../../../Redux/Reducers/ChannelInfoReducer";
import {ChannelInfoBlock} from "../ChannelInfo.styled";
import {SpecialLine} from "../../Common/CommonElements.styled";
import {StyledComponent} from "styled-components";
import {numberWithSpaces} from "../../../Helper Functions/ToNiceNumber";
import {DialogOptions} from "./Options/DialigOptions";
import {useSelector} from "react-redux";
import {AppStateType} from "../../../Redux/Store";
import {ToNicePhoneNumber} from "../../../Helper Functions/ToNicePhoneNumber";

type PropsType = {
    ChangePage: (page: ChannelInfoPageType) => void

}

export const ChannelData: React.FC<PropsType> = ({ChangePage}) => {
    const DialogData = useSelector((state: AppStateType) => state.Dialogs.CurrentDialog)
    const ChannelData = useSelector((state: AppStateType) => state.ChannelLists.CurrentChannel)
    const DialogUser = useSelector((state: AppStateType) => state.Dialogs.DialogUser)

    const AvatarsLen = DialogUser?.addit_image.length

    return <ChannelInfoBlock>
        <TitleElement
            AddInfo={DialogData && DialogUser? DialogUser.friends.length : ChannelData? ChannelData.participents.length : 111}
            IsChannel={!!ChannelData}
            Name={DialogData && DialogUser ? DialogUser.username : ChannelData ? ChannelData.title : ''}
            Avatar={DialogData && DialogUser && AvatarsLen
                ? DialogUser.addit_image[AvatarsLen - 1].image
                : ChannelData ? ChannelData.avatar : ''}/>
        <SpecialLine/>
        {ChannelData
            ? <Description isAdmin={true}
                         isChannel={true}
                         ChannelInfo={{Description: ChannelData.description,
                             Link: 't.me/tg13337const'}}/>
            : DialogData
                ? <Description isChannel={false}
                             UserInfo={{
                                 UserName: DialogUser ? DialogUser.first_name + ' ' + DialogUser.last_name : '',
                                 Bio: DialogUser ? DialogUser.about_user : '',
                                 Mobile: DialogUser ? ToNicePhoneNumber(DialogUser.telephone) : ''
                             }}/>
                : null }
        <SpecialLine/>
        <MediaBlock>
            <MediaElement Icon={ImageIcon} Count={'5678 photos'} ChangePage={() => ChangePage('IMAGES')}/>
            <MediaElement Icon={VideoIcon} Count={'300 videos'} ChangePage={() => ChangePage('IMAGES')}/>
            <MediaElement Icon={FilesIcon} Count={'20 audio files'} ChangePage={() => ChangePage('IMAGES')}/>
            <MediaElement Icon={AudioIcon} Count={'5678 photos'} ChangePage={() => ChangePage('IMAGES')}/>
            <MediaElement Icon={VoiceIcon} Count={'3 voice messages'} ChangePage={() => ChangePage('IMAGES')}/>
        </MediaBlock>
        <SpecialLine/>
        {ChannelData ? <ChannelOptions/> : DialogData ? <DialogOptions/> : null}
    </ChannelInfoBlock>
}


type MediaElementPropsType = {
    Icon: StyledComponent<any, any, any, any>
    Count: string
    ChangePage: () => void
}
const MediaElement: React.FC<MediaElementPropsType> = ({Count, Icon, ChangePage}) => {
    return <MediaContent onClick={ChangePage}>
        <IconBlock>
            <Icon/>
        </IconBlock>
        <MediaContentLink>
            {Count}
        </MediaContentLink>
    </MediaContent>
}


type TitleElementPropsType = {
    Name: string
    AddInfo: number
    IsChannel: boolean
    Avatar: string
}
const TitleElement: React.FC<TitleElementPropsType> = ({AddInfo, Name, IsChannel, Avatar}) => {
    return <InfoTitle>
        <InfoTitleAvatarBlock>
            <InfoTitleAvatar src={Avatar}/>
        </InfoTitleAvatarBlock>
        <AddInfoBlock>
            <InfoTitleName>
                {Name}
            </InfoTitleName>
            <InfoTitleAddInfo>
                {numberWithSpaces(AddInfo)} {IsChannel ? 'subscribers' : 'friends'}
            </InfoTitleAddInfo>
        </AddInfoBlock>
    </InfoTitle>
}