import React, { useEffect, useState } from 'react';
import { Formik, Form as Formikform, Field, ErrorMessage, FieldArray } from 'formik';
import { Container, Row, Form, Col, Spinner, Alert, Button } from 'react-bootstrap'; // Use other Bootstrap components but avoid 'Form' here
import CreatableSelect from 'react-select/creatable';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import API_URL from '../../../../config';
import { useGetindustryQuery, usePostJobMutation } from '../../../redux/apiSlice';
import swal from 'sweetalert';
import { jobSchema, ShowRefmessage } from '../../../utils/validators';
import { DatePickerField } from '../../common';
import { addDays, degrees, jobTypes } from '../../../utils';
import HtmlEditor from './HTMLEditor';
import { useRef } from 'react';
const PostJob = () => {
    const { data: categories, error } = useGetindustryQuery();
    const refs = useRef(null);
    const descriptionRef = useRef(null)
    const [postJob, { isLoading }] = usePostJobMutation()
    const [loading, setLoading] = useState(false);
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);

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
        application_deadline: null,
    };
    const navigate = useNavigate();

    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const countryRes = await axios.get(`${API_URL}/api/countryList`);
                setCountries(countryRes.data.data);
            } catch (error) {
                console.error('Error fetching countries:', error);
            }
        };
        fetchLocations();
    }, []);

    const handleCountryChange = async (setFieldValue, value) => {
        const countryId = value;
        setFieldValue('country_id', countryId);
        setFieldValue('state_id', '');
        setFieldValue('city_id', '');

        try {
            const stateRes = await axios.get(`${API_URL}/api/getstatebycountry?country_id=${countryId}`);
            setStates(stateRes.data.data);
            setCities([]);
        } catch (error) {
            console.error('Error fetching states:', error);
        }
    };

    const handleStateChange = async (setFieldValue, value) => {
        const stateId = value;
        setFieldValue('state_id', stateId);
        setFieldValue('city_id', '');

        try {
            const cityRes = await axios.get(`${API_URL}/api/getcitybystate?state_id=${stateId}`);
            setCities(cityRes.data.data);
        } catch (error) {
            console.error('Error fetching cities:', error);
        }
    };





    const handleSubmit = async (values, { setSubmitting }) => {
        try {

            setLoading(true);
            const res = await postJob(values).unwrap();

            if (res.success) {
                swal('Success', res.message, 'success');
                navigate('/admin/jobs');
            }
        } catch (error) {
            swal('Error', error?.data?.message || error.message, 'error');
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
                        ref={refs} // Use ref here
                        onSubmit={async (event) => {
                            event.preventDefault();
                            try {

                                await jobSchema.validate(values, { abortEarly: false });
                                handleSubmit(values, { setSubmitting: () => { }, setFieldError: () => { } });
                            } catch (error) {

                                // Concatenate all error messages into a single string or show the first one
                                const errorMessage = error?.inner?.length > 0 ? error.inner[0].message : '';
                                let path = error?.inner?.length > 0 ? error.inner[0]["path"] : ""
                                console.log("path>>>>", path)
                                if (path === "description") {
                                    document.getElementById("description").scrollIntoView({ behavior: 'smooth', block: 'center' });
                                }

                                ShowRefmessage(error, refs)
                                swal({ text: errorMessage, icon: 'error' });
                            }
                        }}
                    >
                        <Container fluid className='matrimonialform mt-5 mb-5'>
                            <div className='profilegallery mb-5'>
                                <h3 className='text-center'>Basic Information</h3>
                                <div className='descr-content'>
                                    <Row>
                                        <Col lg={4}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Title <span className='labelerrorssss'>*</span></Form.Label>
                                                <Field name="title" type="text" className="form-control" />
                                                <ErrorMessage name="title" component="div" className="text-danger" />
                                            </Form.Group>
                                        </Col>

                                        <Col lg={4}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Short Description</Form.Label>
                                                <Field name="short_description" type="text" className="form-control" />
                                                <ErrorMessage name="short_description" component="div" className="text-danger" />
                                            </Form.Group>
                                        </Col>
                                        <Col lg={4}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Salary Range (In LPA)<span className='labelerrorssss'>*</span></Form.Label>
                                                <div className="d-flex">
                                                    <Field name="salary1" type="number" className="form-control " placeholder="Minimum Salary" />
                                                    <Field name="salary2" type="number" className="form-control mx-2" placeholder="Maximum Salary" />

                                                </div>
                                                <ErrorMessage name="salary1" component="div" className="text-danger" />
                                                <ErrorMessage name="salary2" component="div" className="text-danger" />
                                            </Form.Group>
                                        </Col>
                                        <Col lg={4}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Country <span className='labelerrorssss'>*</span></Form.Label>
                                                <Field name="country_id" as="select" className="form-control" onChange={(e) => handleCountryChange(setFieldValue, e.target.value)}>
                                                    <option value="">Select Country</option>
                                                    {countries.map((country) => (
                                                        <option key={country._id} value={country._id}>{country.country_name}</option>
                                                    ))}
                                                </Field>
                                                <ErrorMessage name="country_id" component="div" className="text-danger" />
                                            </Form.Group>
                                        </Col>
                                        <Col lg={4}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>State <span className='labelerrorssss'>*</span></Form.Label>
                                                <Field name="state_id" as="select" className="form-control" onChange={(e) => handleStateChange(setFieldValue, e.target.value)}>
                                                    <option value="">Select State</option>
                                                    {states.map((state) => (
                                                        <option key={state._id} value={state._id}>{state.state_name}</option>
                                                    ))}
                                                </Field>
                                                <ErrorMessage name="state_id" component="div" className="text-danger" />
                                            </Form.Group>
                                        </Col>
                                        <Col lg={4}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>City <span className='labelerrorssss'>*</span></Form.Label>
                                                <Field name="city_id" as="select" className="form-control">
                                                    <option value="">Select City</option>
                                                    {cities?.filter((item) => item?.city_name !== "Mumbai Suburban")?.map((city) => (
                                                        <option key={city._id} value={city._id}>
                                                            {city.city_name}
                                                        </option>
                                                    ))}
                                                </Field>
                                                <ErrorMessage name="city_id" component="div" className="text-danger" />
                                            </Form.Group>
                                        </Col>
                                        <Col lg={4}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Experience <span className='labelerrorssss'>*</span></Form.Label>
                                                <div className="d-flex">
                                                    <Field name="min_years" type="number" className="form-control me-2" placeholder="Min Years" />
                                                    <Field name="max_years" type="number" className="form-control" placeholder="Max Years" />
                                                </div>
                                                <ErrorMessage name="min_years" component="div" className="text-danger" />
                                                <ErrorMessage name="max_years" component="div" className="text-danger" />
                                            </Form.Group>
                                        </Col>
                                        <Col lg={4}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>No Of Vacancy <span className='labelerrorssss'>*</span></Form.Label>
                                                <Field name="position" type="number" className="form-control" />
                                                <ErrorMessage name="position" component="div" className="text-danger" />
                                            </Form.Group>
                                        </Col>

                                        <Col lg={4}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Education <span className='labelerrorssss'>*</span></Form.Label>
                                                <Field name="education" as="select" className="form-control">
                                                    <option value="">Select Degree</option>
                                                    {degrees.map((degree) => (
                                                        <option key={degree} value={degree}>{degree}</option>
                                                    ))}
                                                </Field>
                                                <ErrorMessage name="education" component="div" className="text-danger" />
                                            </Form.Group>
                                        </Col>
                                        <Col lg={4}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Job Type <span className='labelerrorssss'>*</span></Form.Label>
                                                <Field name="jobType" as="select" className="form-control">
                                                    <option value="">Select Job Type</option>
                                                    {jobTypes.map((type) => (
                                                        <option key={type} value={type}>{type}</option>
                                                    ))}
                                                </Field>
                                                <ErrorMessage name="jobType" component="div" className="text-danger" />
                                            </Form.Group>
                                        </Col>

                                        <Col lg={4}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Tags</Form.Label>
                                                <Field name="tags">
                                                    {({ field, form }) => {

                                                        // Ensure options are formatted correctly
                                                        const formattedTags = field?.value?.map(tag => ({ label: tag.trim(), value: tag.trim() }));

                                                        return (
                                                            <CreatableSelect
                                                                isMulti
                                                                {...field}
                                                                value={formattedTags}
                                                                options={formattedTags}
                                                                onChange={(option) =>
                                                                    form.setFieldValue(field.name, option.map(item => item.value))
                                                                }
                                                            />
                                                        );
                                                    }}
                                                </Field>


                                                <ErrorMessage name="tags" component="div" className="text-danger" />
                                            </Form.Group>
                                        </Col>
                                        <Col lg={4}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Interview Process <span className='labelerrorssss'>*</span></Form.Label>
                                                <Field name="interview_process" as="textarea" className="form-control" />
                                                <ErrorMessage name="interview_process" component="div" className="text-danger" />
                                            </Form.Group>
                                        </Col>
                                        <Col lg={4}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Additional Instructions</Form.Label>
                                                <Field name="additional_instructions" as="textarea" className="form-control" />
                                                <ErrorMessage name="additional_instructions" component="div" className="text-danger" />
                                            </Form.Group>
                                        </Col>
                                        <Col lg={4} className='d-grid'>
                                            <Form.Group className="d-grid  mb-3">

                                                <DatePickerField
                                                    name="application_deadline"
                                                    label="Application Deadline"
                                                />
                                            </Form.Group>
                                        </Col>

                                        <Col lg={4}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Category <span className='labelerrorssss'>*</span></Form.Label>
                                                <Field name="category" as="select" className="form-control">
                                                    <option value="">Select a Category</option>
                                                    {categories?.data?.map((category) => (
                                                        <option key={category._id} value={category._id}>{category.title}</option>
                                                    ))}
                                                </Field>
                                                <ErrorMessage name="category" component="div" className="text-danger" />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                </div>
                            </div>

                            <div className="profilegallery mb-5">
                                <h3 className="text-center" id="description">Description <span className='labelerrorssss'>*</span></h3>
                                <Field name="description" >
                                    {({ field, form }) => (
                                        <div>
                                            <HtmlEditor
                                                htmlContent={field.value} // Bind value to the form field
                                                setHtmlContent={(v) => form.setFieldValue(field.name, v)} // Update the form field with new content
                                            />
                                        </div>
                                    )}
                                </Field>


                                <ErrorMessage
                                    name="description"
                                    component="div"
                                    className="text-danger"
                                />
                            </div>

                            <div className='profilegallery mb-5'>
                                <h3 className='text-center'>Skills</h3>
                                <div className='descr-content'>
                                    <FieldArray name="skills">
                                        {({ insert, remove, push }) => (
                                            <div>
                                                {values?.skills?.length > 0 &&
                                                    values?.skills?.map((skill, index) => (
                                                        <div className="row" key={index}>
                                                            <div className="col">
                                                                <Field
                                                                    name={`skills.${index}`}
                                                                    placeholder="Enter skill"
                                                                    type="text"
                                                                    className="form-control"
                                                                />
                                                                <ErrorMessage
                                                                    name={`skills.${index}`}
                                                                    component="div"
                                                                    className="text-danger"
                                                                />
                                                            </div>
                                                            <div className="col">
                                                                <button
                                                                    type="button"
                                                                    className=" search-partner add-company mt-0"
                                                                    onClick={() => remove(index)}
                                                                >
                                                                    X
                                                                </button>
                                                            </div>
                                                        </div>
                                                    ))}
                                                <button
                                                    type="button"
                                                    className=" search-partner add-company mt-0"
                                                    onClick={() => push('')}
                                                >
                                                    Add Skill
                                                </button>
                                            </div>
                                        )}
                                    </FieldArray>
                                </div>
                            </div>
                            <div className='profilegallery mb-5'>
                                <h3 className='text-center'>Requirements</h3>
                                <div className='descr-content'>
                                    <Form.Group className="mb-3">
                                        <Field name="requirements" rows="7" style={{ height: 'auto' }} component="textarea" className="form-control" />
                                        <ErrorMessage name="requirements" component="div" className="text-danger" />
                                    </Form.Group>
                                </div>
                            </div>

                            <div className='profilegallery mb-5'>
                                <h3 className='text-center'>Benefits (Perks)</h3>
                                <div className='descr-content'>
                                    <FieldArray name="benefits">
                                        {({ insert, remove, push }) => (
                                            <div>
                                                {values?.benefits?.length > 0 &&
                                                    values?.benefits?.map((benefit, index) => (
                                                        <div className="row" key={index}>
                                                            <div className="col">
                                                                <Field
                                                                    name={`benefits.${index}`}
                                                                    placeholder="Enter benefit"
                                                                    type="text"
                                                                    className="form-control"
                                                                />
                                                                <ErrorMessage
                                                                    name={`benefits.${index}`}
                                                                    component="div"
                                                                    className="text-danger"
                                                                />
                                                            </div>
                                                            <div className="col">
                                                                <button
                                                                    type="button"
                                                                    className=" search-partner add-company mt-0"
                                                                    onClick={() => remove(index)}
                                                                >
                                                                    X
                                                                </button>
                                                            </div>
                                                        </div>
                                                    ))}
                                                <button
                                                    type="button"
                                                    className=" search-partner add-company mt-0"
                                                    onClick={() => push('')}
                                                >
                                                    Add Benefit
                                                </button>
                                            </div>
                                        )}
                                    </FieldArray>
                                </div>
                            </div>

                            <div className='text-center mt-4'>
                                {loading || isLoading || isSubmitting ? (
                                    <Button className='submitforms' disabled>
                                        <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                                        Posting...
                                    </Button>
                                ) : (
                                    <Button type="submit" className='submitforms'>Post a Job</Button>
                                )}
                            </div>
                        </Container>
                    </Formikform>
                }}
            </Formik>
        </Container>
    );

};

export default PostJob;