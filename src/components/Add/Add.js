import React, { useEffect, useState } from "react";
import "./Add.css";
import  uploadLogo  from "./images/gallery-upload-line.png"
import { db, storage } from "../../firebase/firebaseconfig";
import { getDocs, collection } from "firebase/firestore";

function Add(props) {

const upload = document.getElementById("input");

const uploadImage = () => {

}

//State for the user submitted image file
const [userImage, setUserImage] = useState();

//State for the actual URL based on userImage that is used as the src of the image on page
const [userImageDisplayed, setUserImageDisplayed] = useState();

//Change function to handle whenever user changes the file input
const change = (e) => {
    const jpeg = e.target.files[0];
    setUserImage(jpeg);
}

//Boolean state to determine if SelectedImageDiv will be displayed
const [imageUploaded, setImageUploaded] = useState();

//Update dom whenever userImage is changed
useEffect(() => {
    if(userImage !== undefined)
    {
        setImageUploaded(true);
        setUserImageDisplayed(URL.createObjectURL(userImage));
        console.log(userImage);
    }
    if(userImage === undefined)
    {        
        setImageUploaded(false);
    }
}, [userImage])


/*const [userPosts, setUserPosts] = useState([]);

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
return(
<React.Fragment>
<div id="userInput">
    <div id="SelectedImageDiv" className={imageUploaded ? "ImageSelected" : "ImageNotSelected"}>{<img id="SelectedImage"  className={[imageUploaded ? "" : "Invisible", "InputArea"].join(" ")} src={userImageDisplayed}></img>}
    <input id="Input" className="InputArea" type="file" accept="image/*" title="" onChange={change}></input>
    <img id="UploadLogo" className={[imageUploaded ? "Invisible" : "", "InputArea"].join(" ")} src={uploadLogo} href={uploadLogo}></img>
    </div>
</div>
</React.Fragment>
);
}

export default Add;