import React, { useEffect, useState } from 'react'
import { Col, Container, Form, Row } from 'react-bootstrap';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import en from 'react-phone-number-input/locale/en';
import 'react-phone-number-input/style.css';
import { ErrorMessage, Field } from 'formik';
import axios from 'axios';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import API_URL from '../../../../../config';
import profile from '../../../../assets/profile.png';
import { useGetCountryListQuery, useGetIndustryFiltersQuery, useGetSubIndustryFiltersQuery } from '../../../../redux/apiSlice';
import { Link, useNavigate } from 'react-router-dom';
import { levelOptions, yearsArray } from '../../../../utils';
import { useGetFiltersData } from '../../../../hooks';

const CompanyDetails = ({ values, setFieldValue, touched, errors, companyref }) => {
    const [companylogoPreview, setcompanylogoPreview] = useState(profile)
    const { data: countryList } = useGetCountryListQuery();
    const search = useGetFiltersData()
    const { data: subindustryFilters, isLoading: isLoadingsubindustryFilters } = useGetSubIndustryFiltersQuery({ parent: values?.company?.industry?.map((item) => item._id).join(",") || "" });

    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const handleCountryChange = async (setFieldValue, value) => {
        const countryId = value;
        setFieldValue('company.country_id', countryId);
        setFieldValue('company.state_id', '');
        setFieldValue('company.city_id', '');

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
        setFieldValue('company.state_id', stateId);
        setFieldValue('company.city_id', '');

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
            if (name === 'company.companylogo') {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setcompanylogoPreview(reader.result)
                };
                reader.readAsDataURL(file);
            }
        }
    };
    const setInitailCurrentaddrees = async () => {
        if (values) {
            let { country_id, state_id, city_id } = values?.company
            console.log("coutryid", country_id)
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
        if (values?.company?.companylogo) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setcompanylogoPreview(reader.result)
            };
            reader.readAsDataURL(values?.company?.companylogo);
        }
    }, [values?.company?.companylogo])

    return (
        <div className='profilegallery mb-5'>
            <h3 >Professional Details</h3>
            <div className='descr-content'>
                <Row>
                    <Col lg={12}>
                        <Row>
                            <Col lg={4} className='mb-2'>
                                <label>Current Company Name <span className='labelerrorssss'>*</span></label>
                                <Field type='text'
                                    name='company.name' className='form-control' />
                                <ErrorMessage name='company.name' component='div' className='text-danger' />
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>Current Designation <span className='labelerrorssss'>*</span></label>
                                <Field type='text'
                                    name='company.currentDesignation' className='form-control' />
                                <ErrorMessage name='company.currentDesignation' component='div' className='text-danger' />
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>Website <span className='labelerrorssss'>*</span></label>
                                <Field type='text'
                                    name='company.website' className='form-control' />
                                <ErrorMessage name='company.website' component='div' className='text-danger' />
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <div className='profileimgc'>
                                    <img src={companylogoPreview} alt="Profile" />

                                    <div
                                        ref={companyref}
                                        className='profilephoto edit' onClick={() => document.getElementById('company.companylogo').click()}>
                                        <i className='fa fa-edit'></i>
                                    </div>
                                    <Form.Label>Company Logo <span className='labelerrorssss'>*</span></Form.Label>
                                    <input
                                        id="company.companylogo"
                                        type="file"
                                        name='company.companylogo'

                                        accept=".jpg, .jpeg, .png"
                                        style={{ display: 'none' }}
                                        onChange={e => handleFileChange(e, setFieldValue)}
                                    />

                                </div>
                                <ErrorMessage name='company.companylogo' component='div' className='text-danger' />
                            </Col>
                            <Col lg={2} className='mb-2'>
                                <label>Established Year <span className='labelerrorssss'>*</span></label>
                                <Field
                                    as="select"
                                    name='company.from'
                                    placeholder="Select"
                                    type="number"

                                    className="form-control"
                                >
                                    <option hidden>Select</option>
                                    {yearsArray?.map((year, i) => (
                                        <option key={year} value={year}
                                        >
                                            {year}
                                        </option>
                                    ))}
                                </Field>
                                <ErrorMessage name='company.from' component='div' className='text-danger' />

                            </Col>
                        </Row>
                        <Row className='mt-3'>
                            <h3 className='mb-4'> Company Address</h3>
                            <Col lg={6} className='mb-2'>
                                <label>Address 1 <span className='labelerrorssss'>*</span></label>
                                <Field type='text'
                                    as="textarea" name='company.address1' className='form-control' />
                                <ErrorMessage name='company.address1' component='div' className='text-danger' />
                            </Col>
                            <Col lg={6} className='mb-2'>
                                <label>Address 2</label>
                                <Field type='text'
                                    as="textarea" name='company.address2' className='form-control' />
                                <ErrorMessage name='company.address2' component='div' className='text-danger' />
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>Country <span className='labelerrorssss'>*</span></label>
                                <Field as='select' name='company.country_id' className='form-select' onChange={(e) => handleCountryChange(setFieldValue, e.target.value)}>
                                    <option hidden>Select Country</option>
                                    {countryList && countryList?.data?.map((country) => (
                                        <option key={country._id} value={country._id}>{country.country_name}</option>
                                    ))}
                                </Field>

                                <ErrorMessage name='company.country_id' component='div' className='text-danger' />
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>State <span className='labelerrorssss'>*</span></label>
                                <Field as='select' name='company.state_id'
                                    className='form-select' onChange={(e) => handleStateChange(setFieldValue, e.target.value)}>
                                    <option hidden>Select State</option>
                                    {states?.map((state) => (
                                        <option key={state._id} value={state._id}>{state.state_name}</option>
                                    ))}
                                </Field>
                                <ErrorMessage name='company.state_id' component='div' className='text-danger' />
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>City <span className='labelerrorssss'>*</span></label>
                                <Field as='select'
                                    name='company.city_id' className='form-select'>
                                    <option hidden>Select City</option>
                                    {cities?.map((city) => (
                                        <option key={city._id} value={city._id}>{city.city_name}</option>
                                    ))}
                                </Field>
                                <ErrorMessage name='company.city_id' component='div' className='text-danger' />
                            </Col>

                        </Row>
                        <Row className='mt-5'>
                            <h3 className='mb-4'> Hiring Preferences</h3>
                            <Col lg={4} className='mb-2'>
                                <label>Level I hire for <span className='labelerrorssss'>*</span></label>
                                <Select
                                    id="company.levelIHireFor"
                                    isMulti
                                    options={levelOptions}
                                    value={values?.company?.levelIHireFor}
                                    onChange={(selectedOptions) => {
                                        setFieldValue(
                                            'company.levelIHireFor',
                                            selectedOptions
                                        );
                                    }}
                                />

                                <ErrorMessage name='company.levelIHireFor' component='div' className='text-danger' />
                            </Col>
                            {/* select industry  */}
                            <Col lg={4} className='mb-2'>
                                <label>Industry (Max 4)  <span className='labelerrorssss'>*</span></label>
                                {search.industryData.length > 0 && (
                                    <Select
                                        id="company.industry"
                                        isMulti
                                        options={search.industryData}
                                        value={values?.company?.industry}
                                        onChange={(selectedOptions) => {
                                            if (selectedOptions.length > 4) {
                                                return
                                            }

                                            const previousOptions = values?.company?.industry || [];
                                            const removedOptions = previousOptions.filter(
                                                (prevOption) => !selectedOptions.some((selected) => selected.value === prevOption.value)
                                            );

                                            // Handle removed options
                                            if (removedOptions.length > 0) {
                                                console.log("Removed Options:", removedOptions);
                                                let id = removedOptions[0]["value"]
                                                let existingsubindustry = values?.company?.subindustry?.filter((item) => {
                                                    return item.parent === id ? false : true
                                                })
                                                setFieldValue('company.subindustry', existingsubindustry)
                                                // You can perform actions based on the removed options here
                                            }

                                            setFieldValue(
                                                'company.industry',
                                                selectedOptions
                                            );
                                        }}
                                    />
                                )}


                                <ErrorMessage name='company.industry' component='div' className='text-danger' />
                            </Col>
                            {/*end  select indutry */}
                            {/* select sub industry   */}
                            {
                                subindustryFilters?.data?.length > 0 && <Col lg={4} className='mb-2'>
                                    <label>Sub-Industry (Max 4)  <span className='labelerrorssss'>*</span></label>
                                    {subindustryFilters?.data?.length > 0 && (
                                        <Select
                                            id="company.subindustry"
                                            isMulti
                                            options={subindustryFilters.data}
                                            value={values?.company?.subindustry}
                                            onChange={(selectedOptions) => {
                                                if (selectedOptions.length > 4) {
                                                    return
                                                }
                                                setFieldValue(
                                                    'company.subindustry',
                                                    selectedOptions
                                                );
                                            }}
                                        />
                                    )}
                                </Col>
                            }

                            {/*end  select sub indutry */}
                            <Col lg={12} className='mb-2'>
                                <label>Skills I hire for <span className='labelerrorssss'>*</span></label>
                                <CreatableSelect
                                    isMulti
                                    name='company.skills'

                                    className='basic-multi-select'
                                    classNamePrefix='select'
                                    onChange={(selectedOptions) => setFieldValue('company.skills', selectedOptions)}
                                    value={values?.company?.skills}
                                />
                                <ErrorMessage name='company.skills' component='div' className='text-danger' />
                            </Col>
                            <Col lg={12} className='mb-2 mt-2'>
                                <div className="field checkbox">

                                    <Field
                                        type='checkbox' name='termsOfService' />

                                    <label>
                                        I agree to use the aforesaid details to create my Recruiter Profile
                                        &amp; display it on the ShreeSSO site and also agree to be bound by the{" "}
                                        <Link

                                            to={"/terms-and-condition"}>Terms of Use</Link> &amp; <Link to={"/privacy-policy"}>Privacy of ShreeSSO</Link>
                                        <span className='labelerrorssss'>  *</span>
                                    </label>
                                    <ErrorMessage name='termsOfService' component='div' className='text-danger' />
                                </div>
                            </Col>


                        </Row>
                    </Col>
                </Row>
            </div>

        </div>

    )
}

export default CompanyDetails
