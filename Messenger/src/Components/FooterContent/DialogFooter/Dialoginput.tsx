import React, {ChangeEvent, useState} from "react";
import {
    AudioIcon,
    DialogInputBlock,
    DialogInputButton,
    DialogTextArea,
    PaperClipIcon, SendIcon,
    SmileIcon
} from "./Dialoginput.styled"



export const DialogInput: React.FC = () => {
    const [InputValue, SetInputValue] = useState('')
    const onInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        SetInputValue(e.target.value)
    }

    return <DialogInputBlock>
        <DialogInputButton type={"link"} icon = {<PaperClipIcon/>}/>
        <DialogTextArea onChange={onInputChange} value={InputValue} bordered={false}  autoSize={{maxRows: 1}}
                        placeholder={'Write a message...'}/>
        <DialogInputButton type={"link"} icon = {<SmileIcon/>}/>
        {InputValue? <DialogInputButton type={"link"} icon = {<SendIcon/>}/> : <DialogInputButton type={"link"} icon = {<AudioIcon/>}/>}
    </DialogInputBlock>
}
