import React, {useEffect} from "react";
import {CloseOutlined} from "@ant-design/icons";
import {
    CallsIcon,
    ChannelIcon,
    CloseButton,
    ContactsIcon,
    GroupIcon,
    IconBlock, LogoutIcon,
    MenuAvatar,
    MenuBlock,
    MenuContent,
    MenuFooter,
    MenuHeader,
    MenuInfo,
    MenuItem,
    SettingsIcon
} from "./Menu.styled"
import {Button} from "antd";
import seva from "./../../Assets/photo_2017-11-03_18-44-32.jpg"
import "../LeftSideBar/AnimationSideBar.css"
import {CustomNavLink} from "../Common/CommonElements.styled";
import {StyledComponent} from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../Redux/Store";
import {profileAPI} from "../../Api/ProfileAPI";
import {ActivateProfileSaga} from "../../Redux/Sagas/ProfileSaga";
import {ToNicePhoneNumber} from "../../Helper Functions/ToNicePhoneNumber";


export const Menu: React.FC = () => {
    const dispatch = useDispatch()
    const UserID = useSelector((state: AppStateType) => state.Profile.AuthProfile?.pk)

    useEffect(() => {
        UserID && dispatch(ActivateProfileSaga.Profile(UserID))
    }, [UserID])

    const UserData = useSelector((state: AppStateType) => state.Profile.Profile)
    return <MenuBlock>
        <CloseButton>
            <CustomNavLink to={'/'}>
                <Button type={"link"} danger icon={<CloseOutlined/>}/>
            </CustomNavLink>
        </CloseButton>

        {!!UserData && <UserInfo Name={UserData.username}
                                 Phone={ToNicePhoneNumber(UserData.telephone)}
                                 Avatar={UserData.addit_image[UserData.addit_image.length - 1]?.image}/>}

        <MenuContent>
            <MenuElement Name={'New Group'} Link={'/settings'} Icon={GroupIcon}/>
            <MenuElement Name={'New Channel'} Link={'/new_channel'} Icon={ChannelIcon}/>
            <MenuElement Name={'Contacts'} Link={'/contacts'} Icon={ContactsIcon}/>
            <MenuElement Name={'Calls'} Link={'/calls'} Icon={CallsIcon}/>
            <MenuElement Name={'Settings'} Link={'/settings'} Icon={SettingsIcon}/>
            <MenuElement Name={'Exit'} Link={'/exit'} Icon={LogoutIcon}/>
        </MenuContent>

        <MenuFooter>
            <div>
                Telegram Desktop
            </div>
            <div>
                Version: 1331:dsc33
            </div>
        </MenuFooter>
    </MenuBlock>
}

type UserInfoPropsType = {
    Avatar: string
    Name: string
    Phone: string
}

const UserInfo: React.FC<UserInfoPropsType> = ({Avatar, Phone, Name}) => {
    return  <MenuHeader>
        <MenuAvatar src={Avatar}/>
        <MenuInfo>
            <div>
                {Name}
            </div>
            <div>
                {Phone}
            </div>
        </MenuInfo>
    </MenuHeader>
}

type MenuElementPropsType = {
    Name: string
    Link: string
    Icon: StyledComponent<any, any, any, any>
}
export const MenuElement: React.FC<MenuElementPropsType> = ({Link, Icon, Name}) => {
  return  <MenuItem>
      <IconBlock>
          <Icon/>
      </IconBlock>
      <CustomNavLink to={Link}>
          {Name}
      </CustomNavLink>

  </MenuItem>
}