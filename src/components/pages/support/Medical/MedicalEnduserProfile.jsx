import React, { useState, useEffect, useRef } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom';
import 'react-phone-number-input/style.css'
import API_URL from '../../../../../config';

const MedicalEnduserProfile = () => {
    const Navigate = useNavigate();

    useEffect(() => {
        const url = window.location.href;
        const url1 = url.split("/")[3];
        const url2 = url1.split("?")[1];
        const id = url2.split("=")[1];
        getEnduserdata(id)
    }, [])

    const [enduserdata, setEnduserdata] = useState([])

    const getEnduserdata = async (id) => {
        try {
            const requestOption = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            };
            await fetch(`${API_URL}/api/getEnduserById?id=${id}`, requestOption)
                .then((res) => res.json())
                .then((data) => {
                    console.log(data)
                    setEnduserdata(data?.data[0])
                })
        } catch (error) {
            console.log(error)
        }

    }

    console.log(enduserdata)

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
            <Container fluid className='matrimonialform mt-5 mb-5'>
                <Row style={{ justifyContent: 'end' }}>
                    <Button className='addbtn' style={{ width: 'auto', marginBottom: '20px' }} onClick={() => Navigate(`/MedicalEnduserEditProfile?id=${enduserdata?._id}`)}>Edit </Button>
                    <Button className='addbtn' style={{ width: 'auto', marginBottom: '20px' }} onClick={() => Navigate(`/profile`)}>Back To Profile </Button>
                </Row>
                <div className='profilegallery mb-5'>
                    <h3 className='text-center'>Personal Information</h3>
                    <div className='descr-content'>
                        <Row>
                           
                            <Col lg={4} className='mb-4'>
                                <h5>Full Name </h5>
                                <p>{enduserdata?.fullName}</p>
                            </Col>
                            <Col lg={4} className='mb-4'>
                                <h5>Email Id </h5>
                                <p>{enduserdata?.email}</p>
                            </Col>
                            <Col lg={4} className='mb-4'>
                                <h5>Contact Number </h5>
                                <p>{enduserdata?.contactNumber}</p>
                            </Col>
                            <Col lg={4} className='mb-4'>
                                <h5>Profile Picture </h5>
                                <div className='profileimgc'>

                                    <img className='prr' src={`${API_URL}/uploads/user_profile/${enduserdata?.profilePicture?.map((val) => val.filename)}`} alt='profile' />

                                </div>
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
                                <p>{enduserdata?.age}</p>
                            </Col>
                            <Col lg={4} className='mb-4'>
                                <h5>Gender </h5>
                                <p>{enduserdata?.gender}</p>
                            </Col>
                            <Col lg={4} className='mb-4'>
                                <h5>Country </h5>
                                <p>{enduserdata?.countrydetails?.map(val => val?.country_name)}</p>
                            </Col>
                            <Col lg={4} className='mb-4'>
                                <h5>State  </h5>
                                <p>{enduserdata?.statedetails?.map(val => val?.state_name)}</p>
                            </Col>
                            <Col lg={4} className='mb-4'>
                                <h5>City</h5>
                                <p>{enduserdata?.citydetails?.map(val => val?.city_name)}</p>
                            </Col>
                            <Col lg={4} className='mb-4'>
                                <h5>Preferred Language </h5>
                                <p>{enduserdata?.preferredLanguage}</p>
                            </Col>
                        </Row>
                    </div>
                </div>

                <div className='profilegallery mb-5'>
                    <h3 className='text-center'>Emergency Contact</h3>
                    <div className='descr-content'>
                        <Row>
                            <Col lg={4} className='mb-4'>
                                <h5>Emergency Contact Name </h5>
                                <p>{enduserdata?.emergencyContactName}</p>
                            </Col>
                            <Col lg={4} className='mb-4'>
                                <h5>Relationship </h5>
                                <p>{enduserdata?.relationship}</p>
                            </Col>
                            <Col lg={4} className='mb-4'>
                                <h5>Emergency Contact Country </h5>
                                <p>{enduserdata?.emergencyCountrydetails?.map(val => val?.country_name)}</p>
                            </Col>
                            <Col lg={4} className='mb-4'>
                                <h5>Emergency Contact State </h5>
                                <p>{enduserdata?.emergencyStatedetails?.map(val => val?.state_name)}</p>
                            </Col>
                            <Col lg={4} className='mb-4'>
                                <h5>Emergency Contact City </h5>
                                <p>{enduserdata?.emergencyCitydetails?.map(val => val?.city_name)}</p>
                            </Col>
                        </Row>
                    </div>
                </div>

                <div className='profilegallery mb-5'>
                    <h3 className='text-center'>Medical History</h3>
                    <div className='descr-content'>
                        <Row>
                            <Col lg={4} className='mb-4'>
                                <h5>Past Treatments </h5>
                                <p>{enduserdata?.pastTreatments}</p>
                            </Col>
                            <Col lg={4} className='mb-4'>
                                <h5>Regular Medication </h5>
                                <p>{enduserdata?.regularMedication}</p>
                            </Col>
                        </Row>
                    </div>
                </div>

                <div className='profilegallery mb-5'>
                    <h3 className='text-center'>Insurance Information</h3>
                    <div className='descr-content'>
                        <Row>
                            <Col lg={4} className='mb-4'>
                                <h5>Insurance Provider </h5>
                                <p>{enduserdata?.insuranceProvider}</p>
                            </Col>
                            <Col lg={4} className='mb-4'>
                                <h5>Coverage Details </h5>
                                <p>{enduserdata?.coverageDetails}</p>
                            </Col>
                        </Row>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default MedicalEnduserProfile