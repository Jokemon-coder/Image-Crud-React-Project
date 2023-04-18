import React, { useState } from "react";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";

function Navbar(props) {
    const nav = useNavigate();
    
    const navClick = () => {
        props.logout();
        nav("/login");
    }

    if(props.logged === true && window.location.href !== "http://localhost:3000/login")
    {
    return(
        <React.Fragment>
            <ul id="Navbar" className="MainElementBackground">
            <ListItem content="Logout" click={navClick}/>
            <ListItem content="Example"/>
            </ul>
        </React.Fragment>
    );
    }
}

function ListItem(props) {
const[isHovering, setHovering] = useState(false);

const mouseOverAndOut = () => {
    setHovering(!isHovering);
}

    return(
        <React.Fragment>
            <li className={[isHovering ? "MainElementChildBackgroundFocus" : "MainElementChildBackground", "NavItem"].join(" ")} onClick={props.click} onMouseOver={mouseOverAndOut} onMouseOut={mouseOverAndOut}>{props.content}</li>
         </React.Fragment>
    )
}

export default Navbar;