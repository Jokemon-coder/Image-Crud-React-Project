import React, { useState } from 'react';
import './App.css';
import LoginRegister from './pages/login/login-register';
import Home from './pages/home/home';
import {Route, Routes} from 'react-router-dom';

function App() {

  const[checkLogged, setLogged] = useState(false);

  const check = () => {
    if(checkLogged === false)
    {
      
    }
  }

  return (
    <div className="App" onLoad={check}>
      <Routes>
      <Route exact path="/" element={<Home/>}/>
      <Route exact path="/login" element={<LoginRegister isLogged={checkLogged}/>}/>
      </Routes>
    </div>
  );
}

export default App;
