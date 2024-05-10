import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { reducerIngredients } from './ingredientsSlice';
import { reducerConstructorBurger } from './constructorBurgerSlice';
import { reducerFeeds } from './feedSlice';
import { reducerOrder } from './orderSlice';
import { reducerUser } from './userSlice';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

const rootReducer = combineReducers({
  ingredients: reducerIngredients,
  constructorBurger: reducerConstructorBurger,
  feed: reducerFeeds,
  order: reducerOrder,
  user: reducerUser
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
