import React, { useState } from 'react';
import './MenuOptions.css';
import {
	updateMenuSelection
  } from '../../redux/MenuSlice';
import { useDispatch, useSelector } from 'react-redux';

function MenuOptions() {
	const dispatch = useDispatch();

	const handlePageSelect = (page) => {
		dispatch(updateMenuSelection({ page }));
	} 


  return (
    <div >

		<button 
			onClick={() => handlePageSelect('Login')}
		>Login</button>

		<button
			onClick={() => handlePageSelect('HowToPlay')}
		>How To Play</button>

    </div>
  );
}

export default MenuOptions;
