import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserData } from '../../redux/UserSlice';
import { resetGameData } from '../../redux/GameSlice';
import { logout } from '../../util/ApiUtil';
import { Box, Button, Dropdown, Menu, MenuButton, MenuItem } from '@mui/joy';
import { routeToNewPage } from '../../redux/NavigationSlice';

function DropDownMenu(props) {
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

    const handleNavToProfile = () => {
        dispatch(routeToNewPage({ page: 'Profile'}));
    }

    const handleNavToGame = () => {
        dispatch(routeToNewPage({ page: 'Game'}));
    }   

    
  return (
    <Box
        sx={{
            position:'absolute',
            top:5,
            right:10
        }}
    >
        <Dropdown>
            <MenuButton
                sx={{
                    color: '#f3f3f3',
                    width:'120px',
                    borderRadius: '20px',
                    ':hover': {
                        backgroundColor: '#545B63',
                        boxShadow: '0px 15px 34px 5px rgba(54,54,54,0.32)'
                    },
                    borderColor: '#f3f3f3'
                }}
            >
                Menu
            </MenuButton>
            <Menu
                variant='solid'
                sx={{
                    borderRadiusL: 10,
                    backgroundColor: '#32363B'
                }}
            >
                <MenuItem
                    onClick={handleNavToProfile}
                    sx={{
                        backgroundColor: '#32363B',
                    }}
                >
                    Profile
                </MenuItem>
                <MenuItem
                    onClick={handleNavToGame}
                    sx={{
                        backgroundColor: '#32363B',
                    }}
                >
                    Game
                </MenuItem>
                <MenuItem
                    onClick={handleLogOut}
                    sx={{
                        backgroundColor: '#32363B',
                        
                    }}
                >
                    Log Out
                </MenuItem>
            </Menu>
        </Dropdown>
    </Box>
    
  );
}

export default DropDownMenu;
