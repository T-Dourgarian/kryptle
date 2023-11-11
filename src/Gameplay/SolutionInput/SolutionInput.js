import React from 'react';
import './SolutionInput.css'

function SolutionInput(props) {
  let equation = props.equation;
  let solution = props.solution;
  let handleInput = props.handleInput;
  let validate = props.validate;
  let errorMessage = props.errorMessage


  return (
    <>
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

    <button 
        className='validateButton' onClick={validate}>Validate
    </button>

    <div className='errorMessageDiv'>
          { errorMessage }
    </div>

    </>


  );
}

export default SolutionInput;