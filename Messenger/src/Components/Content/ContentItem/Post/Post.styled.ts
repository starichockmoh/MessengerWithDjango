import styled from "styled-components";
import {EyeOutlined,CommentOutlined} from "@ant-design/icons";


export const ChannelPost = styled("div")`
  width: 30vw;
  background-color: white;
  max-height: 150vh;
  overflow: hidden;
  margin-left: 18px;
  margin-top: 6px;
  margin-bottom: 6px;
  padding: 10px 20px;
  border-radius: 10px;
  position: relative;
`
export const PostText = styled.div`
  max-height: 100vh;
  overflow: hidden;
`
export const PostFooter = styled("div")`
  text-align: right;
  color: #CDC5BF;
  height: 6vh;
`
export const CommentsBlock = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  cursor: pointer;
  width: 30vw;
  padding-left: 15px;
  padding-bottom: 4px;
  padding-top: 4px;
  div {
    color: #08c;
    display: flex;
    align-items: center;
  }
  :hover {
    background: #DCDCDC;
  }
`


export const ViewsIcon = styled(EyeOutlined)`
  font-size: 15px;
  color: gray;
  
`

export const CommentsIcon = styled(CommentOutlined)`
  font-size: 15px;
  color: #08c;
  margin-right: 5px;
`