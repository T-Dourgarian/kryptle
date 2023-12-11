import { createSlice } from '@reduxjs/toolkit';


export const NavtigationSlice = createSlice({
  name: 'Navigation',
  initialState: {
    page: 'Game'
  },
  reducers: {
    routeToNewPage: (state, action) => {
        state.page = action.payload.page;
    },
  },
});

export const {
    routeToNewPage,
} = NavtigationSlice.actions;

export default NavtigationSlice.reducer;
