import { createSlice } from '@reduxjs/toolkit';

export interface CheckState {
  value: { '1': { title: string; id: number; authors: { name: string }[] }[] };
}

const initialState: CheckState = {
  value: { '1': [{ title: 'string', id: 1, authors: [{ name: 'string' }] }] },
};

export const checkSlice = createSlice({
  name: 'check',
  initialState,
  reducers: {
    on: (state, action) => {
      state.value[action.payload.page][action.payload.book].flag =
        !state.value[action.payload.page][action.payload.book].flag;
    },

    addPage: (state, action) => {
      state.value = { ...action.payload, ...state.value };
    },
  },
});

export const { on, addPage } = checkSlice.actions;

export default checkSlice.reducer;
