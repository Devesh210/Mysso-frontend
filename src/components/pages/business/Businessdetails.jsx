import React, { useState, useEffect, useRef } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import profile from "../../../assets/profile.png"
import companylogo from "../../../assets/companylogo.png"
import dummyLogo from "../../../assets/dummyLogo.png"
import swal from 'sweetalert';
import PhoneInput, { formatPhoneNumber, formatPhoneNumberIntl, isValidPhoneNumber } from "react-phone-number-input";
import en from 'react-phone-number-input/locale/en';
import 'react-phone-number-input/style.css'
import API_URL from '../../../../config';

const Businessdetails = () => {
    const Navigate = useNavigate();

    useEffect(() => {
        const url = window.location.href;
        const url1 = url.split("/")[3];
        const url2 = url1.split("?")[1];
        const id = url2.split("=")[1];
        getBusinessdata(id)
    }, [])

    const [businessdata, setBusinessdata] = useState([])

    const getBusinessdata = async (id) => {
        try {
            const requestOption = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            };
            await fetch(`${API_URL}/api/getNetworkById?id=${id}`, requestOption)
                .then((res) => res.json())
                .then((data) => {
                    console.log(data)
                    setBusinessdata(data?.data[0])
                })
        } catch (error) {
            console.log(error)
        }

    }

    console.log(businessdata)



    return (
        <div>
            <Container fluid className='matrimonialform mt-5 mb-5'>
                <Row style={{ justifyContent: 'end' }}>
                    <Button className='addbtn' style={{ width: 'auto', marginBottom: '20px' }} onClick={() => Navigate(`/Businesseditform?id=${businessdata?._id}`)}>Edit </Button>
                    <Button className='addbtn' style={{ width: 'auto', marginBottom: '20px' }} onClick={() => Navigate(`/profile`)}>Back To Profile </Button>
                </Row>
                <div className='profilegallery mb-5'>
                    <h3 className='text-center'>Personal Information</h3>
                    <div className='descr-content'>
                        <Row>
                            <Col lg={4} className='mb-4'>
                                <h5>First Name</h5>
                                <p>{businessdata?.firstname}</p>
                            </Col>
                            <Col lg={4} className='mb-4'>
                                <h5>Last Name</h5>
                                <p>{businessdata?.lastname}</p>
                            </Col>
                            <Col lg={4} className='mb-4'>
                                <h5>Mobile Number</h5>
                                <p>{businessdata?.personalphone}</p>
                            </Col>
                            <Col lg={4} className='mb-4'>
                                <h5>Alternate Mobile Number</h5>
                                <p>{businessdata?.personalalternatephone}</p>
                            </Col>
                            <Col lg={4} className='mb-4'>
                                <h5>WhatsApp Number</h5>
                                <p>{businessdata?.personalwhatsapp}</p>
                            </Col>
                            <Col lg={4} className='mb-4'>
                                <h5>Email</h5>
                                <p>{businessdata?.personalemail}</p>
                            </Col>
                            <Col lg={4} className='mb-4'>
                                <h5>Location</h5>
                                <p>{businessdata?.personallocation}</p>

                            </Col>
                            <Col lg={4} className='mb-4'>
                                <h5>Country</h5>
                                <p>{`${businessdata?.country_details?.map((val) => val.country_name)}`}</p>
                            </Col>
                            <Col lg={4} className='mb-4'>
                                <h5>State</h5>
                                <p>{`${businessdata?.state_details?.map((val) => val.state_name)}`}</p>
                            </Col>
                            <Col lg={4} className='mb-4'>
                                <h5>City</h5>
                                <p>{`${businessdata?.city_details?.map((val) => val.city_name)}`}</p>
                            </Col>
                        </Row>
                    </div>
                </div>
                <div className='profilegallery mb-5'>
                    <h3 className='text-center'>Personal Social Profiles</h3>
                    <div className='descr-content'>
                        <Row>
                            <Col lg={4} className='mb-4'>
                                <h5>Personal Website </h5>
                                <p>{businessdata?.personallocation}</p>
                            </Col>
                            <Col lg={4} className='mb-4'>
                                <h5>Blog </h5>
                                <p>{businessdata?.personalblog}</p>
                            </Col>
                            <Col lg={4} className='mb-4'>
                                <h5>LinkedIn</h5>
                                <p>{businessdata?.personalsocialMedia?.personallinkedin}</p>
                            </Col>
                            <Col lg={4} className='mb-4'>
                                <h5>Twitter</h5>
                                <p>{businessdata?.personalsocialMedia?.personaltwitter}</p>
                            </Col>
                            <Col lg={4} className='mb-4'>
                                <h5>Facebook</h5>
                                <p>{businessdata?.personalsocialMedia?.personalfacebook}</p>
                            </Col>
                            <Col lg={4} className='mb-4'>
                                <h5>Instagram</h5>
                                <p>{businessdata?.personalsocialMedia?.personalinstagram}</p>
                            </Col>
                            <Col lg={4} className='mb-4'>
                                <h5>Youtube Channel</h5>
                                <p>{businessdata?.personalsocialMedia?.personalyoutube}</p>
                            </Col>
                            <Col lg={4} className='mb-4'>
                                <h5>Podcast Link</h5>
                                <p>{businessdata?.personalsocialMedia?.personalpodcast}</p>
                            </Col>
                        </Row>
                    </div>
                </div>
                <div className='profilegallery mb-5'>
                    <h3 className='text-center'>Company Information</h3>
                    <div className='descr-content'>
                        <Row>
                            <Row>
                                <Col lg={4}>
                                    <h5>Logo</h5>
                                    <div className='profileimgc12'>

                                        <img className='prr' src={!businessdata?.logo || businessdata?.logo?.length == 0 ? dummyLogo : `${API_URL}/uploads/company_logo/${businessdata?.logo?.map((val) => val.filename)}`} alt='profile' />

                                    </div>
                                </Col>
                                <Col lg={4}>
                                    <h5>Business Card Front</h5>
                                    <div className='profileimgc12'>

                                        <img className='prr' src={!businessdata?.businesscardfront || businessdata?.businesscardfront?.length == 0 ? dummyLogo : `${API_URL}/uploads/business_card/${businessdata?.businesscardfront?.map((val) => val.filename)}`} alt='profile' />

                                    </div>
                                </Col>
                                <Col lg={4}>
                                    <h5>Business Card Back</h5>
                                    <div className='profileimgc12'>

                                        <img className='prr' src={!businessdata?.businesscardback || businessdata?.businesscardback?.length == 0 ? dummyLogo : `${API_URL}/uploads/business_card/${businessdata?.businesscardback?.map((val) => val.filename)}`} alt='profile' />

                                    </div>
                                </Col>
                            </Row>
                            <Col lg={4} className='mb-4'>
                                <h5>Company Name</h5>
                                <p>{businessdata?.company_name}</p>
                            </Col>
                            <Col lg={4} className='mb-4'>
                                <h5>Industry Experience (In Years)</h5>
                                <p>{businessdata?.company_industry_exp}</p>
                            </Col>
                            <Col lg={4} className='mb-4'>
                                <h5>Company Type</h5>
                                <p>{businessdata?.company_type_details?.map(val => val.company_type)}</p>
                            </Col>
                            <Col lg={4} className='mb-4'>
                                <h5>Company Bio</h5>
                                <p>{businessdata?.company_bio}</p>
                            </Col>


                        </Row>
                    </div>
                </div>

                <div className='profilegallery mb-5'>
                    <h3 className='text-center'>Buisness Information</h3>
                    <div className='descr-content'>
                        <Row>
                            <Col lg={4} className='mb-4'>
                                <h5>Business Category (Industry)</h5>
                                <p>{businessdata?.businesscategory}</p>
                            </Col>
                            <Col lg={4} className='mb-4'>
                                <h5>Business Sub-Category</h5>
                                <p>{businessdata?.businesssubcategory}</p>
                            </Col>
                            <Col lg={4} className='mb-4'>
                                <h5>Business Type</h5>
                                <p>{businessdata?.business_type_details?.map(val => val.business_type)}</p>
                            </Col>
                            <Col lg={4} className='mb-4'>
                                <h5>Business Description</h5>
                                <p>{businessdata?.businessdescription}</p>
                            </Col>
                        </Row>
                    </div>
                </div>

                <div className='profilegallery mb-5'>
                    <h3 className='text-center'>Company Location</h3>
                    <div className='descr-content'>
                        <Row>
                            <Col lg={4} className='mb-4'>
                                <h5>Country</h5>
                                <p>{`${businessdata?.company_country_details?.map((val) => val.country_name)}`}</p>
                            </Col>
                            <Col lg={4} className='mb-4'>
                                <h5>State</h5>
                                <p>{`${businessdata?.company_state_details?.map((val) => val.state_name)}`}</p>
                            </Col>
                            <Col lg={4} className='mb-4'>
                                <h5>City</h5>
                                <p>{`${businessdata?.company_city_details?.map((val) => val.city_name)}`}</p>
                            </Col>
                            <Col lg={4} className='mb-4'>
                                <h5>Company Full Address</h5>
                                <p>{businessdata?.company_address}</p>
                            </Col>
                            <Col lg={4} className='mb-4'>
                                <h5>Branch 1</h5>
                                <p>{`${businessdata?.branch1}`}</p>
                            </Col>
                            <Col lg={4} className='mb-4'>
                                <h5>Branch 2</h5>
                                <p>{`${businessdata?.branch2}`}</p>
                            </Col>
                        </Row>
                    </div>
                </div>

                <div className='profilegallery mb-5'>
                    <h3 className='text-center'>Company Contact Details</h3>
                    <div className='descr-content'>
                        <Row>
                            <Col lg={4} className='mb-4'>
                                <h5>Phone</h5>
                                <p>{`${businessdata?.company_phone}`}</p>
                            </Col>
                            <Col lg={4} className='mb-4'>
                                <h5>Alternate Phone</h5>
                                <p>{`${businessdata?.company_alternate_phone}`}</p>
                            </Col>
                            <Col lg={4} className='mb-4'>
                                <h5>Whatsapp Number</h5>
                                <p>{`${businessdata?.company_whatsapp}`}</p>
                            </Col>
                            <Col lg={4} className='mb-4'>
                                <h5>Email</h5>
                                <p>{`${businessdata?.company_email}`}</p>

                            </Col>
                            <Col lg={4} className='mb-4'>
                                <h5>Website</h5>
                                <p>{`${businessdata?.company_website}`}</p>
                            </Col>
                        </Row>
                    </div>
                </div>

                <div className='profilegallery mb-5'>
                    <h3 className='text-center'>Company Social Profiles</h3>
                    <div className='descr-content'>
                        <Row>
                            <Col lg={6} className='mb-4'>
                                <h5>LinkedIn Link</h5>
                                <p>{`${businessdata?.companysocialMedia?.linkedinLink}`}</p>
                            </Col>
                            <Col lg={6} className='mb-4'>
                                <h5>Twitter Link</h5>
                                <p>{`${businessdata?.companysocialMedia?.twitterLink}`}</p>
                            </Col>
                            <Col lg={6} className='mb-4'>
                                <h5>Instagram Link</h5>
                                <p>{`${businessdata?.companysocialMedia?.instagramLink}`}</p>
                            </Col>
                            <Col lg={6} className='mb-4'>
                                <h5>Facebook Link</h5>
                                <p>{`${businessdata?.companysocialMedia?.facebookLink}`}</p>
                            </Col>
                            <Col lg={6} className='mb-4'>
                                <h5>Youtube Channel Link</h5>
                                <p>{`${businessdata?.companysocialMedia?.youtubeLink}`}</p>
                            </Col>
                            <Col lg={6} className='mb-4'>
                                <h5>Podcast Channel Link</h5>
                                <p>{`${businessdata?.companysocialMedia?.podcastLink}`}</p>
                            </Col>

                        </Row>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default Businessdetails;