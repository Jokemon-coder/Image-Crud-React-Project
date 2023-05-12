import React, { useEffect, useState } from 'react';
import './home.css';
import Add from '../../components/Add/Add';

function Home(props) {
  //If the user login status is true, render the page. This is to fix the page rendering and showing for a second when loading and reloading to the login page

  //State for if user is null (not logged in) or not so that user is not set to null immediately onload due to Firebase fetching the information
  const [userNullOrNot, setUser] = useState();

  //On every render, if user is logged in, set the user to the user so it is not null.
  useEffect(() => {
    props.authenticate.onAuthStateChanged((user) => {
      if(user)
      {
        setUser(user);
      }
    })
  })
  //if user is not null (not logged in), display the page
    if(userNullOrNot !== null)
    {
    return (
      <>
      <div id="Home">
          <section id='WelcomeToMain'>
            <div id='WelcomeTextDiv'>
            <p id='text'>You have succesfully logged in! This is the main page, or at least it will be.</p>
            </div>
            <Add/>
          </section>
      </div>
      </>
    );
    }
}

export default Home;
