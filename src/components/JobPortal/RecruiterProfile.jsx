import React from 'react';
import { Badge, Button, Col, Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import profilePlaceholder from "../../assets/matrimonial/searchimg.png";  // Placeholder image
import infoIcon from "../../assets/matrimonial/info.svg";
import homeIcon from "../../assets/matrimonial/home.svg";
import locationIcon from "../../assets/matrimonial/location.svg";
import Banner from '../pages/matrimonialsearch/Banner';
const RecruiterProfile = ({ profiledata }) => {
    const navigate = useNavigate();

    return (
        <>
            {/* <Banner /> */}
            <Container fluid className='matrimonial-profile pt-3'>
                <Row style={{ justifyContent: 'end' }}>
                    <Button className='addbtn' style={{ width: 'auto', marginBottom: '20px' }} onClick={() => navigate(`/job/editdata`)}>Edit Profile</Button>
                    <Button className='addbtn' style={{ width: 'auto', marginBottom: '20px' }} onClick={() => navigate(`/profile`)}>Back To Profile</Button>
                </Row>
                <Row>
                    <Col lg={3}>
                        <div className='profileleftsec'>
                            <div className=' text-center '>
                                <img className='prr  profiles text-center mt-3' src={profiledata?.personalDetails?.profilePhotoUrl} alt='profile' />
                            </div>

                            {profiledata && (
                                <div className='profilesectioncontent'>
                                    <h3 className='profilename'>{`${profiledata?.personalDetails?.first_name} ${profiledata?.personalDetails?.middle_name} ${profiledata?.personalDetails?.last_name}`}</h3>
                                    <h5 className='profileemail'>Role: {profiledata?.role}</h5>
                                    <h5 className='profileemail'>Email: {`${profiledata?.email}`}</h5>
                                    <h4 className='profilelocation'>
                                        <img src={locationIcon} alt='location' />
                                        {`${profiledata?.personalDetails?.currentAddress?.city_id?.city_name}, ${profiledata?.personalDetails?.currentAddress?.state_id?.state_name}, ${profiledata?.personalDetails?.currentAddress?.country_id?.country_name}`}
                                    </h4>
                                    <h3 className='currentdes'>Current Designation</h3>
                                    <p className='currentdes'>{profiledata?.company?.currentDesignation}</p>
                                </div>
                            )}
                        </div>
                    </Col>
                    <Col lg={9}>
                        <div className='profilegallery mb-4'>
                            <h3><img className='gallimg' src={infoIcon} alt="info" />BASIC INFORMATION</h3>
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
                                        <p>{profiledata?.personalDetails?.phone || 'N/A'}</p>
                                    </Col>

                                    {/* <Col lg={3} className='mb-4'>
                                        <h5>Street</h5>
                                        <p>{profiledata?.personalDetails?.currentAddress?.street}</p>
                                    </Col>
                                    <Col lg={3} className='mb-4'>
                                        <h5>zipCode</h5>
                                        <p>{profiledata?.personalDetails?.currentAddress?.zipCode}</p>
                                    </Col> */}
                                    <Col lg={3} className='mb-4'>
                                        <h5>Country</h5>
                                        <p>{profiledata?.personalDetails?.currentAddress?.country_id?.country_name}</p>
                                    </Col>
                                    <Col lg={3} className='mb-4'>
                                        <h5>State</h5>
                                        <p>{profiledata?.personalDetails?.currentAddress?.state_id?.state_name}</p>
                                    </Col>
                                    <Col lg={3} className='mb-4'>
                                        <h5>City</h5>
                                        <p>{profiledata?.personalDetails?.currentAddress?.city_id?.city_name}</p>
                                    </Col>

                                </Row>
                            </div>
                        </div>

                        <div className='profilegallery mb-4'>
                            <h3 className='mb-4'><img className='gallimg ' src={infoIcon} alt='skills' />Skills I hire for</h3>

                            <Row>
                                <Col lg={12} className='mb-4 '>

                                    {
                                        profiledata?.company?.skills && profiledata?.company?.skills.length > 0
                                            ? profiledata?.company?.skills.map((item, index) =>
                                                <Badge key={index} style={{ marginRight: '8px' }} className='badge-skills skill-block px-4'>
                                                    {item?.label}

                                                </Badge>
                                            )
                                            : <span>No skills available</span>
                                    }

                                </Col>
                            </Row>

                        </div>
                        <div className='profilegallery mb-4'>
                            <h3 className='mb-4'><img className='gallimg ' src={infoIcon} alt='skills' />Industry </h3>

                            <Row>
                                <Col lg={12} className='mb-4 '>
                                    {

                                        profiledata?.company?.industry && profiledata?.company?.industry.length > 0
                                            ? profiledata?.company?.industry.map((item, index) => (
                                                <Badge key={index} style={{ marginRight: '8px' }} className='badge-skills skill-block px-4'>
                                                    {item?.label}
                                                </Badge>
                                            )

                                            )
                                            : <span>N/A</span>
                                    }

                                </Col>
                            </Row>

                        </div>
                        <div className='profilegallery mb-4'>
                            <h3><img className='gallimg' src={infoIcon} alt='company' />COMPANY DETAILS</h3>
                            <div className='descr-content'>
                                <Row>
                                    <Col lg={3} className='mb-4'>
                                        <h5>Company Name</h5>
                                        <p>{profiledata?.company?.name || 'N/A'}</p>
                                    </Col>
                                    <Col lg={3} className='mb-4'>
                                        <h5>From</h5>
                                        <p>{profiledata?.company?.from || 'N/A'}</p>
                                    </Col>

                                    <Col lg={3} className='mb-4'>
                                        <h5>Company Address</h5>
                                        <p>
                                            {profiledata?.company?.address1 ? profiledata?.company?.address1 + ", " : ""}
                                            {profiledata?.company?.address2}
                                        </p>
                                    </Col>
                                    <Col lg={3} className='mb-4'>
                                        <h5>Country</h5>
                                        <p>{profiledata?.company?.country_id?.country_name}</p>
                                    </Col>
                                    <Col lg={3} className='mb-4'>
                                        <h5>State</h5>
                                        <p>{profiledata?.company?.state_id?.state_name}</p>
                                    </Col>
                                    <Col lg={3} className='mb-4'>
                                        <h5>City</h5>
                                        <p>{profiledata?.company?.city_id?.city_name}</p>
                                    </Col>

                                    <Col lg={3} className='mb-4'>
                                        <h5>Website</h5>
                                        <a href={profiledata?.company?.website}>{profiledata?.company?.website || 'N/A'}</a>
                                    </Col>
                                    <Col lg={3} className='mb-4'>
                                        <h5>Logo</h5>
                                        <img width={20} height={20} src={profiledata?.company?.logoUrl} />
                                    </Col>
                                </Row>
                            </div>
                        </div>
                        <div className='profilegallery mb-4'>
                            <h3><img className='gallimg' src={infoIcon} alt='company' />Hiring Preferences</h3>
                            <div className='descr-content'>
                                <Row>

                                    <Col lg={6} className='mb-4'>
                                        <h5>level I Hire For</h5>
                                        <p>{profiledata?.company?.levelIHireFor?.map((item) => item.label).join(",") || 'N/A'}</p>
                                    </Col>
                                    <Col lg={6} className='mb-4'>
                                        <h5>Industry</h5>
                                        <p>{profiledata?.company?.industry?.map((item) => item.label).join(",") || 'N/A'}</p>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                        {
                            profiledata?.company?.achievement?.length > 0 && <div className='profilegallery mb-4'>
                                <h3><img className='gallimg' src={infoIcon} alt='achievement' />ACHIEVEMENTS</h3>
                                <div className='descr-content'>
                                    <Row>
                                        {profiledata?.company?.achievement?.map((ach, index) => (
                                            <Col key={index} lg={12} className='mb-4'>
                                                <h5>Year: {ach.year}</h5>
                                                <p>{ach.description}</p>
                                            </Col>
                                        ))}
                                    </Row>
                                </div>
                            </div>
                        }

                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default RecruiterProfile;
