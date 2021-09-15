import React from "react";
import {ChannelImage, ImagesBlock, ImagesPageHeader} from "./ChannelImages.styled"
import {Button, PageHeader, Image} from "antd";
import {ChannelInfoBlock} from "../ChannelInfo.styled";
import {ChannelInfoPageType} from "../../../Redux/Reducers/ChannelInfoReducer";
import photo from "./../../../Assets/maska.jpg"
import photo1 from "./../../../Assets/1337.jpg"
import photo2 from "./../../../Assets/amds.jpg"
import photo3 from "./../../../Assets/phone.jpg"
import photo4 from "./../../../Assets/news2.jpg"
import photo5 from "./../../../Assets/krest.jpg"
import photo6 from "./../../../Assets/news1.jpg"
import photo7 from "./../../../Assets/photo_2017-11-03_18-44-32.jpg"
import photo8 from "./../../../Assets/photo_2020-07-20_12-54-28.jpg"
import photo9 from "./../../../Assets/putin.jpeg"
import photo10 from "./../../../Assets/screp.jpg"


type PropsType = {
    ChangePage: (page: ChannelInfoPageType) => void
}

export const ChannelImages: React.FC<PropsType> = ({ChangePage}) => {
    return <ChannelInfoBlock>
        <ImagesPageHeader title={'Photos'} onBack={() => ChangePage("INFO")}/>
        <ImagesBlock>
            <ChannelImage src={photo}/>
            <ChannelImage src={photo1}/>
            <ChannelImage src={photo2}/>
            <ChannelImage src={photo3}/>
            <ChannelImage src={photo4}/>
            <ChannelImage src={photo5}/>
            <ChannelImage src={photo6}/>
            <ChannelImage src={photo7}/>
            <ChannelImage src={photo8}/>
            <ChannelImage src={photo9}/>
            <ChannelImage src={photo10}/>
            <ChannelImage src={photo}/>
            <ChannelImage src={photo1}/>
            <ChannelImage src={photo2}/>
            <ChannelImage src={photo3}/>
            <ChannelImage src={photo4}/>
            <ChannelImage src={photo5}/>
            <ChannelImage src={photo6}/>
            <ChannelImage src={photo7}/>
            <ChannelImage src={photo8}/>
            <ChannelImage src={photo9}/>
            <ChannelImage src={photo10}/>
            <ChannelImage src={photo}/>
            <ChannelImage src={photo1}/>
            <ChannelImage src={photo2}/>
            <ChannelImage src={photo3}/>
            <ChannelImage src={photo4}/>
            <ChannelImage src={photo5}/>
            <ChannelImage src={photo6}/>
            <ChannelImage src={photo7}/>
            <ChannelImage src={photo8}/>
            <ChannelImage src={photo9}/>
            <ChannelImage src={photo10}/>
        </ImagesBlock>
    </ChannelInfoBlock>
}