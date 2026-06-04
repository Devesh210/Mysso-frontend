import { Field, ErrorMessage } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { degrees, employmentStatuses, jobExperience, jobTypes } from '../../../../utils';
import { useGetCareerLevelsQuery, useGetJobCategoriesQuery, useGetFunctionalAreasQuery } from "../../../../redux/apiSlice";
import { useGetFiltersData, useScrollablePagination } from '../../../../hooks';

const EmployeementDetails = ({ values, errors, touched, isSubmitting, setFieldValue }) => {
    const search = useGetFiltersData(["industryData", "CareerLevel", "FunctionalAreas"])
    return (
        <div className='profilegallery mb-5'>
            <h3 className='text-center mb-4'>Employment Details</h3>
            <div className='container'>
                <Row className='pb-4'>
                    <Col lg={4} className="pb-4">
                        <Form.Label>Employment Status<span className='labelerrorssss'>*</span></Form.Label>
                        <Field as={Form.Select} name="employmentdetails.employmentStatus">
                            <option value="">Select Employment Status</option>
                            {employmentStatuses?.map((status) => (
                                <option key={status} value={status}>{status}</option>
                            ))}
                        </Field>
                        <ErrorMessage name="employmentdetails.employmentStatus" component="div" className="text-danger" />
                    </Col>
                    <Col lg={4} className="pb-4">
                        <Form.Label>Experience<span className='labelerrorssss'>*</span></Form.Label>
                        <Field as={Form.Select} name="employmentdetails.experience">
                            <option value="">Select Experiences</option>
                            {jobExperience?.map((experience) => (
                                <option key={experience.value} value={experience.value}>{experience.label}</option>
                            ))}
                        </Field>
                        <ErrorMessage name="employmentdetails.experience" component="div" className="text-danger" />
                    </Col>
                    <Col lg={4} className="pb-4">
                        <Form.Label>Looking For Job As</Form.Label>
                        <Field as={Form.Select} name="employmentdetails.jobtype">
                            <option value="">Select Job Type<span className='labelerrorssss'>*</span></option>
                            {jobTypes?.map((type) => (
                                <option key={type} value={type}>{type}</option>
                            ))}
                        </Field>
                        <ErrorMessage name="employmentdetails.jobtype" component="div" className="text-danger" />
                    </Col>
                    <Col lg={4} className="pb-4">
                        <Form.Label>Career Level<span className='labelerrorssss'>*</span></Form.Label>
                        <div

                            style={{ maxHeight: '200px', overflowY: 'auto' }}

                        >
                            <Field as={Form.Select} disabled={!search.CareerLevel.length} name="employmentdetails.careerlevel" size="sm">
                                <option value="">Select Career Level</option>
                                {search.CareerLevel?.map((level) => (
                                    <option key={level._id} value={level._id}>
                                        {level.label}
                                    </option>
                                ))}
                            </Field>
                        </div>
                        <ErrorMessage name="employmentdetails.careerlevel" component="div" className="text-danger" />

                    </Col>
                    <Col lg={4} className="pb-4">
                        <Form.Label>Job Title/Functional Area/Designation<span className='labelerrorssss'>*</span></Form.Label>
                        <div
                            style={{ maxHeight: '200px', overflowY: 'auto' }}

                        >
                            <Field as={Form.Select} disabled={!search.FunctionalAreas.length} name="employmentdetails.functionalarea" size="sm">
                                <option value="">Select Functional Area</option>
                                {search.FunctionalAreas?.map((area) => (
                                    <option key={area.value} value={area._id}>
                                        {area.label}
                                    </option>
                                ))}
                            </Field>
                        </div>
                        <ErrorMessage name="employmentdetails.functionalarea" component="div" className="text-danger" />
                    </Col>
                    <Col lg={4} className="pb-4">
                        <Form.Label>Industry<span className='labelerrorssss'>*</span></Form.Label>
                        <div
                            style={{ maxHeight: '200px', overflowY: 'auto' }}

                        >
                            <Field as={Form.Select} disabled={!search.industryData.length} name="employmentdetails.industry" size="sm">
                                <option value="">Select Industry</option>
                                {search.industryData?.map((area) => (
                                    <option key={area._id} value={area._id}>
                                        {area.label}
                                    </option>
                                ))}
                            </Field>

                        </div>
                        <ErrorMessage name="employmentdetails.industry" component="div" className="text-danger" />
                    </Col>
                    <Col lg={4} className="pb-4">
                        <Form.Group className="mb-3">
                            <Form.Label>Specialization<span className='labelerrorssss'>*</span></Form.Label>
                            <Field name="employmentdetails.Specialization" as={Form.Control} placeholder="Specialization" />
                            <ErrorMessage name="employmentdetails.Specialization" component="div" className="text-danger" />
                        </Form.Group>

                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default EmployeementDetails;
