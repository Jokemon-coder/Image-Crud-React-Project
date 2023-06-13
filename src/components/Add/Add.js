import React, { useEffect, useState, useRef } from "react";
import "./Add.css";
import  uploadLogo  from "./images/gallery-upload-line (1).png"
import { db, storage, auth } from "../../firebase/firebaseconfig";
import { collection, setDoc, serverTimestamp, doc, FieldValue} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

function Add(props) {

const [newTitle, setNewTitle] = useState("");
const [newDesc, setNewDesc] = useState("");

//const [newUrl, setNewUrl] = useState("");

const CreatePost = async (id, url) => {
    const docRef = doc(db, "userPosts", props.user.uid, "posts", id);
    await setDoc(docRef, {PostId: id.split("").sort(() => {return 0.5-Math.random()}).join(""), Link: url, Title: newTitle, Description: newDesc, Posted: serverTimestamp()});
}

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

//Function for uploading submitted image into Firebase storage.
const UploadImage = () => {
    //If it is undefined, return.
    if(userImage === undefined) return;

    //Create a document for the user in which their post data will be saved into
    setDoc(doc(collection(db, "userPosts"), props.user.uid), {});

    //Create a reference to it and the path, which is users/uid/name + randomized number
    const imageId = userImage.name + Math.floor(Math.random().toString().slice(2, 20));
    const imageRef = ref(storage, "users" + "/" + props.user.uid + "/" + imageId);
    console.log(imageRef);

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
        //Clear the title and description states when no image is selected. Also now set the input values as the variables themselves, which actually clears the field. Before it remained after upload.
        setNewTitle("");
        setNewDesc("");
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
    <input type="text" className={[imageUploaded ? "" : "Invisible", "UserTextContent"].join(" ")} placeholder="Title" onChange={(e) => {setNewTitle(e.target.value)}} value={newTitle}></input>
    <textarea className={[imageUploaded ? "" : "Invisible", "UserTextContent", "Resizeable"].join(" ")} placeholder="Description" onChange={(e) => {setNewDesc(e.target.value)}} value={newDesc}></textarea>
</div>
<div id="UserButtons">
    <button id="EraseImage" className={[imageUploaded ? "" : "Invisible", "UserButton"].join(" ")} onClick={RemoveImage}>Remove</button>
    <button id="PostImage" className={[imageUploaded ? "" : "Invisible", "UserButton"].join(" ")} onClick={UploadImage}>Post</button>
</div>
</React.Fragment>
);
}

export default Add;