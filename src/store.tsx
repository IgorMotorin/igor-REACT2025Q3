import { configureStore } from '@reduxjs/toolkit';
import checkReducer from './checkSlice';

export const store = configureStore({
  reducer: checkReducer,
});
