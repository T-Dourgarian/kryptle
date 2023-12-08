import { configureStore, applyMiddleware } from '@reduxjs/toolkit';
import GameReducer from './redux/GameSlice';
import MenuReducer from './redux/MenuSlice'
import localStorageMiddleware from './LocalStorageMiddleware';
import UserReducer from './redux/UserSlice';

const store = configureStore({
  reducer: {
    game: GameReducer,
    menu: MenuReducer,
    user: UserReducer
  },
  middleware: [localStorageMiddleware],
});

export default store;
