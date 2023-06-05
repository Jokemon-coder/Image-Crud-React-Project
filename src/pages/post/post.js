import React, {useEffect, useState} from "react";
import { auth, db } from "../../firebase/firebaseconfig";
import { getDocs, collection } from "firebase/firestore";

function Post(props) {

    const [user, setUser] = useState();

    //const [post, setPost] = useState();

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
        if(user)
        {
            setUser(user);

                /*const postId = window.location.href.split("/")[5];

                const postReference = collection(db, "userPosts/" + user.uid + "/posts/");

                getDocs(postReference).then((response) => {
                    const post = [];
                    response.docs.forEach((doc) => {
                        if(doc.data().PostId === postId)
                        {
                            post.push(doc.data());
                        }
                    })
                    setPost(post);
                    console.log(post);
                })*/
        }})
    }, [])

    if(user !== null)
    {
        return(
            <>
            
            </>
        );
    }
}

export default Post;