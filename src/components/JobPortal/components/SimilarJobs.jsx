import React from 'react'
import { Badge, Button, Card, Col, Row, Alert } from 'react-bootstrap'
import { SpinLoader, useGetAllJobsByCategory } from '../../../hooks'
import { useSelector } from 'react-redux';
import Job from '../Job';

const SimilarJobs = ({ category, id }) => {

    const { error, isLoading, data: SimilarJobs } = useGetAllJobsByCategory(4, 1, category, id)
    console.log("similar", error)
    return (
        <div>
            <h3 className='similar-job text-start px-3' >Similar Jobs</h3>
            <div className='mt-3'>
                <Row>
                    {isLoading ? (
                        <SpinLoader name='jobs' />
                    ) :
                        SimilarJobs?.length === 0 ? (
                            <Alert variant="info">
                                {
                                    error && error.isError ? error.status === 403 ? "Please Login First" : error.message : "🤷‍♂️ Oops! No Jobs Found"
                                }
                            </Alert>
                        ) : SimilarJobs?.map((item) => (
                            <Col lg={3} className='px-4'>
                                <Job job={item} />
                            </Col>
                        ))
                    }

                </Row>
            </div>
        </div>
    )
}

export default SimilarJobs
