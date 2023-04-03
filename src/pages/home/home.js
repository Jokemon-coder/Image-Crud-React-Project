import React, {useState, useEffect} from 'react';
import './home.css';

function Home(props) {
  
  const [checkLogged, setLogged] = useState(props.logged);

  function clicked() {
      document.getElementById("text").textContent = "Yay";
      props.click();
    }

  useEffect(() => {
    const data = window.localStorage.getItem('Login_Status');
    console.log('data', data);
    if(data !== null) setLogged(JSON.parse(data));
  }, []);

  useEffect(() => {
    window.localStorage.setItem('Login_Status', JSON.stringify(checkLogged));
  }, [checkLogged]);

  if(checkLogged === true)
  {

  return (
    <div className="Home">
      <main>
      <p id='text' onClick={clicked}>Hello</p>
      </main>
    </div>
  );
  }
}

export default Home;
