import React from "react";
import {ExitBlock, ExitContent} from "./Exit.styled"
import {Button} from "antd";
import {SideHeader} from "../LeftSideBar/SideHeader";
import { NavLink } from "react-router-dom";
import {useDispatch} from "react-redux";
import {ActivateAuthSaga} from "../../Redux/Sagas/AuthSaga";


export const Exit: React.FC = () => {
    const dispatch = useDispatch()
    return <ExitBlock>
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