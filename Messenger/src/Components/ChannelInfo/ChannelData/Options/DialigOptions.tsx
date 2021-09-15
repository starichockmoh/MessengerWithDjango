import React from "react";
import {IconBlock, OptionContent, OptionsBlock, OptionsIcon} from "./Options.styled"
import {OptionElement} from "./OptionElement";


export const DialogOptions: React.FC = () => {
    return <OptionsBlock>
        <OptionContent>
            <IconBlock>
                <OptionsIcon/>
            </IconBlock>
            <div>
                Share with contact
            </div>
        </OptionContent>
        <OptionElement Option={'Edit contact'}/>
        <OptionElement Option={'Delete contact'}/>
        <OptionElement Option={'Clear history'}/>
        <OptionElement Option={'Delete chat'}/>
        <OptionElement Option={'Block User'} AddStyle={{color: 'red', marginTop: 10}}/>
    </OptionsBlock>
}