import React from 'react';
import { useDispatch } from 'react-redux';
import './HowToPlay.css';
import { playButtonClicked } from '../GameSlice';

function HowToPlay() {
  const dispatch = useDispatch();
  const onPlayClicked = () => {
    dispatch(playButtonClicked());
  };

  return (
    <div className="Container">
      <h1 className="Header">Kryptle</h1>

      <button className="HowToPlayButton">How To Play</button>

      <p className="HowToPlayP">
        Kryptle is a daily math puzzle in which you are given five numbers
        between 1 and 25 and must use all five numbers to form a mathamatical
        equation whose answer is equal to a 6th number.
      </p>
      <p className="HowToPlayP">e.g.</p>

      <div className="ExampleNumbers">16 4 13 12 8 = 19</div>

      <p className="HowToPlayP">has a solution</p>

      <div className="ExampleSolution">(12 / 4) * (16 / 8) + 13 = 19</div>

      <p className="HowToPlayP">
        Every set of numbers will have one unique solution if not many more. You
        are also able to use more complex mathematical operations...
      </p>

      <p className="HowToPlayP">
        Square Root: root(16) = 4 | Exponent: 4^2 = 16
      </p>

      <div className="PlayButtonContainer">
        <button onClick={onPlayClicked} className="PlayButton">
          PLAY
        </button>
      </div>
    </div>
  );
}

export default HowToPlay;
