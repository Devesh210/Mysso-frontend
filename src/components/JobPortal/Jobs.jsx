import React, { useEffect, useState } from 'react';
import { Row, Col, Container, Alert } from 'react-bootstrap';
import FilterCard from './FilterCard';
import Job from './Job';
import { useSelector } from 'react-redux';
import { SpinLoader, useGetAllJobs } from '../../hooks';
// import '../../Jobportal.css'; // Import your CSS file
import usePaginationhook from '../../hooks/usePaginationhook';
import { useLocation, useNavigate } from 'react-router-dom';
import { RERECRUITER } from '../../../config';
import Nodatafound from '../pages/nodatafound/Nodatafound';

const Jobs = () => {
    const { state } = useLocation()
    const navigate = useNavigate()
    const [sort, setSort] = useState("")
    const { role, token } = useSelector((state) => state.auth);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setitemsPerPage] = useState(9)
    const { searchJobByText } = useSelector(store => store.job);

    // Handle page change
    const onPageChange = (page) => {
        setCurrentPage(page);
    };

    useEffect(() => {
        setSort(state?.sort || "")
    }, [location.pathname])
    const { totalItems, data, error, jobs, isLoading } = useGetAllJobs(itemsPerPage, currentPage, sort, location.pathname);
    // Use the custom hook for pagination
    const pagination = usePaginationhook({
        totalItems: totalItems,
        perPage: itemsPerPage,
        currentPage: currentPage,
        onPageChange,
    });

    useEffect(() => {
        if (role == RERECRUITER) {
            navigate("/admin/jobs")
        }
    }, [role])
    return (
        <Container fluid className="matrimonial-search ">
            {
                isLoading ? (
                    <SpinLoader name='jobs' />
                )
                    : <Row>
                        <Col xs={12} md={4} lg={3} className="mb-4">
                            {!isLoading && <FilterCard onPageChange={onPageChange} />}

                        </Col>
                        <Col xs={12} md={12} lg={9} className='p-0'>
                            {
                                error ?
                                    (<Alert variant='danger' ></Alert>)
                                    :
                                    data?.length === 0 ? (
                                        <Nodatafound />
                                    ) : (
                                        <>
                                            <Row className="g-4 m-2">
                                                {data?.map((job) => (
                                                    <Col xs={12} md={12} lg={4} key={job._id}>

                                                        <Job job={job} />

                                                    </Col>
                                                ))}
                                            </Row>
                                            {pagination}
                                        </>


                                    )}
                        </Col>
                    </Row>
            }

        </Container>
    );
};

export default Jobs;
