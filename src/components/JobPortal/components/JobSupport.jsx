import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

import call from "../../../assets/matrimonial/caa.svg"
import profile from "../../../assets/matrimonial/profile.svg"
import tag from "../../../assets/matrimonial/tag.svg"

const JobSupport = () => {
    return (
        <div className='support'>
            <Container className='mt-4'>
                <Row>
                    <Col lg={4}>
                        <div className='support-content'>
                            <img src={profile} alt="" />
                            <h3>Genuine Profiles</h3>
                            <p>We prioritise verified job profiles, ensuring that every member who joins our platform does goes through this process. This commitment to authenticity means that with ShreeSSO, you can confidently take the first step towards a lasting relationship.</p>
                        </div>
                    </Col>
                    <Col lg={4}>
                        <div className='support-content'>
                            <img src={profile} alt="" />
                            <h3>Most Trusted</h3>
                            <p>With deep roots in the Swaminarayan Sampradaya, we take pride in being our community's most trusted job portal platform. Choose ShreeSSO as your reliable partner for finding best job opportunities.</p>
                        </div>
                    </Col>
                    <Col lg={4}>
                        <div className='support-content'>
                            <img src={call} alt="" />
                            <h3>Our Support</h3>
                            <p>At ShreeSSO, we understand that the path to finding a perfect job can sometimes be challenging. That’s why we offer dedicated support to ensure a seamless and stress-free experience for our members.</p>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default JobSupport;
