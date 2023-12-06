import { createSlice } from '@reduxjs/toolkit';
import { FALLBACK_EQUATION } from '../util/constants/fallbackEquation';
import { Formatter } from '../util/Formatter';

const defaultState = {
  username: '',
  userId: ''
};


const initialState = loadInitialState();

export const UserSlice = createSlice({
  name: 'User',
  defaultState,
  reducers: {
    
  },
});

export const {
  playButtonClicked,

} = UserSlice.actions;

export default UserSlice.reducer;
