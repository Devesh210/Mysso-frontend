import React, { useEffect, useState } from 'react';
import { Formik, Form as Formikform, Field, ErrorMessage, FieldArray } from 'formik';
import { Container, Row, Form, Col, Spinner, Alert, Button } from 'react-bootstrap'; // Use other Bootstrap components but avoid 'Form' here

import swal from 'sweetalert';
import { jobSchema, ShowRefmessage } from '../../../utils/validators';

const ExampleComponent = () => {


    const initialValues = {
        title: "",
        description: "",
        short_description: "",
        requirements: "",
        skills: [],
        benefits: [],
        salary1: "",
        salary2: "",
        state_id: "",
        city_id: "",
        country_id: "",
        jobType: "",
        position: "",
        min_years: "",
        max_years: "",
        education: "",
        category: "",
        tags: [],
        interview_process: "",
        additional_instructions: "",
        application_deadline: "",
    };

    const handleSubmit = async (values, { setSubmitting }) => {
        try {

            setLoading(true);


        } catch (error) {
            swal('Error', error.message, 'error');
        } finally {
            setLoading(false);
            setSubmitting(false);
        }
    };
    return (
        <Container fluid className='matrimonialform mt-5 mb-5'>
            <Formik
                initialValues={initialValues}
                validationSchema={jobSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting, setFieldValue, values }) => {

                    return <Formikform
                        onSubmit={async (event) => {
                            event.preventDefault();
                            try {

                                await jobSchema.validate(values, { abortEarly: false });
                                handleSubmit(values, { setSubmitting: () => { }, setFieldError: () => { } });
                            } catch (error) {

                                // Concatenate all error messages into a single string or show the first one
                                const errorMessage = error?.inner?.length > 0 ? error.inner[0].message : '';
                                let path = error?.inner?.length > 0 ? error.inner[0]["path"] : ""



                                ShowRefmessage(error, refs)
                                swal({ text: errorMessage, icon: 'error' });
                            }
                        }}
                    >


                        <div>
                            <h3 className='text-center'>Requirements</h3>
                            <div className='descr-content'>
                                <Form.Group className="mb-3">
                                    <Field name="requirements" component="textarea" className="form-control" rows="14" style={{ height: 'auto' }} />
                                    <ErrorMessage name="requirements" component="div" className="text-danger" />
                                </Form.Group>
                            </div>
                        </div>


                        <div className='text-center mt-4'>
                            {isSubmitting ? (
                                <Button className='submitforms' disabled>
                                    <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                                    Posting...
                                </Button>
                            ) : (
                                <Button type="submit" className='submitforms'>Post a Job</Button>
                            )}
                        </div>

                    </Formikform>
                }}
            </Formik>
        </Container>
    );

};

export default ExampleComponent;