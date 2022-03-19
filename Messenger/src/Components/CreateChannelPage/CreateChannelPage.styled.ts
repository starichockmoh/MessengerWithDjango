import styled from "styled-components";


export const CreateChannelBlock = styled.div`
  position: absolute;
  z-index: 10;
  width: 20vw;
  height: 100vh;
  background-color: ${(props:{color: string}) => props.color};;
  form{
    text-align: center;
  }
`

export const ButtonBlock = styled.div`
  text-align: center;
`
