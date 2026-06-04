import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import { SpinLoader, useGetCompanyById } from "../../../hooks";
import { splitContentByLines } from "../../../utils";
const GetCompnybyid = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { data: company } = useGetCompanyById(params.id);
  if (!company) {
    return <SpinLoader />
  }
  return (
    <Container fluid className=" mb-5">
      <div className=" my-10 ">
        <div className=" ">
          <div className="">

            <div className="head-top">
              <Container>
                <Row className="mb-4 pt-3 pb-3 ">
                  <Col lg={2} className="text-left p-3 align-content-center">
                    {company.logoUrl && (
                      <img src={company.logoUrl} alt="Company Logo" className="industry-detail profiles max-w-xs" />
                    )}
                  </Col>
                  <Col lg={9} className="align-content-center mb-4">
                    <h2 className="heading-company mb-3">{company.name}</h2>
                    <Row>
                      <Col lg={2} className="">
                        <p>{company.currentDesignation}</p>
                      </Col>
                      <Col lg={2} className="">
                        <p><i className="fa fa-map-marker pe-2"></i>{company?.country_id?.country_name}</p>
                      </Col>
                      <Col lg={2} className="">
                        <p><i className="fa fa-map-marker pe-2"></i>{company?.state_id?.state_name}</p>
                      </Col>
                      <Col lg={2} className="">
                        <p><i className="fa fa-map-marker pe-2"></i>{company?.city_id?.city_name}</p>
                      </Col>
                    </Row>
                  </Col>
                </Row></Container>
            </div>
            <div className="grid grid-cols-2 gap-4  ">
              <Container>
                <Row className="justify-content-between">
                  <Col lg={6}>
                    <div>
                      {/* {company.achievement && company.achievement.map((ach, index) => (
                    <div key={index}>
                      <p><span className="text-dark">Year:</span> {ach.year}</p>
                      <p><span className="text-dark">Description:</span> {ach.description}</p>
                    </div>
                  ))} */}
                      <Col className="mb-4" >
                        <h3 className="heading-company text-dark">About</h3>
                        <div>
                          {company.aboutus && splitContentByLines(company.aboutus).map((block, index) => (
                            <p className="colors" key={index}>{block}</p>
                          ))}
                        </div>
                      </Col>
                      <Row className="mb-3">
                        <Col lg={4} >
                          <h5 className="text-dark">Experience:</h5>
                        </Col>
                        <Col>
                          <p className="colors">{company.totalExperience}</p>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg={4}>
                          <h5 className="text-dark">Skills I Hire For:</h5>
                        </Col>
                        <Col>
                          <p className="colors"><ul className="px-0">
                            {company.levelIHireFor && company.levelIHireFor.map((level, index) => (
                              <li className="color " key={index}>{level?.label}</li>
                            ))}
                          </ul></p>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg={4}>
                          <h5 className="text-dark">Achievement:</h5>
                        </Col>
                        <Col>
                          <p className="colors"><ul className="px-0">
                            {company.achievement && company.achievement.map((ach, index) => (
                              <div key={index}>
                                <p className="colors"><span className="colors">Year:</span> {ach.year}</p>
                                <p className="colors"><span className="colors">Description:</span> {ach.description}</p>
                              </div>
                            ))}
                          </ul></p>
                        </Col>
                      </Row>
                    </div>
                  </Col>
                  <Col lg={5}>
                    <div className="box-side">
                      <Row>
                        <Col lg={4}>
                          <h5 className="text-dark">Categories</h5>
                        </Col>
                        <Col>
                          <p className="color">  {company.industry && company.industry.map((ind, index) => (
                            <li className="color " key={index}>{ind?.label}</li>
                          ))}</p>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg={4}>
                          <h5 className="text-dark">Founded Date</h5>
                        </Col>
                        <Col>
                          <p className="colors"> {company.from}</p>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg={4}>
                          <h5 className="text-dark">Location</h5>
                        </Col>
                        <Col>
                          <p className="colors">{company?.state_id?.state_name}</p>
                        </Col>
                      </Row>
                    </div></Col>
                </Row>
                <Row>
                  {/* <Col lg={4} className="mb-4">
                  <h5>Company Name</h5>
                  <p>{company.name}</p>
                </Col>
                <Col lg={4} className="mb-4">
                  <h5>Current Designation</h5>
                  <p>{company.currentDesignation}</p>
                </Col>
                <Col lg={4} className="mb-4">
                  <h5>Website</h5>
                  <p><a href={company.website} target="_blank">{company.website}</a></p>
                </Col>
                <Col lg={12} className="mb-4">
                  <h5>All Details</h5>
                  <p>{company.allDetails}</p>
                </Col>
                <Col lg={6} className="mb-4">
                  <h5>Address 1</h5>
                  <p>{company.address1}</p>
                </Col>
                <Col lg={6} className="mb-4">
                  <h5>Address 2</h5>
                  <p>{company.address2}</p>
                </Col>
                <Col lg={4} className="mb-4">
                  <h5>Country</h5>
                  <p>{company?.country_id?.country_name}</p>
                </Col>
                <Col lg={4} className="mb-4">
                  <h5>State</h5>
                  <p>{company?.state_id?.state_name}</p>
                </Col>
                <Col lg={4} className="mb-4">
                  <h5>City</h5>
                  <p>{company.city_id?.city_name}</p>
                </Col>
                <Col lg={4} className="mb-4">
                  <h5>Total Experience in Hiring</h5>
                  <p>{company.totalExperience}</p>
                </Col>
                <Col lg={4} className="mb-4">
                  <h5>Level I Hire For</h5>
                  <p><ul>
                    {company.levelIHireFor && company.levelIHireFor.map((level, index) => (
                      <li key={index}>{level?.label}</li>
                    ))}
                  </ul></p>
                </Col>
                <Col lg={4} className="mb-4">
                  <h5>Industry</h5>
                  <p><ul>
                    {company.industry && company.industry.map((ind, index) => (
                      <li key={index}>{ind?.label}</li>
                    ))}
                  </ul></p>
                </Col>
                <Col lg={4} className="mb-4">
                  <h5>Skills I Hire For</h5>
                  <p><ul>
                    {company.skills && company.skills.map((skill, index) => (
                      <li key={index}>{skill?.label}</li>
                    ))}
                  </ul></p>
                </Col>
                <Col lg={4} className="mb-4">
                  <h5>Achievements</h5>
                  {company.achievement && company.achievement.map((ach, index) => (
                    <div key={index}>
                      <p><span className="text-dark">Year:</span> {ach.year}</p>
                      <p><span className="text-dark">Description:</span> {ach.description}</p>
                    </div>
                  ))}
                </Col> */}
                </Row>
              </Container>
            </div>
          </div>
        </div>
      </div>
    </Container >
  );
};
export default GetCompnybyid;