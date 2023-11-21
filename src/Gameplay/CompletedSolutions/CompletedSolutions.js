import React from 'react';
import './CompletedSolutions.css';

function CompletedSolutions(props) {
  let validSolutions = props.validSolutions;

  return (
    <>
      <div className="CSLabel">Completed Solutions</div>
      <div className="CSListContainer">
        {validSolutions && validSolutions.map((s, i) => <div key={i}>{s}</div>)}
      </div>
    </>
  );
}

export default CompletedSolutions;
