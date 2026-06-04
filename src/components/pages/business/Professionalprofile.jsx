import React from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import API_URL from '../../../../config'

const Professionalprofile = (data) => {

    console.log("data", data.data)

    const detail = data.data

    console.log("detail", detail)
    return (
        <div>
            <Container fluid style={{ paddingLeft: '30px', paddingRight: '30px' }}>
                {detail.map((val) =>
                    <div>
                        <div className='profilegallery mb-5'>
                            <h3 className='text-center'>Company Information</h3>
                            <div className='descr-content'>
                                <Row>
                                    {/* <Row>
                                        <Col lg={4}>
                                            <div className='profileimgc'>

                                                <img className='prr' src={`${API_URL}/uploads/company_logo/${val?.logo?.map((val) => val.filename)}`} alt='profile' />

                                            </div>
                                        </Col>
                                    </Row> */}
                                    <Col lg={4} className='mb-4'>
                                        <h5>Profession</h5>
                                        <p>{val?.profession}</p>
                                    </Col>
                                    <Col lg={4} className='mb-4'>
                                        <h5>Professional Experience (In Years)</h5>
                                        <p>{val?.professional_industry_exp}</p>
                                    </Col>
                                    <Col lg={4} className='mb-4'>
                                        <h5>Profession Type</h5>
                                        <p>{val?.profession_type}</p>
                                    </Col>
                                    <Col lg={4} className='mb-4'>
                                        <h5>Firm Name</h5>
                                        <p>{val?.Firmname}</p>
                                    </Col>
                                    <Col lg={4} className='mb-4'>
                                        <h5>Profession Description</h5>
                                        <p>{val?.profession_desc}</p>
                                    </Col>
                                </Row>
                            </div>
                        </div>
            
                        <div className='profilegallery mb-5'>
                            <h3 className='text-center'>Personal Information</h3>
                            <div className='descr-content'>
                                <Row>
                                    <Col lg={4} className='mb-4'>
                                        <h5>First Name</h5>
                                        <p>{val?.firstname}</p>
                                    </Col>
                                    <Col lg={4} className='mb-4'>
                                        <h5>Last Name</h5>
                                        <p>{val?.lastname}</p>
                                    </Col>
                                    <Col lg={4} className='mb-4'>
                                        <h5>Mobile Number</h5>
                                        <p>{val?.personalphone}</p>
                                    </Col>
                                    <Col lg={4} className='mb-4'>
                                        <h5>WhatsApp Number</h5>
                                        <p>{val?.personalwhatsapp}</p>
                                    </Col>
                                    <Col lg={4} className='mb-4'>
                                        <h5>Email</h5>
                                        <p>{val?.personalemail}</p>
                                    </Col>
                                    <Col lg={4} className='mb-4'>
                                        <h5>Location</h5>
                                        <p>{val?.personallocation}</p>

                                    </Col>
                                    <Col lg={4} className='mb-4'>
                                        <h5>Country</h5>
                                        <p>{`${val?.country_details?.map((val) => val.country_name)}`}</p>
                                    </Col>
                                    <Col lg={4} className='mb-4'>
                                        <h5>State</h5>
                                        <p>{`${val?.state_details?.map((val) => val.state_name)}`}</p>
                                    </Col>
                                    <Col lg={4} className='mb-4'>
                                        <h5>City</h5>
                                        <p>{`${val?.city_details?.map((val) => val.city_name)}`}</p>
                                    </Col>
                                    <Col lg={4} className='mb-4'>
                                        <h5>Personal Website </h5>
                                        <p>{val?.personallocation}</p>
                                    </Col>
                                    <Col lg={4} className='mb-4'>
                                        <h5>Blog </h5>
                                        <p>{val?.personalblog}</p>
                                    </Col>
                                    <Col lg={4} className='mb-4'>
                                        <h5>LinkedIn</h5>
                                        <p onClick={() => window.open(val?.personalsocialMedia?.personallinkedin, '_blank')}>{val?.personalsocialMedia?.personallinkedin}</p>
                                    </Col>
                                    <Col lg={4} className='mb-4'>
                                        <h5>Twitter</h5>
                                        <p onClick={() => window.open(val?.personalsocialMedia?.personaltwitter, '_blank')}>{val?.personalsocialMedia?.personaltwitter}</p>
                                    </Col>
                                    <Col lg={4} className='mb-4'>
                                        <h5>Facebook</h5>
                                        <p onClick={() => window.open(val?.personalsocialMedia?.personalfacebook, '_blank')}>{val?.personalsocialMedia?.personalfacebook}</p>
                                    </Col>
                                    <Col lg={4} className='mb-4'>
                                        <h5>Instagram</h5>
                                        <p onClick={() => window.open(val?.personalsocialMedia?.personalinstagram, '_blank')}>{val?.personalsocialMedia?.personalinstagram}</p>
                                    </Col>
                                    <Col lg={4} className='mb-4'>
                                        <h5>Youtube Channel</h5>
                                        <p onClick={() => window.open(val?.personalsocialMedia?.personalyoutube, '_blank')}>{val?.personalsocialMedia?.personalyoutube}</p>
                                    </Col>
                                    <Col lg={4} className='mb-4'>
                                        <h5>Podcast Link</h5>
                                        <p onClick={() => window.open(val?.personalsocialMedia?.personalpodcast, '_blank')}>{val?.personalsocialMedia?.personalpodcast}</p>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </div>
                )}

            </Container>
        </div>
    )
}

export default Professionalprofile