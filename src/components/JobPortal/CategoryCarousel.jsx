import React from 'react';
import Slider from "react-slick";
import { Carousel, Button, Container, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { setFIlter, setSearchedQuery } from '../../redux/jobSlice';
// import '../../Jobportal.css'; // Import custom CSS
import borderimg from '../../assets/border.svg'
import { SpinLoader, useGetJObCategories } from '../../hooks';
import Nodatafound from '../pages/nodatafound/Nodatafound';



const CategoryCarousel = () => {
    const { categories, error, isLoading } = useGetJObCategories()
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = (query) => {

        dispatch(setFIlter({ type: 'category', value: [query] }));
        dispatch(setFIlter({ type: 'location', value: [] }));
        dispatch(setFIlter({ type: 'searchedQuery', value: "" }));
        setTimeout(() => {
            navigate("/jobs");
        }, 100);

    };
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
                    <h3>Job <span>Categories</span> <img className='featuredpro' src={borderimg} /> </h3>
                </div>
                {isLoading ? <SpinLoader name="CategoriesCarousel" /> :
                    error && error.isError ? <div className="alert alert-danger" role="alert">
                        {error.message}
                    </div> :
                        Array.isArray(categories) && categories.length > 0 ?
                            (
                                <div className='CATEGORYROW'>
                                    <Slider className="slider1" {...settings1}>
                                        {categories?.map((cat, index) => (
                                            <div key={index} className="slider-item job-category-container " onClick={() => searchJobHandler(cat._id)} >
                                                <img className='w-100' src={cat.url || "Jobs/dummy.jpg"} alt="" style={{ borderRadius: "20px" }} />
                                                <div className="overlay123" ></div>
                                                <h3 className='servicetext'>{cat.label}</h3>
                                            </div>

                                        ))}
                                    </Slider>
                                    <div className='justify-content-center text-center'>
                                        <Link to="/categories" className=" button-view"><Button className="button-view search-partner">View All Categories</Button></Link>
                                    </div>

                                </div>
                            ) :
                            <Nodatafound />
                }

            </Container>
        </div>
    );
};

export default CategoryCarousel;
