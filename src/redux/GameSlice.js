import { createSlice } from '@reduxjs/toolkit';
import { FALLBACK_EQUATION } from '../util/constants/fallbackEquation';
import { Formatter } from '../util/Formatter';

const defaultState = {
  avgTimeSeconds: 0,
  kryptoId: null,
  numUsedObj: {},
  numbersToUse: [],
  target: '',
  validSolutions: [],
  pageLoaded: false,
  equation: '',
  errorMessage: '',
  solveStreak: 0,
  currentSeconds: 0,
  solution: '',
  isConfettiOn: false,
};

function loadInitialState() {
  const storedState = localStorage.getItem('kryptle_data');
  return {
    ...defaultState,
    ...JSON.parse(storedState),
  };
}

const initialState = loadInitialState();

export const GameSlice = createSlice({
  name: 'Game',
  initialState,
  reducers: {
    resetGameData: () => defaultState,
    updateGameDataFromUser: ( state, action ) => {
      state.solveStreak = action.payload.dailyStreak;
      state.validSolutions = action.payload.validSolutions;
    },
    solutionUpdated: (state, action) => {
      state.solution = action.payload.solution;
    },
    numUsedObjUpdated: (state, action) => {
      state.numUsedObj = action.payload.numUsedObj;
    },
    equationUpdated: (state, action) => {
      state.equation = action.payload.equation;
    },
    validateSubmissionSuccess: (state, action) => {
      state.equation = '';
      state.isConfettiOn = true;
      if (state.validSolutions.length === 0) {
        state.solveStreak += 1;
      }
      state.validSolutions = [
        ...state.validSolutions,
        action.payload.submittedSolution,
      ];
    },
    validateSubmissionFailure: (state, action) => {
      state.errorMessage = action.payload.error;
    },
    errorMessageDone: (state, action) => {
      state.errorMessage = '';
    },
    postSolutionSuccess: (state, action) => {
      state.avgTimeSeconds = action.payload.avgTimeSeconds;
    },
    solveStreakUpdated: (state, action) => {
      state.solveStreak = action.payload.solveStreak;
    },
    currentSecondsIncremented: (state, action) => {
      state.currentSeconds += 1;
    },
    updateCurrentSeconds:(state,action) => {
      state.currentSeconds = action.payload.currentSeconds;
    },
    getDailyKryptoSuccess: (state, action) => {
      state.avgTimeSeconds = action.payload.avgTimeSeconds ?? 0;
      state.numbersToUse = action.payload.numbersToUse;
      state.target = action.payload.targetNumber;
      state.numUsedObj = Formatter.formatNumUsedObj(
        action.payload.numbersToUse
      );
      
      if (state.kryptoId != action.payload.id) {
        state.currentSeconds = 0;
      }

      state.kryptoId = action.payload.id;
    },
    getDailyKryptoFailure: (state, action) => {
      state.numbersToUse = FALLBACK_EQUATION.numbersToUse;
      state.target = FALLBACK_EQUATION.target;
      state.numUsedObj = FALLBACK_EQUATION.numUsedObj;
    },
    confettiTurnedOff: (state, action) => {
      state.isConfettiOn = false;
    },
  },
});

export const {
  resetGameData,
  updateGameDataFromUser,
  playButtonClicked,
  equationUpdated,
  validateSubmissionSuccess,
  validateSubmissionFailure,
  errorMessageDone,
  postSolutionSuccess,
  numUsedObjUpdated,
  solutionUpdated,
  solveStreakUpdated,
  updateCurrentSeconds,
  currentSecondsIncremented,
  getDailyKryptoSuccess,
  getDailyKryptoFailure,
  confettiTurnedOff,
} = GameSlice.actions;

export default GameSlice.reducer;
