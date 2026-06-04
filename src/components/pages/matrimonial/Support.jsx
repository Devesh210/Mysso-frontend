import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

import call from "../../../assets/matrimonial/caa.svg"
import profile from "../../../assets/matrimonial/profile.svg"
import tag from "../../../assets/matrimonial/tag.svg"

const Support = () => {
    return (
        <div className='support'>
            <Container>
                <Row>
                    <Col lg={4}>
                        <div className='support-content'>
                            <img src={profile} alt="" />
                            <h3>Genuine Profile</h3>
                            <p>We prioritise verified, honest and real connections, ensuring that every member who joins our platform does so through trusted references. This commitment to authenticity means that with ShreeSSO.</p>
                        </div>
                    </Col>
                    <Col lg={4}>
                        <div className='support-content'>
                            <img src={profile} alt="" />
                            <h3>Most Trusted</h3>
                            <p>With deep roots in the Swaminarayan sampraday, we take pride in being our community's most trusted matrimony platform. Choose ShreeSSO as your reliable partner in the sacred journey of finding better-half for a lifetime.</p>
                        </div>
                    </Col>
                    <Col lg={4}>
                        <div className='support-content'>
                            <img src={call} alt="" />
                            <h3>Our Support</h3>
                            <p>At ShreeSSO, we understand that the path to finding a life partner can sometimes be challenging. That’s why we offer dedicated support to ensure a seamless and stress-free experience for our members.  </p>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Support
