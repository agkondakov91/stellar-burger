import { configureStore } from '@reduxjs/toolkit';
import { rootReducer, RootState } from './store';

describe('[Тест]: инициализация rootReducer', () => {
  it('Инициализация с правильным состоянимем по умолчанию', () => {
    const store = configureStore({
      reducer: rootReducer,
      devTools: process.env.NODE_ENV !== 'production'
    });

    const state = store.getState();

    const expectedInitialStates = rootReducer(undefined, {
      type: '@@INIT'
    });

    (Object.keys(expectedInitialStates) as (keyof RootState)[]).forEach(
      (key) => {
        expect(state[key]).toBeDefined();
        expect(state[key]).toEqual(expectedInitialStates[key]);
      }
    );
  });
});
