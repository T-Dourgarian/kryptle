import { configureStore, applyMiddleware } from '@reduxjs/toolkit';
import GameReducer from './redux/GameSlice';
import MenuReducer from './redux/MenuSlice'
import localStorageMiddleware from './LocalStorageMiddleware';

const store = configureStore({
  reducer: {
    game: GameReducer,
    menu: MenuReducer
  },
  middleware: [localStorageMiddleware],
});

export default store;
