import React, { useState } from 'react';
import './ProfileContainer.css';
import { useDispatch, useSelector } from 'react-redux';
import GameContainer from '../../Gameplay/GameContainer';
import { routeToNewPage } from '../../redux/NavigationSlice';

function ProfileContainer() {
	const dispatch = useDispatch();

    const navPage = useSelector(state => state.navigation.page);
    const username = useSelector(state => state.user.username)

    const handleNavToGame = () => {
      dispatch(routeToNewPage({ page: 'Game'}))
    }


  return (
    <>
        <div>
          { username }
        </div>
        <button
          onClick={handleNavToGame}
        >
            Back To Game
        </button>
    </>
  );
}

export default ProfileContainer;
