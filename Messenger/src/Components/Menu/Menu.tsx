import React, {useEffect, useState} from "react";
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
    SettingsIcon, ThemeIcon
} from "./Menu.styled"
import {Button, Switch, Image} from "antd";
import "../LeftSideBar/AnimationSideBar.css"
import {CustomNavLink} from "../Common/CommonElements.styled";
import {StyledComponent} from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../Redux/Store";
import {ActivateProfileSaga} from "../../Redux/Sagas/ProfileSaga";
import {ToNicePhoneNumber} from "../../Helper Functions/ToNicePhoneNumber";
import {ToCorrectImage} from "../../Helper Functions/ToCorrectImage";
import {WithColorType} from "../../Types/Types";
import {ActivateAuthSaga} from "../../Redux/Sagas/AuthSaga";


export const Menu: React.FC<WithColorType> = ({LayOutColor}) => {
    const dispatch = useDispatch()
    const AdditionalColor = useSelector((state: AppStateType) => state.App.AdditionalColor)
    const UserID = useSelector((state: AppStateType) => state.Profile.AuthProfile?.pk)
    useEffect(() => {
        UserID && dispatch(ActivateProfileSaga.Profile(UserID))
    }, [UserID])


    const UserData = useSelector((state: AppStateType) => state.Profile.Profile)

    const UserAvatar = UserData?.addit_image[UserData.addit_image.length - 1]?.image

    const Images = UserData?.addit_image.map(photo => photo.image)

    const onChangeTheme = () => {
        const currentTheme = localStorage.getItem("app_theme")
        if (currentTheme === "day") {
            dispatch(ActivateAuthSaga.AppTheme("night"))
        } else {
            dispatch(ActivateAuthSaga.AppTheme("day"))
        }
    }

    return <MenuBlock color={LayOutColor}>
        <CloseButton>
            <CustomNavLink to={'/'} color={LayOutColor}>
                <Button type={"link"} danger icon={<CloseOutlined/>}/>
            </CustomNavLink>
        </CloseButton>

        {!!UserData && <UserInfo Name={UserData.username}
                                 Phone={ToNicePhoneNumber(UserData.telephone)}
                                 Images={Images ? Images.reverse() : ['']}/>}

        <MenuContent>
            <MenuElement Name={'New Group'} Link={'/settings'} Icon={GroupIcon}/>
            <MenuElement Name={'New Channel'} Link={'/new_channel'} Icon={ChannelIcon}/>
            <MenuElement Name={'Contacts'} Link={'/contacts'} Icon={ContactsIcon}/>
            <MenuElement Name={'Calls'} Link={'/calls'} Icon={CallsIcon}/>
            <MenuElement Name={'Settings'} Link={'/settings'} Icon={SettingsIcon}/>
            <MenuElement Name={'Exit'} Link={'/exit'} Icon={LogoutIcon}/>
            <MenuItem color={AdditionalColor}>
                <IconBlock>
                    <ThemeIcon/>
                </IconBlock>
                <div>
                    Night mode
                </div>
                <Switch size="small" onClick={onChangeTheme} checked={localStorage.getItem("app_theme") === "night"}/>
            </MenuItem>
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
    Images: Array<string>
    Name: string
    Phone: string
}

const UserInfo: React.FC<UserInfoPropsType> = ({Images, Phone, Name}) => {
    const AdditionalColorActive = useSelector((state: AppStateType) => state.App.AdditionalColorActive)
    return <MenuHeader color={AdditionalColorActive}>
        <AvatarComponent photos={Images}/>
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
    const AdditionalColor = useSelector((state: AppStateType) => state.App.AdditionalColor)
    const LayOutColor = useSelector((state: AppStateType) => state.App.LayOutColor)
    return <MenuItem color={AdditionalColor}>
        <IconBlock>
            <Icon/>
        </IconBlock>
        <CustomNavLink to={Link} color={LayOutColor}>
            {Name}
        </CustomNavLink>
    </MenuItem>
}


const AvatarComponent: React.FC<{photos: Array<string>}> = ({photos}) => {
    const [visible, setVisible] = useState(false);
    const Images = []
    for (let i = 0; i < photos.length ; ++i) {
        Images.push(<Image src={ToCorrectImage(photos[i])}/>)
    }
    return (
        <>
            <MenuAvatar
                preview={false}
                width={200}
                src={ToCorrectImage(photos[0])}
                onClick={() => setVisible(true)}
            />
            <div style={{ display: 'none' }}>
                <Image.PreviewGroup preview={{ visible, onVisibleChange: vis => setVisible(vis) }}>
                    {Images}
                </Image.PreviewGroup>
            </div>
        </>
    );
};
