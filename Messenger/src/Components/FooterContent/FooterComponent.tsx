import React from "react";
import {useSelector} from "react-redux";
import {AppStateType} from "../../Redux/Store";
import {ChannelFooter} from "./ChannelFooter/ChannelFooter";
import {DialogInput} from "./DialogFooter/Dialoginput";


export const FooterComponent: React.FC = () => {
    const ChannelData = useSelector((state: AppStateType) => state.ChannelLists.CurrentChannel)
    const DialogData = useSelector((state: AppStateType) => state.Dialogs.CurrentDialog)

    if (!!ChannelData) return <ChannelFooter ChannelData = {ChannelData}/>
    else if (!!DialogData) return <DialogInput DialogID = {DialogData.pk}/>
    return <>
    </>

}