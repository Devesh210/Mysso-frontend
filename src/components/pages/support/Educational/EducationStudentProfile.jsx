import React, { useState, useEffect, useRef } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom';
import 'react-phone-number-input/style.css'
import API_URL from '../../../../../config';

const EducationStudentProfile = () => {

    const Navigate = useNavigate();

    useEffect(() => {
        const url = window.location.href;
        const url1 = url.split("/")[3];
        const url2 = url1.split("?")[1];
        const id = url2.split("=")[1];
        getStudentData(id)
    }, [])

    const [studentdata, setStudentData] = useState([])

    const getStudentData = async (id) => {
        try {
            const requestOption = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            };
            await fetch(`${API_URL}/api/getEducationStudentById?id=${id}`, requestOption)
                .then((res) => res.json())
                .then((data) => {
                    console.log(data)
                    setStudentData(data?.data[0])
                })
        } catch (error) {
            console.log(error)
        }

    }

    console.log(studentdata)

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
                <Row style={{ justifyContent: 'end' }}>
                    <Button className='addbtn' style={{ width: 'auto', marginBottom: '20px' }} onClick={() => Navigate(`/EducationStudentEditprofile?id=${studentdata?._id}`)}>Edit </Button>
                    <Button className='addbtn' style={{ width: 'auto', marginBottom: '20px' }} onClick={() => Navigate(`/profile`)}>Back To Profile </Button>
                </Row>
                <div className='profilegallery mb-5'>
                    <h3 className='text-center'>Basic Information</h3>
                    <div className='descr-content'>
                        <Row>

                            <Col lg={4} className='mb-4'>
                                <h5>Full Name </h5>
                                <p>{studentdata?.fullName}</p>
                            </Col>
                            <Col lg={4} className='mb-4'>
                                <h5>Email Address </h5>
                                <p>{studentdata?.email}</p>
                            </Col>
                            <Col lg={4} className='mb-4'>
                                <h5>Contact No. </h5>
                                <p>{studentdata?.contact}</p>
                            </Col>
                            <Col lg={4} className='mb-4'>
                                <h5>Short Bio </h5>
                                <p>{studentdata?.bio}</p>
                            </Col>
                            <Col lg={4} className='mb-4'>
                                <h5>Profile Picture </h5>
                                <div className='profileimgc'>

                                    <img className='prr' src={`${API_URL}/uploads/user_profile/${studentdata?.profile_pic?.map((val) => val.filename)}`} alt='profile' />

                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>

                <div className='profilegallery mb-5'>
                    <h3 className='text-center'>Educational Background</h3>
                    <div className='descr-content'>
                        <Row>
                            <Col lg={4} className='mb-4'>
                                <h5>Current Education </h5>
                                <p>{studentdata?.currentEducationdetails?.map(val => val?.education_list)}</p>
                            </Col>
                            <Col lg={4} className='mb-4'>
                                <h5>Field of Study </h5>
                                <p>{studentdata?.fieldStudydetails?.map(val => val?.education_fieldofstudy)}</p>
                            </Col>
                            <Col lg={4} className='mb-4'>
                                <h5>Current School/College Name </h5>
                                <p>{studentdata?.schoolCollege}</p>
                            </Col>
                            <Col lg={4} className='mb-4'>
                                <h5>Highest Qualification Completed </h5>
                                <p>{studentdata?.qualificationdetails?.map(val => val?.education_list)}</p>
                            </Col>
                        </Row>
                    </div>
                </div>

                <div className='profilegallery mb-5'>
                    <h3 className='text-center'>Career Preferences</h3>
                    <div className='descr-content'>
                        <Row>
                            <Col lg={4} className='mb-4'>
                                <h5>Career Interest </h5>
                                <p>{studentdata?.careerInterest}</p>
                            </Col>
                            <Col lg={4} className='mb-4'>
                                <h5>Preferred Career Path </h5>
                                <p>{studentdata?.careerPath}</p>
                            </Col>
                            <Col lg={4} className='mb-4'>
                                <h5>Skills or Subjects of Interest </h5>
                                <p>{studentdata?.skills}</p>
                            </Col>
                            <Col lg={4} className='mb-4'>
                                <h5>Current Goals </h5>
                                <p>{studentdata?.goals}</p>
                            </Col>
                        </Row>
                    </div>
                </div>

                <div className='profilegallery mb-5'>
                    <h3 className='text-center'>Demographics</h3>
                    <div className='descr-content'>
                        <Row>
                            <Col lg={4} className='mb-4'>
                                <h5>Age </h5>
                                <p>{studentdata?.age}</p>
                            </Col>
                            <Col lg={4} className='mb-4'>
                                <h5>Gender </h5>
                                <p>{studentdata?.gender}</p>
                            </Col>
                            <Col lg={4} className='mb-4'>
                                <h5>Languages </h5>
                                <p>{studentdata?.languages}</p>
                            </Col>  
                            <Col lg={4} className='mb-4'>
                                <h5>Country </h5>
                                <p>{studentdata?.countrydetails?.map(val => val.country_name)}</p>
                            </Col>
                            <Col lg={4} className='mb-4'>
                                <h5>State </h5>
                                <p>{studentdata?.statedetails?.map(val => val.state_name)}</p>
                            </Col>
                            <Col lg={4} className='mb-4'>
                                <h5>City </h5>
                                <p>{studentdata?.citydetails?.map(val => val.city_name)}</p>
                            </Col>

                        </Row>
                    </div>
                </div>

            </Container>
        </div>
    )
}

export default EducationStudentProfile