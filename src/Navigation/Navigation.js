import React, { useState } from 'react';
import './Navigation.css';
import { useDispatch, useSelector } from 'react-redux';
import GameContainer from '../Gameplay/GameContainer';
import ProfileContainer from '../Profile/ProfileContainer/ProfileContainer';
import DropDownMenu from '../Gameplay/DropDownMenu/DropDownMenu';
import { Box } from '@mui/joy';

function Navigation() {
	const dispatch = useDispatch();

    const navPage = useSelector(state => state.navigation.page);


  return (
    <>

        <DropDownMenu />


          {
              navPage === 'Game' && 
              <GameContainer />
          }

          {
              navPage === 'Profile' && 
              <ProfileContainer />
          }

    </>
  );
}

export default Navigation;
