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
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../Redux/Store";
import {dialogsAPI} from "../../Api/DialogsAPI";
import {ActivateDialogsSaga} from "../../Redux/Sagas/DialogsSaga";
import {GetPartItem} from "../../Helper Functions/GetPartItem";
import {ToNiceDate} from "../../Helper Functions/ToNiceDate";
import {channelAPI} from "../../Api/ChannelAPI";
import {ActivateChannelsSaga} from "../../Redux/Sagas/ChannelsSaga";


export const ChannelList: React.FC = () => {
    const CurrentList = useSelector((state: AppStateType) => state.ChannelLists.CurrentList)
    const CurrentUserID = useSelector((state: AppStateType) => state.Profile.AuthProfile?.pk)
    const DialogsData = useSelector((state: AppStateType) => state.Dialogs.Dialogs)
    const ChannelsData = useSelector((state: AppStateType) => state.ChannelLists.Channels)

    const dispatch = useDispatch()

    useEffect(() => {
        CurrentList === 'DIALOGS' ?
            dispatch(ActivateDialogsSaga.Dialogs(false))
            :
            dispatch(ActivateChannelsSaga.Channels())

    }, [CurrentList])

    const ChannelsItems = ChannelsData?.map(d => <ChannelListItem
        ChannelPhoto={d.avatar}
        ChannelName={d.title}
        LastMessageDate={ToNiceDate(d.get_posts[d.get_posts.length - 1]?.datetime)}
        LastMessage={{
            Media: null,
            Text: d.get_posts[d.get_posts.length - 1]?.text
        }}
        MessagesCount={d.get_posts.length}
        key={d.pk}
        id = {d.pk}
        IsChannel={true}/>)

    const DialogsItems = DialogsData?.map(d => <ChannelListItem
        ChannelPhoto={GetPartItem(d.participants, CurrentUserID, "photo")}
        ChannelName={GetPartItem(d.participants, CurrentUserID, "name")}
        LastMessageDate={ToNiceDate(d.get_messeges[d.get_messeges.length - 1]?.datetime)}
        id = {d.pk}
        key={d.pk}
        LastMessage={{
            Media: null,
            Text: d.get_messeges[d.get_messeges.length - 1]?.text
        }}
        MessagesCount={d.get_messeges.length}
        IsChannel={false}/>)


    if (CurrentList === 'CHANNELS') {
        return <ChannelsBlock>
            <ChannelListItem ChannelPhoto={archive} ChannelName={'Archive Chats'}
                             LastMessageDate={''} MessagesCount={390}
                             LastMessage={{Media: null, Text: 'Биржа, Димон, 228клуб, Группа анонимных алкашей'}}
                             IsChannel={false}
                             IsArchived={true}/>
            {ChannelsItems}
        </ChannelsBlock>
    } else {
        return <ChannelsBlock>
            <ChannelListItem ChannelPhoto={archive} ChannelName={'Archive Chats'}
                             LastMessageDate={''} MessagesCount={390}
                             LastMessage={{Media: null, Text: 'Биржа, Димон, 228клуб, Группа анонимных алкашей'}}
                             IsChannel={false}
                             IsArchived={true}
            />
            {DialogsItems}
        </ChannelsBlock>
    }
}