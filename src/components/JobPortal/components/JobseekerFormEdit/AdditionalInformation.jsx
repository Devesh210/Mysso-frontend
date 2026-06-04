import { FieldArray, Field, ErrorMessage } from 'formik'
import React from 'react'
import { Col, Row, Form, Container } from 'react-bootstrap'
import { myssoaboutsources, proficiencyLevels } from '../../../../utils'

const AdditionalInformation = ({ values, errors, touched, isSubmitting, setFieldValue }) => {
    return (
        <div className='profilegallery mb-5'>
            <h3 className='text-center mb-4'>Additional Information</h3>
            <Container>
                <Row className="mb-4">
                    <Col lg={4}>
                        <Form.Group>
                            <Form.Label>Computer Knowledge Proficiency<span className='labelerrorssss'>*</span></Form.Label>
                            <Field as="select" name="additionalInformation.computerProficiency" className="form-select">
                                <option value="">Select proficiency</option>
                                {proficiencyLevels.map((level) => (
                                    <option key={level} value={level}>
                                        {level}
                                    </option>
                                ))}
                            </Field>
                            <ErrorMessage name="additionalInformation.computerProficiency" component="div" className="text-danger" />
                        </Form.Group>
                    </Col>

                    <Col lg={4}>
                        <Form.Group>
                            <Form.Label>Current Salary (LPA)<span className='labelerrorssss'>*</span></Form.Label>
                            <Field name="additionalInformation.currentSalary" type="number" as={Form.Control} placeholder="Current Salary (LPA) " />
                            <ErrorMessage name="additionalInformation.currentSalary" component="div" className="text-danger" />
                        </Form.Group>
                    </Col>
                    <Col lg={4}>
                        <Form.Group>
                            <Form.Label>Salary Expectations (LPA)<span className='labelerrorssss'>*</span></Form.Label>
                            <Field name="additionalInformation.salaryExpectations" as={Form.Control} type="number" placeholder="Salary Expectations (LPA)" />
                            <ErrorMessage name="additionalInformation.salaryExpectations" component="div" className="text-danger" />
                        </Form.Group>
                    </Col>
                </Row>

                <Row className="mb-4">
                    <Col lg={12}>
                        <Form.Label>Communication Skills</Form.Label>
                        {Object.keys(values.communicationSkills).map((skillKey, index) => (
                            <Container key={index}>
                                <Row className="mb-3">
                                    <Col lg={5}>
                                        <h6>{skillKey.charAt(0).toUpperCase() + skillKey.slice(1)}</h6>
                                    </Col>
                                    <Col lg={5}>
                                        <Field as="select" name={`communicationSkills.${skillKey}`} className="form-select">
                                            <option value="">Select proficiency</option>
                                            {proficiencyLevels.map((level) => (
                                                <option key={level} value={level}>
                                                    {level}
                                                </option>
                                            ))}
                                        </Field>
                                        <ErrorMessage name={`communicationSkills.${skillKey}`} component="div" className="text-danger" />
                                    </Col>
                                </Row>
                            </Container>
                        ))}
                    </Col>
                </Row>

                <Row className="pb-4">
                    <Col lg={4}>
                        <Form.Group>
                            <Form.Label>How did you hear about ShreeSSO job portal<span className='labelerrorssss'>*</span></Form.Label>
                            <Field as={Form.Select} name="additionalInformation.howdidyouhearaboutmysso">
                                <option value="">Select</option>
                                {myssoaboutsources.map((item) => (
                                    <option key={item} value={item}>{item}</option>
                                ))}
                            </Field>
                            <ErrorMessage name="additionalInformation.howdidyouhearaboutmysso" component="div" className="text-danger" />
                        </Form.Group>
                    </Col>

                </Row>

            </Container>
        </div>
    )
}

export default AdditionalInformation
