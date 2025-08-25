import { createSlice } from '@reduxjs/toolkit';
import type { FormFieldsState } from '../component/UncontrolledForm.tsx';

export interface CheckState {
  value: FormFieldsState[];
  controlForm: boolean;
  uncontrolForm: boolean;
}

const initialState: CheckState = {
  value: [],
  controlForm: false,
  uncontrolForm: false,
};

export const checkSlice = createSlice({
  name: 'check',
  initialState,
  reducers: {
    onSubmitData: (state, action) => {
      state.value = [...state.value, action.payload.submitDataState];
    },
    onControlFormChange: (state, action) => {
      state.controlForm = action.payload;
    },
    onUncontrolFormChange: (state, action) => {
      state.uncontrolForm = action.payload;
    },
  },
});

export const { onSubmitData, onControlFormChange, onUncontrolFormChange } =
  checkSlice.actions;

export default checkSlice.reducer;
