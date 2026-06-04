import React, { useState, useEffect, useRef } from 'react'
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

    const { data: countryList } = useGetCountryListQuery();
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const handleCountryChange = async (setFieldValue, value) => {
        const countryId = value;
        setFieldValue('currentAddress.country_id', countryId);
        setFieldValue('currentAddress.state_id', '');
        setFieldValue('currentAddress.city_id', '');
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
        setFieldValue('currentAddress.state_id', stateId);
        setFieldValue('currentAddress.city_id', '');

        try {
            const cityRes = await axios.get(`${API_URL}/api/getcitybystate?state_id=${stateId}`);
            setCities(cityRes.data.data);
        } catch (error) {
            console.error('Error fetching cities:', error);
        }
    };

    const setInitailCurrentaddrees = async () => {
        if (values.currentAddress) {
            let { country_id, state_id, city_id } = values.currentAddress
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
    return (
        <div className='profilegallery mb-5'>
            <h3 className='text-center mb-4'>Personal Details</h3>
            <div className='container'>

                <Row className='pb-4'>
                    <Col lg={4} className='mb-2'>
                        <label>First Name <span className='labelerrorssss'>*</span></label>
                        <Field type='text'
                            name='first_name' className='form-control' />
                        <ErrorMessage name='first_name' component='div' className='text-danger' />
                    </Col>
                    <Col lg={4} className='mb-2'>
                        <label>Middle  Name <span className='labelerrorssss'>*</span></label>
                        <Field type='text'
                            name='middle_name' className='form-control' />
                        <ErrorMessage name='middle_name' component='div' className='text-danger' />
                    </Col>
                    <Col lg={4} className='mb-2'>
                        <label>Last Name <span className='labelerrorssss'>*</span></label>
                        <Field type='text'
                            name='last_name' className='form-control' />
                        <ErrorMessage name='last_name' component='div' className='text-danger' />
                    </Col>
                    <Col lg={4} className='mb-2'>
                        <label>Email <span className='labelerrorssss'>*</span></label>
                        <Field type='email' name='email'
                             disabled={true}
                            className='form-control' />
                        <ErrorMessage name='email' component='div' className='text-danger' />
                    </Col>
                    <Col lg={4} className='mb-2'>
                        <label>Mobile Number <span className='labelerrorssss'>*</span></label>
                        <PhoneInput
                            className={`form-control ${errors?.phone && touched?.phone ? 'is-invalid' : ''}`}
                            defaultCountry='IN'
                            international
                            ref={phoneref}
                            countryCallingCodeEditable={false}
                            localization={en}
                            placeholder='Enter your Mobile Number'
                            value={values?.phone}
                            onChange={(value) => setFieldValue('phone', value)}

                        />
                        <ErrorMessage name='phone' component='div' className='text-danger' />
                    </Col>

                </Row>
                <Row className='pb-4'>
                    <Col lg={4} className='mb-2'>
                        <label>Country <span className='labelerrorssss'>*</span></label>
                        <Field as='select' value={values?.currentAddress.country_id}
                            name='country_id' className='form-select' onChange={(e) => handleCountryChange(setFieldValue, e.target.value)}>
                            <option hidden>Select Country</option>
                            {countryList && countryList?.data?.map((country) => (
                                <option key={country._id} value={country._id}>{country.country_name}</option>
                            ))}
                        </Field>
                        <ErrorMessage name='currentAddress.country_id' component='div' className='text-danger' />
                    </Col>
                    <Col lg={4} className='mb-2'>
                        <label>State <span className='labelerrorssss'>*</span></label>
                        <Field as='select' value={values?.currentAddress.state_id}
                            name='state_id' className='form-select' onChange={(e) => handleStateChange(setFieldValue, e.target.value)}>
                            <option hidden>Select State</option>
                            {states?.map((state) => (
                                <option key={state._id} value={state._id}>{state.state_name}</option>
                            ))}
                        </Field>
                        <ErrorMessage name='currentAddress.state_id' component='div' className='text-danger' />
                    </Col>
                    <Col lg={4} className='mb-2'>
                        <label>City <span className='labelerrorssss'>*</span></label>
                        <Field as='select' value={values?.currentAddress.city_id}
                            name='currentAddress.city_id' className='form-select'>
                            <option hidden>Select City</option>
                            {cities?.map((city) => (
                                <option key={city._id} value={city._id}>{city.city_name}</option>
                            ))}
                        </Field>
                        <ErrorMessage name='currentAddress.city_id' component='div' className='text-danger' />
                    </Col>

                </Row>


            </div>

        </div>

    )
}

export default PersonalDetails
