import React from 'react';
import './home.css';

function Home(props) {
  //If the user login status is true, render the page. This is to fix the page rendering and showing for a second when loading and reloading to the login page
  if(props.logged === true)
  {
  return (
    <div className="Home">
      <main>
        <section id='WelcomeToMain'>
          <div id='WelcomeTextDiv'>
          <p id='text'>You have succesfully logged in! This is the main page, or at least it will be.</p>
          </div>
        </section>
      </main>
    </div>
  );
  }
}

export default Home;
