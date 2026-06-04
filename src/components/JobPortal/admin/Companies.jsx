import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useGetAllCompanies } from '../../../hooks';
import { setSearchCompanyByText } from '../../../redux/companySlice';
import CompaniesTable from './CompaniesTable';

const Companies = () => {
    useGetAllCompanies();
    const [input, setInput] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setSearchCompanyByText(input));
    }, [input]);

    return (
        <div className="container my-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <input
                    type="text"
                    className="form-control w-auto"
                    placeholder="Filter by name"
                    onChange={(e) => setInput(e.target.value)}
                />
                <button className="btn btn-primary search-partner add-company" onClick={() => navigate("/admin/companies/create")}>
                    Add Company
                </button>
            </div>
            <CompaniesTable />
        </div>
    );
};

export default Companies;
