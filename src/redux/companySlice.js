import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    singleCompany: null,
    companies: [],
    searchCompanyByText: "",
}
const companySlice = createSlice({
    name: "company",
    initialState: initialState,
    reducers: {
        reset: (state) => {
            // Correctly update the state by copying initial data
            Object.assign(state, initialState);
        },
        // actions
        setSingleCompany: (state, action) => {
            state.singleCompany = action.payload;
        },
        setCompanies: (state, action) => {
            state.companies = action.payload;
        },
        setSearchCompanyByText: (state, action) => {
            state.searchCompanyByText = action.payload;
        }
    }
});
export const { setSingleCompany, reset, setCompanies, setSearchCompanyByText } = companySlice.actions;
export default companySlice.reducer;