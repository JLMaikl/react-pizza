import { configureStore } from '@reduxjs/toolkit';
import filter from '../redux/slices/filterSlice';
import cart from '../redux/slices/cartSlice';

export const store = configureStore({
  reducer: {
    filter,
    cart
  },
});
