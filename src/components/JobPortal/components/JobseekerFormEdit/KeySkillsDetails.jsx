import { Field, ErrorMessage } from 'formik';
import React from 'react';
import { Row, Col, Form,Container } from 'react-bootstrap';
import { proficiencyLevels } from '../../../../utils';

const KeySkillsDetails = ({ values, errors, touched, isSubmitting, setFieldValue }) => {
    return (
        <div className="profilegallery mb-5">
            <h3 className="text-center mb-4">Key Skills</h3>
            {values.keySkills && values.keySkills.map((_, index) => (
                <Container>
                    <Row className="pb-4" key={index}>
                        <Col lg={5}>
                            <Form.Group controlId={`keySkills.${index}.skill`}>
                                <Form.Label>Skill {index + 1}<span className='labelerrorssss'>*</span></Form.Label>
                                <Field
                                    name={`keySkills.${index}.skill`}
                                    type="text"
                                    placeholder={`Skill ${index + 1}`}
                                    as={Form.Control}
                                    isInvalid={!!errors.keySkills?.[index]?.skill && touched.keySkills?.[index]?.skill}
                                />
                                <ErrorMessage name={`keySkills.${index}.skill`} component={Form.Control.Feedback} type="invalid" />
                            </Form.Group>
                        </Col>
                        <Col lg={5}>
                            <Form.Group controlId={`keySkills.${index}.proficiency`}>
                                <Form.Label>Proficiency Level<span className='labelerrorssss'>*</span></Form.Label>
                                <Field as="select" name={`keySkills.${index}.proficiency`} className="form-select">
                                    <option value="">Select proficiency</option>
                                    {proficiencyLevels.map((level) => (
                                        <option key={level} value={level}>
                                            {level}
                                        </option>
                                    ))}
                                </Field>
                                <ErrorMessage name={`keySkills.${index}.proficiency`} component="div" className="text-danger" />
                            </Form.Group>
                        </Col>
                    </Row>
                </Container>
            ))}
        </div>
    );
};

export default KeySkillsDetails;
