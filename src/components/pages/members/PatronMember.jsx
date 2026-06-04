import React, { useState, useEffect } from 'react'
import { Container, Row, Col } from "react-bootstrap"
import ash1 from "../../../assets/supportlogo.png"
import ReactPaginate from 'react-paginate'
import { RotatingLines } from 'react-loader-spinner'
import API_URL from '../../../../config'
import Nodatafound from '../nodatafound/Nodatafound'


const PatronMember = () => {

    const [data, setData] = useState([]);
    const [perPage] = useState(10);
    const [pageCount, setPageCount] = useState(0);
    const [page, setPage] = useState(() => {
        const params = new URLSearchParams(window.location.search);
        return parseInt(params.get('page')) || 1;
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const currentPage = parseInt(params.get('page')) || 1;
        setPage(currentPage);
        getPatronMembers(page, perPage)
    }, [])

    const getPatronMembers = async () => {
        try {
            setLoading(true)
            const requestOptions = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            }
            await fetch(`${API_URL}/api/getPatronmemberslist?page=${page}&limit=${perPage}`, requestOptions)
                .then(response => response.json())
                .then((data) => {
                    if (data.status == 200) {
                        const total = data.total;
                        const slice = total / perPage;
                        const pages = Math.ceil(slice);
                        setPageCount(pages);
                        setData(data.data)
                        setLoading(false)

                    } else {
                        console.log(data.message)
                        // swal({
                        //     text: data.message,
                        //     icon: "error",
                        // });
                        setLoading(false)
                    }
                })

        } catch (err) {
            console.log(err);
        }
    }

    const handlePageClick = (e) => {
        const selectedPage = e.selected + 1;
        setPage(selectedPage);
        Navigate(`?page=${selectedPage}`);
        getPatronMembers(selectedPage, perPage);
    };



    return (
        <div>
            {loading ? (
                <div className='loader my-5'>
                    <RotatingLines
                        visible={true}
                        height="96"
                        width="96"
                        color="grey"
                        strokeWidth="5"
                        animationDuration="0.75"
                        ariaLabel="rotating-lines-loading"
                        className="loader-spinner"
                        strokeColor='#E36414'
                    />
                </div>
            ) : (
                <>
                    <Container fluid>
                        {data?.length > 0 ? (
                            data.map((member, index) => (
                                <Row key={index}> {/* Added key for each Row */}
                                    <Col lg={3}>
                                        <div className="slider-item aboutmemberk">
                                            <img className="w-100 mb-3" src={`${API_URL}/uploads/user_profile/${member?.profilePicture?.map((val) => val.filename)}`} alt="" />
                                            <h4>Name: <span>{member?.fullName}</span></h4>
                                            {/* <h4>Email ID: <span>{member?.email}</span></h4>
                                            <h4>Contact Number: <span>{member?.contact}</span></h4> */}
                                        </div>
                                    </Col>
                                </Row>
                            ))
                        ) : (
                            <div>
                                <Nodatafound /> {/* Display no data message */}
                            </div>
                        )}
                    </Container>

                    {pageCount > 1 && (
                            <ReactPaginate
                                previousLabel={"Previous"}
                                nextLabel={"Next"}
                                breakLabel={"..."}
                                pageCount={pageCount}
                                marginPagesDisplayed={2}
                                pageRangeDisplayed={3}
                                onPageChange={handlePageClick}
                                forcePage={page - 1} // ReactPaginate is 0-based, so subtract 1
                                containerClassName={"pagination justify-content-end"}
                                pageClassName={"page-item"}
                                pageLinkClassName={"page-link"}
                                previousClassName={"page-item"}
                                previousLinkClassName={"page-link"}
                                nextClassName={"page-item"}
                                nextLinkClassName={"page-link"}
                                breakClassName={"page-item"}
                                breakLinkClassName={"page-link"}
                                activeClassName={"active"}
                            />
                    )}
                </>
            )}
        </div>
    )
}

export default PatronMember