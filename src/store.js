import { configureStore, applyMiddleware } from '@reduxjs/toolkit';
import GameReducer from './GameSlice';
import localStorageMiddleware from './LocalStorageMiddleware';

const store = configureStore({
  reducer: {
    game: GameReducer,
  },
  middleware: [localStorageMiddleware],
});

export default store;