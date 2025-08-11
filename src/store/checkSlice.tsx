import { createSlice } from '@reduxjs/toolkit';

export interface CheckState {
  value: { [id: number]: boolean };
  books: {
    [key: number]: { id: number; title: string; authors: [{ name: string }] };
  };
}

export type type_books = {
  id: number;
  title: string;
  authors: [{ name: string }];
};

export interface Ibooks {
  [key: number]: type_books;
}

const initialState: CheckState = {
  value: {},
  books: { 0: { id: 0, title: 'string', authors: [{ name: 'string' }] } },
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
      const obj: Ibooks = {
        0: { id: 0, title: 'string', authors: [{ name: 'string' }] },
      };
      action.payload.map((item: type_books) => {
        obj[item.id] = item;
      });

      state.books = { ...state.books, ...obj };
    },
  },
});

export const { on, addBooks } = checkSlice.actions;

export default checkSlice.reducer;
