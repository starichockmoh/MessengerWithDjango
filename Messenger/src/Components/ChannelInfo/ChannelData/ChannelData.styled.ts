import styled from "styled-components";
import {Avatar} from "antd";
import {
    FileImageOutlined,
    VideoCameraOutlined,
    FileOutlined,
    AudioOutlined,
    LinkOutlined,
    SoundOutlined
} from "@ant-design/icons";

export const InfoTitle = styled("div")`
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-template-areas:
  "Avatar AddInfo";`

export const InfoTitleAvatarBlock = styled("div")`
  grid-area: Avatar;
  padding: 10%;
`

export const AddInfoBlock = styled("div")`
  grid-area: AddInfo;
  padding-top: 10%;
`
export const InfoTitleAvatar = styled(Avatar)`
  width: 70px;
  height: 70px;
`
export const InfoTitleName = styled("div")`
  font-weight: 600;
`
export const InfoTitleAddInfo = styled("div")`
  color: #CDC5BF;
`

export const MediaBlock = styled("div")`
    
`
export const MediaContentLink = styled("div")`
    :hover{
      cursor: pointer;
      color: #08c;;
    }
`

//icons
export const ImageIcon = styled(FileImageOutlined)`
  font-size: 20px;
  color: gray
`
export const VideoIcon = styled(VideoCameraOutlined)`
  font-size: 20px;
  color: gray
`
export const FilesIcon = styled(FileOutlined)`
  font-size: 20px;
  color: gray
`
export const AudioIcon = styled(SoundOutlined)`
  font-size: 20px;
  color:gray
`
export const LinksIcon = styled(LinkOutlined)`
  font-size: 20px;
  color: gray
`
export const VoiceIcon = styled(AudioOutlined)`
  font-size: 20px;
  color: gray
`
export const IconBlock = styled("div")`
  text-align: center;
`



export const MediaContent = styled("div")`
  display: grid;
  padding-top: 3%;
  padding-bottom: 3%;
  grid-template-columns: 1fr 4fr;
  :hover{
    background-color: #DCDCDC;
    cursor: pointer;
  }
`


