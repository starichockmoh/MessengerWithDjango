import styled from "styled-components";


export const LogoStyled = styled.div`
  font-family: 'Montserrat', sans-serif;
  font-size: 48px;
  line-height: 59px;
  letter-spacing: -0.1em;
  text-transform: uppercase;
  font-weight: 700;
  width: min-content;
  color: white;
  padding-top: 50px;
  margin-left: 8vw;
  position: absolute;
  z-index: 2;
  @media (min-height: 900px) {
    font-size: 48px;
    line-height: 59px;
  }
  @media (max-height: 700px) {
    width: 80%;
  }
`

