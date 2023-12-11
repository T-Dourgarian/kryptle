import React, { useEffect, useState } from 'react';
import './ProfileContainer.css';
import { useDispatch, useSelector } from 'react-redux';
import GameContainer from '../../Gameplay/GameContainer';
import { routeToNewPage } from '../../redux/NavigationSlice';
import { getUserStats } from '../../util/ApiUtil';
import { updateUserStatsData } from '../../redux/UserSlice';
import { Formatter } from '../../util/Formatter';

function ProfileContainer() {
	const dispatch = useDispatch();

    const navPage = useSelector(state => state.navigation.page);
    const username = useSelector(state => state.user.username)

    const userStats = useSelector(state => state.user.stats)

    const handleNavToGame = () => {
      dispatch(routeToNewPage({ page: 'Game'}))
    }


    const getStatsData = async () => {
      const userStatsData = await getUserStats();
      dispatch(updateUserStatsData(userStatsData));
    }

    useEffect(() => {
      getStatsData();
    }, [])


  return (
    <>
        <div>
          Username: { username }
        </div>

        <div>
          Avg Solve Time: {Formatter.getFormattedAverageTime(userStats.avg_solve_time)}
        </div>
        <div>
          Total Solves: {userStats.total_solves}
        </div>
        <div>
          Total Unique Solves: {userStats.total_solves_unique}
        </div>
        <div>
          Daily Streak: { userStats.daily_streak }
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
