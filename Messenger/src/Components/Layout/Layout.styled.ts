import styled from "styled-components";
import pixel from "../../Assets/pixel_mount.jpg"

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
  background-color: ${(props:{color: string}) => props.color};
 
`
export const ChannelHeader = styled("div")`
  grid-area: ChannelHeader;
  background-color: ${(props:{color: string}) => props.color};
 
`
export const InfoHeader = styled("div")`
  grid-area: InfoHeader;
  font-weight: 600;
  padding: 10px;
  background-color: ${(props:{color: string}) => props.color};
`
export const Channels = styled("div")`
  grid-area: Channels;
  background-color: ${(props:{color: string}) => props.color};
`
export const Content = styled("div")`
  grid-area: Content;
  background-image: url(${pixel});
`
export const Info = styled("div")`
  grid-area: Info;
  background-color: ${(props:{color: string}) => props.color};
`

export const Footer = styled("div")`
  grid-area: Footer;
  background-color: ${(props:{color: string}) => props.color};
`
