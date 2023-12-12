import React from 'react';
import './ChallengeDisplay.css';
import { Box, Grid, Stack, Typography } from '@mui/joy';

function ChallengeDisplay(props) {
  let numSet = props.numSet;
  let numUsedObj = props.numUsedObj;
  let target = props.target;

  return (
    <Grid
      container
      mt={3}
      columns={{ xs: 7}}
      width={{
        md: '500px',
        sm:'90%'
      }}
    >
      <Grid 
        xs={5}
        textAlign={'center'}
        fontSize={'14px'}
      > 
        Numbers to use
      </Grid>

      <Grid 
        xs={1}
      >
      </Grid>

      <Grid xs={1} fontSize={'14px'} textAlign={'center'}> 
        Target
      </Grid>


        <Grid
          container
          columns={5}
          xs={5}
          textAlign={'center'}
          border={'4px solid #4CAEFE'}
          borderRadius={10}
        >
          {
            numSet &&
            numUsedObj[0] &&
              numSet.map((num, i) => (
                <Grid
                  xs={1}
                >
                  <Typography
                    key={i}
                    fontSize={'35px'}
                    sx={{
                      color: numUsedObj[i].used ? '#4CAEFE' : '#f3f3f3',
                    }}
                  >
                    {' '}{num}{' '}
                  </Typography>
                </Grid>
              ))
          }
        </Grid>


        <Grid
          xs={1}
        >
          <Typography
            fontSize={'35px'}
            color={'#f3f3f3'}
            textAlign={'center'}
          >
            =
          </Typography>
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
            >{target}</Typography>
          </Box>
        </Grid>
      

    </Grid>
  );
}

export default ChallengeDisplay;
