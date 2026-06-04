import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useGetApplicantTrackingQuery } from '../../../redux/apiSlice';
import { Alert, Spinner } from 'react-bootstrap';
import usePaginationhook from '../../../hooks/usePaginationhook';
import ApplicantTrackingTable from './ApplicantTrackingTable';

const ApplicantTracking = () => {
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setitemsPerPage] = useState(5)
    const { data, isError, isLoading, error, refetch } = useGetApplicantTrackingQuery({ currentPage, perPage: itemsPerPage })
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
            <div className='max-w-7xl mx-auto'>
                <h1 className='font-bold text-xl my-5'>Applicants {data?.job?.length}</h1>
                {
                    data?.application?.length === 0 ? <Alert variant='danger'>Data Not Found</Alert> :
                        <ApplicantTrackingTable applicants={data?.application} refetch={refetch} />
                }

                {pagination}
            </div>
        </div>
    )
}

export default ApplicantTracking