import React, {useState, useEffect} from 'react';
import './home.css';

function Home(props) {
  
  const [checkLogged, setLogged] = useState(props.logged);

  function clicked() {
      document.getElementById("text").textContent = "Yay";
      props.click();
    }

  useEffect(() => {
    const data = window.sessionStorage.getItem('Login_Status');
    console.log('data', data);
    if(data !== null) setLogged(JSON.parse(data));
  }, []);

  useEffect(() => {
    window.sessionStorage.setItem('Login_Status', JSON.stringify(checkLogged));
  }, [checkLogged]);

  if(checkLogged === true)
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
