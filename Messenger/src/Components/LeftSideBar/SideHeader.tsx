import React from "react";
import {HeadersName, SettingsHeader, SettingsLink} from "./SideHeader.styled"
import {ArrowLeftOutlined} from "@ant-design/icons"
import { NavLink } from "react-router-dom";
import {useSelector} from "react-redux";
import {AppStateType} from "../../Redux/Store";

export const SideHeader: React.FC<{header: string, prevLink?: string}> = ({header,prevLink}) => {
    const AdditionalColorActive = useSelector((state: AppStateType) => state.App.AdditionalColorActive)
    return <SettingsHeader color={AdditionalColorActive}>
            <SettingsLink to={prevLink? prevLink.toLowerCase(): "/menu"}>
                <ArrowLeftOutlined/> {prevLink? prevLink: "Menu"}
            </SettingsLink>
            <HeadersName> {header} </HeadersName>
        </SettingsHeader>

}