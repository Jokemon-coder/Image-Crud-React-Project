import React, { useEffect, useState } from "react";
import "./Add.css";
import { db } from "../../firebase/firebaseconfig";
import { getDocs, collection } from "firebase/firestore";

function Add(props) {

const [userPosts, setUserPosts] = useState([]);

const userPostsCollection = collection(db, "userPosts");

useEffect(() => {
    const getUserPosts = async () => {
    try {
        const data = await getDocs(userPostsCollection);
        const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
    }));
        setUserPosts(filteredData);
        console.log(filteredData);
    }catch(error)
    {
        console.log(error);
    }}
    getUserPosts();
}, [])
return(
<React.Fragment>
<div id="userInput">
    <input id="input" type="text"></input>
    <button id="send">Add</button>
        <div>{userPosts.map((post) => (
            <div key={post.id}>
                <p>{post.Title}</p>
            </div>
        ))}</div>
</div>
</React.Fragment>
);
}

export default Add;