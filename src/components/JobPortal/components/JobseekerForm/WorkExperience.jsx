import { FieldArray, Field, ErrorMessage } from 'formik';
import React from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';

const WorkExperience = ({ values, errors, touched, isSubmitting, setFieldValue }) => {
    return (
        <div className='profilegallery mb-5'>
            <h3 className='text-center'>Work Experience</h3>
            <FieldArray name="workExperience">
                {(arrayHelpers) => (
                    <div>
                        {values.workExperience.map((experience, index) => (
                            <div key={index}>
                                <Row>
                                    <Col lg={4}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Company Name</Form.Label>
                                            <Field
                                                name={`workExperience.${index}.companyName`}
                                                as={Form.Control}
                                                placeholder="Company Name"
                                            />
                                            <ErrorMessage
                                                name={`workExperience.${index}.companyName`}
                                                component="div"
                                                className="text-danger"
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col lg={4}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Job Title</Form.Label>
                                            <Field
                                                name={`workExperience.${index}.jobTitle`}
                                                as={Form.Control}
                                                placeholder="Job Title"
                                            />
                                            <ErrorMessage
                                                name={`workExperience.${index}.jobTitle`}
                                                component="div"
                                                className="text-danger"
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col lg={4}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Start Date</Form.Label>
                                            <Field
                                                name={`workExperience.${index}.startDate`}
                                                as={Form.Control}
                                                type="date"
                                            />
                                            <ErrorMessage
                                                name={`workExperience.${index}.startDate`}
                                                component="div"
                                                className="text-danger"
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col lg={4}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>End Date</Form.Label>
                                            <Field
                                                name={`workExperience.${index}.endDate`}
                                                as={Form.Control}
                                                type="date"
                                            />
                                            <ErrorMessage
                                                name={`workExperience.${index}.endDate`}
                                                component="div"
                                                className="text-danger"
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <FieldArray name={`workExperience.${index}.responsibilities`}>
                                    {(subArrayHelpers) => (
                                        <div>
                                            <h5>Responsibilities</h5>
                                            {experience?.responsibilities?.map((responsibility, subIndex) => (
                                                <Row key={subIndex}>
                                                    <Col lg={4}>
                                                        <Form.Group className="mb-3">
                                                            <Form.Label>Responsibility</Form.Label>
                                                            <Field
                                                                name={`workExperience.${index}.responsibilities.${subIndex}`}
                                                                as={Form.Control}
                                                                placeholder="Responsibility"
                                                            />
                                                            <ErrorMessage
                                                                name={`workExperience.${index}.responsibilities.${subIndex}`}
                                                                component="div"
                                                                className="text-danger"
                                                            />
                                                        </Form.Group>
                                                    </Col>
                                                    <Col lg={4} className="d-flex align-items-end">
                                                        <Button
                                                            type="button"
                                                            variant="danger"
                                                            onClick={() => subArrayHelpers.remove(subIndex)}
                                                            className="mb-3"
                                                        >
                                                            Remove Responsibility
                                                        </Button>
                                                    </Col>
                                                </Row>
                                            ))}
                                            <Button
                                                type="button"
                                                variant="primary"
                                                onClick={() => subArrayHelpers.push('')}
                                                className="mb-3"
                                            >
                                                Add Responsibility
                                            </Button>
                                        </div>
                                    )}
                                </FieldArray>
                                <Button
                                    type="button"
                                    variant="danger"
                                    onClick={() => arrayHelpers.remove(index)}
                                    className="mb-3"
                                >
                                    Remove Work Experience
                                </Button>
                            </div>
                        ))}
                        <Button
                            type="button"
                            variant="success"
                            onClick={() =>
                                arrayHelpers.push({
                                    companyName: '',
                                    jobTitle: '',
                                    startDate: '',
                                    endDate: '',
                                    responsibilities: [''],
                                })
                            }
                            className="mt-3"
                        >
                            Add Work Experience
                        </Button>
                    </div>
                )}
            </FieldArray>
        </div>
    );
};

export default WorkExperience;
