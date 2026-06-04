import React from 'react';
import Slider from "react-slick";
import { Container } from 'react-bootstrap';
import borderimg from '../../assets/border.svg';
import { SpinLoader } from '../../hooks';
import { useGetAllTopCompaniesQuery } from '../../redux/apiSlice';
import { Link } from 'react-router-dom';
import ComanyCard from './components/ComanyCard';
import Nodatafound from '../pages/nodatafound/Nodatafound';

// No more named imports like Pagination, Navigation from 'swiper'
const ComanyCarousel = () => {

    const { data, error, isFetching: isLoading, refetch } = useGetAllTopCompaniesQuery({ page: 1, limit: 10 });

    const settings1 = {
        nav: false,
        infinite: false,
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 0,
        cssEase: "linear",
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                    infinite: false,
                    dots: false
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };


    return (
        <div className='featuredprofile-section'>
            <Container fluid>
                <div className='featuredprofile'>
                    <h3>Top <span>Companies</span> <img className='featuredpro' src={borderimg} alt="" /> </h3>
                </div>
                {isLoading ? <SpinLoader /> :
                    error ? <div className="alert alert-danger" role="alert">{error.message}</div> :
                        data?.data?.length > 0 ? (
                            <div className='CATEGORYROW'>
                                <Slider className="slider1" {...settings1}>
                                    {data?.data?.map((cat, index) => (
                                        <ComanyCard item={cat} />
                                    ))}
                                </Slider>
                                {/* <div className='justify-content-center text-center'>
                                    <Link to="/categories" className=" button-view"><Button className="button-view search-partner">View All Categories</Button></Link>
                                </div> */}

                            </div>
                        ) : <Nodatafound />
                }
            </Container>
        </div>
    );
};

export default ComanyCarousel;
