import { createSlice } from '@reduxjs/toolkit';
import { countries } from '../../src/data/countries.json';

export interface Country {
  name: string;
}

export type CountryState = Country[];

const initialState = (): CountryState => countries;

const countrySlice = createSlice({
  name: 'country',
  initialState,
  reducers: {},
});

export default countrySlice.reducer;
