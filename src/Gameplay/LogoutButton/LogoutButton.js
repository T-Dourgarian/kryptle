import React from 'react';
import './LogoutButton.css';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserData } from '../../redux/UserSlice';
import { resetGameData } from '../../redux/GameSlice';
import { logout } from '../../util/ApiUtil';

function LogoutButton(props) {
  const dispatch = useDispatch();

  const currentSeconds = useSelector((state) => state.game.currentSeconds)



    const handleLogOut = async () => {

        
        await logout(currentSeconds);
        
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
