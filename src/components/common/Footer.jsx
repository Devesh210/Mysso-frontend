import React, { useState, useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import whitleogo from "../../assets/logo.svg";
import instagram from "../../assets/socials/instagram.svg";
import youtube from "../../assets/socials/youtube.svg";
import whatsapp from "../../assets/socials/whatsapp.svg";
import facebook from "../../assets/socials/facebook.svg";
import three from "../../assets/socials/3.svg";
import two from "../../assets/socials/2.svg";
import one from "../../assets/socials/1.svg";
import subscribee from "../../assets/homepage/footer.svg";
import swal from 'sweetalert';
import API_URL, { SEEKER } from '../../../config';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
const Footer = () => {
    const { role } = useSelector((state) => state.auth)
    const [email, setEmail] = useState('');
    const [showDisclaimer, setShowDisclaimer] = useState(false);
    useEffect(() => {
        const disclaimerAccepted = localStorage.getItem('disclaimerAccepted');
        if (!disclaimerAccepted) {
            setShowDisclaimer(true);
        }
    }, []);
    const handleEmail = (e) => {
        e.preventDefault();
        console.log(email);
        try {
            if (email === '') {
                swal({
                    text: "Please enter your email",
                    icon: "warning",
                });
            }
            else if (!email.includes('@') || !email.includes('.')) {
                swal({
                    text: "Please enter a valid email",
                    icon: "warning",
                });
            }
            else {
                const requestoptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email: email })
                };
                fetch(`${API_URL}/api/addNewsLetter`, requestoptions)
                    .then(response => response.json())
                    .then(data => {
                        console.log(data);
                        if (data.status === 200) {
                            swal({
                                text: data.message,
                                icon: "success",
                            });
                        }
                        else {
                            swal({
                                text: data.message,
                                icon: "error",
                            });
                        }
                    });
            }
        } catch (err) {
            console.log(err);
        }
    };
    const acceptDisclaimer = () => {
        localStorage.setItem('disclaimerAccepted', 'true');
        setShowDisclaimer(false);
    };
    return (
        <>
            <div className='subscriber'>
                <Container>
                    <Row>
                        <Col lg={5}>
                            <Row>
                                <Col lg={3}>
                                    <img src={subscribee} alt="Subscribe" />
                                </Col>
                                <Col lg={9}>
                                    <h3>Subscribe To Our Newsletter</h3>
                                    <p>Join us and embrace the path to a harmonious and blessed union with ShreeSSO. Together, let's build a community of love and companionship grounded in the principles of the Swaminarayan Sampraday.</p>
                                </Col>
                            </Row>
                        </Col>
                        <Col lg={5}>
                            <InputGroup className="mb-1">
                                <Form.Control
                                    placeholder="Recipient's username"
                                    aria-label="Recipient's username"
                                    aria-describedby="basic-addon2"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <Button variant="outline-secondary" id="button-addon2" onClick={handleEmail}>
                                    <i className="fa fa-paper-plane-o" aria-hidden="true"></i> Subscribe
                                </Button>
                            </InputGroup>
                        </Col>
                    </Row>
                </Container>
            </div>
            <div className='footer'>
                <Container fluid>
                    <Row>
                        <Col lg={5}>
                            <div className='firstbox'>
                                <Link to="/"><img style={{width:'250px'}} src={whitleogo} className='footerlogo' alt="Footer Logo" /></Link>
                                <p>Swaminarayan Satsangis Organisation is a global networking platform dedicated to uniting devotees of Lord Swaminarayan worldwide. Our mission is to connect, inspire, and support our community through services. </p>
                                <div className='socials'>
                                    <a href="https://www.instagram.com/myssodotorg/"><img src={instagram} alt="Instagram" /></a>
                                    <a href="https://www.facebook.com/myssodotorg"><img src={facebook} alt="Facebook" /></a>
                                    <a href='https://wa.me/919321131170'><img src={whatsapp} alt="WhatsApp" /></a>
                                    <a href="https://www.youtube.com/@myssodotorg"><img src={youtube} alt="YouTube" /></a>
                                    <a href="https://x.com/myssodotorg"><img src={two} alt="Twitter" /></a>
                                    {/* <a href="https://www.youtube.com/@myssodotorg"><img src={one} alt="YouTube" /></a> */}
                                </div>
                            </div>
                        </Col>
                        <Col lg={6}>
                            <Row>
                                <Col lg={4}>
                                    <div className='secondbox'>
                                        <h4>Projects</h4>
                                        <ul>
                                            <li><a href="/Aboutmember">Directors & Members</a></li>
                                            <li><a href="/Matrimonial">Matrimonial</a></li>
                                            <li>{role === SEEKER || !role ? <a href="/JobSection">Job</a> : null}</li>
                                            <li><a href="/Startup">Startup</a></li>
                                            <li><a href="/Withoutchapters">Networking</a></li>
                                            <li><a href="/Support">Support</a></li>
                                        </ul>
                                    </div>
                                </Col>
                                <Col lg={4}>
                                    <div className='secondbox'>
                                        <h4>Useful Links</h4>
                                        <ul>
                                            <li><a href="/Aboutus">About Us</a></li>
                                            <li><a href="/contactus">Contact Us</a></li>
                                            <li><a href="/faqs">FAQs</a></li>
                                        </ul>
                                    </div>
                                </Col>
                                <Col lg={4}>
                                    <div className='secondbox'>
                                        <h4>Need Help</h4>
                                        <ul>
                                            <li><a href="/terms-and-condition">Terms & Conditions</a></li>
                                            <li><a href="/privacy-policy">Privacy Policy</a></li>
                                            <li><a href="/refund-policy">Cancellation & Refund Policy</a></li>
                                            <li><a href="/disclaimer">Disclaimer</a></li>
                                        </ul>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </div>
            {showDisclaimer && (
                <div
                    id="cookieNotice"
                    className="cookies-eu-banner light display-right"
                    style={{ display: "block" }}
                >
                    <div id="closeIcon" style={{ display: "none" }}></div>
                    <div className="title-wrap">
                        <h4 className='mb-5 mt-3'>Disclaimer</h4>
                    </div>
                    <div className="content-wrap">
                        <div className="msg-wrap">
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
                            <div className="btn-wrap">
                                <button className="button alt" onClick={acceptDisclaimer}>
                                    Accept to Enter Website
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <div className='copyright'>
                <p>Copyright © 2025 ShreeSSO - All Rights Reserved.</p>
            </div>
        </>
    );
}
export default Footer;