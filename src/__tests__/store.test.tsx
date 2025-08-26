import { configureStore, type EnhancedStore } from '@reduxjs/toolkit';
import checkReducer from '../store/checkSlice';
import countryReducer from '../store/countrySlice';

// Создаем тестовую конфигурацию store
const testStore = configureStore({
  reducer: {
    check: checkReducer,
    country: countryReducer,
  },
});

describe('Store configuration tests', () => {
  let store: EnhancedStore;

  beforeEach(() => {
    store = testStore;
  });

  test('store корректно инициализирован', () => {
    expect(store).toBeTruthy();
    expect(typeof store.getState).toBe('function');
    expect(typeof store.dispatch).toBe('function');
    expect(typeof store.subscribe).toBe('function');
  });

  test('проверяет наличие всех редьюсеров', () => {
    const state = store.getState();
    expect(state).toHaveProperty('check');
    expect(state).toHaveProperty('country');
  });

  test('проверка начального состояния checkReducer', () => {
    const checkState = store.getState().check;
    expect(checkState).toEqual({
      value: [],
      controlForm: false,
      uncontrolForm: false,
    });
  });

  test('проверка комбинированного состояния', () => {
    const state = store.getState();
    expect(state).toHaveProperty('check');
    expect(state).toHaveProperty('country');
    expect(state.check).toBeDefined();
    expect(state.country).toBeDefined();
  });
});
