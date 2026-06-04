import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

import call from "../../../assets/matrimonial/caa.svg"
import profile from "../../../assets/matrimonial/profile.svg"
import tag from "../../../assets/matrimonial/tag.svg"
import borderimg from '../../../assets/border.svg';
const Startupnew = () => {
    return (
        <>

            <div className='mb-5'>
                {/* <h3 className='straup'>Our Startup  <span>Types</span> <img className='imgstarup' src={borderimg} alt="border" /></h3> */}
                <div className='support'>
                    <Container>
                        <Row>
                            <Col lg={4}>
                                <div className='support-content'>
                                    <img src={profile} alt="" />
                                    <h3>Genuine Profiles</h3>
                                    <p>We prioritise in verifying business start-up profiles, ensuring that every member who joins our platform does goes through this simple process. This commitment to authenticity means that with ShreeSSO, you can confidently take the first start-up business experience towards a lasting and trusted buiness relations. </p>
                                </div>
                            </Col>
                            <Col lg={4}>
                                <div className='support-content'>
                                    <img src={profile} alt="" />
                                    <h3>Most Trusted</h3>
                                    <p>With deep roots in the Swaminarayan Sampraday, we take pride in being our community's most trusted business start-up platform. Choose ShreeSSO as your reliable business partner to find best business funding from investors. </p>
                                </div>
                            </Col>
                            <Col lg={4}>
                                <div className='support-content'>
                                    <img src={call} alt="" />
                                    <h3>Our Support</h3>
                                    <p>At ShreeSSO, we understand that the path to find a business funding for start-up business can be challenging. That’s why we offer a dedicated support for business start-up to ensure a seamless, stress-free, and smooth experience for our members.</p>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div></>
    )
}

export default Startupnew
