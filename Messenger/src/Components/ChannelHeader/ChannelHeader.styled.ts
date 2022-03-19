import styled from "styled-components";
import {SearchOutlined, MoreOutlined,PhoneOutlined,SendOutlined} from "@ant-design/icons";
import {Button} from "antd";

export const HeaderBlock = styled("div")`
  display: grid;
  grid-template-columns: 1fr 1fr;
  border-left: 0.5px solid ${(props:{color: string}) => props.color === "white" ? "#CDC5BF" : "black" };
  border-right: 0.5px solid ${(props:{color: string}) => props.color === "white" ? "#CDC5BF" : "black" };
  
`

export const Name = styled("div")`
  font-weight: 600;
  margin-left: 10px;
`
export const AdditionalData = styled("div")`
  margin-left: 10px;
  color: #CDC5BF;
`

export const IconsBlock = styled("div")`
  text-align: right;
`
export const IconsBlockButton = styled(Button)`
  margin-bottom: 10px;
  margin-top: 10px;
  margin-right: 5px;
`

export const SearchIcon = styled(SearchOutlined)`
  font-size: 20px;
  color: gray
`
export const MoreInfoIcon = styled(MoreOutlined)`
  font-size: 20px;
  color: gray
`
export const PhoneIcon = styled(PhoneOutlined)`
  font-size: 20px;
  color: gray
`
