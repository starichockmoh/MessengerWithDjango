import styled from "styled-components";
import {NavLink} from "react-router-dom";

export const SpecialLine = styled("hr")`
  border: none; /* Убираем границу для браузера Firefox */
  color: #F5F5F5; /* Цвет линии для остальных браузеров */
  background-color: #F5F5F5; /* Цвет линии для браузера Firefox и Opera */
  height: 10px; /* Толщина линии */
`

export const CustomNavLink = styled(NavLink)`
  color: black;

  :hover {
    color: #08c;
  }
`

export const LineHr = styled("hr")`
  border: none; /* Убираем границу для браузера Firefox */
  color: #CDC5BF; /* Цвет линии для остальных браузеров */
  background-color: #CDC5BF; /* Цвет линии для браузера Firefox и Opera */
  height: 0.3px; /* Толщина линии */
`