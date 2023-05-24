import React, { useEffect, useState, useRef } from "react";
import "./Add.css";
import  uploadLogo  from "./images/gallery-upload-line (1).png"
import { db, storage, auth } from "../../firebase/firebaseconfig";
import { getDocs, collection, addDoc, setDoc, serverTimestamp, doc} from "firebase/firestore";
import { ref, uploadBytes, listAll, getDownloadURL, uploadString } from "firebase/storage";

function Add() {

const [user, setUser] = useState();

//useEffect setting the user state based on Firebase login. This prevents errors from trying to use auth.currentUser directly before it has initialized on render.
useEffect(() => {
    auth.onAuthStateChanged((user) => {
    if(user)
        {
            setUser(user);
        }
    })
})

const [newTitle, setNewTitle] = useState("");

//const [newUrl, setNewUrl] = useState("");

const CreatePost = async (id, url) => {
    const docRef = doc(db, "userPosts", user.uid, "posts", id);
    await setDoc(docRef, {Link: url, Title: newTitle, Posted: serverTimestamp()});
}

/*
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
}, [])*/

//State for the user submitted image file
const [userImage, setUserImage] = useState();

//Ref for the input
const inputRef = useRef(null);

//State for the actual URL based on userImage that is used as the src of the image on page
const [userImageDisplayed, setUserImageDisplayed] = useState();

const images = ["image/png", "image/gif", "image/bmp", "image/jpeg"];

//Change function to handle whenever user changes the file input
const change = (e) => {
    const jpeg = e.target.files[0];
    setUserImage(jpeg);
}

const [imageIdState, setImageIdState] = useState();

//Function for uploading submitted image into Firebase storage.
const UploadImage = () => {
    //If it is undefined, return.
    if(userImage === undefined) return;

    //Create a document for the user in which their post data will be saved into
    setDoc(doc(collection(db, "userPosts"), user.uid), {});

    //Create a reference to it and the path, which is users/uid/name + randomized number
    const imageId = userImage.name + Math.floor(Math.random().toString().slice(2, 20));
    setImageIdState(imageId);
    const imageRef = ref(storage, "users" + "/" + user.uid + "/" + imageId);

    /*setNewUrl(() => */

    //Upload them and asynchronously console log succesful (console log for development purposes)
    uploadBytes(imageRef, userImage).then(() => {
        alert("Image posted succesfully");
        RemoveImage();
        getDownloadURL(imageRef).then((promise) => {CreatePost(imageId, promise)});
    })
}

//Boolean state to determine if SelectedImageDiv will be displayed
const [imageUploaded, setImageUploaded] = useState();

//Resets the entire input and image
const RemoveImage = () => {
    setImageUploaded(false);
    setUserImage(undefined);
    inputRef.current.value = null;
}

//Update dom whenever userImage is changed
useEffect(() => {
    //Prevent drag and drop adding files that are not in image format
    if(userImage !== undefined && images.includes(userImage.type))
    {
        setImageUploaded(true);
        setUserImageDisplayed(URL.createObjectURL(userImage));
        console.log(userImage);
    }
    if(userImage === undefined)
    {   
        setImageUploaded(false);
        console.log(userImage);
    }
}, [userImage])

return(
<React.Fragment>
<div id="userInput" className="MainElementBackground">
    <div id="SelectedImageDiv" className={imageUploaded ? "ImageSelected" : "ImageNotSelected"}>{<img id="SelectedImage"  className={[imageUploaded ? "" : "Invisible", "InputArea"].join(" ")} src={userImageDisplayed}></img>}
    <input id="Input" className="InputArea" type="file" accept="image/*" title="" ref={inputRef} onChange={change}></input>
   <section id="UploadStuff" className="InputArea">
    <img id="UploadLogo" className={[imageUploaded ? "Invisible" : "", "InputArea"].join(" ")} src={uploadLogo} href={uploadLogo}></img>
    <p id="UploadText" className={[imageUploaded ? "Invisible" : "", "InputArea", "MainElementText"].join(" ")}>Click or drag and drop file here</p>
    </section>
    </div>
</div>
<div id="UserText">
    <input type="text" className={imageUploaded ? "" : "Invisible"} placeholder="Write something here" onChange={(e) => {setNewTitle(e.target.value)}}></input>
</div>
<div id="UserButtons">
    <button id="EraseImage" className={[imageUploaded ? "" : "Invisible", "UserButton"].join(" ")} onClick={RemoveImage}>Remove</button>
    <button id="PostImage" className={[imageUploaded ? "" : "Invisible", "UserButton"].join(" ")} onClick={UploadImage}>Post</button>
</div>
</React.Fragment>
);
}

export default Add;