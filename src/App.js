import React, { useState, useEffect } from 'react';
import './App.css';
import LoginRegister from './pages/login/login-register';
import Home from './pages/home/home';
import {Route, Routes} from 'react-router-dom';

function App() {

  //Login_Status jostakin syystä toimii tuolla. Päivittyy ja pysyy refreshing jälkeen. 
  const[checkLogged, setLogged] = useState(JSON.parse(localStorage.getItem('Login_Status')) ?? false);

  const setLoggedState = (bool) => {
    setLogged(bool);
    check();
  }

  //Local storageen Login_Status ja sen arvo true/false useEffectin kanssa. Toinen hakee arvon ja toinen asettaa sen.
  useEffect(() => { 
    const data = window.localStorage.getItem('Login_Status');
    console.log('data', data);
    if(data !== null) setLogged(JSON.parse(data));
  }, []);

  useEffect(() => {
    window.localStorage.setItem('Login_Status', JSON.stringify(checkLogged));
  }, [checkLogged]);

  /*
  PITÄISI SAADA TOIMINAAN NIIN, ETTÄ LOGIN_STATUS ASETTUU TRUE/FALSE RIIPPUEN SIITÄ ONKO KÄYTTÄJÄ KIRJAUTUNUT LOGIN-SIVULLA. 
  PITÄÄ SAADA MYÖS NIIN, ETTÄ JOS LOGIN_STATUS ON FALSE, NIIN HEITÄ SUORAAN LOGIN-SIVULLE KOTISIVULTA.

  Haloo
  
  
  
  */
  
  function check() { //Check if user is logged and they're on a page, redirect
    console.log(checkLogged);
    if(checkLogged === true && window.location.href === "http://localhost:3000/login")
    {
      window.location.href = "http://localhost:3000/";
    }
    if(checkLogged === false && window.location.href === "http://localhost:3000/")
    {
      window.location.href = "http://localhost:3000/login";
    }
  }

  function LogInOut() {
    if(checkLogged === false)
    {
      setLogged(true);
    }
    else
    {
      setLogged(false);
    }
  }

  return (
    <div className="App" onLoad={check()}>
      <Routes>
      <Route exact path="/" element={<Home logged={checkLogged} setChanged={setLoggedState} click={LogInOut}/>}/>
      <Route exact path="/login" element={<LoginRegister logged={checkLogged} setChanged={setLoggedState} click={LogInOut}/>}/>
      </Routes>
    </div>
  );
}

export default App;
