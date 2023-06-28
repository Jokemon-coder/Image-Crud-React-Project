import React from 'react';
import { useState } from 'react';
import './login.css';
import ShowImg from './images/eyeLight.png';
import HideImg from './images/eye-crossedLight.png';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from '@firebase/auth';
import { db } from '../../firebase/firebaseconfig';
import { doc, setDoc, collection, getDocs, where, query, getDoc} from 'firebase/firestore';


function Login(props) {

  //States for password display and hovering bool
  const [display, setDisplay] = useState(["password", ShowImg]);
  const [isHovering, setHovering] = useState(false);

  const [isLogginIn, setLoggingIn] = useState(true);

  //Initial state for the username and password
  const [loginData, setLoginData] = useState(
    {
    username: "",
    password: ""
    });

  //State for the registering user data
  const [regData, setRegData] = useState(
    {
    username: "",
    email: "",
    password: ""
    });

  //HandleInput function that sets the data content to whatever is being written to the input. If target id is "User", it's username and otherwise it's password being set.
  const handleInput = (e) => {
    //Switch case to handle the multiple different parts where value can be set
    switch(e.target.id) 
    {
      case "loginUser":
        setLoginData({...loginData, username: e.target.value})
        break;
      case "loginPass":
        setLoginData({...loginData, password: e.target.value})
        break;
        case "regUser":
        setRegData({...regData, username: e.target.value})
        break;
      case "regPass":
        setRegData({...regData, password: e.target.value})
        break;
      case "Email":
        setRegData({...regData, email: e.target.value})
        break;
    }
    //if(e.target.id === "User" ? setLoginData({...loginData, username: e.target.value}) : setLoginData({...loginData, password: e.target.value}));
    //console.log(loginData);
  }

  //Try to sign in with email and password in Firebase, catch any errors and if it is succesful, navigate to the homepage
  const [user, setUser] = useState();

  const nav = useNavigate();

  const checkUser = async () => {

    //CollectionReference for getting userInfo
    const docCollection = collection(db, "userInfo/");

    //Query where userInfo username matches what user inputs into login
    const q = query(docCollection, where("username", "==", loginData.username));

    //userEmail defined as an asynchronous getDocs. The data is then returned as the value used with Firebase authentification login function.
    const userEmail = await getDocs(q).then((res) => {
      var email;
      res.forEach((doc) => {
        email = doc.data().email;
      })
      return email;
    });

    try{await signInWithEmailAndPassword(props.authenticate, userEmail, loginData.password);}
    catch(error)
    {
      console.log(error);
    }
    //const docCollection = collection(db, "userInfo/");

    /*try {
      const q = query(docCollection, where("username", "==", "Joel123"));

      getDocs(q).then((res) => {
        res.forEach((doc) => {
          console.log(doc.data().email);
        })
      });
    }
    catch(error)
    {
      console.log(error);
    }*/



    /*getDocs(docCollection).then((response) => {
      response.docs.forEach((doc) => {
        //console.log(doc.data());
      })
    })*/
    props.authenticate.onAuthStateChanged(user => {
      if(user) {
      console.log(user, "Login successful");
      setUser(user);
      nav("/");
      }
    })
  }

  //Creates a document in the userInfo collection for the specific user on creation where their details are held
  const makeUserInfo = async (id) => {
    const docRef = doc(db, "userInfo", id)
    setDoc(docRef, {username: regData.username, password: regData.password, email: regData.email})
  }

  const createUser = async () => {
    try{await createUserWithEmailAndPassword(props.authenticate, regData.email, regData.password)}
    catch(error)
    {
      console.log(error);
    }
    props.authenticate.onAuthStateChanged(user => {
      if(user) {
      try{makeUserInfo(user.uid)}
      catch(error){
        console.log(error);
      }
      console.log(user, "Register successful");
      setUser(user);

      nav("/");
      }
    })
  }

  //Handle hovering
  const mouseOverAndOut = () => {
    setHovering(!isHovering);
  };

  //Handle click on password eye icon and change accordingly.
  const showHidePassword = () => {
    if(display[0] === "password")
    {
      setDisplay(["text", HideImg]);
      
    }else
    {
      setDisplay(["password", ShowImg]);
    };
  };

  if(user === undefined) //If statement put in place so that when an onload event happens from app, it wont show the content of the page if user is logged in and the page is redirected
  {

  return (
    <>
        <section id='LoginForm' className={[isLogginIn ? "Visible" : "Hide", 'Form'].join(" ")}>
        <div id='Login' className={["LogAndReg", 'MainElementBackground'].join(" ")}>
        <h1 className='MainElementText'>Login</h1>
        <div className='PasswordAndButton'>
        <input id="loginUser" className="UserPass MainElementTextBackground" type="text" placeholder="Username" onChange={handleInput}></input>
        <input id="loginPass" className="UserPass MainElementTextBackground" type={display[0]} placeholder="Password" onChange={handleInput} ></input>
        <img id='PasswordNot' className='PasswordEye' src={display[1]} alt="Show password" onClick={() => showHidePassword()}></img>
        </div>
        <button className={[isHovering ? "MainElementChildBorderFocus" : "MainElementChildBorder" ,"LoginRegButton MainElementChildBackground MainElementText"].join(" ")} onClick={checkUser} onMouseOver={mouseOverAndOut} onMouseOut={mouseOverAndOut}>Login</button>
        <p>Don't have an account?</p>
        <p onClick={() => setLoggingIn(!isLogginIn)}>Sign in!</p>
        </div>
        </section>
        
        <section id='RegisterForm' className={[isLogginIn ? "Hide" : "Visible", 'Form'].join(" ")}>
        <div id='Reg' className={["LogAndReg", 'MainElementBackground'].join(" ")}>
        <h1 className='MainElementText'>Register</h1>
        <div className='PasswordAndButton'>
        <input id="regUser" className="UserPass MainElementTextBackground" type="text" placeholder="Username" onChange={handleInput}></input>
        <input id="Email" className="UserPass MainElementTextBackground" type="text" placeholder="Email" onChange={handleInput}></input>
        <input id="regPass" className="UserPass MainElementTextBackground" type={display[0]} placeholder="Password" onChange={handleInput} ></input>
        <img id='PasswordNot' className='PasswordEye' src={display[1]} alt="Show password" onClick={() => showHidePassword()}></img>
        </div>
        <button className={[isHovering ? "MainElementChildBorderFocus" : "MainElementChildBorder" ,"LoginRegButton MainElementChildBackground MainElementText"].join(" ")} onClick={createUser} onMouseOver={mouseOverAndOut} onMouseOut={mouseOverAndOut}>Create account</button>
        <p>Already have an account?</p>
        <p onClick={() => setLoggingIn(!isLogginIn)}>Log in!</p>
        </div>
        
        </section>
    </>
  );
  }
}

export default Login;
