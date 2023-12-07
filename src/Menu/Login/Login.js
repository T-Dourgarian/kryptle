import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import './Login.css';
import { login } from '../../util/ApiUtil';
import { updateMenuSelection } from '../../redux/MenuSlice';
import { updateUserData } from '../../redux/UserSlice';
import useRefreshToken from '../../util/hooks/useRefreshToken';

function Login() {
  const refresh = useRefreshToken();
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
      } else if (data.statusCode === 403 ) {
        setErrorMessage('Invalid username or password')
      }

  }

  const handleMenuClick = () => {
    dispatch(updateMenuSelection({ page: 'MenuOptions'}))
  }

  return (
    <div className="Container">

        <button
          onClick={handleMenuClick}
        >
          Menu
        </button>


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
            onClick={handleLogin}  
          >
            Login
          </button>


          <button onClick={() => refresh()}>
            refresh
          </button>


          <div>
            { errorMessage }
          </div>
        </div>
    </div>
  );
}

export default Login;
