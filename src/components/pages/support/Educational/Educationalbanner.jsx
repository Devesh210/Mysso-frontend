import React, { useState, useEffect } from 'react'
import { Col, Container, Form, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';

import startup from "../../../../assets/support/edubanner.jpeg"
import API_URL from '../../../../../config';
import Select from 'react-select';
import { useEducationFilterContext } from '../../../../services/EducationFilterContext';

import Slider from "react-slick";
import borderimg from '../../../../assets/border.svg';
import ash1 from "../../../../assets/supportlogo.png"
import fb from "../../../../assets/supportsocial/1.svg"
import linkd from "../../../../assets/supportsocial/2.svg"
import inst from "../../../../assets/supportsocial/3.svg"
import twitter from "../../../../assets/supportsocial/4.svg"
import Nodatafound from '../../nodatafound/Nodatafound';
import { RotatingLines } from 'react-loader-spinner'


const Educationalbanner = () => {
  const Navigate = useNavigate();

  const { educationfilter, setEducationFilter, getEducationData, educationdata, totalcount } = useEducationFilterContext();

  const [isEducationStudentUser, setIsEducationStudentUser] = useState(false);
  const [educationStudentId, setEducationStudentId] = useState('');

  const [guidanceTypeList, setGuidanceTypeList] = useState([]);
  const [careerFieldsList, setCareerFieldsList] = useState([]);
  const [consultationModeList, setConsultationModeList] = useState([]);

  const [careerFields, setCareerFields] = useState([]);
  const [guidanceType, setGuidanceType] = useState([]);
  const [consultationMode, setConsultationMode] = useState([]);
  const [yearsOfExperiencefilter, setYearsOfExperienceFilter] = useState([]);
  const [preferredTimeSlotsfilter, setPreferredTimeSlotsFilter] = useState([]);

  const [localFilter, setLocalFilter] = useState(educationfilter);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      getcareerFieldsList();
      getTypeofGuidance();
      getPrefferedmodeofConsultation();
      checkEducationStudentuser()

    } else {
      Navigate('/login');
    }
  }, []);

  const checkEducationStudentuser = async () => {
    try {
      const requestOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
      };
      await fetch(`${API_URL}/api/checkEducationStudentuser`, requestOptions)
        .then(response => response.json())
        .then(data => {
          console.log("data>?>>>>??????>>>>????", data);
          if (data.status === 200) {
            setIsEducationStudentUser(true);
            setEducationStudentId(data?.data[0]?._id);
          }
          else {
            setIsEducationStudentUser(false);
          }

        });

    } catch (error) {
      console.log(error);
    }
  }



  const getcareerFieldsList = async () => {
    try {
      const requestoptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      };
      await fetch(`${API_URL}/api/getEducationFieldofStudy`, requestoptions)
        .then(response => response.json())
        .then(data => {
          console.log(data.data);
          setCareerFieldsList(data.data);
        })
    }
    catch (err) {
      console.error(err.message);
    }
  }

  const getTypeofGuidance = async () => {
    try {
      const requestoptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      };
      await fetch(`${API_URL}/api/getEducationTypeofGuidance`, requestoptions)
        .then(response => response.json())
        .then(data => {
          console.log(data.data);
          setGuidanceTypeList(data.data);
        })
    }
    catch (err) {
      console.error(err.message);
    }
  }

  const getPrefferedmodeofConsultation = async () => {
    try {
      const requestoptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      };
      await fetch(`${API_URL}/api/getEducationConsultation`, requestoptions)
        .then(response => response.json())
        .then(data => {
          console.log(data.data);
          setConsultationModeList(data.data);
        })
    }
    catch (err) {
      console.error(err.message);
    }
  }

  const careerFieldsOptions = careerFieldsList?.map(val => ({
    value: val._id,
    label: val.education_fieldofstudy
  }))


  const guidanceTypeOptions = guidanceTypeList?.map(val => ({
    value: val._id,
    label: val.education_typeof_guidance
  }))



  const consultationModeOptions = consultationModeList?.map(val => ({
    value: val._id,
    label: val.education_consultation
  }))



  const yearsOfExperience = [
    { value: '1-3', label: '1-3 Years' },
    { value: '3-5', label: '3-5 Years' },
    { value: '5-10', label: '5-10 Years' },
    { value: '10+', label: '10+ Years' }
  ]



  const preferredTimeSlots = [
    { value: 'Morning Slot', label: 'Morning Slot' },
    { value: 'Afternoon Slot', label: 'Afternoon Slot' },
    { value: 'Evening Slot', label: 'Evening Slot' },
    { value: 'Night Slot', label: 'Night Slot' },
    { value: 'Anytime of the Day', label: 'Anytime of the Day' }
  ]



  const submitFilter = () => {
    setLoading(true);
    setEducationFilter(localFilter);
    getEducationData(localFilter).finally(() => setLoading(false));
  }

  const resetFilter = () => {
    setLoading(true);
    setLocalFilter({
      year_of_experience: [],
      type_of_guidance: [],
      field_of_study: [],
      mode_of_consultation: [],
      preferred_time_slots: []
    });
    setEducationFilter({
      year_of_experience: [],
      type_of_guidance: [],
      field_of_study: [],
      mode_of_consultation: [],
      preferred_time_slots: []
    });
    getEducationData().finally(() => setLoading(false));
  }


  console.log("educationdata", educationdata);
  console.log("studentid", educationStudentId);

  const handleViewProfile = async (id) => {
    try {
      const requestoptions = {
        method: 'Post',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ id: id, studentid: educationStudentId })
      };
      await fetch(`${API_URL}/api/addstudentlist`, requestoptions)
        .then(response => response.json())
        .then(data => {
          console.log(data.data);
          localStorage.setItem('educationExpertProfile', JSON.stringify(data.data));
          Navigate(`/EducationViewExpertprofile?id=${id}`);
        })
    } catch (err) {
      console.error(err.message);
    }
  }


  return (
    <div>
      <div>
        <img src={startup} alt="" />
      </div>
      <div className='edutionalbanner mb-5'>
        <h3 className="startuabout">Our Educational Supporters <img className="imgsabouts" src={borderimg} alt="border" /></h3>

        <div className="educational-banner" >
          <Container fluid >
            <div className="selectbutt">
              <Row className="justify-content-center">
                <Col lg={2}>
                  <Form.Group>
                    <Select
                      closeMenuOnSelect={false}
                      isMulti
                      options={yearsOfExperience}
                      value={localFilter.year_of_experience}
                      className="custom-select"
                      placeholder="Years of Experience"
                      onChange={(selected) => setLocalFilter({ ...localFilter, year_of_experience: selected })}
                    />
                  </Form.Group>
                </Col>

                <Col lg={2}>
                  <Form.Group>
                    <Select
                      closeMenuOnSelect={false}
                      isMulti
                      options={guidanceTypeOptions}
                      value={localFilter.type_of_guidance}
                      className="custom-select"
                      placeholder="Guidance Type"
                      onChange={(selected) => setLocalFilter({ ...localFilter, type_of_guidance: selected })}
                    />
                  </Form.Group>
                </Col>

                <Col lg={2}>
                  <Form.Group>
                    <Select
                      closeMenuOnSelect={false}
                      isMulti
                      options={careerFieldsOptions}
                      value={localFilter.field_of_study}
                      className="custom-select"
                      placeholder="Career Fields"
                      onChange={(selected) => setLocalFilter({ ...localFilter, field_of_study: selected })}
                    />
                  </Form.Group>
                </Col>

                <Col lg={2}>
                  <Form.Group>
                    <Select
                      closeMenuOnSelect={false}
                      isMulti
                      options={consultationModeOptions}
                      value={localFilter.mode_of_consultation}
                      className="custom-select"
                      placeholder="Consultation Mode"
                      onChange={(selected) => setLocalFilter({ ...localFilter, mode_of_consultation: selected })}
                    />
                  </Form.Group>
                </Col>

                <Col lg={2}>
                  <Form.Group>
                    <Select
                      closeMenuOnSelect={false}
                      isMulti
                      options={preferredTimeSlots}
                      value={localFilter.preferred_time_slots}
                      className="custom-select"
                      placeholder="Time Slots"
                      onChange={(selected) => setLocalFilter({ ...localFilter, preferred_time_slots: selected })}
                    />
                  </Form.Group>
                </Col>
                <Col lg={3} className="justify-content-center">
                  <button className="search-partners" onClick={submitFilter}>Search</button>
                  <button className='search-partners' onClick={resetFilter}>Reset</button>
                </Col>
              </Row>
            </div>


            {loading ? (
              <div className='loader my-5'>
                <RotatingLines
                  visible={true}
                  height="96"
                  width="96"
                  color="grey"
                  strokeWidth="5"
                  animationDuration="0.75"
                  ariaLabel="rotating-lines-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                  className="loader-spinner"
                  strokeColor='#E36414'

                />
              </div>
            ) : (
              <>

                <Row className="supporters-section mt-5 mb-5">
                  {educationdata?.length > 0 ? (
                    educationdata?.map((data, index) => (
                      <Col lg={3} className="mb-5" key={index}>
                        <div className="supporter-card">
                          {/* <img className="supporter-image" src={ash1} alt="" /> */}
                          <img className="supporter-image fixed-size" src={`${API_URL}/uploads/company_logo/${data?.profile_pic?.map(val => val.filename)}`} alt="" />

                          <h3>{data.fullName}</h3>
                          <p>Experience: <span>{data.experience} Years</span></p>
                          <p className='text-break'>Guidance Type: <span>{data?.guidance_typedetails?.map(val => val?.education_typeof_guidance).join(', ')}</span></p>
                          <p>Career Fields: <span>{data?.career_fieldsdetails?.map(val => val?.education_fieldofstudy).join(', ')}</span></p>
                          <p>Mode of Consultation: <span>{data?.consultation_modedetails?.map(val => val?.education_consultation).join(', ')}</span></p>
                          <p>Preferred Time Slots: <span>{data?.time_slots}</span></p>
                          {/* <p className='expertbio'>{data?.bio}</p> */}
                          <button
                            className="connnnnnnect"
                            onClick={() => handleViewProfile(data._id)}
                          >
                            View Profile
                          </button>
                        </div>
                      </Col>
                    ))
                  ) : (
                    <Nodatafound />
                  )}
                </Row>
              </>
            )}
          </Container>
        </div>
      </div>
    </div>
  )
}

export default Educationalbanner
