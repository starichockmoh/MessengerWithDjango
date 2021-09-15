import styled from "styled-components";
import {NavLink} from "react-router-dom";

export const SettingsHeader = styled("div")`
  background-color: #08c;
  height: 7vh;
  position: sticky;
  top: 0;
  z-index: 32;
  padding: 10px;
  display: grid;
  grid-template-columns: 3fr 1fr;

`
export const SettingsLink = styled(NavLink)`
  color: black;

  :hover {
    color: white;
  }
`

export const HeadersName = styled("div")`
  font-size: 150%;
  float: top;
`