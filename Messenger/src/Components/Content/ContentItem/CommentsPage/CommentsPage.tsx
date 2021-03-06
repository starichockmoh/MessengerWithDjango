import React from "react";
import {CommentsBlock, CommentsHeader} from "./Comments.styled"
import photo1 from "./../../../../Assets/screp.jpg"
import {CommentItem} from "./Comment";
import {ArrowLeftOutlined} from "@ant-design/icons";
import {Button} from "antd";
import {useSelector} from "react-redux";
import {AppStateType} from "../../../../Redux/Store";
import {ToNiceDate} from "../../../../Helper Functions/ToNiceDate";
import {Preloader} from "../../../Common/Preloader";

type PropsType = {
    SetPage: (page: 'COMMENTS' | 'MESSAGES' | 'POSTS') => void
}

export const CommentsPage: React.FC<PropsType> = ({SetPage}) => {

    const CommentsData = useSelector((state: AppStateType) => state.Content.Comments)
    const CurrentUserID =  useSelector((state: AppStateType) => state.Profile.AuthProfile?.pk)
    const LayOutColor = useSelector((state: AppStateType) => state.App.LayOutColor)

    const CommentsItems = CommentsData?.map(c => <CommentItem Text={c.text}
                                                              Author={'ХУй Морж'} Avatar={photo1}
                                                              Date={ToNiceDate(c.datetime)} IsOtherUser={c.author !== CurrentUserID}
                                                              key={c.id}/>)

    return <CommentsBlock>
        <CommentsHeader color={LayOutColor}>
            <Button type={"link"} icon={<ArrowLeftOutlined/>} onClick={() => SetPage('POSTS')}/>
            Comments
        </CommentsHeader>
        {CommentsData? CommentsItems: <Preloader/>}
    </CommentsBlock>
}