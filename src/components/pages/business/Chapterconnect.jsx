import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import borderimg from '../../../assets/border.svg'
import banner from "../../../assets/business/exp.png"
const Chapterconnect = () => {
    return (
        <div className='chappter-connrecrrr'>
            <section className='business-steps12'>
                <h3>Connect with <span>A Chapters</span> <img className='featuredpro12' src={borderimg} /></h3>
                <p>Lorem ipsum dolor sit amet consectur adipiscing elit sed eiusmod tempor incididunt labore dolore magna aliquaenim ad minim. Sed risus augue, commodo ornare felis non, eleifend molestie metus pharetra eleifend</p>
                <button className='findachapters'>Find a Chapter</button>
            </section>
            <div className='business1-container'>
                <Container fluid>
                    <section className='business-steps' style={{ paddingBottom: '20px' }}>
                        <h3 style={{ paddingBottom: '40px', marginBottom: '0px' }}>Three Ways <span>to Experience With Us</span> <img className='featuredpro12' src={borderimg} /></h3>
                    </section>
                    <Row>
                        <Col lg={4}>
                            <div className="slider-item">
                                <img className='w-100' src={banner} alt="" />
                                <div className="overlay1234"></div>
                                <h3 className='servicetext1'>In-Person</h3>
                                <p className='servicetext2'>A very personal way to meet, connect and grow</p>
                            </div>
                        </Col>
                        <Col lg={4}>
                            <div className="slider-item">
                                <img className='w-100' src={banner} alt="" />
                                <div className="overlay1234"></div>
                                <h3 className='servicetext1'>In-Person</h3>
                                <p className='servicetext2'>A very personal way to meet, connect and grow</p>
                            </div>
                        </Col>
                        <Col lg={4}>
                            <div className="slider-item">
                                <img className='w-100' src={banner} alt="" />
                                <div className="overlay1234"></div>
                                <h3 className='servicetext1'>In-Person</h3>
                                <p className='servicetext2'>A very personal way to meet, connect and grow</p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    )
}

export default Chapterconnect