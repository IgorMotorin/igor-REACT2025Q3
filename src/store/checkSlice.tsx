import { createSlice } from '@reduxjs/toolkit';

export interface CheckState {
  value: { [id: string]: boolean };
  page: string;
  search: string;
  input: string;
}

export type type_books = {
  id: string;
  title: string;
  authors: [{ name: string }];
};

export interface Ibooks {
  [key: number]: type_books;
}

const initialState: CheckState = {
  value: {},
  page: '1',
  search: '',
  input: '',
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
  },
});

export const { onCheck, onPage, onSearch, onInput } = checkSlice.actions;

export default checkSlice.reducer;
