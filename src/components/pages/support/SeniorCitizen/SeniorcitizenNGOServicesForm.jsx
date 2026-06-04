import React, { useState, useEffect, useRef } from 'react'
import { Col, Container, Form, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import PhoneInput, { formatPhoneNumber, formatPhoneNumberIntl, isValidPhoneNumber } from "react-phone-number-input";
import en from 'react-phone-number-input/locale/en';
import 'react-phone-number-input/style.css';
import profile from "../../../../assets/profile.png";
import Select from 'react-select';
import API_URL from '../../../../../config';

const SeniorcitizenNGOServicesForm = () => {
  const Navigate = useNavigate();


  const [service_Category_List, setService_Category_list] = useState([]);
  const [branchList, setBranchList] = useState([]);

  const [serviceCategory, setServiceCategory] = useState('');
  const [serviceName, setServiceName] = useState('');
  const [serviceDescription, setServiceDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [serviceLocation, setServiceLocation] = useState('');
  const [serviceContact, setServiceContact] = useState('');
  const [isPhoneValid, setIsPhoneValid] = useState(true);
  const [isNGOUser, setIsNGOUser] = useState('');
  const [ngo_id, setNGOId] = useState('');
  const [loading, setLoading] = useState(false);

  const serviceCategoryRef = useRef(null);
  const serviceNameRef = useRef(null);
  const serviceDescriptionRef = useRef(null);
  const startDateRef = useRef(null);
  const endDateRef = useRef(null);
  const serviceLocationRef = useRef(null);
  const serviceContactRef = useRef(null);
  


  useEffect(() => {
    checkNGOUser();
    getServiceCategoryList();
    getBranchList();
  }, []);

  const checkNGOUser = async () => {
    try {
      const requestOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
      };
      await fetch(`${API_URL}/api/checkSeniorCitizenNGOUser`, requestOptions)
        .then(response => response.json())
        .then(data => {
          console.log("data>?>>>>??????>>>>????", data);
          if (data.status === 200) {
            setIsNGOUser(true);
            setNGOId(data?.data[0]?._id);
          }
          else {
            setIsNGOUser(false);
          }
        });
    } catch (error) {
      console.log(error);
    }
  }



  const getServiceCategoryList = async () => {
    try {
      const requestOption = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };
      await fetch(`${API_URL}/api/getMedicalServiceCategory`, requestOption)
        .then((res) => res.json())
        .then((data) => {
          console.log(data)
          setService_Category_list(data?.data)
        })
    }
    catch (error) {
      console.log(error)
    }
  }

  const getBranchList = async () => {
    try {
      const requestOption = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
      };
      await fetch(`${API_URL}/api/getNGOBranchById`, requestOption)
        .then((res) => res.json())
        .then((data) => {
          console.log(data)
          const branchList = data.data[0]?.branchList;
          setBranchList(branchList);
        })
    } catch (error) {
      console.log(error)
    }
  }

  console.log(branchList)

  const handlePhoneChange = (value) => {
    setServiceContact(value);
    if (value === '' || value === undefined) {
      setIsPhoneValid(true);
    } else {
      setIsPhoneValid(isValidPhoneNumber(value));
    }
  }



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      if (!serviceCategory) {
        swal({
          text: "Please select Service Category",
          icon: "warning",
        });
        serviceCategoryRef.current.focus();
        return false;
      }
      else if (!serviceName) {
        swal({
          text: "Please enter Service Name",
          icon: "warning",
        });
        serviceNameRef.current.focus();
        return false;
      }
      else if (!serviceDescription) {
        swal({
          text: "Please enter Service Description",
          icon: "warning",
        });
        serviceDescriptionRef.current.focus();
        return false;
      }
      else if (!startDate) {
        swal({
          text: "Please select Start Date",
          icon: "warning",
        });
        startDateRef.current.focus();
        return false;
      }
      else if (!endDate) {
        swal({
          text: "Please select End Date",
          icon: "warning",
        });
        endDateRef.current.focus();
        return false;
      }
      else if (!serviceLocation) {
        swal({
          text: "Please select Service Location",
          icon: "warning",
        });
        serviceLocationRef.current.focus();
        return false;
      }
      else if (!serviceContact) {
        swal({
          text: "Please enter Service Contact",
          icon: "warning",
        });
        serviceContactRef.current.focus();
        return false;
      }
      else if (!isPhoneValid) {
        swal({
          text: "Please enter valid Service Contact",
          icon: "warning",
        });
        serviceContactRef.current.focus();
        return false;
      }
     
      else {
        setLoading(true);
        const formData = {
          'ngo_id': ngo_id,
          'service_type': serviceCategory,
          'service_name': serviceName,
          'service_description': serviceDescription,
          'service_start_date': startDate,
          'service_end_date': endDate,
          'service_location': serviceLocation,
          'service_contact': serviceContact,
        }

        console.log(formData)

        const requestOption = {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify(formData),
        };

        await fetch(`${API_URL}/api/createNGOServices`, requestOption)
          .then((res) => res.json())
          .then((data) => {
            console.log(data)
            if (data.status === 200) {
              swal({
                text: data.message,
                icon: "success",
              });
              Navigate(`/SeniorcitizenNGOServicesList?id=${ngo_id}`);
              setLoading(false);
            } else {
              swal({
                text: data.message,
                icon: "error",
              });
              setLoading(false);
            }
          });
      }

    } catch (error) {
      console.log(error)
    }

  }

  const allowOnlyNumbers = (e) => {
    e.preventDefault();
    const input = e.target;
    const value = input.value.replace(/[^\d]/g, ''); // Replace any non-numeric characters with an empty string
    input.value = value; // Set the input value to the filtered value
  }

  console.log("ngo_id", ngo_id)


  return (
    <div>
      <Container fluid className='matrimonialform mt-5 mb-5'>
        <div className='profilegallery mb-5'>
          <h3 className='text-center'>Hospital Services Information</h3>
          <div className='descr-content'>
            <Row>

              <Col lg={4} className='mb-2'>
                <label>Services Category <span className='labelerrorssss'>*</span></label>
                <Form.Group controlId="formServiceCategory">
                  <Form.Select
                    value={serviceCategory}
                    onChange={(e) => setServiceCategory(e.target.value)}
                    className='mb-3'
                    ref={serviceCategoryRef}
                  >
                    <option hidden>Select Service Category</option>
                    <option value="Food Service">Food Service</option>
                    <option value="Health">Health</option>
                    <option value="Elder Care">Elder Care</option>
                    <option value="General">General</option>
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col lg={4} className='mb-2'>
                <label>Service Name <span className='labelerrorssss'>*</span></label>
                <Form.Group controlId="formServiceName">
                  <Form.Control
                    type="text"
                    value={serviceName}
                    onChange={(e) => setServiceName(e.target.value)}
                    placeholder="Enter Service Name"
                    ref={serviceNameRef}
                  />
                </Form.Group>
              </Col>

              <Col lg={4} className='mb-2'>
                <label>Service Description <span className='labelerrorssss'>*</span></label>
                <Form.Group controlId="formServiceDescription">
                  <Form.Control
                    type="text"
                    value={serviceDescription}
                    onChange={(e) => setServiceDescription(e.target.value)}
                    placeholder="Enter Service Description"
                    ref={serviceDescriptionRef}
                  />
                </Form.Group>
              </Col>

              <Col lg={12} className='mb-2'>
                <Row>
                  <label>Service Duration </label>
                  <Col lg={3} className='mb-2'>
                    <label>Start Date <span className='labelerrorssss'>*</span></label>
                    <Form.Group controlId="formStartDate">
                      <Form.Control
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        placeholder="Select Start Date"
                        ref={startDateRef}
                      />
                    </Form.Group>
                  </Col>

                  <Col lg={3} className='mb-2'>
                    <label>End Date <span className='labelerrorssss'>*</span></label>
                    <Form.Group controlId="formEndDate">
                      <Form.Control
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        placeholder="Select End Date"
                        ref={endDateRef}
                      />
                    </Form.Group>
                  </Col>

                </Row>
              </Col>

              <Col lg={4} className='mb-2'>
                <label>Service Location (Address) <span className='labelerrorssss'>*</span></label>
                <Form.Group controlId="formServiceLocation">
                  <Form.Select
                    value={serviceLocation}
                    onChange={(e) => setServiceLocation(e.target.value)}
                    className='mb-3'
                    ref={serviceLocationRef}
                  >
                    <option hidden>Select Service Location</option>
                    {branchList?.map((val, index) => (
                      <option key={index} value={val?.address}>{val?.address}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col lg={4} className='mb-2'>
                <label>Service Contact <span className='labelerrorssss'>*</span></label>
                <Form.Group controlId="formServiceContact">
                  <PhoneInput
                    className={`form-control ${!isPhoneValid ? 'is-invalid' : ''}`}
                    defaultCountry="IN"
                    international
                    countryCallingCodeEditable={false}
                    localization={en}
                    placeholder="Phone Number"
                    value={serviceContact}
                    onChange={handlePhoneChange}
                    ref={serviceContactRef}
                  />

                </Form.Group>
              </Col>
            </Row>
          </div>
        </div>
        {loading ?
          <button className='submitforms' disabled>Please wait...</button>
          :
          <button type='submit' className='submitforms' onClick={handleSubmit}>Submit Form</button>
        }           
      </Container>
    </div>
  )
}

export default SeniorcitizenNGOServicesForm;