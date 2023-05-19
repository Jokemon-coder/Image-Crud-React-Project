import React from "react";
import { useState, useEffect } from "react";
import "./View.css";
import { storage, auth } from "../../firebase/firebaseconfig";
import { listAll, ref, getDownloadURL} from "firebase/storage";

function View() {

    //State for the images displayed
    const [imageList, setImageList] = useState([]);

    //useEffect setting the user state based on Firebase login. This prevents errors from trying to use auth.currentUser directly before it has initialized on render.
    useEffect(() => {
        auth.onAuthStateChanged((user) => {
        if(user)
            {
                //Ref for the image list tied to the specific user in Firebase
                const imageListRef = ref(storage, "users" + "/" + user.uid + "/");

                //Get all of the images based on the ref and for each add them into imageList
                listAll(imageListRef).then((response) => {
                    response.items.forEach((item) => {
                        getDownloadURL(item).then((url) => {
                                setImageList((prev) => [...prev, url]);
                        })
                    })
                })
            }
        })
    }, [])

    /*const imageListRef = ref(storage, "users" + "/" + user.uid + "/");
    const [imageList, setImageList] = useState([]);

    useEffect(() => {
        listAll(imageListRef).then((response) => {
            response.items.forEach((item) => {
                getDownloadURL(item).then((url) => {
                        setImageList((prev) => [...prev, url]);
                })
            })
        })
    })*/



    return (
        <React.Fragment>
            <div id="UserImageGrid" className="MainElementBackground">
            {imageList.map((image, index) => {
                return <img className={["UserImage", "MainElementChildBackground"].join(" ")} key={index} src={image} href={image}/>
                })}
            </div>
        </React.Fragment>
    );
}

export default View;