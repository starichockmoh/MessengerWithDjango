import styled from "styled-components";
import TextArea from "antd/es/input/TextArea";
import {AudioOutlined, SmileOutlined, PaperClipOutlined, SendOutlined} from "@ant-design/icons";
import {Button, Form, Input, Upload} from "antd";

export const DialogInputBlock = styled(Form)`
  display: grid;
  grid-template-columns: 1fr 15fr 1fr 1fr;
  padding: 3px;
  border-left: 0.5px solid #CDC5BF;
  border-right: 0.5px solid #CDC5BF;
  width: 60vw;
  height: 6vh;
  overflow: hidden;
`

export const DialogUploadBlock = styled.div`
  position: absolute;
  left: 38%;
  width: 24%;
  top: 20%;
  height: 60%;
  background: white;
  border-radius: 3px;
`

export const UploadBlock = styled(Upload)`
  text-align: center;
  margin-top: 5px;
  position: relative;

`

export const DialogTextArea = styled(TextArea)`

`

export const DialogInputButton = styled(Button)`

`
export const PaperClipIcon = styled(PaperClipOutlined)`
  font-size: 25px;
  color: gray
`
export const SmileIcon = styled(SmileOutlined)`
  font-size: 25px;
  color: gray
`
export const AudioIcon = styled(AudioOutlined)`
  font-size: 25px;
  color: gray;
`
export const SendIcon = styled(SendOutlined)`
  font-size: 25px;
  color: #08c;
`