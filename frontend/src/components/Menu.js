import {Link} from "react-router-dom";
import React from "react";


const TopMenu = () => {
    return (
        <menu>
            <li>
                <Link to='/'>Users</Link>
            </li>
            <li>
                <Link to='/projects'>Projects</Link>
            </li>
            <li>
                <Link to='/todos'>Todos</Link>
            </li>
        </menu>
    )
};

export default TopMenu