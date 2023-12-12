import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import './Login.css';
import { login } from '../../util/ApiUtil';
import { updateMenuSelection } from '../../redux/MenuSlice';
import { updateUserData } from '../../redux/UserSlice';
import { updateGameDataFromLogin } from '../../redux/GameSlice';
import { Formatter } from '../../util/Formatter';
import { Button, FormControl, FormLabel, Input, Stack, Typography } from '@mui/joy';
import { Type } from 'class-transformer';

function Login() {
  const dispatch = useDispatch();

  const [ username, setUsername] = useState('');
  const [ password, setPassword ] = useState('');
  const [ errorMessage, setErrorMessage] = useState('');

  const handleUsernameInput = (e) => {
    setUsername(e.target.value)
    setErrorMessage('')
  }

  const handlePasswordInput = (e) => {
    setPassword(e.target.value)
    setErrorMessage('')
  }

  const handleLogin = async () => {
    const data = await login(username, password);
    
    if (data.id) {
      dispatch(updateUserData({username: data.username, userId: data.id}))

      dispatch(updateGameDataFromLogin({ 
        solveStreak: data.solveStreak,
        validSolutions: data.solutions,
        currentSeconds: data.currentSeconds
      }))

    } else if (data.statusCode === 403 ) {
      setErrorMessage('Invalid username or password')
    }
  }

  const handleNav = (page) => {
    dispatch(updateMenuSelection({ page }))
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
      spacing={2}
    >
        <Typography
          fontSize={{ sm: '25px'}}
          color='#f3f3f3'
          letterSpacing={2}
        >
          Log in or create an account
        </Typography>


        <FormControl >
          <FormLabel
            sx={{
              color: '#f3f3f3',
              fontSize: '20px'
            }}
          >
            Username
          </FormLabel>

          <Input 
            onChange={handleUsernameInput}
          />
        </FormControl>


        <FormControl >
          <FormLabel
            sx={{
              color: '#f3f3f3',
              fontSize: '20px'
            }}
          >
            Password
          </FormLabel>

          <Input 
            type='password'
            onChange={handlePasswordInput}
          />
        </FormControl>

          <Typography
            color={'#f3f3f3'}
          >
            { errorMessage }
          </Typography>

          <Stack
            direction={'column'}
            spacing={1}
          >

            <Button
              variant='outlined'
              onClick={handleLogin}  
              sx={{
                ...menuButtonStyleObj,
                width: '100%'
              }}
            >
              Login
            </Button>

            <Stack
              direction={'row'}
              spacing={1}
            >
              <Button
                variant='outlined'
                onClick={() => handleNav('MenuOptions')}  
                sx={menuButtonStyleObj}
              >
                Menu
              </Button>

              <Button
                variant='outlined'
                onClick={() => handleNav('SignUp')}  
                sx={menuButtonStyleObj}
              >
                Sign Up
              </Button>
            </Stack>

          </Stack>




    </Stack>
  );
}

export default Login;
