import React, {useState, useEffect} from 'react';
import './home.css';

function Home(props) {
  
  const [checkLogged, setLogged] = useState(props.logged/*JSON.parse(localStorage.getItem('Login_Status'))*/);

  function clicked() {
      document.getElementById("text").textContent = "Yay";
      props.click();
    }

  function checkity() {
    if(props.logged === false) {
      window.location.href = "http://localhost:3000/login/";
      }
  }

  useEffect(() => {
    const data = window.localStorage.getItem('Login_Status');
    console.log('data', data);
    if(data !== null) setLogged(JSON.parse(data));
  }, []);

  useEffect(() => {
    window.localStorage.setItem('Login_Status', JSON.stringify(checkLogged));
  }, [checkLogged]);

  return (
    <div className="Home" onLoad={checkity()}>
      <main>
      <p id='text' onClick={clicked}>Hello</p>
      </main>
    </div>
  );
}

export default Home;
