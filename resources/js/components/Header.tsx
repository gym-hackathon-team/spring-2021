import React from "react"
import {NavLink} from "react-router-dom";

const Header: React.FC = () => {
    return (<header>
        <ul>
            <li><NavLink to="/dashboard">Home</NavLink></li>
        </ul>
    </header>);
}

export default Header;

