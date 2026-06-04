import React, { useRef, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import { useRegisterRecruiterMutation, useUpdateCompanyMutation, useUpdateProfileMutation } from '../../../../redux/apiSlice';
import { useSelector } from 'react-redux';
import { Formik, Form as FormikForm } from 'formik';
import PersonalDetails from './PersonalDetails';
import CompanyDetails from './CompanyDetails';
import { companyDetailsValidationSchema, personalDetailsValidationSchema, ShowRefmessage } from '../../../../utils/validators';
import { handleFormError } from '../../../../utils/errorhandler';
import { SpinLoader } from '../../../../hooks';

const RecuiterFormEdit = ({ profileData }) => {
    const formRefs = useRef({}); // Store references to form fields
    const phoneref = useRef(null);
    const companyref = useRef(null);
    const initialdata = useSelector((state) => state.recruiterform);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [postJob, { isLoading }] = useRegisterRecruiterMutation();
    const [updateCompany] = useUpdateCompanyMutation();
    const [updateProfile] = useUpdateProfileMutation();
    const [formData, setFormData] = useState({
        profilephotoPreview: initialdata?.formdata?.personalDetails?.profilePhotoUrl,
        companylogoPreview: initialdata?.formdata?.company?.logoUrl,
        profilephoto: null,
        companylogo: null,
    });

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        if (files && files.length > 0) {
            const file = files[0];
            setFormData(prevState => ({ ...prevState, [name]: file }));

            const reader = new FileReader();
            reader.onloadend = () => {
                if (name === 'profilephoto') {
                    setFormData(prevState => ({ ...prevState, profilephotoPreview: reader.result }));
                } else if (name === 'companylogo') {
                    setFormData(prevState => ({ ...prevState, companylogoPreview: reader.result }));
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (values, { setSubmitting, resetForm, formId }) => {
        try {
            let { profilePhotoUrl, profilephoto, ...rest } = values;

            if (formId === 'firstForm') {
                const response = await postJob({ formData: rest, method: "PUT" }).unwrap();
                swal({ text: "Updated Successfully", icon: 'success' });
                setTimeout(() => navigate('/Profile'), 1000);
            } else if (formId === 'secondForm') {
                await updateCompany({ id: values._id, formData: values }).unwrap();
                swal({ text: "Updated Successfully", icon: 'success' });
            }
        } catch (err) {
            swal({ text: err?.data?.message || err.message, icon: 'error' });
        } finally {
            setSubmitting(false);
        }
    };

    const handleUpdate = async (fileType) => {
        if (!formData[fileType]) {
            swal({ text: `Please upload a ${fileType}`, icon: "warning" });
            return;
        }

        try {
            setLoading(true);
            const formDataObj = new FormData();
            formDataObj.append(fileType, formData[fileType]);

            if (fileType === "companylogo") {
                await updateCompany({ id: initialdata?.formdata?.company?._id, formData: formDataObj }).unwrap();
            } else {
                await updateProfile(formDataObj).unwrap();
            }

            swal({ text: "Updated Successfully", icon: 'success' });
        } catch (err) {
            swal({ text: err.data?.message || err.error, icon: "error" });
        } finally {
            setLoading(false);
        }
    };

    if (!initialdata.formdata || initialdata.loading || Object.keys(initialdata.formdata).length === 0) {
        return <SpinLoader />;
    }



    const initialdataform = {
        ...initialdata.formdata?.personalDetails,
        email: initialdata.formdata?.email
    };
    return (
        <Container fluid className='matrimonialform mt-5 mb-5'>
            {/* Personal Details Form */}
            <Formik
                innerRef={formRefs}
                initialValues={initialdataform}
                validationSchema={personalDetailsValidationSchema}
                onSubmit={(values, actions) => handleSubmit(values, { ...actions, formId: 'firstForm' })}
            >
                {({ values, errors, touched, isSubmitting, setFieldValue, validateForm }) => (
                    <FormikForm id='personalDetails'>
                        <Row>
                            <Col lg={6}>
                                <div className='profileimgc text-center'>
                                    <img src={formData.profilephotoPreview} alt="Profile" className='prr profiles' />
                                    <div className='profilephoto edit' onClick={() => document.getElementById('uploadInput').click()}>
                                        <i className='fa fa-edit'></i>
                                    </div>
                                    <input
                                        id="uploadInput"
                                        type="file"
                                        name='profilephoto'
                                        accept=".jpg, .jpeg, .png"
                                        style={{ display: 'none' }}
                                        onChange={handleFileChange}
                                    />
                                    <button type='button' className='addbtn mt-4 mb-4' onClick={() => handleUpdate('profilephoto')}>
                                        Update Profile Photo
                                    </button>
                                </div>
                            </Col>
                            <Col lg={6} className='mb-2'>
                                <div className='profileimgc text-center'>
                                    <img src={formData.companylogoPreview} alt="Profile" className='prr profiles' />
                                    <div className='profilephoto edit' onClick={() => document.getElementById('companylogo').click()}>
                                        <i className='fa fa-edit'></i>
                                    </div>
                                    <input
                                        id="companylogo"
                                        type="file"
                                        name='companylogo'
                                        accept=".jpg, .jpeg, .png"
                                        style={{ display: 'none' }}
                                        onChange={e => handleFileChange(e)}
                                    />
                                    <button type='button' className='addbtn mt-4 mb-4' onClick={() => handleUpdate('companylogo')} >
                                        Update Company Logo
                                    </button>
                                </div>
                            </Col>
                        </Row>
                        <PersonalDetails values={values}
                            setFieldValue={setFieldValue}
                            touched={touched}
                            errors={errors}
                            phoneref={phoneref} />
                        <div className='mt-3 text-end'>
                            <button type='submit' className='addbtn savebtn mb-2' onClick={() => handleFormError(validateForm)}
                                disabled={isSubmitting || isLoading}>
                                {isSubmitting || isLoading ? 'Submitting...' : 'Update Personal Details'}
                            </button>
                        </div>
                    </FormikForm>
                )}
            </Formik>

            {/* Company Details Form */}
            <Formik
                initialValues={{ ...initialdata.formdata.company, termsOfService: initialdata.formdata }}
                validationSchema={companyDetailsValidationSchema}
                onSubmit={(values, actions) => handleSubmit(values, { ...actions, formId: 'secondForm' })}
            >
                {({ values, errors, touched, isSubmitting, setFieldValue, validateForm }) => (
                    <FormikForm id='company'>
                        <CompanyDetails values={values}
                            setFieldValue={setFieldValue}
                            touched={touched}
                            errors={errors}
                            companyref={companyref} />
                        <div className='mt-3 text-end'>
                            <button type='submit' className='btn addbtn savebtn' onClick={() => handleFormError(validateForm)}
                                disabled={isSubmitting || loading}>
                                {isSubmitting || loading ? 'Submitting...' : 'Update Company Details'}
                            </button>
                        </div>
                    </FormikForm>
                )}
            </Formik>
        </Container>
    );
};

export default RecuiterFormEdit;
