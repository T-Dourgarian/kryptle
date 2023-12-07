import React, { useEffect } from 'react';
import './App.css';


import GameContainer from './Gameplay/GameContainer';
import MenuContainer from './Menu/MenuContainer/MenuContainer.js';
import { useSelector } from 'react-redux';

function App() {
  const playedToday = useSelector((state) => state.game.playedToday);
  const userId = useSelector((state) => state.user.userId)

  return (
    <div className="App">

      <header className="App-header">
        {
          userId ? 
          <GameContainer />:
          <MenuContainer />
        }
      </header>

    </div>
  );
}

export default App;
