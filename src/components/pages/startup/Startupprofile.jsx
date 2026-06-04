import React, { useState, useEffect, useRef } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom';
import 'react-phone-number-input/style.css'
import companylogo from "../../../assets/companylogo.png"
import dummyLogo from "../../../assets/dummyLogo.png"


import API_URL from '../../../../config';
const Startupprofile = () => {
  const Navigate = useNavigate();

  useEffect(() => {
    const url = window.location.href;
    const url1 = url.split("/")[3];
    const url2 = url1.split("?")[1];
    const id = url2.split("=")[1];
    getStartupdata(id)
  }, [])

  const [startupdata, setStartupdata] = useState([])

  const getStartupdata = async (id) => {
    try {
      const requestOption = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };
      await fetch(`${API_URL}/api/getStartUpId?id=${id}`, requestOption)
        .then((res) => res.json())
        .then((data) => {
          console.log(data)
          setStartupdata(data?.data[0])
        })
    } catch (error) {
      console.log(error)
    }

  }

  console.log(startupdata)

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
          <Button className='addbtn' style={{ width: 'auto', marginBottom: '20px' }} onClick={() => Navigate(`/Startupeditprofile?id=${startupdata?._id}`)}>Edit </Button>
          <Button className='addbtn' style={{ width: 'auto', marginBottom: '20px' }} onClick={() => Navigate(`/profile`)}>Back To Profile </Button>
        </Row>
        <div className='profilegallery mb-5'>
          <h3 className='text-center'>Company Information</h3>
          <div className='descr-content'>
            <Row>
              <Col lg={4} className='mb-4'>
                <h5>Company Logo </h5>
                <div className='profileimgc'>

                  <img className='prr' src={!startupdata?.companyLogo || startupdata?.companyLogo?.length == 0 ? dummyLogo :  `${API_URL}/uploads/company_logo/${startupdata?.companyLogo?.map((val) => val.filename)}`} alt='profile' />

                </div>
              </Col>
              <Col lg={4} className='mb-4'>
                <h5>Company Name </h5>
                <p>{startupdata?.companyName}</p>
              </Col>
              <Col lg={4} className='mb-4'>
                <h5>Business Type </h5>
                <p>{startupdata?.businessType_details?.map(val => val?.startupbusiness_type)}</p>
              </Col>
              <Col lg={4} className='mb-4'>
                <h5>Registration Number/CIN No. </h5>
                <p>{startupdata?.registrationNumber}</p>
              </Col>
              <Col lg={4} className='mb-4'>
                <h5>Date of Incorporation </h5>
                <p>{formatDate(startupdata?.dateOfIncorporation)}</p>
              </Col>
              <Col lg={4} className='mb-4'>
                <h5>Country of Incorporation </h5>
                <p>{startupdata?.incorporation_country_details?.map(val => val?.country_name)}</p>
              </Col>
              <Col lg={4} className='mb-4'>
                <h5>Business Address </h5>
                <p>{startupdata?.businessAddress}</p>
              </Col>
              <Col lg={4} className='mb-4'>
                <h5>Contact Information </h5>
                <p>{startupdata?.contactInformation}</p>
              </Col>
              <Col lg={4} className='mb-4'>
                <h5>Business Email ID </h5>
                <p>{startupdata?.businessEmail}</p>
              </Col>

            </Row>
          </div>
        </div>

        <div className='profilegallery mb-5'>
          <h3 className='text-center'>Founders’/Owners’ Information</h3>
          <div className='descr-content'>
            <Row>
              <Col lg={4} className='mb-4'>
                <h5>Full Name </h5>
                <p>{startupdata?.founderName}</p>
              </Col>
              <Col lg={4} className='mb-4'>
                <h5>Date of Birth </h5>
                <p>{formatDate(startupdata?.founderDOB)}</p>
              </Col>
              <Col lg={4} className='mb-4'>
                <h5>Nationality </h5>
                <p>{startupdata?.founderNationality_details?.map(val => val?.country_name)}</p>
              </Col>
              <Col lg={4} className='mb-4'>
                <h5>Identification Proof  </h5>
                <p>{startupdata?.founderID}</p>
              </Col>
              <Col lg={4} className='mb-4'>
                <h5>Address Proof </h5>
                <p>{startupdata?.founderAddress}</p>
              </Col>
              <Col lg={4} className='mb-4'>
                <h5>Email ID </h5>
                <p>{startupdata?.founderEmail}</p>
              </Col>
              <Col lg={4} className='mb-4'>
                <h5>Contact Information </h5>
                <p>{startupdata?.founderContact}</p>
              </Col>
            </Row>
          </div>
        </div>

        <div className='profilegallery mb-5'>
          <h3 className='text-center'>Business Operation Details</h3>
          <div className='descr-content'>
            <Row>
              <Col lg={4} className='mb-4'>
                <h5>Industry </h5>
                <p>{startupdata?.industry_details?.map(val => val?.startup_industry)}</p>
              </Col>
              <Col lg={4} className='mb-4'>
                <h5>Business Activity Description </h5>
                <p>{startupdata?.businessActivity}</p>
              </Col>
              <Col lg={4} className='mb-4'>
                <h5>Number of Employees </h5>
                <p>{startupdata?.numOfEmployees}</p>
              </Col>
              <Col lg={4} className='mb-4'>
                <h5>Annual Revenue (Projected) </h5>
                <p>{startupdata?.annualRevenue}</p>
              </Col>
              <Col lg={4} className='mb-4'>
                <h5>Startup Stage </h5>
                <p>{startupdata?.startupStage_details?.map(val => val?.startup_stage)}</p>
              </Col>
              <Col lg={4} className='mb-4'>
                <h5>Revenue Model </h5>
                <p>{startupdata?.revenueModel_details?.map(val => val?.startup_revenue)}</p>
              </Col>
              <Col lg={4} className='mb-4'>
                <h5>Business Bank Account Details </h5>
                <p>{startupdata?.bankDetails}</p>
              </Col>
            </Row>
          </div>
        </div>

        <div className='profilegallery mb-5'>
          <h3 className='text-center'>Legal and Compliance</h3>
          <div className='descr-content'>
            <Row>
              <Col lg={4} className='mb-4'>
                <h5>Tax Identification Number (TIN) </h5>
                <p>{startupdata?.taxNumber}</p>
              </Col>
              <Col lg={4} className='mb-4'>
                <h5>Legal Agreements </h5>
                <p>{startupdata?.legalAgreements}</p>
              </Col>
              <Col lg={4} className='mb-4'>
                <h5>Intellectual Property Details </h5>
                <p>{startupdata?.intellectualPropertyDetails}</p>
              </Col>
              <Col lg={4} className='mb-4'>
                <h5>Compliance Certifications </h5>
                <p>{startupdata?.complianceCerts}</p>
              </Col>
            </Row>
          </div>
        </div>

        <div className='profilegallery mb-5'>
          <h3 className='text-center'>Investment Requirements</h3>
          <div className='descr-content'>
            <Row>
              <Col lg={4} className='mb-4'>
                <h5>Investment Type </h5>
                <p>{startupdata?.investmentType_details?.map(val => val?.startup_investment).join(', ')}</p>
              </Col>
              <Col lg={4} className='mb-4'>
                <h5>Preferred Experience of Investor in Years </h5>
                <p>{startupdata?.investorExperience}</p>
              </Col>
              <Col lg={4} className='mb-4'>
                <h5>Minimum Investment Required </h5>
                <p>{startupdata?.minInvestment}</p>
              </Col>
              <Col lg={4} className='mb-4'>
                <h5>Maximum Investment Required </h5>
                <p>{startupdata?.maxInvestment}</p>
              </Col>

            </Row>
          </div>
        </div>

        <div className='profilegallery mb-5'>
          <h3 className='text-center'>Additional Information</h3>
          <div className='descr-content'>
            <Row>
              <Col lg={4} className='mb-4'>
                <h5>Previous Funding </h5>
                <p>{startupdata?.previousFunding}</p>
              </Col>
              <Col lg={4} className='mb-4'>
                <h5>Business Plan </h5>
                <p>{startupdata?.businessPlan}</p>
              </Col>
              <Col lg={4} className='mb-4'>
                <h5>Pitch Deck </h5>
                <p>{startupdata?.pitchDeck}</p>
              </Col>
              <Col lg={4} className='mb-4'>
                <h5>Reference Contacts </h5>
                <p>{startupdata?.referenceContacts}</p>
              </Col>
            </Row>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default Startupprofile