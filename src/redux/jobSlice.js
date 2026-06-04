import { createSlice } from "@reduxjs/toolkit";
import { initialAuthSLiceData } from "../utils/initialData.json";
import { jobPortalApi } from "./apiSlice";
import { deepClone } from "../utils";

const jobSlice = createSlice({
    name: "job",
    initialState: initialAuthSLiceData,
    reducers: {
        // actions\ 

        reset: (state) => {
            // Correctly update the state by copying initial data
            Object.assign(state, initialAuthSLiceData);
        },
        setAllJobs: (state, action) => {
            state.allJobs = action.payload;
        },
        setAllSimilarJobs: (state, action) => {
            state.SimilarJobs = action.payload;
        },
        setSingleJob: (state, action) => {
            state.singleJob = action.payload;
        },
        setEditJob: (state, action) => {
            state.editJob = action.payload;
        },
        setAllAdminJobs: (state, action) => {
            state.allAdminJobs = action.payload;
        },
        setSearchJobByText: (state, action) => {
            state.searchJobByText = action.payload;
        },
        setAllAppliedJobs: (state, action) => {
            state.allAppliedJobs = action.payload;

        },
        setSearchedQuery: (state, action) => {
            state.searchedQuery = action.payload;
        },
        setFIlter: (state, action) => {
            state[action.payload.type] = action.payload.value
        }

    },
    // extraReducers: (builder) => {
    //     // Listening to the RTK Query API actions
    //     builder
    //         .addMatcher(jobPortalApi.endpoints.getLocationFilters.matchFulfilled, (state, action) => {
    //             try {
    //                 let data = deepClone(action.payload.data);
    //                 console.log("filter data", data)
    //             } catch (error) {
    //                 console.log("errorrrr", error)
    //             }
    //         })
    //         .addMatcher(jobPortalApi.endpoints.getIndustryFilters.matchFulfilled, (state, action) => {
    //             try {
    //                 let data = deepClone(action.payload.data);
    //                 console.log("filter data", data)

    //             } catch (error) {
    //                 console.log("errorrrr", error)
    //             }
    //         })
    // },
});
export const {
    setAllJobs,
    setSingleJob,
    setAllAdminJobs,
    setSearchJobByText,
    setAllAppliedJobs, reset,
    setSearchedQuery, setFIlter, setEditJob, setAllSimilarJobs
} = jobSlice.actions;
export default jobSlice.reducer;
