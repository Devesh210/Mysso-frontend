import { Col, Container, Row } from 'react-bootstrap'
import borderimg from '../../../assets/border.svg'
import step1 from "../../../assets/business/step1.svg"
import step2 from "../../../assets/business/step2.svg"
import step3 from "../../../assets/business/step3.svg"
import step4 from "../../../assets/business/step4.svg"
import step5 from "../../../assets/business/step5.svg"
const Aboutmembersteps = () => {
    return (
        <div className='business-containerss'>
            <Container fluid>
                <section className='business-steps'>
                    <h3>Simple <span>Steps</span> <img className='featuredpro12' src={borderimg} /></h3>
                    <div className='steps-business'>
                        <Row>
                            <Col lg={2}>
                                <img src={step1} alt="" />
                                <h4>Step 1 Text</h4>
                            </Col>
                            <Col lg={2}>
                                <img src={step2} alt="" />
                                <h4>Step 2 Text</h4>
                            </Col>
                            <Col lg={2}>
                                <img src={step3} alt="" />
                                <h4>Step 3 Text</h4>
                            </Col>
                            <Col lg={2}>
                                <img src={step4} alt="" />
                                <h4>Step 4 Text</h4>
                            </Col>
                            <Col lg={2}>
                                <img src={step5} alt="" />
                                <h4>Step 5 Text</h4>
                            </Col>
                        </Row>
                    </div>
                </section>
            </Container>
        </div>
    )
}

export default Aboutmembersteps