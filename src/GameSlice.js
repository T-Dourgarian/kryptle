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
  },
  reducers: {
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
      state.validSolutions = [...state.validSolutions, action.payload]
      state.equation = '';
    },
    postSolutionSuccess: (state, action) => {
      state.avgTimeSeconds = action.payload.avgTimeSeconds; // Might be wrong haven't tested with server
    }
  },
})

export const { playButtonClicked, initFromLocalStorage, equationUpdated, validationErrorThrown, errorMessageDone, validSolutionSubmitted, postSolutionSuccess } = GameSlice.actions

export default GameSlice.reducer