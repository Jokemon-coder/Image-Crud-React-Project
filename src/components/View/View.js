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

                //Reference to where the individual user posts are using the current uid
                const userPostsCollection = collection(db, "userPosts" + "/" + user.uid + "/" + "posts/");

                const getUserPosts = async () => {
                        /*const data = await getDocs(userPostsCollection);
                        const filteredData = data.docs.map((doc) => ({
                        ...doc.data(),
                    }));*/
                    //Prevent getDocs from firing off again every rerender resulting in image duplication
                    if(imageList.length === 0)
                    {
                    
                    //Create an empty array
                    const sortedImageList = [];

                    getDocs(userPostsCollection).then((response) => {
                        response.docs.forEach((item) => {
                            //Create url as item data for each item. Push that into the newly created array
                            const url = item.data();
                            sortedImageList.push(url);
                            })
                            //Set imageList as the array sorted descending from newest to oldest post based on the Posted value
                            setImageList(sortedImageList.sort((a, b) => {
                                var timeCount = b.Posted.seconds - a.Posted.seconds;
                                if(timeCount) return timeCount;
                            }))
                    })}
                    }
                    
                    getUserPosts();

            }
        })
    }, [])

    return (
        <React.Fragment>
            <div id="UserImageGrid" className="MainElementBackground">
            {imageList.map((image, index) => {
                return (
                    //<img key={index} className={[isHovering ? "MainElementChildBackgroundFocus" : "MainElementChildBackground", "UserImage"].join(" ")} src={image.Link} href={image.Link} alt={image.Link} onMouseOver={MouseOverAndOut}></img>
                    <UserImage key={index} Link={image.Link}></UserImage>
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

    return (
        <React.Fragment>
        <img key={props.index} className={[isHovering ? "MainElementChildBackgroundFocus" : "MainElementChildBackground", "UserImage"].join(" ")} src={props.Link} href={props.Link} alt={props.Link} onMouseOver={MouseOverAndOut} onMouseOut={MouseOverAndOut}></img>
        </React.Fragment>
    )
}

export default View;