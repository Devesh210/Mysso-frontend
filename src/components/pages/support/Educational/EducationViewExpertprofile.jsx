import React, { useState, useEffect, useRef } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom';
import 'react-phone-number-input/style.css'
import API_URL from '../../../../../config';

const EducationViewExpertprofile = () => {

    const Navigate = useNavigate();

    useEffect(() => {
        const url = window.location.href;
        const url1 = url.split("/")[3];
        const url2 = url1.split("?")[1];
        const id = url2.split("=")[1];
        getExpertData(id)
    }, [])

    const [expertdata, setExpertData] = useState([])

    const getExpertData = async (id) => {
        try {
            const requestOption = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            };
            await fetch(`${API_URL}/api/getEducationExpertById?id=${id}`, requestOption)
                .then((res) => res.json())
                .then((data) => {
                    console.log(data)
                    setExpertData(data?.data[0])
                })
        } catch (error) {
            console.log(error)
        }

    }

    console.log(expertdata)

    const formatDate = (date) => {
        const d = new Date(date);
        const dt = d.getDate();
        const mn = d.getMonth();
        const mnth = mn + 1;
        const yyyy = d.getFullYear();
        return `${dt}/${mnth}/${yyyy}`;
    }

    return (
        <div>
            <Container fluid className='matrimonialform mt-3 mb-5'>
                {/* <Row style={{ justifyContent: 'end' }}>
                    <Button className='addbtn' style={{ width: 'auto', marginBottom: '20px' }} onClick={() => Navigate(`/EducationExpertEditprofile?id=${expertdata?._id}`)}>Edit </Button>
                    <Button className='addbtn' style={{ width: 'auto', marginBottom: '20px' }} onClick={() => Navigate(`/profile`)}>Back To Profile </Button>
                </Row> */}
                <div className='profilegallery mb-5'>
                    <h3 className='text-center'>Basic Information</h3>
                    <div className='descr-content'>
                        <Row>

                            <Col lg={4} className='mb-4'>
                                <h5>Full Name </h5>
                                <p>{expertdata?.fullName}</p>
                            </Col>
                            <Col lg={4} className='mb-4'>
                                <h5>Email Address </h5>
                                <p>{expertdata?.email}</p>
                            </Col>
                            <Col lg={4} className='mb-4'>
                                <h5>Contact Number </h5>
                                <p>{expertdata?.contact}</p>
                            </Col>
                            <Col lg={4} className='mb-4'>
                                <h5>Country </h5>
                                <p>{expertdata?.countrydetails?.map(val => val.country_name)}</p>
                            </Col>
                            <Col lg={4} className='mb-4'>
                                <h5>State </h5>
                                <p>{expertdata?.statedetails?.map(val => val.state_name)}</p>
                            </Col>
                            <Col lg={4} className='mb-4'>
                                <h5>City </h5>
                                <p>{expertdata?.citydetails?.map(val => val.city_name)}</p>
                            </Col>
                            <Col lg={4} className='mb-4'>
                                <h5>Short Bio </h5>
                                <p className='text-break'>{expertdata?.bio}</p>
                            </Col>
                            <Col lg={12} className='mb-2'>
                                <Row>
                                    <Col lg={4} className='mb-4'>
                                        <h5>Profile Picture </h5>
                                        <div className='profileimgc'>
                                        
                                            <img className='prr' src={`${API_URL}/uploads/company_logo/${expertdata?.profile_pic?.map((val) => val.filename)}`} alt='profile' />

                                        </div>
                                    </Col>
                                    <Col lg={4} className='mb-4'>
                                        <h5>Business Card Front </h5>
                                        <div className='profileimgc'>
                                             {expertdata?.businesscardfront ?
                                            <img className='prr' src={`${API_URL}/uploads/business_card/${expertdata?.businesscardfront?.map((val) => val.filename)}`} alt='profile' />
:

                                                <p>{'NA'}</p>
                                            }
                                        </div>
                                    </Col>
                                    <Col lg={4} className='mb-4'>
                                        <h5>Business Card Back </h5>
                                        <div className='profileimgc'>
                                        {expertdata?.businesscardback ?
                                            <img className='prr' src={`${API_URL}/uploads/business_card/${expertdata?.businesscardback?.map((val) => val.filename)}`} alt='profile' />
 :

                                                <p>{'NA'}</p>
                                            }
                                        </div>
                                    </Col>

                                </Row>
                            </Col>
                        </Row>
                    </div>
                </div>

                <div className='profilegallery mb-5'>
                    <h3 className='text-center'>Professional Background</h3>
                    <div className='descr-content'>
                        <Row>
                            <Col lg={4} className='mb-4'>
                                <h5>Current Occupation </h5>
                                <p>{expertdata?.occupation}</p>
                            </Col>
                            <Col lg={4} className='mb-4'>
                                <h5>Years of Experience </h5>
                                <p>{expertdata?.experience}</p>
                            </Col>
                            <Col lg={4} className='mb-4'>
                                <h5>Industry of Expertise </h5>
                                <p>{expertdata?.industrydetails?.map(val => val?.startup_industry)}</p>
                            </Col>
                            <Col lg={4} className='mb-4'>
                                <h5>Educational Qualification </h5>
                                <p>{expertdata?.education}</p>
                            </Col>
                            <Col lg={4} className='mb-4'>
                                <h5>Certifications </h5>
                                <p>{expertdata?.certifications}</p>
                            </Col>
                            <Col lg={4} className='mb-4'>
                                <h5>Work Experience </h5>
                                <p>{expertdata?.work_experience}</p>
                            </Col>
                        </Row>
                    </div>
                </div>

                <div className='profilegallery mb-5'>
                    <h3 className='text-center'>Areas of Guidance Expertise Section</h3>
                    <div className='descr-content'>
                        <Row>
                            <Col lg={4} className='mb-4'>
                                <h5>Career Fields </h5>
                                <p className='text-break'>{expertdata?.career_fieldsdetails?.map(val => val?.education_fieldofstudy).join(', ')}</p>
                            </Col>
                            <Col lg={4} className='mb-4'>
                                <h5>Type of Guidance </h5>
                                <p className='text-break'>{expertdata?.guidance_typedetails?.map(val => val?.education_typeof_guidance).join(', ')}</p>
                            </Col>
                            <Col lg={4} className='mb-4'>
                                <h5>Target Audience </h5>
                                <p className='text-break'>{expertdata?.target_audiencedetails?.map(val => val?.education_target_audience).join(', ')}</p>
                            </Col>
                            <Col lg={4} className='mb-4'>
                                <h5>Specialized Skills </h5>
                                <p>{expertdata?.skills}</p>
                            </Col>
                        </Row>
                    </div>
                </div>

                <div className='profilegallery mb-5'>
                    <h3 className='text-center'>Session Information</h3>
                    <div className='descr-content'>
                        <Row>
                            <Col lg={4} className='mb-4'>
                                <h5>Preferred Mode of Consultation </h5>
                                <p className='text-break'>{expertdata?.consultation_modedetails?.map(val => val?.education_consultation).join(', ')}</p>
                            </Col>
                            <Col lg={4} className='mb-4'>
                                <h5>Preferred Time Slots </h5>
                                <p>{expertdata?.time_slots}</p>
                            </Col>
                            <Col lg={4} className='mb-4'>
                                <h5>Consultation Language </h5>
                                <p>{expertdata?.consultation_language}</p>
                            </Col>


                        </Row>
                    </div>
                </div>

            </Container>
        </div>
    )
}

export default EducationViewExpertprofile