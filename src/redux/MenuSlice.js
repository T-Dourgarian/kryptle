import { createSlice } from '@reduxjs/toolkit';


export const MenuSlice = createSlice({
  name: 'Menu',
  initialState: {
    page: 'MenuOptions'
  },
  reducers: {
    updateMenuSelection: (state, action) => {
        state.page = action.payload.page;
    },
  },
});

export const {
    updateMenuSelection,
} = MenuSlice.actions;

export default MenuSlice.reducer;
