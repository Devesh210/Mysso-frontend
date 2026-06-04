import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import borderimg from '../../../assets/border.svg';
import one from '../../../assets/gallery/1.png';
import two from '../../../assets/gallery/2.png';
import three from '../../../assets/gallery/3.png';
import four from '../../../assets/gallery/4.png';
import five from '../../../assets/gallery/5.png';
import six from '../../../assets/gallery/6.png';


const Businessgallery = () => {
    return (
        <div className='business-gallery-photo'>
            <Container fluid>
                <div className='photogallery1 mb-5'>
                    <h3> Photo & Videos <span>Gallery</span> <img className='photogalleryimgg' src={borderimg} alt="border" /></h3>
                </div>
                <Row>
                    <Col lg={3}>
                        <div className="image-container">
                            <img src={one} className="w-100" alt="" />
                            <div className="overlay">
                                <p>Member name</p> {/* Replace with your content */}
                            </div>
                        </div>
                        <div className="image-container">
                            <img src={one} className="w-100" alt="" />
                            <div className="overlay">
                                <p>Member name</p>
                            </div>
                        </div>
                    </Col>
                    <Col lg={3}>
                        <div className="image-container">
                            <img src={one} className="w-100" alt="" />
                            <div className="overlay">
                                <p>Member name</p>
                            </div>
                        </div>
                        <div className="image-container">
                            <img src={one} className="w-100" alt="" />
                            <div className="overlay">
                                <p>Member name</p>
                            </div>
                        </div>
                    </Col>
                    <Col lg={4}>
                        <div className="image-container">
                            <img src={three} className="w-100" alt="" />
                            <div className="overlay">
                                <p>Member name</p>
                            </div>
                        </div>
                    </Col>
                    <Col lg={2}>
                        <div className="image-container">
                            <img src={four} className="w-100" alt="" />
                            <div className="overlay">
                                <p>Member name</p>
                            </div>
                        </div>
                        <div className="image-container">
                            <img src={five} className="w-100" alt="" />
                            <div className="overlay">
                                <p>Member name</p>
                            </div>
                        </div>
                        <div className="image-container">
                            <img src={six} className="w-100" alt="" />
                            <div className="overlay">
                                <p>Member name</p>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Businessgallery