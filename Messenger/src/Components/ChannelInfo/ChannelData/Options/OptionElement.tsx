import React from "react";
import {OptionContent} from "./Options.styled"
import {useSelector} from "react-redux";
import {AppStateType} from "../../../../Redux/Store";

type PropsType = {
    Option: string
    AddStyle?: {
        color: string
        marginTop?: number
    }
}
export const OptionElement: React.FC<PropsType> = ({AddStyle, Option}) => {
    const AdditionalColor = useSelector((state: AppStateType) => state.App.AdditionalColor)
    return <OptionContent color={AdditionalColor}>
        <br/>
        <div style={AddStyle}>
            {Option}
        </div>
    </OptionContent>
}