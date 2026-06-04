import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { InitialJobUserData } from "../utils/initialData.json";
import { fetchRole } from "./reduxthink/fetchRole";

const authSlice = createSlice({
    name: "auth",
    initialState: InitialJobUserData,
    reducers: {
        // actions
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setUser: (state, action) => {
            // state.user = action.payload.user;
            state.token = action.payload;
        },
        setJobProfileData: (state, action) => {
            if (action.payload.role) {
                state.role = action.payload.role
            }
            state.data = action.payload;
            return state;
        },
        setUpdatedJobProfileData: (state, action) => {
            // Assign profile directly to state data
            if (action.payload.role) {
                state.role = action.payload.role
            }
            state.data = action.payload;
            return state;
        },

        setRole: (state, action) => {
            state.role = action.payload
        },

        reset: (state) => {
            // Correctly update the state by copying initial data
            Object.assign(state, InitialJobUserData);
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchRole.fulfilled, (state, action) => {
            console.log("action????", action.payload)
            if (action.payload.role) {
                state.role = action.payload.role
            }
            state.data = action.payload;
        })
    },
});

export const { setLoading, setUser, reset, setJobProfileData, setRole, resetAuthState, setUpdatedJobProfileData } = authSlice.actions;
export const fetchRoleAfterSetUserMiddleware = store => next => action => {
    const result = next(action);
    if (action.type === setUser.type && action.payload) {
        store.dispatch(fetchRole());
    }
    return result;
};
// Subscribe to the store and conditionally dispatch fetchRole based on the token



export default authSlice.reducer;