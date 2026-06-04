import React, { useState, useEffect, createContext, useContext } from 'react'
import API_URL from '../../config';

const investorFilterContext = createContext();

const InvestorFilterContextProvider = (props) => {

    const [perPage] = useState(10);
    const [pageCount, setPageCount] = useState(0);
    const [page, setPage] = useState(1);
    const [totalcount, setTotalcount] = useState('')


    const [investorfilter, setInvestorFilter] = useState(() => {
        const savedFilter = localStorage.getItem('investorfilter');
        return savedFilter ? JSON.parse(savedFilter) : {
            country: '',
            state: '',
            city: '',
            yearofexperience: '',
            minimum_investment: '',
            maximum_investment: ''
        };
    });


    const [investordata, setInvestordata] = useState(() => {
        const savedData = localStorage.getItem('investordata');
        return savedData ? JSON?.parse(savedData) : [];
    });


    useEffect(() => {
        getInvestorData(investorfilter);
        localStorage.setItem('startupfilter', JSON.stringify(investorfilter));
    }, [investorfilter, page, perPage]);

    // useEffect(() => {
    // }, [startupfilter, page, perPage]);


    const handlePageChange = (data) => {
        console.log("data>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", data)
        setPage(data + 1);
        getInvestorData(investorfilter)
    }


    const getInvestorData = async (investorfilter) => {
        try {
            const requestOption = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
            }
            await fetch(`${API_URL}/api/getInvestorList?page=${page}&limit=${perPage}&country=${investorfilter?.country}&state=${investorfilter?.state}&city=${investorfilter?.city}&yearofexperience=${investorfilter?.yearofexperience}&minimum_investment=${investorfilter?.minimum_investment}&maximum_investment=${investorfilter?.maximum_investment}`, requestOption)
                .then(response => response.json())
                .then(data => {
                    console.log("data>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", data.data)
                    const total = data.total;
                    const slice = total / perPage;
                    const pages = Math.ceil(slice);
                    setPageCount(pages);
                    setInvestordata(data.data)
                    setTotalcount(data.total)
                    // localStorage.setItem('matrimonydata', JSON.stringify(data.data));

                }
                )
        } catch (error) {
            console.log(error)
        }
    }



    const state = {
        investorfilter,
        setInvestorFilter,
        getInvestorData,
        investordata,
        pageCount,
        totalcount,
        handlePageChange
    }

    return (
        <investorFilterContext.Provider value={state}>
            {props.children}
        </investorFilterContext.Provider>
    )

};

const useInvestorFilterContext = () => {
    return useContext(investorFilterContext);
};
export { investorFilterContext, InvestorFilterContextProvider, useInvestorFilterContext };