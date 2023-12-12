import React from 'react';
import './CompletedSolutions.css';
import { Box, Grid, Stack, Typography } from '@mui/joy';

function CompletedSolutions(props) {
  let validSolutions = props.validSolutions;

  return (
    <Stack>
      <Typography
        textAlign={'center'}
        color='#f3f3f3'
      >Completed Solutions</Typography>
      <Stack
        spacing={1}
        maxHeight={{ xs: '150px', md: '250px'}}
        sx={{
          overflowY: 'scroll',
          '&::-webkit-scrollbar': {display: 'none'},
          backgroundColor:"#737D87FF"
        }}
        padding={2}
        borderRadius={8}
      >
        {validSolutions && validSolutions.map((s, i) => 
          <Box key={i}>
            {s}
          </Box>
        )}
      </Stack>
    </Stack>
  );
}

export default CompletedSolutions;
