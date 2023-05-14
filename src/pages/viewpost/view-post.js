import React, { useEffect, useState } from "react";
import "./view-post.css";

function ViewPosts(props) {

    const [userNullOrNot, setUser] = useState();

    //useEffect setting the userNullOrNot state based on Firebase login. If the user is logged in, render the page
    useEffect(() => {
      props.authenticate.onAuthStateChanged((user) => {
        if(user)
        {
          setUser(user);
        }
      })
    })
    if(userNullOrNot !== null)
    {
    return (
        <React.Fragment>

        </React.Fragment>
    );
    }
}

export default ViewPosts;