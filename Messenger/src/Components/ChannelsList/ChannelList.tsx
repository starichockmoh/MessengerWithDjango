import React, {useEffect, useState} from "react";
import {ChannelListItem} from "./ChannelListItem/ChannelListItem";
import butil from "./../../Assets/photo_2020-07-20_12-54-28.jpg"
import seva from "./../../Assets/photo_2017-11-03_18-44-32.jpg"
import consta from "./../../Assets/1337.jpg"
import amds from "./../../Assets/amds.jpg"
import topor from "./../../Assets/topor.jpg"
import screp from "./../../Assets/screp.jpg"
import archive from "./../../Assets/arc.png"
import {ChannelsBlock} from "./ChannelList.styled";
import {useSelector} from "react-redux";
import {AppStateType} from "../../Redux/Store";


export const ChannelList: React.FC = () => {
    const CurrentList = useSelector((state: AppStateType) => state.ChannelLists.CurrentList)
    if (CurrentList === 'CHANNELS') {
        return <ChannelsBlock>
            <ChannelListItem ChannelPhoto={archive} ChannelName={'Archive Chats'}
                             LastMessageData={''} MessagesCount={390}
                             LastMessage={{Media: null, Text: 'Биржа, Димон, 228клуб, Группа анонимных алкашей'}}
                             IsChannel={false}
                             IsArchived={true}
            />
            <ChannelListItem ChannelPhoto={butil} ChannelName={'Бутылка'}
                             LastMessageData={'13:00'} MessagesCount={45}
                             LastMessage={{Media: 'Video', Text: 'Этим и объясняется почему Лёха решил'}}
                             IsChannel={true}
            />
            <ChannelListItem ChannelPhoto={consta} ChannelName={'1337 Const'}
                             LastMessageData={'18:00'} MessagesCount={67}
                             LastMessage={{
                                 Media: 'Photo',
                                 Text: 'В Питере уволили охранников пространства "Севкабель '
                             }}
                             IsChannel={true}
            />
            <ChannelListItem ChannelPhoto={amds} ChannelName={'AMDWS'}
                             LastMessageData={'13:00'} MessagesCount={1000}
                             LastMessage={{Media: 'Photo', Text: 'как тебе такое, Петар Мартич'}} IsChannel={true}/>
            <ChannelListItem ChannelPhoto={topor} ChannelName={'Топор 18+'}
                             LastMessageData={'18:00'} MessagesCount={4}
                             LastMessage={{Media: null, Text: 'Власти австралийской Виктории объявили о введении '}}
                             IsChannel={true}/>
            <ChannelListItem ChannelPhoto={screp} ChannelName={'Скрепа'}
                             LastMessageData={'13:24'} MessagesCount={7}
                             LastMessage={{Media: 'Photo', Text: 'Что?'}} IsChannel={true}/>
            <ChannelListItem ChannelPhoto={butil} ChannelName={'Бутылка'}
                             LastMessageData={'13:00'} MessagesCount={45}
                             LastMessage={{Media: 'Video', Text: 'Этим и объясняется почему Лёха решил'}}
                             IsChannel={true}/>
            <ChannelListItem ChannelPhoto={topor} ChannelName={'Топор 18+'}
                             LastMessageData={'18:00'} MessagesCount={4}
                             LastMessage={{Media: null, Text: 'Власти австралийской Виктории объявили о введении '}}
                             IsChannel={true}/>
            <ChannelListItem ChannelPhoto={screp} ChannelName={'Скрепа'}
                             LastMessageData={'13:24'} MessagesCount={7}
                             LastMessage={{Media: 'Photo', Text: 'Что?'}} IsChannel={true}/>
            <ChannelListItem ChannelPhoto={butil} ChannelName={'Бутылка'}
                             LastMessageData={'13:00'} MessagesCount={45}
                             LastMessage={{Media: 'Video', Text: 'Этим и объясняется почему Лёха решил'}}
                             IsChannel={true}/>
            <ChannelListItem ChannelPhoto={topor} ChannelName={'Топор 18+'}
                             LastMessageData={'18:00'} MessagesCount={4}
                             LastMessage={{Media: null, Text: 'Власти австралийской Виктории объявили о введении '}}
                             IsChannel={true}/>
            <ChannelListItem ChannelPhoto={screp} ChannelName={'Скрепа'}
                             LastMessageData={'13:24'} MessagesCount={7}
                             LastMessage={{Media: 'Photo', Text: 'Что?'}} IsChannel={true}/>
            <ChannelListItem ChannelPhoto={butil} ChannelName={'Бутылка'}
                             LastMessageData={'13:00'} MessagesCount={45}
                             LastMessage={{Media: 'Video', Text: 'Этим и объясняется почему Лёха решил'}}
                             IsChannel={true}/>
            <ChannelListItem ChannelPhoto={consta} ChannelName={'1337 Const'}
                             LastMessageData={'18:00'} MessagesCount={67}
                             LastMessage={{
                                 Media: 'Photo',
                                 Text: 'В Питере уволили охранников пространства "Севкабель '
                             }}
                             IsChannel={true}/>
            <ChannelListItem ChannelPhoto={amds} ChannelName={'AMDWS'}
                             LastMessageData={'13:00'} MessagesCount={1000}
                             LastMessage={{Media: 'Photo', Text: 'как тебе такое, Петар Мартич'}} IsChannel={true}/>
            <ChannelListItem ChannelPhoto={topor} ChannelName={'Топор 18+'}
                             LastMessageData={'18:00'} MessagesCount={4}
                             LastMessage={{Media: null, Text: 'Власти австралийской Виктории объявили о введении '}}
                             IsChannel={true}/>
            <ChannelListItem ChannelPhoto={screp} ChannelName={'Скрепа'}
                             LastMessageData={'13:24'} MessagesCount={7}
                             LastMessage={{Media: 'Photo', Text: 'Что?'}} IsChannel={true}/>
        </ChannelsBlock>
    } else {
        return <ChannelsBlock>
            <ChannelListItem ChannelPhoto={archive} ChannelName={'Archive Chats'}
                             LastMessageData={''} MessagesCount={390}
                             LastMessage={{Media: null, Text: 'Биржа, Димон, 228клуб, Группа анонимных алкашей'}}
                             IsChannel={false}
                             IsArchived={true}
            />
            <ChannelListItem ChannelPhoto={seva} ChannelName={'Всеволод'}
                             LastMessageData={'15:42'} MessagesCount={5}
                             LastMessage={{Media: null, Text: '‼Сегодня стало известно что репер Lil Peep жив.'}}
                             IsChannel={false}/>
        </ChannelsBlock>
    }
}