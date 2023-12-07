import { createSlice } from '@reduxjs/toolkit';


export const UserSlice = createSlice({
  name: 'User',
  initialState: {
    username: '',
    userId: ''
  },
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
