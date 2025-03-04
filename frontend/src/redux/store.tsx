import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import { rentalsApi } from '../api/RentalsApi';
import { dealershipsApi } from '../api/DealershipsApi';
import { reservationsApi } from '../api/ReservationsApi';
import { usersApi } from '../api/UsersApi';
import { carsApi } from '../api/CarsApi';
import { ordersApi } from '../api/OrdersApi';
import { setupListeners } from '@reduxjs/toolkit/query';

const store = configureStore({
  reducer: {
    auth: authReducer,
    [rentalsApi.reducerPath]: rentalsApi.reducer, 
    [dealershipsApi.reducerPath]: dealershipsApi.reducer,
    [reservationsApi.reducerPath]: reservationsApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [carsApi.reducerPath]: carsApi.reducer,
    [ordersApi.reducerPath]: ordersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(rentalsApi.middleware)
      .concat(dealershipsApi.middleware)
      .concat(reservationsApi.middleware)
      .concat(usersApi.middleware)
      .concat(carsApi.middleware)
      .concat(ordersApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;

export default store;
