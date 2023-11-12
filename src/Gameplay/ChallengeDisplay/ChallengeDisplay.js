import React from 'react';
import './ChallengeDisplay.css';

function ChallengeDisplay(props) {

  let numSet = props.numSet;
  let numUsedObj = props.numUsedObj;
  let target = props.target;

  return (

    <div className='instructionsHeaderDiv'>

    <div>
      {
        numSet && numUsedObj[0] && numSet.map((num, i) => 
          <span
            key={i}
            className='numbersListedSpan'
            style={{
              color: numUsedObj[i].used ? 'green' : ''
            }}
          > {num} </span>
        )
      }
      <span className='numbersListedSpan'>= { target }</span>
    </div>
  </div>
  );
}

export default ChallengeDisplay;