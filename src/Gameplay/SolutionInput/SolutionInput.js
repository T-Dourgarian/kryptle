import React from 'react';
import './SolutionInput.css';
import { Box, Button, FormControl, FormLabel, Grid, Input, Typography } from '@mui/joy';

function SolutionInput(props) {
  let equation = props.equation;
  let solution = props.solution;
  let handleUserInput = props.handleUserInput;
  let handleUserSubmit = props.handleUserSubmit;
  let errorMessage = props.errorMessage;

  return (
    <Grid
      container
      columns={{ xs: 7}}
      width={{
        md: '500px',
        xs:'90%'
      }}
    >
      <Grid
        xs={5}
      >
        Your equation:
      </Grid>
      
      
        <Grid
          xs={5}
        > 
          <Input
            value={equation}
            onChange={handleUserInput}
            sx={{
              height:'100%',
              fontSize:' 25px',
              fontWeight:'bold'
            }}
          />
        </Grid>

        <Grid
          xs={1}
          fontSize={'35px'}
          color={'#f3f3f3'}
          textAlign={'center'}
        >
          =
        </Grid>

        <Grid
          xs={1}
        >
          <Box
            border={'4px solid #4CAEFE'}
            // px={2}
            borderRadius={8}
            >
            <Typography
              textAlign={'center'}
              fontSize={'35px'}
              color={'#f3f3f3'}
            >{solution === '' ? '?' : solution}</Typography>
          </Box>
        </Grid>
      

      <Grid
        xs={7}
        mt={2}
        textAlign={'center'}
      >
        <Button  
          onClick={handleUserSubmit}
          variant='solid'
          sx={{
            color: '#4CAEFE',
            width:'30%',
            borderRadius: '20px',
            backgroundColor: '#f3f3f3',
            ':hover': {
              backgroundColor: '#f3f3f3',
              boxShadow: '0px 15px 34px 5px rgba(54,54,54,0.32)'
            }
          }}
        >
          Validate
        </Button>
      </Grid>

      <Grid
        xs={7}
        textAlign={'center'}
        height={'15px'}
        pt={2}
      >
        <Typography 
          sx={{
            color: '#F65F5F'
          }}
        >{errorMessage}</Typography>
      </Grid>
    </Grid>
  );
}

export default SolutionInput;
