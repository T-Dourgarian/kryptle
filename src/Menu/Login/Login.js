import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import './Login.css';

function Login() {
  const dispatch = useDispatch();

  const [ username, setUsername] = useState('');
  const [ password, setPassword ] = useState('');

  const handleUsernameInput = (e) => {
    setUsername(e.target.value)
  }

  const handlePasswordInput = (e) => {
    serPassword(e.target.value)
  }

  return (
    <div className="Container">
        <div>Username</div>
        <input
          value={username}
          onChange={handleUsernameInput}
          
        />

        <div>Passowrd</div>
        <input
          value={password}
          onChange={handlePasswordInput}
          hidden="true"
        />
    </div>
  );
}

export default Login;
