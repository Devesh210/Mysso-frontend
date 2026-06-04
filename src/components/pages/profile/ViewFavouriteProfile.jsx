import React, { useState, useEffect } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import API_URL from '../../../../config';
import { useNavigate } from 'react-router-dom';
import Banner from '../matrimonialsearch/Banner';
import Nodatafound from '../nodatafound/Nodatafound';

const ViewFavouriteProfile = () => {

    const Navigate = useNavigate();
    const token = localStorage.getItem('token');
    const [user, setUser] = useState({});
    const [matrimonydata, setMatrimonyData] = useState([]);

    useEffect(() => {
        getdetails();
    }, [])

    const getdetails = () => {

        try {

            const requestOptions = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            };
            fetch(`${API_URL}/api/getFavouriteProfiles`, requestOptions)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    setUser(data.data);
                    setMatrimonyData(data.data);
                });

        } catch (error) {
            console.log(error);
        }
    }

    // const removelikedprofile = async (id) => {
    //     try {
    //         console.log("Shortlisted removed")
    //         const requestOption = {
    //             method: "PUT",
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 'Authorization': 'Bearer ' + localStorage.getItem('token')
    //             },
    //             body: JSON.stringify({ profileId: id }),
    //         };



    //         console.log(id)
    //         // return false
    //         await fetch(`${API_URL}/api/removelikedprofile`, requestOption)
    //             .then((res) => res.json())
    //             .then((data) => {
    //                 console.log(data);
    //                 if (data.status === 200) {
    //                     swal({
    //                         text: data.message,
    //                         icon: "success"
    //                     });
    //                     getdetails()
    //                 } else {
    //                     swal(
    //                         {
    //                             text: data.message,
    //                             icon: "warning"
    //                         }
    //                     );
    //                 }
    //             })
    //     } catch (err) {
    //         console.log(err)
    //     }
    // }


    return (
        <div>
            <Banner />
            <Container fluid className='matrimonial-search'>
                {matrimonydata?.length > 0 ? 
                    matrimonydata?.map((data, index) => (
                    <Col lg={10} key={index} style={{ marginLeft: '10%' }}>
                        <div className='searchrightside' key={index}>
                            <Row>
                                <Col lg={3}>
                                    <div className='profiledetails'>
                                        {data?.profilePic?.map((profile, index1) => (
                                            <img key={index1} src={`${API_URL}/uploads/profile_pic/${profile?.filename}`} alt="" />
                                        ))}
                                        <h3>{`${data?.firstName} ${data?.lastName}`}</h3>
                                        <p><span>Member ID:</span> {data.memberid}</p>
                                    </div>
                                </Col>
                                <Col lg={9}>
                                    <div className='dataright'>
                                        <Row className='profilelocation'>
                                            <Col lg={6}>
                                                <span><img src={location} alt="" />{` ${data?.present_city_details?.map((val) => val?.city_name)}, ${data?.present_state_details?.map((val) => val?.state_name)}, ${data?.present_country_details?.map((val) => val?.country_name)} `}</span>
                                            </Col>
                                            <Col lg={6}>
                                                {/* <button className="view-user-profile" onClick={() => removelikedprofile(data._id)}>Remove Profile</button> */}
                                                <button className="view-user-profile" onClick={() => Navigate(`/Matrimonialprofile?id=${data._id}`)}>View Profile</button>
                                            </Col>
                                        </Row>
                                        <Row style={{ marginLeft: '0px', marginRight: '0px' }}>
                                            <Col lg={3}>
                                                <button className='profiledataa'>{`${data.age} Years Old`}</button>
                                            </Col>
                                            <Col lg={3}>
                                                <button className='profiledataa'>{data?.marital_status_details?.map((val) => val?.type)}</button>
                                            </Col>
                                            <Col lg={3}>
                                                <button className='profiledataa'>{data?.present_country_details?.map((val) => val?.country_name)}</button>
                                            </Col>
                                            <Col lg={3}>
                                                <button className='profiledataa'>{data?.nationality_details?.map((val) => val?.country_name)}</button>
                                            </Col>
                                            <Col lg={3}>
                                                <button className='profiledataa'>{data?.caste}</button>
                                            </Col>
                                            <Col lg={3}>
                                                <button className='profiledataa'>{data?.mother_tongue_details?.map((val) => val?.type)}</button>
                                            </Col>
                                            <Col lg={3}>
                                                <button className='profiledataa'>
                                                    {data?.career?.length > 0 && data.career[data.career.length - 1].occupation}
                                                </button>
                                            </Col>
                                            <Col lg={3}>
                                                <button className='profiledataa'>
                                                    {data?.education.length > 0 && data.education[data.education.length - 1].degree}
                                                </button>
                                            </Col>
                                        </Row>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                ))
                :
                    <div >
                        <Nodatafound />
                    </div>
                }
            </Container>
        </div>
    )
}

export default ViewFavouriteProfile;