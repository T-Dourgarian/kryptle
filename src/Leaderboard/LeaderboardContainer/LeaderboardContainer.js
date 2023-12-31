import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import Stack from '@mui/joy/Stack';
import { Typography } from '@mui/joy';
import LeaderboardTable from '../LeaderboardTable/LeaderboardTable';


function LeaderboardContainer() {
	const dispatch = useDispatch();

	const userId = useSelector((state) => state.user.userId);




  return (
    <Stack 
		direction="column"	
		alignItems="center"
		sx={{
			height: '90vh'
		}}
	>
		<Typography
			fontSize={{xs:'30px', md: '55px'}}
			mt={8}
			color='#f3f3f3'
		>
			Kryptle Leaderboards
		</Typography>

		<LeaderboardTable />

		{
			!userId && 
			<Typography
				fontSize={{xs:'22px', md: '40px'}}
				textAlign={'center'}
				mt={8}
				color='#f3f3f3'
			>
				Sign Up to see the leaderboard and your standing!
			</Typography>
		}

    </ Stack>
  );
}

export default LeaderboardContainer;
