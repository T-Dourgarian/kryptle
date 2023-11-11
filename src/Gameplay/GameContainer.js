import { useDispatch, useSelector } from 'react-redux';
import { equationUpdated, validationErrorThrown, errorMessageDone, validSolutionSubmitted, postSolutionSuccess } from '../GameSlice';
import ChallengeDisplay from './ChallengeDisplay/ChallengeDisplay'
import SolutionInput from './SolutionInput/SolutionInput';
import TimeInfo from './TimeInfo/TimeInfo';
import CompletedSolutions from './CompletedSolutions/CompletedSolutions';
import Confetti from 'react-confetti'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Mexp from 'math-expression-evaluator';
import { validateEquation } from '../util/EquationValidators'
import { postSolution } from '../util/ApiUtil';


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

  // Need to work through and remove all of these in favor of selecting from state like above

  // Also need to work through breaking down methods and pulling out api calls

  // Api calls are currently in util methods but they should probably be handled better

  const [numSet, setNumSet] = useState(JSON.parse(window.localStorage.getItem('kryptle_data')).numbersToUse || []);
  const [numUsedObj, setNumUsedObj] = useState(JSON.parse(window.localStorage.getItem('kryptle_data')).numUsedObj || {});
  const [target, setTarget] = useState(JSON.parse(window.localStorage.getItem('kryptle_data')).target || '');
  const [solution, setSolution] = useState('');
  const [kryptoId, setKryptoId] = useState(JSON.parse(window.localStorage.getItem('kryptle_data')).id || null);
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
      setSolution(mexp.eval(equation))
    } catch (error) {
      // setSolution('Invalid mathamatical expression');
    }
  }

  // calculate which numbers have been used for highlighting the used numbers
  useEffect(() => {
    handleCalculate();
    if (equation === '') {
      setSolution('');
    }

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

    setNumUsedObj(numUsedObjTemp);

  }, [equation])

  // gather daily set of numbers and initialize numUsedObj to false
  // update localstorage with new data if it doesnt match current data
  const gatherTodaysNumbers = async () => {
    try {

      const response = await axios.get(`${process.env.REACT_APP_API_URL}/dailykrypto`);

      const { data } = response;

      if (data.id !== kryptoId && data && data.numbersToUse && data.targetNumber) {

        let numUsedObjTemp = {};
        
        data.numbersToUse.forEach((num, i) => {
          numUsedObjTemp[i] = {
            value: num,
            used: false
          }
        })

        dispatch(postSolutionSuccess({ avgTimeSeconds: data.avgTimeSeconds }));
        
        setNumUsedObj(numUsedObjTemp);
        setKryptoId(data.id);
        // setAvgTimeSeconds(data.avgTimeSeconds); Needs to update state, this whole thing should be a reducer... Can remove most of this
        setNumSet(data.numbersToUse);
        setTarget(data.targetNumber);
        setSeconds(0);

        window.localStorage.setItem('kryptle_data', JSON.stringify({
          id: data.id,
          avgTimeSeconds: data.avgTimeSeconds,
          numbersToUse: data.numbersToUse,
          target: data.targetNumber,
          numUsedObj: numUsedObjTemp,
          seconds: 0,
          equation: '',
          validSolutions: [],
          playedToday: true
        }))
      }


    } catch(error) {
      console.log(error);
      setNumSet(['4', '9', '23', '5', '22'])
      setTarget('6');

      let numUsedObjTemp = {};

        ['4', '9', '23', '5', '22'].forEach((num, i) => {
          numUsedObjTemp[i] = {
            value: num,
            used: false
          }
        })
        
        setNumUsedObj(numUsedObjTemp);
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

    </>
  );
}

export default GameContainer;