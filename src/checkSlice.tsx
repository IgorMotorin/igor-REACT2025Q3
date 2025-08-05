import { createSlice } from '@reduxjs/toolkit';

export interface CheckState {
  value: { [id: number]: boolean };
  books: [];
}

const initialState: CheckState = {
  value: {},
  books: [],
};

export const checkSlice = createSlice({
  name: 'check',
  initialState,
  reducers: {
    on: (state, action) => {
      if (state.value[action.payload.id]) {
        const arr = Object.entries(state.value);
        const arrFilter = arr.filter(
          (item) => item[0] !== String(action.payload.id)
        );

        state.value = Object.fromEntries(arrFilter);
        return;
      }
      state.value[action.payload.id] = !state.value[action.payload.id];
    },

    addBooks: (state, action) => {
      state.books = [...state.books, ...action.payload];
    },
  },
});

export const { on, addBooks } = checkSlice.actions;

export default checkSlice.reducer;
