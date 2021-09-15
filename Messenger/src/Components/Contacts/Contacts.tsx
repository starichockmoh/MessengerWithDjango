import React, {ChangeEvent, useState} from "react";
import {
    AddContactBlock, AddContactButton,
    Contact,
    ContactAvatar,
    ContactsBlock,
    ContactsList,
    ContactsUserName, LastData,
    SearchBlock,
    SearchIcon
} from "./Contacts.styled"
import {SideHeader} from "../LeftSideBar/SideHeader";
import TextArea from "antd/es/input/TextArea";
import photo from "./../../Assets/photo_2017-11-03_18-44-32.jpg"
import photo1 from "./../../Assets/amds.jpg"
import photo2 from "./../../Assets/maska.jpg"
import photo3 from "./../../Assets/putin.jpeg"
import photo4 from "./../../Assets/krest.jpg"

export const Contacts: React.FC = () => {
    const [InputValue, SetInputValue] = useState('')
    const onInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        SetInputValue(e.target.value)
    }
    return <ContactsBlock>
        <SideHeader header={'Contacts'}/>
        <SearchBlock>
            <SearchIcon/>
            <TextArea onChange={onInputChange} value={InputValue} bordered={false} autoSize={{maxRows: 1}}
                      placeholder={'Search'}/>
        </SearchBlock>
        <ContactsList>
            <ContactElement Data={'last seen 7 hours ago'} Name={' Vladislav'} Photo={photo}/>
            <ContactElement Data={' last seen 21.09.12'} Name={'Kalim'} Photo={photo1}/>
            <ContactElement Data={'last seen 3 hours ago'} Name={'Kissa'} Photo={photo2}/>
            <ContactElement Data={'online'} Name={'Vasik'} Photo={photo3}/>
            <ContactElement Data={'last seen recently'} Name={'Юран'} Photo={photo4}/>
            <ContactElement Data={'last seen 21.09.12'} Name={'Kalim'} Photo={photo1}/>
            <ContactElement Data={'last seen 3 hours ago'} Name={'Kissa'} Photo={photo2}/>
            <ContactElement Data={'online'} Name={'Vasik'} Photo={photo3}/>
            <ContactElement Data={' last seen 21.09.12'} Name={'Kalim'} Photo={photo1}/>
            <ContactElement Data={'last seen 3 hours ago'} Name={'Kissa'} Photo={photo2}/>
            <ContactElement Data={'online'} Name={'Vasik'} Photo={photo3}/>
            <ContactElement Data={'last seen recently'} Name={'Юран'} Photo={photo4}/>
            <ContactElement Data={'last seen 3 hours ago'} Name={'Kissa'} Photo={photo2}/>
            <ContactElement Data={'online'} Name={'Vasik'} Photo={photo3}/>
            <ContactElement Data={' last seen 21.09.12'} Name={'Kalim'} Photo={photo1}/>
        </ContactsList>

        <AddContactBlock>
            <AddContactButton type={"link"}>
                ADD CONTACT
            </AddContactButton>
        </AddContactBlock>
    </ContactsBlock>
}



type ContactPropsType = {
    Name: string
    Data: string
    Photo: string
}
const ContactElement: React.FC<ContactPropsType> = ({Data, Name, Photo}) => {
    return <Contact>
        <ContactAvatar src={Photo}/>
        <div>
            <ContactsUserName>
                {Name}
            </ContactsUserName>
            <LastData>
                {Data}
            </LastData>
        </div>
    </Contact>
}