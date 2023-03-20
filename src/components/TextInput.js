import React from "react";

function TextInput(props) {
    return (
        <input id={props.id} className={props.class} type={props.type} placeholder={props.placeholder}></input>
    );
}

export default TextInput;