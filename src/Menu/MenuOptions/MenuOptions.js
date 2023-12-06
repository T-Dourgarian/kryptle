import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import './MenuContainer.css';
import Login from '../Login/Login';
import HowToPlay from '../HowToPlay/HowToPlay';

function MenuOptions() {
	const dispatch = useDispatch();
	const [showHowToPlay, setShowHowToPlay] = useState(false);
	const [showLogin, setShowLogin] = useState(false);


  return (
    <div >

		<button 
			onClick={() => setShowLogin(true)}
		>Login</button>

		<button
			onClick={() => setShowHowTiPlay(true)}
		>How To Play</button>

    </div>
  );
}

export default MenuOptions;
