import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import LoginRegister from './pages/login/login-register';
import Home from './pages/home/home';
import Navbar from './components/Navbar/Navbar';
import Popup from './components/Popup/Popup'
import {Route, Routes} from 'react-router-dom';
function App() {

  function load() {
    check();
    if(window.location.href !== "http://localhost:3000/login")
    {
      //startCheckingUser();
      //startWarningTimer();
    }
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
  //Userdetected that is set based on an interval of 1 second. It's based on if the detectUserActivity has been called, which sets the userDetected to true. Otherwise it will remain false
  //userDetected being false makes the other timers go off and if userDetected state is changed to true, they will not run until it changes again to false.
  const [userDetected, setDetected] = useState(false);
  var userDetectionTimer;

  const setDetection = () => {
      userDetectionTimer = setInterval(() => {
        clearInterval(userDetectionTimer);
        console.log(userDetected);
        setDetected(false);
      }, 1000);
  }

  useEffect(() => {
    if(window.location.href !== "http://localhost:3000/login"){
      setDetection();
      window.addEventListener("mousemove", detectUserActivity);
  
      return () => {
        clearInterval(userDetectionTimer);
        window.removeEventListener("mousemove", detectUserActivity);
      }
    }
  }, [detectUserActivity])
  
  //State for the useEffect to keep track of
  //const [logoutTimer, setTimer] = useState();
  const logoutTimer = useRef();
  var logoutTime;

  //Update function for the timer, is called when logoutTime is cleared and logoutTimer state is changed
  const updateLogout = () => {
    clearTimeout(logoutTimer.current);
    logoutTime = setTimeout(() => {
      AutoLogout();
    }, 10_000);
  }
  //useEffect setting the timer to true on initial render and calling updateLogout. Its dependency is the logoutTimer and its state
  useEffect(() => {
    if(window.location.href !== "http://localhost:3000/login" && userDetected === false)
    {
      //setTimer(true);
      updateLogout();
      logoutTimer.current = logoutTime;
      window.addEventListener("mousemove", detectUserActivity);
    }

    return () => {
      clearTimeout(logoutTimer);
      window.removeEventListener("mousemove", detectUserActivity);
    }
  }, [clearPopup, userDetected/*, timesDetected*/])

  //const [warningTimer, setWarnTimer] = useState();
  const warningTimer = useRef();
  var warningTime;

  const updateWarning = () => {
    clearTimeout(warningTimer.current);
    warningTime = setTimeout(() => {
      warningPopup();
    }, 5_000);
  }

  useEffect(() => {
    //Don't call updateWarning if the page is login or the popup is already displayed
    if(((window.location.href !== "http://localhost:3000/login") || (document.getElementById("WarningPopup").style.display !== "none" && hasBeenWarned === false)) && (userDetected === false))
    {
      //setWarnTimer(true);
      updateWarning();
      warningTimer.current = warningTime;
      window.addEventListener("mousemove", detectUserActivity);
    }

    return () => {
      clearTimeout(warningTimer);
      window.removeEventListener("mousemove", detectUserActivity);
    }
  }, [warningPopup, userDetected/*, timesDetected*/])

  //Just set the login_status to false, forcing a relocation to login page
  function AutoLogout() {
    setLogged(false);
  }

  const [hasBeenWarned, setWarning] = useState(false);

  //Clear the timeout and set hasBeenWarned. Popup visibility is dependant on that state.
  function warningPopup () {
        setWarning(true);
    }

  //Clear the popup, set hasBeenWarned back to false and change the states of the timers, which results in useEffect being executed again
  function clearPopup() {
      setWarning(false);
  }

  function detectUserActivity() {
    /*if(checkLogged === true)
    {
      if(timesDetected >= 100)
      {
        increaseTime(0);
      }else
      {
        increaseTime(timesDetected+1);
      }
      console.log(timesDetected);
    }*/
    if(hasBeenWarned === false)
    {
      setDetected(true);
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
    <div tabIndex={0} className="App" onLoad={load()} onClick={detectUserActivity} onKeyDown={detectUserActivity} onScroll={detectUserActivity}>
      <Popup id="WarningPopup" warning={hasBeenWarned} startClick={clearPopup}/>
      <Navbar logged={checkLogged} logout={LogInOut}/>
      <Routes>
      <Route exact path="/" element={<Home logged={checkLogged} setChanged={setLoggedState} click={LogInOut}/>}/>
      <Route exact path="/login" element={<LoginRegister logged={checkLogged} setChanged={setLoggedState} click={LogInOut}/>}/>
      </Routes>
    </div>
  );
}

export default App;
