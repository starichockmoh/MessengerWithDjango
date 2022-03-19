import styled from "styled-components";
import {Image} from "antd";
import {
    SettingOutlined,
    UserOutlined,
    NotificationOutlined,
    UsergroupAddOutlined,
    PhoneOutlined, LogoutOutlined, StarOutlined
} from "@ant-design/icons";
import {NavLink} from "react-router-dom";


export const MenuBlock = styled("div")`
  position: absolute;
  z-index: 10;
  width: 20vw;
  height: 100vh;
  background-color: ${(props:{color: string}) => props.color};
  `

export const MenuHeader = styled("div")`
  height: 20%;
  background-color: ${(props:{color: string}) => props.color};
`

export const CloseButton = styled("div")`
    text-align: right;
`
export const MenuInfo = styled("div")`
  color: white;
  margin-bottom: 10px;
  margin-left: 20px;
`
export const MenuAvatar = styled(Image)`
  width: 60px;
  height: 60px;
  margin-top: 20px;
  margin-left: 20px;
  border-radius: 50%;
  :hover{
    cursor: pointer;
    opacity: 0.8;
    transition: opacity 500ms;
  }
`

export const MenuContent = styled('div')`
  margin-top: 5%;
 

`
export const MenuItem = styled("div")`
  display: grid;
  grid-template-columns: 2fr 8fr 1fr;
  grid-gap: 6%;
  padding-bottom: 3%;
  padding-top: 3%;
  padding-right: 5%;
  font-weight: bold;

  :hover {
    background-color: ${(props:{color: string}) => props.color};;
    cursor: pointer;
  }
`



//icons
export const IconBlock = styled("div")`
  text-align: center;
`
export const GroupIcon = styled(UsergroupAddOutlined)`
  font-size: 20px;
  color: gray
`
export const ChannelIcon = styled(NotificationOutlined)`
  font-size: 20px;
  color: gray
`
export const ContactsIcon = styled(UserOutlined)`
  font-size: 20px;
  color: gray
`
export const CallsIcon = styled(PhoneOutlined)`
  font-size: 20px;
  color: gray
`
export const SettingsIcon = styled(SettingOutlined)`
  font-size: 20px;
  color: gray
`

export const LogoutIcon = styled(LogoutOutlined)`
  font-size: 20px;
  color: gray
`
export const ThemeIcon = styled(StarOutlined)`
  font-size: 20px;
  color: gray
`


export const MenuFooter = styled("div")`
  color: #CDC5BF;
  position: absolute;
  bottom: 0;
  margin: 5%;
  

`
