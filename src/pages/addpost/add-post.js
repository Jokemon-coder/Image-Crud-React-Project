import React, { useEffect, useState } from "react";
import "./add-post.css";

function AddPost(props) {


    const [userNullOrNot, setUser] = useState();

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

export default AddPost;