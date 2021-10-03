import React, {useEffect} from "react"
import {ChannelPost, CommentsBlock, CommentsIcon, PostFooter, PostText, ViewsIcon} from "./Post.styled"
import {Image} from "antd";
import news1 from "./../../../../Assets/news1.jpg"
import {LineHr} from "../../../Common/CommonElements.styled";
import {useDispatch} from "react-redux";
import {ContentAC} from "../../../../Redux/Reducers/ContentReducer";
import {CommentType} from "../../../../Types/Types";


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

    const GetComments = () => {
        dispatch(ContentAC.SetComments(props.Comments))
        props.SetPage('COMMENTS')
    }
    return <ChannelPost>
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