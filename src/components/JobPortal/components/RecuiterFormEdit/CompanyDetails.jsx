import React, { useEffect, useState } from 'react'
import { Col, Container, Form, Row } from 'react-bootstrap';
import 'react-phone-number-input/style.css';
import { ErrorMessage, Field, FieldArray } from 'formik';
import axios from 'axios';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import API_URL from '../../../../../config';
import HtmlEditor from '../../admin/HTMLEditor';
import { useGetCountryListQuery, useGetIndustryFiltersQuery, useGetSubIndustryFiltersQuery } from '../../../../redux/apiSlice';
import { Link } from 'react-router-dom';
import { levelOptions, yearsArray } from '../../../../utils';
import { useGetFiltersData } from '../../../../hooks';
// Example options for the select component

const CompanyDetails = ({ values, setFieldValue, touched, errors }) => {
    const search = useGetFiltersData(["industryData"])
    const { data: countryList } = useGetCountryListQuery();
    const { data: subindustryFilters, isLoading: isLoadingsubindustryFilters } = useGetSubIndustryFiltersQuery({ parent: values?.industry?.map((item) => item._id).join(",") || "" });
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const handleCountryChange = async (setFieldValue, value) => {
        const countryId = value;
        setFieldValue('country_id', countryId);
        setFieldValue('state_id', '');
        setFieldValue('city_id', '');

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
        setFieldValue('state_id', stateId);
        setFieldValue('city_id', '');

        try {
            const cityRes = await axios.get(`${API_URL}/api/getcitybystate?state_id=${stateId}`);
            setCities(cityRes.data.data);
        } catch (error) {
            console.error('Error fetching cities:', error);
        }
    };

    const setInitailCurrentaddrees = async () => {
        if (values) {
            let { country_id, state_id, city_id } = values
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
    return (
        <div>
            <div className='profilegallery mb-5'>
                <h3 >Professional Details</h3>
                <div className='descr-content'>
                    <Row>
                        <Col lg={12}>
                            <Row>
                                <Col lg={12} className='mb-2'>
                                    <FieldArray name="achievement">
                                        {({ insert, remove, push }) => (
                                            <div>
                                                {values?.achievement?.length > 0 ?
                                                    <>
                                                        {
                                                            values?.achievement?.map((benefit, index) => (
                                                                <div className="row" key={index}>
                                                                    <div className="col-lg-5">
                                                                        <label>Year of Achievement </label>
                                                                        <Field
                                                                            as="select"
                                                                            name={`achievement[${index}].year`}
                                                                            placeholder="Enter benefit"
                                                                            type="text"
                                                                            className="form-control"
                                                                        >
                                                                            <option hidden>Select Year of Achievement</option>
                                                                            {yearsArray?.map((year) => (
                                                                                <option key={year} value={year}>
                                                                                    {year}
                                                                                </option>
                                                                            ))}
                                                                        </Field>
                                                                        <ErrorMessage
                                                                            name={`achievement[.${index}].year`}
                                                                            component="div"
                                                                            className='text-danger'
                                                                        />
                                                                    </div>
                                                                    <div className="col-lg-5">

                                                                        <label>Description </label>
                                                                        <Field
                                                                            name={`achievement[${index}].description`}
                                                                            placeholder="Description"
                                                                            component="textarea"
                                                                            rows="6"
                                                                            className="form-control"
                                                                        />
                                                                        <ErrorMessage
                                                                            name={`achievement.[${index}].description`}
                                                                            component="div"
                                                                            className='text-danger'
                                                                        />

                                                                    </div>
                                                                    <div className="col align-content-center">
                                                                        <button
                                                                            type="button"
                                                                            className="search-partner add-company"
                                                                            onClick={() => remove(index)}
                                                                        >
                                                                            X
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            ))
                                                        }
                                                        <div className="text-end">
                                                            <button
                                                                type="button"
                                                                className="search-partner add-company mt-3"
                                                                onClick={() => push({ year: '', description: '' })}  // Push a new empty achievement object
                                                            >
                                                                Add More
                                                            </button>
                                                        </div>
                                                    </>
                                                    : <div className="text-start">
                                                        <button
                                                            type="button"
                                                            className="search-partner add-company mt-3"
                                                            onClick={() => push({ year: '', description: '' })}  // Push a new empty achievement object
                                                        >
                                                            Add Achievements
                                                        </button>
                                                    </div>
                                                }


                                            </div>
                                        )}
                                    </FieldArray>
                                </Col>
                                <Col lg={4} className='mb-2'>
                                    <label>Current Company Name <span className='labelerrorssss'>*</span></label>
                                    <Field type='text'
                                        name='name' className='form-control' />
                                    <ErrorMessage name='name' component='div' className='text-danger' />
                                </Col>
                                <Col lg={4} className='mb-2'>
                                    <label>Current Designation <span className='labelerrorssss'>*</span></label>
                                    <Field type='text'
                                        name='currentDesignation' className='form-control' />
                                    <ErrorMessage name='currentDesignation' component='div' className='text-danger' />
                                </Col>
                                <Col lg={4} className='mb-2'>
                                    <label>Website <span className='labelerrorssss'>*</span></label>
                                    <Field type='text'
                                        name='website' className='form-control' />
                                    <ErrorMessage name='website' component='div' className='text-danger' />
                                </Col>

                                <Col lg={2} className='mb-2'>
                                    <label>Established Year <span className='labelerrorssss'>*</span></label>
                                    <Field
                                        as="select"
                                        name='from'
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
                                </Col>

                            </Row>

                        </Col>
                    </Row>

                </div>
            </div>
            <div className='profilegallery mb-5'>
                <h3 className='text-center'>About Us <span className='labelerrorssss'>*</span></h3>
                <div className='descr-content'>
                    <Form.Group className="mb-3">
                        <Field name="aboutus" rows="10" style={{ height: 'auto' }} component="textarea" className="form-control" />
                        <ErrorMessage name="aboutus" component="div" className="text-danger" />
                    </Form.Group>
                </div>
            </div>
            <div className='profilegallery mb-5'>
                <h3> Company Address</h3>
                <div className='descr-content'>
                    <Row>

                        <Col lg={6} className='mb-2'>
                            <label>Address 1 <span className='labelerrorssss'>*</span></label>
                            <Field type='text'
                                as="textarea" name='address1' className='form-control' />
                            <ErrorMessage name='address1' component='div' className='text-danger' />
                        </Col>
                        <Col lg={6} className='mb-2'>
                            <label>Address 2</label>
                            <Field type='text'
                                as="textarea" name='address2' className='form-control' />
                            <ErrorMessage name='address2' component='div' className='text-danger' />
                        </Col>
                        <Col lg={4} className='mb-2'>
                            <label>Country <span className='labelerrorssss'>*</span></label>
                            <Field as='select' name='country_id' className='form-select' onChange={(e) => handleCountryChange(setFieldValue, e.target.value)}>
                                <option hidden>Select Country</option>
                                {countryList && countryList?.data?.map((country) => (
                                    <option key={country._id} value={country._id}>{country.country_name}</option>
                                ))}
                            </Field>
                            <ErrorMessage name='country_id' component='div' className='text-danger' />
                        </Col>
                        <Col lg={4} className='mb-2'>
                            <label>State <span className='labelerrorssss'>*</span></label>
                            <Field as='select' name='state_id'
                                className='form-select' onChange={(e) => handleStateChange(setFieldValue, e.target.value)}>
                                <option hidden>Select State</option>
                                {states?.map((state) => (
                                    <option key={state._id} value={state._id}>{state.state_name}</option>
                                ))}
                            </Field>
                            <ErrorMessage name='state_id' component='div' className='text-danger' />
                        </Col>
                        <Col lg={4} className='mb-2'>
                            <label>City <span className='labelerrorssss'>*</span></label>
                            <Field as='select'
                                name='city_id' className='form-select'>
                                <option hidden>Select City</option>
                                {cities?.map((city) => (
                                    <option key={city._id} value={city._id}>{city.city_name}</option>
                                ))}
                            </Field>
                            <ErrorMessage name='city_id' component='div' className='text-danger' />
                        </Col>

                    </Row>

                </div>

            </div>
            <div className='profilegallery mb-5'>
                <h3> Hiring Preferences</h3>
                <div className='descr-content'>
                    <Row>
                        <Col lg={4} className='mb-2'>
                            <label>Level I hire for <span className='labelerrorssss'>*</span></label>
                            <Select
                                id="levelIHireFor"
                                isMulti

                                options={levelOptions}
                                value={values.levelIHireFor}
                                onChange={(selectedOptions) => {
                                    setFieldValue(
                                        'levelIHireFor',
                                        selectedOptions
                                    );
                                }}
                            />
                            {touched?.levelIHireFor && errors?.levelIHireFor ? (
                                <div className="error">{errors?.levelIHireFor}</div>
                            ) : null}
                        </Col>
                        {/* select industry  */}
                        <Col lg={4} className='mb-2'>
                            <label>Industry (Max 4)  <span className='labelerrorssss'>*</span></label>
                            {search.industryData?.length > 0 && (
                                <Select
                                    id="industry"
                                    isMulti
                                    options={search.industryData}
                                    value={values?.industry}
                                    onChange={(selectedOptions) => {
                                        if (selectedOptions.length > 4) {
                                            return
                                        }
                                        const previousOptions = values?.industry || [];
                                        const removedOptions = previousOptions.filter(
                                            (prevOption) => !selectedOptions.some((selected) => selected.value === prevOption.value)
                                        );

                                        // Handle removed options
                                        if (removedOptions.length > 0) {
                                            console.log("Removed Options:", removedOptions);
                                            let id = removedOptions[0]["value"]
                                            console.log("subindustry Options:", values?.subindustry);
                                            let existingsubindustry = values?.subindustry?.filter((item) => item.parent !== id)
                                            console.log("existingsubindustry", existingsubindustry)
                                            setFieldValue('subindustry', existingsubindustry)
                                            // You can perform actions based on the removed options here
                                        }

                                        setFieldValue(
                                            'industry',
                                            selectedOptions
                                        );
                                    }}
                                />
                            )}

                            {touched?.company?.industry && errors?.company?.industry ? (
                                <div className="error">{errors?.company?.industry}</div>
                            ) : null}
                        </Col>
                        {/*end  select indutry */}
                        {/* select sub industry   */}
                        {
                            subindustryFilters?.data?.length > 0 && <Col lg={4} className='mb-2'>
                                <label>Sub-Industry (Max 4)  <span className='labelerrorssss'>*</span></label>
                                {subindustryFilters?.data?.length > 0 && (
                                    <Select
                                        id="subindustry"
                                        isMulti
                                        options={subindustryFilters.data}
                                        value={values?.subindustry}
                                        onChange={(selectedOptions) => {
                                            if (selectedOptions.length > 4) {
                                                return
                                            }
                                            setFieldValue(
                                                'subindustry',
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
                                name='skills'

                                className='basic-multi-select'
                                classNamePrefix='select'
                                onChange={(selectedOptions) => setFieldValue('skills', selectedOptions)}
                                value={values.skills}
                            />
                            <ErrorMessage name='skills' component='div' className='text-danger' />
                        </Col>
                        <Col lg={12} className='mb-2'>
                            <div className="field checkbox">

                                <Field
                                    type='checkbox' name='termsOfService' />

                                <label>
                                    I agree to use the aforesaid details to create my Recruiter Profile
                                    &amp; display it on the ShreeSSO site and also agree to be bound by the{" "}
                                    <Link to={"/terms-and-condition"}>Terms of Use</Link> &amp; <Link to={"/privacy-policy"}>Privacy of ShreeSSO</Link>
                                </label>
                                <ErrorMessage name='termsOfService' component='div' className='text-danger' />
                            </div>
                        </Col>


                    </Row>

                </div>

            </div>
        </div>
    )
}

export default CompanyDetails
