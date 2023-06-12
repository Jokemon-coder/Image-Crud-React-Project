import React, { useEffect, useState } from "react";
import "./Navbar.css";
import openLogo from "./images/menu-line.png";
import closeLogo from "./images/close-line.png"
import { useNavigate } from "react-router-dom";

function Navbar(props) {
    
    //For navigation menu logout button
    const nav = useNavigate();
    const navClick = (link) => {
        nav(link);
        OpenCloseMenu();
    }

    //Sign user out
    const logoutClick = () => {
        props.authenticate.signOut();
        props.setLogged(false);
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

    const [userNullOrNot, setUser] = useState();

    useEffect(() => {
        props.authenticate.onAuthStateChanged((user) => {
        if(user)
        {
            setUser(user);
        }
    })
    })

    if(userNullOrNot !== null && window.location.href !== "http://localhost:3000/#/login")
    {
    return(
        <React.Fragment>
            <div id="Navbar" className="MainElementBackground">
            <img id="OpenCloseMenu" className="NavItem" src={logo ? openLogo : closeLogo} onClick={OpenCloseMenu} alt={logo ? "Open menu" : "Close menu"}/>
            <ul id="NavListDesktop" >
            <ListItem content="Logout" click={logoutClick}/>
            <ListItem content="Posts" click={() => {navClick("posts")}}/>
            <ListItem content="Add" click={() => {navClick("add")}}/>
            <ListItem content="Home" click={() => {navClick("/")}}/>
            </ul>
            </div> 
            <ul id="NavListMobile" className={logo ? "NotToggled" : "Toggled"}> 
            <ListItem content="Home" click={() => {navClick("/")}}/>
            <ListItem content="Add" click={() => {navClick("add")}}/>
            <ListItem content="Posts" click={() => {navClick(props.authenticate.currentUser.uid + "/posts")}}/>
            <ListItem content="Logout" click={logoutClick}/>
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