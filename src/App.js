import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import LoginRegister from './pages/login/login-register';
import Home from './pages/home/home';
import Navbar from './components/Navbar/Navbar';
import Popup from './components/Popup/Popup'
import Footer from './components/Footer/Footer';
import {Route, Routes, useNavigate} from 'react-router-dom';
function App() {
  
  //State for the login status, that is set in  localStorage
  const[checkLogged, setLogged] = useState(JSON.parse(localStorage.getItem('Login_Status')) ?? false);

  const setLoggedState = (bool) => {
    setLogged(bool);
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


  const nav = useNavigate();
  useEffect(() => {
    if(checkLogged === true && window.location.href === "http://localhost:3000/login")
    {
      //window.location.href = "http://localhost:3000/";
      nav("/");
    }
    if(checkLogged === false && window.location.href !== "http://localhost:3000/login")
    {
      //window.location.href = "http://localhost:3000/login";
      nav("/login");
    }
  })
  //Userdetected that is set based on an interval of 1 second. It's based on if the detectUserActivity has been called, which sets the userDetected to true. Otherwise it will remain false
  //userDetected being false makes the other timers go off and if userDetected state is changed to true, they will not run until it changes again to false.
  const [userDetected, setDetected] = useState(false);
  var userDetectionTimer;

  const setDetection = () => {
    //If statement here so it does not set detection if the user has been warned and the popup is on screen
    if(hasBeenWarned === false)
    {
      userDetectionTimer = setInterval(() => {
        clearInterval(userDetectionTimer);
        setDetected(false);
      }, 1000);
    }
  }

  //useEffect to set detection timer everytime detectUserActivity is called. Also creates the user detection event listeners
  useEffect(() => {
    if(window.location.href !== "http://localhost:3000/login"){
      setDetection();
      window.addEventListener("mousemove", detectUserActivity);
      window.addEventListener("onclick", detectUserActivity);
      window.addEventListener("onscroll", detectUserActivity);
      window.addEventListener("resize", detectUserActivity);
  
      return () => {
        clearInterval(userDetectionTimer);
        window.removeEventListener("mousemove", detectUserActivity);
        window.removeEventListener("onclick", detectUserActivity);
        window.removeEventListener("onscroll", detectUserActivity);
        window.removeEventListener("resize", detectUserActivity);
      }
    }
  }, [detectUserActivity])
  
  //Ref for the useEffect to keep track of and the countdown number for automatic logout
  const logoutTimer = useRef();
  var logoutTime;
  const [countdownNumber, decreaseNumber] = useState();

  //Update the logout timer, it's a timeout instead of an interval because the previous design was a timeout and attempting to convert to an interval broke the entire system.
  //Now it just continuously sets a 1 second timeout on repeat until the countdownNumber is 1 or less. 1 instead of 0 because it would only detect 0 after another render making it go to -1.
  const updateLogout = () => {
    clearTimeout(logoutTimer.current);
    logoutTime = setTimeout(() => {
      decreaseNumber(countdownNumber-1);
      if(countdownNumber <= 0)
      {
        //AutoLogout();
      }
    }, 1000);
  }
  //useEffect setting the timer to true on initial render and calling updateLogout. Its dependency is the logoutTimer and its state
  useEffect(() => {
    if(/*window.location.href !== "http://localhost:3000/login" &&*/ hasBeenWarned === true)
    {
      updateLogout();
      logoutTimer.current = logoutTime;
    }

    return () => {
      clearTimeout(logoutTimer);
    }
  }, [clearPopup, userDetected])

  const warningTimer = useRef();
  var warningTime;
  const updateWarning = () => {
    clearTimeout(warningTimer.current);
    warningTime = setTimeout(() => {
      //warningPopup();
    }, 10_000);
  }

  useEffect(() => {
    //Don't call updateWarning if the page is login or the popup is already displayed
    if(checkLogged === true/*|| document.getElementById("WarningPopup").style.display !== "none"*/ && hasBeenWarned === false && userDetected === false)
    {
      updateWarning();
      warningTimer.current = warningTime;
    }

    return () => {
      clearTimeout(warningTimer);
    }
  }, [warningPopup, userDetected])

  //Logout function used for the automatic logout, could also be remomed since it's not used anywhere else and it's just setLogged
  const AutoLogout = () => {
    setLogged(false);
    clearPopup();
    clearInterval(userDetectionTimer);
    clearTimeout(logoutTimer);
    clearTimeout(warningTimer);
  }

  const [hasBeenWarned, setWarning] = useState(false);

  //Clear the timeout and set hasBeenWarned. Popup visibility is dependant on that state.
  function warningPopup() {
        setWarning(true);
        decreaseNumber(60); //Always reset the countdown then popup opens
    }

  //Clear the popup, set hasBeenWarned back to false and change the states of the timers, which results in useEffect being executed again
  function clearPopup() {
      setWarning(false);
  }

  //Detection of user activity, only possible if the user has not already been warned and the popup is not on screen
  function detectUserActivity() {
    if(hasBeenWarned === false)
    {
      setDetected(true);
    }

  }

  //Login and out function
  function LogInOut() {
    if(checkLogged === true)
    {
      setLogged(false);
      console.log(checkLogged);
      clearInterval(userDetectionTimer);
      clearTimeout(logoutTimer.current);
      clearTimeout(warningTimer.current);
    }
    else 
    {
      setLogged(true);
      console.log(checkLogged);
    }
  }

  return (
    <div tabIndex={0} className="App">
      <Popup id="WarningPopup" logged={checkLogged} warning={hasBeenWarned} startClick={clearPopup} number={countdownNumber}/>
      <Navbar logged={checkLogged} logout={LogInOut}/>
      <Routes>
      <Route exact path="/" element={<Home logged={checkLogged} setChanged={setLoggedState}/>}/>
      <Route exact path="/login" element={<LoginRegister logged={checkLogged} setChanged={setLoggedState} click={LogInOut}/>}/>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
