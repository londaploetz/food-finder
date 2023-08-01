import React, {useContext} from "react";
import "./runningSections.css"; 
import { AuthProvider } from '../provider/AuthProvider';


import {AuthContext} from "../provider/AuthProvider";


function Header() {
    const { handleLogout, displayName } = useContext(AuthContext);
    return (
        <div className="header">
         
        </div>


    );
}

export default Header;