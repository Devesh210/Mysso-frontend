import React from 'react';
import { Button, Card, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
// import '../../Jobportal.css'; // Import your CSS file

const Job = ({ job }) => {
    const navigate = useNavigate();

    const daysAgoFunction = (mongodbTime) => {

        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
    };
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
        <Card className="job-card " >
            <Card.Body className="text-center">
                <div className="d-flex justify-content-between">
                    <Card.Text className="text-muted job-head">
                        <Badge className={`job-type ${getBadgeBorderClass(job?.jobType)} `} >{job?.jobType}</Badge>
                        {job?.created_at && daysAgoFunction(job?.created_at) === 0 ? "Today" : `${daysAgoFunction(job?.created_at)} days ago`}
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


                <div className="d-flex justify-content-center  asss mt-3 mb-3">
                    <Button disabled={job?.isApplied} onClick={() => navigate(`/description/${job?._id}`)} variant="outline-primary" className='login btn btn-primary text-light'>{job?.isApplied ? "Applied" : "Apply Now"}</Button>
                </div>


                {/* <div className="d-flex align-items-center my-2">
                    <Button variant="outline-secondary" className="p-2 me-2">
                        <img src={job?.company?.logo} alt={job?.company?.name} className="job-logo" />
                    </Button>
                    <div>
                        <Card.Title className="mb-1">{job?.company?.name}</Card.Title>
                        <Card.Subtitle className="text-muted">{job?.company?.location}</Card.Subtitle>
                    </div>
                </div>

                <Card.Title className="mt-2">{job?.title}</Card.Title>
                <Card.Text>{job?.description}</Card.Text>

                <div className="d-flex flex-wrap gap-2 mt-3">
                    <Badge bg="primary">{job?.position} Positions</Badge>
                    <Badge bg="danger">{job?.jobType}</Badge>
                    <Badge bg="purple">{job?.salary} LPA</Badge>
                </div>

                <div className="d-flex justify-content-end mt-3">
                    <Button onClick={() => navigate(`/description/${job?._id}`)} variant="outline-primary">Details</Button>
                </div> */}
            </Card.Body>
        </Card>
    );
};

export default Job;
