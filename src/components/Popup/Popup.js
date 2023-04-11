import React from "react";
import "./Popup.css";

function Popup (props) {

    return(
        <React.Fragment>
            <div id={props.id} className="Popup" style={{display:  props.warning ? "block" : "none"}}>
                <div className="PopupContent">
                    <span className="PopupClose" onClick={props.startClick}>X</span>
                    <p>If you don't close this popup, you will be logged out automatically</p>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Popup;