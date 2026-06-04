import React from 'react'
import { Carousel, Button, Container, Card, Row, Col } from 'react-bootstrap';

const Counter = () => {
    return (
        <div className='bg-counter mb-4'>
            <Container >
                <div >
                    <Row className='justify-content-center pt-5 pb-5'>
                        <Col lg={3} md={12} className='col-count'>
                            <div className='pt-4 pb-4'>
                                {/* <div className='text-count text-light text-center'>9.5k</div> */}
                                {/* <h5 className='text-light text-center mt-3'>Jobs</h5> */}
                                <h5 className='text-light text-center mt-3'>Industry Specific Jobs</h5>
                            </div>
                        </Col>
                        <Col lg={3} md={12} className='col-count'>
                            <div className='pt-4 pb-4'>
                                {/* <div className='text-count text-light  text-center'>9.5k</div>
                                <h5 className='text-light text-center mt-3'>Happy Students</h5> */}
                                <h5 className='text-light text-center mt-3'>Quick Job Process</h5>
                            </div>
                        </Col>
                        <Col lg={3} md={12} className='col-count'>
                            <div className='pt-4 pb-4'>
                                {/* <div className='text-count text-light  text-center'>9.5k</div>
                                <h5 className='text-light text-center mt-3'>Jobs</h5> */}
                                <h5 className='text-light text-center mt-3'>Reliability</h5>
                            </div>
                        </Col>
                        <Col lg={3} md={12}>
                            <div className='pt-4 pb-4'>
                                {/* <div className='text-count text-light  text-center'>9.5k</div>
                                <h5 className='text-light text-center mt-3'>Companies</h5> */}
                                <h5 className='text-light text-center mt-3'>Easy Navigation</h5>
                            </div>
                        </Col>
                    </Row>
                </div>
            </Container>
        </div>
    )
}
export default Counter;