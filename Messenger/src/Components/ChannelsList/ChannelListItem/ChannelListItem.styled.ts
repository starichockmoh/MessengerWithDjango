import styled from "styled-components";
import {Avatar, Badge} from "antd";


type ListItemPropsType = {
    active: boolean | undefined
    color: string
    additional_color: string
    active_color: string
}


export const ListItem = styled("div")`
  padding: 5px;
  display: grid;
  background: ${(props: ListItemPropsType) => props.active ? props.active_color : props.color};
  grid-template-areas:
  "ChannelAvatar ChannelName LastData"
  "ChannelAvatar LastMessage MessagesCount";
  grid-template-columns: 1.2fr 5fr 1fr;
  grid-template-rows: 1fr 1fr;

  :hover {
    background-color: ${(props: ListItemPropsType) => props.active ? props.active_color : props.additional_color};
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
  div {
    max-width: 25px;
    border-radius: 100%;
    text-align: center;
  }
`
export const LastMessageData = styled("data")`
  color: #CDC5BF;
`
export const Media = styled("span")`
  color: #08c;
`
