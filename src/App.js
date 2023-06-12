import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import LoginRegister from './pages/login/login-register';
import Home from './pages/home/home';
import AddPost from './pages/addpost/add-post';
import ViewPosts from './pages/viewpost/view-post';
import Navbar from './components/Navbar/Navbar';
import Popup from './components/Popup/Popup'
import Footer from './components/Footer/Footer';
import Post from './pages/post/post';
import {Route, Routes, useNavigate, Navigate} from 'react-router-dom';
import { auth, db, storage } from './firebase/firebaseconfig';
import { listAll, ref } from 'firebase/storage';
import { collection, getDocs} from 'firebase/firestore';
function App() {
  
  //State for the login status, was used for localStorage before Firebase. Now is used to keep track of if user is logged for other operations.
  const[checkLogged, setLogged] = useState();

  const setLoggedState = (bool) => {
    setLogged(bool);
  }

  //Navigation to the pages based on url and if user is logged in
  const url = window.location.href;
  const nav = useNavigate();
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
    if(user){
    if(url === "http://localhost:3000/#/login")
    {
      nav("/");
      setLoggedState(true);
    }

    //const userStorage = ref(storage, "users/");

    function MakeRoutes() {
      listAll(ref(storage, "users/")).then((promise) => {
        promise.prefixes.forEach((thing) => {
          return thing.name;
        })
      })
    }

    /*const userCollection = collection(db, "userPosts/");

    const array = [];

    const stuff = [];

    getDocs(userCollection).then((response) => {
      response.docs.forEach((item) => {
       array.push(item.id);
       array.forEach((thing) => {
        getDocs(collection(db, "userPosts/" + thing + "/posts/")).then((response2) => {
          response2.docs.forEach((item2) => {
            stuff.push(item2);
            stuff.map((lol) => {
              const item = lol.id;
              console.log(item.Posted);
            })
          })
        })
       })
      })
    })*/



    }
    else
    if(url !== "http://localhost:3000/#/login")
    {
      nav("/login");
      setLoggedState(false);
    }}
    )
  }/*, [<Route/>]*/)
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
    if(window.location.href !== "http://localhost:3000/#/login"){
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

  const start = new Date().getTime();
  const [countdownNumber, decreaseNumber] = useState();

  //Update the logout timer, it's a timeout instead of an interval because the previous design was a timeout and attempting to convert to an interval broke the entire system.
  //countdownNumber is set with a math equation in milliseconds based on the current time and time attributed to start. This actually makes it so that interval remains at the rate it's supposed to
  //The way the interval is now setup allows for the interval to actually run every 100 milliseconds, even if the tab it is in is inactive
  const updateLogout = () => {
    clearInterval(logoutTimer.current);
    logoutTime = setInterval(() => {
      /*decreaseNumber((countdownNumber*1000 - (new Date().getTime() - start)) / 1000)
      if(Math.floor(countdownNumber) <= 0)
      {
        AutoLogout(); 
      }*/
    }, 100);
  }
  //useEffect setting the timer to true on initial render and calling updateLogout. Its dependency is the logoutTimer and its state
  useEffect(() => {
    if(auth.currentUser !== null && hasBeenWarned === true && userDetected === false)
    {
      updateLogout();
      logoutTimer.current = logoutTime;
    }

    return () => {
      clearInterval(logoutTimer.current);
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
    if(auth.currentUser !== null && hasBeenWarned === false && userDetected === false)
    {
      updateWarning();
      warningTimer.current = warningTime;
    }

    return () => {
      clearTimeout(warningTimer.current);
    }
  }, [warningPopup, userDetected])

  //Logout function used for the automatic logout, could also be remomed since it's not used anywhere else and it's just setLogged
  const AutoLogout = () => {
    //setLogged(false);
    auth.signOut();
    clearPopup();
    clearInterval(userDetectionTimer);
    clearInterval(logoutTimer.current);
    clearTimeout(warningTimer.current);
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
  /*function LogInOut() {
    if(auth.currentUser !== null)
    {
      //setLogged(false);
      auth.signOut();
      clearInterval(userDetectionTimer);
      clearTimeout(logoutTimer.current);
      clearTimeout(warningTimer.current);
    }
    /*else 
    {
      setLogged(true);
    }
  }*/

  return (
    <div tabIndex={0} className="App">
      <Popup id="WarningPopup" /*logged={checkLogged}*/ authenticate={auth} warning={hasBeenWarned} startClick={clearPopup} number={Math.floor(countdownNumber)}/>
      <Navbar authenticate={auth} logged={checkLogged} setLogged={setLoggedState} />
      <Routes>
      <Route exact path="/" element={<Home authenticate={auth} /*logged={checkLogged} setChanged={setLoggedState}*/ />}/>
      <Route exact path="/login" element={<LoginRegister authenticate={auth}  /*logged={checkLogged} setChanged={setLoggedState} click={LogInOut}*//>}/>
      <Route exact path="/add" element={<AddPost />}/>
      <Route exact path="/:userId/posts" element={<ViewPosts key={window.location.pathname}/>}/>
      <Route exact path="/:userId/post/:postId" element={<Post/>}/>
      <Route exact path="*" element={<Navigate to="/"/>}/>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
