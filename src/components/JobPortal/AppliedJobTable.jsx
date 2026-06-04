import React, { useEffect, useState } from 'react';
import { Table, Badge, Spinner, Alert, Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useGetAllApllidJobsQuery } from '../../redux/apiSlice';
import usePaginationhook from '../../hooks/usePaginationhook';
import { timeformat } from '../../../config';
import { useNavigate } from 'react-router-dom';

const AppliedJobTable = () => {
    const navigate = useNavigate()
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setitemsPerPage] = useState(5)
    const { data: allAppliedJobs, isError, isLoading, refetch, error } = useGetAllApllidJobsQuery({ page: currentPage, limit: itemsPerPage })
    if (isLoading) {
        return <Spinner ></Spinner>
    }
    if (isError) {
        <Alert variant='danger'>{error?.message}</Alert>
    }
    const onPageChange = (page) => {
        setCurrentPage(page);
    };

    // Use the custom hook for pagination
    const pagination = usePaginationhook({
        totalItems: allAppliedJobs?.totalApplications ? allAppliedJobs?.totalApplications : 0,
        perPage: itemsPerPage,
        currentPage: currentPage,
        onPageChange,
    });
    return (
        <div>
            <Container>
                <Table className='mt-5' hover>
                    <caption>A list of your applied jobs</caption>
                    <thead>
                        <tr className='text-center' >
                            <th className='text-center'>Date</th>
                            <th>Job Role</th>
                            <th>Company</th>
                            <th >Status</th>
                        </tr>
                    </thead>
                    <tbody className='text-center align-item-center' >
                        {
                            allAppliedJobs && allAppliedJobs?.application?.length <= 0
                                ? <tr><td colSpan="4" className="text-center">You haven't applied to any job yet.</td></tr>
                                : allAppliedJobs?.application?.map((appliedJob) => (
                                    <tr key={appliedJob._id}>
                                        <td className='align-content-center'>{new Date(appliedJob?.createdAt).toLocaleDateString('en-uk')}</td>
                                        <td className='align-content-center' role='button' onClick={() => navigate(`/description/${appliedJob.job?._id}`)}>{appliedJob.job?.title}</td>
                                        <td className='align-content-center'role='button' onClick={() => navigate(`/company/${appliedJob.job?.company?._id}`)}>{appliedJob.job?.company?.name}</td>
                                        <td className='align-content-center'>
                                            <Badge className='p-3' bg={appliedJob?.status === "rejected" ? 'danger' : appliedJob.status === 'pending' ? 'secondary' : 'success'}>
                                                {appliedJob.status.toUpperCase()}
                                            </Badge>
                                        </td>
                                    </tr>
                                ))
                        }
                    </tbody>
                </Table>
            </Container>

            {pagination}
        </div>
    );
}

export default AppliedJobTable;
