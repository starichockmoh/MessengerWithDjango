import React, {useEffect, useState} from "react";
import {ChannelListItem} from "./ChannelListItem/ChannelListItem";
import butil from "./../../Assets/photo_2020-07-20_12-54-28.jpg"
import seva from "./../../Assets/photo_2017-11-03_18-44-32.jpg"
import consta from "./../../Assets/1337.jpg"
import amds from "./../../Assets/amds.jpg"
import topor from "./../../Assets/topor.jpg"
import screp from "./../../Assets/screp.jpg"
import {ArchivedChannelsBlock, ArchivedChannelsHeader, BackButton} from "./ChannelList.styled";
import {ArrowLeftOutlined} from "@ant-design/icons";
import {NavLink} from "react-router-dom";
import {ActivateDialogsSaga} from "../../Redux/Sagas/DialogsSaga";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../Redux/Store";
import {ToNiceDate} from "../../Helper Functions/ToNiceDate";
import {ParticipantType, WithColorType} from "../../Types/Types";
import {GetPartItem} from "../../Helper Functions/GetPartItem";
import {ChannelListsAC} from "../../Redux/Reducers/ChannelListsReducer";
import {ActivateChannelsSaga} from "../../Redux/Sagas/ChannelsSaga";
import {ToCorrectImage} from "../../Helper Functions/ToCorrectImage";


export const ArchivedChannelList: React.FC<WithColorType> = ({LayOutColor, AdditionalColorActive}) => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(ActivateDialogsSaga.Dialogs(true))
    }, [])

    const CurrentDialogID = useSelector((state: AppStateType) => state.Dialogs.CurrentDialog?.pk)
    const CurrentUserID = useSelector((state: AppStateType) => state.Profile.AuthProfile?.pk)
    const DialogsData = useSelector((state: AppStateType) => state.Dialogs.Dialogs)
    const CurrentListState = useSelector((state: AppStateType) => state.ChannelLists.CurrentList)

    const GoBack = () => {
        CurrentListState === "DIALOGS" ?
            dispatch(ActivateDialogsSaga.Dialogs(false))
            : dispatch(ActivateChannelsSaga.Channels())
    }


    const DialogsItems = DialogsData?.map(d => <ChannelListItem
        ChannelPhoto={ToCorrectImage(GetPartItem(d.participants, CurrentUserID, "photo"))}
        ChannelName={GetPartItem(d.participants, CurrentUserID, "name")}
        LastMessageDate={ToNiceDate(d.date_of_last_message)}
        LastMessage={{
            Media: null,
            Text: d.last_message.text
        }}
        MessagesCount={Math.floor(Math.random() * 100 / 10)}
        id={d.pk}
        IsActive={d.pk === CurrentDialogID}
        key={d.pk}
        IsChannel={false}/>)

    return <ArchivedChannelsBlock color={LayOutColor}>
        <ArchivedChannelsHeader color={AdditionalColorActive}>
            <NavLink to={''}>
                <BackButton onClick={GoBack} type={"link"} icon={<ArrowLeftOutlined/>}/>
            </NavLink>
            <div>
                Archived Chats
            </div>
        </ArchivedChannelsHeader>
        <div style={{height: '93vh'}}>
            {DialogsItems}
        </div>

    </ArchivedChannelsBlock>
}