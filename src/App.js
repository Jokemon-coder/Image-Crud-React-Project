import React, { useState, useEffect } from 'react';
import './App.css';
import LoginRegister from './pages/login/login-register';
import Home from './pages/home/home';
import Navbar from './components/Navbar/Navbar';
import {Route, Routes} from 'react-router-dom';

function App() {

  function load() {
    check();
    startCheckingUser();
  }

  //State for the login status, that is set in  localStorage
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
  
  var logoutTimer = 0;

  function startCheckingUser () {
    logoutTimer = setInterval(AutoLogout, 20000)
    startWarningTimer();
  }

  function stopCheckingUser () {
    clearInterval(logoutTimer);
    logoutTimer = setInterval(AutoLogout, 20000);
    console.log("Hi");
    
  }

  function AutoLogout() {
    setLogged(false);
  }

  var warningTimer = 0;

  function startWarningTimer () {
    warningTimer = setTimeout(warningPopup, 10000)
  }

  function restartWarningTimer () {
    clearTimeout(warningTimer);
  }

  function warningPopup () {
    if(window.alert("You will be logged out automatically in 2 minutes unless you press ok."))
    {
      restartWarningTimer();
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
    <div className="App" onLoad={load()} onMouseMove={stopCheckingUser} onClick={stopCheckingUser} onKeyDown={stopCheckingUser} onScroll={stopCheckingUser}>
      <Navbar logged={checkLogged} logout={LogInOut}/>
      <Routes>
      <Route exact path="/" element={<Home logged={checkLogged} setChanged={setLoggedState} click={LogInOut}/>}/>
      <Route exact path="/login" element={<LoginRegister logged={checkLogged} setChanged={setLoggedState} click={LogInOut}/>}/>
      </Routes>
    </div>
  );
}

export default App;
