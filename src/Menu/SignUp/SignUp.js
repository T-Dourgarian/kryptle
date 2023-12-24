import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import './SignUp.css';
import { login } from '../../util/ApiUtil';
import { updateMenuSelection } from '../../redux/MenuSlice';
import { updateUserData } from '../../redux/UserSlice';
import { signUp } from '../../util/ApiUtil';
import { Button, FormLabel, Input, Stack, Typography } from '@mui/joy';
import { FormControl } from '@mui/base';

function SignUp() {
  const dispatch = useDispatch();

  const [ username, setUsername] = useState('');
  const [ password, setPassword ] = useState('');
  const [ email, setEmail ] = useState('')
  const [ errorMessage, setErrorMessage] = useState('');

  const handleEmailInput = (e) => {
    setEmail(e.target.value);
    setErrorMessage('');
  }

  const handleUsernameInput = (e) => {
    setUsername(e.target.value);
    setErrorMessage('');
  }

  const handlePasswordInput = (e) => {
    setPassword(e.target.value)
  }

  const handleMenuClick = () => {
    dispatch(updateMenuSelection({ page: 'MenuOptions'}))
  }

  const handleSignUp = async () => {
    const data = await signUp(email, username, password);

    if (data.id) {
      dispatch(updateUserData({username: data.username, userId: data.id}))
    } else if (data.statusCode === 403 ) {
      setErrorMessage(data.message)
    }
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
        fontSize={'40px'}
        color='#f3f3f3'
        mb={3}
      >
        Create an Account
      </Typography>

        <FormControl >
          <FormLabel
            sx={{
              color: '#f3f3f3',
              fontSize: '20px'
            }}
          >
            Email
          </FormLabel>

          <Input 
            type='email'
            onChange={handleEmailInput}
          />
        </FormControl>

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


        <Stack
          direction={'row'}
          spacing={2}
        >
          <Button
            variant='outlined'
            sx={menuButtonStyleObj}
            onClick={handleMenuClick}
          >
            Menu
          </Button>

          <Button
            variant='outlined'
            sx={menuButtonStyleObj}
            onClick={handleSignUp}  
          >
            Finish
          </Button>
        </Stack>



        <div>
          {
            errorMessage
          }
        </div>
    </ Stack>
  );
}

export default SignUp;
