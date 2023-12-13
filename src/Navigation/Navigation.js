import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import GameContainer from '../Gameplay/GameContainer';
import ProfileContainer from '../Profile/ProfileContainer/ProfileContainer';
import LeaderboardContainer from '../Leaderboard/LeaderboardContainer/LeaderboardContainer';
import DropDownMenu from './DropDownMenu/DropDownMenu';
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

          {
              navPage === 'Leaderboard' && 
              <LeaderboardContainer />
          }

    </>
  );
}

export default Navigation;
