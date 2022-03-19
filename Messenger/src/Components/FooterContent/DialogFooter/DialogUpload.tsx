import React, {ReactElement, useState} from "react";
import {DialogInputButton, DialogUploadBlock, CustomImage, PaperClipIcon, UploadBlock} from "./Dialoginput.styled"
import {Button, Upload, Image} from "antd";
import photo from "./../../../Assets/1337.jpg"
import {UploadFile} from "antd/es/upload/interface";

type ActionType = {
    download: Function
    preview: Function
    remove: Function
}

const ImageComponent: React.FC<{photo:string | undefined}> = ({photo}) => {
    const [IsActive, SetActive] = useState(false)
    return <div>
        <CustomImage onClick={() => SetActive(!IsActive)}
                     src={photo}/>
    </div>
}


export const DialogUpload: React.FC = () => {
    const Props = {
        itemRender: (originNode: ReactElement, file: UploadFile, fileList: object[],
                     actions: ActionType) => {
            return <ImageComponent photo={file.thumbUrl}/>
        }
    }
    return <DialogUploadBlock name={"dialog_input_photos"}>
        <UploadBlock name="dialog_input_photos" maxCount={10} {...Props} listType={"picture"}>
            <Button type={"link"}>
                ADD
            </Button>
        </UploadBlock>
    </DialogUploadBlock>
}

