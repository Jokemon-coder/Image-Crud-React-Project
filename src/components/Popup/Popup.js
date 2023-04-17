import React from "react";
import { useState } from "react";
import "./Popup.css";

function Popup (props) {

    //State and function for when user is hovering the popup close
    const [hover, setHovering] = useState(false);
    const mouseOverAndOut = () => {
        setHovering(!hover);
    }

    return(
        <React.Fragment>
            <div id={props.id} className="Popup" style={{display:  props.warning ? "block" : "none"}}>
                <div className={["PopupContent", "MainElementBackground"].join(" ")}>
                    <span className={[hover ? "HoverRed" : "MainElementText", "PopupClose"].join(" ")} onClick={props.startClick} onMouseOver={mouseOverAndOut} onMouseOut={mouseOverAndOut}>X</span>
                    <p className={["MainElementText", "PopupContentText"].join(" ")}>You will be automatically logged out in:</p>
                    <p className="Countdown">{props.number} seconds</p>
                    <p className={["MainElementText", "PopupContentText"].join(" ")}>Close this popup to prevent that.</p>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Popup;