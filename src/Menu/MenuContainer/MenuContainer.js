import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './MenuContainer.css';
import Login from '../Login/Login';
import HowToPlay from '../HowToPlay/HowToPlay';
import MenuOptions from '../../Menu/MenuOptions/MenuOptions';
import SignUp from '../SignUp/SignUp';

function MenuContainer() {
	const dispatch = useDispatch();

    const pageSelection = useSelector((state) => state.menu.page);


  return (
    <div >
        {
            pageSelection === 'MenuOptions' &&
            <MenuOptions />
        }

        {
            pageSelection === 'HowToPlay' && 
            <HowToPlay />
        }
        
        {
            pageSelection === 'Login' &&
            <Login />
        }

        {
            pageSelection === 'SignUp' &&
            <SignUp />
        }

    </div>
  );
}

export default MenuContainer;
