import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

import about from '../../../assets/matrimonial/about.png'

const About = () => {
    return (
        <div className='about-us' style={{ padding: '0px 35px 110px' }}>
            <Container fluid>
                <div className='textabout1'>
                    <h2 className='text-center'>Welcome to Swaminarayan Satsangis Organisation ShreeSSO- Matrimonial Platform</h2>
                    <h2 className='text-center'>Your Journey to Forever Together Begins Here… </h2>
                </div>
                <Row>
                    <Col lg={9}>
                        <p>Our platform is meticulously designed to unite souls destined for each other, fostering connections that blossom into lifelong partnerships. We are dedicated to crafting beautiful wedding stories rooted in the divine values of the Swaminarayan Sampraday.</p>
                        <p>We offer a comprehensive matchmaking process, focusing on key aspects such as community, Satsangi values, tradition, trust, regional compatibility, and mutual understanding</p>
                        <p>Explore our platform, personalized services and innovative features designed to make your search for a life partner. Welcome to a journey of togetherness at ShreeSSO.</p>
                    </Col>
                    <Col lg={3}>
                        <img className='w-100' src={about} alt="" />
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default About
