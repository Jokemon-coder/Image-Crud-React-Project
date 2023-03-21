import React from 'react';
import { useState, useEffect } from 'react';
import './login.css';
import ShowImg from './images/eye.png';
import HideImg from './images/eye-crossed.png';
import Accounts from '../../components/Accounts.json';

function LoginRegister() {

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

  //Try to find entered data by username and password from Accounts. If succesful, go to main page, otherwise don't.
  const checkUser = () => {
    const usercheck = Accounts.find(user => (user.username === data.username && user.password === data.password));
    if(usercheck) {
      console.log("Login successful");
      window.location.href = "http://localhost:3000/";
    }else {
      console.log("Wrong password or username");
    }
  }

  //Handle hovering
  const mouseOverAndOut = () => {
    if(isHovering === false)
    {
      setHovering(true);
      document.getElementById("LoginButton").style.border = "solid 3px";
    }else
    {
      setHovering(false);
      document.getElementById("LoginButton").style.border = "";
    };
  };

  //Handle click on password eye icon and change accordingly.
  const showHidePassword = () => {
    if(display[0] === "password")
    {
      setDisplay(["text", HideImg]);
      //setImgSrc(HideImg); 
      
    }else
    {
      setDisplay(["password", ShowImg]);
      //setImgSrc(ShowImg);
    };
  };

  //Works without useEffect, but leaving it here just in case
  /*useEffect(() => {
    document.getElementById("PasswordNot").style.src = imgSrc;
  }, [imgSrc]);*/

  return (
    <>
        <section id='LoginForm' className='Form'>
        <div id='Login'>
        <h1>Login</h1>
        <div className='PasswordAndButton'>
        <input id="User" className="UserPass" type="text" placeholder="Username" onChange={handleInput}></input>
        <input id="Pass" className="UserPass" type={display[0]} placeholder="Password" onChange={handleInput}></input>
        <img id='PasswordNot' className='PasswordEye' src={display[1]} alt="Show password" onClick={() => showHidePassword()}></img>
        </div>
        <button className='LoginRegButton' id='LoginButton' onClick={checkUser} onMouseOver={mouseOverAndOut} onMouseOut={mouseOverAndOut}>Login</button>
        </div>
        <div></div>
        </section>
        <section id='RegisterForm' className='Form'>
        
        </section>
    </>
  );
}

export default LoginRegister;
