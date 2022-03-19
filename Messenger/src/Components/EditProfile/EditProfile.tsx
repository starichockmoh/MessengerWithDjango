import React, {useEffect} from "react";
import {
    EditAvatar,
    EditAvatarButton,
    EditAvatarImage,
    EditProfileBlock,
    NameIcon,
    PhoneIcon,
    UserNameIcon
} from "./EditProfile.styled"
import {SideHeader} from "../LeftSideBar/SideHeader";
import {Alert, Button, Form, Input, Upload} from "antd";
import {EditProfileItem} from "./EditProfileItem";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../Redux/Store";
import {ActivateProfileSaga} from "../../Redux/Sagas/ProfileSaga";
import {ToCorrectImage} from "../../Helper Functions/ToCorrectImage";
import {useForm} from "antd/es/form/Form";
import {WithColorType} from "../../Types/Types";
import {SpecialLine} from "../Common/CommonElements.styled";



export const EditProfile: React.FC<WithColorType> = ({LayOutColor}) => {
    const dispatch = useDispatch()
    const UserID = useSelector((state: AppStateType) => state.Profile.AuthProfile?.pk)
    const AdditionalColor = useSelector((state: AppStateType) => state.App.AdditionalColor)
    const AdditionalColorActive = useSelector((state: AppStateType) => state.App.AdditionalColorActive)

    useEffect(() => {
        UserID && dispatch(ActivateProfileSaga.Profile(UserID))
    }, [UserID])

    const onFinish = (values: {add_user_photo: any}) => {
        dispatch(ActivateProfileSaga.AddPhoto((values.add_user_photo.fileList[0].originFileObj)))
        form.resetFields()
    }

    const [form] = Form.useForm();
    const UserData = useSelector((state: AppStateType) => state.Profile.Profile)
    const UserAvatar = UserData?.addit_image[UserData.addit_image.length - 1]?.image
    if (UserData) return <EditProfileBlock color={LayOutColor}>
        <SideHeader header={'Info'} prevLink={'Settings'}/>
        <EditAvatar color={AdditionalColor}>
                <EditAvatarImage src={UserAvatar? ToCorrectImage(UserAvatar) : ''}/>
                <Form name="user_photo" onFinish={onFinish} form={form}>
                    <Form.Item name="add_user_photo" rules={[{required: true, message: 'This field is required'}]}>
                        <Upload name="add_user_photo" maxCount = {1} listType={"picture"}>
                            <EditAvatarButton color={AdditionalColorActive}>CHOOSE PHOTO</EditAvatarButton>
                        </Upload>
                    </Form.Item>
                    <Form.Item>
                        <Button type="link" htmlType="submit">
                            Set photo
                        </Button>
                    </Form.Item>
                </Form>
        </EditAvatar>
        <SpecialLine color={AdditionalColor}/>
        <div>
            <EditProfileItem ChapterName={'First Name'} FormName={"first_name"}
                             Icon={NameIcon} InitialValue={UserData.first_name? UserData.first_name: 'Click to input'}/>
            <EditProfileItem ChapterName={'Last Name'} FormName={"last_name"}
                             Icon={UserNameIcon} InitialValue={UserData.last_name? UserData.last_name: 'Click to input'}/>
            <EditProfileItem ChapterName={'Phone number'}
                             Icon={PhoneIcon} FormName={"telephone"}
                             InitialValue={UserData.telephone? UserData.telephone: 'Click to input'}/>
        </div>
       <EditProfileItem InitialValue={UserData.about_user} ChapterName={"Bio"} Icon={NameIcon} FormName={"about_user"}/>
    </EditProfileBlock>
    else return <Alert message="Error" description={"Something Downloading Error (("} type="error" showIcon/>
}