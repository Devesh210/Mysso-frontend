import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

import about from '../assets/homepage/about.png'
import banner from "../assets/matrimonial/search.png"
import borderimg from '../assets/border.svg'

const Termsandcondition = () => {
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
                        <h3>Terms and <span> Condition</span> <img src={borderimg} /></h3>
                    </div>
                    <Row>
                        <Col lg={12}>
                            <p><b>1. Acceptance of Terms</b></p>
                            <p className='mb-3'>
                                By accessing or using the services, website, or any other digital platforms (collectively, the "Services") provided by [Swaminarayan Satsangis Organisation] ("we," "us," "our"), you agree to be bound by these Terms and Conditions ("Terms"). If you do not agree to these Terms, please do not use our Services.
                            </p>
                            <p><b>2. Changes to Terms</b></p>
                            <p className='mb-3'>
                                We reserve the right to modify these Terms at any time. Any changes will be effective immediately upon posting on our website. Your continued use of the Services following the posting of revised Terms means that you accept and agree to the changes.
                            </p>
                            <p><b>3. Use of Services</b></p>
                            <ul className='termskhddll'>
                                <li><b>Eligibility:</b> You must be at least 18 years old to use our Services. If you are under 18, you may use the Services only with the involvement of a parent or guardian.</li>
                                <li><b>Prohibited Activities:</b> You agree not to use the Services for any unlawful purpose or in any way that could harm us or any other person. This includes, but is not limited to, harassment, defamation, and the dissemination of harmful or offensive content.</li>
                            </ul>
                            <p><b>4. Donations</b></p>
                            <ul className='termskhddll'>
                                <li><b>Tax Deductibility:</b> [Non-Profit Organization Name] is a registered 501(c)(3) non-profit organization. Donations are tax-deductible to the extent permitted by law. Please consult your tax advisor regarding the deductibility of your donation.</li>
                                <li><b>Refund Policy:</b> Donations are generally non-refundable. If you believe there has been an error in processing your donation, please contact us immediately.</li>
                            </ul>
                            <p><b>5. Privacy </b></p>
                            <p className='mb-3'>
                                Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect your personal information. By using our Services, you consent to the collection and use of your information as described in our Privacy Policy.
                            </p>
                            <p><b>6. Intellectual Property</b></p>
                            <ul className='termskhddll'>
                                <li><b>Ownership:</b> All content on our website, including text, graphics, logos, and images, is the property of [ Swaminarayan Satsangis Organisation   ] and is protected by copyright and other intellectual property laws.</li>
                                <li><b>License:</b> You are granted a limited, non-exclusive, non-transferable license to access and use the Services for your personal, non-commercial use.</li>
                            </ul>
                            <p><b>7. Limitation of Liability</b></p>
                            <p className='mb-3'>
                                To the fullest extent permitted by law, [  Swaminarayan Satsangis Organisation ] shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses, resulting from (i) your use or inability to use the Services; (ii) any unauthorized access to or use of our servers and/or any personal information stored therein.
                            </p>
                            <p><b>8. Indemnification</b></p>
                            <p className='mb-3'>
                                You agree to indemnify and hold harmless [Swaminarayan Satsangis Organisation     ], its affiliates, officers, agents, and employees, from any claim or demand, including reasonable attorneys' fees, made by any third party due to or arising out of your use of the Services, your violation of these Terms, or your violation of any rights of another.
                            </p>
                            <p><b>9. Governing Law</b></p>
                            <p className='mb-3'>
                                These Terms shall be governed by and construed in accordance with the laws of [India, Maharashtra ], without regard to its conflict of law provisions. Any legal action or proceeding arising under these Terms will be brought exclusively in the federal or state courts located in [Mumbai, India, Maharashtra ].
                            </p>
                            <p><b>10. Termination</b></p>
                            <p className='mb-3'>
                                We reserve the right to terminate or suspend your access to the Services, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms. All provisions of the Terms which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity, and limitations of liability.
                            </p>
                            <p><b>11. Entire Agreement </b></p>
                            <p className='mb-3'>
                                These Terms constitute the entire agreement between you and [ Swaminarayan Satsangis Organisation] regarding the use of the Services and supersede all prior or contemporaneous understandings and agreements, whether written or oral, regarding such use.
                            </p>
                            <p><b>12. Contact Us</b></p>
                            <p className='mb-3'>
                                If you have any questions about these Terms, please contact us at:
                            </p>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    )
}

export default Termsandcondition
