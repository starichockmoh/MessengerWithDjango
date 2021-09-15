import styled from "styled-components";
import {NavLink} from "react-router-dom";
import {Avatar} from "antd";
import {BellOutlined,QuestionCircleOutlined, ExclamationCircleOutlined,DashOutlined,SecurityScanOutlined,WechatOutlined,FolderOutlined} from "@ant-design/icons";

export const Settings = styled("div")`
  position: absolute;
  z-index: 10;
  width: 20vw;
  height: 100vh;
  background-color: white;
`
export const UserBlock = styled("div")`
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-template-areas:
  "Avatar AddInfo";`

export const UserBlock_Avatar = styled("div")`
  grid-area: Avatar;
  padding: 10%;
  :hover{
    cursor: pointer;
  }
`

export const UserBlock_AdInfo = styled("div")`
  grid-area: AddInfo;
  padding-top: 10%;
`
export const Avatar_UserAvatar = styled(Avatar)`
  width: 70px;
  height: 70px;
`
export const AdInfo_Name = styled("div")`
  font-weight: 600;
  font-size: 130%;
`
export const AdInfo_Online = styled("div")`
  color: #08c;
`

export const SettingsItem = styled("div")`
  display: grid;
  grid-gap: 5%;
  grid-template-columns: 1fr 5fr;
  padding-bottom: 3%;
  padding-top: 3%;
  padding-left: 5%;
  :hover{
    background-color: #DCDCDC;
    cursor: pointer;
  }
  
`

//icons
export const EditIcon = styled(ExclamationCircleOutlined)`
  font-size: 20px;
  color:gray
`
export const NotificationsIcon = styled(BellOutlined)`
  font-size: 20px;
  color: gray
`
export const SecurityIcon = styled(SecurityScanOutlined)`
  font-size: 20px;
  color: gray
`
export const ChatIcon = styled(WechatOutlined)`
  font-size: 20px;
  color: gray
`
export const FoldersIcon = styled(FolderOutlined)`
  font-size: 20px;
  color:gray
`
export const AdvancedIcon = styled(DashOutlined )`
  font-size: 20px;
  color: gray
`
export const FAQIcon = styled(QuestionCircleOutlined )`
  font-size: 20px;
  color: gray
`





