import React from "react";
import {CallAvatar, CallData, CallsBlock, CallsItem, CallUserName, PhoneIcon, VideoIcon} from "./Calls.styled"
import {Avatar} from "antd";
import photo from "./../../Assets/photo_2017-11-03_18-44-32.jpg"
import photo1 from "./../../Assets/amds.jpg"
import photo2 from "./../../Assets/maska.jpg"
import photo3 from "./../../Assets/putin.jpeg"
import photo4 from "./../../Assets/krest.jpg"
import {SideHeader} from "../LeftSideBar/SideHeader";
import {StyledComponent} from "styled-components";

export const Calls: React.FC = () => {
    return <CallsBlock>
        <SideHeader header={'Calls'}/>
        <Call Name={'SevaBor'} Icon={PhoneIcon} Avatar={photo} LastData={'june 1 at 10:56'}/>
        <Call Name={'Catik'} Icon={VideoIcon} Avatar={photo1} LastData={'april 1 at 10:00'}/>
        <Call Name={'SevaBor'} Icon={VideoIcon} Avatar={photo2} LastData={'april at 14:22'}/>
        <Call Name={'Chelpver'} Icon={PhoneIcon} Avatar={photo3} LastData={'june 1 at 10:56'}/>
        <Call Name={'Putin'} Icon={PhoneIcon} Avatar={photo4} LastData={'april at 14:22'}/>
        <Call Name={'Medved'} Icon={PhoneIcon} Avatar={photo} LastData={'june 1 at 10:56'}/>
        <Call Name={'Mamont'} Icon={PhoneIcon} Avatar={photo1} LastData={'june 1 at 10:56'}/>
        <Call Name={'her'} Icon={VideoIcon} Avatar={photo4} LastData={'april at 14:22'}/>
        <Call Name={'DON Carkeone'} Icon={PhoneIcon} Avatar={photo2} LastData={'april at 14:22'}/>
        <Call Name={'Vitek'} Icon={VideoIcon} Avatar={photo} LastData={'yesterday'}/>
        <Call Name={'Putin'} Icon={PhoneIcon} Avatar={photo4} LastData={'april at 14:22'}/>
        <Call Name={'Medved'} Icon={PhoneIcon} Avatar={photo} LastData={'june 1 at 10:56'}/>
        <Call Name={'Mamont'} Icon={PhoneIcon} Avatar={photo1} LastData={'june 1 at 10:56'}/>
        <Call Name={'her'} Icon={VideoIcon} Avatar={photo4} LastData={'april at 14:22'}/>
        <Call Name={'DON Carkeone'} Icon={PhoneIcon} Avatar={photo2} LastData={'april at 14:22'}/>
    </CallsBlock>
}

type CallsItemPropsType = {
    LastData: string
    Name: string
    Avatar: string
    Icon: StyledComponent<any, any, any, any>
}

const Call: React.FC<CallsItemPropsType> = ({Avatar, Icon, Name, LastData}) => {
    return <CallsItem>
        <CallAvatar src={Avatar}/>
        <div>
            <CallUserName>
                {Name}
            </CallUserName>
            <CallData>
                {LastData}
            </CallData>
        </div>
        <Icon/>
    </CallsItem>
}