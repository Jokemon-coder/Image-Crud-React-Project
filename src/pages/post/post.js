import React, {useEffect, useState} from "react";
import { auth, db } from "../../firebase/firebaseconfig";
import { getDocs, collection } from "firebase/firestore";
import ViewSingle from "../../components/ViewSingle/view-single";

function Post(props) {

    const [user, setUser] = useState();

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
        if(user)
        {
            setUser(user);
        }})
    }, [])

    if(user !== null)
    {
        return(
            <>
            <ViewSingle/>
            </>
        );
    }
}

export default Post;