import { Col, Container, Row } from 'react-bootstrap'
import call from "../../../assets/matrimonial/caa.svg"
import profile from "../../../assets/matrimonial/profile.svg"
const MemberSupport = () => {
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
                                    <p>At ShreeSSO, we ensure that every members profile is carefully verified to maintain authenticity. Your search for a meaningful connection starts with real people you can trust.</p>
                                </div>
                            </Col>
                            <Col lg={4}>
                                <div className='support-content'>
                                    <img src={profile} alt="" />
                                    <h3>Most Trusted</h3>
                                    <p>As the most trusted platform, ShreeSSO is committed to providing a safe and secure environment for all its members. Our dedication to trust and transparency sets us apart. </p>
                                </div>
                            </Col>
                            <Col lg={4}>
                                <div className='support-content'>
                                    <img src={call} alt="" />
                                    <h3>Our Support</h3>
                                    <p>Our dedicated support team is available to assist members with any questions or concerns related to your ShreeSSO account. Contact us for your helpful assistance in navigating the platform and ensuring a positive user experience.  </p>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div></>
    )
}

export default MemberSupport
