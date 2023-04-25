import React from "react";
import "./Footer.css";

function Footer () {

    //Variable that holds the current year. 
    var currentYear =  new Date();
    currentYear = currentYear.getFullYear();


    return (
        <>
            <footer id="Footer" className="MainElementBackground">
                <p id="FooterContent" className="MainElementText">&#169; {currentYear} Joel Mantere</p>
            </footer>
        </>
    );
}

export default Footer;