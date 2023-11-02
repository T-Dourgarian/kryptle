import React, { useEffect, useState } from 'react';
import './App.css';
import Mexp from 'math-expression-evaluator';
import axios from 'axios';

function App() {

  const [numSet, setNumSet] = useState([]);
  const [numUsedObj, setNumUsedObj] = useState({});
  const [target, setTarget] = useState('');
  const [equation, setEquation] = useState('');
  const [solution, setSolution] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [validSolutions, setValidSolutions] = useState([]);

  const [seconds, setSeconds] = useState(0);

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  const formattedTime = `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;

  const mexp = new Mexp();
  const numbersRE = /\b\d+\b/g;
  

  useEffect(() => {
    gatherTodaysNumbers();

    const interval = setInterval(() => {
      setSeconds(prevSeconds => prevSeconds + 1);
    }, 1000);

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  useEffect(()=>{
    if (errorMessage) {
      setTimeout(function() {
      setErrorMessage('')
        }, 3000);
    }
  },[errorMessage])


  const handleCalculate = () => {
    try {
      setSolution(mexp.eval(equation))
    } catch (error) {
      // setSolution('Invalid mathamatical expression');
    }
  }

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
  const gatherTodaysNumbers = async () => {
    try {

      const response = await axios.get(`${process.env.REACT_APP_API_URL}/dailykrypto`);

      const { data } = response;

      if (data && data.numbersToUse && data.targetNumber) {

        let numUsedObjTemp = {};

        data.numbersToUse.forEach((num, i) => {
          numUsedObjTemp[i] = {
            value: num,
            used: false
          }
        })
        
        setNumUsedObj(numUsedObjTemp);


         setNumSet(data.numbersToUse);
         setTarget(data.targetNumber);
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


  const validate = () => {

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
      if (!numSet.includes(Number(numsUsed[i]))) {
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
    setValidSolutions([...validSolutions, `${equation} = ${target} | ${formattedTime}`]);
    setEquation('');
    return true;

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
            onChange={v => {setEquation(v.target.value)}}
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

        <div>{formattedTime}</div>

        - Completed Solutions - 
        {
          validSolutions && validSolutions.map((s,i) =>
            <div key={i} >
              { s }
            </div>
          )
        }


      </header>
    </div>
  );
}

export default App;
