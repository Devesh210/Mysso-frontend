import React, { useState, useEffect, createContext, useContext } from 'react';
import API_URL from '../../config';


const MedicalFilterContext = createContext();

const MedicalFilterContextProvider = (props) => {

    const [perPage] = useState(10);
    const [pageCount, setPageCount] = useState(0);
    const [page, setPage] = useState(1);
    const [totalcount, setTotalcount] = useState('')

    const [medicalfilter, setMedicalFilter] = useState(() => {

        const savedFilter = localStorage.getItem('medicalfilter');
        return savedFilter ? JSON.parse(savedFilter) : {
            hospital_name: [],
            hospital_services: [],
        };
    }
    );

    const [medicaldata, setMedicaldata] = useState(() => {
        const savedData = localStorage.getItem('medicaldata');
        return savedData ? JSON?.parse(savedData) : [];
    });

    useEffect(() => {
        getMedicalData(medicalfilter);
        localStorage.setItem('medicalfilter', JSON.stringify(medicalfilter));
    }, [medicalfilter, page, perPage]);

    const handlePageChange = (data) => {
        console.log("data>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", data)
        setPage(data + 1);
        getMedicalData(medicalfilter)
    }

    const getMedicalData = async (medicalfilter) => {
        try {

            const hospital_name = medicalfilter?.hospital_name?.map(val => val.value);
            const hospital_services = medicalfilter?.hospital_services?.map(val => val.value);
           

            const requestOption = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
            }
            await fetch(`${API_URL}/api/getHospitalsforEndUser?page=${page}&limit=${perPage}&hospital_id=${hospital_name}&serviceCategory=${hospital_services}`, requestOption)
                .then(response => response.json())
                .then(data => {
                    console.log("data>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", data)
                    setMedicaldata(data.data);
                    setTotalcount(data.totalCount)
                    setPageCount(Math.ceil(data.totalCount / perPage));
                });
        } catch (error) {
            console.log(error)
        }
    }

    const state = {
        medicalfilter,
        setMedicalFilter,
        getMedicalData,
        medicaldata,
        pageCount,
        totalcount,
        handlePageChange
    }

    return (
        <MedicalFilterContext.Provider value={state}>
            {props.children}
        </MedicalFilterContext.Provider>
    )
}

export const useMedicalFilterContext = () => {
    return useContext(MedicalFilterContext);
}

export default MedicalFilterContextProvider;