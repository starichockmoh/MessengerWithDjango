import styled from "styled-components";
import {Button} from "antd";


export const MuteBlock = styled('div')`
  text-align: center;
  border-left: 0.5px solid ${(props:{color: string}) => props.color === "white" ? "#CDC5BF" : "black" };
  border-right: 0.5px solid ${(props:{color: string}) => props.color === "white" ? "#CDC5BF" : "black" };
  height: 6vh;
  
`
export const MuteButton = styled(Button)`
  color: #08c;
  font-weight: 600;
    
`