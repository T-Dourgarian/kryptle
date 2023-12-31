import React, { useEffect, useState } from 'react';
import './ProfileContainer.css';
import { useDispatch, useSelector } from 'react-redux';
import { getUserStats } from '../../util/ApiUtil';
import { updateUserStatsData } from '../../redux/UserSlice';
import { Formatter } from '../../util/Formatter';
import { Box, Card, Stack, Typography } from '@mui/joy';

function ProfileContainer() {
	const dispatch = useDispatch();

    const username = useSelector(state => state.user.username);
    const userId = useSelector((state) => state.user.userId);

    const userStats = useSelector(state => state.user.stats);



    const getStatsData = async () => {
      if (userId) {
        const userStatsData = await getUserStats();
        dispatch(updateUserStatsData(userStatsData));
      }
    }

    useEffect(() => {
      getStatsData();
    }, [])


  return (
    <Stack
      alignItems={'center'}
      sx={{
        height: '100vh'
      }}
    >
        {
          userId ?
          <Typography
            // width={'250px'}
            mt={8}
            color='#f3f3f3'
            fontSize={'25px'}
          >
            Profile
          </Typography>:
          <Typography
            // width={'250px'}
            mt={8}
            color='#f3f3f3'
            fontSize={'25px'}
          >
            Sign Up to track your stats!
          </Typography>
        }

        <Card
          sx={{
            backgroundColor: '#315A6B',
            color: '#f3f3f3',
            width:{
              xs:'80%',
              md: '350px'
            }
          }}
        >
          <Box>
            Username: { username }
          </Box>


          <Box

          >
            Avg Solve Time: {Formatter.getFormattedAverageTime(userStats.avg_solve_time)}
          </Box>
          <Box >
            Total Solves: {userStats.total_solves}
          </Box>
          <Box >
            Total Unique Solves: {userStats.total_solves_unique}
          </Box>
          <Box >
            Daily Streak: { userStats.daily_streak }
          </Box>
        </Card>
    </Stack>
  );
}

export default ProfileContainer;
