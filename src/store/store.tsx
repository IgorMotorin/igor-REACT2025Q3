import { configureStore } from '@reduxjs/toolkit';
import checkReducer from './checkSlice';
import { booksApi } from '../services/booksApi';
import { setupListeners } from '@reduxjs/toolkit/query';

export const store = configureStore({
  reducer: { checkReducer, [booksApi.reducerPath]: booksApi.reducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(booksApi.middleware),
});

setupListeners(store.dispatch);
