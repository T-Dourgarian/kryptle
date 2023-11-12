import { createSlice } from '@reduxjs/toolkit'

export const GameSlice = createSlice({
  name: 'Game',
  initialState: {
    playedToday: false,
    avgTimeSeconds: 0,
    kryptoId: null,
    numUsedObj: {},
    numbersToUse: [],
    seconds: 0,
    target: "",
    validSolutions: [],
    pageLoaded: false,
    equation: '',
    errorMessage: '',
    solveStreak: 0
  },
  reducers: {
    countSeconds: (state, action) => {
      state.seconds = state.seconds + 1;
    },
    solutionUpdated: (state, action) => {
      state.solution = action.payload.solution;
    },
    targetUpdated: (state, action) => {
      state.target = action.payload.target;
    },
    numbersToUseUpdated: (state, action) => {
      state.numbersToUse = action.payload.numbersToUse;
    },
    numUsedObjUpdated: (state, action) => {
      state.numUsedObj = action.payload.numUsedObj;
    },
    playButtonClicked: (state, action) => {
      state.playedToday = action.payload.playedToday;
    },
    initFromLocalStorage: (state, action) => {
        state.playedToday = action.payload.playedToday;
        state.avgTimeSeconds = action.payload.avgTimeSeconds;
        state.kryptoId = action.payload.kryptoId;
        state.numUsedObj = action.payload.numUsedObj;
        state.numbersToUse = action.payload.numbersToUse;
        state.seconds = action.payload.seconds;
        state.target = action.payload.target;
        state.validSolutions = action.payload.validSolutions;
        state.equation = action.payload.equation;
        state.pageLoaded = true;
        state.solveStreak = action.payload.solveStreak
    },
    equationUpdated: (state, action) => {
      state.equation = action.payload.equation;
    },
    validationErrorThrown: (state, action) => {
      state.errorMessage = action.payload.error;
    },
    errorMessageDone: (state, action) => {
      state.errorMessage =  '';
    },
    validSolutionSubmitted: (state, action) => {
      state.validSolutions = action.payload.validSolutions;
    },
    postSolutionSuccess: (state, action) => {
      state.avgTimeSeconds = action.payload.avgTimeSeconds; 
    },
    solveStreakUpdated: (state, action) => {
      state.solveStreak = action.payload.solveStreak
    }
  },
})

export const { 
  playButtonClicked, 
  initFromLocalStorage, 
  equationUpdated, 
  validationErrorThrown, 
  errorMessageDone, 
  validSolutionSubmitted, 
  postSolutionSuccess,
  numbersToUseUpdated,
  numUsedObjUpdated,
  targetUpdated,
  solutionUpdated,
  solveStreakUpdated
 } = GameSlice.actions

export default GameSlice.reducer