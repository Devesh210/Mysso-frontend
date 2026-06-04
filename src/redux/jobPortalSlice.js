import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { logTimeSpent, updateLastVisitedPortal } from './reduxthink/portalLogs';


const portalSlice = createSlice({
    name: 'portal',
    initialState: {
        portal: null,
        startTime: null,
        status: 'idle',
        error: null,
    },
    reducers: {
        setPortalDetails(state, action) {
            state.portal = action.payload.portal;
            state.startTime = action.payload.startTime;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(logTimeSpent.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(logTimeSpent.fulfilled, (state) => {
                state.status = 'succeeded';
            })
            .addCase(logTimeSpent.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(updateLastVisitedPortal.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateLastVisitedPortal.fulfilled, (state) => {
                state.status = 'succeeded';
            })
            .addCase(updateLastVisitedPortal.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export const { setPortalDetails } = portalSlice.actions;

export default portalSlice.reducer;
