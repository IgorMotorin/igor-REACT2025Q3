import { configureStore } from '@reduxjs/toolkit';
import checkReducer from './checkSlice';
import { setupListeners } from '@reduxjs/toolkit/query';
import countryReducer from './countrySlice.tsx';

export const store = configureStore({
  reducer: { checkReducer, countryReducer },
});

setupListeners(store.dispatch);
