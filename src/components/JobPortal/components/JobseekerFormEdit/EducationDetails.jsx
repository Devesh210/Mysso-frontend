import { FieldArray, Field, ErrorMessage } from 'formik';
import React from 'react';
import { Row, Col, Form, Button, Container } from 'react-bootstrap';
import { degrees, yearsArray } from '../../../../utils';

const EducationDetails = ({ values, errors, touched, isSubmitting, setFieldValue }) => {
    return (
        <div className="profilegallery mb-5">
            <h3 className="text-center mb-4">Education</h3>
            <FieldArray name="educationDetails">
                {(arrayHelpers) => (
                    <div>
                        {values.educationDetails.map((education, index) => (
                            <div key={index}>
                                <Container>
                                    <Row>
                                        <Col lg={2}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Degree<span className='labelerrorssss'>*</span></Form.Label>
                                                <Field
                                                    as="select"
                                                    name={`educationDetails.${index}.degree`}
                                                    className="form-control"
                                                    onChange={(e) => {
                                                        setFieldValue(`educationDetails.${index}.degree`, e.target.value);
                                                    }}
                                                >
                                                    {degrees.map((degree, i) => (
                                                        <option key={i} value={degree}>
                                                            {degree}
                                                        </option>
                                                    ))}
                                                </Field>
                                                <ErrorMessage
                                                    name={`educationDetails.${index}.degree`}
                                                    component="div"
                                                    className="text-danger"
                                                />
                                            </Form.Group>
                                        </Col>

                                        {/* Show fields based on the selected degree */}
                                        {['10th', '12th'].includes(education.degree) && (
                                            <>
                                                {/* Fields for 10th and 12th */}
                                                <Col lg={3}>
                                                    <Form.Group className="mb-3">
                                                        <Form.Label>School<span className='labelerrorssss'>*</span></Form.Label>
                                                        <Field
                                                            name={`educationDetails.${index}.institution`}
                                                            as={Form.Control}
                                                            placeholder="School"
                                                        />
                                                        <ErrorMessage
                                                            name={`educationDetails.${index}.institution`}
                                                            render={(msg) => (
                                                                <div className="text-danger">
                                                                    School is Required
                                                                </div>
                                                            )}
                                                        />


                                                    </Form.Group>
                                                </Col>
                                                <Col lg={3}>
                                                    <Form.Group className="mb-3">
                                                        <Form.Label>Board<span className='labelerrorssss'>*</span></Form.Label>
                                                        <Field
                                                            name={`educationDetails.${index}.board`}
                                                            as={Form.Control}
                                                            placeholder="Board"
                                                        />
                                                        <ErrorMessage
                                                            name={`educationDetails.${index}.board`}
                                                            component="div"
                                                            className="text-danger"
                                                        />
                                                    </Form.Group>
                                                </Col>
                                                <Col lg={3}>
                                                    <Form.Group className="mb-3">
                                                        <Form.Label>Year of Passing Out<span className='labelerrorssss'>*</span></Form.Label>
                                                        <Field
                                                            name={`educationDetails.${index}.yearOfCompletion`}
                                                            as={Form.Select}
                                                            placeholder="Year of Passing Out"
                                                        >
                                                            <option hidden>Select Year of Achievement</option>
                                                            {yearsArray?.map((year) => (
                                                                <option key={year} value={year}>
                                                                    {year}
                                                                </option>
                                                            ))}
                                                        </Field>

                                                        <ErrorMessage
                                                            name={`educationDetails.${index}.yearOfCompletion`}
                                                            component="div"
                                                            className="text-danger"
                                                        />
                                                    </Form.Group>
                                                </Col>
                                                <Col lg={3}>
                                                    <Form.Group className="mb-3">
                                                        <Form.Label>Result(Percentage)<span className='labelerrorssss'>*</span></Form.Label>
                                                        <Field
                                                            name={`educationDetails.${index}.percentage`}
                                                            as={Form.Control}
                                                            type="number"
                                                            placeholder="Result(Percentage)"
                                                        />
                                                        <ErrorMessage
                                                            name={`educationDetails.${index}.percentage`}
                                                            component="div"
                                                            className="text-danger"
                                                        />
                                                    </Form.Group>
                                                </Col>
                                            </>
                                        )}

                                        {['Diploma', 'Bachelors', 'Masters', 'PhD'].includes(education.degree) && (
                                            <>
                                                {/* Fields for Diploma, Bachelors, Masters, PhD */}
                                                <Col lg={3}>
                                                    <Form.Group className="mb-3">
                                                        <Form.Label>Institution<span className='labelerrorssss'>*</span></Form.Label>
                                                        <Field
                                                            name={`educationDetails.${index}.institution`}
                                                            as={Form.Control}
                                                            placeholder="Institution"
                                                        />
                                                        <ErrorMessage
                                                            name={`educationDetails.${index}.institution`}
                                                            component="div"
                                                            className="text-danger"
                                                        />
                                                    </Form.Group>
                                                </Col>

                                                <Col lg={3}>
                                                    <Form.Group className="mb-3">
                                                        <Form.Label>Year of Passing Out<span className='labelerrorssss'>*</span></Form.Label>
                                                        <Field
                                                            name={`educationDetails.${index}.yearOfCompletion`}
                                                            as={Form.Select}
                                                            placeholder="Year of Passing Out"
                                                        >
                                                            <option hidden>Select Year of Achievement</option>
                                                            {yearsArray?.map((year) => (
                                                                <option key={year} value={year}>
                                                                    {year}
                                                                </option>
                                                            ))}
                                                        </Field>

                                                        <ErrorMessage
                                                            name={`educationDetails.${index}.yearOfCompletion`}
                                                            component="div"
                                                            className="text-danger"
                                                        />
                                                    </Form.Group>
                                                </Col>
                                                <Col lg={3}>
                                                    <Form.Group className="mb-3">
                                                        <Form.Label>Result(Percentage)<span className='labelerrorssss'>*</span></Form.Label>
                                                        <Field
                                                            name={`educationDetails.${index}.percentage`}
                                                            as={Form.Control}
                                                            type="number"
                                                            placeholder="Result(Percentage)"
                                                        />
                                                        <ErrorMessage
                                                            name={`educationDetails.${index}.percentage`}
                                                            component="div"
                                                            className="text-danger"
                                                        />
                                                    </Form.Group>
                                                </Col>
                                            </>
                                        )}
                                        <Col className='d-grid align-content-center justify-content-end'>
                                            <div >
                                                <Button
                                                    type="button"
                                                    variant="danger"
                                                    onClick={() => arrayHelpers.remove(index)}
                                                    className="mb-3 "
                                                >
                                                    -
                                                </Button>
                                            </div>
                                        </Col>
                                    </Row>

                                  {/* <div className='d-grid justify-content-end'>
                                        <Button
                                            type="button"
                                            variant="danger"
                                            onClick={() => arrayHelpers.remove(index)}
                                            className="mb-3 "
                                        >
                                            -
                                        </Button>
                                  </div> */}
                                </Container>
                            </div>
                        ))}
                        <div className="d-grid justify-content-end mt-3 mx-4 pb-4">
                            <Button
                                type="button"
                                variant="success"
                                onClick={() =>
                                    arrayHelpers.push({
                                        degree: '', // Reset degree for each new entry
                                        institution: '',
                                        yearOfCompletion: '',
                                        board: '', // for 10th and 12th
                                        percentage: '', // for 10th and 12th=
                                    })
                                }
                                className="text-end mt-3"
                            >
                                + Education
                            </Button>
                        </div>

                    </div>
                )}
            </FieldArray>
        </div>
    );
};

export default EducationDetails;
