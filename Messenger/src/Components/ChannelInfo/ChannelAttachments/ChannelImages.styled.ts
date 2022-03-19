import styled from "styled-components";
import {Image, PageHeader} from "antd";

export const ImagesPageHeader = styled(PageHeader)`
  background-color: ${(props: {color: string}) => props.color};;
  top: 0;
  z-index: 3;
  height: 8vh;
  position: sticky;
  div{
    color: ${(props: {color: string}) => props.color === "white" ? "black" : "white"};
  }
`

export const ImagesBlock = styled("div")`
  text-align: center;
`
export const ChannelImage = styled(Image)`
  width: 80px;
  height: 80px;
  margin: 3px
`