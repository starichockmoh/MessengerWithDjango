import React, {useEffect, useState} from "react";
import {BrowserRouter, Route, Switch, useHistory} from "react-router-dom";
import {Menu} from "../Menu/Menu";
import {SettingsPage} from "../Settings/SettingsPage/SettingsPage";
import {CSSTransition} from "react-transition-group";
import "./AnimationSideBar.css"
import { Calls } from "../Calls/Calls";
import {Contacts} from "../Contacts/Contacts";
import {EditProfile} from "../EditProfile/EditProfile";
import {ArchivedChannelList} from "../ChannelsList/ArchivedChannelList";
import {Exit} from "../Exit/Exit";
import {CreateChannelPage} from "../CreateChannelPage/CreateChannelPage";
import {WithColor} from "../../HOC/withColor";


const MenuWithColor = WithColor(Menu)
const SettingsPageWithColor = WithColor(SettingsPage)
const CallsWithColor = WithColor(Calls)
const ContactsWithColor = WithColor(Contacts)
const EditProfileWithColor = WithColor(EditProfile)
const CreateChannelPageWithColor = WithColor(CreateChannelPage)
const ExitWithColor = WithColor(Exit)
const ArchivedChannelListWithColor = WithColor(ArchivedChannelList)


export const LeftSideBar: React.FC = () => {
    const history = useHistory()
    const path = history.location.pathname
    const [CurrentPage, SetCurrentPage] = useState('')
    useEffect(() => {
        let page = path.split('/')[1]
        SetCurrentPage(page)
    }, [path])
    return <>
        <CSSTransition unmountOnExit in={CurrentPage==="settings"} classNames={'sideBar'} timeout={300}>
            <SettingsPageWithColor/>
        </CSSTransition>
        <CSSTransition unmountOnExit in={CurrentPage==="menu"} classNames={'sideBar'} timeout={300}>
            <MenuWithColor/>
        </CSSTransition>
        <CSSTransition unmountOnExit in={CurrentPage==="calls"} classNames={'sideBar'} timeout={300}>
            <CallsWithColor/>
        </CSSTransition>
        <CSSTransition unmountOnExit in={CurrentPage==="contacts"} classNames={'sideBar'} timeout={300}>
            <ContactsWithColor/>
        </CSSTransition>
        <CSSTransition unmountOnExit in={CurrentPage==="edit_profile"} classNames={'sideBar'} timeout={300}>
            <EditProfileWithColor/>
        </CSSTransition>
        <CSSTransition unmountOnExit in={CurrentPage==="archived_chats"} classNames={'sideBar'} timeout={300}>
            <ArchivedChannelListWithColor/>
        </CSSTransition>
        <CSSTransition unmountOnExit in={CurrentPage==="new_channel"} classNames={'sideBar'} timeout={300}>
            <CreateChannelPageWithColor/>
        </CSSTransition>
        <CSSTransition unmountOnExit in={CurrentPage==="exit"} classNames={'sideBar'} timeout={300}>
           <ExitWithColor/>
        </CSSTransition>
    </>

}