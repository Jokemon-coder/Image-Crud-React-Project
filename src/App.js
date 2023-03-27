import React, { useState } from 'react';
import './App.css';
import LoginRegister from './pages/login/login-register';
import Home from './pages/home/home';
import {Route, Routes} from 'react-router-dom';

function App(props) {

  const[checkLogged, setLogged] = useState();

  const setToLogged = () => {
    setLogged(true);
  }

  const setToNotLogged = () => {
    setLogged(false);
  }
  

  const check = () => {
    console.log(checkLogged);
  }

  return (
    <div className="App">
      <Routes>
      <Route exact path="/" element={<Home logged={checkLogged} setChanged={setToLogged} onLoad={check()}/>}/>
      <Route exact path="/login" element={<LoginRegister logged={checkLogged} setChanged={setToNotLogged} onLoad={check()}/>}/>
      </Routes>
    </div>
  );
}

export default App;
