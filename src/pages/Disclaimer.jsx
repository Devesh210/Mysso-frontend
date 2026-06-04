import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import about from '../assets/homepage/about.png'
import banner from "../assets/matrimonial/search.png"
import borderimg from '../assets/border.svg'
const Disclaimer = () => {
    return (
        <div>
            <Container fluid style={{ padding: '0px' }}>
                <div className="image-container mb-0">
                    <img src={banner} className="w-100" alt="" />
                    <div className="overlay12">
                    </div>
                </div>
            </Container>
            <div className='about-us'>
                <Container fluid>
                    <div className='textabout'>
                        <h3><span> Disclaimer</span> <img src={borderimg} /></h3>
                    </div>
                    <Row>
                        <Col lg={12}>
                            <p className='mb-3'>
                                <b>General Disclaimer:</b>
                            </p>
                            <p>
                                The information provided by [Swaminarayan Satsangis Organisation   ] (“we,” “us,” or “our”) on [ShreeSSO] and our mobile application is for general informational purposes only. All information on the Site and our mobile application is provided in good faith, however, we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the Site or our mobile application.
                            </p>
                            <p className='mb-3'>
                                <b>Fundraising Disclaimer:</b>
                            </p>
                            <p>
                                Funds raised by [ Swaminarayan Satsangis Organisation ] are used for the stated purposes in our fundraising appeals. However, if more funds are raised than required for a particular project or if the specific project cannot be carried out, the funds will be used to support other important projects and programs conducted by our organization, wherever the need is greatest.
                            </p>
                            <p className='mb-3'><b>Legal Disclaimer:</b></p>
                            <p>
                                [ Swaminarayan Satsangis Organisation ] is not a law firm and does not provide legal advice. Any information or materials provided on the Site or in our publications should not be considered legal advice. For any legal matters, please consult a licensed attorney in your jurisdiction.
                            </p>
                            <p className='mb-3'><b>Medical Disclaimer:</b></p>
                            <p>
                                Any health-related information provided by [ Swaminarayan Satsangis Organisation ] is for educational purposes only and is not intended as a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
                            </p>
                            <p className='mb-3'><b>External Links Disclaimer:</b></p>
                            <p>
                                The Site and our mobile application may contain (or you may be sent through the Site or our mobile application) links to other websites or content belonging to or originating from third parties or links to websites and features in banners or other advertising. Such external links are not investigated, monitored, or checked for accuracy, adequacy, validity, reliability, availability, or completeness by us. We do not warrant, endorse, guarantee, or assume responsibility for the accuracy or reliability of any information offered by third-party websites linked through the Site or any website or Sfeature linked in any banner or other advertising.
                            </p>
                            <p className='mb-3'><b>Financial Disclaimer:</b></p>
                            <p>
                                [ Swaminarayan Satsangis Organisation ] is a registered 501(c)(3) non-profit organization. Contributions to [ Swaminarayan Satsangis Organisation] are tax-deductible to the extent permitted by law. Please consult your tax advisor regarding the deduction of your donation.
                            </p>
                            <p className='mb-3'><b>Volunteering Disclaimer:</b></p>
                            <p>
                                Volunteering with [ Swaminarayan Satsangis Organisation] involves risks, and by participating, you acknowledge that you understand and accept these risks. [ Swaminarayan Satsangis Organisation] is not responsible for any injury, loss, or damage that may occur during your volunteer activities.
                            </p>
                            <p className='mb-3'><b>No Guarantee of Results:</b></p>
                            <p>
                                While [Swaminarayan Satsangis Organisation] endeavors to achieve its mission and goals, we cannot guarantee specific results or outcomes from our programs, services, or initiatives. Success may vary based on numerous factors beyond our control.
                            </p>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    )
}
export default Disclaimer