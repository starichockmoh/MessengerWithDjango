import React, {useEffect} from "react";
import {CommentsBlock, CommentsHeader} from "./Comments.styled"
import photo1 from "./../../../../Assets/screp.jpg"
import {CommentItem} from "./Comment";
import {ArrowLeftOutlined} from "@ant-design/icons";
import {Button} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../../../Redux/Store";
import {ToNiceDate} from "../../../../Helper Functions/ToNiceDate";
import {StartChatSagaActions} from "../../../../Redux/Sagas/CommentsSaga";

type PropsType = {
    SetPage: (page: 'COMMENTS' | 'MESSAGES' | 'POSTS') => void
}

export const CommentsPage: React.FC<PropsType> = ({SetPage}) => {

    const CommentsData = useSelector((state: AppStateType) => state.Content.Comments)
    const CurrentUserID =  useSelector((state: AppStateType) => state.Profile.AuthProfile?.pk)

    const CommentsItems = CommentsData?.map(c => <CommentItem Text={c.text}
                                                              Author={'ХУй Морж'} Avatar={photo1}
                                                              Date={ToNiceDate(c.datetime)} IsOtherUser={c.author !== CurrentUserID}
                                                              key={c.id}/>)

    return <CommentsBlock>
        <CommentsHeader>
            <Button type={"link"} icon={<ArrowLeftOutlined/>} onClick={() => SetPage('POSTS')}/>
            Comments
        </CommentsHeader>
        {CommentsItems}
    </CommentsBlock>
}