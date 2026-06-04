import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Container, Button, Alert } from 'react-bootstrap';
import LatestJobCard from './LatestJobCards'; // Assuming you have a similar card component
import { SpinLoader, useGetAllJobs } from '../../hooks'
import { Link, useNavigate } from 'react-router-dom';
import borderimg from '../../assets/border.svg'
import { RERECRUITER } from '../../../config';
import { useSelector } from 'react-redux';
import Nodatafound from '../pages/nodatafound/Nodatafound';

const LatestJobs = () => {
    const navigate = useNavigate()
    const { role, token } = useSelector((state) => state.auth);
    const { totalItems, data, error, isLoading } = useGetAllJobs(8, 1, "new");
    // Use the custom hook for pagination
    useEffect(() => {
        if (role == RERECRUITER) {
            navigate("admin/jobs")
        }
    }, [role])
    return (
        <>
            <div className='bg-jobs mb-0' >
                <Container className=" pt-5 pb-5">
                    <div className='featuredprofile mb-5 '>
                        <h3>Latest  <span>Jobs</span><img className='featuredpro' src={borderimg} style={{ width: "110px", left: "51%" }} />  </h3>
                    </div>
                    {
                        isLoading ? (
                            <SpinLoader name='latestjobs' />
                        ) : <Row className='mt-5'>
                            {

                                error ?
                                    (<Alert variant='danger' >{error.message}</Alert>)
                                    :
                                    data?.length === 0 ? (
                                        <Nodatafound />
                                    )
                                        : <>
                                            {
                                                data?.map(job => (
                                                    <Col md={3} key={job._id} className="mb-4 px-4">
                                                        <LatestJobCard job={job} />
                                                    </Col>
                                                ))
                                            }

                                            <Link to="/jobs" state={{ sort: "new" }} className="btn search-partner"><Button className='button-view'>View All Jobs</Button></Link>
                                        </>

                            }
                        </Row>
                    }

                </Container>
            </div>
        </>

    );
}

export default LatestJobs;
