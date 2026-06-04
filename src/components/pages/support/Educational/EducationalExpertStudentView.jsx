import React, { useState, useEffect } from 'react'
import { Col, Container, Form, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import API_URL from '../../../../../config';
import Nodatafound from '../../nodatafound/Nodatafound';

const EducationalExpertStudentView = () => {

    const Navigate = useNavigate()

    const [StudentData, setStudentData] = useState([])

    useEffect(() => {
        const url = window.location.href;
        const url1 = url.split("/")[3];
        const url2 = url1.split("?")[1];
        const id = url2.split("=")[1];
        getStudentData(id)
    }, [])

    const getStudentData = async(id) => {
        try {
            const requestOptions = {
                method: 'GET',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
            };
            await fetch(`${API_URL}/api/getstudentlist?id=${id}`, requestOptions)
                .then(response => response.json())
                .then(data => {
                    console.log("StudentData", data)
                    setStudentData(data.data)
                });
        } catch (error) {
            console.log("Error in getStudentData", error)
        }
    }

    console.log("StudentData", StudentData)


  return (
    <div>
          {StudentData?.length > 0 ? (
              StudentData?.map((data, index) => (
                  <div className="searchrightside" key={index}>
                      <Row>
                          <Col lg={3}>
                              <div className='profiledetails'>
                                  {data?.profile_pic?.map((profile, pIdx) => (
                                      <img key={pIdx} src={`${API_URL}/uploads/user_profile/${profile?.filename}`} alt="" style={{objectFit:'cover'}}/>
                                  ))}
                                  <h3>{data?.fullName}</h3>
                              </div>
                          </Col>
                          <Col lg={9}>
                              <div className='dataright'>
                                  <Row className='profilelocation'>
                                      <Col lg={6}>
                                          <span><img src={location} alt="" />{`${data?.countrydetails?.map((val) => val?.country_name)} , ${data?.statedetails?.map((val) => val?.state_name)},  ${data?.citydetails?.map((val) => val?.city_name)}`}</span>
                                      </Col>
                                      <Col lg={6}>
                                          <button className="view-user-profile" onClick={() => Navigate(`/EducationalExpertStudentProfileview?id=${data._id}`)}>View Profile</button>
                                      </Col>
                                  </Row>
                                  <Row style={{ marginLeft: '0px', marginRight: '0px' }}>
                                      <Col lg={4}>
                                          <button className='profiledataa text-break'>{data.age}</button>
                                      </Col>
                                      {/* <Col lg={3}>
                                          <button className='profiledataa text-break'>{data?.countrydetails?.map((val) => val?.country_name)}</button>
                                      </Col>
                                      <Col lg={3}>
                                          <button className='profiledataa text-break'>{data?.statedetails?.map((val) => val?.state_name)}</button>
                                      </Col>
                                      <Col lg={3}>
                                          <button className='profiledataa text-break'>{data?.citydetails?.map((val) => val?.city_name)}</button>
                                      </Col> */}
                                      <Col lg={4}>
                                          <button className='profiledataa text-break'>{data?.qualificationdetails?.map(val => val.education_list)}</button>
                                      </Col>
                                      <Col lg={4}>
                                          <button className='profiledataa text-break'>{data?.careerInterest}</button>
                                      </Col>
                                      <Col lg={12}>
                                          <button className='profiledataa text-break'>
                                              {data?.bio}
                                          </button>
                                      </Col>
                                     
                                  </Row>
                              </div>
                          </Col>
                      </Row>

                  </div>
               
              ))
            )
              :
              <div >
                  <Nodatafound />
              </div>
          }
    </div>
  )
}

export default EducationalExpertStudentView