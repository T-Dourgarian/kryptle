import React from 'react';
import './TimeInfo.css';
import { Formatter } from '../../util/Formatter';

function TimeInfo(props) {
  const averageTimeSeconds = props.averageSeconds;
  const currentSeconds = props.currentSeconds;

  return (
    <>
      <div>
        {' '}
        Average Time for Today's Kryptle -{' '}
        {Formatter.getFormattedAverageTime(averageTimeSeconds)}
      </div>

      <div>{Formatter.getFormattedTime(currentSeconds)}</div>
    </>
  );
}

export default TimeInfo;
