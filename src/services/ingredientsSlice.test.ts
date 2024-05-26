import {
  reducerIngredients,
  getIngredients,
  initialState
} from './ingredientsSlice';
import { TIngredient } from '@utils-types';

describe('[Тест]: проверка редьюсеров ingredientsSlice', () => {
  it('Обработка начального состояния', () => {
    expect(reducerIngredients(undefined, { type: 'UNKNOWN_ACTION' })).toEqual(
      initialState
    );
  });

  it('Обработка состояния pending', () => {
    const action = { type: getIngredients.pending.type };
    const state = reducerIngredients(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isLoading: true,
      error: null
    });
  });

  it('Обработка состояния rejected', () => {
    const error = { message: 'Failed to fetch ingredients' };
    const action = { type: getIngredients.rejected.type, error };
    const state = reducerIngredients(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isLoading: false,
      error: error.message
    });
  });

  it('Обработка состояния fulfilled', () => {
    const mockIngredients: TIngredient[] = [
      {
        _id: '643d69a5c3f7b9001cfa093c',
        name: 'Краторная булка N-200i',
        type: 'bun',
        proteins: 80,
        fat: 24,
        carbohydrates: 53,
        calories: 420,
        price: 1255,
        image: 'https://code.s3.yandex.net/react/code/bun-02.png',
        image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png'
      }
    ];
    const action = {
      type: getIngredients.fulfilled.type,
      payload: mockIngredients
    };
    const state = reducerIngredients(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isLoading: false,
      ingredients: mockIngredients,
      error: null
    });
  });
});
