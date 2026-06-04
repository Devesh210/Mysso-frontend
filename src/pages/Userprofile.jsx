import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import profileimg from "../assets/profile.png"
import banner from "../assets/matrimonial/search.png"
const Userprofile = () => {
    return (
        <div className='usersforporifile'>
            <Container fluid className='profilebannerrr' style={{ padding: '0px' }}>
                <div className="image-container mb-0">
                    <img src="https://d2n9ha3hrkss16.cloudfront.net/uploads/stage/stage_image/23693/optimized_product_thumb_stage.jpg" className="w-100" alt="" />
                    <div className="overlay12">
                    </div>
                </div>
            </Container>
            <Container>
                <Col lg={12}>
                    <div className='userprofilesec'>
                        <Col lg={12} >
                            <img src={profileimg} alt="" />
                            <h2>ssdssdsds <img className='verified' width={"20px"} src="https://p1.hiclipart.com/preview/989/847/759/facebook-icons-verified-badge-symbol-account-verification-blue-turquoise-azure-electric-blue-png-clipart-thumbnail.jpg" alt="" /></h2>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit, perferendis, modi blanditiis pariatur aperiam atque iure nisi illo harum dolorum explicabo dignissimos repudiandae consequuntur impedit inventore eius expedita nam sapiente!</p>
                            <button>Intrested</button>
                            <button>Send Request</button>
                        </Col>
                    </div>
                </Col>
                <Col lg={12}>
                    <div className='aboutuserprofile'>
                        <h2>About Me</h2>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam adipisci quam suscipit laudantium cupiditate earum fuga dolor voluptatum! Aut officiis quisquam ratione aliquid hic, ullam harum eaque voluptate veniam voluptatem.</p>
                    </div>
                </Col>
                <Col lg={12}>
                    <div className='basicsinformass'>
                        <h2>Basic Information</h2>
                        <div>
                            <Row>
                                <Col lg={3}>
                                    <h5>First Name</h5>
                                    <p>priya </p>
                                </Col>
                                <Col lg={3}>
                                    <h5>Last Name</h5>
                                    <p>rai</p>
                                </Col>
                                <Col lg={3}>
                                    <h5>Gender</h5>
                                    <p>Female</p>
                                </Col>
                                <Col lg={3}>
                                    <h5>Date Of Birth</h5>
                                    <p>4/3/1999</p>
                                </Col>
                                <Col lg={3}>
                                    <h5>Age</h5>
                                    <p>22</p>
                                </Col>
                                <Col lg={3}>
                                    <h5>Marital Status</h5>
                                    <p>Unmarried</p>
                                </Col>
                                <Col lg={3}>
                                    <h5>Mother Tongue</h5>
                                    <p>Hindi</p>
                                </Col>
                                <Col lg={3}>
                                    <h5>Caste</h5>
                                    <p>Aaaaaaaa</p>
                                </Col>
                            </Row>
                        </div>

                    </div>
                </Col>
                <Col lg={12}>
                    <div className='matrinformass'>
                        <h2>Matrimonial Information</h2>
                        <div>
                            <Row>
                                <Col lg={3}>
                                    <h5>First Name</h5>
                                    <p>priya </p>
                                </Col>
                                <Col lg={3}>
                                    <h5>Last Name</h5>
                                    <p>rai</p>
                                </Col>
                                <Col lg={3}>
                                    <h5>Gender</h5>
                                    <p>Female</p>
                                </Col>
                                <Col lg={3}>
                                    <h5>Date Of Birth</h5>
                                    <p>4/3/1999</p>
                                </Col>
                                <Col lg={3}>
                                    <h5>Age</h5>
                                    <p>22</p>
                                </Col>
                                <Col lg={3}>
                                    <h5>Marital Status</h5>
                                    <p>Unmarried</p>
                                </Col>
                                <Col lg={3}>
                                    <h5>Mother Tongue</h5>
                                    <p>Hindi</p>
                                </Col>
                                <Col lg={3}>
                                    <h5>Caste</h5>
                                    <p>Aaaaaaaa</p>
                                </Col>
                            </Row>
                        </div>

                    </div>
                </Col>
            </Container>
        </div>
    )
}

export default Userprofile
