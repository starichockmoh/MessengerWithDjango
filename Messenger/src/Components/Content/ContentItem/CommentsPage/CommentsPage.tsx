import React, {useEffect, useState} from "react";
import {CommentBlock, CommentsBlock, CommentsHeader} from "./Comments.styled"
import photo from "./../../../../Assets/putin.jpeg"
import photo1 from "./../../../../Assets/screp.jpg"
import photo2 from "./../../../../Assets/amds.jpg"
import {CommentItem} from "./Comment";
import {ArrowLeftOutlined} from "@ant-design/icons";
import {Button} from "antd";

type PropsType = {
    SetPage: (page: 'COMMENTS' | 'MESSAGES' | 'POSTS') => void
}

export const CommentsPage: React.FC<PropsType> = ({SetPage}) => {

    let t1 = 'Heelo every body'
    let t3 = 'Whata'
    let t4 = 'Sometimes I fell like banana'
    let t2 ='SPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPASPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAM SPAM SPAM SPAM SPAM SPAM SPAM SPAMSPAM SPAM SPAM'
    return <CommentsBlock>
        <CommentsHeader>
            <Button type={"link"} icon={<ArrowLeftOutlined/>} onClick={() => SetPage('POSTS')}/>
            Comments
        </CommentsHeader>
        <CommentItem IsOtherUser={true} Avatar={photo1} Text={t1} Date={'13:00'} Author={'Dima'}/>
        <CommentItem IsOtherUser={false} Avatar={photo} Text={t2} Date={'13:01'} Author={'Valera'}/>
        <CommentItem IsOtherUser={true} Avatar={photo2} Text={t3} Date={'13:05'} Author={'Kekes'}/>
        <CommentItem IsOtherUser={true} Avatar={photo} Text={t1} Date={'13:06'} Author={'Kekes'}/>
        <CommentItem IsOtherUser={true} Avatar={photo2} Text={t2} Date={'14:05'} Author={'Dream'}/>
        <CommentItem IsOtherUser={true} Avatar={photo} Text={t1} Date={'14:13'} Author={'Show'}/>
        <CommentItem IsOtherUser={true} Avatar={photo1} Text={t4} Date={'14:33'} Author={'Martin'}/>
        <CommentItem IsOtherUser={true} Avatar={photo} Text={t1} Date={'14:34'} Author={'Chjel'}/>
        <CommentItem IsOtherUser={true} Avatar={photo1} Text={t4} Date={'14:45'} Author={'Kekes'}/>
        <CommentItem IsOtherUser={false} Avatar={photo} Text={t3} Date={'14:50'} Author={'Valera'}/>
    </CommentsBlock>
}