import React, { useEffect, useState } from "react";
import "./Navbar.css";
import openLogo from "./images/menu-line.png";
import closeLogo from "./images/close-line.png"
import { useNavigate } from "react-router-dom";

function Navbar(props) {
    
    //For navigation menu logout button
    const nav = useNavigate();
    const navClick = () => {
        props.logout();
        nav("/login");
    }

    //State for the mobile navigation menu button and opening/closing it function
    const [logo, setLogo] = useState(true);
    function OpenCloseMenu() {
        setLogo(!logo);
    }

    //For if window is in mobile or not
    var isMobile = false;

    //Function to check the window width along with if it is in mobile size. If if it and the logo is false meaning the menu is open, close it.
    //This to ensure that the menu is not open again the user resizes back down from desktop to mobile size
    const checkNavbar = () => {
        if(logo === false)
        {
            isMobile = window.innerWidth <= 767 ? true : false;
            if(isMobile === false && logo === false)
            {
                OpenCloseMenu();
            }

        }
    }

    //Turn on the resize checkNavbar whenever user has opened the menu in mobile mode. This means that the resize is only running when the menu is open and otherwise is not run.
    //Probably a better and more efficient way to do this, but this is at least better than having it run all the time even when the menu is closed and the window is no longer mobile
    useEffect(() => {
            window.addEventListener('resize', checkNavbar);
        return () => {
            window.removeEventListener('resize', checkNavbar);
        }
    }, [logo])

    //Set the navbar menu logo to true meaning closed whenever the login status changes, meaning the automatic logout and any logout for that matter closes it
    useEffect(() => {
        setLogo(true);
    }, [props.logged])

    if(props.logged === true && window.location.href !== "http://localhost:3000/React-Project-2/login")
    {
    return(
        <React.Fragment>
            <div id="Navbar" className="MainElementBackground">
            <img id="OpenCloseMenu" className="NavItem" src={logo ? openLogo : closeLogo} onClick={OpenCloseMenu} alt={logo ? "Open menu" : "Close menu"}/>
            <ul id="NavListDesktop" >
            <ListItem content="Logout" click={navClick}/>
            <ListItem content="Example"/>
            <ListItem content="Example"/>
            <ListItem content="Example"/>
            </ul>
            </div>
            <ul id="NavListMobile" className={logo ? "NotToggled" : "Toggled"}>
            <ListItem content="Example"/>
            <ListItem content="Example"/>
            <ListItem content="Example"/>
            <ListItem content="Logout" click={navClick}/>
            </ul>
        </React.Fragment>
    );
    }
}

function ListItem(props) {

//State and function for hovering over the menu elements
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