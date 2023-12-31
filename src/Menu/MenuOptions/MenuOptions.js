import React, { useState } from 'react';
import './MenuOptions.css';
import {
	updateMenuSelection
  } from '../../redux/MenuSlice';
import {
	updatePlayAsGuest
} from '../../redux/UserSlice';
import { useDispatch, useSelector } from 'react-redux';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import Button from '@mui/joy/Button';

function MenuOptions() {
	const dispatch = useDispatch();

	const handlePageSelect = (page) => {
		dispatch(updateMenuSelection({ page }));
	} 

	const handlePlaySelect = () => {
		dispatch(updatePlayAsGuest({ playAsGuest: true }))
	}

	const menuButtonStyleObj = {
		color: '#f3f3f3',
		width:'120px',
		borderRadius: '20px',
		':hover': {
			backgroundColor: '#717A85',
			boxShadow: '0px 15px 34px 5px rgba(54,54,54,0.32)'
		},
		borderColor: '#f3f3f3'
	}


  return (
    <Stack 
		direction="column"
		justifyContent="center"	
		alignItems="center"
		sx={{
			height: '90vh'
		}}
	>
		<Typography 
			fontSize={'85px'}
			color='#f3f3f3'
			letterSpacing={2}
		> Kryptle </Typography>

		<Stack 
			direction={{xs: 'column', md:'row'}}
			spacing={3}
		>
			<Button
				onClick={() => handlePageSelect('HowToPlay')}
				variant='outlined'
				sx={menuButtonStyleObj}
			>How To Play</Button>

			<Button 
				onClick={() => handlePageSelect('Login')}
				variant='outlined'
				sx={menuButtonStyleObj}
			>Login</Button>

			<Button
				onClick={handlePlaySelect}
				variant='outlined'
				sx={menuButtonStyleObj}
			>Play</Button>



		</Stack>

    </ Stack>
  );
}

export default MenuOptions;
