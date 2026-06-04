import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSingleCompany } from '../../../redux/companySlice';
import { useCreateCompanyMutation } from '../../../redux/apiSlice';
import { Button, Container, Row, Col, Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import swal from 'sweetalert';

const CompanyCreate = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [createCompany] = useCreateCompanyMutation();

    // Formik setup
    const formik = useFormik({
        initialValues: {
            companyName: '',
        },
        validationSchema: Yup.object({
            companyName: Yup.string()
                .required('Company Name is required')
                .min(2, 'Company Name must be at least 2 characters')
                .max(100, 'Company Name cannot exceed 100 characters'),
        }),
        onSubmit: async (values, { setSubmitting }) => {
            try {
                const res = await createCompany({ companyName: values.companyName }).unwrap();

                if (res?.success) {
                    dispatch(setSingleCompany(res.company));
                    swal('Success', res.message, 'success');
                    const companyId = res?.company?._id;
                    navigate(`/admin/companies/${companyId}`);
                }
            } catch (error) {
                swal('Error', error?.data?.message || 'An error occurred', 'error');
            } finally {
                setSubmitting(false);
            }
        },
    });

    return (
        <div>
            <div className='max-w-4xl mx-auto mt-5 mb-5'>
                <Container>
                    <div className='text-center my-10'>
                        <h1 className='font-bold text-2xl'>Your Company Name</h1>
                        <p className='text-gray-500'>
                            What would you like to give your company name? You can change this later.
                        </p>
                    </div>
                    <Row className='justify-content-center'>
                        <Col lg={6} md={6}>
                            <Form onSubmit={formik.handleSubmit}>
                                <Form.Group className='mb-3'>
                                    <Form.Label>
                                        Company Name <span className='labelerrorssss'>*</span>
                                    </Form.Label>
                                    <input
                                        type='text'
                                        className={`my-2 form-control ${formik.touched.companyName && formik.errors.companyName ? 'is-invalid' : ''
                                            }`}
                                        placeholder='JobHunt, Microsoft, etc.'
                                        {...formik.getFieldProps('companyName')}
                                    />
                                    {formik.touched.companyName && formik.errors.companyName ? (
                                        <div className='invalid-feedback'>{formik.errors.companyName}</div>
                                    ) : null}
                                </Form.Group>
                                <div className='d-flex align-items-center justify-content-end gap-2 my-10'>
                                    <Button
                                        className='border-1 bg-light text-dark cancel-button'
                                        onClick={() => navigate('/admin/companies')}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        type='submit'
                                        className='search-partner add-company mt-0 mb-0'
                                        disabled={formik.isSubmitting}
                                    >
                                        Continue
                                    </Button>
                                </div>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
};

export default CompanyCreate;
