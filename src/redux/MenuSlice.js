import { createSlice } from '@reduxjs/toolkit';

const defaultState = {
  menuSelection: 'MenuOptions'
};



export const MenuSelection = createSlice({
  name: 'MenuSelection',
  defaultState,
  reducers: {
    updateMenuSelection: (state, action) => {
        state.menuSelection = action.payload.menuSelection;
    },
  },
});

export const {
    updateMenuSelection,
} = MenuSelection.actions;

export default MenuSelection.reducer;
