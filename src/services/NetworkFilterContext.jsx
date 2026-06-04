import React, { useState, useEffect, createContext, useContext } from 'react'
import API_URL from '../../config';



const networkFilterContext = createContext();

const NetworkFilterContextProvider = (props) => {

    const [perPage] = useState(10);
    const [pageCount, setPageCount] = useState(0);
    const [page, setPage] = useState(1);
    const [totalcount, setTotalcount] = useState('')


    const [networkfilter, setNetworkFilter] = useState(() => {
        const savedFilter = localStorage.getItem('networkfilter');
        return savedFilter ? JSON.parse(savedFilter) : {
            networking_company_category: '',
            // networking_company_subcategory: '',
            country: '',
            state: '',
            city: '',
        };
    });



    const [networkdata, setNetworkdata] = useState(() => {
        const savedData = localStorage.getItem('networkdata');
        return savedData ? JSON?.parse(savedData) : [];
    });


    useEffect(() => {
        getNetworkData(networkfilter);
    }, [networkfilter, page, perPage]);

    useEffect(() => {
        localStorage.setItem('networkfilter', JSON.stringify(networkfilter));
    }, [networkfilter, page, perPage]);

    // useEffect(() => {
    //     localStorage.setItem('matrimonydata', JSON.stringify(matrimonydata));
    // }, [matrimonydata, page, perPage]);

    const handlePageChange = (data) => {
        console.log("data>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", data)
        setPage(data + 1);
        getNetworkData(networkfilter)
    }


    const getNetworkData = async (networkfilter) => {
        try {
            const requestOption = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
            }
            await fetch(`${API_URL}/api/getNetworkList?page=${page}&limit=${perPage}&category=${networkfilter?.networking_company_category}&searchcountry=${networkfilter?.country}&searchstate=${networkfilter?.state}&searchcity=${networkfilter?.city}`, requestOption)
                .then(response => response.json())
                .then(data => {
                    console.log("data>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", data.data)
                    const total = data.total;
                    const slice = total / perPage;
                    const pages = Math.ceil(slice);
                    setPageCount(pages);
                    setNetworkdata(data.data)
                    setTotalcount(data.total)
                    // localStorage.setItem('matrimonydata', JSON.stringify(data.data));

                }
                )
        } catch (error) {
            console.log(error)
        }
    }








    const state = {
        networkfilter,
        setNetworkFilter,
        getNetworkData,
        networkdata,
        pageCount,
        totalcount,
        handlePageChange
    }

    return (
        <networkFilterContext.Provider value={state}>
            {props.children}
        </networkFilterContext.Provider>
    )
};

const useNetworkFilterContext = () => {
    return useContext(networkFilterContext);
};
export { networkFilterContext, NetworkFilterContextProvider, useNetworkFilterContext };


