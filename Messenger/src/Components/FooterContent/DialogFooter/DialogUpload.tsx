import React, {ReactElement} from "react";
import {DialogInputButton, DialogUploadBlock, PaperClipIcon, UploadBlock} from "./Dialoginput.styled"
import {Button, Upload, Image} from "antd";
import photo from "./../../../Assets/1337.jpg"
import {UploadFile} from "antd/es/upload/interface";

type ActionType = {
    download: Function
    preview: Function
    remove: Function
}

export const DialogUpload: React.FC = () => {
    const Props = {
        itemRender: (originNode: ReactElement, file: UploadFile, fileList: object[],
                     actions: ActionType) => {
            console.log(file)
            return <Image src={file.thumbUrl}/>
        }
    }
    return <DialogUploadBlock>
        <UploadBlock name="dialog_input_photos" maxCount={10} {...Props} listType={"picture-card"}>
            <div>
                <Button type={"link"}>
                    ADD
                </Button>
            </div>
        </UploadBlock>

    </DialogUploadBlock>
}