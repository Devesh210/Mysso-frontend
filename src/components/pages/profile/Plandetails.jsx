import React, { useEffect, useState } from 'react'
import API_URL from '../../../../config';
import { Container,Col, Accordion } from 'react-bootstrap';


const Plandetails = () => {

    const [userdata, setUserdata] = useState([]);



    useEffect(() => {
        if (localStorage.getItem('token')) {
            getUserData();
        }
    }, []);

    const getUserData = async () => {
        try {
            const requestOptions = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            };

            fetch(`${API_URL}/api/getuserdetail`, requestOptions)
                .then(response => response.json())
                .then(data => {
                    console.log(data.data);
                    if (data.status == 200) {
                        setUserdata(data?.data[0]);
                    }
                }
                );
        }
        catch (err) {
            console.error(err.message);
        }
    }

    console.log('logindetails', userdata);

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // getMonth() is zero-based
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }


    return (
        <div>
            <section className='memberplanboxx'>
               <Accordion defaultActiveKey="0">
                    <Accordion.Item eventKey="0">
                        <Accordion.Header className='text-center'><h3>Matrimony Plan</h3></Accordion.Header>
                        <Accordion.Body>
                <Container fluid className='plandetail'>
                    <div className="container">
                        <div className="row">
                            <div className=" col-lg-4">

                                <p>Payment Id: <strong>{userdata.matrimonyplans?.payment_id}</strong></p>
                                 <p>Payment Date: <strong>{formatDate(userdata.matrimonyplans?.start_date)}</strong></p>
                                <p>Start Date: <strong>{formatDate(userdata.matrimonyplans?.start_date)}</strong></p>
                                <p>End Date: <strong>{formatDate(userdata.matrimonyplans?.end_date)}</strong></p>
                                <hr />
                                <p>Total Amount Paid: <strong>{userdata?.matrimonyplans_details?.price}/-</strong></p>

                            </div>
                            <div className="col-md-6 col-lg-4">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="plan-name">{userdata.matrimonyplans_details?.name} </div>
                                        <div className="plan-description">
                                            <div className="plan-price month">
                                                INR {userdata?.matrimonyplans_details?.price}<sub> / <span>3 months</span></sub>
                                            </div>
                                            {/* <h5 className='planmembershipp'>{plan.name}</h5> */}
                                            <span style={{ fontSize: '13px' }}>( Applicable Charges & Levied from time to time )</span>
                                            <hr />
                                            <ul>
                                                {/* <li>Match, Chat & Mee</li>
                                                    <li>5 Super Likes a week</li>
                                                    <li>Hide Advertisements</li>
                                                    <li className='noneed'>1 Free Boost a month</li>
                                                    <li className='noneed'>New Top Picks every day</li>
                                                    <li className='noneed'>Message before Matching</li>
                                                    <li className='noneed'>Prioritised Likese</li>
                                                    <li className='noneed'>See the Likes you’ve sent in the last 7 days,</li> */}
                                                {userdata?.matrimonyplans_details?.content.map((detail, index) => (
                                                    <li>{detail}</li>
                                                ))}
                                            </ul>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
                </Accordion.Body>
                    </Accordion.Item>
                    </Accordion>
            </section>
        </div>
    )
}

export default Plandetails