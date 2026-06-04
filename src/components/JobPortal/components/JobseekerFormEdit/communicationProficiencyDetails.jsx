import { FieldArray, Field, ErrorMessage } from 'formik';
import React from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { communicationProficiency } from '../../../../utils';

const communicationProficiencyDetails = ({ values, errors, touched, isSubmitting, setFieldValue }) => {
    return (
        <div className="profilegallery mb-5">
            <h3 className="text-center">Communication Skills</h3>
            <div>
                <label htmlFor="communicationSkills.english">English Proficiency Level<span className='labelerrorssss'>*</span></label>
                <Field as="select" name="communicationSkills.english">
                    <option value="">Select proficiency</option>
                    {communicationProficiency.map((level) => (
                        <option key={level} value={level}>
                            {level}
                        </option>
                    ))}
                </Field>
                <ErrorMessage name="communicationSkills.english" component="div" />
            </div>

            <div>
                <label htmlFor="communicationSkills.hindi">Hindi Proficiency Level<span className='labelerrorssss'>*</span></label>
                <Field as="select" name="communicationSkills.hindi">
                    <option value="">Select proficiency</option>
                    {communicationProficiency.map((level) => (
                        <option key={level} value={level}>
                            {level}
                        </option>
                    ))}
                </Field>
                <ErrorMessage name="communicationSkills.hindi" component="div" />
            </div>

            <div>
                <label htmlFor="communicationSkills.gujarati">Gujarati Proficiency Level<span className='labelerrorssss'>*</span></label>
                <Field as="select" name="communicationSkills.gujarati">
                    <option value="">Select proficiency</option>
                    {communicationProficiency.map((level) => (
                        <option key={level} value={level}>
                            {level}
                        </option>
                    ))}
                </Field>
                <ErrorMessage name="communicationSkills.gujarati" component="div" />
            </div>
        </div>

    );
};

export default communicationProficiencyDetails;
