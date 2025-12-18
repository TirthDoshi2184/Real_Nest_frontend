// store.js
import { configureStore } from '@reduxjs/toolkit';
import cityReducer from './CitySlice';

const store = configureStore({
  reducer: {
    city: cityReducer,
  },
});

export default store;
