import React, { useState } from 'react';
import './ProfileButton.css';
import { useDispatch, useSelector } from 'react-redux';
import GameContainer from '../../Gameplay/GameContainer';
import { routeToNewPage } from '../../redux/NavigationSlice';

function ProfileButton() {
	const dispatch = useDispatch();

    const navPage = useSelector(state => state.navigation.page);

    const hangleNavToProfile = () => {
        dispatch(routeToNewPage({ page: 'Profile'}));
    }


  return (
    <button
        onClick={hangleNavToProfile}
    >
        Profile
    </button>
  );
}

export default ProfileButton;
