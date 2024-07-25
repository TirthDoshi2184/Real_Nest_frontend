// citySlice.js
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const CityFilter = createSlice({
  name: 'city',
  initialState: {
    cities: [],
    selectedCity: '',
  },
  reducers: {
    setCities(state, action) {
      state.cities = action.payload;
    },
    setSelectedCity(state, action) {
      state.selectedCity = action.payload;
    },
  },
});

export const { setCities, setSelectedCity } = CityFilter.actions;
export default CityFilter.reducer;

export const fetchCities = () => async (dispatch) => {
  try {
    const response = await axios.get('http://localhost:3000/city/getcity');
    dispatch(setCities(response.data.data));
  } catch (error) {
    console.error('Error fetching cities:', error);
  }
};
