import React, { useEffect, useState } from 'react';
import './ProfileContainer.css';
import { useDispatch, useSelector } from 'react-redux';
import { getUserStats } from '../../util/ApiUtil';
import { updateUserStatsData } from '../../redux/UserSlice';
import { Formatter } from '../../util/Formatter';
import { Box, Card, Stack, Typography } from '@mui/joy';

function ProfileContainer() {
	const dispatch = useDispatch();

    const username = useSelector(state => state.user.username)

    const userStats = useSelector(state => state.user.stats)



    const getStatsData = async () => {
      const userStatsData = await getUserStats();
      dispatch(updateUserStatsData(userStatsData));
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
        <Typography
          // width={'250px'}
          mt={8}
          color='#f3f3f3'
          fontSize={'25px'}
        >
          Profile
        </Typography>

        <Card
          sx={{
            backgroundColor: '#737d87',
            color: '#f3f3f3',
            width:'350px'
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
