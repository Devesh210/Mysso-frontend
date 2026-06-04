import React, { useEffect, useState } from 'react';
import { Badge, Button, Col, Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import profile from "../../assets/matrimonial/searchimg.png";
import info from "../../assets/matrimonial/info.svg";
import home from "../../assets/matrimonial/home.svg";
import homeIcon from "../../assets/matrimonial/home.svg";
import Banner from '../pages/matrimonialsearch/Banner';
import location from "../../assets/matrimonial/location.svg";
import { processDataHideAndView } from '../../utils';
import configNames from "../../utils/config.json"

const JobSeekerProfile = ({ profiledata }) => {
    const Navigate = useNavigate();
    const processadditionalinformation = processDataHideAndView(profiledata?.additionalInformation, configNames.profiledata.additionalInformation);

    return (
        <>
            {/* <Banner /> */}
            <Container fluid className='matrimonial-profile pt-3'>
                <Row style={{ justifyContent: 'end' }}>
                    <Button className='addbtn' style={{ width: 'auto', marginBottom: '20px' }} onClick={() => Navigate(`/job/editdata`)}>Edit Profile</Button>
                    <Button className='addbtn' style={{ width: 'auto', marginBottom: '20px' }} onClick={() => Navigate(`/profile`)}>Back To Profile</Button>
                </Row>
                <Row>
                    <Col lg={3}>
                        <div>
                            <div className='profileleftsec'>
                                <div className=' text-center '>
                                    <img className='prr profiles text-center mt-3' src={profiledata?.personalDetails?.profilePhotoUrl} alt='profile' />
                                </div>
                                {profiledata && (
                                    <div className='profilesectioncontent'>
                                        <h3 className='profilename'>{`${profiledata?.personalDetails?.first_name} ${profiledata?.personalDetails?.middle_name} ${profiledata?.personalDetails?.last_name}`}</h3>
                                        <h5 className='profileemail'>Email: {profiledata?.email}</h5>
                                        <h6 className='profilephone'>Mobile No : {profiledata?.ContactDetails?.phone}</h6>
                                        <h4 className='profilelocation'><img src={location} alt='location' />{`${profiledata?.personalDetails?.currentAddress?.city_id?.city_name}, ${profiledata?.personalDetails?.currentAddress?.state_id?.state_name}, ${profiledata?.personalDetails?.currentAddress?.country_id?.country_name}`}</h4>
                                        <h3 className='currentdes'>Role</h3>
                                        <p className='currentdes'>{profiledata?.role}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </Col>
                    <Col lg={9}>
                        <div className='profilegallery mb-4'>
                            <h3><img className='gallimg' src={info} alt="info" />BASIC INFORMATION</h3>
                            <div className='descr-content'>
                                <Row>
                                    <Col lg={3} className='mb-4'>
                                        <h5>First Name</h5>
                                        <p>{profiledata?.personalDetails?.first_name || "N/A"}</p>
                                    </Col>
                                    <Col lg={3} className='mb-4'>
                                        <h5>Middle Name</h5>
                                        <p>{profiledata?.personalDetails?.middle_name || "N/A"}</p>
                                    </Col>
                                    <Col lg={3} className='mb-4'>
                                        <h5>Last Name</h5>
                                        <p>{profiledata?.personalDetails?.last_name || "N/A"}</p>
                                    </Col>
                                    <Col lg={3} className='mb-4'>
                                        <h5>Phone No</h5>
                                        <p>{profiledata?.ContactDetails?.phone || 'N/A'}</p>
                                    </Col>
                                    <Col lg={3} className='mb-4'>
                                        <h5>Date of Birth</h5>
                                        <p>{profiledata?.personalDetails?.dateOfBirth || "N/A"}</p>
                                    </Col>
                                    <Col lg={3} className='mb-4'>
                                        <h5>Place of Birth</h5>
                                        <p>{profiledata?.personalDetails?.placeOfBirth || "N/A"}</p>
                                    </Col>
                                    <Col lg={3} className='mb-4'>
                                        <h5>Age</h5>
                                        <p>{profiledata?.personalDetails?.age || "N/A"}</p>
                                    </Col>
                                    <Col lg={3} className='mb-4'>
                                        <h5>Languages Known</h5>
                                        <p>{profiledata?.personalDetails?.languagesKnown.length > 0 ? profiledata?.personalDetails?.languagesKnown?.map((item) => item).join(",") : "N/A"}</p>
                                    </Col>

                                </Row>
                            </div>
                        </div>


                        <div className='profilegallery mb-4'>
                            <h3><img className='gallimg' src={homeIcon} alt='home' />PRESENT ADDRESS</h3>
                            <div className='descr-content'>
                                <Row>
                                    <Col lg={4} className='mb-4'>
                                        <h5>Street</h5>
                                        <p>{profiledata?.personalDetails?.currentAddress?.street}</p>
                                    </Col>
                                    <Col lg={4} className='mb-4'>
                                        <h5>zipCode</h5>
                                        <p>{profiledata?.personalDetails?.currentAddress?.zipCode}</p>
                                    </Col>
                                    <Col lg={4} className='mb-4'>
                                        <h5>Country</h5>
                                        <p>{profiledata?.personalDetails?.currentAddress?.country_id?.country_name}</p>
                                    </Col>
                                    <Col lg={4} className='mb-4'>
                                        <h5>State</h5>
                                        <p>{profiledata?.personalDetails?.currentAddress?.state_id?.state_name}</p>
                                    </Col>
                                    <Col lg={4} className='mb-4'>
                                        <h5>City</h5>
                                        <p>{profiledata?.personalDetails?.currentAddress?.city_id?.city_name}</p>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                        <div className='profilegallery mb-4'>
                            <h3><img className='gallimg' src={homeIcon} alt='home' />Permanent Adress</h3>
                            <div className='descr-content'>
                                <Row>
                                    <Col lg={4} className='mb-4'>
                                        <h5>Street</h5>
                                        <p>{profiledata?.personalDetails?.permanentAddress?.street}</p>
                                    </Col>
                                    <Col lg={4} className='mb-4'>
                                        <h5>zipCode</h5>
                                        <p>{profiledata?.personalDetails?.permanentAddress?.zipCode}</p>
                                    </Col>
                                    <Col lg={4} className='mb-4'>
                                        <h5>Country</h5>
                                        <p>{profiledata?.personalDetails?.permanentAddress?.country_id?.country_name}</p>
                                    </Col>
                                    <Col lg={4} className='mb-4'>
                                        <h5>State</h5>
                                        <p>{profiledata?.personalDetails?.permanentAddress?.state_id?.state_name}</p>
                                    </Col>
                                    <Col lg={4} className='mb-4'>
                                        <h5>City</h5>
                                        <p>{profiledata?.personalDetails?.permanentAddress?.city_id?.city_name}</p>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                        <div className='profilegallery mb-4'>
                            <h3><img className='gallimg' src={info} alt="info" />Contact Details</h3>
                            <div className='descr-content'>
                                <Row>
                                    <Col lg={3} className='mb-4'>
                                        <h5>Whatsapp Phone No </h5>
                                        <p>{profiledata?.ContactDetails?.whatsappphone || "N/A"}</p>
                                    </Col>

                                    <Col lg={3} className='mb-4'>
                                        <h5> Portfolio Link  </h5>
                                        <a href={profiledata?.ContactDetails?.portfolioLink}>
                                            {
                                                profiledata?.ContactDetails?.portfolioLink || "N/A"
                                            }
                                        </a>
                                    </Col>
                                    <Col lg={3} className='mb-4'>
                                        <h5>Linkedin Profile Link</h5>
                                        <a href={profiledata?.ContactDetails?.linkedinprofileLink}>{profiledata?.ContactDetails?.linkedinprofileLink || "N/A"}</a>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                        {/* employmentdetails */}
                        <div className='profilegallery mb-4'>
                            <h3><img className='gallimg' src={info} alt="info" />Employment Details</h3>
                            <div className='descr-content'>
                                <Row>
                                    <Col lg={3} className='mb-4'>
                                        <h5 className='text-capitalize'>Employment Status </h5>
                                        <p>{profiledata?.employmentdetails?.employmentStatus || "N/A"}</p>
                                    </Col>
                                    <Col lg={3} className='mb-4'>
                                        <h5 className='text-capitalize'>experience </h5>
                                        <p>{profiledata?.employmentdetails?.experience}</p>
                                    </Col>
                                    <Col lg={3} className='mb-4'>
                                        <h5 className='text-capitalize'>Job Type </h5>
                                        <p>{profiledata?.employmentdetails?.jobtype || "N/A"}</p>
                                    </Col>
                                    <Col lg={3} className='mb-4'>
                                        <h5 className='text-capitalize'>Career level </h5>
                                        <p>{profiledata?.employmentdetails?.careerlevel?.label || "N/A"}</p>
                                    </Col>
                                    <Col lg={3} className='mb-4'>
                                        <h5 className='text-capitalize'>Industry </h5>
                                        <p>{profiledata?.employmentdetails?.industry?.title || "N/A"}</p>
                                    </Col>
                                    <Col lg={3} className='mb-4'>
                                        <h5 className='text-capitalize'>Functional Area </h5>
                                        <p>{profiledata?.employmentdetails?.functionalarea?.label || "N/A"}</p>
                                    </Col>
                                    <Col lg={3} className='mb-4'>
                                        <h5 className='text-capitalize'>Specialization </h5>
                                        <p>{profiledata?.employmentdetails?.Specialization || "N/A"}</p>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                        <div className='profilegallery mb-4'>
                            <h3><img className='gallimg' src={profile} alt="education" />EDUCATION DETAILS</h3>
                            <div className='descr-content'>
                                {profiledata?.educationDetails?.map((education, index) => (
                                    <Row key={index} className='mb-4'>
                                        <Col lg={3}>
                                            <h5>Degree</h5>
                                            <p>{education?.degree || 'N/A'}</p>
                                        </Col>
                                        <Col lg={3}>
                                            <h5>Institution</h5>
                                            <p>{education?.institution || 'N/A'}</p>
                                        </Col>
                                        <Col lg={3}>
                                            <h5>Year of Passing</h5>
                                            <p>{education?.yearOfCompletion || 'N/A'}</p>
                                        </Col>
                                        <Col lg={3}>
                                            <h5>Percentage/CGPA</h5>
                                            <p>{education?.percentage || 'N/A'}</p>
                                        </Col>
                                    </Row>
                                ))}
                            </div>
                        </div>
                        <div className='profilegallery mb-4'>
                            <h3><img className='gallimg' src={profile} alt="skills" />SKILLS</h3>
                            <div className='descr-content'>
                                <Row>
                                    <Col lg={12} className='mb-4'>
                                        <h5>Skills</h5>
                                        {
                                            profiledata?.keySkills && profiledata?.keySkills.length > 0
                                                ? profiledata?.keySkills.map((item, index) =>
                                                    <Badge key={index} style={{ marginRight: '8px' }} className='badge-skills skill-block px-4'>
                                                        {item?.skill}
                                                        <span style={{ marginRight: '8px' }}>({item?.proficiency})</span> {/* Add margin between skill and proficiency */}
                                                    </Badge>
                                                )
                                                : <span>No skills available</span>
                                        }
                                    </Col>
                                </Row>
                            </div>

                        </div>

                        <div className='profilegallery mb-4'>
                            <h3><img className='gallimg' src={info} alt="communication" />COMMUNICATION SKILLS</h3>
                            <div className='descr-content'>
                                <Row>
                                    {
                                        profiledata?.communicationSkills ?
                                            Object.keys(profiledata?.communicationSkills).map((item) => (
                                                <Col lg={3} className='mb-4'>
                                                    <h5 className='text-capitalize'>{item}</h5>
                                                    <p className='text-capitalize'>{profiledata?.communicationSkills[item]}</p>
                                                </Col>
                                            )) :
                                            <></>
                                    }
                                </Row>
                            </div>
                        </div>


                        <div className='profilegallery mb-4'>
                            <h3><img className='gallimg' src={profile} alt="education" />Additional Information</h3>
                            <div className='descr-content'>
                                <Row>
                                    {
                                        processadditionalinformation ?
                                            Object.keys(processadditionalinformation).map((item) => (
                                                <Col lg={processadditionalinformation[item]["name"] && processadditionalinformation[item]["link"] ? 6 : 3} className='mb-4'>
                                                    <h5 className='text-capitalize'>{item}</h5>

                                                    {processadditionalinformation[item]["name"] && processadditionalinformation[item]["link"] ?

                                                        <a href={`${processadditionalinformation[item]["link"]}`}>
                                                            {processadditionalinformation[item]["name"]}
                                                        </a> :
                                                        <p> {processadditionalinformation[item]}</p>
                                                    }


                                                </Col>
                                            )) :
                                            <></>
                                    }
                                </Row>
                            </div>
                        </div>

                    </Col>
                </Row>
            </Container>
        </>
    )



};

export default JobSeekerProfile;
