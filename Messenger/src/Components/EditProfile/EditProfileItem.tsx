import React, {ChangeEvent, useState} from "react";
import {Chapter, EditItem, EditUserName, NameIcon} from "./EditProfile.styled"
import {EditIcon} from "../Contacts/Contacts.styled";
import {Input} from "antd";

type PropsType = {
    InitialValue: string
    ChapterName: string
    Icon: React.FC
}
export const EditProfileItem: React.FC<PropsType> = ({Icon,InitialValue,ChapterName}) => {
    const [value, SetValue] = useState(InitialValue)
    const onChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
        SetValue(e.target.value)
    }
    const [IsMouseOn, SetMouseOn] = useState(false)
    const [IsEditMode, SetEditMode] = useState(false)
    return <EditItem onMouseOver={() => SetMouseOn(true)} onMouseLeave={() => SetMouseOn(false)}>
        <Icon/>
        <div>
            <EditUserName onClick={() => SetEditMode(true)} onBlur={() => SetEditMode(false)}>
                {IsEditMode? <Input autoFocus={true} value={value} onChange={onChangeValue}/>: InitialValue}
            </EditUserName>
            <Chapter>
                {ChapterName}
            </Chapter>
        </div>
            {IsMouseOn && <EditIcon/>}
    </EditItem>
}