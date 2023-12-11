import { createSlice } from '@reduxjs/toolkit';

const defaultState = {
  page: 'Game'
}

function loadInitialState() {
  const storedState = localStorage.getItem('navigation');
  return {
    ...defaultState,
    ...JSON.parse(storedState),
  };
}

const initialState = loadInitialState();

export const NavtigationSlice = createSlice({
  name: 'Navigation',
  initialState: initialState,
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
