import React, {useEffect} from "react"
import {ChannelPost, CommentsBlock, CommentsIcon, PostFooter, PostText, ViewsIcon} from "./Post.styled"
import {Image} from "antd";
import news1 from "./../../../../Assets/news1.jpg"
import {LineHr} from "../../../Common/CommonElements.styled";
import {useDispatch, useSelector} from "react-redux";
import {ContentAC} from "../../../../Redux/Reducers/ContentReducer";
import {CommentType} from "../../../../Types/Types";
import {AppStateType} from "../../../../Redux/Store";


type PropsType = {
    Comments: Array<CommentType>
    Content: {
        Text?: string
        Images?: Array<string> | string
        Videos?: any
        Audio?: any
    }
    Date: string
    Views: number
    CommentsCount: number
    SetPage: (page: 'COMMENTS' | 'MESSAGES' | 'POSTS') => void
}

export const Post: React.FC<PropsType> = (props) => {
    const dispatch = useDispatch()
    const LayOutColor = useSelector((state: AppStateType) => state.App.LayOutColor)
    const GetComments = () => {
        dispatch(ContentAC.SetComments(props.Comments))
        props.SetPage('COMMENTS')
    }
    return <ChannelPost color={LayOutColor}>
        <Image src={news1}/>
        <PostText>
            {props.Content.Text}
        </PostText>
        <PostFooter>
            <ViewsIcon/> {props.Views} {props.Date}
        </PostFooter>
        <CommentsBlock>
            <div onClick={GetComments}>
                <CommentsIcon/>
                {props.CommentsCount} comments
            </div>
        </CommentsBlock>
    </ChannelPost>
}