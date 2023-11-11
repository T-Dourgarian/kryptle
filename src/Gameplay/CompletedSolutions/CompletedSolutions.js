



import React from 'react';
import './CompletedSolutions.css'

function CompletedSolutions(props) {
  let validSolutions = props.validSolutions;

  return (
    <>
        - Completed Solutions - 
        {
        validSolutions && validSolutions.map((s,i) =>
            <div key={i} >
            { s }
            </div>
        )
        }
    </>
  );
}

export default CompletedSolutions;