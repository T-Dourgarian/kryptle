import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import './SignUp.css';
import { login } from '../../util/ApiUtil';
import { updateMenuSelection } from '../../redux/MenuSlice';
import { updateUserData } from '../../redux/UserSlice';
import { signUp } from '../../util/ApiUtil';

function SignUp() {
  const dispatch = useDispatch();

  const [ username, setUsername] = useState('');
  const [ password, setPassword ] = useState('');
  const [ email, setEmail ] = useState('')
  const [ errorMessage, setErrorMessage] = useState('');

  const handleEmailInput = (e) => {
    setEmail(e.target.value)
  }

  const handleUsernameInput = (e) => {
    setUsername(e.target.value)
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
      console.log(data)
    }
  }

  return (
    <div className="Container">

        <button
          onClick={handleMenuClick}
        >
          Menu
        </button>

        <div>Email</div>
        <input 
          value={email}
          onChange={handleEmailInput}
        />

        <div>Username</div>
        <input
          value={username}
          onChange={handleUsernameInput}
          
        />

        <div>Password</div>
        <input
          value={password}
          onChange={handlePasswordInput}
          type='password'
        />


        <div>
          <button
            onClick={handleSignUp}  
          >
            Sign Up
          </button>
        </div>


        <div>
          {
            errorMessage
          }
        </div>
    </div>
  );
}

export default SignUp;
