import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

import borderimg from '../../../assets/border.svg'
import about from '../../../assets/homepage/about.png'
import { Link } from 'react-router-dom'

const About = () => {
    return (
        <div className='about-us'>
            <Container fluid>
                    <div className='textabout'>
                        <h3>About <span>ShreeSSO</span> <img src={borderimg} /></h3>
                    </div>
                    <Row>
                        <Col lg={8}>
                            <p className='mb-4 mt-3'>Welcome to Swaminarayan Satsangis Organisation (ShreeSSO).  A global networking platform dedicated to connecting devotees of Lord Swaminarayan from around the world. We promote a vibrant online community where members can reach each other, engage online, and support each other in their journeys. The organisation is meant for satsangis, built by satsangis and operated by satsangis.</p>
                            <h2 style={{textAlign:'center'}}>સત્સંગીનો સાથ, સત્સંગીનો વિશ્વાસ,<br />
                                સત્સંગીનો પ્રયાસ, તોજ સત્સંગીનો વિકાસ
                            </h2>
                            <h2 className='mb-5 mt-3' style={{textAlign:'center'}}>
                                Satsangino Sath, Satsangino Vishwas,<br />
                                Satsangino Prayas, Toj Satsangino Vikas
                            </h2>
                            <Link to="/Aboutus" className='knowmorrrr'>
                                Know more
                            </Link>
                        </Col>
                        <Col lg={4}>
                            <img className='w-100' src={about} alt="" />
                        </Col>
                    </Row>
                </Container>
        </div>
    )
}

export default About
