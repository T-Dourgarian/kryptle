import React, { useState } from 'react';

import { useDispatch } from 'react-redux';
import Stack from '@mui/joy/Stack';
import { Typography } from '@mui/joy';
import LeaderboardTable from '../LeaderboardTable/LeaderboardTable';


function LeaderboardContainer() {
	const dispatch = useDispatch();





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

    </ Stack>
  );
}

export default LeaderboardContainer;
