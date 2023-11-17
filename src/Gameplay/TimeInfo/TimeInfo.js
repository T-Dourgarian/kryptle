

import React from 'react';
import './TimeInfo.css'

function TimeInfo(props) {
  let formattedTime = props.formattedTime;
  let formattedTimeAvg = props.formattedTimeAvg;


  return (
    <>
    <div> Average Time for Today's Kryptle - {formattedTimeAvg}</div>

    <div>{formattedTime}</div>


    </>
  );
}

export default TimeInfo;