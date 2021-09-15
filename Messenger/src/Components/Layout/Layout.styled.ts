import styled from "styled-components";
import phone from "./../../Assets/phone.jpg"

export const AppLayout = styled("div")`
  display: grid;
  grid-template-columns: 20vw 60vw 20vw;
  grid-template-rows: 7vh 87vh 6vh;
  grid-template-areas:
  "Search ChannelHeader InfoHeader"
  "Channels Content Info"
  "Channels Footer Info";`

export const Search = styled("div")`
  grid-area: Search;
 
`
export const ChannelHeader = styled("div")`
  grid-area: ChannelHeader;
 
`
export const InfoHeader = styled("div")`
  grid-area: InfoHeader;
  font-weight: 600;
  padding: 10px;
`
export const Channels = styled("div")`
  grid-area: Channels;
`
export const Content = styled("div")`
  grid-area: Content;
  background-image: url("https://falcon-eyes.ru/upload/iblock/8f6/8f667926e00feb79ed462cda767633af.jpg");
`
export const Info = styled("div")`
  grid-area: Info;
`

export const Footer = styled("div")`
  grid-area: Footer;
`
