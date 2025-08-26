import { configureStore, type EnhancedStore } from '@reduxjs/toolkit';
import checkReducer, {
  onSubmitData,
  onControlFormChange,
  onUncontrolFormChange,
} from '../store/checkSlice';

import type { FormFieldsState } from '../component/UncontrolledForm.tsx';

// Создаем тестовое состояние для onSubmitData
const testSubmitData: FormFieldsState = {
  name: 'test',
  email: 'test@example.com',
  password: 'test message',
  age: 10,
  'password-confirm': 'string',
  gender: 'string',
  terms: 'string',
  file: 'string',
  country: 'string',
};

describe('checkSlice', () => {
  let store: EnhancedStore;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        check: checkReducer,
      },
    });
  });

  test('начальное состояние корректно', () => {
    expect(store.getState().check).toEqual({
      value: [],
      controlForm: false,
      uncontrolForm: false,
    });
  });

  test('onSubmitData добавляет данные в state', () => {
    store.dispatch(onSubmitData({ submitDataState: testSubmitData }));

    expect(store.getState().check.value).toEqual([testSubmitData]);
  });

  test('onSubmitData добавляет несколько наборов данных', () => {
    store.dispatch(onSubmitData({ submitDataState: testSubmitData }));
    store.dispatch(onSubmitData({ submitDataState: testSubmitData }));

    expect(store.getState().check.value).toHaveLength(2);
    expect(store.getState().check.value).toEqual([
      testSubmitData,
      testSubmitData,
    ]);
  });

  test('onControlFormChange обновляет controlForm', () => {
    store.dispatch(onControlFormChange(true));

    expect(store.getState().check.controlForm).toBe(true);

    store.dispatch(onControlFormChange(false));
    expect(store.getState().check.controlForm).toBe(false);
  });

  test('onUncontrolFormChange обновляет uncontrolForm', () => {
    store.dispatch(onUncontrolFormChange(true));

    expect(store.getState().check.uncontrolForm).toBe(true);

    store.dispatch(onUncontrolFormChange(false));
    expect(store.getState().check.uncontrolForm).toBe(false);
  });

  test('все редуксеры работают вместе', () => {
    store.dispatch(onSubmitData({ submitDataState: testSubmitData }));
    store.dispatch(onControlFormChange(true));
    store.dispatch(onUncontrolFormChange(true));

    expect(store.getState().check).toEqual({
      value: [testSubmitData],
      controlForm: true,
      uncontrolForm: true,
    });
  });
});
