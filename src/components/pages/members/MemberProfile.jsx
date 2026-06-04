import React, { useState, useEffect, useRef } from 'react'
import { Col, Container, Form, Row, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import PhoneInput, { formatPhoneNumber, formatPhoneNumberIntl, isValidPhoneNumber } from "react-phone-number-input";
import en from 'react-phone-number-input/locale/en';
import 'react-phone-number-input/style.css';
// import profile from "../../../../assets/profile.png";
import Select from 'react-select';
import API_URL from '../../../../config';

const MemberProfile = () => {
    const Navigate = useNavigate();



    useEffect(() => {
        const url = window.location.href;
        const url1 = url.split("/")[3];
        const url2 = url1.split("?")[1];
        const id = url2.split("=")[1];
        getMemberdata(id)
    }, [])

    const [memberdata, setMemberdata] = useState([])

    const getMemberdata = async (id) => {
        try {
            const requestOption = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            };
            await fetch(`${API_URL}/api/getMemberById?id=${id}`, requestOption)
                .then((res) => res.json())
                .then((data) => {
                    console.log(data)
                    setMemberdata(data?.data[0])
                })
        } catch (error) {
            console.log(error)
        }

    }

    console.log(memberdata)

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
                    <Button className='addbtn' style={{ width: 'auto', marginBottom: '20px' }} onClick={() => Navigate(`/MemberProfileEdit?id=${memberdata?._id}`)}>Edit </Button>
                    <Button className='addbtn' style={{ width: 'auto', marginBottom: '20px' }} onClick={() => Navigate(`/profile`)}>Back To Profile </Button>
                </Row>
                <div className='profilegallery mb-5'>
                    <h3 className='text-center'>Personal Information</h3>
                    <div className='descr-content'>
                        <Row>

                            <Col lg={4} className='mb-4'>
                                <label>Full Name </label>
                                <p>{memberdata?.fullName}</p>
                            </Col>
                            <Col lg={4} className='mb-4'>
                                <label>Email id </label>
                                <p>{memberdata?.email}</p>
                            </Col>
                            <Col lg={4} className='mb-4'>
                                <label>Contact Number </label>
                                <p>{memberdata?.contact}</p>
                            </Col>
                            <Col lg={4} className='mb-4'>
                                <label>Country </label>
                                <p>{memberdata?.countrydetails?.map(val => val?.country_name)}</p>
                            </Col>
                            <Col lg={4} className='mb-4'>
                                <label>State </label>
                                <p>{memberdata?.statedetails?.map(val => val?.state_name)}</p>
                            </Col>
                            <Col lg={4} className='mb-4'>
                                <label>City </label>
                                <p>{memberdata?.citydetails?.map(val => val?.city_name)}</p>
                            </Col>
                            <Col lg={4} className='mb-4'>
                                <label>Residential Address </label>
                                <p>{memberdata?.residentialAddress}</p>
                            </Col>
                            <Col lg={4} className='mb-4'>
                                <label>Office Address </label>
                                <p>{memberdata?.officeAddress}</p>
                            </Col>
                            <Col lg={4} className='mb-4'>
                                <label>Profile Picture </label>
                                <div className='profileimgc'>
                                    <img className='prr' src={`${API_URL}/uploads/user_profile/${memberdata?.profilePicture?.map((val) => val.filename)}`} alt='profile' />
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>

                <div className='profilegallery mb-5'>
                    <h3 className='text-center'>Additional Information</h3>
                    <div className='descr-content'>
                        <Row>
                            <Col lg={4} className='mb-4'>
                                <label>Business / Profession Details </label>
                                <p>{memberdata?.businessDetails}</p>
                            </Col>
                            <Col lg={4} className='mb-4'>
                                <label>Choose Membership Tier </label>
                                <p>{memberdata?.membershipTier}</p>
                            </Col>
                            <Col lg={4} className='mb-4'>
                                <label>Short Bio </label>
                                <p>{memberdata?.shortBio}</p>
                            </Col>
                            <Col lg={4} className='mb-4'>
                                <label>Purpose of becoming a Member </label>
                                <p>{memberdata?.purpose}</p>
                            </Col>
                            <Col lg={4} className='mb-4'>
                                <label>Do you want to publish your details on the ShreeSSO website? </label>
                                <p>{memberdata?.publishDetails}</p>
                            </Col>
                            {memberdata?.membershipTier === "Chief Patron Member" &&
                                <Col lg={4} className='mb-4'>
                                    <label>Do you want to become Director of ShreeSSO? </label>
                                    <p>{memberdata?.directorMySSO}</p>
                                </Col>
                            }
                        </Row>
                    </div>
                </div>
              
            </Container>
        </div>
    )
}

export default MemberProfile