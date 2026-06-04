import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import banner1 from "../../../assets/network/one.jpeg"
import banner2 from "../../../assets/network/two.jpeg"
import banner3 from "../../../assets/network/three.jpeg"
import banner4 from "../../../assets/network/four.jpeg"
const Partnership = () => {
    return (
        <div>
            <div className='businessnet-section'>
                <Container fluid>
                    <div className='featuredprofile'>
                        <h3>The Power Is In The Partnerships: Help Your Networking, Refer <br />And Grow</h3>
                        <p>With ShreeSSO Satsangis Business and Professional Network, take advantage of the
                            potential of relationships to widen your networking connections. Boost your
                            networking activities and recommendations, and observe how your company
                            expands by partnering with like-minded professionals and sharing referrals. You
                            can open up new doors, exchange insightful ideas, and create enduring connections
                            with like-minded professionals that promote success for both of you. Grow with us
                            as we collaborate. In a vibrant and encouraging community, we work together to
                            promote development, provide possibilities, and assist one another's success.</p>
                    </div>
                    <Row>
                        <Col lg={3}>
                            <div className="slider-item">
                                <img className='w-100' src={banner2} alt="" />
                                <div className="overlay1234"></div>
                                <h3 className='servicetext1'>Increased Visibility & Exposure</h3>
                                <h6 className='servicetext1'>Joining Satsangis Business and Professional
                                    Network increases your brand's visibility and exposes you to a larger audience,
                                    enhancing your presence in the market</h6>
                            </div>
                        </Col>
                        <Col lg={3}>
                            <div className="slider-item">
                                <img className='w-100' src={banner3} alt="" />
                                <div className="overlay1234"></div>
                                <h3 className='servicetext1'>New business opportunities</h3>
                                <h6 className='servicetext1'>Our network creates numerous growth
                                    opportunities by providing smart referrals and meaningful relationships with
                                    potential clients and partners.</h6>
                            </div>
                        </Col>
                        <Col lg={3}>
                            <div className="slider-item">
                                <img className='w-100' src={banner4} alt="" />
                                <div className="overlay1234"></div>
                                <h3 className='servicetext1'>Solid & sustainable relationships</h3>
                                <h6 className='servicetext1'>Establish enduring bonds with individuals
                                    who share your values to promote a cooperative and encouraging work atmosphere
                                    dedicated to success and mutual improvement.</h6>
                            </div>
                        </Col>
                        <Col lg={3}>
                            <div className="slider-item">
                                <img className='w-100' src={banner1} alt="" />
                                <div className="overlay1234"></div>
                                <h3 className='servicetext1'>Motivation and support</h3>
                                <h6 className='servicetext1'>Create long-term relationships with reliable people who
                                    share your commitment to achievement and mutual progress through the Satsangis
                                    Business and Professional Network (SBN & SPN).</h6>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    )
}

export default Partnership