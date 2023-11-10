import React, { useEffect, useState } from 'react';
import './App.css';
import Mexp from 'math-expression-evaluator';
import axios from 'axios';
import Cookies from 'universal-cookie';
import Confetti from 'react-confetti'


function App() {
  
  if (window.localStorage.getItem('kryptle_data') == null) {
    window.localStorage.setItem('kryptle_data',JSON.stringify({
      numbersToUse: [],
      numUsedObj: {},
      target: '',
      equation: '',
      validSolutions:[],
      kryptoId: null,
      avgTimeSeconds: '',
      seconds: 0
    }))
  }
  
  const [numSet, setNumSet] = useState(JSON.parse(window.localStorage.getItem('kryptle_data')).numbersToUse || []);
  const [numUsedObj, setNumUsedObj] = useState(JSON.parse(window.localStorage.getItem('kryptle_data')).numUsedObj || {});
  const [target, setTarget] = useState(JSON.parse(window.localStorage.getItem('kryptle_data')).target || '');
  const [equation, setEquation] = useState(JSON.parse(window.localStorage.getItem('kryptle_data')).equation || '');
  const [solution, setSolution] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [validSolutions, setValidSolutions] = useState(JSON.parse(window.localStorage.getItem('kryptle_data')).validSolutions || []);
  const [kryptoId, setKryptoId] = useState(JSON.parse(window.localStorage.getItem('kryptle_data')).id || null);
  const [avgTimeSeconds, setAvgTimeSeconds] = useState(JSON.parse(window.localStorage.getItem('kryptle_data')).avgTimeSeconds || 0);
  const [seconds, setSeconds] = useState(JSON.parse(window.localStorage.getItem('kryptle_data')).seconds || 0);
  const [confettiBool, setConfettiBool] = useState(false);
  
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  const formattedTime = `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  
  const formattedTimeAvg = `${Math.floor(avgTimeSeconds / 60)}:${ ( avgTimeSeconds % 60 ) < 10 ? '0' : ''}${ avgTimeSeconds % 60 }`;
  
  const mexp = new Mexp();
  const numbersRE = /\b\d+\b/g;
  
  const startConfetti = () => {
    setConfettiBool(true);
    setTimeout(() => {
      setConfettiBool(false);
    }, 4000); // 2000 milliseconds = 2 seconds
  };

  // update avgTimeSconds in local storage when it changes in state
  useEffect(() => {
    window.localStorage.setItem('kryptle_data',JSON.stringify({
      ...JSON.parse(window.localStorage.getItem('kryptle_data')),
      avgTimeSeconds
    }))
  }, [avgTimeSeconds])


  // gather daily krypto data
  // start counter
  useEffect(() => {

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
  }, []);

  // error messaging for faulty equations
  useEffect(()=>{
    if (errorMessage) {
      setTimeout(function() {
      setErrorMessage('')
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

    window.localStorage.setItem('kryptle_data', JSON.stringify({
      ...JSON.parse(window.localStorage.getItem('kryptle_data')),
      equation: equation
    }))

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
        
        setNumUsedObj(numUsedObjTemp);
        setKryptoId(data.id);
        setAvgTimeSeconds(data.avgTimeSeconds);
        setNumSet(data.numbersToUse);
        setTarget(data.targetNumber);
        setSeconds(0);
        setValidSolutions([]);

        window.localStorage.setItem('kryptle_data', JSON.stringify({
          id: data.id,
          avgTimeSeconds: data.avgTimeSeconds,
          numbersToUse: data.numbersToUse,
          target: data.targetNumber,
          numUsedObj: numUsedObjTemp,
          seconds: 0,
          validSolutions: []
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

  const validate = async () => {

    // checks that solution is a valid mathamatical equation
    try {
      setSolution(mexp.eval(equation));
    } catch(error) {
      setErrorMessage('Invalid mathamatical equation');
      return false;
    }

    let numsUsed = equation.match(numbersRE);
    
    if (!numsUsed) return false;

    // checks if solution uses more or less that 5 numbers
    if (numsUsed.length > 5) {
      setErrorMessage('Invalid: There are too many numbers in your solution');
      return false;
    } else if (numsUsed.length < 5) {
      setErrorMessage('Invalid: You must use all 5 numbers individually');
      return false;
    }

    // checks that solution uses correct 5 numbers
    for (let i = 0; i < numSet.length; i++) {
      if (!numSet.includes(numsUsed[i])) {
        setErrorMessage(`Invalid: ${numsUsed[i]} is not a valid number`);
        return false;
      }
    }

    // checks that solution is correct
    if (Number(target) !== Number(solution)) {
      setErrorMessage(`Invalid: This solution does not equal ${target}`);
      return false;
    }

    // checks if solution is a duplicate
    if (validSolutions.includes(equation)) {
      setErrorMessage(`Invalid: You have already found this solution`);
      return false
    }

    startConfetti()
    
    window.localStorage.setItem('kryptle_data', JSON.stringify({
      ...JSON.parse(window.localStorage.getItem('kryptle_data')),
      validSolutions: [...validSolutions, `${equation} = ${target} | ${formattedTime}`],
      equation: ''
    }));
    
    setValidSolutions([...validSolutions, `${equation} = ${target} | ${formattedTime}`]);
    setEquation('');

    try { 
      const { data }  = await axios.post(`${process.env.REACT_APP_API_URL}/solution`,
      {
        id: kryptoId,
        solution: equation,
        solutionSeconds: seconds
      });

      setAvgTimeSeconds(data.avgTimeSeconds);

    } catch(error) {
      console.log(error)
    }

    return true;

  }

  const handleInput = (e) => {

    if (!e.target.value.includes('.')) {
      setEquation(e.target.value);
      window.localStorage.setItem('kryptle_data', JSON.stringify({
        ...JSON.parse(window.localStorage.getItem('kryptle_data')),
        equation: e.target.value
      }))
    }

  }


  return (
    <div className="App">
      <header className="App-header">

        <div className='instructionsHeaderDiv'>

          <div>
            {
              numSet && numSet.map((num, i) => 
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

        <div className='inputAndSolutionContainer'> 
          <input 
            value={equation} 
            onChange={handleInput}
            className='solutionInput'
          />
            
          
        <div className='solutionDiv'>
        = { solution === '' ? '?' : solution } 
        </div>
          
        </div>

        <button className='validateButton' onClick={validate}>Validate</button>

        <div className='errorMessageDiv'>
          { errorMessage }
        </div>

        <div> Average Time for Today's Kryptle - {formattedTimeAvg}</div>

        <div>{formattedTime}</div>

        - Completed Solutions - 
        {
          validSolutions && validSolutions.map((s,i) =>
            <div key={i} >
              { s }
            </div>
          )
        }

        {
          confettiBool && <Confetti />
        }

      </header>

      <pre>{JSON.stringify(numUsedObj,null,2)}</pre>
    </div>
  );
}

export default App;
