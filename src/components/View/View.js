import React from "react";
import { useState, useEffect } from "react";
import "./View.css";
import { storage, auth, db } from "../../firebase/firebaseconfig";
import { listAll, ref, getDownloadURL} from "firebase/storage";
import { doc, getDocs, collection, where} from "firebase/firestore";
import { useNavigate, useLocation } from "react-router-dom";

function View() {

    //State for the images displayed
    const [imageList, setImageList] = useState([]);

    //State for userCollection or just user uid. Needs name change.
    const [userCollection, setUserCollection] = useState();

    //Keep track of location
    let location = useLocation();

    //useEffect setting the user state based on Firebase login. This prevents errors from trying to use auth.currentUser directly before it has initialized on render.
    useEffect(() => {
            //Empty image list on every render, allows for instant rerender on changing url to different user posts and back to your own posts
            setImageList([]);

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
                

            //Reference to where the individual user posts are using the current uid
            const userPostsCollection = collection(db, "userPosts" + "/" + window.location.href.split("/")[4] + "/" + "posts/");
            //const userPostsCollection2 = collection(db, "userPosts");

            //Get user.uid, which is no longer based on current user but the actual user to which the files and url path is assigned to.
            setUserCollection(userPostsCollection.path.split("/")[1]);

            const getUserPosts = async () => {                  
                //Create an empty array
                const sortedImageList = [];

                getDocs(userPostsCollection).then((response) => {
                   response.docs.forEach((item) => {
                        //Create url as item data for each item. Push that into the newly created array
                        const url = item.data();
                        sortedImageList.push(url);
                        console.log(sortedImageList);
                        })
                        //Set imageList as the array sorted descending from newest to oldest post based on the Posted value
                        setImageList(sortedImageList.sort((a, b) => {
                            var timeCount = b.Posted.seconds - a.Posted.seconds;
                            if(timeCount) return timeCount;
                        }))
                })}
                //This if statement was previously inside getUserPosts, now is used when calling it. This allows for instant rerender on url (user images path) change
                if(imageList !== 0)
                {
                    getUserPosts();
                }
    }, [location])

    return (
        <React.Fragment>
            <div id="UserImageGrid" className="MainElementBackground">
            {
            imageList.map((image, index) => {
                return (
                    <UserImage key={index} Link={image.Link} postId={image.PostId} userColl={userCollection}></UserImage>
                )
                })}
            </div>
        </React.Fragment>
    );
}

//Separate UserImage prop for the user images themselves. Helps with giving each their own functionality so that hovering doesn't affect them all at once
function UserImage(props) {

    //Bool state for hovering
    const [isHovering, setIsHovering] = useState(false);

    //Set hovering, used for both mouseover and mouseout
    const MouseOverAndOut = () => {
        setIsHovering(!isHovering);
    }

    const nav = useNavigate();

    const imageClick = (e) => {
        //Navigate to specific post with the addition of the user id being a part of the path
        nav("/" + props.userColl + "/post/" + e.target.getAttribute("post"));    
        
        console.log("/" + props.userColl + "/post/" + e.target.getAttribute("post")); 
        console.log(props.userColl);    
    }

    return (
        <React.Fragment>
        <img key={props.index} post={props.postId} className={[isHovering ? "MainElementChildBackgroundFocus" : "MainElementChildBackground", "UserImage"].join(" ")} src={props.Link} href={props.Link} alt={props.Link} onMouseOver={MouseOverAndOut} onMouseOut={MouseOverAndOut} onClick={imageClick}></img>
        </React.Fragment>
    )
}

export default View;