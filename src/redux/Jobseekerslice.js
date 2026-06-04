import { createSlice } from "@reduxjs/toolkit";
import { initialjobseekerform } from "../utils/initialData.json";
import { jobPortalApi } from "./apiSlice";
import { deepClone } from "../utils";
const initialState = initialjobseekerform
// Deep clone function

const JobseekerFormSlice = createSlice({
    name: "JobseekerForm",
    initialState: { formdata: initialjobseekerform },
    reducers: {
        reset: (state) => {
            // Correctly update the state by copying initial data
            state["formdata"] = initialState
        },
        // actions
        setForm: (state, action) => {
            state["formdata"] = action.payload
        },
        setForm: (state, action) => {
            state["formdata"] = action.payload
        },

    },
    extraReducers: (builder) => {
        // Listening to the RTK Query API actions
        builder
            .addMatcher(jobPortalApi.endpoints.getRole.matchPending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addMatcher(jobPortalApi.endpoints.getRole.matchFulfilled, (state, action) => {
                try {
                    let data = deepClone(action.payload.data);

                    // Safely update nested properties
                    if (data?.personalDetails?.currentAddress) {
                        const { city_id, state_id, country_id } = data.personalDetails.currentAddress;

                        if (country_id && typeof country_id === 'object') {
                            data.personalDetails.currentAddress.country_id = country_id._id;
                        }

                        if (city_id && typeof city_id === 'object') {
                            data.personalDetails.currentAddress.city_id = city_id._id;
                        }

                        if (state_id && typeof state_id === 'object') {
                            data.personalDetails.currentAddress.state_id = state_id._id;
                        }
                    }
                    if (data?.personalDetails?.permanentAddress) {
                        const { city_id, state_id, country_id } = data.personalDetails.permanentAddress;

                        if (country_id && typeof country_id === 'object') {
                            data.personalDetails.permanentAddress.country_id = country_id._id;
                        }

                        if (city_id && typeof city_id === 'object') {
                            data.personalDetails.permanentAddress.city_id = city_id._id;
                        }

                        if (state_id && typeof state_id === 'object') {
                            data.personalDetails.permanentAddress.state_id = state_id._id;
                        }
                    }

                    // If you're using Redux Toolkit with Immer, you can directly mutate state
                    if (data && Object.keys(data).length > 0) {
                        state.formdata = data;
                        delete data["role"]
                    }
                } catch (error) {
                    console.log("errorrrr", error)
                }
                state.loading = false;
                state.error = null;
            })
            .addMatcher(jobPortalApi.endpoints.getRole.matchRejected, (state, action) => {
                state.loading = false;
                state.error = action.error; // Handle any errors
            });
    },
});
export const { reset, setForm } = JobseekerFormSlice.actions;
export default JobseekerFormSlice.reducer;