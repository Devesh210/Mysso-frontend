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

const MedicalHospitalServicesForm = () => {
  const Navigate = useNavigate();


const [service_Category_List, setService_Category_list] = useState([]);
const [branchList, setBranchList] = useState([]);

  const [serviceCategory, setServiceCategory] = useState('');
  const [serviceName, setServiceName] = useState('');
  const [serviceDescription, setServiceDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [serviceLocation, setServiceLocation] = useState('');
  const [serviceContact, setServiceContact] = useState('');
  const [isPhoneValid, setIsPhoneValid] = useState(true);
  const [doctorName, setDoctorName] = useState('');
  const [doctorSpecialization, setDoctorSpecialization] = useState('');
  const [yearsOfExperience, setYearsOfExperience] = useState('');
  const [isHospitalUser, setIsHospitalUser] = useState(false);
  const [hospital_id, setHospital_Id] = useState('');
  const [loading, setLoading] = useState(false);

  const serviceCategoryRef = useRef(null);
  const serviceNameRef = useRef(null);
  const serviceDescriptionRef = useRef(null);
  const startDateRef = useRef(null);
  const endDateRef = useRef(null);
  const startTimeRef = useRef(null);
  const endTimeRef = useRef(null);
  const serviceLocationRef = useRef(null);
  const serviceContactRef = useRef(null);
  const doctorNameRef = useRef(null);
  const doctorSpecializationRef = useRef(null);
  const yearsOfExperienceRef = useRef(null);


  useEffect(() => {
    checkHospitalUser();
    getServiceCategoryList();
    getBranchList();
  }, []);

  const checkHospitalUser = async () => {
    try {
      const requestOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
      };
      await fetch(`${API_URL}/api/checkHospitalUser`, requestOptions)
        .then(response => response.json())
        .then(data => {
          console.log("data>?>>>>??????>>>>????", data);
          if (data.status === 200) {
            setIsHospitalUser(true);
            setHospital_Id(data?.data[0]?._id);
          }
          else {
            setIsHospitalUser(false);
          }
        });
    } catch (error) {
      console.log(error);
    }
  }



  const getServiceCategoryList = async() => {
      try{
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
      catch(error){
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
      await fetch(`${API_URL}/api/getHospitalBranchById`, requestOption)
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

        if(!serviceCategory){
          swal({
            text: "Please select Service Category",
            icon: "warning",
          });
          serviceCategoryRef.current.focus();
          return false;
        }
        else if(!serviceName){
          swal({
            text: "Please enter Service Name",
            icon: "warning",
          });
          serviceNameRef.current.focus();
          return false;
        }
        else if(!serviceDescription){
          swal({
            text: "Please enter Service Description",
            icon: "warning",
          });
          serviceDescriptionRef.current.focus();
          return false;
        }
        else if(!startDate){
          swal({
            text: "Please select Start Date",
            icon: "warning",
          });
          startDateRef.current.focus();
          return false;
        }
        else if(!endDate){
          swal({
            text: "Please select End Date",
            icon: "warning",
          });
          endDateRef.current.focus();
          return false;
        }
        else if(!startTime){
          swal({
            text: "Please select Start Time",
            icon: "warning",
          });
          startTimeRef.current.focus();
          return false;
        }
        else if(!endTime){
          swal({
            text: "Please select End Time",
            icon: "warning",
          });
          endTimeRef.current.focus();
          return false;
        }
        else if(!serviceLocation){
          swal({
            text: "Please select Service Location",
            icon: "warning",
          });
          serviceLocationRef.current.focus();
          return false;
        }
        else if(!serviceContact){
          swal({
            text: "Please enter Service Contact",
            icon: "warning",
          });
          serviceContactRef.current.focus();
          return false;
        }
        else if(!isPhoneValid){
          swal({
            text: "Please enter valid Service Contact",
            icon: "warning",
          });
          serviceContactRef.current.focus();
          return false;
        }
        else if(!doctorName){
          swal({
            text: "Please enter Doctor Name",
            icon: "warning",
          });
          doctorNameRef.current.focus();
          return false;
        }
        else if(!doctorSpecialization){
          swal({
            text: "Please enter Doctor Specialization",
            icon: "warning",
          });
          doctorSpecializationRef.current.focus();
          return false;
        }
        else if(!yearsOfExperience){
          swal({
            text: "Please enter Years of Experience",
            icon: "warning",
          });
          yearsOfExperienceRef.current.focus();
          return false;
        }
        else {
          setLoading(true);

        const formData = {
        'hospital_id': hospital_id,
        'serviceCategory': serviceCategory,
        'serviceName': serviceName,
        'serviceDescription': serviceDescription,
        'startDate': startDate,
        'endDate': endDate,
        'startTime': startTime,
        'endTime': endTime,
        'serviceLocation': serviceLocation,
        'serviceContact': serviceContact,
        'doctorName': doctorName,
        'doctorSpecialization': doctorSpecialization,
        'yearsOfExperience': yearsOfExperience,
        }

          console.log(formData)

        const requestOption = {
          method: "POST",
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}` 
          },
          body: JSON.stringify(formData ),
        };

        await fetch(`${API_URL}/api/createhospitalServices`, requestOption)
          .then((res) => res.json())
          .then((data) => {
            console.log(data)
            if (data.status === 200) {
              swal({
                text: data.message,
                icon: "success",
              });
              Navigate(`/MedicalHospitalServicesList?id=${hospital_id}`);
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

  console.log("hospital_id",hospital_id)


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
                    {service_Category_List?.map((val, index) => (
                      <option key={index} value={val?._id}>{val?.service_category}</option>
                    ))}
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

                  <Col lg={3} className='mb-2'>
                    <label>Start Time <span className='labelerrorssss'>*</span></label>
                    <Form.Group controlId="formStartTime">
                      <Form.Control
                        type="time"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        placeholder="Select Start Time"
                        ref={startTimeRef}
                      />
                    </Form.Group>
                  </Col>

                  <Col lg={3} className='mb-2'>
                    <label>End Time <span className='labelerrorssss'>*</span></label>
                    <Form.Group controlId="formEndTime">
                      <Form.Control
                        type="time"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                        placeholder="Select End Time"
                        ref={endTimeRef}
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
                  {/* <Form.Select
                    value={serviceLocation}
                    onChange={(e) => setServiceLocation(e.target.value)}
                    className='mb-3'>
                    <option hidden>Select Service Location</option>
                    {branchList?.map((val, index) => (
                      <option
                        key={index}
                        value={val?.address}
                        title={val?.address} // Shows full address on hover
                      >
                        {val?.address?.length > 30 ? `${val?.address.substring(0, 30)}...` : val?.address}
                      </option>
                    ))}
                  </Form.Select> */}


                </Form.Group>
              </Col>

              <Col lg={4} className='mb-2'>
                <label>Service Contact <span className='labelerrorssss'>*</span></label>
                <Form.Group controlId="formServiceContact">
                  {/* <Form.Control
                    type="text"
                    value={serviceContact}
                    onChange={(e) => setServiceContact(e.target.value)}
                    placeholder="Enter Service Contact"
                  /> */}
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

              <Col lg={4} className='mb-2'>
                <label>Doctor Name <span className='labelerrorssss'>*</span></label>
                <Form.Group controlId="formDoctorName">
                  <Form.Control
                    type="text"
                    value={doctorName}
                    onChange={(e) => setDoctorName(e.target.value)}
                    placeholder="Enter Doctor Name"
                    ref={doctorNameRef}
                  />
                </Form.Group>
              </Col>

              <Col lg={4} className='mb-2'>
                <label>Doctor Specialization <span className='labelerrorssss'>*</span></label>
                <Form.Group controlId="formDoctorSpecialization">
                  <Form.Control
                    type="text"
                    value={doctorSpecialization}
                    onChange={(e) => setDoctorSpecialization(e.target.value)}
                    placeholder="Enter Doctor Specialization"
                    ref={doctorSpecializationRef}
                  />
                </Form.Group>
              </Col>

              <Col lg={4} className='mb-2'>
                <label>Years of Experience <span className='labelerrorssss'>*</span></label>
                <Form.Group controlId="formYearsOfExperience">
                  <Form.Control
                    type="text"
                    value={yearsOfExperience}
                    onInput={allowOnlyNumbers} maxLength={3}
                    onChange={(e) => setYearsOfExperience(e.target.value)}
                    placeholder="Enter Years of Experience"
                    ref={yearsOfExperienceRef}
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

export default MedicalHospitalServicesForm;