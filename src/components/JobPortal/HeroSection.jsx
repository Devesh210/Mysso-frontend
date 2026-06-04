import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setFIlter, reset } from '../../redux/jobSlice';
import { Container, Row, Col, Form } from 'react-bootstrap';
import banner from '../../assets/matrimonial/banner.png';
import bannerjob from '../../assets/Jobs/bannerjob.jpg';
import { useNavigate } from 'react-router-dom';
import { jobPortalApi } from '../../redux/apiSlice';
import SearchDropdown from '../../hooks/SearchDriopdown';
import { useGetFiltersData } from '../../hooks';

const HeroSection = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const search = useGetFiltersData()
    const { location, category, searchedQuery } = useSelector((state) => state.job);
    const handleChange = (e) => {
        if (e.target.name === "location" || e.target.name === "category") {
            dispatch(setFIlter({ type: [e.target.name], value: [e.target.value] }));
        } else {
            dispatch(setFIlter({ type: [e.target.name], value: e.target.value }));
        }
    };
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    // filters


    // end FIlters
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    const submitFilter = () => {
        navigate("/jobs")
    };
    return (
        <div>
            <Container fluid style={{ padding: '0px' }}>
                <div className="image-container mb-0">
                    <img src={bannerjob} className="w-100" alt="" />
                    <div className="overlay12">
                        <div className='overlaycontentnt'>
                            <h3>Find Your Dream Career Here</h3>
                            <div className='selectbutt'>
                                <Row style={{ justifyContent: 'center' }}>
                                    <Col lg={3} className='mb-2'>
                                        <SearchDropdown />

                                    </Col>
                                    <Col lg={3} className='mb-2'>
                                        <select name="location" className='form-control' value={location} onChange={handleChange}>
                                            <option value="" hidden>Location</option>
                                            {
                                                search?.locationData?.map((item, index) => (
                                                    <option key={index} value={item.value}>{item.label}</option>
                                                ))
                                            }
                                        </select>
                                    </Col>
                                    <Col lg={3} className='mb-2'>
                                        <select name="category" className='form-control' value={category} onChange={handleChange}>
                                            <option value="" hidden>Industry</option>
                                            {search.industryData?.map((item, index) => (
                                                <option key={index} value={item.value}>{item.label}</option>
                                            ))}
                                        </select>
                                    </Col>
                                    <Col lg={1} className='mb-2'>
                                        {/* Clear button styled to match */}
                                        <button
                                            className='btn btn-secondary'
                                            onClick={() => dispatch(reset())}
                                            style={{
                                                borderRadius: "100px",
                                                padding: "8px 20px",
                                                marginTop: "2px"
                                            }}
                                        >
                                            Clear
                                        </button>
                                    </Col>
                                </Row>
                            </div>
                            <Row style={{ justifyContent: 'center' }}>
                                <Col lg={3}>
                                    <button className='search-partner' onClick={submitFilter}>Search Jobs</button>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default HeroSection;
