import React from 'react';
import './SolutionInput.css'

function SolutionInput(props) {
  let equation = props.equation;
  let solution = props.solution;
  let handleUserInput = props.handleUserInput;
  let handleUserSubmit = props.handleUserSubmit;
  let errorMessage = props.errorMessage

  return (
    <>
    <div className='inputAndSolutionContainer'> 
    <input 
        value={equation} 
        onChange={handleUserInput}
        className='solutionInput'
    />
    

    <div className='solutionDiv'>
        = { solution === '' ? '?' : solution } 
    </div>

    </div>

    <button 
        className='validateButton' onClick={handleUserSubmit}>Validate
    </button>

    <div className='errorMessageDiv'>
          { errorMessage }
    </div>

    </>


  );
}

export default SolutionInput;