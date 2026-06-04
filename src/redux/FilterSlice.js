import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import API_URL from '../../config';
import { jobPortalApi, useGetIndustryFiltersQuery, useGetLocationFiltersQuery, useGetSalaryFiltersQuery } from './apiSlice';

const initialState = {
  locationFilters: [],
  industryFilters: [],
  salaryFilters: { minSalary1: 1, maxSalary2: 10000 },
  salarytype: "Year",
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    reset: (state) => {
      // Correctly update the state by copying initial data
      Object.assign(state, initialState);
    },
    setLocationFilters(state, action) {
      state.locationFilters = action.payload;
    },
    setIndustryFilters(state, action) {
      state.industryFilters = action.payload;
    },
    setSalaryFilters(state, action) {
      state.salaryFilters = action.payload;
    },
    extraReducers: (builder) => {
      // Listen to the fulfilled state of the salary filters query
      builder.addMatcher(
        jobPortalApi.endpoints.getSalaryFilters.matchFulfilled,
        (state, action) => {
          console.log("action", action.payload)
          // Update the state based on the query response
          // state.salaryFilters = action.payload; // Assuming 'salaryFilters' is a state property in initialAuthSLiceData
        }
      );
    },
  },
});

export const {
  setLocationFilters,
  setIndustryFilters,
  setSalaryFilters,
  reset,
} = filtersSlice.actions;

export default filtersSlice.reducer;

// Async thunk to fetch data
export const fetchFilters = () => async (dispatch) => {

  try {
    const locationRes = await axios.get(`${API_URL}/api/jobportal/filters/location`, { withCredentials: true }).then((res) => res.data.data);
    const industryRes = await axios.get(`${API_URL}/api/jobportal/filters/industry`, { withCredentials: true }).then((res) => res.data.data);
    // const salaryRes = await axios.get(`${API_URL}/api/jobportal/filters/salary`, { withCredentials: true }).then((res) => res.data.data);
    // console.log("locationRes", locationRes)
    // console.log("industryRes", industryRes)
    // console.log("salaryRes", salaryRes)
    if (Array.isArray(locationRes)) {
      dispatch(setLocationFilters(locationRes));
    }
    if (Array.isArray(industryRes)) {
      dispatch(setIndustryFilters(industryRes));
    }

    salaryRes.minSalary1 && salaryRes.maxSalary2 && dispatch(setSalaryFilters(salaryRes));

  } catch (error) {

  } finally {
  }
};
