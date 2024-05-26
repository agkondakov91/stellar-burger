import {
  reducerConstructorBurger,
  initialState,
  addIngredients,
  moveIngredient,
  removeIngredient,
  clearConstructor
} from './constructorBurgerSlice';
import { TConstructorIngredient } from '@utils-types';

describe('[Тест]: проверка редьюсеров constructorBurgerSlice', () => {
  const mockInitialState = {
    ...initialState,
    bun: {
      id: '1',
      _id: '1',
      name: 'Bun',
      type: 'bun',
      proteins: 5,
      fat: 4,
      carbohydrates: 3,
      calories: 2,
      price: 500,
      image: 'https://code.s3.yandex.net/react/code/bun.png',
      image_large: 'https://code.s3.yandex.net/react/code/bunlarge.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/bunmobile.png'
    },
    ingredients: [
      {
        id: '2',
        _id: '2',
        name: 'Beef',
        type: 'main',
        proteins: 1,
        fat: 2,
        carbohydrates: 4,
        calories: 5,
        price: 600,
        image: 'https://code.s3.yandex.net/react/code/beef.png',
        image_large: 'https://code.s3.yandex.net/react/code/beeflarge.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/beefmobile.png'
      },
      {
        id: '3',
        _id: '3',
        name: 'Tomato',
        type: 'sauce',
        proteins: 10,
        fat: 20,
        carbohydrates: 40,
        calories: 50,
        price: 700,
        image: 'https://code.s3.yandex.net/react/code/tomato.png',
        image_large: 'https://code.s3.yandex.net/react/code/tomatolarge.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/tomatomobile.png'
      }
    ]
  };

  it('Обработка начального состояния', () => {
    expect(
      reducerConstructorBurger(undefined, { type: 'UNKNOWN_ACTION' })
    ).toEqual(initialState);
  });

  it('Добавление ингредиента', () => {
    const newIngredient: TConstructorIngredient = {
      id: '4',
      _id: '4',
      name: 'Cheese',
      type: 'main',
      proteins: 100,
      fat: 200,
      carbohydrates: 400,
      calories: 500,
      price: 7000,
      image: 'https://code.s3.yandex.net/react/code/cheese.png',
      image_large: 'https://code.s3.yandex.net/react/code/cheeselarge.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/cheesemobile.png'
    };
    const action = addIngredients(newIngredient);
    const state = reducerConstructorBurger(mockInitialState, action);
    expect(state.ingredients).toContain(newIngredient);
  });

  it('Перемещение ингредиента', () => {
    const action = moveIngredient({ index: 0, direction: 'down' });
    const state = reducerConstructorBurger(mockInitialState, action);
    expect(state.ingredients[0]).toEqual(mockInitialState.ingredients[1]);
  });

  it('Удаление ингредиента', () => {
    const action = removeIngredient({ _id: '2', type: 'main' });
    const state = reducerConstructorBurger(mockInitialState, action);
    expect(state.ingredients.map((ingredient) => ingredient._id)).not.toContain(
      '2'
    );
  });

  it('Очистка конструктора', () => {
    const action = clearConstructor();
    const state = reducerConstructorBurger(mockInitialState, action);
    expect(state).toEqual(initialState);
  });
});
