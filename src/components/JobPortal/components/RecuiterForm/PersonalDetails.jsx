import React, { useEffect, useState } from 'react'
import { Col, Container, Form, Row } from 'react-bootstrap';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import en from 'react-phone-number-input/locale/en';
import 'react-phone-number-input/style.css';
import { ErrorMessage, Field } from 'formik';
import axios from 'axios';
import profile from '../../../../assets/profile.png';
import API_URL from '../../../../../config';
import { useGetCountryListQuery, } from '../../../../redux/apiSlice';
const PersonalDetails = ({ values, setFieldValue, touched, errors, phoneref }) => {
    const [profilephotoPreview, setprofilephotoPreview] = useState(profile)
    const { data: countryList } = useGetCountryListQuery();
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const handleCountryChange = async (setFieldValue, value) => {
        const countryId = value;
        setFieldValue('personalDetails.currentAddress.country_id', countryId);
        setFieldValue('personalDetails.currentAddress.state_id', '');
        setFieldValue('personalDetails.currentAddress.city_id', '');
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
        setFieldValue('personalDetails.currentAddress.state_id', stateId);
        setFieldValue('personalDetails.currentAddress.city_id', '');

        try {
            const cityRes = await axios.get(`${API_URL}/api/getcitybystate?state_id=${stateId}`);
            setCities(cityRes.data.data);
        } catch (error) {
            console.error('Error fetching cities:', error);
        }
    };
    const handleFileChange = (e, setFieldValue) => {
        const { name, files } = e.target;
        if (files && files.length > 0) {
            const file = files[0];
            setFieldValue(name, file)
            // Display profile photo preview using FileReader
            if (name === 'personalDetails.profilephoto') {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setprofilephotoPreview(reader.result)
                };
                reader.readAsDataURL(file);
            }
        }
    };
    const setInitailCurrentaddrees = async () => {
        if (values) {
            let { country_id, state_id } = values?.personalDetails?.currentAddress
            console.log("country_id", country_id)
            console.log("state_id", state_id)
            if (country_id) {
                const stateRes = await axios.get(`${API_URL}/api/getstatebycountry?country_id=${country_id}`);
                setStates(stateRes.data.data);
            }
            if (state_id) {
                const cityRes = await axios.get(`${API_URL}/api/getcitybystate?state_id=${state_id}`);
                setCities(cityRes.data.data);
            }

        }

    }
    useEffect(() => {
        setInitailCurrentaddrees()
    }, [])
    useEffect(() => {
        if (values?.personalDetails?.profilephoto) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setprofilephotoPreview(reader.result)
            };
            reader.readAsDataURL(values?.personalDetails?.profilephoto);
        }
    }, [values?.personalDetails?.profilephoto])
    console.log("profilephotoPreview", profilephotoPreview)
    return (
        <div className='profilegallery mb-5'>
            <h3 className='text-center'>Personal Details</h3>
            <div className='descr-content'>
                <Row>
                    <Col lg={4}>
                        <div className='profileimgc'>
                            <img src={profilephotoPreview} alt="Profile" />
                            <div id='uploadprofilephoto' className='profilephoto edit' onClick={() => document.getElementById('uploadInput').click()}>
                                <i className='fa fa-edit'></i>
                            </div>
                            <Form.Label>Profile Photo <span className='labelerrorssss'>*</span></Form.Label>

                            <input
                                id="uploadInput"
                                type="file"
                                name='personalDetails.profilephoto'
                                accept=".jpg, .jpeg, .png"
                                style={{ display: 'none' }}
                                onChange={e => handleFileChange(e, setFieldValue)}
                            />
                            <ErrorMessage name='personalDetails.profilephoto' component='div' className='text-danger' />
                        </div>
                    </Col>
                    <Col lg={8}>
                        <Row>
                            <Col lg={4} className='mb-2'>
                                <label>First Name <span className='labelerrorssss'>*</span></label>
                                <Field type='text'
                                    name='personalDetails.first_name' className='form-control' />
                                <ErrorMessage name='personalDetails.first_name' component='div' className='text-danger' />
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>Middle Name <span className='labelerrorssss'>*</span></label>
                                <Field type='text'
                                    name='personalDetails.middle_name' className='form-control' />
                                <ErrorMessage name='personalDetails.middle_name' component='div' className='text-danger' />
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>Last Name <span className='labelerrorssss'>*</span></label>
                                <Field type='text'
                                    name='personalDetails.last_name' className='form-control' />
                                <ErrorMessage name='personalDetails.last_name' component='div' className='text-danger' />
                            </Col>
                            <Col lg={6} className='mb-2'>
                                <label>Email <span className='labelerrorssss'>*</span></label>
                                <Field type='email' name='email'
                                    className='form-control' />
                                <ErrorMessage name='email' component='div' className='text-danger' />
                            </Col>
                            <Col lg={6} className='mb-2'>
                                <label>Mobile Number <span className='labelerrorssss'>*</span></label>
                                <PhoneInput
                                    className={`form-control ${errors?.personalDetails?.phone && touched?.personalDetails?.phone ? 'is-invalid' : ''}`}
                                    defaultCountry='IN'
                                    international
                                    countryCallingCodeEditable={false}
                                    localization={en}
                                    ref={phoneref}
                                    placeholder='Enter your Mobile Number'
                                    value={values?.personalDetails?.phone}
                                    onChange={(value) => setFieldValue('personalDetails.phone', value)}

                                />
                                <ErrorMessage name='personalDetails.phone' component='div' className='text-danger' />
                            </Col>

                        </Row>
                        <Row>
                            <Col lg={4} className='mb-2'>
                                <label>Country <span className='labelerrorssss'>*</span></label>
                                <Field as='select'
                                    value={values?.personalDetails?.currentAddress?.country_id}
                                    name='personalDetails?.currentAddress?.country_id' className='form-select' onChange={(e) => handleCountryChange(setFieldValue, e.target.value)}>
                                    <option hidden>Select Country</option>
                                    {countryList && countryList?.data?.map((country) => (
                                        <option key={country._id} value={country._id}>{country.country_name}</option>
                                    ))}
                                </Field>
                                <ErrorMessage name='personalDetails.currentAddress.country_id' component='div' className='text-danger' />
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>State <span className='labelerrorssss'>*</span></label>
                                <Field as='select'
                                    value={values?.personalDetails?.currentAddress?.state_id}
                                    name='personalDetails?.currentAddress?.state_id' className='form-select' onChange={(e) => handleStateChange(setFieldValue, e.target.value)}>
                                    <option hidden>Select State</option>
                                    {states?.map((state) => (
                                        <option key={state._id} value={state._id}>{state.state_name}</option>
                                    ))}
                                </Field>
                                <ErrorMessage name='personalDetails.currentAddress.state_id' component='div' className='text-danger' />
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>City <span className='labelerrorssss'>*</span></label>
                                <Field as='select'
                                    value={values?.personalDetails?.currentAddress?.city_id}
                                    name='personalDetails.currentAddress.city_id' className='form-select'>
                                    <option hidden>Select City</option>
                                    {cities?.map((city) => (
                                        <option key={city._id} value={city._id}>{city.city_name}</option>
                                    ))}
                                </Field>
                                <ErrorMessage name='personalDetails.currentAddress.city_id' component='div' className='text-danger' />
                            </Col>

                        </Row>
                    </Col>
                </Row>
            </div>

        </div>

    )
}

export default PersonalDetails
