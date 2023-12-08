import { createSlice } from '@reduxjs/toolkit';


const defaultState = {
  username: '',
  userId: ''
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
    }
  },
});

export const {
  updateUserData,
} = UserSlice.actions;

export default UserSlice.reducer;
