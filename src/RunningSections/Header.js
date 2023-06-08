import React, {useContext} from "react";
import "./runningSections.css"; 
import { AuthProvider } from '../provider/AuthProvider';


import {AuthContext} from "../provider/AuthProvider";


function Header() {
    const { userContext, handleLogout, displayName } = useContext(AuthContext);
    return (
        <div className="header">
            <h1 className="welcome-header"> Welcome! {displayName} </h1>
        </div>


    );
}

export default Header;