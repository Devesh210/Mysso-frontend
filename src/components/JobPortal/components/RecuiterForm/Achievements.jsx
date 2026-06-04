import React, { useState } from 'react'
import { Col, Container, Form, Row } from 'react-bootstrap';
import { ErrorMessage, Field, FieldArray } from 'formik';
import { yearsArray } from '../../../../utils';
const Achievements = ({ values, setFieldValue, touched, errors, }) => {
    return (
        <>
            <div className='profilegallery mb-5'>
                <h3 className='text-center'>About Us <span className='labelerrorssss'>*</span></h3>
                <div className='descr-content'>
                    <Form.Group className="mb-3">
                        <Field name="company.aboutus" rows="10" style={{ height: 'auto' }} component="textarea" className="form-control" />
                        <ErrorMessage name="company.aboutus" component="div" className="text-danger" />
                    </Form.Group>
                </div>
            </div>
            <div className='profilegallery mb-5'>
                <h3 className='text-center'>Achievements</h3>
                <div className='descr-content'>
                    <Row>

                        <Col lg={12} className="mb-2">

                            <div className="descr-content">
                                <FieldArray name="company.achievement">
                                    {({ insert, remove, push }) => (
                                        <div>
                                            {values?.company?.achievement?.length > 0 ?
                                                <>
                                                    {
                                                        values?.company?.achievement?.map((benefit, index) => (
                                                            <div className="row" key={index}>
                                                                <div className="col">

                                                                    <label>Year of Achievement <span className='labelerrorssss'>*</span></label>
                                                                    <Field
                                                                        as="select"
                                                                        name={`company.achievement.${[index]}.year`}
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
                                                                        name={`company.achievement.${[index]}.year`}
                                                                        component="div"
                                                                        className="text-danger"
                                                                    />
                                                                    <label>Description <span className='labelerrorssss'>*</span> </label>
                                                                    <Field
                                                                        name={`company.achievement.${[index]}.description`}
                                                                        placeholder="Description"
                                                                        component="textarea"
                                                                        rows="6"
                                                                        className="form-control"
                                                                    />
                                                                    <ErrorMessage
                                                                        name={`company.achievement.${[index]}.description`}
                                                                        component="div"
                                                                        className="text-danger"
                                                                    />

                                                                </div>
                                                                <div className="col">
                                                                    <button
                                                                        type="button"
                                                                        className="search-partner add-company mt-0"
                                                                        onClick={() => remove(index)}
                                                                    >
                                                                        X
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        ))
                                                    }
                                                    <button
                                                        type="button"
                                                        className="search-partner add-company mt-0"
                                                        onClick={() => push({ year: '', description: '' })}  // Push a new empty achievement object
                                                    >
                                                        Add More
                                                    </button>

                                                </> : <button
                                                    type="button"
                                                    className="search-partner add-company mt-0"
                                                    onClick={() => push({ year: '', description: '' })}  // Push a new empty achievement object
                                                >
                                                    Add Achievements
                                                </button>
                                            }

                                        </div>
                                    )}
                                </FieldArray>
                            </div>
                        </Col>

                    </Row>
                </div>

            </div>
        </>
    )
}

export default Achievements
