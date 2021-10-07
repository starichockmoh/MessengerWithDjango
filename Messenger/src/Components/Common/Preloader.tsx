import React from "react";
import PreloaderLogo from "./../../Assets/Spinner-1s-200px (2).svg"
import {PreloaderBlock} from "./Preloader.styled";

export const Preloader: React.FC = () => {
    return <PreloaderBlock>
        <img src={PreloaderLogo} alt = ''/>
    </PreloaderBlock>
}


