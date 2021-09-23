import styled from "styled-components";
import {Button} from "antd";


export const ChannelsBlock = styled("div")`
  overflow-y: scroll;
  height: 93vh;
  width: 20vw;
  overflow-x: hidden;
`

export const ArchivedChannelsBlock = styled("div")`
  position: absolute;
  z-index: 10;
  width: 20vw;
  height: 100vh;
  background-color: white;
  overflow-y: scroll;
`
export const BackButton = styled(Button)`
  color: black;

  :hover {
    color: cornflowerblue;
  }`
export const ArchivedChannelsHeader = styled.div`
  height: 7vh;
  display: flex;
  flex-direction: row;
  position: sticky;
  align-items: center;
  top: 0;
  z-index: 15;
  background: white;
  div{
    font-weight: 600;
    font-size: 120%;
  }
  
`