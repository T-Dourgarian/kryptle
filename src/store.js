import { configureStore, applyMiddleware } from '@reduxjs/toolkit';
import GameReducer from './redux/GameSlice';
import MenuReducer from './redux/MenuSlice'
import localStorageMiddleware from './LocalStorageMiddleware';
import UserReducer from './redux/UserSlice';
import NavigationReducer from './redux/NavigationSlice';

const store = configureStore({
  reducer: {
    game: GameReducer,
    menu: MenuReducer,
    user: UserReducer,
    navigation: NavigationReducer
  },
  middleware: [localStorageMiddleware],
});

export default store;
