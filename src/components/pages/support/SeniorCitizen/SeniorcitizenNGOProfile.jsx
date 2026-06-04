import React, { useState, useEffect, useRef } from 'react'
import { Col, Container, Form, Row, Button, Modal } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import PhoneInput, { formatPhoneNumber, formatPhoneNumberIntl, isValidPhoneNumber } from "react-phone-number-input";
import en from 'react-phone-number-input/locale/en';
import 'react-phone-number-input/style.css';
import profile from "../../../../assets/profile.png";
import companylogo from "../../../../assets/companylogo.png"
import Select from 'react-select';
import API_URL from '../../../../../config';

const SeniorcitizenNGOProfile = () => {


  const Navigate = useNavigate();

  useEffect(() => {
    const url = window.location.href;
    const url1 = url.split("/")[3];
    const url2 = url1.split("?")[1];
    const id = url2.split("=")[1];
    getNGOdata(id)
  }, [])

  const [ngodata, setNGOdata] = useState([])

  const getNGOdata = async (id) => {
    try {
      const requestOption = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };
      await fetch(`${API_URL}/api/getSeniorCitizenNGOdataById?id=${id}`, requestOption)
        .then((res) => res.json())
        .then((data) => {
          console.log(data)
          setNGOdata(data?.data[0])
        })
    } catch (error) {
      console.log(error)
    }

  }

  console.log(ngodata)

  const [photomodalIsOpen, setPhotoModalIsOpen] = useState(false);
  const [photoname, setPhotoName] = useState('')

  const openPhotoModal = (val) => {
    console.log(val)
    setPhotoName(val)
    setPhotoModalIsOpen(true);
    console.log("open")
  }
  const closePhotoModal = () => {
    setPhotoModalIsOpen(false);
    console.log("close")
  }



  return (
    <div>
      <Container fluid className='matrimonialform mt-5 mb-5'>
        <Row style={{ justifyContent: 'end' }}>
          <Button className='addbtn' style={{ width: 'auto', marginBottom: '20px' }} onClick={() => Navigate(`/SeniorcitizenNGOEditProfile?id=${ngodata?._id}`)}>Edit </Button>
          <Button className='addbtn' style={{ width: 'auto', marginBottom: '20px' }} onClick={() => Navigate(`/profile`)}>Back To Profile </Button>
        </Row>
        <form >
          <div className='profilegallery mb-5'>
            <h3 className='text-center'>NGO Details</h3>
            <div className='descr-content'>
              <Row>
                <Col lg={4} className='mb-4'>
                  <h5>NGO Name </h5>
                  <p>{ngodata?.ngoName}</p>
                </Col>
                <Col lg={4} className='mb-4'>
                  <h5>Registration Number </h5>
                  <p>{ngodata?.registrationNumber}</p>
                </Col>
                <Col lg={4} className='mb-4'>
                  <h5>Year of Establishment </h5>
                  <p>{ngodata?.yearOfEstablishment}</p>
                </Col>
                <Col lg={4} className='mb-4'>
                  <h5>About the NGO </h5>
                  <p>{ngodata?.aboutNgo}</p>
                </Col>
                <Col lg={4} className='mb-4'>
                  <h5>Type of NGO </h5>
                  <p>{ngodata?.ngoType?.map(val => val).join(' , ')}</p>
                </Col>
                <Col lg={4} className='mb-4'>
                  <h5>Primary Service Offered </h5>
                  <p>{ngodata?.primaryService}</p>
                </Col>
                <Col lg={4} className='mb-4'>
                  <h5>Logo </h5>
                  <img src={`${API_URL}/uploads/company_logo/${ngodata?.logo?.map((val) => val.filename)}`} alt='logo' />
                </Col>
              </Row>
            </div>
          </div>

          <div className='profilegallery mb-5'>
            <h3 className='text-center'>NGO Contact Details</h3>
            <div className='descr-content'>
              <Row>
                <Col lg={4} className='mb-4'>
                  <h5>Primary Contact Name </h5>
                  <p>{ngodata?.primaryContactName}</p>
                </Col>
                <Col lg={4} className='mb-4'>
                  <h5>Primary Contact Role </h5>
                  <p>{ngodata?.primaryContactRole}</p>
                </Col>
                <Col lg={4} className='mb-4'>
                  <h5>Primary Contact Number </h5>
                  <p>{ngodata?.primaryContactNumber}</p>
                </Col>
                <Col lg={4} className='mb-4'>
                  <h5>Primary Email </h5>
                  <p>{ngodata?.primaryEmail}</p>
                </Col>
                <Col lg={4} className='mb-4'>
                  <h5>Office Address </h5>
                  <p>{ngodata?.officeAddress}</p>
                </Col>
                <Col lg={12}>
                  <h5>Sub-Branches Information  (if any) </h5>
                  {ngodata?.subBranches?.map((branch, index) => (
                    <div key={index} className='mb-3'>
                      <Row>
                        <Col lg={4} className='mb-4'>
                          <h5>Contact Number</h5>
                          <p>{branch?.contactNumber}</p>
                        </Col>
                        <Col lg={4} className='mb-4'>
                          <h5>Sub-Branch Address</h5>
                          <p>{branch?.address}</p>
                        </Col>

                     
                      </Row>
                    </div>
                  ))}
                </Col>
                <Col lg={4} className='mb-4'>
                  <h5>Website </h5>

                  <p>{ngodata?.website}</p>
                </Col>
                <Col lg={4} className='mb-4'>
                  <h5>Country </h5>


                  <p>{ngodata?.countrydetails?.map(val => val?.country_name)}</p>
                </Col>
                <Col lg={4} className='mb-4'>
                  <h5>State </h5>

                  <p>{ngodata?.statedetails?.map(val => val?.state_name)}</p>
                </Col>
                <Col lg={4} className='mb-4'>
                  <h5>City </h5>

                  <p>{ngodata?.citydetails?.map(val => val?.city_name)}</p>
                </Col>
              </Row>
            </div>
          </div>

          <div className='profilegallery mb-5'>
            <h3 className='text-center'>Additional Information</h3>
            <div className='descr-content'>
              <Row>

                <Col lg={4} className='mb-4'>
                  <h5>Operating Hours </h5>

                  <p>{ngodata?.operatingHours}</p>
                </Col>
                <Col lg={4} className='mb-4'>
                  <h5>Availability </h5>

                  <p>{ngodata?.availability}</p>
                </Col>
                <Col lg={4} className='mb-4'>
                  <h5>Number of Volunteers </h5>

                  <p>{ngodata?.numberOfVolunteers}</p>
                </Col>
                <Col lg={4} className='mb-4'>
                  <h5>Services Description </h5>

                  <p>{ngodata?.servicesDescription}</p>
                </Col>
                <Col lg={4} className='mb-4'>
                  <h5>Success Stories </h5>

                  <p>{ngodata?.successStories}</p>
                </Col>
              </Row>
            </div>
          </div>
          {/* <div className='profilegallery mb-5'>
            <h3 className='text-center'>Media Gallery </h3>
            <div className='descr-content'>
              <div className="image-upload">
                <h5 style={{ cursor: "pointer" }} htmlFor="file_upload">
                  <div className="h-100">
                    <div className="dplay-tbl">
                      <div className="dplay-tbl-cell">
                        <i className="fa fa-cloud-upload" />
                        <h5><b>Choose Your Media (Photos/Videos)</b></h5>
                        <h6 className="mt-10 mb-70">Or Drop Your Media Here</h6>
                      </div>
                    </div>
                  </div>
                  <input
                    type="file"
                    id="file_upload"
                    className="image-input"

                    multiple
                    accept=".jpg, .jpeg, .png, .mp4, .mov, .avi"
                  />
                </h5>
              </div>
              <div>
              </div>
            </div>
          </div> */}
          <Col lg={12}>
            <div className='profilegallery mb-5'>
              <h3 className='text-center'>Media Gallery </h3>
              <Row>
                {
                  ngodata?.mediaGallery?.map((val, index) => (
                    <>  
                      <Col lg={3}>
                        {val?.mimetype?.startsWith("image") ? (
                          <img
                            className="photoorodfd mb-4 mt-4"
                            src={`${API_URL}/uploads/photos/${val.filename}`}
                            alt="profile"
                            onClick={() => openPhotoModal(val.filename)}
                          />
                        ) : val?.mimetype?.startsWith("video") ? (
                          <video className="photoorodfd mb-4 mt-4" controls>
                            <source src={`${API_URL}/uploads/photos/${val.filename}`} />
                          </video>
                        ) : null}
                      </Col>

                      <Modal
                        size='md'
                        show={photomodalIsOpen}
                        onHide={closePhotoModal}
                        dialogClassName="modal-dialog-centered"
                        contentClassName="modal-content"
                      >
                        <button onClick={closePhotoModal} className="modal-close-btn">X</button>
                        <Modal.Body className="modal-body">
                          <img
                            src={`${API_URL}/uploads/photos/${photoname}`}
                            alt="Profile"
                            className="modal-img"
                          />
                        </Modal.Body>
                      </Modal>
                    </>
                  ))
                }
              </Row>
            </div>
          </Col>
        </form>
      </Container>
    </div>
  );
};

export default SeniorcitizenNGOProfile;
