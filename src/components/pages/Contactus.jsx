import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

import call from '../../assets/homepage/call.svg'
import map from '../../assets/homepage/map.svg'
import mail from '../../assets/homepage/mail.svg'
import location from '../../assets/location.svg'
import borderimg from '../../assets/border.svg';
const Contactus = () => {
    return (
        <div>
            <div className='faq' style={{ paddingTop: '80px', paddingBottom: '80px' }}>
                <h3>Contact<span> Us</span> <img className='imgfaq' src={borderimg} alt="border" style={{ left: '50%', width: '100px' }} /></h3>
            </div>
            <Container className='contact-bg mb-5' fluid style={{ padding: '0px' }}>
                <Row>
                    <Col lg={6} className='mapp'>
                        <img className='w-100' src={location} alt="" />

                    </Col>
                    <Col lg={6} className='contacthome'>
                        <div className='contactdetails'>
                            <Row>
                                <Col lg={3} className='mb-4'>
                                    <img src={call} alt="" />
                                </Col>
                                <Col lg={9} className='mb-4'>
                                    <h3>Contact Us</h3>
                                    <p>+91 9321131170</p>
                                </Col>
                                <Col lg={3} className='mb-4'>
                                    <img src={mail} alt="" />
                                </Col>
                                <Col lg={9} className='mb-4'>
                                    <h3>Drop Mail</h3>
                                    <p>info@shreesso.org</p>
                                </Col>
                                <Col lg={3} className='mb-4'>
                                    <img src={map} alt="" />
                                </Col>
                                <Col lg={9} className='mb-4'>
                                    <h3>Location</h3>
                                    <p>Swaminarayan Satsangis Organization
                                        306,Mahakant complex
                                        Ashram Road,Near V S Hospital
                                        Ahmedabad 380006,Gujarat.</p>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Contactus
