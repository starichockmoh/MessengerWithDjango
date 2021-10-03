import styled from "styled-components";
import {Avatar, Badge} from "antd";


export const ListItem = styled("div")`
  padding: 5px;
  display: grid;
  background: ${(props: {active: boolean | undefined}) => props.active ? '#08c' : 'white'};
  grid-template-areas:
  "ChannelAvatar ChannelName LastData"
  "ChannelAvatar LastMessage MessagesCount";
  grid-template-columns: 1.2fr 5fr 1fr;
  grid-template-rows: 1fr 1fr;
  :hover{
    background-color: ${(props: {active: boolean | undefined}) => props.active ? '#08c' : '#DCDCDC'};
  }
`

export const ChannelAvatar = styled(Avatar)`
  width: 40px;
  height: 40px;
  grid-area: ChannelAvatar;
`

export const ChannelName = styled("div")`
  grid-area: ChannelName;
  font-weight: 600;
  color: black;
  white-space: nowrap; /* Запрещаем перенос строк */
  overflow: hidden; /* Обрезаем все, что не помещается в область */
  text-overflow: ellipsis; /* Добавляем многоточие */
`
export const LastData = styled("div")`
  grid-area: LastData;
`
export const LastMessage = styled("div")`
  grid-area: LastMessage;
  height: 22px;
  color: #CDC5BF;
  white-space: nowrap; /* Запрещаем перенос строк */
  overflow: hidden; /* Обрезаем все, что не помещается в область */
  text-overflow: ellipsis; /* Добавляем многоточие */
  
`
export const MessagesCount = styled("div")`
  grid-area: MessagesCount;
`
export const LastMessageData = styled("data")`
  color: #CDC5BF;
`
export const Media = styled("span")`
  color: #08c;
`
