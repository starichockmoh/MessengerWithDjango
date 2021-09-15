import React from "react";
import {ExitBlock, ExitContent} from "./Exit.styled"
import {Button} from "antd";
import {SideHeader} from "../LeftSideBar/SideHeader";
import { NavLink } from "react-router-dom";


export const Exit: React.FC = () => {
    return <ExitBlock>
        <SideHeader header={'Exit'}/>
        <ExitContent>
            <div>
                Are you sure?
            </div>
            <div>
                <Button danger>YES</Button>
                <NavLink to =''>
                    <Button type={'primary'}>NO</Button>
                </NavLink>
            </div>
        </ExitContent>
    </ExitBlock>
}