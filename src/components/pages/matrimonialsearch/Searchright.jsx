import React, { useState, useEffect } from 'react'

import { Col, Row } from 'react-bootstrap'

import profile from "../../../assets/matrimonial/searchimg.png"
import location from "../../../assets/matrimonial/location.svg"
import API_URL from '../../../../config'
import { useNavigate } from 'react-router-dom'
import { useFilterContext } from '../../../services/FilterContext'
import ReactPaginate from "react-paginate";
import Nodatafound from '../nodatafound/Nodatafound'
import Spinner from 'react-bootstrap/Spinner' 
import { RotatingLines } from 'react-loader-spinner'

const Searchright = ({ data }) => {
    const Navigate = useNavigate()
    const { matrimonyfilter, setMatrimonyFilter, getMatrimonyData, matrimonydata, pageCount,page, handlePageChange } = useFilterContext();

    console.log("pageCount>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", pageCount)
    console.log("matrimonydata>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", matrimonydata)
    console.log("matrimonyfilter>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", matrimonyfilter)
    console.log("handlePageChange>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", handlePageChange)


    // New loading state
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true); // Show loader before fetching data
        getMatrimonyData(matrimonyfilter).finally(() => {
            setLoading(false); // Hide loader after data is fetched
        });
    }, [matrimonyfilter, page]); // Run effect on filter or page change


    return (
        <div>
            {/* Show loader while loading */}
            {loading ? (
                // <div className="d-flex justify-content-center my-4">
                //     <Spinner animation="border" role="status">
                //         <span className="sr-only">Loading...</span>
                //     </Spinner>
                // </div>
                <div className='loader my-5'>
                    <RotatingLines
                        visible={true}
                        height="96"
                        width="96"
                        color="grey"
                        strokeWidth="5"
                        animationDuration="0.75"
                        ariaLabel="rotating-lines-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                        className="loader-spinner"
                        strokeColor='#E36414'

                    />
                </div>
            ) : (
                <>
                    {/* Display the fetched matrimony data */}
            { matrimonydata?.length > 0 ?
            
            matrimonydata?.map((data, index) => (
            <div className='searchrightside' key={index}>
                <Row>
                    <Col lg={3}>
                        <div className='profiledetails'>
                            {data?.profilePic?.map((profile, index) => (
                                <img key={index} src={`${API_URL}/uploads/profile_pic/${profile?.filename}`} alt="" />
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
                                        <button className="view-user-profile" onClick={() => Navigate(`/Matrimonialprofile?id=${data._id}`)}>View Profile</button>
                                </Col>
                            </Row>
                            <Row style={{ marginLeft: '0px', marginRight: '0px' }}>
                                <Col lg={3}>
                                        <button className='profiledataa text-break'>{`${data.age} Years Old`}</button>
                                </Col>
                                <Col lg={3}>
                                        <button className='profiledataa text-break'>{data?.marital_status_details?.map((val) => val?.type)}</button>
                                </Col>
                                <Col lg={3}>
                                        <button className='profiledataa text-break'>{data?.present_country_details?.map((val) => val?.country_name)}</button>
                                </Col>
                                <Col lg={3}>
                                        <button className='profiledataa text-break'>{data?.nationality_details?.map((val) => val?.country_name)}</button>
                                </Col>
                                <Col lg={3}>
                                        <button className='profiledataa text-break'>{data?.caste}</button>
                                </Col>
                                <Col lg={3}>
                                        <button className='profiledataa text-break'>{data?.mother_tongue_details?.map((val) => val?.type)}</button>
                                </Col>
                                <Col lg={3}>
                                        <button className='profiledataa text-break'>
                                            {data?.career?.length > 0 && data.career[data.career.length - 1].occupation}
                                        </button>
                                </Col>
                                <Col lg={3}>
                                        <button className='profiledataa text-break'>
                                            {data?.education.length > 0 && data.education[data.education.length - 1].degree}
                                    </button>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>
                   
            </div>
            ))

            :
            <div >
                    <Nodatafound />
            </div>
            }

            {matrimonydata?.length > 0 ?
            <ReactPaginate
                previousLabel={"Previous"}
                nextLabel={"Next"}
                breakLabel={"..."}
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={3}
                onPageChange={(e) => handlePageChange(e.selected)}
                containerClassName={"pagination justify-content-center"}
                pageClassName={"page-item"}
                pageLinkClassName={"page-link"}
                previousClassName={"page-item"}
                previousLinkClassName={"page-link"}
                nextClassName={"page-item"}
                nextLinkClassName={"page-link"}
                breakClassName={"page-item"}
                breakLinkClassName={"page-link"}
                activeClassName={"active"}
                forcePage={page - 1}  // Set the selected page
            />
            : null}
                </>
            )}
        </div>
    )
}

export default Searchright
