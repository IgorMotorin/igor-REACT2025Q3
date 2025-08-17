import { createSlice } from '@reduxjs/toolkit';

export interface CheckState {
  value: { [id: string]: boolean };
  page: string;
  search: string;
  input: string;
  books: IBooks;
  theme: string;
}

export type type_books = {
  id: string;
  title: string;
  authors: [{ name: string }];
};

export interface IBooks {
  [key: number]: type_books;
}

const initialState: CheckState = {
  value: {},
  page: '1',
  search: '',
  input: '',
  books: { 0: { id: '0', title: '', authors: [{ name: '' }] } },
  theme: 'light',
};

export const checkSlice = createSlice({
  name: 'check',
  initialState,
  reducers: {
    onCheck: (state, action) => {
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

    onPage: (state, action) => {
      state.page = action.payload;
    },
    onSearch: (state, action) => {
      state.search = action.payload;
    },
    onInput: (state, action) => {
      state.input = action.payload;
    },
    onBooks: (state, action) => {
      state.books = { ...state.books, ...action.payload };
    },
    onTheme: (state, action) => {
      state.theme = action.payload;
    },
  },
});

export const { onCheck, onPage, onSearch, onInput, onBooks, onTheme } =
  checkSlice.actions;

export default checkSlice.reducer;
