import React from "react";
import {useSelector} from "react-redux";
import {AppStateType} from "../Redux/Store";
import {WithColorType} from "../Types/Types";

type FCType = React.FC<WithColorType>

export const WithColor = (Component: FCType) => {
    const ComponentWithColor = () => {
        const LayOutColor = useSelector((state: AppStateType) => state.App.LayOutColor)
        const AdditionalColorActive = useSelector((state: AppStateType) => state.App.AdditionalColorActive)
        const AdditionalColor = useSelector((state: AppStateType) => state.App.AdditionalColor)
        return <Component LayOutColor={LayOutColor} AdditionalColorActive={AdditionalColorActive} AdditionalColor={AdditionalColor}/>
    }
    return ComponentWithColor
}