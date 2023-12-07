import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './MenuContainer.css';
import Login from '../Login/Login';
import HowToPlay from '../HowToPlay/HowToPlay';
import MenuOptions from '../MenuOptions/MenuOptions';
import {
	updateMenuSelection
  } from '../../redux/MenuSlice';

function MenuContainer() {
	const dispatch = useDispatch();
    const [showMenuOptions, setShowMenuOptions] = useState(true);
	const [showHowToPlay, setShowHowToPlay] = useState(false);
	const [showLogin, setShowLogin] = useState(false);

    const pageSelection = useSelector((state) => state.menu.page);


  return (
    <div >
        {
            pageSelection === 'MenuOptions' &&
            <MenuOptions 
                showMenuOptions={showMenuOptions} 
                setShowMenuOptions={setShowMenuOptions}
            />
        }

        {
            pageSelection === 'HowToPlay' && 
            <HowToPlay 
                showHowToPlay={showHowToPlay} 
                setShowHowToPlay={setShowHowToPlay}
            />
        }
        
        {
            pageSelection === 'Login' &&
            <Login 
                showLogin={showLogin} 
                setShowLogin={setShowLogin}
            />
        }

    </div>
  );
}

export default MenuContainer;
