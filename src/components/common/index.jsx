import React from 'react';
import { useField, useFormikContext } from 'formik';
import { Form } from 'react-bootstrap';
import { addDays } from '../../utils'; // Assuming this is a custom utility function

export const DatePickerField = ({ label, ...props }) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(props);
  console.log("field.name", field.name)
  // Convert ISO string to YYYY-MM-DD format for input[type="date"]
  const convertToInputDate = (value) => {
    if (!value) return '';
    const date = new Date(value);
    return date.toISOString().split('T')[0];
  };

  // Validate date and get minimum allowed date
  const getMinDateAndValidate = (dateString) => {
    const today = new Date();
    const minDate = addDays(today, 30);
    const selectedDate = new Date(dateString);

    return {
      minDate: minDate.toISOString().split('T')[0],
      isValid: selectedDate > minDate
    };
  };

  const handleChange = (e) => {
    const { value } = e.target;
    const { isValid } = getMinDateAndValidate(value);

    setFieldValue(field.name, value);

  };

  const { minDate } = getMinDateAndValidate(new Date());

  return (
    <>
      <Form.Label>{label} <span className='labelerrorssss'>*</span></Form.Label>
      <input
        {...field}
        {...props}
        type="date"
        value={convertToInputDate(field.value)}
        onChange={handleChange}
        min={minDate}
        className="form-control"
      />
      {meta.touched && meta.error ? (
        <div className="text-danger">{meta.error}</div>
      ) : null}
    </>
  );
};