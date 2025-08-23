import { configureStore } from '@reduxjs/toolkit';
import checkReducer from './checkSlice';
import { setupListeners } from '@reduxjs/toolkit/query';

export const store = configureStore({
  reducer: { checkReducer },
});

setupListeners(store.dispatch);
