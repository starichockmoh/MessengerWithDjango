import React from "react";
import {IconBlock, OptionContent, OptionsBlock, OptionsIcon} from "./Options.styled"
import {OptionElement} from "./OptionElement";
import {useSelector} from "react-redux";
import {AppStateType} from "../../../../Redux/Store";


export const DialogOptions: React.FC = () => {
    const AdditionalColor = useSelector((state: AppStateType) => state.App.AdditionalColor)
    return <OptionsBlock>
        <OptionContent color={AdditionalColor}>
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