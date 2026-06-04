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

const Professiondetails = () => {
    const Navigate = useNavigate();

    useEffect(() => {
        const url = window.location.href;
        const url1 = url.split("/")[3];
        const url2 = url1.split("?")[1];
        const id = url2.split("=")[1];
        getProfessionaldata(id)
    }, [])

    const [professionaldata, setProfessionaldata] = useState([])

    const getProfessionaldata = async (id) => {
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
                    setProfessionaldata(data?.data[0])
                })
        } catch (error) {
            console.log(error)
        }

    }

    console.log(professionaldata)



    return (
        <div>
            <Container fluid className='matrimonialform mt-5 mb-5'>
                <Row style={{ justifyContent: 'end' }}>
                    <Button className='addbtn' style={{ width: 'auto', marginBottom: '20px' }} onClick={() => Navigate(`/Professionaleditform?id=${professionaldata?._id}`)}>Edit </Button>
                    <Button className='addbtn' style={{ width: 'auto', marginBottom: '20px' }} onClick={() => Navigate(`/profile`)}>Back To Profile </Button>
                </Row>
                <div className='profilegallery mb-5'>
                    <h3 className='text-center'>Personal Information</h3>
                    <div className='descr-content'>
                        <Row>
                            <Col lg={4} className='mb-4'>
                                <h5>First Name</h5>
                                <p>{professionaldata?.firstname}</p>
                            </Col>
                            <Col lg={4} className='mb-4'>
                                <h5>Last Name</h5>
                                <p>{professionaldata?.lastname}</p>
                            </Col>
                            <Col lg={4} className='mb-4'>
                                <h5>Mobile Number</h5>
                                <p>{professionaldata?.personalphone}</p>
                            </Col>
                            <Col lg={4} className='mb-4'>
                                <h5>WhatsApp Number</h5>
                                <p>{professionaldata?.personalwhatsapp}</p>
                            </Col>
                            <Col lg={4} className='mb-4'>
                                <h5>Email</h5>
                                <p>{professionaldata?.personalemail}</p>
                            </Col>
                            <Col lg={4} className='mb-4'>
                                <h5>Location</h5>
                                <p>{professionaldata?.personallocation}</p>

                            </Col>
                            <Col lg={4} className='mb-4'>
                                <h5>Country</h5>
                                <p>{`${professionaldata?.country_details?.map((val) => val.country_name)}`}</p>
                            </Col>
                            <Col lg={4} className='mb-4'>
                                <h5>State</h5>
                                <p>{`${professionaldata?.state_details?.map((val) => val.state_name)}`}</p>
                            </Col>
                            <Col lg={4} className='mb-4'>
                                <h5>City</h5>
                                <p>{`${professionaldata?.city_details?.map((val) => val.city_name)}`}</p>
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
                                <p>{professionaldata?.personallocation}</p>
                            </Col>
                            <Col lg={4} className='mb-4'>
                                <h5>Blog </h5>
                                <p>{professionaldata?.personalblog}</p>
                            </Col>
                            <Col lg={4} className='mb-4'>
                                <h5>LinkedIn</h5>
                                <p>{professionaldata?.companysocialMedia?.linkedinLink}</p>
                            </Col>
                            <Col lg={4} className='mb-4'>
                                <h5>Twitter</h5>
                                <p>{professionaldata?.companysocialMedia?.twitterLink}</p>
                            </Col>
                            <Col lg={4} className='mb-4'>
                                <h5>Facebook</h5>
                                <p>{professionaldata?.companysocialMedia?.facebookLink}</p>
                            </Col>
                            <Col lg={4} className='mb-4'>
                                <h5>Instagram</h5>
                                <p>{professionaldata?.companysocialMedia?.instagramLink}</p>
                            </Col>
                            <Col lg={4} className='mb-4'>
                                <h5>Youtube Channel</h5>
                                <p>{professionaldata?.companysocialMedia?.youtubeLink}</p>
                            </Col>
                            <Col lg={4} className='mb-4'>
                                <h5>Podcast Link</h5>
                                <p>{professionaldata?.companysocialMedia?.podcastLink}</p>
                            </Col>
                        </Row>
                    </div>
                </div>
                <div className='profilegallery mb-5'>
                    <h3 className='text-center'>Profession Information</h3>
                    <div className='descr-content'>
                        <Row>
                            <Row>
                                <Col lg={4}>
                                    <h5>Logo</h5>
                                    <div className='profileimgc12'>

                                        <img className='prr' src={!professionaldata?.logo || professionaldata?.logo?.length == 0 ? dummyLogo :  `${API_URL}/uploads/company_logo/${professionaldata?.logo?.map((val) => val.filename)}`} alt='profile' />
            
                                    </div>
                                </Col>
                                <Col lg={4}>
                                    <h5>Business Card Front</h5>
                                    <div className='profileimgc12'>

                                        <img className='prr' src={!professionaldata?.businesscardfront || professionaldata?.businesscardfront?.length == 0 ? dummyLogo : `${API_URL}/uploads/business_card/${professionaldata?.businesscardfront?.map((val) => val.filename)}`} alt='profile' />

                                    </div>
                                </Col>
                                <Col lg={4}>
                                    <h5>Business Card Back</h5>
                                    <div className='profileimgc12'>

                                        <img className='prr' src={!professionaldata?.businesscardback || professionaldata?.businesscardback?.length == 0 ? dummyLogo : `${API_URL}/uploads/business_card/${professionaldata?.businesscardback?.map((val) => val.filename)}`} alt='profile' />

                                    </div>
                                </Col>
                            </Row>
                            <Col lg={4} className='mb-4'>
                                <h5>Profession</h5>
                                <p>{professionaldata?.profession}</p>
                            </Col>
                            <Col lg={4} className='mb-4'>
                                <h5>Professional Experience (In Years)</h5>
                                <p>{professionaldata?.professional_industry_exp}</p>
                            </Col>
                            <Col lg={4} className='mb-4'>
                                <h5>Profession Type</h5>
                                <p>{professionaldata?.profession_type}</p>
                            </Col>
                            <Col lg={4} className='mb-4'>
                                <h5>Firm Name</h5>
                                <p>{professionaldata?.Firmname}</p>
                            </Col>
                            <Col lg={4} className='mb-4'>
                                <h5>Profession Bio</h5>
                                <p>{professionaldata?.company_bio}</p>
                            </Col>
                            <Col lg={4} className='mb-4'>
                                <h5>Profession Description</h5>
                                <p>{professionaldata?.profession_desc}</p>
                            </Col>

                        </Row>
                    </div>
                </div>

                <div className='profilegallery mb-5'>
                    <h3 className='text-center'>Firm/Profession Location</h3>
                    <div className='descr-content'>
                        <Row>
                            <Col lg={4} className='mb-4'>
                                <h5>Country</h5>
                                <p>{`${professionaldata?.company_country_details?.map((val) => val.country_name)}`}</p>
                            </Col>
                            <Col lg={4} className='mb-4'>
                                <h5>State</h5>
                                <p>{`${professionaldata?.company_state_details?.map((val) => val.state_name)}`}</p>
                            </Col>
                            <Col lg={4} className='mb-4'>
                                <h5>City</h5>
                                <p>{`${professionaldata?.company_city_details?.map((val) => val.city_name)}`}</p>
                            </Col>
                            <Col lg={4} className='mb-4'>
                                <h5>Address</h5>
                                <p>{`${professionaldata?.company_address}`}</p>
                            </Col>
                            <Col lg={4} className='mb-4'>
                                <h5>Branch 1</h5>
                                <p>{`${professionaldata?.branch1}`}</p>
                            </Col>
                            <Col lg={4} className='mb-4'>
                                <h5>Branch 2</h5>
                                <p>{`${professionaldata?.branch2}`}</p>
                            </Col>
                        </Row>
                    </div>
                </div>

                <div className='profilegallery mb-5'>
                    <h3 className='text-center'>Firm/Profession Contact Details</h3>
                    <div className='descr-content'>
                        <Row>
                            <Col lg={4} className='mb-4'>
                                <h5>Phone Number</h5>
                                <p>{`${professionaldata?.company_phone}`}</p>
                            </Col>
                            <Col lg={4} className='mb-4'>
                                <h5>Alternate Phone Number</h5>
                                <p>{`${professionaldata?.company_alternate_phone}`}</p>
                            </Col>
                            <Col lg={4} className='mb-4'>
                                <h5>Whatsapp Number</h5>
                                <p>{`${professionaldata?.company_whatsapp}`}</p>
                            </Col>
                            <Col lg={4} className='mb-4'>
                                <h5>Email</h5>
                                <p>{`${professionaldata?.company_email}`}</p>

                            </Col>
                            <Col lg={4} className='mb-4'>
                                <h5>Website</h5>
                                <p>{`${professionaldata?.company_website}`}</p>
                            </Col>
                        </Row>
                    </div>
                </div>

                <div className='profilegallery mb-5'>
                    <h3 className='text-center'>Firm/Profession Social Profiles</h3>
                    <div className='descr-content'>
                        <Row>
                            <Col lg={6} className='mb-4'>
                                <h5>LinkedIn Link</h5>
                                <p>{`${professionaldata?.companysocialMedia?.linkedinLink}`}</p>
                            </Col>
                            <Col lg={6} className='mb-4'>
                                <h5>Twitter Link</h5>
                                <p>{`${professionaldata?.companysocialMedia?.twitterLink}`}</p>
                            </Col>
                            <Col lg={6} className='mb-4'>
                                <h5>Instagram Link</h5>
                                <p>{`${professionaldata?.companysocialMedia?.instagramLink}`}</p>
                            </Col>
                            <Col lg={6} className='mb-4'>
                                <h5>Facebook Link</h5>
                                <p>{`${professionaldata?.companysocialMedia?.facebookLink}`}</p>
                            </Col>
                            <Col lg={6} className='mb-4'>
                                <h5>Youtube Channel Link</h5>
                                <p>{`${professionaldata?.companysocialMedia?.youtubeLink}`}</p>
                            </Col>
                            <Col lg={6} className='mb-4'>
                                <h5>Podcast Channel Link</h5>
                                <p>{`${professionaldata?.companysocialMedia?.podcastLink}`}</p>
                            </Col>

                        </Row>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default Professiondetails;