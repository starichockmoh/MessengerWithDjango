import React from "react";
import {Commentator, CommentBlock, CommentDate, CommentData, ContentBlock, CommentText, Author} from "./Comments.styled"
import photo from "./../../../../Assets/putin.jpeg"
import {Avatar, Comment} from "antd";


type PropsType = {
    Text: string
    Author: string
    Avatar: string
    Date: string
    IsOtherUser: boolean
}

export const CommentItem: React.FC<PropsType> = (props) => {
    return <CommentBlock IsOtherUser = {props.IsOtherUser}>
        {props.IsOtherUser && <Avatar src={props.Avatar}/>}
        <div>
            <CommentData>
                <Author>
                    {props.Author}
                </Author>
                <CommentText>
                    {props.Text}
                </CommentText>
            </CommentData>
            <CommentDate>
                {props.Date}
            </CommentDate>
        </div>
    </CommentBlock>

}