import React, { useState, useEffect, useRef } from 'react'
import { Button, Col, Container, Form, Row, Modal } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom';
import 'react-phone-number-input/style.css'
import API_URL from '../../../../../config';

const MedicalHospitalProfile = () => {

    const Navigate = useNavigate();

    useEffect(() => {
        const url = window.location.href;
        const url1 = url.split("/")[3];
        const url2 = url1.split("?")[1];
        const id = url2.split("=")[1];
        getHospitaldata(id)
    }, [])

    const [hospitaldata, setHospitaldata] = useState([])

    const getHospitaldata = async (id) => {
        try {
            const requestOption = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            };
            await fetch(`${API_URL}/api/getHospitalById?id=${id}`, requestOption)
                .then((res) => res.json())
                .then((data) => {
                    console.log(data)
                    setHospitaldata(data?.data[0])
                })
        } catch (error) {
            console.log(error)
        }

    }

    console.log(hospitaldata)

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
                    <Button className='addbtn' style={{ width: 'auto', marginBottom: '20px' }} onClick={() => Navigate(`/MedicalHospitalEditProfile?id=${hospitaldata?._id}`)}>Edit </Button>
                    <Button className='addbtn' style={{ width: 'auto', marginBottom: '20px' }} onClick={() => Navigate(`/profile`)}>Back To Profile </Button>
                </Row>
                <div className='profilegallery mb-5'>
                    <h3 className='text-center'>Hospital Information</h3>
                    <div className='descr-content'>
                        <Row>
                            <Col lg={4} className='mb-4'>
                                <h5>Logo </h5>
                                <img src={`${API_URL}/uploads/company_logo/${hospitaldata?.logo?.map((val) => val.filename)}`} alt='logo' />
                            </Col>
                            <Col lg={4} className='mb-4'>
                                <h5>Hospital Name </h5>
                                <p>{hospitaldata?.hospitalName}</p>
                            </Col>
                            <Col lg={4} className='mb-4'>
                                <h5>Hospital Type </h5>
                                <p>{hospitaldata?.hospitalType}</p>
                            </Col>
                            <Col lg={4} className='mb-4'>
                                <h5>Accreditation's/Certifications </h5>
                                <p>{hospitaldata?.accreditations}</p>
                            </Col>
                            <Col lg={4} className='mb-4'>
                                <h5>About the Hospital </h5>
                                <p>{hospitaldata?.aboutHospital}</p>
                            </Col>
                        </Row>
                    </div>
                </div>

                <div className='profilegallery mb-5'>
                    <h3 className='text-center'>Location and Contact Details</h3>
                    <div className='descr-content'>
                        <Row>
                            <Col lg={4} className='mb-4'>
                                <h5>Emergency Contact Number </h5>
                                <p>{hospitaldata?.emergencyContactNumber}</p>
                            </Col>
                            <Col lg={4} className='mb-4'>
                                <h5>Email address </h5>
                                <p>{hospitaldata?.email}</p>
                            </Col>
                            <Col lg={4} className='mb-4'>
                                <h5>Website URL </h5>
                                <p>{hospitaldata?.website}</p>
                            </Col>

                            <Col lg={4} className='mb-4'>
                                <h5>Main Contact Number </h5>
                                <p>{hospitaldata?.mainContact}</p>
                            </Col>
                            <Col lg={4} className='mb-4'>
                                <h5>Main Branch Address </h5>
                                <p>{hospitaldata?.mainBranchAddress}</p>
                            </Col>
                            <Col lg={4} className='mb-4'>
                                <h5>Number of Branches </h5>
                                <p>{hospitaldata?.numberOfBranches}</p>
                            </Col>
                            {/* Sub-Branches Section */}
                            <Col lg={12}>
                                <h5>Sub-Branches Information  (if any)</h5>
                                {hospitaldata?.subBranches?.map((branch, index) => (
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

                        </Row>
                    </div>
                </div>

                <div className='profilegallery mb-5'>
                    <h3 className='text-center'>Facilities & Infrastructure</h3>
                    <div className='descr-content'>
                        <Row>
                            <Col lg={4} className='mb-4'>
                                <h5>Available Facilities </h5>
                                <p>{hospitaldata?.availableFacilities}</p>
                            </Col>
                            <Col lg={4} className='mb-4'>
                                <h5>Hospital Capacity </h5>
                                <p>{hospitaldata?.hospitalCapacity}</p>
                            </Col>
                            <Col lg={4} className='mb-4'>
                                <h5>Parking Facilities  </h5>
                                <p>{hospitaldata?.parkingFacilities}</p>
                            </Col>
                            <Col lg={4} className='mb-4'>
                                <h5>Visiting Hours </h5>
                                <p>{hospitaldata?.visitingHours}</p>
                            </Col>
                            <Col lg={4} className='mb-4'>
                                <h5>Appointment Booking Process </h5>
                                <p>{hospitaldata?.appointmentProcess}</p>
                            </Col>
                            <Col lg={4} className='mb-4'>
                                <h5>Cancellation/Rescheduling Policies </h5>
                                <p>{hospitaldata?.cancellationPolicies}</p>
                            </Col>
                            <Col lg={4} className='mb-4'>
                                <h5>24/7 Services Available </h5>
                                <p>{hospitaldata?.twentyFourSeven}</p>
                            </Col>
                            <Col lg={4} className='mb-4'>
                                <h5>Ambulance Service Information</h5>
                                <p>{hospitaldata?.ambulanceService}</p>
                            </Col>
                        </Row>
                    </div>
                </div>

                <div className='profilegallery mb-5'>
                    <h3 className='text-center'>Insurance Partners</h3>
                    <div className='descr-content'>
                        <Row>
                            <Col lg={4} className='mb-4'>
                                <h5>List Insurance Partners </h5>
                                <p>{hospitaldata?.insurancePartners}</p>
                            </Col>
                            <Col lg={4} className='mb-4'>
                                <h5>Cashless Facilities </h5>
                                <p>{hospitaldata?.cashlessFacilities}</p>
                            </Col>
                            <Col lg={4} className='mb-4'>
                                <h5>Insurance Process Details </h5>
                                <p>{hospitaldata?.insuranceProcess}</p>
                            </Col>
                        </Row>
                    </div>
                </div>
                <Col lg={12}>
                <div className='profilegallery mb-5'>
                        <h3 className='text-center'>Media Gallery </h3>
                        <Row>
                            {
                                hospitaldata?.mediaGallery?.map((val) => (
                                    <>
                                        <Col lg={3}>
                                            {val?.mimetype?.startsWith("image") ? (
                                                <img
                                                    className="photoorodfd mb-2 mt-4"
                                                    src={`${API_URL}/uploads/photos/${val.filename}`}
                                                    alt="profile"
                                                    onClick={() => openPhotoModal(val.filename)}
                                                />
                                            ) : val?.mimetype?.startsWith("video") ? (
                                                    <video className="photoorodfd mb-2 mt-4" controls>
                                                    <source src={`${API_URL}/uploads/photos/${val.filename}`}  />
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
            </Container>
        </div>
    )
}

export default MedicalHospitalProfile