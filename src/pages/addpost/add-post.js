import React, { useEffect, useState } from "react";
import "./add-post.css";
import Add from '../../components/Add/Add';

function AddPost(props) {
  
    const [user, setUser] = useState();

    //useEffect setting the user state based on Firebase login. If the user is logged in, render the page
    useEffect(() => {
      props.authenticate.onAuthStateChanged((user) => {
        if(user)
        {
          setUser(user);
        }
      })
    })
    if(user !== undefined)
    {
    return (
        <React.Fragment>
          <div id="AddPost">
            <section id="MainPost">
              <Add user={user}/>
            </section>
          </div>
        </React.Fragment>
    );
    }
}

export default AddPost;