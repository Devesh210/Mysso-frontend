import React, { useState, useEffect } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';

import Select from 'react-select';
import 'react-phone-number-input/style.css';
import { ErrorMessage, Field } from 'formik';
import axios from 'axios';
import profile from '../../../../assets/profile.png';
import API_URL from '../../../../../config';
import { useGetCountryListQuery } from '../../../../redux/apiSlice';
import { languageOptions } from '../../../../utils';


const PersonalDetails = ({ values, errors, touched, isSubmitting, setFieldValue }) => {
    const [profilephotoPreview, setprofilephotoPreview] = useState(profile);
    const { data: countryList } = useGetCountryListQuery();
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [pstates, setpStates] = useState([]);
    const [pcities, setpCities] = useState([]);
    const [sameAsCurrentAddress, setSameAsCurrentAddress] = useState(false); // New state to track checkbox

    useEffect(() => {
        if (sameAsCurrentAddress) {
            // Copy current address to permanent address
            setFieldValue("personalDetails.permanentAddress", values.personalDetails.currentAddress);
            setpStates(states)
            setpCities(cities)
        }
    }, [sameAsCurrentAddress, values?.personalDetails?.currentAddress, setFieldValue]);

    const handleCountryChange = async (setFieldValue, value, addressType) => {
        const countryId = value;
        setFieldValue(`personalDetails.${addressType}Address.country_id`, countryId);
        setFieldValue(`personalDetails.${addressType}Address.state_id`, '');
        setFieldValue(`personalDetails.${addressType}Address.city_id`, '');

        try {
            const stateRes = await axios.get(`${API_URL}/api/getstatebycountry?country_id=${countryId}`);
            setStates(stateRes.data.data);
            setCities([]);
        } catch (error) {
            console.error('Error fetching states:', error);
        }
    };

    const handleStateChange = async (setFieldValue, value, addressType) => {
        const stateId = value;
        setFieldValue(`personalDetails.${addressType}Address.state_id`, stateId);
        setFieldValue(`personalDetails.${addressType}Address.city_id`, '');

        try {
            const cityRes = await axios.get(`${API_URL}/api/getcitybystate?state_id=${stateId}`);
            setCities(cityRes.data.data);
        } catch (error) {
            console.error('Error fetching cities:', error);
        }
    };
    const handlePermanentCountryChange = async (setFieldValue, value, addressType) => {
        const countryId = value;
        setFieldValue(`personalDetails.${addressType}Address.country_id`, countryId);
        setFieldValue(`personalDetails.${addressType}Address.state_id`, '');
        setFieldValue(`personalDetails.${addressType}Address.city_id`, '');

        try {
            const stateRes = await axios.get(`${API_URL}/api/getstatebycountry?country_id=${countryId}`);
            setpStates(stateRes.data.data);
            setpCities([]);
        } catch (error) {
            console.error('Error fetching states:', error);
        }
    };

    const handlepermanentStateChange = async (setFieldValue, value, addressType) => {
        const stateId = value;
        setFieldValue(`personalDetails.${addressType}Address.state_id`, stateId);
        setFieldValue(`personalDetails.${addressType}Address.city_id`, '');

        try {
            const cityRes = await axios.get(`${API_URL}/api/getcitybystate?state_id=${stateId}`);
            setpCities(cityRes.data.data);
        } catch (error) {
            console.error('Error fetching cities:', error);
        }
    };
    const setInitailCurrentaddrees = async () => {
        if (values.personalDetails.currentAddress) {
            let { country_id, state_id, city_id } = values.personalDetails.currentAddress
            if (country_id) {
                setFieldValue(`personalDetails.currentAddress.country_id`, country_id);
                const stateRes = await axios.get(`${API_URL}/api/getstatebycountry?country_id=${country_id}`);
                setStates(stateRes.data.data);
            }
            if (state_id) {
                setFieldValue(`personalDetails.currentAddress.state_id`, state_id);
                const cityRes = await axios.get(`${API_URL}/api/getcitybystate?state_id=${state_id}`);
                setCities(cityRes.data.data);
            }

        }
        if (values.personalDetails.permanentAddress) {
            let { country_id, state_id, city_id } = values.personalDetails.permanentAddress
            if (country_id) {
                setFieldValue(`personalDetails.permanentAddress.country_id`, country_id);
                const stateRes = await axios.get(`${API_URL}/api/getstatebycountry?country_id=${country_id}`);
                setpStates(stateRes.data.data);
            }
            if (state_id) {
                setFieldValue(`personalDetails.permanentAddress.state_id`, state_id);
                const cityRes = await axios.get(`${API_URL}/api/getcitybystate?state_id=${state_id}`);
                setpCities(cityRes.data.data);
            }

        }
    }
    useEffect(() => {
        setInitailCurrentaddrees()
    }, [])
    const handleFileChange = (e, setFieldValue) => {
        const { name, files } = e.target;
        if (files && files.length > 0) {
            const file = files[0];
            setFieldValue("personalDetails.profilephoto", file)
            if (name === 'profilephoto') {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setprofilephotoPreview(reader.result)
                };
                reader.readAsDataURL(file);
            }
        }
    };

    return (
        <div className='profilegallery mb-5'>
            <h3 className='text-center mb-4'>Personal Details</h3>
            <div className='container'>
                <Row className="pb-4">
                    <Col lg={4}>
                        <Form.Group className="mb-3">
                            <Form.Label>First Name<span className='labelerrorssss'>*</span></Form.Label>
                            <Field name="personalDetails.first_name" as={Form.Control} placeholder="First Name" />
                            <ErrorMessage name="personalDetails.first_name" component="div" className="text-danger" />
                        </Form.Group>
                    </Col>
                    <Col lg={4}>
                        <Form.Group className="mb-3">
                            <Form.Label>Middle Name</Form.Label>
                            <Field name="personalDetails.middle_name" as={Form.Control} placeholder="Middle Name" />
                            <ErrorMessage name="personalDetails.middle_name" component="div" className="text-danger" />
                        </Form.Group>
                    </Col>
                    <Col lg={4}>
                        <Form.Group className="mb-3">
                            <Form.Label>Last Name</Form.Label>
                            <Field name="personalDetails.last_name" as={Form.Control} placeholder="Last Name" />
                            <ErrorMessage name="personalDetails.last_name" component="div" className="text-danger" />
                        </Form.Group>

                    </Col>
                    <Col lg={4}>

                        <Form.Group className="mb-3">
                            <Form.Label>Date of Birth</Form.Label>
                            <Field name="personalDetails.dateOfBirth" as={Form.Control} type="date" />
                            <ErrorMessage name="personalDetails.dateOfBirth" component="div" className="text-danger" />
                        </Form.Group>
                    </Col>
                    <Col lg={4}>
                        <Form.Group className="mb-3">
                            <Form.Label>Place of Birth</Form.Label>
                            <Field name="personalDetails.placeOfBirth" as={Form.Control} placeholder="Place of Birth" />
                            <ErrorMessage name="personalDetails.placeOfBirth" component="div" className="text-danger" />
                        </Form.Group>
                    </Col>
                    <Col lg={4}>
                        <Form.Group className="mb-3">
                            <Form.Label>Age (as of 2024)</Form.Label>
                            <Field type="number" name="personalDetails.age" as={Form.Control} placeholder="Age (as of 2024)" />
                            <ErrorMessage name="personalDetails.age" component="div" className="text-danger" />
                        </Form.Group>
                    </Col>
                    <Col lg={4}>
                        <Form.Group className="mb-3">
                            <Form.Label>Current Location</Form.Label>
                            <Field name="personalDetails.currentLocation" as={Form.Control} placeholder="Current Location" />
                            <ErrorMessage name="personalDetails.currentLocation" component="div" className="text-danger" />
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group>
                            <Form.Label>Languages Known</Form.Label>
                            <Field name="personalDetails.languagesKnown">
                                {({ field, form }) => (
                                    <Select
                                        {...field}
                                        isMulti
                                        options={languageOptions}
                                        className="basic-multi-select"
                                        classNamePrefix="select"
                                        onChange={(selectedOptions) => {
                                            form.setFieldValue(
                                                "personalDetails.languagesKnown",
                                                selectedOptions.map(option => option.value)
                                            );
                                        }}
                                        value={languageOptions.filter(option =>
                                            values.personalDetails?.languagesKnown?.includes(option.value)
                                        )}
                                    />
                                )}
                            </Field>
                            <ErrorMessage name="personalDetails.languagesKnown" component="div" className="text-danger" />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <h2 className="address-head mb-4"> Current Address</h2>
                    <Col lg={4}>
                        <Form.Group className="mb-3">
                            <Form.Label>Street</Form.Label>
                            <Field name="personalDetails.currentAddress.street" as={Form.Control} placeholder="Street" />
                            <ErrorMessage name="personalDetails.currentAddress.street" component="div" className="text-danger" />
                        </Form.Group>
                    </Col>
                    <Col lg={4}>
                        <Form.Group className="mb-3">
                            <Form.Label>Country</Form.Label>
                            <Field as={Form.Select} name="personalDetails.currentAddress.country_id" onChange={(e) => handleCountryChange(setFieldValue, e.target.value, 'current')}>
                                <option value="">Select Country</option>
                                {countryList && countryList?.data?.map((country) => (
                                    <option key={country._id} value={country._id}>{country.country_name}</option>
                                ))}
                            </Field>
                            <ErrorMessage name="personalDetails.currentAddress.country_id" component="div" className="text-danger" />
                        </Form.Group>
                    </Col>
                    <Col lg={4}>
                        <Form.Group className="mb-3">
                            <Form.Label>State</Form.Label>
                            <Field as={Form.Select} name="personalDetails.currentAddress.state_id" onChange={(e) => handleStateChange(setFieldValue, e.target.value, 'current')}>
                                <option value="">Select State</option>
                                {states.map((state) => (
                                    <option key={state._id} value={state._id}>{state.state_name}</option>
                                ))}
                            </Field>
                            <ErrorMessage name="personalDetails.currentAddress.state_id" component="div" className="text-danger" />
                        </Form.Group>
                    </Col>
                    <Col lg={4}>
                        <Form.Group className="mb-3">
                            <Form.Label>City</Form.Label>
                            <Field as={Form.Select} name="personalDetails.currentAddress.city_id">
                                <option value="">Select City</option>
                                {cities.map((city) => (
                                    <option key={city._id} value={city._id}>{city.city_name}</option>
                                ))}
                            </Field>
                            <ErrorMessage name="personalDetails.currentAddress.city_id" component="div" className="text-danger" />
                        </Form.Group>


                    </Col>
                    <Col lg={4}>
                        <Form.Group className="mb-3">
                            <Form.Label>Pin Code</Form.Label>
                            <Field name="personalDetails.currentAddress.zipCode" as={Form.Control} placeholder="Pin Code" />
                            <ErrorMessage name="personalDetails.currentAddress.zipCode" component="div" className="text-danger" />
                        </Form.Group>
                    </Col>
                </Row>
                {/* Checkbox to toggle permanent address same as current address */}
                <Form.Check
                    type="checkbox"
                    label="Same as Current Address"
                    checked={sameAsCurrentAddress}
                    onChange={(e) => setSameAsCurrentAddress(e.target.checked)}
                    className="mb-3"
                />

                {!sameAsCurrentAddress && (
                    <Row className='pb-4'>
                        <h2 className="address-head mb-4">Permanent Address</h2>
                        <Col lg={4}>
                            <Form.Group className="mb-3">
                                <Form.Label>Street</Form.Label>
                                <Field name="personalDetails.permanentAddress.street" as={Form.Control} placeholder="Street" />
                                <ErrorMessage name="personalDetails.permanentAddress.street" component="div" className="text-danger" />
                            </Form.Group>
                        </Col>
                        <Col lg={4}>
                            <Form.Group className="mb-3">
                                <Form.Label>Country</Form.Label>
                                <Field as={Form.Select} name="personalDetails.permanentAddress.country_id" onChange={(e) => handlePermanentCountryChange(setFieldValue, e.target.value, 'permanent')}>
                                    <option value="">Select Country</option>
                                    {countryList && countryList?.data?.map((country) => (
                                        <option key={country._id} value={country._id}>{country.country_name}</option>
                                    ))}
                                </Field>
                                <ErrorMessage name="personalDetails.permanentAddress.country_id" component="div" className="text-danger" />
                            </Form.Group>
                        </Col>
                        <Col lg={4}>
                            <Form.Group className="mb-3">
                                <Form.Label>State</Form.Label>
                                <Field as={Form.Select} name="personalDetails.permanentAddress.state_id" onChange={(e) => handlepermanentStateChange(setFieldValue, e.target.value, 'permanent')}>
                                    <option value="">Select State</option>
                                    {pstates.map((state) => (
                                        <option key={state._id} value={state._id}>{state.state_name}</option>
                                    ))}
                                </Field>
                                <ErrorMessage name="personalDetails.permanentAddress.state_id" component="div" className="text-danger" />
                            </Form.Group>
                        </Col>
                        <Col lg={4}>
                            <Form.Group className="mb-3">
                                <Form.Label>City</Form.Label>
                                <Field as={Form.Select} name="personalDetails.permanentAddress.city_id">
                                    <option value="">Select City</option>
                                    {pcities.map((city) => (
                                        <option key={city._id} value={city._id}>{city.city_name}</option>
                                    ))}
                                </Field>
                                <ErrorMessage name="personalDetails.permanentAddress.city_id" component="div" className="text-danger" />
                            </Form.Group>
                        </Col>
                        <Col lg={4}>
                            <Form.Group className="mb-3">
                                <Form.Label>Pin Code</Form.Label>
                                <Field name="personalDetails.permanentAddress.zipCode" as={Form.Control} placeholder="Pin Code" />
                                <ErrorMessage name="personalDetails.permanentAddress.zipCode" component="div" className="text-danger" />
                            </Form.Group>
                        </Col>

                    </Row>
                )}
                {/* <Row className='pb-4'>
                    <Col md={4}>
                        <Form.Group>
                            <Form.Label>Languages Known</Form.Label>
                            <Field name="personalDetails.languagesKnown">
                                {({ field, form }) => (
                                    <Select
                                        {...field}
                                        isMulti
                                        options={languageOptions}
                                        className="basic-multi-select"
                                        classNamePrefix="select"
                                        onChange={(selectedOptions) => {
                                            form.setFieldValue(
                                                "personalDetails.languagesKnown",
                                                selectedOptions.map(option => option.value)
                                            );
                                        }}
                                        value={languageOptions.filter(option =>
                                            values.personalDetails?.languagesKnown?.includes(option.value)
                                        )}
                                    />
                                )}
                            </Field>
                            <ErrorMessage name="personalDetails.languagesKnown" component="div" className="text-danger" />
                        </Form.Group>
                    </Col>
                </Row> */}

            </div >
        </div >
    );
};

export default PersonalDetails;