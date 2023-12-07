import { useDispatch, useSelector } from 'react-redux';
import ChallengeDisplay from './ChallengeDisplay/ChallengeDisplay';
import SolutionInput from './SolutionInput/SolutionInput';
import TimeInfo from './TimeInfo/TimeInfo';
import CompletedSolutions from './CompletedSolutions/CompletedSolutions';
import LogoutButton from './LogoutButton/LogoutButton';
import Confetti from 'react-confetti';
import React, { useEffect } from 'react';
import Mexp from 'math-expression-evaluator';
import { validateEquation } from '../util/EquationValidators';
import { postSolution, getDailyKrypto } from '../util/ApiUtil';
import {
  equationUpdated,
  validateSubmissionSuccess,
  validateSubmissionFailure,
  errorMessageDone,
  postSolutionSuccess,
  numUsedObjUpdated,
  solutionUpdated,
  currentSecondsIncremented,
  getDailyKryptoSuccess,
  getDailyKryptoFailure,
  confettiTurnedOff,
} from '../redux/GameSlice';
import { Formatter } from '../util/Formatter';

function GameContainer(props) {
  const dispatch = useDispatch();
  const mexp = new Mexp();

  const updatedEquation = (e) => {
    if (!e.target.value.includes('.')) {
      dispatch(equationUpdated({ equation: e.target.value }));
    }
  };

  const equation = useSelector((state) => state.game.equation);
  const errorMessage = useSelector((state) => state.game.errorMessage);
  const avgTimeSeconds = useSelector((state) => state.game.avgTimeSeconds);
  const validSolutions = useSelector((state) => state.game.validSolutions);
  const numSet = useSelector((state) => state.game.numbersToUse);
  const numUsedObj = useSelector((state) => state.game.numUsedObj);
  const target = useSelector((state) => state.game.target);
  const solution = useSelector((state) => state.game.solution);
  const kryptoId = useSelector((state) => state.game.kryptoId);
  const solveStreak = useSelector((state) => state.game.solveStreak);
  const currentSeconds = useSelector((state) => state.game.currentSeconds);
  const isConfettiOn = useSelector((state) => state.game.isConfettiOn);

  const numbersRE = /\b\d+\b/g;

  // Init Game
  useEffect(() => {
    setKrypto();
    startIncrementSeconds();
  }, []);

  const startIncrementSeconds = () => {
    const interval = setInterval(() => {
      dispatch(currentSecondsIncremented());
    }, 1000);
    return () => clearInterval(interval);
  };

  const setKrypto = async () => {
    try {
      const data = await getDailyKrypto();
      dispatch(getDailyKryptoSuccess(data));
    } catch (error) {
      console.log(error);
      dispatch(getDailyKryptoFailure());
    }
  };

  useEffect(() => {
    try {
      dispatch(solutionUpdated({ solution: mexp.eval(equation) }));
    } catch (error) {}

    if (equation === '') {
      dispatch(solutionUpdated({ solution: '' }));
    }

    if (numSet[0]) {
      let numsUsed = equation.match(numbersRE);
      let numUsedObjTemp = Formatter.formatNumUsedObj(numSet);

      if (numsUsed) {
        for (const num of numsUsed) {
          for (const key in numUsedObjTemp) {
            if (
              String(numUsedObjTemp[key].value) == num &&
              !numUsedObjTemp[key].used
            ) {
              numUsedObjTemp[key].used = true;
              break;
            }
          }
        }
      }

      dispatch(numUsedObjUpdated({ numUsedObj: numUsedObjTemp }));
    }
  }, [equation]);

  const validateSubmission = async () => {
    try {
      await validateEquation(
        equation,
        numbersRE,
        numSet,
        target,
        solution,
        validSolutions
      );
      dispatch(
        validateSubmissionSuccess({
          submittedSolution: Formatter.formatSolution(
            equation,
            target,
            currentSeconds
          ),
        })
      );
      startConfettiTimer();
    } catch (error) {
      return dispatch(validateSubmissionFailure({ error: error.message }));
    }

    try {
      const postReturnData = await postSolution(
        kryptoId,
        equation,
        currentSeconds
      );
      dispatch(postSolutionSuccess(postReturnData));
    } catch (error) {
      console.log(error);
    }

    return true;
  };

  const startConfettiTimer = () => {
    setTimeout(() => {
      dispatch(confettiTurnedOff());
    }, 4000);
  };

  useEffect(() => {
    if (errorMessage) {
      setTimeout(function () {
        dispatch(errorMessageDone());
      }, 3000);
    }
  }, [errorMessage]);

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
        handleUserInput={updatedEquation}
        handleUserSubmit={validateSubmission}
        errorMessage={errorMessage}
      />

      <TimeInfo
        averageSeconds={avgTimeSeconds}
        currentSeconds={currentSeconds}
      />

      <CompletedSolutions validSolutions={validSolutions} />
      {isConfettiOn && <Confetti />}
      
      <div>Daily Streak: {solveStreak}</div>

      <LogoutButton />
      
    </>
  );
}

export default GameContainer;
