import React, {useEffect} from "react";
import {ChannelListItem} from "./ChannelListItem/ChannelListItem";
import butil from "./../../Assets/photo_2020-07-20_12-54-28.jpg"
import seva from "./../../Assets/photo_2017-11-03_18-44-32.jpg"
import consta from "./../../Assets/1337.jpg"
import amds from "./../../Assets/amds.jpg"
import topor from "./../../Assets/topor.jpg"
import screp from "./../../Assets/screp.jpg"
import archive from "./../../Assets/arc.png"
import {ArchivedChannelsBlock, ArchivedChannelsHeader, BackButton, ChannelsBlock} from "./ChannelList.styled";
import {Button} from "antd";
import {ArrowLeftOutlined} from "@ant-design/icons";
import { CustomNavLink } from "../Common/CommonElements.styled";
import { NavLink } from "react-router-dom";
import {dialogsAPI} from "../../Api/DialogsAPI";
import {ActivateDialogsSaga} from "../../Redux/Sagas/DialogsSaga";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../Redux/Store";
import {Media} from "./ChannelListItem/ChannelListItem.styled";
import {ToNiceDate} from "../../Helper Functions/ToNiceDate";


export const ArchivedChannelList: React.FC = () => {
    const dispatch = useDispatch()
    ToNiceDate()

    useEffect(() => {
        dispatch(ActivateDialogsSaga.Dialogs(true))
    }, [])

    const DialogsData = useSelector((state: AppStateType) => state.Dialogs.Dialogs)
    const DialogsItems = DialogsData?.map(d => <ChannelListItem ChannelPhoto={butil}
                                                                ChannelName={'OO'}
                                                                // LastMessageDate={d.get_messeges[d.get_messeges.length - 1].datetime}
        LastMessageDate={ToNiceDate()}
                                                                LastMessage={{Media: null, Text: d.get_messeges[d.get_messeges.length - 1].text}}
                                                                MessagesCount={d.get_messeges.length}
                                                                IsChannel={false}/>)

    return <ArchivedChannelsBlock>
        <ArchivedChannelsHeader>
            <NavLink to={''}>
                <BackButton type={"link"} icon={<ArrowLeftOutlined />}/>
            </NavLink>
            <div>
                Archived Chats
            </div>
        </ArchivedChannelsHeader>
        <div style={{height: '93vh'}}>
            {DialogsItems}
            <ChannelListItem ChannelPhoto={butil} ChannelName={'Бутылка'}
                             LastMessageDate={'13:00'} MessagesCount={45}
                             LastMessage={{Media: 'Video', Text: 'Этим и объясняется почему Лёха решил'}}
                             IsChannel={true}
            />
            <ChannelListItem ChannelPhoto={seva} ChannelName={'Всеволод'}
                             LastMessageDate={'15:42'} MessagesCount={5}
                             LastMessage={{Media: null, Text: '‼Сегодня стало известно что репер Lil Peep жив.'}}
                             IsChannel={false}/>
            <ChannelListItem ChannelPhoto={consta} ChannelName={'1337 Const'}
                             LastMessageDate={'18:00'} MessagesCount={67}
                             LastMessage={{Media: 'Photo', Text: 'В Питере уволили охранников пространства "Севкабель '}}
                             IsChannel={true}
            />
            <ChannelListItem ChannelPhoto={amds} ChannelName={'AMDWS'}
                             LastMessageDate={'13:00'} MessagesCount={1000}
                             LastMessage={{Media: 'Photo', Text: 'как тебе такое, Петар Мартич'}} IsChannel={true}/>
            <ChannelListItem ChannelPhoto={topor} ChannelName={'Топор 18+'}
                             LastMessageDate={'18:00'} MessagesCount={4}
                             LastMessage={{Media: null, Text: 'Власти австралийской Виктории объявили о введении '}}
                             IsChannel={true}/>
            <ChannelListItem ChannelPhoto={screp} ChannelName={'Скрепа'}
                             LastMessageDate={'13:24'} MessagesCount={7}
                             LastMessage={{Media: 'Photo', Text: 'Что?'}} IsChannel={true}/>
            <ChannelListItem ChannelPhoto={butil} ChannelName={'Бутылка'}
                             LastMessageDate={'13:00'} MessagesCount={45}
                             LastMessage={{Media: 'Video', Text: 'Этим и объясняется почему Лёха решил'}} IsChannel={true}/>
            <ChannelListItem ChannelPhoto={topor} ChannelName={'Топор 18+'}
                             LastMessageDate={'18:00'} MessagesCount={4}
                             LastMessage={{Media: null, Text: 'Власти австралийской Виктории объявили о введении '}}
                             IsChannel={true}/>
            <ChannelListItem ChannelPhoto={screp} ChannelName={'Скрепа'}
                             LastMessageDate={'13:24'} MessagesCount={7}
                             LastMessage={{Media: 'Photo', Text: 'Что?'}} IsChannel={true}/>
            <ChannelListItem ChannelPhoto={butil} ChannelName={'Бутылка'}
                             LastMessageDate={'13:00'} MessagesCount={45}
                             LastMessage={{Media: 'Video', Text: 'Этим и объясняется почему Лёха решил'}} IsChannel={true}/>
            <ChannelListItem ChannelPhoto={topor} ChannelName={'Топор 18+'}
                             LastMessageDate={'18:00'} MessagesCount={4}
                             LastMessage={{Media: null, Text: 'Власти австралийской Виктории объявили о введении '}}
                             IsChannel={true}/>
            <ChannelListItem ChannelPhoto={screp} ChannelName={'Скрепа'}
                             LastMessageDate={'13:24'} MessagesCount={7}
                             LastMessage={{Media: 'Photo', Text: 'Что?'}} IsChannel={true}/>
            <ChannelListItem ChannelPhoto={butil} ChannelName={'Бутылка'}
                             LastMessageDate={'13:00'} MessagesCount={45}
                             LastMessage={{Media: 'Video', Text: 'Этим и объясняется почему Лёха решил'}} IsChannel={true}/>
            <ChannelListItem ChannelPhoto={consta} ChannelName={'1337 Const'}
                             LastMessageDate={'18:00'} MessagesCount={67}
                             LastMessage={{Media: 'Photo', Text: 'В Питере уволили охранников пространства "Севкабель '}}
                             IsChannel={true}
            />
            <ChannelListItem ChannelPhoto={amds} ChannelName={'AMDWS'}
                             LastMessageDate={'13:00'} MessagesCount={1000}
                             LastMessage={{Media: 'Photo', Text: 'как тебе такое, Петар Мартич'}} IsChannel={true}/>
            <ChannelListItem ChannelPhoto={topor} ChannelName={'Топор 18+'}
                             LastMessageDate={'18:00'} MessagesCount={4}
                             LastMessage={{Media: null, Text: 'Власти австралийской Виктории объявили о введении '}}
                             IsChannel={true}/>
            <ChannelListItem ChannelPhoto={screp} ChannelName={'Скрепа'}
                             LastMessageDate={'13:24'} MessagesCount={7}
                             LastMessage={{Media: 'Photo', Text: 'Что?'}} IsChannel={true}/>
        </div>

    </ArchivedChannelsBlock>
}