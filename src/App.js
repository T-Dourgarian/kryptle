import React, { useEffect } from 'react';
import './App.css';

import Navigation from './Navigation/Navigation.js';
import MenuContainer from './Menu/MenuContainer/MenuContainer.js';
import { useSelector } from 'react-redux';

function App() {

  const userId = useSelector((state) => state.user.userId)

  return (
    <div className="App">

      <header className="App-header">
        {
          userId ? 
          <Navigation />:
          <MenuContainer />
        }
      </header>

    </div>
  );
}

export default App;
