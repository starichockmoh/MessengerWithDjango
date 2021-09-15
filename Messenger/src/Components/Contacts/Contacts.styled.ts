import styled from "styled-components";
import {SearchOutlined,EditOutlined} from "@ant-design/icons";
import {Avatar, Button} from "antd";


export const ContactsBlock = styled("div")`
  display: grid;
  grid-template-rows: 7vh 5vh 82vh 6vh;
  position: absolute;
  z-index: 10;
  width: 20vw;
  height: 100vh;
  background-color: white;
`
export const SearchBlock = styled("div")`
  display: grid;
  grid-template-columns: 1fr 8fr;
  position: sticky;
  top: 0;
  z-index: 3;
`

export const ContactsList = styled("div")`
  overflow-y: scroll;
`

export const Contact = styled("div")`
  display: grid;
  grid-template-columns: 1fr 5fr;
  grid-gap: 3%;
  padding-top: 3%;
  padding-bottom: 3%;
  padding-left: 5%;
  :hover{
    background-color: #DCDCDC;
    cursor: pointer;
  }
`
export const ContactAvatar = styled(Avatar)`
  width: 40px;
  height: 40px;
`

export const ContactsUserName = styled("div")`
    font-weight: 600;
`

export const LastData = styled("div")`
    color: #CDC5BF;
`

export const AddContactBlock = styled('div')`
  text-align: center;
  
`
export const AddContactButton = styled(Button)`
  color: #08c;
  font-weight: 600;
    
`
//icons
export const SearchIcon = styled(SearchOutlined)`
  font-size: 20px;
  color: gray;
  margin-top: 15%;
`
export const EditIcon= styled(EditOutlined)`
  font-size: 20px;
  color: gray;
  margin-top: 15%;
`
