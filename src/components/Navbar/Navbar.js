import React, { useState } from "react";
import "./Navbar.css";

function Navbar() {

    const[isHovering, setHovering]= useState([false, "MainElementChildBackground"]);

    /*const mouseOverAndOut = (target) => {
        if(isHovering === false)
        {
            setHovering(true);
            console.log(navItem);
        }
    }*/
    const mouseOverAndOut = (e) => {
        if(isHovering[0] === false)
        {
            e.target.classList.remove(isHovering[1]);
            e.target.classList.add("MainElementChildBackgroundFocus");
            setHovering([true, "MainElementChildBackgroundFocus"]);
            console.log(isHovering);

        }else
        {
            e.target.classList.remove(isHovering[1]);
            e.target.classList.add("MainElementChildBackground");
            setHovering([false, "MainElementChildBackground"]);
        }
    }

    return(
        <React.Fragment>
            <ul id="Navbar" className="MainElementBackground">
                <li className="NavItem MainElementChildBackground" onMouseOver={mouseOverAndOut} onMouseOut={mouseOverAndOut}>Example</li>
                <li className="NavItem MainElementChildBackground">Example</li>
                <li className="NavItem MainElementChildBackground">Example</li>
                <li className="NavItem MainElementChildBackground">Example</li>
            </ul>
        </React.Fragment>
    );
}

export default Navbar;