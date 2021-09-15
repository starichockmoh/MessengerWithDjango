import React from "react";
import {HeadersName, SettingsHeader, SettingsLink} from "./SideHeader.styled"
import {ArrowLeftOutlined} from "@ant-design/icons"
import { NavLink } from "react-router-dom";

export const SideHeader: React.FC<{header: string, prevLink?: string}> = ({header,prevLink}) => {
    return <SettingsHeader>
            <SettingsLink to={prevLink? prevLink.toLowerCase(): "/menu"}>
                <ArrowLeftOutlined/> {prevLink? prevLink: "Menu"}
            </SettingsLink>
            <HeadersName> {header} </HeadersName>
        </SettingsHeader>

}