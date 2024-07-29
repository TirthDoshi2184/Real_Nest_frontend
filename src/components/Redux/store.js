// store.js
import { configureStore } from '@reduxjs/toolkit';
import cityReducer from './CityFilter';

const store = configureStore({
  reducer: {
    city: cityReducer,
  },
});

export default store;
