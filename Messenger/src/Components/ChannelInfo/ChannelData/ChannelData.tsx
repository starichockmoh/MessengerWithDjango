import React from "react";
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

type PropsType = {
    ChangePage: (page: ChannelInfoPageType) => void

}

export const ChannelData: React.FC<PropsType> = ({ChangePage}) => {
    let text = 'Канал патриархальных констерваторов\n' +
        '\n' +
        'По всем вопросам:\n' +
        '@shatatel_skrep\n' +
        '(@SvaroGG_WP, @dedrov2000, @ovent18, \n' +
        '@eduardnefascist)\n' +
        '\n' +
        'Рекламный менеджер: \n' +
        '@robertzzapusk\n' +
        '\n' +
        'Чат - t.me/joinchat/VenLIrtIhfrioKBN'

    return <ChannelInfoBlock>
        <TitleElement AddInfo={24000} IsChannel={true} Name={'1337 const'} Avatar={consta}/>
        <SpecialLine/>
        <Description isAdmin={true} isChannel={true} ChannelInfo={{Description: text, Link: 't.me/tg13337const'}}/>
        {/*<Description isChannel={false} UserInfo={{UserName: '@ilisseo', Bio: 'yoy', Mobile: '+7-919-78-21-90'}}/>*/}
        <SpecialLine/>
        <MediaBlock>
            <MediaElement Icon={ImageIcon} Count={'5678 photos'} ChangePage={() => ChangePage('IMAGES')}/>
            <MediaElement Icon={VideoIcon} Count={'300 videos'}  ChangePage={() => ChangePage('IMAGES')}/>
            <MediaElement Icon={FilesIcon} Count={'20 audio files'}  ChangePage={() => ChangePage('IMAGES')}/>
            <MediaElement Icon={AudioIcon} Count={'5678 photos'}  ChangePage={() => ChangePage('IMAGES')}/>
            <MediaElement Icon={VoiceIcon} Count={'3 voice messages'}  ChangePage={() => ChangePage('IMAGES')}/>
        </MediaBlock>
        <SpecialLine/>
        <ChannelOptions/>
        {/*<DialogOptions/>*/}
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