import React, { useEffect, useRef } from 'react';
import { Formik, Form as FromikForm } from 'formik';
import PersonalDetails from './PersonalDetails';
import ContactDetails from './ContactDetails';
import { Container } from 'react-bootstrap';
import EducationDetails from './EducationDetails';
import AdditionalInformation from './AdditionalInformation';
import EmployeementDetails from './employeementDetails';
import KeySkillsDetails from './KeySkillsDetails';
import { useRegisterJobseekerMutation } from '../../../../redux/apiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { handleSubmitJobseekerform } from '../../../../redux/store';
import { JobSeekervalidationSchema, ShowRefmessage } from '../../../../utils/validators';
import { initialjobseekerform } from '../../../../utils/initialData.json';
import { debounce } from '../../../../utils';
import { SpinLoader } from '../../../../hooks';
const curr = new Date();
curr.setFullYear(curr.getFullYear() - 18);
// This will output the list of keys that contain arrays

const JobseekerForm = () => {
    const initialdata = useSelector((state) => state.Jobseekersform)
    const refs = useRef(null);
    // Create refs for file input fields
    const profilePhotoRef = useRef(null);
    const resumeRef = useRef(null);
    const idProofRef = useRef(null);
    const phoneRef = useRef(null);
    const whatsapRef = useRef(null);
    const [postJob, { isLoading }] = useRegisterJobseekerMutation();
    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            // Create a FormData object to handle file uploads
            const formData = new FormData();

            setSubmitting(true);

            // Extract files from the form values
            const { profilephoto } = values.personalDetails;
            const { resume, IdProof } = values.additionalInformation;


            // Append the files to the FormData object if they exist
            if (profilephoto) {
                formData.append("profilephoto", profilephoto);
            }
            if (resume) {
                formData.append("resume", resume);
            }
            if (IdProof) {
                formData.append("IdProof", IdProof);
            }

            // Create a copy of the values object to safely modify it
            const dataCopy = {
                ...values,
                personalDetails: { ...values.personalDetails },
                additionalInformation: { ...values.additionalInformation }
            };
            // Delete file fields from the copied object
            delete dataCopy.personalDetails.profilephoto;
            delete dataCopy.additionalInformation.resume;
            delete dataCopy.additionalInformation.IdProof;
            // Stringify the non-file data and append it to the FormData object
            formData.append("data", JSON.stringify(dataCopy));
            // API call using the formData object
            const response = await postJob(formData).unwrap();
            // Dispatch success data to the Redux store
            // dispatch(setJobProfileData(response.data));
            handleSubmitJobseekerform(initialjobseekerform)
            // Display success message and navigate to profile
            swal({ text: "Registered Successfully!", icon: 'success' });
            setTimeout(() => window.location.assign('/Profile'), 1000);

        } catch (error) {
            // Handle error during form submission
            console.error('Error during form submission', error);
            if (error?.data.message?.toLowerCase()?.includes("email")) {
                refs?.current["email"].scrollIntoView();
            }
            swal({ text: error?.data.message || "Form submission failed", icon: "error" });
        } finally {
            setSubmitting(false);
        }
    };
    const debouncedSave = debounce((values) => {
        handleSubmitJobseekerform(values);
    }, 500);
    if (initialdata.loading || !initialdata.formdata && Object.keys(initialdata.formdata).length === 0) {
        return < SpinLoader />
    }

    console.log("initialdata.formdata", initialdata.formdata)
    return (
        <Container fluid className='matrimonialform mt-5 mb-5'>
            <Formik
                // enableReinitialize={true}
                initialValues={initialdata.formdata}
                validationSchema={JobSeekervalidationSchema}
                onSubmit={handleSubmit}
            >
                {({ values, errors, touched, isSubmitting, setFieldValue, validateForm }) => {

                    useEffect(() => {
                        debouncedSave(values);
                    }, [values]);
                    useEffect(() => {
                        if (values?.personalDetails?.dateOfBirth) {
                            let data = (new Date().getFullYear()) - (new Date(values?.personalDetails?.dateOfBirth).getFullYear())
                            setFieldValue("personalDetails.age", data)
                        }
                    }, [values?.personalDetails?.dateOfBirth]);
                    return <FromikForm
                        ref={refs} // Use ref here
                    // onSubmit={async (event) => {
                    //     event.preventDefault();
                    //     try {

                    //         await JobSeekervalidationSchema.validate(values, { abortEarly: false });
                    //         handleSubmit(values, { setSubmitting: () => { }, setFieldError: () => { } });
                    //     } catch (error) {
                    //         // Concatenate all error messages into a single string or show the first one
                    //         const errorMessage = error?.inner?.length > 0 ? error.inner[0].message : '';
                    //         let path = error?.inner?.length > 0 ? error.inner[0]["path"] : ""
                    //         console.log("path??", path)

                    //         if (path == "personalDetails.profilephoto") {
                    //             document.getElementById("personalDetails.profilephoto").scrollIntoView();
                    //             // profilePhotoRef?.current?.scrollIntoView()
                    //         }
                    //         if (path == "additionalInformation.resume") {
                    //             resumeRef.current.scrollIntoView();
                    //         }
                    //         if (path == "ContactDetails.phone") {
                    //             phoneRef.current.scrollIntoView();
                    //         }
                    //         if (path == "ContactDetails.whatsappphone") {
                    //             whatsapRef.current.scrollIntoView();
                    //         }
                    //         if (path == "additionalInformation.IdProof") {
                    //             idProofRef.current.scrollIntoView();
                    //         }
                    //         ShowRefmessage(error, refs)
                    //         swal({ text: errorMessage, icon: 'error' });
                    //     }
                    // }}

                    >
                        <PersonalDetails values={values} errors={errors} touched={touched} isSubmitting={isSubmitting} setFieldValue={setFieldValue} profilePhotoRef={profilePhotoRef} />
                        {/* Render the ContactDetails component */}
                        <ContactDetails
                            values={values}
                            errors={errors}
                            touched={touched}
                            setFieldValue={setFieldValue}
                            phoneRef={phoneRef}
                            whatsapRef={whatsapRef}
                        />

                        <EducationDetails values={values} errors={errors} touched={touched} isSubmitting={isSubmitting} setFieldValue={setFieldValue} />

                        {/* <WorkExperience values={values} errors={errors} touched={touched} isSubmitting={isSubmitting} setFieldValue={setFieldValue} /> */}
                        <EmployeementDetails values={values} errors={errors} touched={touched} isSubmitting={isSubmitting} setFieldValue={setFieldValue} />

                        <KeySkillsDetails values={values} errors={errors} touched={touched} isSubmitting={isSubmitting} />
                        <AdditionalInformation values={values} errors={errors} touched={touched} isSubmitting={isSubmitting} setFieldValue={setFieldValue} resumeRef={resumeRef} idProofRef={idProofRef} />
                        <div className='text-center '>

                        </div>
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

export default JobseekerForm;