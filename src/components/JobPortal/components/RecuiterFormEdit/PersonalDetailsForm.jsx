import React from 'react';
import { Formik, Form as FormikForm } from 'formik';
import { Container } from 'react-bootstrap';
import PersonalDetails from './PersonalDetails';
import { recruiterFormValidationSchema } from '../../../../utils/validators';
import { useDispatch } from 'react-redux';
import { setUpdatedJobProfileData } from '../../../../redux/authSlice';
import swal from 'sweetalert';

const PersonalDetailsForm = ({ profileData, initialdata, refs }) => {
    const dispatch = useDispatch();

    const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
        try {
            const formData = new FormData();
            let data = values;
            const { profilephoto } = { ...data.personalDetails };
            formData.append("profilephoto", profilephoto);
            formData.append("data", JSON.stringify(data));

            // Handle API call for personal details
            const response = await postJob({ formData, method: "PUT" }).unwrap();
            dispatch(setUpdatedJobProfileData(response.data));
            swal({ text: response.data?.message, icon: 'success' });
        } catch (err) {
            swal({ text: err?.data?.message || err.message, icon: 'error' });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Container fluid className="mt-5 mb-5">
            <Formik
                initialValues={initialdata.formdata}
                validationSchema={recruiterFormValidationSchema}
                onSubmit={handleSubmit}
            >
                {({ values, errors, touched, setFieldValue, isSubmitting }) => (
                    <FormikForm>
                        <PersonalDetails
                            values={values}
                            setFieldValue={setFieldValue}
                            touched={touched}
                            errors={errors}
                            refs={refs}
                        />
                        <div className="mt-3 text-end">
                            <button type="submit" className="btn savebtn" disabled={isSubmitting}>
                                {isSubmitting ? 'Submitting...' : 'Submit'}
                            </button>
                        </div>
                    </FormikForm>
                )}
            </Formik>
        </Container>
    );
};

export default PersonalDetailsForm;
