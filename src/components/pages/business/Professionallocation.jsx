import React, { useEffect, useState, useRef } from 'react';
import banner from "../../../assets/business/businessbann.png"
import wipro from "../../../assets/business/clogo.svg"
import twitter from "../../../assets/business/social1.svg"
import linkd from "../../../assets/business/social2.svg"
import fb from "../../../assets/business/social3.svg"
import teleg from "../../../assets/business/social4.svg"
import instagram from "../../../assets/business/social5.svg"
import youtube from "../../../assets/business/social6.svg"
import podcast from "../../../assets/business/social7.svg"
import dummyLogo from "../../../assets/dummyLogo.png"

import { Col, Container, Row } from 'react-bootstrap'
import API_URL from '../../../../config'
const Professionallocation = (data) => {

    console.log("data", data.data)

    const detail = data.data || []

    console.log("detail", detail)



    return (
        <div>
            <img src={banner} alt="" />
            <Container fluid style={{ paddingLeft: '30px', paddingRight: '30px' }}>
                {detail.map((val) =>
                    <div className='location-div'>
                        <Row>
                            <Col lg={3}>
                                <div className='company-info'>
                                    {/* <img src={wipro} alt="" /> */}

                                    <img src={!val?.logo || val?.logo.length == 0 ? dummyLogo : `${API_URL}/uploads/company_logo/${val?.logo?.map(val => val.filename)}`}
                                        alt=""
                                        height={150}
                                        width={200}
                                        style={{ objectFit: 'contain' }}
                                    />

                                    <h3>{val.Firmname}</h3>
                                    <p className="companybio">{val.company_bio}</p>
                                    <div className='social-compony'>
                                        <img
                                            src={linkd}
                                            alt="LinkedIn"
                                            onClick={() => window.open(val?.companysocialMedia?.linkedinLink, '_blank')}
                                        />
                                        <img
                                            src={twitter}
                                            alt="Twitter"
                                            onClick={() => window.open(val?.companysocialMedia?.twitterLink, '_blank')}
                                        />
                                        <img
                                            src={instagram}
                                            alt="Instagram"
                                            onClick={() => window.open(val?.companysocialMedia?.instagramLink, '_blank')}
                                        />
                                        <img
                                            src={fb}
                                            alt="Facebook"
                                            onClick={() => window.open(val?.companysocialMedia?.facebookLink, '_blank')}
                                        />
                                        <img
                                            src={youtube}
                                            alt="YouTube"
                                            onClick={() => window.open(val?.companysocialMedia?.youtubeLink, '_blank')}
                                        />
                                        <img
                                            src={podcast}
                                            alt="Podcast"
                                            onClick={() => window.open(val?.companysocialMedia?.podcastLink, '_blank')}
                                        />


                                    </div>
                                </div>

                                {/* linkedinLink
                            twitterLink
                            instagramLink
                            facebookLink
                            youtubeLink
                            podcastLink */}
                            </Col>
                            <Col lg={4}>
                                <div className='company-list'>
                                    <p><i className="fa fa-globe" aria-hidden="true"></i> {val?.company_website}</p>
                                    <p><i className="fa fa-map-marker" aria-hidden="true"></i> {val?.company_address}</p>
                                    <p><i class="fa fa-envelope-o" aria-hidden="true"></i> {val?.company_email}</p>
                                    <p><i class="fa fa-phone" aria-hidden="true"></i> {val?.company_phone}</p>
                                    <p><i class="fa fa-phone" aria-hidden="true"></i> {val?.company_alternate_phone}</p>
                                    <p><i class="fa fa-whatsapp" aria-hidden="true"></i> {val?.company_whatsapp}</p>
                                </div>
                            </Col>
                            <Col lg={3}>
                                <div className='profile-company mb-0' style={{ background: 'white' }}>
                                    <h3>Company  Location</h3>
                                    <div className='descss12' style={{ marginLeft: '35px' }}>
                                        {/* <img src="https://ucarecdn.com/18bf3cc9-f69f-4473-808c-30c1f24c1b6b/" alt="" /> */}
                                        <p>
                                            <span style={{ color: '#898F93', fontWeight: 'bold' }}>Country : </span>
                                            <span style={{ color: '#E83A14', fontWeight: 'bold' }}>
                                                {val?.company_country_details?.map(data => data.country_name)}
                                            </span>
                                        </p>
                                        <p>
                                            <span style={{ color: '#898F93', fontWeight: 'bold' }}>State : </span>
                                            <span style={{ color: '#E83A14', fontWeight: 'bold' }}>
                                                {val?.company_state_details?.map(data => data.state_name)}
                                            </span>
                                        </p>
                                        <p>
                                            <span style={{ color: '#898F93', fontWeight: 'bold' }}>City : </span>
                                            <span style={{ color: '#E83A14', fontWeight: 'bold' }}>
                                                {val?.company_city_details?.map(data => data.city_name)}
                                            </span>
                                        </p>

                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                )}
            </Container>
        </div>
    )
}

export default Professionallocation;