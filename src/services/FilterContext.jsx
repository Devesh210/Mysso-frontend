import React, { useState, useEffect, createContext, useContext } from 'react'
import API_URL from '../../config';



const FilterContext = createContext();

const FilterContextProvider = (props) => {

    const [perPage] = useState(10);
    const [pageCount, setPageCount] = useState(0);
    // const [page, setPage] = useState(1);
    const [page, setPage] = useState(() => {
        const savedPage = localStorage.getItem('currentPage');
        return savedPage ? JSON.parse(savedPage) : 1;
    });

    const [matrimonyfilter, setMatrimonyFilter] = useState(() => {
        const savedFilter = localStorage.getItem('matrimonyfilter');
        return savedFilter ? JSON.parse(savedFilter) : {
            lookingfor: '',
            agefrom: '',
            ageto: '',
            maritalstatus: '',
            nationality: '',
            country: '',
            state: '',
            city: '',
            mothertongue: '',
            caste: '',
            subcaste: '',
            education: '',
            occupation: '',
            income: '',
            hobbies: '',
            gotra: '',
            height: '',
            weight: '',
            handicap: '',
            memberid: ''
        };
    });



    const [matrimonydata, setMatrimonydata] = useState(() => {
        const savedData = localStorage.getItem('matrimonydata');
        return savedData ? JSON?.parse(savedData) : [];
    });


    useEffect(() => {
        localStorage.setItem('currentPage', JSON.stringify(page));
        getMatrimonyData(matrimonyfilter);
        localStorage.setItem('matrimonyfilter', JSON.stringify(matrimonyfilter));

    }, [matrimonyfilter, page, perPage]);

    // useEffect(() => {
    //     localStorage.setItem('matrimonydata', JSON.stringify(matrimonydata));
    // }, [matrimonydata, page, perPage]);

    const handlePageChange = (data) => {
        // setPage(data + 1);
        const selectedPage = data + 1;
        setPage(selectedPage);
        localStorage.setItem('currentPage', JSON.stringify(selectedPage));
        window.scrollTo(0, 0); // Scroll to the top after pagination click
        // getMatrimonyData(matrimonyfilter)
    }


    const getMatrimonyData = async (matrimonyfilter) => {
        try {
            const requestOption = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
            }
            await fetch(`${API_URL}/api/getMatrimonyUserDataList?page=${page}&limit=${perPage}&lookingforsearch=${matrimonyfilter?.lookingfor}&agefromsearch=${matrimonyfilter?.agefrom}&ageto=${matrimonyfilter?.ageto}&maritalstatussearch=${matrimonyfilter?.maritalstatus}&searchnationality=${matrimonyfilter?.nationality}&searchcountry=${matrimonyfilter?.country}&searchstate=${matrimonyfilter?.state}&searchcity=${matrimonyfilter?.city}&searchmothertongue=${matrimonyfilter?.mothertongue}&cast_id=${matrimonyfilter?.caste}&subcast_id=${matrimonyfilter.subcaste}&searcheducation=${matrimonyfilter?.education}&searchoccupation=${matrimonyfilter?.occupation}&searchincome=${matrimonyfilter?.income}&searchhobbies=${matrimonyfilter?.hobbies}&searchgotra=${matrimonyfilter?.gotra}&searchheight=${matrimonyfilter?.height}&searchweight=${matrimonyfilter?.weight}&searchhandicap=${matrimonyfilter?.handicap}&searchmemberid=${matrimonyfilter?.memberid}`, requestOption)
                .then(response => response.json())
                .then(data => {
                    console.log("data>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", data.data)
                    const total = data.total;
                    const slice = total / perPage;
                    const pages = Math.ceil(slice);
                    setPageCount(pages);
                    setMatrimonydata(data.data)
                    // localStorage.setItem('matrimonydata', JSON.stringify(data.data));

                }
                )
        } catch (error) {
            console.log(error)
        }
    }

    const state = {
        matrimonyfilter,
        setMatrimonyFilter,
        getMatrimonyData,
        matrimonydata,
        pageCount,
        page,
        handlePageChange
    }

    return (
        <FilterContext.Provider value={state}>
            {props.children}
        </FilterContext.Provider>
    )
};

const useFilterContext = () => {
    return useContext(FilterContext);
};
export { FilterContext, FilterContextProvider, useFilterContext };


