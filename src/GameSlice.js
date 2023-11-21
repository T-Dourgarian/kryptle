import { createSlice } from '@reduxjs/toolkit';
import { FALLBACK_EQUATION } from './util/constants/fallbackEquation';
import { Formatter } from './util/Formatter';

const defaultState = {
  playedToday: false,
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
    countSeconds: (state, action) => {
      state.seconds = state.seconds + 1;
    },
    solutionUpdated: (state, action) => {
      state.solution = action.payload.solution;
    },
    numUsedObjUpdated: (state, action) => {
      state.numUsedObj = action.payload.numUsedObj;
    },
    playButtonClicked: (state, action) => {
      state.playedToday = true;
    },
    initFromLocalStorage: (state, action) => {
      state.playedToday = action.payload.playedToday;
      state.avgTimeSeconds = action.payload.avgTimeSeconds ?? 0;
      state.kryptoId = action.payload.kryptoId;
      state.numUsedObj = action.payload.numUsedObj;
      state.numbersToUse = action.payload.numbersToUse;
      state.seconds = action.payload.seconds;
      state.target = action.payload.target;
      state.validSolutions = action.payload.validSolutions;
      state.equation = action.payload.equation;
      state.pageLoaded = true;
      state.solveStreak = action.payload.solveStreak;
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
      state.avgTimeSeconds = action.payload.seconds;
    },
    solveStreakUpdated: (state, action) => {
      state.solveStreak = action.payload.solveStreak;
    },
    currentSecondsIncremented: (state, actions) => {
      state.currentSeconds += 1;
    },
    getDailyKryptoSuccess: (state, action) => {
      state.avgTimeSeconds = action.payload.avgTimeSeconds ?? 0;
      state.kryptoId = action.payload.id;
      state.numbersToUse = action.payload.numbersToUse;
      state.target = action.payload.targetNumber;
      state.numUsedObj = Formatter.formatNumUsedObj(
        action.payload.numbersToUse
      );
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
  playButtonClicked,
  initFromLocalStorage,
  equationUpdated,
  validateSubmissionSuccess,
  validateSubmissionFailure,
  errorMessageDone,
  postSolutionSuccess,
  numUsedObjUpdated,
  solutionUpdated,
  solveStreakUpdated,
  currentSecondsIncremented,
  getDailyKryptoSuccess,
  getDailyKryptoFailure,
  confettiTurnedOff,
} = GameSlice.actions;

export default GameSlice.reducer;
