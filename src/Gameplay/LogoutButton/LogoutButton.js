import React from 'react';
import './LogoutButton.css';
import { useDispatch } from 'react-redux';
import { updateUserData } from '../../redux/UserSlice';
import { resetGameData } from '../../redux/GameSlice';
import { logout } from '../../util/ApiUtil';

function LogoutButton(props) {
  const dispatch = useDispatch();

    const handleLogOut = async () => {
        const response = await logout();
        
        dispatch(updateUserData({
            username: '',
            userId: ''
        }))

        dispatch(resetGameData());
    }

  return (
    <>
      <button
        onClick={handleLogOut}
      >
        Log Out
      </button>
    </>
  );
}

export default LogoutButton;
