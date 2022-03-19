import React, {useState} from "react";
import {ChannelInputSearch, MenuButton, MenuButtonIcon, SearchBlock} from "./ChannelInput.styled"
import {CustomNavLink} from "../Common/CommonElements.styled";
import {Button, Dropdown, Menu} from "antd";
import {DownOutlined} from "@ant-design/icons";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../Redux/Store";
import {ChannelListsAC} from "../../Redux/Reducers/ChannelListsReducer"
import {WithColorType} from "../../Types/Types";

const {SetList} = ChannelListsAC


export type SearchStatusType = 'Focus' | null


export const ChannelInput: React.FC<WithColorType> = ({LayOutColor, AdditionalColor}) => {
    const dispatch = useDispatch()
    const channelListsMenu = <Menu>
        <Menu.Item key="0" onClick={() => dispatch(SetList("CHANNELS"))}>Channels</Menu.Item>
        <Menu.Item key="1" onClick={() => dispatch(SetList("DIALOGS"))}>Dialogs</Menu.Item>
    </Menu>
    const CurrentList = useSelector((state: AppStateType) => state.ChannelLists.CurrentList)
    const [SearchStatus, SetSearchStatus] = useState<SearchStatusType>(null)
    return <SearchBlock>
        <CustomNavLink to={'/menu'} color={LayOutColor}>
            <MenuButton icon={<MenuButtonIcon/>} type={'link'}/>
        </CustomNavLink>
        <Dropdown overlay={channelListsMenu} trigger={['click']} placement={'bottomRight'}>
            <Button style={{color: "gray"}}
                    icon={<DownOutlined/>}
                    type={"link"}>
                {CurrentList === "CHANNELS" ? "Channels" : 'Dialogs'}
            </Button>
        </Dropdown>
        <ChannelInputSearch allowClear={SearchStatus === 'Focus'}
                            SearchStatus={SearchStatus}
                            placeholder={'Search...'}
                            onFocus={() => SetSearchStatus('Focus')}
                            onBlur={() => SetSearchStatus(null)}
                            Color={LayOutColor}
                            ActiveColor={AdditionalColor}
                            bordered={false}
        />
    </SearchBlock>
}