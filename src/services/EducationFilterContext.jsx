import React, { useState, useEffect, createContext, useContext } from 'react'
import API_URL from '../../config';

const EducationFilterContext = createContext();

const EducationFilterContextProvider = (props) => {

    const [perPage] = useState(10);
    const [pageCount, setPageCount] = useState(0);
    const [page, setPage] = useState(1);
    const [totalcount, setTotalcount] = useState('')

    const [educationfilter, setEducationFilter] = useState(() => {
        const savedFilter = localStorage.getItem('educationfilter');
        return savedFilter ? JSON.parse(savedFilter) : {
            year_of_experience: [],
            type_of_guidance: [],
            field_of_study: [],
            mode_of_consultation: [],
            preferred_time_slots: []
        };
    });

    const [educationdata, setEducationdata] = useState(() => {
        const savedData = localStorage.getItem('educationdata');
        return savedData ? JSON?.parse(savedData) : [];
    });

    useEffect(() => {
        getEducationData(educationfilter);
        localStorage.setItem('educationfilter', JSON.stringify(educationfilter));
    }, [educationfilter, page, perPage]);

    const handlePageChange = (data) => {
        console.log("data>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", data)
        setPage(data + 1);
        getEducationData(educationfilter)
    }

    const getEducationData = async (educationfilter) => {
        try {

            const year_of_experience = educationfilter?.year_of_experience?.map(val => val.value);
            const type_of_guidance = educationfilter?.type_of_guidance?.map(val => val.value);
            const field_of_study = educationfilter.field_of_study?.map(val => val.value);
            const mode_of_consultation = educationfilter?.mode_of_consultation?.map(val => val.value);
            const preferred_time_slots = educationfilter?.preferred_time_slots?.map(val => val.value);

            const requestOption = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
            }
            await fetch(`${API_URL}/api/getExpertList?page=${page}&limit=${perPage}&year_of_experience=${year_of_experience}&type_of_guidance=${type_of_guidance}&field_of_study=${field_of_study}&mode_of_consultation=${mode_of_consultation}&preferred_time_slots=${preferred_time_slots}`, requestOption)
                .then(response => response.json())
                .then(data => {
                    console.log("data>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", data)
                    setEducationdata(data.data);
                    setPageCount(data.pageCount);
                    setTotalcount(data.totalcount);
                })
        }
        catch (err) {
            console.error(err.message);
        }
    }

    const state = {
        educationfilter,
        setEducationFilter,
        getEducationData,
        educationdata,
        pageCount,
        totalcount,
        handlePageChange,
    }

    return (
        <EducationFilterContext.Provider value={state}>
            {props.children}
        </EducationFilterContext.Provider>
    )
}

const useEducationFilterContext = () => {
    return useContext(EducationFilterContext);
}

export { EducationFilterContext, EducationFilterContextProvider, useEducationFilterContext }