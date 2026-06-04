import { jobPortalApi } from "../apiSlice";
import { reset, setJobProfileData } from "../authSlice";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
export const fetchRole = createAsyncThunk(
    'auth/fetchRole',
    async (_, { getState, dispatch, rejectWithValue }) => {
        const token = getState().auth.token  // Get token from state or localStorage
        if (!token) {
            dispatch(reset()); // Reset state if no token
            return rejectWithValue('No token available');
        }

        try {
            // Ensure token exists, then initiate the API call
            const result = await dispatch(
                jobPortalApi.endpoints.getRole.initiate()
            ).unwrap(); // Unwrap the data or throw error if unsuccessful

            console.log("Role fetched successfully: ", result);

            if (result?.data) {
                // dispatch(setJobProfileData(result.data)); // Dispatch job profile data to the store
                return result.data; // Return the role data
            }
        } catch (error) {
            console.error("Error fetching role:", error);
            return rejectWithValue(error.message);
        }
    }
);