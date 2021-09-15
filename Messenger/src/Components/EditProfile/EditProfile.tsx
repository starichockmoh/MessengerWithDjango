import React from "react";
import {
    Chapter,
    EditAvatar,
    EditAvatarButton,
    EditAvatarImage,
    EditItem,
    EditProfileBlock,
    EditUserName,
    NameIcon, PhoneIcon, UserNameIcon
} from "./EditProfile.styled"
import {SideHeader} from "../LeftSideBar/SideHeader";
import photo from "./../../Assets/maska.jpg"
import {Upload} from "antd";
import {EditIcon} from "../Contacts/Contacts.styled";
import {EditProfileItem} from "./EditProfileItem";
import TextArea from "antd/es/input/TextArea";
import { SpecialLine } from "../Common/CommonElements.styled";


export const EditProfile: React.FC = () => {
    return <EditProfileBlock>
        <SideHeader header={'Info'} prevLink={'Settings'}/>
        <EditAvatar>
            <div>
                <EditAvatarImage src={photo}/>
            </div>
            <div>
                <Upload>
                    <EditAvatarButton>SET PROFILE PHOTO</EditAvatarButton>
                </Upload>
            </div>
        </EditAvatar>
        <div>
            <EditProfileItem ChapterName={'Name'} Icon={NameIcon} InitialValue={'Старик Мох'}/>
            <EditProfileItem ChapterName={'Phone number'} Icon={PhoneIcon} InitialValue={'+7 919 834 72 90'}/>
            <EditProfileItem ChapterName={'Username'} Icon={UserNameIcon} InitialValue={'@StarickMoh'}/>
        </div>
        <div>
            <SpecialLine/>
            <div>
                <TextArea style={{marginRight: 10}}
                          showCount maxLength={100} placeholder={'Bio'}
                          bordered={false}  autoSize={{maxRows: 3}}/>
            </div>

            <div style={{color: "gray", marginTop: 30, marginLeft: 10}}>
                Any details such as age, occupation or city.
            </div>
        </div>
    </EditProfileBlock>
}