import React, { useState, useEffect, createContext, useContext } from 'react';
import API_URL from '../../config';


const NgofilterContext = createContext();

const NgofilterContextProvider = (props) => {

    const [perPage] = useState(10);
    const [pageCount, setPageCount] = useState(0);
    const [page, setPage] = useState(1);
    const [totalcount, setTotalcount] = useState('')

    const [ngofilter, setNgoFilter] = useState(() => {

        const savedFilter = localStorage.getItem('ngofilter');
        return savedFilter ? JSON.parse(savedFilter) : {
            country: [],
            state: [],
            city: [],
            ngo_name: [],
            ngo_services: [],
        };
    }
    );

    const [ngodata, setNgodata] = useState(() => {
        const savedData = localStorage.getItem('ngodata');
        return savedData ? JSON?.parse(savedData) : [];
    });

    useEffect(() => {
        getNgoData(ngofilter);
        localStorage.setItem('ngofilter', JSON.stringify(ngofilter));
    }, [ngofilter, page, perPage]);

    const handlePageChange = (data) => {
        console.log("data>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", data)
        setPage(data + 1);
        getNgoData(ngofilter)
    }

    const getNgoData = async (ngofilter) => {
        try {
            
            const country = ngofilter?.country?.map(val => val.value);
            const state = ngofilter?.state?.map(val => val.value);
            const city = ngofilter?.city?.map(val => val.value);
            const ngo_name = ngofilter?.ngo_name?.map(val => val.value);
            const ngo_services = ngofilter?.ngo_services?.map(val => val.value);
           
            console.log("country", country)
            console.log("state", state)
            console.log("city", city)
            console.log("ngo_name", ngo_name)
            console.log("ngo_services", ngo_services)

            // return false;

            const requestOption = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
            }
            await fetch(`${API_URL}/api/getListsofNGOforUser?page=${page}&limit=${perPage}&country=${country}&state=${state}&city=${city}&ngo_name=${ngo_name}&ngo_services=${ngo_services}`, requestOption)
                .then(response => response.json())
                .then(data => {
                    console.log("data>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", data)
                    setNgodata(data.data);
                    setTotalcount(data.totalCount)
                    setPageCount(Math.ceil(data.totalCount / perPage));
                })
        } catch (error) {
            console.log("error", error)
        }
    }

    const state = { 
        ngofilter, 
        setNgoFilter, 
        getNgoData,
        ngodata, 
        pageCount, 
        totalcount, 
        handlePageChange 
    }


    return (
        <NgofilterContext.Provider value={state}>
            {props.children}
        </NgofilterContext.Provider>
    )
}

export const useNgofilterContext = () => {
    return useContext(NgofilterContext);
}

export default NgofilterContextProvider;
