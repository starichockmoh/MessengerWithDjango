import React, {ChangeEvent, useEffect, useState} from "react";
import {Chapter, EditItem, EditUserName, NameIcon} from "./EditProfile.styled"
import {EditIcon} from "../Contacts/Contacts.styled";
import {Button, Input} from "antd";
import {useDispatch} from "react-redux";
import {ActivateProfileSaga} from "../../Redux/Sagas/ProfileSaga";
import {SpecialLine} from "../Common/CommonElements.styled";
import TextArea from "antd/es/input/TextArea";

type PropsType = {
    InitialValue: string
    ChapterName: string
    Icon: React.FC
    FormName: "first_name" | "last_name" | "about_user" | "telephone"
}
export const EditProfileItem: React.FC<PropsType> = ({Icon, FormName, InitialValue, ChapterName}) => {
    const dispatch = useDispatch()
    const [value, SetValue] = useState('')
    const [IsMouseOn, SetMouseOn] = useState(false)
    const [IsEditMode, SetEditMode] = useState(false)

    useEffect(() => {
        SetValue(InitialValue)
    }, [InitialValue])

    const CompleteForm = () => {
        let InputData
        switch (FormName) {
            case "first_name": {
                InputData = {first_name: value}
                break
            }
            case "last_name": {
                InputData = {last_name: value}
                break
            }
            case "about_user": {
                InputData = {about_user: value}
                break
            }
            case "telephone": {
                InputData = {telephone: value}
                break
            }
        }
        dispatch(ActivateProfileSaga.ChangeProfile(InputData))
        SetEditMode(false)
    }

    const onChangeValue = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        SetValue(e.target.value)
    }

    if (FormName === "about_user") {
        return <div>
            <SpecialLine/>
            <div>
                <TextArea style={{marginRight: 10}} value={value} onChange={onChangeValue}
                          onFocus={() => SetEditMode(true)}
                          showCount maxLength={100} placeholder={'Bio'}
                          bordered={false} autoSize={{maxRows: 3}}/>
            </div>
            {IsEditMode &&
            <Button type={"link"} onClick={CompleteForm}>
                Save bio
            </Button>}
            <div style={{color: "gray", marginTop: 30, marginLeft: 10}}>
                Any details such as age, occupation or city.
            </div>
        </div>
    }

    return <EditItem onMouseOver={() => SetMouseOn(true)} onMouseLeave={() => SetMouseOn(false)}>
        <Icon/>
        <div>
            <EditUserName onClick={() => SetEditMode(true)} onBlur={CompleteForm}>
                {IsEditMode ? <Input autoFocus={true} value={value} onChange={onChangeValue}/> : InitialValue}
            </EditUserName>
            <Chapter>
                {ChapterName}
            </Chapter>
        </div>
        {IsMouseOn && <EditIcon/>}
    </EditItem>
}