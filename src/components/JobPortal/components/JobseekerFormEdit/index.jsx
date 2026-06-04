import React, { useState, useEffect, useRef } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import { Formik, Form as FromikForm, Field, FieldArray, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import PersonalDetails from './PersonalDetails';
import ContactDetails from './ContactDetails';
import EducationDetails from './EducationDetails';
import AdditionalInformation from './AdditionalInformation';
import WorkExperience from './WorkExperience';
import EmployeementDetails from './employeementDetails';
import KeySkillsDetails from './KeySkillsDetails';
import { useRegisterJobseekerMutation } from '../../../../redux/apiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { isValidPhoneNumber } from 'react-phone-number-input';
import { handleSubmitJobseekerform } from '../../../../redux/store';
import profile from '../../../../assets/profile.png';
import ProfileUpdate from './ProfileUpdate';
import { SpinLoader } from '../../../../hooks';
import { JobSeekerEditvalidationSchema } from '../../../../utils/validators';


const curr = new Date();
curr.setFullYear(curr.getFullYear() - 18);

const JobseekerFormEdit = ({ profileData }) => {
    const navigate = useNavigate()
    const initialdata = useSelector((state) => state.Jobseekersform)
    const [postJob, { isLoading }] = useRegisterJobseekerMutation();

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            handleSubmitJobseekerform(values)
            setSubmitting(true);
            // API call
            const response = await postJob(values).unwrap();
            swal({ text: "Updated Successfully", icon: 'success' });
            setTimeout(() => navigate('/Profile'), 1000);
        } catch (error) {
            console.error('Error during form submission', error);
            swal({ text: error?.data?.message, icon: "error" })
        } finally {
            setSubmitting(false);
        }
    };
    const refs = useRef(null)
    if (!initialdata.formdata || initialdata.loading || Object.keys(initialdata.formdata).length === 0) {
        return <SpinLoader />; // or return a loading indicator
    }

    return (
        <Container fluid className='matrimonialform mt-5 mb-5'>
            <Formik
                initialValues={initialdata.formdata}
                validationSchema={JobSeekerEditvalidationSchema}
                onSubmit={handleSubmit}
            >
                {({ values, errors, touched, isSubmitting, setFieldValue, validateForm }) => {
                    useEffect(() => {
                        if (values?.personalDetails?.dateOfBirth) {
                            let data = (new Date().getFullYear()) - (new Date(values?.personalDetails?.dateOfBirth).getFullYear())
                            setFieldValue("personalDetails.age", data)
                        }
                    }, [values?.personalDetails?.dateOfBirth]);
                    return <FromikForm
                        ref={refs}
                    // onSubmit={async (event) => {
                    //     event.preventDefault();
                    //     try {
                    //         // Validate the form schema with all errors captured (abortEarly: false)
                    //         await validationSchema.validate(values, { abortEarly: false });

                    //         // Proceed to form submission if validation passes
                    //         handleSubmit(values, { setSubmitting: () => { }, setFieldError: () => { } });

                    //     } catch (error) {
                    //         // If Yup validation fails, capture the array of errors

                    //         // Concatenate all error messages into a single string or show the first one
                    //         const errorMessage = error.inner.length > 0 ? error.inner[0].message : '';

                    //         ShowRefmessage(error, refs)
                    //         swal({ text: errorMessage, icon: 'error' });
                    //     }
                    // }}
                    >
                        <ProfileUpdate profileData={profileData} />

                        <PersonalDetails values={values} errors={errors} touched={touched} isSubmitting={isSubmitting} setFieldValue={setFieldValue} />
                        {/* Render the ContactDetails component */}
                        <ContactDetails
                            values={values}
                            errors={errors}
                            touched={touched}
                            setFieldValue={setFieldValue}
                        />

                        <EducationDetails values={values} errors={errors} touched={touched} isSubmitting={isSubmitting} setFieldValue={setFieldValue} />

                        {/* <WorkExperience values={values} errors={errors} touched={touched} isSubmitting={isSubmitting} setFieldValue={setFieldValue} /> */}
                        <EmployeementDetails values={values} errors={errors} touched={touched} isSubmitting={isSubmitting} setFieldValue={setFieldValue} />

                        <KeySkillsDetails values={values} errors={errors} touched={touched} isSubmitting={isSubmitting} />
                        <AdditionalInformation values={values} errors={errors} touched={touched} isSubmitting={isSubmitting} setFieldValue={setFieldValue} />
                        <button type="submit" onClick={() => {
                            {
                                Object.keys(errors).length > 0 && swal({ text: "Please fill all mandatory fields", icon: "warning" })
                            }
                        }} className='submitforms' disabled={isSubmitting}>
                            {isSubmitting ? 'Submitting...' : 'Submit'}
                        </button>
                    </FromikForm>
                }}
            </Formik>
        </Container>


    );
};

export default JobseekerFormEdit;