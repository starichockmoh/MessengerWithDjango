import React from "react";
import {CustomNavLink} from "../../../Common/CommonElements.styled";
import {OptionContent} from "./Options.styled"

type PropsType = {
    Option: string
    AddStyle?: {
        color: string
        marginTop?: number
    }
}
export const OptionElement: React.FC<PropsType> = ({AddStyle, Option}) => {
    return <OptionContent>
        <br/>
        <div style={AddStyle}>
            {Option}
        </div>
    </OptionContent>
}