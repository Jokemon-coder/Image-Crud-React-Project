import React, {useEffect, useState} from "react";
import { auth, db } from "../../firebase/firebaseconfig";
import { getDocs, collection } from "firebase/firestore";
import "./view-single.css"

function ViewSingle() {

    //State to save the post and its data into
    const [post, setPost] = useState();

    useEffect(() => {
        //Get the id of the post that is used in the url
        const postId = window.location.href.split("/")[6];

        //Get user id from the url path tied to that user
        const userId = window.location.href.split("/")[4];

        //CollectionReference to retrieve the data from the Firestore collection
        const postReference = collection(db, "userPosts/" + userId + "/posts/");

        getDocs(postReference).then((response) => {
            const post = [];
            response.docs.forEach((doc) => {
                //Get specifically the document that contains the specified postId and push it into the post-array.
                /*There probably exists a more efficient way of doing this with retrieving a single document in a collection,
                but I attempted it before and did not get it working. So I just used the same method as retrieving all of the document and
                made it so that it only actually uses the specific one with the right id.
                */
                if(doc.data().PostId === postId)
                {
                    post.push(doc.data());
                }
            })
            //Set the post state to be the post-array
            setPost(post);
            console.log(post[0].Posted.toDate());
            })
    }, [])

    //Renders only when post has had the time to get set, otherwise would throw an error onload
    if(post !== undefined)
    {
    //Set up variables used in the display
    const title = post[0].Title;
    const desc = post[0].Description;
    const date = post[0].Posted.toDate();

    //Convert the date into a day/month/year format
    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 1).toString();
    const day = date.getDate().toString();

    const fullDate = day + "." + month + "." + year;

    return (
        <div id="ViewSinglePost" className={["MainElementBackground", "MainElementText"].join(" ")}>
        <img  id="SinglePostImage" className="MainElementChildBackground" src={post[0].Link} href={post[0].Link} title={post[0].Title}></img>
        <section id="SinglePostDetails">
        <p>{title}</p>
        <p>{fullDate}</p>
        <p>{desc}</p>
        </section>
        </div>
    );
    }
}

export default ViewSingle;