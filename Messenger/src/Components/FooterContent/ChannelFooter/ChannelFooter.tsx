import React, {ChangeEvent, useState} from "react";
import {MuteBlock, MuteButton} from "./ChannelFooter.styled"
import {Button, Input} from "antd";
import {ChannelDetailType} from "../../../Types/Types";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../../Redux/Store";
import {
    AudioIcon, DialogInputBlock,
    DialogInputButton,
    DialogTextArea,
    PaperClipIcon,
    SendIcon,
    SmileIcon
} from "../DialogFooter/Dialoginput.styled";
import {ActivateChannelsSaga} from "../../../Redux/Sagas/ChannelsSaga";

type PropsType = {
    ChannelData: ChannelDetailType
}

export const ChannelFooter: React.FC<PropsType> = ({ChannelData}) => {
    const dispatch = useDispatch()
    const [InputValue, SetInputValue] = useState('')
    const onInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        SetInputValue(e.target.value)
    }
    const CurrentUserID = useSelector((state: AppStateType) => state.Profile.AuthProfile?.pk)
    const AdminsID = [] as Array<number>
    ChannelData.admins.forEach(a => {
        AdminsID.push(a.pk)
    })
    const CreatePost = () => {
        dispatch(ActivateChannelsSaga.CreatePost(InputValue, ChannelData.id))
        SetInputValue('')
    }
    const IsAdmin = CurrentUserID ? CurrentUserID === ChannelData.creator || CurrentUserID in AdminsID : false
    if (IsAdmin) return <DialogInputBlock>
        <DialogInputButton type={"link"} icon = {<PaperClipIcon/>}/>
        <DialogTextArea onChange={onInputChange}
                        value={InputValue} bordered={false}
                        autoSize={{maxRows: 1}}
                        placeholder={'Create post'}/>
        <DialogInputButton type={"link"} icon = {<SmileIcon/>}/>
        {InputValue
            ? <DialogInputButton onClick={CreatePost} type={"link"} icon = {<SendIcon/>}/>
            : <DialogInputButton type={"link"} icon = {<AudioIcon/>}/>}
    </DialogInputBlock>
    return <MuteBlock>
        <MuteButton type={"link"}>MUTE</MuteButton>
    </MuteBlock>
}

