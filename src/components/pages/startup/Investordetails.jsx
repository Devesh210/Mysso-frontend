import React, { useState, useEffect, useRef } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom';
import 'react-phone-number-input/style.css'
import API_URL from '../../../../config';

const Investordetails = () => {
  const Navigate = useNavigate();

  useEffect(() => {
    const url = window.location.href;
    const url1 = url.split("/")[3];
    const url2 = url1.split("?")[1];
    const id = url2.split("=")[1];
    getInvestordata(id)
  }, [])

  const [investordata, setInvestordata] = useState([])

  const getInvestordata = async (id) => {
    try {
      const requestOption = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };
      await fetch(`${API_URL}/api/getInvestorId?id=${id}`, requestOption)
        .then((res) => res.json())
        .then((data) => {
          console.log(data)
          setInvestordata(data?.data[0])
        })
    } catch (error) {
      console.log(error)
    }

  }

  console.log(investordata)

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
        
        </Row>
        <div className='profilegallery mb-5'>
          <h3 className='text-center'>Personal Information</h3>
          <div className='descr-content'>
            <Row>
              <Col lg={4} className='mb-4'>
                <h5>Full Name </h5>
                <p>{investordata?.fullName}</p>
              </Col>
              <Col lg={4} className='mb-4'>
                <h5>Email Address </h5>
                <p>{investordata?.emailid}</p>
              </Col>
              <Col lg={4} className='mb-4'>
                <h5>Phone Number </h5>
                <p>{investordata?.phoneNumber}</p>
              </Col>
              <Col lg={4} className='mb-4'>
                <h5>LinkedIn Profile </h5>
                <p>{investordata?.linkedIn}</p>
              </Col>
              <Col lg={4} className='mb-4'>
                <h5>Country </h5>
                <p>{investordata?.country_details?.map(val => val?.country_name)}</p>
              </Col>
              <Col lg={4} className='mb-4'>
                <h5>State </h5>
                <p>{investordata?.state_details?.map(val => val?.state_name)}</p>
              </Col>
              <Col lg={4} className='mb-4'>
                <h5>City </h5>
                <p>{investordata?.city_details?.map(val => val?.city_name)}</p>
              </Col>
              <Col lg={4} className='mb-4'>
                <h5>Timezone </h5>
                <p>{investordata?.timezone}</p>
              </Col>


            </Row>
          </div>
        </div>

        <div className='profilegallery mb-5'>
          <h3 className='text-center'>Professional Background</h3>
          <div className='descr-content'>
            <Row>
              <Col lg={4} className='mb-4'>
                <h5>Current Role/Title </h5>
                <p>{investordata?.currentRole}</p>
              </Col>
              <Col lg={4} className='mb-4'>
                <h5>Company Name </h5>
                <p>{investordata?.companyName}</p>
              </Col>
              <Col lg={4} className='mb-4'>
                <h5>Industry </h5>
                <p>{investordata?.investorIndustry_details?.map(val => val?.startup_industry).join(', ')}</p>
              </Col>
              <Col lg={4} className='mb-4'>
                <h5>Years of Experience </h5>
                <p>{investordata?.yearofexperience}</p>
              </Col>
              <Col lg={4} className='mb-4'>
                <h5>Professional Summary/Bio </h5>
                <p>{investordata?.professionalbio}</p>
              </Col>
              <Col lg={4} className='mb-4'>
                <h5>Previous Investments (if any) </h5>
                <p>{investordata?.previousInvestments}</p>
              </Col>

            </Row>
          </div>
        </div>

        <div className='profilegallery mb-5'>
          <h3 className='text-center'>Investment Preferences</h3>
          <div className='descr-content'>
            <Row>
              <Col lg={4} className='mb-4'>
                <h5>Preferred Investment Stage </h5>
                <p>{investordata?.preferredInvestmentStage_details?.map(val => val?.preferred_investment_stage).join(', ')}</p>
              </Col>
              <Col lg={4} className='mb-4'>
                <h5>Preferred Industry Sectors </h5>
                <p>{investordata?.IndustrySector_details?.map(val => val?.startup_industry).join(', ')}</p>
              </Col>
              <Col lg={4} className='mb-4'>
                <h5>Geographic Preferences </h5>
                <p>{investordata?.preferredGeographic}</p>
              </Col>
              <Col lg={4} className='mb-4'>
                <h5>Minimum Investment Amount </h5>
                <p>{investordata?.minimumInvestmentAmount}</p>
              </Col>
              <Col lg={4} className='mb-4'>
                <h5>Maximum Investment Amount </h5>
                <p>{investordata?.maximumInvestmentAmount}</p>
              </Col>
              <Col lg={4} className='mb-4'>
                <h5>Preferred Investment Types </h5>
                <p>{investordata?.InvestmentType_details?.map(val => val?.startup_investment).join(', ')}</p>
              </Col>

            </Row>
          </div>
        </div>

        <div className='profilegallery mb-5'>
          <h3 className='text-center'>Startup Characteristics</h3>
          <div className='descr-content'>
            <Row>
              <Col lg={4} className='mb-4'>
                <h5>Startup Stage Preference </h5>
                <p>{investordata?.StartupStage_details?.map(val => val?.startup_stage).join(', ')}</p>
              </Col>
              <Col lg={4} className='mb-4'>
                <h5>Revenue Model </h5>
                <p>{investordata?.revenuemodel_details?.map(val => val?.startup_revenue).join(', ')}</p>
              </Col>

            </Row>
          </div>
        </div>

        <div className='profilegallery mb-5'>
          <h3 className='text-center'>Investment Experience</h3>
          <div className='descr-content'>
            <Row>
              <Col lg={4} className='mb-4'>
                <h5>Number of Startups Invested In </h5>
                <p>{investordata?.startupsInvested}</p>
              </Col>
              <Col lg={4} className='mb-4'>
                <h5>Notable Investments </h5>
                <p>{investordata?.notableInvestments}</p>
              </Col>
              <Col lg={4} className='mb-4'>
                <h5>Average Holding Period </h5>
                <p>{investordata?.averageHoldingPeriod}</p>
              </Col>
              <Col lg={4} className='mb-4'>
                <h5>Exit Strategies Preferred </h5>
                <p>{investordata?.exitStrategiesPreferred}</p>
              </Col>
              <Col lg={4} className='mb-4'>
                <h5>Success Stories </h5>
                <p>{investordata?.successStories}</p>
              </Col>
            </Row>
          </div>
        </div>

      </Container>
    </div>
  )
}

export default Investordetails;