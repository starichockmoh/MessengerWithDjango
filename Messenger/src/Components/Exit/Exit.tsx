import React from "react";
import {ExitBlock, ExitContent} from "./Exit.styled"
import {Button} from "antd";
import {SideHeader} from "../LeftSideBar/SideHeader";
import { NavLink } from "react-router-dom";
import {useDispatch} from "react-redux";
import {ActivateAuthSaga} from "../../Redux/Sagas/AuthSaga";
import {WithColorType} from "../../Types/Types";


export const Exit: React.FC<WithColorType> = ({LayOutColor}) => {
    const dispatch = useDispatch()
    return <ExitBlock color={LayOutColor}>
        <SideHeader header={'Exit'}/>
        <ExitContent>
            <div>
                Are you sure?
            </div>
            <div>
                <NavLink to={''}>
                    <Button danger onClick={() => dispatch(ActivateAuthSaga.Logout())}>
                        YES
                    </Button>
                </NavLink>
                <NavLink to =''>
                    <Button type={'primary'}>NO</Button>
                </NavLink>
            </div>
        </ExitContent>
    </ExitBlock>
}