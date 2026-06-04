import React, { useState } from 'react';
import Slider from "react-slick";
import { Carousel, Button, Container, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setFIlter, setSearchedQuery } from '../../redux/jobSlice';
// import '../../Jobportal.css'; // Import custom CSS
import { SpinLoader, useGetJObCategories } from '../../hooks';
import HeroSection from './HeroSection';
import borderimg from '../../assets/border.svg'
import usePaginationhook from '../../hooks/usePaginationhook';
const Category = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setitemsPerPage] = useState(12)
    const { categories, error, totalItems, isLoading } = useGetJObCategories(currentPage, itemsPerPage)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // Calculate the start and end indices of items for the current page
    // const startIndex = (currentPage - 1) * itemsPerPage;
    // const endIndex = startIndex + itemsPerPage;
    // const paginatedItems = categories.slice(startIndex, endIndex);

    // Handle page change
    const onPageChange = (page) => {
        setCurrentPage(page);
    };

    // Use the custom hook for pagination
    const pagination = usePaginationhook({
        totalItems: totalItems,
        perPage: itemsPerPage,
        currentPage: currentPage,
        onPageChange,
    });
    const searchJobHandler = (query) => {
        console.log("query????", query)
        dispatch(setFIlter({ type: 'category', value: [query] }));
        dispatch(setFIlter({ type: 'location', value: [] }));
        dispatch(setFIlter({ type: 'searchedQuery', value: "" }));
        setTimeout(() => {
            navigate("/jobs");
        }, 100);

    };
    return (
        <>
            <HeroSection />
            <div className=''>
                <Container >
                    <div className='featuredprofile mb-5 mt-5'>
                        <h4 style={{ color: "#380606" }}> {totalItems} Category Jobs </h4>
                    </div>
                    {isLoading ? <SpinLoader name='Category' /> :
                        categories?.length == 0 ? <div className="alert alert-danger" role="alert">
                            {error?.message}
                        </div> :
                            categories?.length == 0 ? <Nodatafound /> :
                                (
                                    <>
                                        <Row>
                                            {categories.map((cat, index) => (
                                                <Col lg={3} >

                                                    {/* <h3 >{cat.title}</h3> */}
                                                    <div className=' slider-item job-category-container ' onClick={() => searchJobHandler(cat._id)}>
                                                        <img className='w-100' src={cat.url || "Jobs/dummy.jpg"} alt="" style={{ borderRadius: "20px" }} />
                                                        <div className="overlay123" style={{ bottom: "28px" }}></div>
                                                        <h3 className='servicetext'>{cat.label}</h3>
                                                    </div>
                                                </Col>
                                            ))}
                                        </Row>
                                        <div className='justify-content-end'>
                                            {pagination}
                                        </div>
                                    </>
                                )
                    }

                </Container>
            </div>
        </>

    );
};

export default Category;
