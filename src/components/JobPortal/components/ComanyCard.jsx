import React from 'react'
import { Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
const ComanyCard = ({ item }) => {
    const navigate = useNavigate();
    return (
        <div className=' rounded-md shadow-xl bg-white  cursor-pointer'>
            <Card className="job-card mb-4">
                <Card.Body className="text-center">
                    <div>
                        <Card.Text className="text-center industry-image mt-4 mb-2" >
                            <img
                                src={item?.company?.logoUrl}
                                alt=""
                                className="job-logo post-img"
                            />
                            {/* <img src={job?.company?.logoUrl} alt={job?.company?.name} className="job-logo text-center" /> */}
                        </Card.Text>
                    </div>
                    <div>
                        <Card.Title className="job-head mt-4">   <a href="#">{item?.company?.name}</a></Card.Title>
                    </div>
                    <div>
                        <Card.Title className='job-location mt-3'> {item?.company?.location}</Card.Title>
                    </div>
                    <div className='mt-2 d-inline-flex'>
                        {item?.company?.industry?.map((industry, index) => (
                            <h6 key={index} className='industry mx-1'>{industry.title}</h6>
                        ))}
                    </div>
                    <div className="d-flex justify-content-center  mt-3 mb-3">
                        <Button onClick={() => navigate(`/company/${item?.company?._id}`)} variant="outline-primary" className='login btn btn-primary text-light'> Open Job-{item?.jobcount}</Button>
                    </div>
                </Card.Body>
            </Card>
        </div>
    )
}
export default ComanyCard