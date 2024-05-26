import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient } from '@utils-types';

type TConstructorState = {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
};

export const initialState: TConstructorState = {
  bun: null,
  ingredients: []
};

const constructorBurgerSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    addIngredients: (state, action) => {
      if (action.payload.type === 'bun') {
        state.bun = action.payload;
      } else {
        state.ingredients.push(action.payload);
      }
    },

    moveIngredient: (
      state,
      action: PayloadAction<{ index: number; direction: 'up' | 'down' }>
    ) => {
      const { index, direction } = action.payload;
      const ingredients = [...state.ingredients];
      const newIndex = direction === 'up' ? index - 1 : index + 1;

      if (newIndex < 0 || newIndex >= ingredients.length) {
        return;
      }

      [ingredients[index], ingredients[newIndex]] = [
        ingredients[newIndex],
        ingredients[index]
      ];
      state.ingredients = ingredients;
    },

    removeIngredient: (state, action) => {
      if (action.payload.type !== 'bun') {
        const idToRemove = action.payload._id;
        const indexToRemove = state.ingredients.findIndex(
          (ingredient) => ingredient._id === idToRemove
        );

        if (indexToRemove !== -1) {
          state.ingredients.splice(indexToRemove, 1);
        }
      }
    },

    clearConstructor: (state) => {
      state.bun = null;
      state.ingredients = [];
    }
  }
});

export const reducerConstructorBurger = constructorBurgerSlice.reducer;
export const {
  addIngredients,
  moveIngredient,
  removeIngredient,
  clearConstructor
} = constructorBurgerSlice.actions;
