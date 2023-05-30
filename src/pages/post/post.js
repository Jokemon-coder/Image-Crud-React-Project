import React, {useEffect} from "react";
import { auth } from "../../firebase/firebaseconfig";

function Post(props) {

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
        if(user)
        {

        }})
    })

    return(
        <>

        </>
    );
}

export default Post();