import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import './MenuContainer.css';
import Login from '../Login/Login';
import HowToPlay from '../HowToPlay/HowToPlay';
import MenuOptions from '../MenuOptions/MenuOptions';

function MenuContainer() {
	const dispatch = useDispatch();
    const [showMenuOptions, setShowMenuOptions] = useState(true);
	const [showHowToPlay, setShowHowToPlay] = useState(false);
	const [showLogin, setShowLogin] = useState(false);


  return (
    <div >
        <MenuOptions 
            showMenuOptions={showMenuOptions} 
            setShowMenuOptions={setShowMenuOptions}
        />

        <HowToPlay 
            showHowToPlay={showHowToPlay} 
            setShowHowToPlay={setShowHowToPlay}
        />
        
        <Login 
            showLogin={showLogin} 
            setShowLogin={setShowLogin}
        />
    </div>
  );
}

export default MenuContainer;
