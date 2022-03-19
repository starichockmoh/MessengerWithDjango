import React from "react";
import {IconBlock, OptionContent, OptionsBlock, OptionsIcon} from "./Options.styled"
import {Button} from "antd";
import {OptionElement} from "./OptionElement";
import {useSelector} from "react-redux";
import {AppStateType} from "../../../../Redux/Store";


export const ChannelOptions: React.FC = () => {
    const AdditionalColor = useSelector((state: AppStateType) => state.App.AdditionalColor)
    return <OptionsBlock>
        <OptionContent color={AdditionalColor}>
            <IconBlock>
                <OptionsIcon/>
            </IconBlock>
            <div>
                Leave channel
            </div>
        </OptionContent>
        <OptionElement Option={'Report'} AddStyle={{color: 'red'}}/>
    </OptionsBlock>
}

