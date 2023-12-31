import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserData, updateUserStatsData } from '../../redux/UserSlice';
import { resetGameData } from '../../redux/GameSlice';
import { logout } from '../../util/ApiUtil';
import { Box, Button, Dropdown, Menu, MenuButton, MenuItem } from '@mui/joy';
import { routeToNewPage } from '../../redux/NavigationSlice';
import { updatePlayAsGuest } from '../../redux/UserSlice';
import { updateMenuSelection } from '../../redux/MenuSlice';

function DropDownMenu(props) {
    const dispatch = useDispatch();

    const currentSeconds = useSelector((state) => state.game.currentSeconds)
    const userId = useSelector((state) => state.user.userId)

    const handleLogOut = async () => {
        await logout(currentSeconds);

        dispatch(updateUserData({
            username: '',
            userId: ''
        }));

        dispatch(updateUserStatsData({
            avg_solve_time: '',
            total_solves: '',
            total_solves_unique: '',
            daily_streak: ''
        }));

        dispatch(resetGameData());
    }

    const handleSignUp = () => {
        dispatch(updateMenuSelection({ page: 'SignUp' }));
        dispatch(updatePlayAsGuest({ playAsGuest: false }));
    }

    const handleNavigation = (page) => {
        dispatch(routeToNewPage({ page}));
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
                    onClick={() => handleNavigation('Profile')}
                    sx={{
                        backgroundColor: '#32363B',
                    }}
                >
                    Profile
                </MenuItem>
                <MenuItem
                    onClick={() => handleNavigation('Game')}
                    sx={{
                        backgroundColor: '#32363B',
                    }}
                >
                    Game
                </MenuItem>
                <MenuItem
                    onClick={() => handleNavigation('Leaderboard')}
                    sx={{
                        backgroundColor: '#32363B',
                    }}
                >
                    Leaderboard
                </MenuItem>
                {
                    userId ?
                    <MenuItem
                        onClick={handleLogOut}
                        sx={{
                            backgroundColor: '#32363B',
                            
                        }}
                    >
                        Log Out
                    </MenuItem>:
                    <MenuItem
                        onClick={handleSignUp}
                        sx={{
                            backgroundColor: '#32363B',
                            
                        }}
                    >
                        Sign Up
                    </MenuItem>
                }
            </Menu>
        </Dropdown>
    </Box>
    
  );
}

export default DropDownMenu;
