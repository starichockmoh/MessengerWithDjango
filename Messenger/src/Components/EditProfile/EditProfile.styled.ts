import styled from "styled-components";
import {Button, Image} from "antd";
import {PhoneOutlined, UserOutlined,MailOutlined} from "@ant-design/icons";

export const EditProfileBlock = styled("div")`
  position: absolute;
  z-index: 10;
  width: 20vw;
  height: 100vh;
  background-color: white;
  display: grid;
  grid-template-rows: 7vh 30vh 30vh 33vh;
`
export const EditAvatar = styled("div")`
  background-color: #F5F5F5;
  text-align: center;
  padding-top: 10%;
`
export const EditAvatarImage = styled(Image)`
  border-radius: 50%;
  width: 90px;
  height: 90px;

`
export const EditAvatarButton = styled(Button)`
  border-radius: 10px;
  width: 10vw;
  padding: 3%;
  background-color: #08c;
  color: white;
`
export const EditItem = styled('div')`
  display: grid;
  grid-template-columns: 2fr 8fr 1fr;
  grid-gap: 6%;
  padding-bottom: 3%;
  padding-top: 3%;
  padding-right: 5%;
  :hover{
    background-color: #DCDCDC;
    cursor: pointer;
  }
  
 
`

export const EditUserName = styled("div")`
    font-weight: 600;
`

export const Chapter = styled("div")`
    color: #CDC5BF;
`

//icons
export const NameIcon = styled(UserOutlined)`
  font-size: 20px;
  color: gray;
  margin-top: 15%;
`
export const PhoneIcon = styled(PhoneOutlined)`
  font-size: 20px;
  color: gray;
  margin-top: 15%;
`
export const UserNameIcon = styled(MailOutlined)`
  font-size: 20px;
  color: gray;
  margin-top: 15%;
`

