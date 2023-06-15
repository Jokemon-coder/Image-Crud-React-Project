import React, { useEffect, useState } from "react";
import { auth, storage } from "../../firebase/firebaseconfig";
import "./view-post.css";
import View from "../../components/View/View";

function ViewPosts() {

    const [user, setUser] = useState();

    //useEffect setting the userNullOrNot state based on Firebase login. If the user is logged in, render the page
    useEffect(() => {
      auth.onAuthStateChanged((user) => {
        if(user)
        {
          setUser(user);
        }
      })
    })
    if(user !== undefined)
    {
    return (
        <>
          <div id="ViewPosts">
            <section /*id="ViewPostsGrid"*/>
            <View/>
            </section>
          </div>
        </>
    );
    }
}

export default ViewPosts;