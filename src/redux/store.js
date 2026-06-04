import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import sessionstorage from "redux-persist/lib/storage/session"; // defaults to localStorage for web
import { setupListeners } from '@reduxjs/toolkit/query';
import authSlice, { reset as resetAuth, fetchRoleAfterSetUserMiddleware } from "./authSlice"; // Import fetchRole from authSlice
import jobSlice, { reset as resetJob, setFIlter } from "./jobSlice";
import FilterSlice, { reset as resetFilter } from "./FilterSlice";
import companySlice, { reset as resetCompany } from "./companySlice";
import applicationSlice, { reset as resetApplication } from "./applicationSlice";
import { jobPortalApi } from "./apiSlice";
import RecruiterformSLice, { setForm as setRecruiterForm, reset as resetRecruiterForm } from "./RecruiterformSLice";
import Jobseekerslice, { setForm as setJObseekerform, reset as resetJobseekerForm } from "./Jobseekerslice";
import { fetchRole } from "./reduxthink/fetchRole";
import portalSlice from "./jobPortalSlice"
// Persist config for auth slice
const authPersistConfig = {
    key: "auth",
    storage,
};

// Persist config for filter slice
const recruiterformPersistConfig = {
    key: "recruiterform",
    storage: sessionstorage,
};
const JobseekersformPersistConfig = {
    key: "Jobseekersform",
    storage: sessionstorage,
};
const jobPersistConfig = {
    key: "job",
    storage: sessionstorage,
    // blacklist: ['min_years', 'max_years', 'minSalary', 'maxSalary']

};
const jobPortalConfig = {
    key: "portal",
    storage: sessionstorage,

};

// Combine reducers, applying persist only to selected reducers
const rootReducer = combineReducers({
    auth: persistReducer(authPersistConfig, authSlice),
    filters: FilterSlice,
    job: jobSlice,
    // job: persistReducer(jobPersistConfig, jobSlice),
    recruiterform: persistReducer(recruiterformPersistConfig, RecruiterformSLice),
    Jobseekersform: persistReducer(JobseekersformPersistConfig, Jobseekerslice),
    company: companySlice,
    application: applicationSlice,
    portal: portalSlice,
    [jobPortalApi.reducerPath]: jobPortalApi.reducer,
});

// Configure the store with the combined reducer
const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }).concat(fetchRoleAfterSetUserMiddleware, jobPortalApi.middleware,),
});

// Create a persistor instance
export const persistor = persistStore(store);

// Function to clear all states
export const clearAllStates = () => {
    // Clear persisted storage
    persistor.purge();
    // Reset state for each slice
    store.dispatch(resetAuth());
    store.dispatch(resetJob());
    store.dispatch(resetFilter());
    store.dispatch(resetCompany());
    store.dispatch(resetApplication());
    store.dispatch(resetRecruiterForm());
    store.dispatch(resetJobseekerForm());
    // Reset the RTK Query cache
    store.dispatch(jobPortalApi.util.resetApiState());
};

export const handlefilter = (type, value) => {
    store.dispatch(setFIlter({ type, value }));
};

export const handleSubmitRecruiterform = (value) => {
    store.dispatch(setRecruiterForm(value));
};

export const handleSubmitJobseekerform = (value) => {
    store.dispatch(setJObseekerform(value));
};

export const handleJobseekerform = (value) => {
    store.dispatch(setJObseekerform(value));
};

// Set up RTK listeners
setupListeners(store.dispatch);





export default store;
