import React, { useState } from "react";
import "./Navbar.css";
import openLogo from "./images/menu-line.png";
import closeLogo from "./images/close-line.png"
import { useNavigate } from "react-router-dom";

function Navbar(props) {
    const nav = useNavigate();
    
    const navClick = () => {
        props.logout();
        nav("/login");
    }

    const [logo, setLogo] = useState(true);

    function OpenCloseMenu() {
        setLogo(!logo);
    }

    if(props.logged === true && window.location.href !== "http://localhost:3000/login")
    {
    return(
        <React.Fragment>
            <div id="Navbar" className="MainElementBackground">
            <img id="OpenCloseMenu" className="NavItem" src={logo ? openLogo : closeLogo} onClick={OpenCloseMenu}/>
            <ul id="NavListDesktop">
            <ListItem content="Logout" click={navClick}/>
            <ListItem content="Example"/>
            </ul>
            </div>
            <ul id="NavListMobile" className={logo ? "NotToggled" : "Toggled"}>
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
            <li className={[isHovering ? "MainElementChildBackgroundFocus" : "MainElementChildBackground", "NavItem", "NavContent"].join(" ")} onClick={props.click} onMouseOver={mouseOverAndOut} onMouseOut={mouseOverAndOut}>{props.content}</li>
         </React.Fragment>
    )
}

export default Navbar;