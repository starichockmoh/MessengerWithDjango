import React, {useState} from "react";
import {ContentWrapper} from "./Content.styled"
import photo from "./../../Assets/amds.jpg"
import photo1 from "./.././../Assets/putin.jpeg"
import {Message} from "./ContentItem/Message/Message";
import {Post} from "./ContentItem/Post/Post";
import {CommentsPage} from "./ContentItem/CommentsPage/CommentsPage";
import {Button} from "antd";


export const ContentBlock: React.FC = () => {
    const [ContentState, SetContentState] = useState<'COMMENTS' | 'MESSAGES' | 'POSTS'>('POSTS')

    switch (ContentState) {
        case "COMMENTS": {
            return <CommentsPage SetPage={SetContentState}/>
        }
        case "MESSAGES": {
            return <ContentWrapper>
                <Button type={"link"} onClick={() => SetContentState("POSTS")}>Posts</Button>
                <Message Date={'13:00'} IsFriend={true} Text={'Hello my friend'}/>
                <Message Date={'13:01'} IsFriend={true} Text={'How are you'}/>
                <Message Date={'13:04'} IsFriend={false} Text={'Hello!!!!'}/>
                <Message Date={'14:09'} IsFriend={false} Text={'Im OKK how you??'}/>
                <Message Date={'14:10'} IsFriend={true} Text={'Thank fuckkk yupuuu'}/>
                <Message Date={'13:00'} IsFriend={true} Text={'Hello my friend'}/>
                <Message Date={'13:01'} IsFriend={true} Text={'How are youооооооооооооооооооооооооооооооооооооооооооооооооооооооооооооооооооооооооооооооооооооо'}/>
                <Message Date={'13:04'} IsFriend={false} Text={'ow aow areow are youоооооооооооооо youооооооооооооооre yoow are youооооооооооооооuow are youоооооооооооооооооооооооооооо'}/>
                <Message Date={'14:09'} IsFriend={false} Text={'Im OKK how you??'}/>
                <Message Date={'14:10'} IsFriend={true} Text={'Thank fuckkk yupuuu'}/>
                <Message Date={'13:00'} IsFriend={true} Text={'Hello my friend'}/>
                <Message Date={'13:01'} IsFriend={true} Text={'How are you'}/>
                <Message Date={'13:04'} IsFriend={false} Text={'Hello!!!!'}/>
                <Message Date={'14:09'} IsFriend={false} Text={'Im OKK how you??'}/>
                <Message Date={'14:10'} IsFriend={true} Text={'Thank fuckkk yupuuu'}/>
                <Message Date={'13:00'} IsFriend={true} Text={'Hello my friend'}/>
                <Message Date={'13:01'} IsFriend={true} Text={'How are you'}/>
                <Message Date={'13:04'} IsFriend={false} Text={'Hello!!!!'}/>
                <Message Date={'14:09'} IsFriend={false} Text={'Im OKK how you??'}/>
                <Message Date={'14:10'} IsFriend={true} Text={'Thank fuckkk yupuuu'}/>
                <Message Date={'14:10'} IsFriend={true} Text={'Thank fuckkk yupuuu'} Media={{photo: photo}}/>
                <Message Date={'14:15'} IsFriend={false} Text={'Thank fuckkk yupuuu'} Media={{photo: photo1}}/>
            </ContentWrapper>
        }
        case "POSTS": {
            return <ContentWrapper>
                <Button type={"link"} onClick={() => SetContentState("MESSAGES")}>Messages</Button>
                <Post Date={'13:00'} Content={{}} SetPage={SetContentState} Views={300} CommentsCount={243}/>
                <Post Date={'13:02'} Content={{}} SetPage={SetContentState} Views={500} CommentsCount={300}/>
            </ContentWrapper>
        }
    }
}