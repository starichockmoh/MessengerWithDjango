import React from "react";
import {IconBlock, OptionContent, OptionsBlock, OptionsIcon} from "./Options.styled"
import {Button} from "antd";
import {OptionElement} from "./OptionElement";


export const ChannelOptions: React.FC = () => {
    return <OptionsBlock>
        <OptionContent>
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

