import React from "react";
import {Commentator, CommentBlock, CommentDate, CommentData, ContentBlock, CommentText, Author} from "./Comments.styled"
import photo from "./../../../../Assets/putin.jpeg"
import {Avatar, Comment} from "antd";
import {useSelector} from "react-redux";
import {AppStateType} from "../../../../Redux/Store";


type PropsType = {
    Text: string
    Author: string
    Avatar: string
    Date: string
    IsOtherUser: boolean
}

export const CommentItem: React.FC<PropsType> = (props) => {
    const LayOutColor = useSelector((state: AppStateType) => state.App.LayOutColor)
    return <CommentBlock IsOtherUser = {props.IsOtherUser} color={LayOutColor}>
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