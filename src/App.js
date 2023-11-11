import React, { useEffect } from 'react';
import './App.css';
import HowToPlay from './HowToPlay/HowToPlay.js';

import GameContainer from './Gameplay/GameContainer';
import { useDispatch, useSelector } from 'react-redux';
import { initFromLocalStorage } from './GameSlice';


function App() {
  const dispatch = useDispatch()

  const playedToday = useSelector((state) => state.game.playedToday);
  const pageLoaded = useSelector((state) => state.game.pageLoaded);
  
  if (window.localStorage.getItem('kryptle_data') == null) {
    window.localStorage.setItem('kryptle_data',JSON.stringify({
      numbersToUse: [],
      numUsedObj: {},
      target: '',
      equation: '',
      validSolutions:[],
      kryptoId: null,
      avgTimeSeconds: 0,
      seconds: 0,
      playedToday: false
    }))
  }

  const getFromLocalStorage = () => {
    return JSON.parse(window.localStorage.getItem('kryptle_data'));
}

  useEffect(() => {
      dispatch(initFromLocalStorage(getFromLocalStorage()));
  }, []);
  


  return (
    <div className="App">

      {
        !playedToday && pageLoaded && <HowToPlay/>
      }

      <header className="App-header">
              
      <GameContainer
         playedToday={playedToday}
      />

      </header>

    </div>
  );
}

export default App;
