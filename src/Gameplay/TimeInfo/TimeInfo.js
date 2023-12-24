import React from 'react';
import './TimeInfo.css';
import { Formatter } from '../../util/Formatter';
import { Box } from '@mui/joy';

function TimeInfo(props) {
  const averageTimeSeconds = props.averageSeconds;
  const currentSeconds = props.currentSeconds;

  return (
    <>
      <Box
        mt={8}
      >
        {' '}
        Average Time for Today's Kryptle -{' '}
        {Formatter.getFormattedAverageTime(averageTimeSeconds)}
      </Box>

      <Box>{Formatter.getFormattedTime(currentSeconds)}</Box>
    </>
  );
}

export default TimeInfo;
