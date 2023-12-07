import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import './Login.css';
import { login } from '../../util/ApiUtil';
import { updateMenuSelection } from '../../redux/MenuSlice';
import useRefreshToken from '../../util/hooks/useRefreshToken';

function Login() {
  const refresh = useRefreshToken();
  const dispatch = useDispatch();

  const [ username, setUsername] = useState('');
  const [ password, setPassword ] = useState('');

  const handleUsernameInput = (e) => {
    setUsername(e.target.value)
  }

  const handlePasswordInput = (e) => {
    setPassword(e.target.value)
  }

  const handleLogin = async () => {
      const response = await login(username, password);
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
        </div>
    </div>
  );
}

export default Login;
