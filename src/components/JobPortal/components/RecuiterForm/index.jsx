import React, { useEffect, useRef } from 'react';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import { useRegisterRecruiterMutation } from '../../../../redux/apiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { setUpdatedJobProfileData } from '../../../../redux/authSlice';
import { Formik, Form as FormikForm } from 'formik';
import PersonalDetails from './PersonalDetails';
import Achievements from './Achievements';
import CompanyDetails from './CompanyDetails';
import { recruiterFormValidationSchema, ShowRefmessage } from '../../../../utils/validators';
import { initialRecruiterform } from '../../../../utils/initialData.json';
import { handleSubmitRecruiterform } from '../../../../redux/store';
import { debounce } from '../../../../utils';
import { handleFormError } from '../../../../utils/errorhandler';
import { SpinLoader } from '../../../../hooks';
const RecruiterForm = () => {
    const navigate = useNavigate();
    const { formdata, loading } = useSelector((state) => state.recruiterform);
    const dispatch = useDispatch();
    const [postJob, { isLoading }] = useRegisterRecruiterMutation();

    const refs = useRef(null);
    const phoneref = useRef(null);
    const companyref = useRef(null);

    const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
        try {
            console.log({ values })
            const formData = new FormData();
            let data = values;
            const { profilephoto, companylogo } = { ...data.personalDetails, ...data.company };
            formData.append("profilephoto", profilephoto);
            formData.append("companylogo", companylogo);
            formData.append("data", JSON.stringify(data));

            const response = await postJob({ formData }).unwrap();
            // dispatch(setUpdatedJobProfileData(response.data));
            swal({ text: "Registered Succesfully", icon: 'success' });
            handleSubmitRecruiterform(initialRecruiterform);
            setTimeout(() => window.location.assign('/Profile'), 1000);
        } catch (err) {
            console.log("err??", err)
            // if (err?.data.message?.toLowerCase()?.includes("email")) {
            //     refs?.current["email"].scrollIntoView({ behavior: "smooth", block: "center" });
            // }
            swal({ text: err?.data?.message || err.message, icon: 'error' });
        } finally {
            setSubmitting(false);
        }
    };

    const debouncedSave = debounce((values) => {
        handleSubmitRecruiterform(values);
    }, 500);
    if (loading || !formdata || Object.keys(formdata).length === 0) {
        return <SpinLoader />; // or return a loading indicator
    }

    return (
        <Container fluid className='matrimonialform mt-5 mb-5'>
            <Formik
                ref={refs}
                initialValues={formdata}

                validationSchema={recruiterFormValidationSchema}
                onSubmit={handleSubmit}
            >
                {({ values, errors, touched, isSubmitting, setFieldValue, validateForm }) => {
                    useEffect(() => {
                        debouncedSave(values);
                    }, [values]);

                    return (
                        <FormikForm

                        >
                            <PersonalDetails
                                values={values}
                                setFieldValue={setFieldValue}
                                touched={touched}
                                errors={errors}
                                phoneref={phoneref}
                            />
                            <Achievements
                                values={values}
                                setFieldValue={setFieldValue}
                                touched={touched}
                                errors={errors}
                            />
                            <CompanyDetails
                                values={values}
                                setFieldValue={setFieldValue}
                                touched={touched}
                                errors={errors}
                                companyref={companyref}
                            />
                            <div className='mt-3 text-end'>
                                <button type='submit' onClick={() => {
                                    {
                                        Object.keys(errors).length > 0 && swal({ text: "Please fill all mandatory fields", icon: "warning" })
                                    }
                                }} className='addbtn savebtn mb-2' disabled={isSubmitting || isLoading}>
                                    {isSubmitting || isLoading ? 'Submitting...' : 'Submit'}
                                </button>
                            </div>
                        </FormikForm>
                    );
                }}
            </Formik>
        </Container>
    );
};

export default RecruiterForm;