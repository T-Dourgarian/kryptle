import React, { useEffect, useState } from 'react';
import './ProfileContainer.css';
import { useDispatch, useSelector } from 'react-redux';
import GameContainer from '../../Gameplay/GameContainer';
import { routeToNewPage } from '../../redux/NavigationSlice';
import { getUserStats } from '../../util/ApiUtil';

function ProfileContainer() {
	const dispatch = useDispatch();

    const navPage = useSelector(state => state.navigation.page);
    const username = useSelector(state => state.user.username)

    const [userStats, setUserStats] = useState({
      avg_solve_time: null,
      total_solves: null,
      total_solves_unique: null,
    })

    const handleNavToGame = () => {
      dispatch(routeToNewPage({ page: 'Game'}))
    }

    useEffect(() => {
      
    }, [])


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
