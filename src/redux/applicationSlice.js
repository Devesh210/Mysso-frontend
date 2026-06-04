import { createSlice } from "@reduxjs/toolkit";

const applicationSlice = createSlice({
    name: 'application',
    initialState: {
        applicants: null,
    },
    reducers: {
        setAllApplicants: (state, action) => {
            state.applicants = action.payload;
        },
        reset: (state) => {
            // Correctly update the state by copying initial data
            Object.assign(state, {
                applicants: null,
            });
        },
    }
});
export const { setAllApplicants, reset } = applicationSlice.actions;
export default applicationSlice.reducer;