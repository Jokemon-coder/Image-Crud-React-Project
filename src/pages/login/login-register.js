import React from 'react';
import { useState } from 'react';
import './login.css';
import ShowImg from './images/eyeLight.png';
import HideImg from './images/eye-crossedLight.png';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from '@firebase/auth';


function LoginRegister(props) {

  //States for password display and hovering bool
  const [display, setDisplay] = useState(["password", ShowImg]);
  const [isHovering, setHovering] = useState(false);

  //Initial state for the username and password
  const [data, setData] = useState(
    {
    username: "",
    password: ""
    });

  //HandleInput function that sets the data content to whatever is being written to the input. If target id is "User", it's username and otherwise it's password being set.
  const handleInput = (e) => {
    if(e.target.id === "User" ? setData({...data, username: e.target.value}) : setData({...data, password: e.target.value}));
  }

  //Try to sign in with email and password in Firebase, catch any errors and if it is succesful, navigate to the homepage
  const [user, setUser] = useState();

  const nav = useNavigate();

  const checkUser = async () => {
    try{await signInWithEmailAndPassword(props.authenticate, data.username, data.password);}
    catch(error)
    {
      console.log(error);
    }
    props.authenticate.onAuthStateChanged(user => {
      if(user) {
      console.log(user, "Login successful");
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
        <section id='LoginForm' className='Form'>
        <div id='Login' className='MainElementBackground'>
        <h1 className='MainElementText'>Login</h1>
        <div className='PasswordAndButton'>
        <input id="User" className="UserPass MainElementTextBackground" type="text" placeholder="Username" onChange={handleInput}></input>
        <input id="Pass" className="UserPass MainElementTextBackground" type={display[0]} placeholder="Password" onChange={handleInput} ></input>
        <img id='PasswordNot' className='PasswordEye' src={display[1]} alt="Show password" onClick={() => showHidePassword()}></img>
        </div>
        <button className={[isHovering ? "MainElementChildBorderFocus" : "MainElementChildBorder" ,"LoginRegButton MainElementChildBackground MainElementText"].join(" ")} id='LoginButton' onClick={checkUser} onMouseOver={mouseOverAndOut} onMouseOut={mouseOverAndOut}>Login</button>
        </div>
        <div></div>
        </section>
        <section id='RegisterForm' className='Form'>
        
        </section>
    </>
  );
  }
}

export default LoginRegister;
