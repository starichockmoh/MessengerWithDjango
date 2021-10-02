import React, {useEffect, useState} from "react";
import {ContentWrapper} from "./Content.styled"
import photo from "./../../Assets/amds.jpg"
import photo1 from "./.././../Assets/putin.jpeg"
import {Message} from "./ContentItem/Message/Message";
import {Post} from "./ContentItem/Post/Post";
import {CommentsPage} from "./ContentItem/CommentsPage/CommentsPage";
import {Button} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../Redux/Store";
import {ContentAC, ContentStateType} from "../../Redux/Reducers/ContentReducer";
import {ToNiceDate} from "../../Helper Functions/ToNiceDate";
import {ActivateChannelsSaga} from "../../Redux/Sagas/ChannelsSaga";
import {ActivateDialogsSaga} from "../../Redux/Sagas/DialogsSaga";
import {ChannelListsAC} from "../../Redux/Reducers/ChannelListsReducer"
const {SetList} = ChannelListsAC


export const ContentBlock: React.FC = () => {
    const dispatch = useDispatch()
    const ContentState = useSelector((state: AppStateType) => state.Content.ContentState)
    const CurrentUserID = useSelector((state: AppStateType) => state.Profile.AuthProfile?.pk)
    const SetContentState = (state: ContentStateType) => {
        dispatch(ContentAC.SetContentState(state))
    }
    useEffect(() => {
        const StorageChannelID = sessionStorage.getItem('CurrentChannelID')
        const StorageDialogID = sessionStorage.getItem('CurrentDialogID')
        if (StorageChannelID) {
            dispatch(SetList("CHANNELS"))
            dispatch(ActivateChannelsSaga.Details(Number(StorageChannelID)))
        } else if (StorageDialogID) {
            dispatch(SetList("DIALOGS"))
            dispatch(ActivateDialogsSaga.Details(Number(StorageDialogID)))
        }
    }, [])


    const PostsData = useSelector((state: AppStateType) => state.ChannelLists.CurrentChannel?.get_posts)
    const PostsItems = PostsData?.map(p => <Post
        Content={{Text: p.text}}
        Date={ToNiceDate(p.datetime)}
        key = {p.id}
        Comments={p.get_comments}
        Views={p.views} CommentsCount={p.get_comments.length}
        SetPage={SetContentState}/>)

    const MessagesData = useSelector((state: AppStateType) => state.Dialogs.CurrentDialog?.get_messeges)
    const MessagesItems = MessagesData?.map(m => <Message
        Date={ToNiceDate(m.datetime)}
        IsFriend={m.sender !== CurrentUserID}
        Text={m.text}
        Media={{photo: m.get_images.length ? m.get_images[0].image: ''}}
    />)

    switch (ContentState) {
        case "COMMENTS": {
            return <CommentsPage SetPage={SetContentState}/>
        }
        case "MESSAGES": {
            return <ContentWrapper>
                {MessagesItems}
                <Message Date={'14:10'} IsFriend={true} Text={'Thank fuckkk yupuuu'} Media={{photo: photo}}/>
                <Message Date={'14:15'} IsFriend={false} Text={'Thank fuckkk yupuuu'} Media={{photo: photo1}}/>
            </ContentWrapper>
        }
        case "POSTS": {
            return <ContentWrapper>
                {PostsItems}
            </ContentWrapper>
        }
        default :
            return <div style={{margin: 5}}>
                Choose dialog
            </div>
    }
}