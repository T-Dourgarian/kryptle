import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { getUserStats } from '../../util/ApiUtil';
// import { updateUserStatsData } from '../../redux/UserSlice';
// import { Formatter } from '../../util/Formatter';
import { Box, Card, Stack, Typography } from '@mui/joy';
import FriendsTable from './FriendsTable/FriendsTable';

function FriendsContainer() {
	const dispatch = useDispatch();

  const userId = useSelector((state) => state.user.userId);



    useEffect(() => {
      
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
            Friends
          </Typography>:
          <Typography
            // width={'250px'}
            mt={8}
            color='#f3f3f3'
            fontSize={'25px'}
          >
            Sign Up to add friends!
          </Typography>
        }

        <FriendsTable />

    </Stack>
  );
}

export default FriendsContainer;
