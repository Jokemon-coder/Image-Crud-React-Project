import React, { useEffect, useState } from "react";
import "./add-post.css";
import Add from '../../components/Add/Add';

function AddPost(props) {


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
          <div id="AddPost">
            <section id="MainPost">
              <div id="Post">
              <Add/>
              </div>
            </section>
          </div>
        </React.Fragment>
    );
    }
}

export default AddPost;