import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

import about from '../assets/homepage/about.png'
import banner from "../assets/matrimonial/search.png"
import borderimg from '../assets/border.svg'

const Privacypolicy = () => {
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
                        <h3>Privacy<span> Policy</span> <img src={borderimg} /></h3>
                    </div>
                    <Row>
                        <Col lg={12}>
                            <p className='mb-3'>
                                shreesso.org is an online portal for matrimonial / job recruitment / business networking and start-
                                up services designed to provide an easy and convenient way for members to connect.
                            </p>
                            <p className='mb-3'>
                                We are deeply committed to protecting your privacy and have implemented a comprehensive
                                privacy statement detailing how we collect and use your information.
                            </p>
                            <p><b>Information Collection</b></p>
                            <p className='mb-3'>
                                We collect information from members and guests who use our services, including but not limited
                                to email address, first name, last name, user-specified password, mailing address, zip code,
                                telephone number and details of the reference person. We also collect photos for biodata /
                                resume verification to ensure member authenticity
                            </p>
                            <p><b>Use of Information</b></p>
                            <p className='mb-3'>
                                The information we gather is used primarily to meet your needs and provide a personalized
                                experience. Your data is shared only with members of shreesso.org and is handled with the utmost
                                care and security. We comply with legal obligations to provide information if required by law.
                            </p>
                            <p><b>Email Communication</b></p>
                            <p className='mb-3'>
                                We use email extensively to assist you for your difficulty while browsing through the portal on
                                shreesso.org. Our main email services include:
                            </p>
                            <ul className='termskhddll'>
                                <li>Responses regarding any query to use the services.</li>
                                <li>Responses regarding any payment related queries.</li>
                                <li>Any personalized service if required.</li>
                            </ul>
                            <p className='mb-3'>
                                Additionally, we may occasionally send you:
                            </p>
                            <ul className='termskhddll'>
                                <li>Announcements about special events associated with shreesso.org.</li>
                                <li>Special offers from partner sites that may benefit you.</li>
                            </ul>
                            <p className='mb-3'>You can opt-out of promotional emails by following the instructions in any email you receive.</p>
                            <p><b>Email Communication</b></p>
                            <p className='mb-3'>
                                We may collect data about your interactions with our site using web analytics tools. This
                                includes information such as the site you came from, search engines and keywords used, pages
                                viewed, browser add-ons, and standard details like IP address, browser type and language,
                                access times, and referring website addresses.
                                Visitors to our site can browse, search ads, and view articles or features without providing
                                personal information or incurring any charges.
                            </p>
                            <p><b>Aadhar/ Passport Verification</b></p>
                            <p className='mb-3'>
                                We take members' Aadhar card/ Passport Number for verification to ensure the authenticity of
                                our users.
                            </p>
                            <p><b>Legal Disclaimer</b></p>
                            <p className='mb-3'>
                                While we make every effort to protect user privacy, we may disclose information if required by
                                law, court order, or if we have a good faith belief that such action is necessary to:
                            </p>
                            <ul className='termskhddll'>
                                <li>Comply with legal obligations</li>
                                <li>Protect and defend our rights or property</li>
                                <li>Act in emergencies to protect personal safety</li>
                            </ul>
                            <p className='mb-3'>We may also disclose information to our subsidiaries, parent companies, and other affiliated
                                entities under common corporate control. All entities receiving your information will comply with
                                this privacy policy</p>
                            <p><b>Age Restrictions</b></p>
                            <p className='mb-3'>
                                We do not facilitate matches for individuals below the legally marriageable age. Any information
                                received from minors will be deleted from our database.
                            </p>
                            <p><b>Security Measures</b></p>
                            <p className='mb-3'>
                                We implement extensive security measures to protect your data, including Secure Server
                                technology for transactions. While we strive to ensure secure data transmission, we cannot
                                guarantee the security of information sent over the internet and accept no liability for
                                unintentional disclosure.
                            </p>
                            <p>To further protect your privacy:</p>
                            <ul className='termskhddll'>
                                <li>Always log out and close your browser after using the website</li>
                                <li>Keep your passwords and member details confidential</li>
                                <li>It is recommended that you keep changing password periodically for safety</li>
                                <li>Inform us immediately of any unauthorized access</li>
                                <li>Avoid posting personal contact information on the website</li>
                            </ul>
                            <p><b>Third-Party Advertisements</b></p>
                            <p className='mb-3'>
                                You may encounter third-party advertisements, promotions, and offers while using our site. If
                                you choose to accept any offers, we may share your information, including billing details, with
                                the advertiser. Your information will not be transferred until you accept the offer. Refer to the
                                advertiser’s privacy policy for details on how your information is used.
                            </p>
                            <p><b>Acceptance of Privacy Policy</b></p>
                            <p className='mb-3'>
                                BY USING THE WEBSITE, YOU AGREE TO THE PRACTICES OUTLINED IN THIS PRIVACY
                                POLICY AND TERMS OF SERVICE.
                            </p>
                            <p><b>Policy Changes</b></p>
                            <p className='mb-3'>
                                We may update this Privacy Policy based on user feedback or changes in our practices. For any
                                questions, please contact us at info@shreesso.org.
                            </p>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    )
}

export default Privacypolicy
