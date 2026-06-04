import React, { useState, useEffect, useRef } from 'react'
import { Col, Container, Form, Row } from 'react-bootstrap'

import PhoneInput, { formatPhoneNumber, formatPhoneNumberIntl, isValidPhoneNumber } from "react-phone-number-input";
import en from 'react-phone-number-input/locale/en';
import 'react-phone-number-input/style.css';
import { RotatingLines } from 'react-loader-spinner'
import swal from 'sweetalert';
import API_URL from '../../config';

const Feedbackform = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [isPhoneValid, setIsPhoneValid] = useState(true);
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [isloading, setIsloading] = useState(false);

    const handlePhoneChange = (value) => {
        setPhone(value);
        if (value === '' || value === undefined) {
            setIsPhoneValid(true);
        } else {
            setIsPhoneValid(isValidPhoneNumber(value));
        }
    };

    const NameRef = useRef(null);
    const EmailRef = useRef(null);
    const PhoneRef = useRef(null);
    const SubjectRef = useRef(null);
    const MessageRef = useRef(null);



    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log('name:', name);
        console.log('email:', email);
        console.log('phone:', phone);
        console.log('subject:', subject);
        console.log('message:', message);
        try {
            if (!name ) {
                swal({
                    text: "Please enter your full name",
                    icon: "warning",
                });
                NameRef.current.focus();
                return;
            }
            else if (!email) {
                swal({
                    text: "Please enter your email",
                    icon: "warning",
                });
                EmailRef.current.focus();
                return;
            }
            else if (email && (!email.includes('@') && !email.includes('.'))) { 
                swal({
                    text: "Please enter a valid email",
                    icon: "warning",
                });
                EmailRef.current.focus();
                return;
            }
            else if (!phone) {
                swal({
                    text: "Please enter your phone number",
                    icon: "warning",
                });
                PhoneRef.current.focus();
                return;
            }
            else if (!isPhoneValid) {
                swal({
                    text: "Please enter a valid phone number",
                    icon: "warning",
                });
                PhoneRef.current.focus();
                return;
            }
            else if (!subject) {
                swal({
                    text: "Please enter a subject",
                    icon: "warning",
                });
                SubjectRef.current.focus();
                return;
            }
            else if (!message) {
                swal({
                    text: "Please enter a message",
                    icon: "warning",
                });
                MessageRef.current.focus();
                return;
            }
            else {
            setIsloading(true);

            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, phone, subject, message })
            };

            await fetch(`${API_URL}/api/feedback`, requestOptions)
                .then(response => response.json())
                .then(data => {
                    console.log('data:', data);
                    if (data.status === 200) {
                        swal({
                            text: "Feedback submitted successfully",
                            icon: "success",
                        }).then(() => {
                            setName('');
                            setEmail('');
                            setPhone('');
                            setSubject('');
                            setMessage('');
                            setIsloading(false);
                        })
                       

                        console.log('Feedback submitted successfully');
                    } else {
                        swal({
                            text: "Failed to submit feedback",
                            icon: "error",
                        });
                        setIsloading(false);
                        console.log('Failed to submit feedback');
                    }
                });
            }

        } catch (error) {
            console.log('error:', error);
        }
    }




    return (
        <div>
            <div id='feedbacl-form-all'>
                <Container fluid>
                   
                    <form action="#" method="post">
                        <h1>Feedback Form</h1>
                        <p>Your thoughts are valuable in helping improve our products.</p>
                        <Row>
                            <Col lg={6} className='mb-3'>
                                <Form.Label>Full Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder='Enter Full Name'
                                    onChange={(e) => setName(e.target.value)}
                                    value={name}
                                    ref={NameRef}
                                />
                            </Col>
                            <Col lg={6} className='mb-3'>
                                <Form.Label>Email Address</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder='Enter Email Address'
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                    ref={EmailRef}
                                />
                            </Col>
                            <Col lg={6} className='mb-3'>
                                <Form.Label>Phone Number</Form.Label>
                                {/* <Form.Control
                                    type="text"
                                    placeholder='Enter Phone Number'
                                    onChange={(e) => setPhone(e.target.value)}
                                /> */}
                                <PhoneInput
                                    className={`form-control ${!isPhoneValid ? 'is-invalid' : ''}`}
                                    defaultCountry="IN"
                                    international
                                    countryCallingCodeEditable={false}
                                    localization={en}
                                    placeholder="Enter your Mobile Number"
                                    value={phone}
                                    onChange={handlePhoneChange}
                                    ref={PhoneRef}
                                />
                            </Col>
                            <Col lg={6} className='mb-3'>
                                <Form.Label>Subject</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder='Enter Subject'
                                    onChange={(e) => setSubject(e.target.value)}
                                    value={subject}
                                    ref={SubjectRef}
                                />
                            </Col>
                            <Col lg={12} className='mb-3'>
                                <Form.Label>Message</Form.Label>
                                <Form.Control as="textarea" rows={4} style={{ height: '180px' }} placeholder='Enter Message' value={message} onChange={(e) => setMessage(e.target.value)} ref={MessageRef}/>
                            </Col>
                        </Row>
                        <Row className='feeb-buttonrow'>
                            { isloading ? (
                                <button  className="feeb-button" disabled>
                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                Submitting...
                                </button>
                            ) :
                            <button  className="feeb-button" onClick={handleSubmit}>Submit</button>
                        }
                        </Row>
                    </form>
                </Container>
            </div>
        </div>
    )
}
export default Feedbackform