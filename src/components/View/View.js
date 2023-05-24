import React from "react";
import { useState, useEffect } from "react";
import "./View.css";
import { storage, auth, db } from "../../firebase/firebaseconfig";
import { listAll, ref, getDownloadURL} from "firebase/storage";
import { doc, getDocs, collection} from "firebase/firestore";

function View() {

    //State for the images displayed
    const [imageList, setImageList] = useState([]);

    const [userPosts, setUserPosts] = useState([]);

    //useEffect setting the user state based on Firebase login. This prevents errors from trying to use auth.currentUser directly before it has initialized on render.
    useEffect(() => {
        auth.onAuthStateChanged((user) => {
        if(user)
            {
                //Previous way of getting the image url. Now it is instead saved separately into firestore in its designated post document and it's get from there directly along with other info.

                //Ref for the image list tied to the specific user in Firebase
                /*const imageListRef = ref(storage, "users" + "/" + user.uid + "/");

                //Get all of the images based on the ref and for each add them into imageList
                listAll(imageListRef).then((response) => {
                    response.items.forEach((item) => {
                        getDownloadURL(item).then((url) => {
                                setImageList((prev) => [...prev, url]);
                                console.log(url);
                                console.log(imageList);
                        })
                    })
                })*/

                const userPostsCollection = collection(db, "userPosts" + "/" + user.uid + "/" + "posts/");

                const getUserPosts = async () => {
                        /*const data = await getDocs(userPostsCollection);
                        const filteredData = data.docs.map((doc) => ({
                        ...doc.data(),
                    }));*/
                    getDocs(userPostsCollection).then((response) => {
                        response.docs.forEach((item) => {
                            const url = item.data().Link;
                            setImageList((prev) => [...prev, url])
                            console.log(url);
                            console.log(imageList);
                            })
                    })}
                    
                    getUserPosts();

            }
        })
    }, [])

    return (
        <React.Fragment>
            <div id="UserImageGrid" className="MainElementBackground">
            {imageList.map((image, index) => {
                return <img key={index} className={["UserImage", "MainElementChildBackground"].join(" ")} src={image} href={image} alt={image}/>
                })}
            </div>
        </React.Fragment>
    );
}

export default View;