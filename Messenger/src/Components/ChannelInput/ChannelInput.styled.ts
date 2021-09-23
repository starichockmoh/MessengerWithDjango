import styled from "styled-components";
import {Button, Input} from "antd";
import {SearchStatusType} from "./ChannelInput";
import {MenuUnfoldOutlined} from "@ant-design/icons";

type PropsType = {
    SearchStatus: SearchStatusType
}

export const ChannelInputSearch = styled(Input)`
  background-color: ${(props: PropsType) => props.SearchStatus === 'Focus' ? 'white' : '#DCDCDC'};
  height: 28px;
  margin: 10px;
`

export const SearchBlock = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20vw;
  overflow-x: hidden;
  button{
    color: black;
  }
`
export const MenuButton = styled(Button)`
`
export const MenuButtonIcon = styled(MenuUnfoldOutlined)`
  color: gray
`