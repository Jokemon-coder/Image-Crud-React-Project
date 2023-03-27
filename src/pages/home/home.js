import React, {useState} from 'react';
import './home.css';

function Home(props) {
  
  const [checkLogged, setLogged] = useState(props.logged);

  return (
    <div className="Home">
      <main>
      <p>Hello</p>
      </main>
    </div>
  );
}

export default Home;
