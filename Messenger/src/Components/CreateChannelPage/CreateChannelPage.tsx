import React from "react";
import {CreateChannelBlock} from "./CreateChannelPage.styled"
import {SideHeader} from "../LeftSideBar/SideHeader";
import {Button, Form, Input, Upload} from "antd";
import TextArea from "antd/es/input/TextArea";
import {useDispatch, useSelector} from "react-redux";
import {ActivateChannelsSaga} from "../../Redux/Sagas/ChannelsSaga";
import {PlusOutlined} from "@ant-design/icons";
import {AppStateType} from "../../Redux/Store";
import {Redirect} from "react-router";


type ValuesType = {
    channel_title: string,
    channel_description: string,
    channel_avatar: any
}


export const CreateChannelPage: React.FC = () => {
    const ChannelWasCreated = useSelector((state: AppStateType) => state.ChannelLists.IsChannelCreated)

    const dispatch = useDispatch()
    const onFinish = (values: ValuesType) => {

        dispatch(ActivateChannelsSaga.CreateChannel(values.channel_avatar.fileList[0].originFileObj,
            values.channel_title, values.channel_description))
    };
    if (ChannelWasCreated) return <Redirect to={''}/>
    return <CreateChannelBlock>
        <SideHeader header={'Create'}/>
        <Form name="create_channel" onFinish={onFinish}>
            <Form.Item name="channel_avatar" rules={[{required: true, message: 'This field is required'}]}>
                <Upload name="channel_avatar" listType={"picture-card"}>
                    <PlusOutlined/>
                    <div>Upload photo</div>
                </Upload>
            </Form.Item>
            <Form.Item name="channel_title" rules={[{required: true, message: 'This field is required'}]}>
                <Input style={{marginRight: 10}}
                       maxLength={10} placeholder={'Title'}
                       bordered={false}/>
            </Form.Item>
            <Form.Item name="channel_description" rules={[{required: true, message: 'This field is required'}]}>
                <TextArea style={{marginRight: 10}}
                          showCount maxLength={300} placeholder={'Description'}
                          bordered={false} autoSize={{maxRows: 3}}/>
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Create
                </Button>
            </Form.Item>
        </Form>
    </CreateChannelBlock>
}