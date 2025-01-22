// store.jsx
import { configureStore } from '@reduxjs/toolkit';
import { rentalsApi } from '../api/RentalsApi';
import authReducer from './authSlice';

const store = configureStore({
  reducer: {
    [rentalsApi.reducerPath]: rentalsApi.reducer, 
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(rentalsApi.middleware),
});

export default store;
