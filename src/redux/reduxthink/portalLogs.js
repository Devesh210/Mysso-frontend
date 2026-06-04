import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import API_URL from '../../../config';



// Async thunk for logging time spent
export const logTimeSpent = createAsyncThunk(
    'portal/logTimeSpent',
    async ({ portal, start_time, end_time }, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                return;
            }
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            };
            const response = await axios.post(`${API_URL}/api/timespentonportals`, {
                portal,
                start_time,
                end_time,
            }, {
                headers: headers
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Async thunk for updating last visited portal
export const updateLastVisitedPortal = createAsyncThunk(
    'portal/updateLastVisitedPortal',
    async ({ portal }, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                return;
            }
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            };
            const response = await axios.post(`${API_URL}/api/lastvisitedportals`, { portal }, {
                headers: headers
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);