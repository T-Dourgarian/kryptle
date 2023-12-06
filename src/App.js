import React, { useEffect } from 'react';
import './App.css';
import HowToPlay from './Menu/HowToPlay/HowToPlay.js';

import GameContainer from './Gameplay/GameContainer';
import { useSelector } from 'react-redux';

function App() {
  const playedToday = useSelector((state) => state.game.playedToday);

  return (
    <div className="App">
        {
          !playedToday && <HowToPlay />
        }

        <header className="App-header">
           <GameContainer />
        </header>
    </div>
  );
}

export default App;
