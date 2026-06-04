import React from 'react';
import { useNavigate } from 'react-router-dom'
import { Carousel, Button, Container, Card, Badge } from 'react-bootstrap';

const LatestJobCards = ({ job }) => {
    const navigate = useNavigate();
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

        <div className=' rounded-md shadow-xl bg-white  cursor-pointer'>
            <Card className="job-card mb-4">
                <Card.Body className="text-center">
                    <div className="d-flex justify-content-between">
                        <Card.Text className="text-muted">
                            <Badge className={`job-type ${getBadgeBorderClass(job?.jobType)} `} >{job?.jobType}</Badge>
                            {/* {daysAgoFunction(job?.createdAt) === 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`} */}
                        </Card.Text>
                    </div>
                    <div>
                        <Card.Text className="text-center mt-4 mb-4" >
                            <img src={job?.company?.logoUrl} alt={job?.company?.name} className="job-logo text-center" />
                        </Card.Text>
                    </div>
                    <div>
                        <Card.Title className="job-head mt-4">{job?.title}</Card.Title>
                    </div>
                    <div>
                        <Card.Title className='job-location mt-3'>{job?.city_id?.city_name}</Card.Title>
                    </div>
                    {/* <div className='mt-3'>
                        <Badge className='text-dark bg-light p-2'>{job?.position} Positions</Badge>
                    </div> */}

                    <div className="d-flex justify-content-center  mt-3 mb-3">
                        <Button disabled={job?.isApplied} onClick={() => navigate(`/description/${job?._id}`)} variant="outline-primary" className='login btn btn-primary text-light'>Apply Now</Button>
                    </div>

                </Card.Body>
            </Card>
        </div>
    )
}

export default LatestJobCards