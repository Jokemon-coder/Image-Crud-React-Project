import React from 'react';
import { useState } from 'react';
import './login.css';
import ShowImg from './images/eyeLight.png';
import HideImg from './images/eye-crossedLight.png';
import Accounts from '../../components/Accounts.json';

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

  //Try to find entered data by username and password from Accounts. If succesful, go to main page, otherwise don't.
  const checkUser = () => {
    const usercheck = Accounts.find(user => (user.username === data.username && user.password === data.password));
    if(usercheck) {
      console.log("Login successful");
      props.click();
      window.location.href = "http://localhost:3000/";
    }else {
      console.log("Wrong password or username");
    }
  }

  //Handle hovering
  const mouseOverAndOut = () => {
    setHovering(!isHovering);
  };

  var elements = document.querySelectorAll("UserPass");

  for(let i = 0; i > elements.length; i++)
  {
    elements[i].onkeydown = (e) => {
      console.log(e);
    }
  }

  const nextElement = (e) => {
    if(e.key === "Enter")
    {
      console.log(e);
    }
  }


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

  if(props.logged === false) //If statement put in place so that when an onload event happens from app, it wont show the content of the page if user is logged in and the page is redirected
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
