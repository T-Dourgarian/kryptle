import { useDispatch, useSelector } from 'react-redux';
import ChallengeDisplay from './ChallengeDisplay/ChallengeDisplay'
import SolutionInput from './SolutionInput/SolutionInput';
import TimeInfo from './TimeInfo/TimeInfo';
import CompletedSolutions from './CompletedSolutions/CompletedSolutions';
import Confetti from 'react-confetti'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Mexp from 'math-expression-evaluator';
import { validateEquation } from '../util/EquationValidators'
import { postSolution, getDailyKrypto} from '../util/ApiUtil';
import { 
  equationUpdated, 
  validationErrorThrown, 
  errorMessageDone, 
  validSolutionSubmitted, 
  postSolutionSuccess,
  numbersToUseUpdated,
  numUsedObjUpdated,
  targetUpdated,
  solutionUpdated,
  initFromLocalStorage,
  solveStreakUpdated
} from '../GameSlice';

function GameContainer(props) {
  const dispatch = useDispatch();
  const mexp = new Mexp();

  const playedToday = props.playedToday;

  const updatedEquation = (e) => {
    if (!e.target.value.includes('.')) {
      dispatch(equationUpdated({equation: e.target.value}));
    }
  }

  const equation = useSelector((state) => state.game.equation);
  const errorMessage = useSelector((state) => state.game.errorMessage);
  const avgTimeSeconds = useSelector((state) => state.game.avgTimeSeconds);
  const validSolutions = useSelector((state) => state.game.validSolutions)
  const numSet = useSelector((state) => state.game.numbersToUse);
  const numUsedObj = useSelector((state) => state.game.numUsedObj);
  const target = useSelector((state) => state.game.target);
  const solution = useSelector((state) => state.game.solution)
  const kryptoId = useSelector((state) => state.game.kryptoId);
  const solveStreak = useSelector((state) => state.game.solveStreak)
  // const seconds = useSelector((state) => state.game.seconds);




  // Need to work through and remove all of these in favor of selecting from state like above

  // Also need to work through breaking down methods and pulling out api calls

  // Api calls are currently in util methods but they should probably be handled better
  // const [kryptoId, setKryptoId] = useState(JSON.parse(window.localStorage.getItem('kryptle_data')).id || null);
  const [seconds, setSeconds] = useState(JSON.parse(window.localStorage.getItem('kryptle_data')).seconds || 0);
  const [confettiBool, setConfettiBool] = useState(false);
  
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  const formattedTime = `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  
  const formattedTimeAvg = `${Math.floor(avgTimeSeconds / 60)}:${ ( avgTimeSeconds % 60 ) < 10 ? '0' : ''}${ avgTimeSeconds % 60 }`;
  
 
  const numbersRE = /\b\d+\b/g;
  
  const startConfetti = () => {
    setConfettiBool(true);
    setTimeout(() => {
      setConfettiBool(false);
    }, 4000); // 2000 milliseconds = 2 seconds
  };


  // start counter
  useEffect(() => {

    // this if() is so that the timer only starts after user hits play.
    // will probably implement routing soon which should make this stuff cleaner
    if (playedToday) {
      gatherTodaysNumbers();

      const interval = setInterval(() => {

        setSeconds(prevSeconds => {

          window.localStorage.setItem('kryptle_data', JSON.stringify({
            ...JSON.parse(window.localStorage.getItem('kryptle_data')),
            seconds: prevSeconds + 1
          }))

          return prevSeconds + 1
        });

      }, 1000);

      // Clean up the interval on component unmount
      return () => clearInterval(interval);
    }
  }, [playedToday]);

  // error messaging for faulty equations
  useEffect(()=>{
    if (errorMessage) {
      setTimeout(function() {
        dispatch(errorMessageDone())
        }, 3000);
    }
  },[errorMessage])

  // realtime calculate answer of equation
  const handleCalculate = () => {
    try {
      dispatch(solutionUpdated({ solution: mexp.eval(equation) }))
    } catch (error) {

    }
  }

  // calculate which numbers have been used for highlighting the used numbers
  useEffect(() => {
    handleCalculate();
    if (equation === '') {
      dispatch(solutionUpdated({ solution: '' }))
    }

    // some rendering issue where only sometimes this was running before numset was set and caused errors
    if(numSet[0]) {
      let numsUsed = equation.match(numbersRE);

      let numUsedObjTemp = {};

      numSet.forEach((num, i) => {
        numUsedObjTemp[i] = {
          value: num,
          used: false
        }
      })

      if (numsUsed) {
        for (const num of numsUsed) {
          for (const key in numUsedObjTemp) {
            if (String(numUsedObjTemp[key].value) == num && !numUsedObjTemp[key].used) {
              numUsedObjTemp[key].used = true;
              break;
            }
          }
        }
      }

      dispatch(numUsedObjUpdated({ numUsedObj: numUsedObjTemp}));
    }

  }, [equation])

  // gather daily set of numbers and initialize numUsedObj to false
  // update localstorage with new data if it doesnt match current data
  const gatherTodaysNumbers = async () => {
    try {

      const data = await getDailyKrypto();

      if (data.id !== kryptoId && data && data.numbersToUse && data.targetNumber) {

        let numUsedObjTemp = {};
        
        data.numbersToUse.forEach((num, i) => {
          numUsedObjTemp[i] = {
            value: num,
            used: false
          }
        })

        setSeconds(0);

        dispatch(initFromLocalStorage({
          avgTimeSeconds: data.avgTimeSeconds,
          numbersToUse: data.numbersToUse,
          numUsedObj: numUsedObjTemp,
          target: data.targetNumber,
          kryptoId: data.id,
          seconds: 0,
          validSolutions:[],
          playedToday: true,
          pageLoaded: true,
          equation: '',
          solveStreak: validSolutions.length === 0 ? 0 : solveStreak
        }))

      }


    } catch(error) {
      console.log(error);
      dispatch(numbersToUseUpdated({ numbersToUse: ['4', '9', '23', '5', '22']}))
      dispatch(targetUpdated({ target: '6'}));

      let numUsedObjTemp = {};

        ['4', '9', '23', '5', '22'].forEach((num, i) => {
          numUsedObjTemp[i] = {
            value: num,
            used: false
          }
        })
        dispatch(numUsedObjUpdated({ numUsedObj: numUsedObjTemp}))
    }
  }

  const validateSubmission = async () => {
    try {
      await validateEquation(equation, numbersRE, numSet, target, solution, validSolutions);
    } catch(error) {
      dispatch(validationErrorThrown({error: error.message}));
      return
    }

    handleValidSolution();




    try {
      const postReturnData = await postSolution(kryptoId, equation, seconds);
      dispatch(postSolutionSuccess(postReturnData));
    } catch(error) {
      console.log(error)
    }

    return true;

  }

  const handleValidSolution = () => {
    startConfetti();

    if (validSolutions.length === 0) {
      dispatch(solveStreakUpdated({ solveStreak: solveStreak + 1 }))
    }

    const formattedSolution = `${equation} = ${target} | ${formattedTime}`;
    dispatch(validSolutionSubmitted({ validSolutions: [...validSolutions, formattedSolution]}));
    dispatch(equationUpdated({equation: ''}));
  }

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
        formattedTime={formattedTime}
        formattedTimeAvg={formattedTimeAvg}
      />

      <CompletedSolutions
        validSolutions={validSolutions}
      />


        {
          confettiBool && <Confetti />
        }

        <div>
         Daily Streak: { solveStreak}
        </div>

    </>
  );
}

export default GameContainer;