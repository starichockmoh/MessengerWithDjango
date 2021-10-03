import styled from "styled-components";
import {ExclamationCircleOutlined, BellOutlined, SettingOutlined} from "@ant-design/icons";


export const DescriptionBlock = styled("div")`
  display: grid;
  padding-right: 10%;
  grid-template-columns: 1fr 4fr;
  grid-template-rows: 5fr 0.5fr 0.5fr 0.5fr;
  grid-gap: 5px;
`

export const IconBlock = styled("div")`
  text-align: center;
`
export const DescIcon = styled(ExclamationCircleOutlined)`
  font-size: 20px;
  color: gray
`

export const NotificationIcon = styled(BellOutlined)`
  font-size: 20px;
  color: gray
`
export const SettingsIcon = styled(SettingOutlined)`
  font-size: 20px;
  color: gray
`
export const SettingsBlock = styled.div`
  cursor: pointer;
  :hover{
    color: #08c;
  }
  
`



export const DescriptionContentBlock = styled("div")`
`
export const ChannelLink = styled("a")`
  color: #08c
`
export const Chapter = styled("div")`
  color: #CDC5BF;
  margin-bottom: 5%;
`
export const DescriptionContent = styled("div")`
  white-space: pre-line;
`

export const NotificationBlock = styled("div")`
  display: grid;
  grid-template-columns: 5fr 1fr;
`







