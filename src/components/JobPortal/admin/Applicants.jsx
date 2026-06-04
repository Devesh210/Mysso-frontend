import React, { useEffect, useState } from 'react'
import ApplicantsTable from './ApplicantTable'
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { useGetApplicantsQuery } from '../../../redux/apiSlice';
import { Alert, Spinner, Container } from 'react-bootstrap';
import usePaginationhook from '../../../hooks/usePaginationhook';

const Applicants = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setitemsPerPage] = useState(5)
    const {
        data,
        isError,
        isLoading,
        error,
        refetch
    } = useGetApplicantsQuery(
        { id: params.id, currentPage, perPage: itemsPerPage },
        // { skip: !params.id }
    );

    console.log('Refetch function in parent:', refetch);
    if (isLoading) {
        return <Spinner ></Spinner>
    }
    if (isError) {
        <Alert variant='danger'>{error?.message}</Alert>
    }
    // Handle page change
    const onPageChange = (page) => {
        setCurrentPage(page);
    };

    // Use the custom hook for pagination
    const pagination = usePaginationhook({
        totalItems: data?.totalApplications || 0,
        perPage: itemsPerPage,
        currentPage: currentPage,
        onPageChange,
    });
    return (
        <div>
            <Container>
                <div className='max-w-7xl mx-auto'>
                    <h1 className='font-bold text-xl my-5'>Applicants {data?.job?.length}</h1>
                    {
                        data?.job?.length === 0 ? <Alert variant='danger'>Data Not Found</Alert> :
                            <ApplicantsTable applicants={data?.job} refetch={refetch} />
                    }

                    {pagination}
                </div>
            </Container>
        </div>
    )
}

export default Applicants