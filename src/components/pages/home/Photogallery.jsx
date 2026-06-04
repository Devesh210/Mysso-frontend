import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import borderimg from '../../../assets/border.svg';
import one from '../../../assets/gallery/1.png';
import two from '../../../assets/gallery/2.png';
import three from '../../../assets/gallery/3.png';
import four from '../../../assets/gallery/4.png';
import five from '../../../assets/gallery/5.png';
import six from '../../../assets/gallery/6.png';

const Photogallery = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [activeSubTab, setActiveSubTab] = useState(0);

    const handleTabClick = (index) => {
        setActiveTab(index);
        setActiveSubTab(0); // Reset sub-tab when switching main tabs
    };

    const handleSubTabClick = (index) => {
        setActiveSubTab(index);
    };

    return (
        <div className='photogallery-section'>
            <Container fluid>
                <div className='photogallery1'>
                    <h3> Photo & Videos <span>Gallery</span> <img className='photogalleryimgg' src={borderimg} alt="border" /></h3>
                    <div>
                        <div className="main-tabs">
                            <button
                                className={activeTab === 0 ? 'active' : ''}
                                onClick={() => handleTabClick(0)}
                            >
                                Members
                            </button>
                            <button
                                className={activeTab === 1 ? 'active' : ''}
                                onClick={() => handleTabClick(1)}
                            >
                                Matrimonial
                            </button>
                            <button
                                className={activeTab === 2 ? 'active' : ''}
                                onClick={() => handleTabClick(2)}
                            >
                                Job
                            </button>
                            <button
                                className={activeTab === 3 ? 'active' : ''}
                                onClick={() => handleTabClick(3)}
                            >
                                Startup
                            </button>
                            <button
                                className={activeTab === 4 ? 'active' : ''}
                                onClick={() => handleTabClick(4)}
                            >
                                Networking
                            </button>
                            <button
                                className={activeTab === 5 ? 'active' : ''}
                                onClick={() => handleTabClick(5)}
                            >
                                Support
                            </button>
                            <button
                                className={activeTab === 6 ? 'active' : ''}
                                onClick={() => handleTabClick(6)}
                            >
                                Other Activities
                            </button>
                        </div>

                        <div className="sub-tabs">
                            {/* Render sub-tabs based on active main tab */}
                            {activeTab === 0 && (
                                <div>
                                    <button
                                        className={activeSubTab === 0 ? 'active' : ''}
                                        onClick={() => handleSubTabClick(0)}
                                    >
                                        Directors
                                    </button>
                                    <button
                                        className={activeSubTab === 1 ? 'active' : ''}
                                        onClick={() => handleSubTabClick(1)}
                                    >
                                        Chief patron
                                    </button>
                                    <button
                                        className={activeSubTab === 2 ? 'active' : ''}
                                        onClick={() => handleSubTabClick(2)}
                                    >
                                        Patron Members
                                    </button>
                                </div>
                            )}
                            {activeTab === 1 && (
                                <div>
                                    <button
                                        className={activeSubTab === 0 ? 'active' : ''}
                                        onClick={() => handleSubTabClick(0)}
                                    >
                                        Directors
                                    </button>
                                    <button
                                        className={activeSubTab === 1 ? 'active' : ''}
                                        onClick={() => handleSubTabClick(1)}
                                    >
                                        Chief patron
                                    </button>
                                    <button
                                        className={activeSubTab === 2 ? 'active' : ''}
                                        onClick={() => handleSubTabClick(2)}
                                    >
                                        Patron Members
                                    </button>
                                </div>
                            )}
                            {activeTab === 2 && (
                                <div>
                                    <button
                                        className={activeSubTab === 0 ? 'active' : ''}
                                        onClick={() => handleSubTabClick(0)}
                                    >
                                        Directors
                                    </button>
                                    <button
                                        className={activeSubTab === 1 ? 'active' : ''}
                                        onClick={() => handleSubTabClick(1)}
                                    >
                                        Chief patron
                                    </button>
                                    <button
                                        className={activeSubTab === 2 ? 'active' : ''}
                                        onClick={() => handleSubTabClick(2)}
                                    >
                                        Patron Members
                                    </button>
                                </div>
                            )}
                            {activeTab === 3 && (
                                <div>
                                    <button
                                        className={activeSubTab === 0 ? 'active' : ''}
                                        onClick={() => handleSubTabClick(0)}
                                    >
                                        Directors
                                    </button>
                                    <button
                                        className={activeSubTab === 1 ? 'active' : ''}
                                        onClick={() => handleSubTabClick(1)}
                                    >
                                        Chief patron
                                    </button>
                                    <button
                                        className={activeSubTab === 2 ? 'active' : ''}
                                        onClick={() => handleSubTabClick(2)}
                                    >
                                        Patron Members
                                    </button>
                                </div>
                            )}
                            {activeTab === 4 && (
                                <div>
                                    <button
                                        className={activeSubTab === 0 ? 'active' : ''}
                                        onClick={() => handleSubTabClick(0)}
                                    >
                                        Directors
                                    </button>
                                    <button
                                        className={activeSubTab === 1 ? 'active' : ''}
                                        onClick={() => handleSubTabClick(1)}
                                    >
                                        Chief patron
                                    </button>
                                    <button
                                        className={activeSubTab === 2 ? 'active' : ''}
                                        onClick={() => handleSubTabClick(2)}
                                    >
                                        Patron Members
                                    </button>
                                </div>
                            )}
                            {activeTab === 5 && (
                                <div>
                                    <button
                                        className={activeSubTab === 0 ? 'active' : ''}
                                        onClick={() => handleSubTabClick(0)}
                                    >
                                        Directors
                                    </button>
                                    <button
                                        className={activeSubTab === 1 ? 'active' : ''}
                                        onClick={() => handleSubTabClick(1)}
                                    >
                                        Chief patron
                                    </button>
                                    <button
                                        className={activeSubTab === 2 ? 'active' : ''}
                                        onClick={() => handleSubTabClick(2)}
                                    >
                                        Patron Members
                                    </button>
                                </div>
                            )}
                            {activeTab === 6 && (
                                <div>
                                    <button
                                        className={activeSubTab === 0 ? 'active' : ''}
                                        onClick={() => handleSubTabClick(0)}
                                    >
                                        Directors
                                    </button>
                                    <button
                                        className={activeSubTab === 1 ? 'active' : ''}
                                        onClick={() => handleSubTabClick(1)}
                                    >
                                        Chief patron
                                    </button>
                                    <button
                                        className={activeSubTab === 2 ? 'active' : ''}
                                        onClick={() => handleSubTabClick(2)}
                                    >
                                        Patron Members
                                    </button>
                                </div>
                            )}
                        </div>

                        <div className="tab-content">
                            {/* Content for each main tab and sub-tab combination */}
                            {activeTab === 0 && (
                                <div>
                                    {activeSubTab === 0 && (
                                        <div>
                                            <Container fluid>
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
                                    )}
                                    {activeSubTab === 1 && (
                                        <div>
                                            <Container fluid>
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
                                    )}
                                    {activeSubTab === 2 && (
                                        <div>
                                            <Container fluid>
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
                                    )}
                                </div>
                            )}
                            {activeTab === 1 && (
                                <div>
                                    {activeSubTab === 0 && (
                                        <div>
                                            <Container fluid>
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
                                    )}
                                    {activeSubTab === 1 && (
                                        <div>
                                            <Container fluid>
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
                                    )}
                                    {activeSubTab === 2 && (
                                        <div>
                                            <Container fluid>
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
                                    )}
                                </div>
                            )}
                            {activeTab === 2 && (
                                <div>
                                    {activeSubTab === 0 && (
                                        <div>
                                            <Container fluid>
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
                                    )}
                                    {activeSubTab === 1 && (
                                        <div>
                                            <Container fluid>
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
                                    )}
                                    {activeSubTab === 2 && (
                                        <div>
                                            <Container fluid>
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
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default Photogallery;
