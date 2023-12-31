import { createSlice } from '@reduxjs/toolkit';


const defaultState = {
  username: '',
  userId: '',
  stats: {
    avg_solve_time: 0,
    total_solves: 0,
    total_solves_unique: 0,
    daily_streak: 0
  },
  playAsGuest: false
};

function loadInitialState() {
  const storedState = localStorage.getItem('user_data');
  return {
    ...defaultState,
    ...JSON.parse(storedState),
  };
}

const initialState = loadInitialState();


export const UserSlice = createSlice({
  name: 'User',
  initialState,
  reducers: {
    updateUserData: (state, action) => {
      state.username = action.payload.username;
      state.userId = action.payload.userId;
    },
    updateUserStatsData: (state, action) => {
      state.stats.avg_solve_time = action.payload.avg_solve_time;
      state.stats.total_solves = action.payload.total_solves;
      state.stats.total_solves_unique = action.payload.total_solves_unique;
      state.stats.daily_streak = action.payload.daily_streak;
    },
    updatePlayAsGuest: (state, action) => {
      state.playAsGuest = action.payload.playAsGuest;
    }
  },
});

export const {
  updateUserData,
  updateUserStatsData,
  updatePlayAsGuest
} = UserSlice.actions;

export default UserSlice.reducer;
