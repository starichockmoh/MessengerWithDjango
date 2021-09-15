import styled, {css} from "styled-components";
import {Avatar, Comment} from "antd";


export const CommentsBlock = styled.div`
  height: 87vh;
  position: absolute;
  width: 60vw;
  left: 20vw;
  top: 7vh;
  overflow-y: scroll;
 
`

export const CommentsHeader = styled.div`
  position: sticky;
  top: 0;
  z-index: 15;
  background: white;
  left: 0;
  padding: 10px;
  font-size: 120%;
  font-weight: 600;

  button {
    color: black;
  }
`


export const CommentBlock = styled.div`
  display: flex;
  flex-direction: row;
  margin: 8px 10px;
  align-items: center;
  justify-content: ${(props: { IsOtherUser: boolean }) => props.IsOtherUser ? 'flex-start' : 'flex-end'};

  div {
    border-radius: 5px;
    padding: 2px;
    word-break: break-word;
    background: white;
    display: flex;
    align-items: baseline;
    margin-left: 5px;
  }

  span {
    width: 50px;
    height: 50px;
    cursor: pointer;
  }
`

export const CommentDate = styled.div`
  color: #CDC5BF;
`
export const CommentData = styled.div`
  max-width: 20vw;
  display: flex;
  flex-direction: column;
`

export const CommentText = styled.div`
  padding-bottom: 10px;
`

export const ContentBlock = styled.div`
  display: flex;
  flex-direction: column;
`

export const Author = styled.div`
  font-weight: 600;
`

export const Commentator = styled.div`
  font-weight: 600;
  font-size: 100%;
  color: black;
  cursor: pointer;
`