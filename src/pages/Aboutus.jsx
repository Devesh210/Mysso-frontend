import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

import about from '../assets/homepage/about.png'
import about1 from '../assets/image2.png'
import about2 from '../assets/image3.png'
import about3 from '../assets/image4.png'
import banner from "../assets/matrimonial/search.png"
import borderimg from '../assets/border.svg'
import { Link } from 'react-router-dom'

const Aboutus = () => {
    return (
        <div>
            <Container fluid style={{ padding: '0px' }}>
                <div className="image-container mb-0">
                    <img src={banner} className="w-100" alt="" />
                    <div className="overlay12">
                    </div>
                </div>
            </Container>
            <div className='about-us'>
                <Container fluid>
                    <div className='textabout'>
                        <h3>About <span>ShreeSSO</span> <img src={borderimg} /></h3>
                    </div>
                    <Row>
                        <Col lg={8}>
                            <p className='mb-5'>Welcome to Swaminarayan Satsangi's Organisation (ShreeSSO).  A global networking platform dedicated to connect devotees of Lord Swaminarayan from around the world. We promote a vibrant online community where members can reach each other, engage online, and support each other in their journeys. The organisation is meant for satsangis, built by satsangis and operated by satsangis.</p>
                            <h2 style={{ textAlign: 'center' }}>સત્સંગીનો સાથ, સત્સંગીનો વિશ્વાસ,<br />
                                સત્સંગીનો પ્રયાસ, તોજ સત્સંગીનો વિકાસ
                            </h2>
                            <h2 style={{ textAlign: 'center' }}>
                                Satsangino Sath, Satsangino Vishwas,<br />
                                Satsangino Prayas, Toj Satsangino Vikas
                            </h2>
                        </Col>
                        <Col lg={4}>
                            <img className='w-100' src={about} alt="" />
                        </Col>
                    </Row>
                </Container>
            </div>
            <div className='about-us'>
                <Container fluid>
                    <div className='textabout' style={{ paddingBottom: '25px' }}>
                        <h3 style={{ paddingBottom: '25px' }}>Our <span>Mission</span> <img src={borderimg} /></h3>
                    </div>
                    <Row>
                        <Row>
                            <Col lg={8}>
                                <p>Our mission is to promote the growth and well-being of individuals through online communities. We aim to build a network that brings together Swaminarayan Satsangis from diverse backgrounds and regions.
                                </p>
                            </Col>
                            <Col lg={4}>
                                <img className='w-100' src={about1} alt="" />
                            </Col>
                        </Row>
                        <Col lg={12}>
                            <ul className='our-visiison'>
                                <li>
                                    <b>Matrimonial Platform-</b> The Platform allows you to find an ideal partner from your community, region and within Satsangis.
                                </li>
                                <li>
                                    <b>Jobs Portal-</b> Our organisation connects Satsangi employers and employees for future endeavourness.
                                </li>
                                <li>
                                    <b>Education Help-</b> We can vocational guide Satsangi boys and girls for suitable careers.
                                </li>
                                <li>
                                    <b>Innovation and Startup-</b> Any new business entrepreneur looking for business funding can add their innovative ideas on our platform with a minimum description to reach an accurate investor for their business startup.Investors can also capitalise their amount in the startup business according to innovative ideas and business growth.
                                </li>
                                <li>
                                    <b>Business Networking-</b> All Satsangis from different types of business networking can be on one platform, so they can help each other to expand their businesses. We look forward to form SBN (Satsangi’s Business Network).
                                </li>
                                {/* <li>
                                    <b>Professional Networking-</b> Any doctor, CA, lawyer, consultant, or other professional can join our network. We want to bring them under this Satsangi’s Professional Network (SPN).
                                </li>
                                <li>
                                    <b>Health First-</b> We will be conducting small health camps for satsangis (like routine health checkup, eye checkup, Women's breast cancer and cervical cancer checkup)
                                </li> */}
                                <li>
                                    <b>Senior Citizens Welfare-</b> After reaching a specific age, senior citizens experiences numerous health-related problems, loneliness and food problems. Our major target is to support them for mental & physical peace.
                                </li>
                            </ul>
                        </Col>
                    </Row>
                </Container>
            </div>
            <div className='about-us'>
                <Container fluid>
                    <div className='textabout' style={{ paddingBottom: '25px', paddingTop: '25px' }}>
                        <h3>Our <span>Vision</span> <img src={borderimg} /></h3>
                    </div>
                    <Row>
                        <Row>
                            <Col lg={8}>
                                <p>We envision a united global community of Swaminarayan devotees where individuals can use our services to grow, support one another, and collectively contribute to the betterment of society.</p>
                            </Col>
                            <Col lg={4}>
                                <img className='w-100' src={about2} alt="" />
                            </Col>
                        </Row>
                    </Row>
                </Container>
            </div>
            <div className='about-us'>
                <Container fluid>
                    <div className='textabout' style={{ paddingBottom: '25px', paddingTop: '25px' }}>
                        <h3>Join <span>Us</span> <img src={borderimg} /></h3>
                    </div>
                    <Row>
                        <Row>
                            <Col lg={8}>
                                <p className='mb-5'>We invite you to join ShreeSSO and connect with fellow Satsangis from across the globe. Whether you are seeking guidance, looking to engage in meaningful conversations, or want to be part of a supportive community, ShreeSSOß is here for you.<br />
                                    Now, you can be a part of your local chapter to promote this organisation by volunteering, and organising events for society betterment.
                                </p>
                                <a class="knowmorrrr" href="/register">Join Now</a>
                            </Col>
                            <Col lg={4}>
                                <img className='w-100' src={about3} alt="" />
                            </Col>
                        </Row>
                    </Row>
                </Container>
            </div>
        </div>
    )
}

export default Aboutus
