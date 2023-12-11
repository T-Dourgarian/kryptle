import React from 'react';
import { useDispatch } from 'react-redux';
import './HowToPlay.css';
import { playButtonClicked } from '../../redux/GameSlice';
import { updateMenuSelection } from '../../redux/MenuSlice';
import { Button, Stack, Typography } from '@mui/joy';

function HowToPlay() {
  const dispatch = useDispatch();

  const handleMenuClick = () => {
    dispatch(updateMenuSelection({ page: 'MenuOptions'}))
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
        fontSize={'60px'}
        color='#f3f3f3'
        letterSpacing={2}
        fontWeight={'bold'}
      > How To Play </Typography>


      <Typography
        width={'800px'}
        textAlign={'center'}
        color='#f3f3f3'
      >
        Kryptle is a daily math puzzle in which you are given five numbers
          between 1 and 25 and must use all five numbers to form a mathamatical
          equation whose answer is equal to a 6th number.
      </Typography>


      <Typography
        color='#f3f3f3'
      >
        For Example
      </Typography>

      <Typography
        color='#f3f3f3'
        fontSize={'25px'}
      >
        16 4 13 12 8 = 19
      </Typography>

      <Typography
        color='#f3f3f3'
        // fontSize={'25px'}
      >
        has the solution
      </Typography>

      <Typography
        color='#f3f3f3'
        fontSize={'25px'}
      >
        (12 / 4) * (16 / 8) + 13 = 19
      </Typography>


      <Typography
        color='#f3f3f3'
        width={'800px'}
        textAlign={'center'}
      >
        Every set of numbers will have one unique solution if not more. You
        are also able to use more complex mathematical operations...
      </Typography>


      <Button
        onClick={handleMenuClick}
        variant='outlined'
        sx={{
          color: '#f3f3f3',
          width:'140px',
          borderRadius: '20px',
          ':hover': {
            backgroundColor: '#717A85',
            boxShadow: '0px 15px 34px 5px rgba(54,54,54,0.32)'
          },
          borderColor: '#f3f3f3'
        }}
      >
        Back To Menu
      </Button>

    </Stack>
  );
}

export default HowToPlay;
