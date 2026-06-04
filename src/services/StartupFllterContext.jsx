import React, { useState, useEffect, createContext, useContext } from 'react'
import API_URL from '../../config';

const startupFilterContext = createContext();

const StartupFilterContextProvider = (props) => {

    const [perPage] = useState(10);
    const [pageCount, setPageCount] = useState(0);
    const [page, setPage] = useState(1);
    const [totalcount, setTotalcount] = useState('')


    const [startupfilter, setStartupFilter] = useState(() => {
        const savedFilter = localStorage.getItem('startupfilter');
        return savedFilter ? JSON.parse(savedFilter) : {
            business_type: '',
            industry: '',
            startup_stage: '',
            revenue_model: '',
            minimum_investment: '',
            maximum_investment: ''
        };
    });


    const [startupdata, setStartupdata] = useState(() => {
        const savedData = localStorage.getItem('startupdata');
        return savedData ? JSON?.parse(savedData) : [];
    });


    useEffect(() => {
        getStartupData(startupfilter);
        localStorage.setItem('startupfilter', JSON.stringify(startupfilter));
    }, [startupfilter, page, perPage]);

    // useEffect(() => {
    // }, [startupfilter, page, perPage]);


    const handlePageChange = (data) => {
        console.log("data>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", data)
        setPage(data + 1);
        getStartupData(startupfilter)
    }


    const getStartupData = async (startupfilter) => {
        try {
            const requestOption = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
            }
            await fetch(`${API_URL}/api/getStartupList?page=${page}&limit=${perPage}&business_type=${startupfilter?.business_type}&industry=${startupfilter?.industry}&startup_stage=${startupfilter?.startup_stage}&revenue_model=${startupfilter?.revenue_model}&minimum_investment=${startupfilter?.minimum_investment}&maximum_investment=${startupfilter?.maximum_investment}`, requestOption)
                .then(response => response.json())
                .then(data => {
                    console.log("data>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", data.data)
                    const total = data.total;
                    const slice = total / perPage;
                    const pages = Math.ceil(slice);
                    setPageCount(pages);
                    setStartupdata(data.data)
                    setTotalcount(data.total)
                    // localStorage.setItem('matrimonydata', JSON.stringify(data.data));

                }
                )
        } catch (error) {
            console.log(error)
        }
    }



    const state = {
        startupfilter,
        setStartupFilter,
        getStartupData,
        startupdata,
        pageCount,
        totalcount,
        handlePageChange
    }

    return (
        <startupFilterContext.Provider value={state}>
            {props.children}
        </startupFilterContext.Provider>
    )

};

const useStartupFilterContext = () => {
    return useContext(startupFilterContext);
};
export { startupFilterContext, StartupFilterContextProvider, useStartupFilterContext };