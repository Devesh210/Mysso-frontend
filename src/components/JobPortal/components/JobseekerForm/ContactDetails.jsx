import { FieldArray, Field, ErrorMessage } from 'formik';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import en from 'react-phone-number-input/locale/en';
import React from 'react'
import { Col, Row, Form } from 'react-bootstrap';

const ContactDetails = ({ values, errors, touched, setFieldValue, phoneRef, whatsapRef }) => {
    return (
        <div className='profilegallery mb-5'>
            <h3 className='text-center mb-4'>Contact Details</h3>
            <div className='container'>
                <Row className='pb-4'>
                    <Col lg={4} className="pb-4">
                        <Form.Label>Email <span className='labelerrorssss'>*</span></Form.Label>
                        <Field name="email" as={Form.Control} placeholder="Email" />
                        <ErrorMessage name='email' component='div' className='text-danger' />
                    </Col>

                    <Col lg={4} className="pb-4">
                        <label>Mobile Number <span className='labelerrorssss'>*</span></label>
                        <PhoneInput
                            className={`form-control`}
                            defaultCountry='IN'
                            international
                            ref={phoneRef}
                            countryCallingCodeEditable={false}
                            localization={en}
                            placeholder='Enter your Mobile Number'
                            value={values?.ContactDetails?.phone}
                            onChange={(value) => setFieldValue('ContactDetails.phone', value)}
                        />
                        <ErrorMessage name='ContactDetails.phone' component='div' className='text-danger' />
                    </Col>
                    <Col lg={4} className="pb-4">
                        <label>Whatsapp Number <span className='labelerrorssss'>*</span></label>
                        <PhoneInput
                            className={`form-control ${errors.jobApplication?.ContactDetails?.whatsappphone && touched.jobApplication?.ContactDetails?.whatsappphone ? 'is-invalid' : ''}`}
                            defaultCountry='IN'
                            international
                            ref={whatsapRef}
                            countryCallingCodeEditable={false}
                            localization={en}
                            placeholder='Enter Whatsapp Number'
                            value={values?.ContactDetails?.whatsappphone}
                            onChange={(value) => setFieldValue('ContactDetails.whatsappphone', value)}
                        />
                        <ErrorMessage name='ContactDetails.whatsappphone' component='div' className='text-danger' />
                    </Col>
                    <Col lg={6} className="pb-4">
                        <Form.Label>Personal Website /Blog(if any)</Form.Label>
                        <Field name="ContactDetails.portfolioLink" as={Form.Control} placeholder="Personal Website /Blog(if any)" />
                        <ErrorMessage name='ContactDetails.portfolioLink' component='div' className='text-danger' />
                    </Col>
                    <Col lg={6} className="pb-4">
                        <Form.Label>Linkedin Profile</Form.Label>
                        <Field name="ContactDetails.linkedinprofileLink" as={Form.Control} placeholder="Linkedin Profile" />
                        <ErrorMessage name='ContactDetails.linkedinprofileLink' component='div' className='text-danger' />
                    </Col>
                </Row>
            </div>
        </div>
    );
}


export default ContactDetails
