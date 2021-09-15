import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../Redux/Store";
import {ChannelInfoAC, ChannelInfoPageType} from "../../Redux/Reducers/ChannelInfoReducer";
import {ChannelData} from "./ChannelData/ChannelData";
import {ChannelImages} from "./ChannelAttachments/ChannelImages";
import {AdminChannelSettings} from "./AdminChannelSettings/AdminChannelSettings";


export const ChannelInfo: React.FC = () => {
    const CurrentPage = useSelector((state: AppStateType) => state.ChannelInfo.CurrentPage)
    const dispatch = useDispatch()
    const ChangePage = (page: ChannelInfoPageType) => {
        dispatch(ChannelInfoAC.SetPage(page))
    }
    if (CurrentPage === 'INFO') {
        return <ChannelData ChangePage={ChangePage}/>
    } else if (CurrentPage === 'IMAGES'){
        return <ChannelImages ChangePage={ChangePage}/>
    }
    return <AdminChannelSettings/>
}
