import styled from "styled-components";
import {MenuOutlined} from "@ant-design/icons";


export const OptionsBlock = styled("div")`

`
export const OptionContent = styled("div")`
  display: grid;
  grid-template-columns: 1fr 4fr;
  padding-top: 3%;
  padding-bottom: 3%;
  :hover{
    background-color: #DCDCDC;
    cursor: pointer;
  }
`


export const OptionsIcon = styled(MenuOutlined)`
  font-size: 20px;
  color: gray
`
export const IconBlock = styled("div")`
  text-align: center;
`