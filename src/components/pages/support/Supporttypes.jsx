import { Col, Container, Row } from 'react-bootstrap'
import call from "../../../assets/matrimonial/caa.svg"
import profile from "../../../assets/matrimonial/profile.svg"
const Supporttypes = () => {
    return (
        <>

            <div className='mb-5 mt-5'>
                <div className='support'>
                    <Container>
                        <Row>
                            <Col lg={4}>
                                <div className='support-content'>
                                    <img src={profile} alt="" />
                                    <h3>Genuine Profiles</h3>
                                    <p>ShreeSSO offers support related to educational, medical, and senior citizen for verified users with the satangi community. Our commitment assures that each member who joins our platform must go through the verification process to receive best support from our end. </p>
                                </div>
                            </Col>
                            <Col lg={4}>
                                <div className='support-content'>
                                    <img src={profile} alt="" />
                                    <h3>Most Trusted</h3>
                                    <p>ShreeSSO is one of the most trusted platform in the satsangi community and is pride of offering exclusive support. </p>
                                </div>
                            </Col>
                            <Col lg={4}>
                                <div className='support-content'>
                                    <img src={call} alt="" />
                                    <h3>Our Support</h3>
                                    <p>ShreeSSO ensures that each member who joins the platform should receive dedicated support whether seeking for educational, medical, or either senior citizen. Check out our premium support services now.  </p>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div></>
    )
}

export default Supporttypes
