import styled from "styled-components";
import {PhoneOutlined, VideoCameraOutlined} from "@ant-design/icons";
import {Avatar} from "antd";

export const CallsBlock = styled("div")`
  position: absolute;
  z-index: 10;
  width: 20vw;
  height: 100vh;
  background-color: white;
  overflow-y: scroll;
`


export const CallsItem = styled("div")`
  display: grid;
  grid-template-columns: 1fr 5fr 1.4fr;
  grid-gap: 5%;
  padding-bottom: 3%;
  padding-top: 3%;
  padding-left: 5%;
  :hover{
    background-color: #DCDCDC;
    cursor: pointer;
  }
`
export const CallAvatar = styled(Avatar)`
    width: 50px;
  height: 50px;
`

export const CallUserName = styled("div")`
    font-weight: 600;
`

export const CallData = styled("div")`
    color: #CDC5BF;
`
//icons
export const PhoneIcon = styled(PhoneOutlined)`
  font-size: 20px;
  color: gray;
  :hover{
    color: green;
  }
`
export const VideoIcon = styled(VideoCameraOutlined)`
  font-size: 20px;
  color: gray;
  :hover{
    color: green;
  }
`