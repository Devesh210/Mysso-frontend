import { FieldArray, Field, ErrorMessage } from 'formik'
import React, { useEffect, useState } from 'react'
import { Col, Row, Form, Container } from 'react-bootstrap'
import { myssoaboutsources, proficiencyLevels } from '../../../../utils'

const AdditionalInformation = ({ values, errors, touched, isSubmitting, setFieldValue, resumeRef, idProofRef }) => {
    const [resumePreview, setResumePreview] = useState(null);
    const [idProofPreview, setIdProofPreview] = useState(null);

    // Set preview when values change
    useEffect(() => {
        if (values.additionalInformation.resume) {
            const file = values.additionalInformation.resume;
            setResumePreview(typeof file === 'string' ? file : URL.createObjectURL(file));
        }
        if (values.additionalInformation.IdProof) {
            const file = values.additionalInformation.IdProof;
            setIdProofPreview(typeof file === 'string' ? file : URL.createObjectURL(file));
        }
    }, [values.additionalInformation.resume, values.additionalInformation.IdProof]);

    // Handle resume upload
    const handleResumeUpload = (event) => {
        const file = event.target.files[0];
        setFieldValue('additionalInformation.resume', file);
        setResumePreview(URL.createObjectURL(file));
    };

    // Handle ID proof upload
    const handleIdProofUpload = (event) => {
        const file = event.target.files[0];
        setFieldValue('additionalInformation.IdProof', file);
        setIdProofPreview(URL.createObjectURL(file));
    };

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
                        {values.communicationSkills && Object.keys(values.communicationSkills).map((skillKey, index) => (
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
                    <Col lg={4}>
                        <Form.Group>
                            <Form.Label>
                                Upload Your Resume<span className="labelerrorssss">*</span>
                            </Form.Label>
                            <Form.Control
                                type="file"
                                ref={resumeRef}
                                name="additionalInformation.resume"
                                accept=".pdf, .docx, .doc"
                                onChange={handleResumeUpload}
                            />
                            <ErrorMessage
                                name="additionalInformation.resume"
                                component="div"
                                className="text-danger"
                            />
                            {resumePreview && (
                                <div className="mt-2">
                                    <small>Preview:</small>
                                    <a
                                        href={resumePreview}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="d-block text-primary"
                                    >
                                        {typeof values.additionalInformation.resume === 'string'
                                            ? values.additionalInformation.resume.split('/').pop()
                                            : values.additionalInformation.resume?.name || 'View Resume'}
                                    </a>
                                </div>
                            )}
                        </Form.Group>
                    </Col>
                    <Col lg={4}>
                        <Form.Group>
                            <Form.Label>
                                ID Proof<span className="labelerrorssss">*</span>
                            </Form.Label>
                            <Form.Control
                                type="file"
                                name="additionalInformation.IdProof"
                                ref={idProofRef}
                                accept=".jpg, .jpeg, .png,.pdf,"
                                onChange={handleIdProofUpload}
                            />
                            <ErrorMessage
                                name="additionalInformation.IdProof"
                                component="div"
                                className="text-danger"
                            />
                            {idProofPreview && (
                                <div className="mt-2">
                                    <small>Preview:</small>
                                    <a
                                        href={idProofPreview}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="d-block text-primary"
                                    >
                                        {typeof values.additionalInformation.IdProof === 'string'
                                            ? values.additionalInformation.IdProof.split('/').pop()
                                            : values.additionalInformation.IdProof?.name || 'View ID Proof'}
                                    </a>
                                </div>
                            )}
                        </Form.Group>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default AdditionalInformation
