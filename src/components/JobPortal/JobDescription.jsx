import React, { useEffect, useState } from 'react';
import { Badge, Container, Button, Modal, Row, Col, Card, Alert } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import API_URL from '../../../config';
import JobApplicationForm from './Modals/JobApplicationForm';
import HeroSection from './HeroSection';
import icon1 from '../../assets/Jobs/Vector.png'
import icon2 from '../../assets/Jobs/Vector-2.png'
import icon3 from '../../assets/Jobs/Vector-3.png'
import icon4 from '../../assets/Jobs/Vector-4.png'
import icon5 from '../../assets/Jobs/Vector-5.png'
import icon6 from '../../assets/Jobs/Vector-6.png'
import SimilarJobs from './components/SimilarJobs';
import { useGetJobByIdQuery } from '../../redux/apiSlice';
import { SpinLoader } from '../../hooks';

const JobDescription = () => {
    const params = useParams();
    const jobId = params.id;
    const { token, role } = useSelector(store => store.auth);
    const { data: singleJob, isLoading: issingleJobLoading, refetch: singleJObrefetch, error } = useGetJobByIdQuery({ id: jobId }, { skip: !jobId });

    const [openModal, setOpenModal] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        try {
            singleJObrefetch()
        } catch (error) {
            return;
        }
    }, [jobId, token]);

    const handleJobClick = (e) => {
        e.preventDefault();
        if (!token) {
            swal("Error", "Please Login First", "error").then(() => {
                return navigate("/login");
            })
        } else if (!role) {
            swal("Error", "Please Add Job Seeker details", "error").then(() => {
                return navigate("/profile", { state: { isApplyjob: true } });
            })
        }
        else if (!singleJob?.job?.isApplied) {
            setOpenModal(true);
        }
    }
    const getBadgeBorderClass = (jobType) => {
        switch (jobType) {
            case "Full-time":
                return "badge-full-time ";
            case "Part-time":
                return "badge-part-time";
            case "Contract":
                return "badge-contract";
            case "Temporary":
                return "badge-temporary";
            case "Internship":
                return "badge-internship";
            case "Remote":
                return "badge-remote";
            default:
                return "badge-default";
        }
    };
    return (
        <>

            {
                issingleJobLoading ? <SpinLoader />
                    : error ? (<Alert variant='danger'>{error?.data?.message}</Alert>) :
                        <>
                            <div>
                                <Container className='mt-4'>
                                    <div>
                                        <div className='rounded-md shadow-xl filter-left bg-jobs p-2 mb-3 '>
                                            <Row className='justify-content-center mt-4 mb-2 '>
                                                <Col lg={3} md={12} className='px-4'>
                                                    <Card className="job-card mb-4">
                                                        <Card.Body className="text-center">
                                                            <div className=" justify-content-between">
                                                                <Card.Text >
                                                                    <Row className='justify-content-between'>
                                                                        <Col className=' text-start'> <Badge className={`job-type ${getBadgeBorderClass(singleJob?.job?.jobType)} `} >{singleJob?.job?.jobType}</Badge></Col>

                                                                    </Row>
                                                                </Card.Text>
                                                            </div>
                                                            <div>
                                                                <Card.Text className="text-center mt-4 mb-4" >
                                                                    <img alt="alt-img" src={singleJob?.job?.company?.logoUrl} className="job-logo text-center" />
                                                                </Card.Text>
                                                            </div>
                                                            <div>
                                                                <Card.Title className="job-head mt-4">{singleJob?.job?.title}</Card.Title>
                                                            </div>
                                                            <div>
                                                                <Card.Title className='job-location mt-3'>{singleJob?.job?.city_id?.city_name}</Card.Title>
                                                            </div>
                                                            <div className="d-flex justify-content-center  mt-3 mb-3">
                                                                <Button
                                                                    onClick={handleJobClick}
                                                                    disabled={singleJob?.job?.isApplied}
                                                                    variant={'search-partner'}
                                                                >
                                                                    {!token ? 'Please Login First' : singleJob?.job?.isApplied ? 'Applied' : 'Apply Now'}
                                                                </Button>
                                                                {/* <Button variant="outline-primary" className='login btn btn-primary text-light'>Apply Now</Button> */}
                                                            </div>
                                                        </Card.Body>
                                                    </Card>
                                                </Col>
                                                <Col lg={9} className='justify-content-center d-grid'>
                                                    <div>

                                                        <p> <span className=''><img src={icon2} className='image-icon' /></span><strong className='description-head'>Package:</strong> <span className='descript-text'>{`${singleJob?.job?.salary_range?.min} lacs  to  ${singleJob?.job?.salary_range?.max} lacs / Yearly`} </span></p>
                                                        {/* <p> <span className='px-1'><img src={icon4} className='image-icon' /></span><span className='descript-text'>91 234 567 8765</span></p>
                                        <p> <span className=''><img src={icon5} className='image-icon' /></span><span className='descript-text'>mail@example.com</span></p> */}
                                                        <p> <span className=''><img src={icon6} className='image-icon' /></span> <span className='descript-type'>{singleJob?.job?.jobType}</span></p>
                                                        <p> <span className=''><img src={icon3} className='image-icon' /></span> <span className='descript-position'>{singleJob?.job?.position} Open Position</span></p>
                                                        <p> <span className=''><img src={icon1} className='image-icon' /></span> <span className='descript-text'>{`${singleJob?.job?.experience?.min_years}- ${singleJob?.job?.experience?.max_years} Years `}  Exp.</span></p>
                                                        {
                                                            singleJob?.job?.company?.website && <p> <span className=''><img src={icon3} className='image-icon' /></span> <span className='descript-text'>{singleJob?.job?.company?.website}</span></p>
                                                        }

                                                        <p> <span className=''><img src={icon1} className='image-icon' /></span> <span className='descript-text'>{singleJob?.job?.education}</span></p>
                                                    </div>
                                                </Col>
                                                {/* <Col lg={3} md={12}>
                                                    <div className='filter-left  bg-transparent'>
                                                        <h3 className='head-describe text-start px-4'>Job Location</h3>
                                                        <div className='filter-fields details-field'>

                                                        </div>
                                                    </div>
                                                </Col> */}
                                            </Row>
                                        </div>
                                        <Row className='justify-content-between mb-3'>
                                            <Col lg={12} md={12}>
                                                <div className='filter-left  bg-transparent'>
                                                    <h3 className='head-describe text-start px-4' >Job Description</h3>
                                                    <div className='filter-fields details-field'>
                                                        <div dangerouslySetInnerHTML={{ __html: singleJob?.job?.description }}>

                                                        </div>
                                                        {/* <p className='text-brown' style={{ wordBreak: "break-all" }}>{singleJob?.job?.description}</p> */}
                                                    </div>
                                                </div>
                                            </Col>

                                        </Row>
                                        {singleJob?.job?.skills && singleJob?.job?.skills.length > 0 && (
                                            <Row className='justify-content-between mt-4 mb-4   '>
                                                <Col lg={12} md={12}>
                                                    <div className='filter-left bg-transparent'>
                                                        <h3 className='head-describe text-start px-4' >Job Skill</h3>
                                                        <div className='filter-fields details-field'>
                                                            <ul className='list-group'>
                                                                {singleJob?.job?.skills?.map((item) => (
                                                                    <li className='list-group-item text-brown border-0 p-0 mb-2 '> <span className=' px-3'><i className='describ-icon fa fa-check'></i></span>{item}</li>

                                                                ))}
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </Col>
                                            </Row>
                                        )}

                                        {singleJob?.job?.requirements && (
                                            <Row className='justify-content-between mb-3'>
                                                <Col lg={12} md={12}>
                                                    <div className='filter-left  bg-transparent'>
                                                        <h3 className='head-describe text-start px-4' >Job Requirements</h3>
                                                        <div className='filter-fields details-field'>
                                                            <p>
                                                                {singleJob?.job?.requirements}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </Col>

                                            </Row>
                                        )}

                                        {
                                            singleJob?.job?.benefits && singleJob?.job?.benefits.length > 0 && (
                                                <Row className='justify-content-between mt-4 mb-5'>
                                                    <Col lg={12} md={12}>
                                                        <div className='filter-left  bg-transparen'>
                                                            <h3 className='head-describe text-start px-4' >Job Perks & Benefits</h3>
                                                            <div className='filter-fields details-field'>
                                                                <ul className='list-group'>
                                                                    {singleJob?.job?.benefits?.map((item) => (
                                                                        <li className='list-group-item text-brown border-0 p-0 mb-2 '> <span className=' px-3'><i className='describ-icon3 fa fa-check'></i></span>{item}</li>

                                                                    ))}


                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </Col>
                                                </Row>
                                            )
                                        }

                                    </div>
                                    <div className='mt-5'>
                                        {singleJob?.job?.category && <SimilarJobs category={singleJob?.job?.category} jobId={jobId} />}
                                    </div>


                                </Container>


                            </div>
                            <Modal show={openModal} centered onHide={() => setOpenModal(false)}>
                                {/* <Modal.Header closeButton>
                    <Modal.Title>Apply for Job</Modal.Title>
                </Modal.Header> */}
                                <Modal.Body className='p-0'>
                                    <JobApplicationForm
                                        singleJob={singleJob && singleJob.job ? singleJob.job : {}}
                                        jobId={jobId}
                                        setOpenModal={setOpenModal}
                                        singleJObrefetch={singleJObrefetch}
                                    />
                                </Modal.Body>
                            </Modal>
                        </>

            }

        </>
    );
};

export default JobDescription;
