import React, { useState, useEffect, useRef } from 'react'
import { Col, Container, Form, Row, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import PhoneInput, { formatPhoneNumber, formatPhoneNumberIntl, isValidPhoneNumber } from "react-phone-number-input";
import en from 'react-phone-number-input/locale/en';
import 'react-phone-number-input/style.css';
import profile from "../../../../assets/profile.png";
import Select from 'react-select';
import API_URL from '../../../../../config';

const SeniorCitizenProfile = () => {
  const Navigate = useNavigate();



  useEffect(() => {
    const url = window.location.href;
    const url1 = url.split("/")[3];
    const url2 = url1.split("?")[1];
    const id = url2.split("=")[1];
    getSeniorcitizendata(id)
  }, [])

  const [seniorcitizendata, setSeniorcitizendata] = useState([])

  const getSeniorcitizendata = async (id) => {
    try {
      const requestOption = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };
      await fetch(`${API_URL}/api/getSeniorCitizendataById?id=${id}`, requestOption)
        .then((res) => res.json())
        .then((data) => {
          console.log(data)
          setSeniorcitizendata(data?.data[0])
        })
    } catch (error) {
      console.log(error)
    }

  }

  console.log(seniorcitizendata)

  const formatDate = (date) => {
    const d = new Date(date);
    const dt = d.getDate();
    const mn = d.getMonth();
    const mnth = mn + 1;
    const yyyy = d.getFullYear();
    return `${dt}/${mnth}/${yyyy}`;
  }



  return (
    <div>
      <Container fluid className='matrimonialform mt-5 mb-5'>
        <Row style={{ justifyContent: 'end' }}>
          <Button className='addbtn' style={{ width: 'auto', marginBottom: '20px' }} onClick={() => Navigate(`/SeniorcitizenEditProfile?id=${seniorcitizendata?._id}`)}>Edit </Button>
          <Button className='addbtn' style={{ width: 'auto', marginBottom: '20px' }} onClick={() => Navigate(`/profile`)}>Back To Profile </Button>
        </Row>
        <div className='profilegallery mb-5'>
          <h3 className='text-center'>Personal Information</h3>
          <div className='descr-content'>
            <Row>

              <Col lg={4} className='mb-2'>
                <h5>Full Name </h5>
                <p>{seniorcitizendata?.fullName}</p>
              </Col>
              <Col lg={4} className='mb-2'>
                <h5>Email Id </h5>
                <p>{seniorcitizendata?.email}</p>
              </Col>
              <Col lg={4} className='mb-2'>
                <h5>Contact Number </h5>
                <p>{seniorcitizendata?.contactNumber}</p>
              </Col>
              <Col lg={4} className='mb-2'>
                <h5>Would you like to stay in temple and provide services? </h5>
                <p>{seniorcitizendata?.provideServices}</p>
              </Col>
              <Col lg={4} className='mb-2'>
                <h5>Profile Picture </h5>

                <div className='profileimgc'>

                  <img className='prr' src={`${API_URL}/uploads/user_profile/${seniorcitizendata?.profilePicture?.map((val) => val.filename)}`} alt='profile' />

                </div>
              </Col>
            </Row>
          </div>
        </div>

        <div className='profilegallery mb-5'>
          <h3 className='text-center'>Demographics</h3>
          <div className='descr-content'>
            <Row>
              <Col lg={4} className='mb-2'>
                <h5>Age </h5>
                <p>{seniorcitizendata?.age}</p>
              </Col>
              <Col lg={4} className='mb-2'>
                <h5>Gender </h5>
                <p>{seniorcitizendata?.gender}</p>
              </Col>
              <Col lg={4} className='mb-2'>
                <h5>Country </h5>
                <p>{seniorcitizendata?.countrydetails?.map(val => val?.country_name)}</p>
              </Col>
              <Col lg={4} className='mb-2'>
                <h5>State </h5>
                <p>{seniorcitizendata?.statedetails?.map(val => val?.state_name)}</p>
              </Col>
              <Col lg={4} className='mb-2'>
                <h5>City </h5>
                <p>{seniorcitizendata?.citydetails?.map(val => val?.city_name)}</p>
              </Col>
              <Col lg={4} className='mb-2'>
                <h5>Languages </h5>

                <p>{seniorcitizendata?.languages}</p>
              </Col>
              <Col lg={4} className='mb-2'>
                <h5>Address </h5>

                <p>{seniorcitizendata?.address}</p>
              </Col>

            </Row>
          </div>
        </div>

        <div className='profilegallery mb-5'>
          <h3 className='text-center'>Emergency Contact</h3>
          <div className='descr-content'>
            <Row>
              <Col lg={4} className='mb-2'>
                <h5>Emergency Contact Name </h5>

                <p>{seniorcitizendata?.emergencyContactName}</p>
              </Col>
              <Col lg={4} className='mb-2'>
                <h5>Emergency Contact Number </h5>

                <p>{seniorcitizendata?.emergencyContactNumber}</p>
              </Col>
              <Col lg={4} className='mb-2'>
                <h5>Emergency Contact Relationship </h5>

                <p>{seniorcitizendata?.emergencyRelationship}</p>
              </Col>

            </Row>
          </div>
        </div>

        <div className='profilegallery mb-5'>
          <h3 className='text-center'>Health Information</h3>
          <div className='descr-content'>
            <Row>
              <Col lg={4} className='mb-2'>
                <h5>Past Treatments </h5>

                <p>{seniorcitizendata?.pastTreatments}</p>
              </Col>
              <Col lg={4} className='mb-2'>
                <h5>Regular Medication </h5>

                <p>{seniorcitizendata?.regularMedication}</p>
              </Col>
            </Row>
          </div>
        </div>

        <div className='profilegallery mb-5'>
          <h3 className='text-center'>Tiffin Service Preference</h3>
          <div className='descr-content'>
            <Row>
              <Col lg={4} className='mb-2'>
                <h5>Meal Preferences </h5>

                <p>{seniorcitizendata?.mealPreferences?.map(val => val).join(' , ')}</p>
              </Col>
              <Col lg={4} className='mb-2'>
                <h5>Meal Timing </h5>

                <p>{seniorcitizendata?.mealTiming?.map(val => val).join(' , ')}</p>
              </Col>
              <Col lg={4} className='mb-2'>
                <h5>Dietary Restrictions </h5>

                <p>{seniorcitizendata?.dietaryRestrictions}</p>
              </Col>

            </Row>
          </div>
        </div>

      </Container>
    </div>
  )
}

export default SeniorCitizenProfile;