import React, { useState } from "react";
import "./Navbar.css";

function Navbar() {

    /*const[isHovering, setHovering] = useState(false);

    const mouseOverAndOut = (target) => {
        if(isHovering === false)
        {
            setHovering(true);
            console.log(navItem);
        }
    }

    var className = "MainElementChildBackground";

    if(isHovering) {
        className += "Focus";
    }*/

    /*
    <li className={[className, "NavItem"].join(" ")/*[isHovering ? "MainElementChildBackgroundFocus" : "MainElementChildBackground", "NavItem"].join(" ")} onMouseOver={() => setHovering(true)} onMouseOut={() => setHovering(false)}>Example</li>
    <li className={[className, "NavItem"].join(" ")} onMouseOver={() => setHovering(true)} onMouseOut={() => setHovering(false)}>Example</li>
    <li className={[className, "NavItem"].join(" ")} onMouseOver={() => setHovering(true)} onMouseOut={() => setHovering(false)}>Example</li>
    <li className={[className, "NavItem"].join(" ")} onMouseOver={() => setHovering(true)} onMouseOut={() => setHovering(false)}>Example</li>
    
    */

    return(
        <React.Fragment>
            <ul id="Navbar" className="MainElementBackground">
            <ListItem content="Hi"/>
            <ListItem content="Hi"/>
            <ListItem content="Hi"/>
            <ListItem content="Hi"/>
            </ul>
        </React.Fragment>
    );
}

function ListItem(props) {
    const[isHovering, setHovering] = useState(false);

    /*const mouseOverAndOut = (target) => {
        if(isHovering === false)
        {
            setHovering(true);
            console.log(navItem);
        }
    }*/

    return(
        <React.Fragment>
            <li className={[isHovering ? "MainElementChildBackgroundFocus" : "MainElementChildBackground", "NavItem"].join(" ")/*[isHovering ? "MainElementChildBackgroundFocus" : "MainElementChildBackground", "NavItem"].join(" ")*/} onMouseOver={() => setHovering(!isHovering)} onMouseOut={() => setHovering(!isHovering)}>{props.content}</li>
         </React.Fragment>
    )
}

export default Navbar;