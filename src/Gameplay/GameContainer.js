import React from 'react';
import ChallengeDisplay from './ChallengeDisplay/ChallengeDisplay'
import SolutionInput from './SolutionInput/SolutionInput';
import TimeInfo from './TimeInfo/TimeInfo';
import CompletedSolutions from './CompletedSolutions/CompletedSolutions';
import Confetti from 'react-confetti'

function GameContainer(props) {
  let numSet = props.numSet;
  let numUsedObj = props.numUsedObj;
  let target = props.target;

  let equation = props.equation;
  let solution = props.solution;
  let handleInput = props.handleInput;
  let validate = props.validate;
  let errorMessage = props.errorMessage;

  let formattedTime = props.formattedTime;
  let formattedTimeAvg = props.formattedTimeAvg;

  let validSolutions = props.validSolutions;

  let confettiBool=props.confettiBool

  return (
    <>
      <ChallengeDisplay
        numSet={numSet}
        numUsedObj={numUsedObj}
        target={target}
      />
  
      <SolutionInput
        equation={equation}
        solution={solution}
        handleInput={handleInput}
        validate={validate}
        errorMessage={errorMessage}
        />
      
      <TimeInfo
        formattedTime={formattedTime}
        formattedTimeAvg={formattedTimeAvg}
      />

      <CompletedSolutions
        validSolutions={validSolutions}
      />


        {
          confettiBool && <Confetti />
        }

    </>
  );
}

export default GameContainer;