import React, { useState } from 'react'
import Slider from "react-slick";

import { Container } from 'react-bootstrap'

import borderimg from '../../../assets/border.svg'
import one from "../../../assets/featuredcompanies/1.jpeg"
import two from "../../../assets/featuredcompanies/2.jpeg"
import three from "../../../assets/featuredcompanies/3.jpeg"
import fourth from "../../../assets/featuredcompanies/4.jpeg"
import fifth from "../../../assets/featuredcompanies/5.jpeg"
import { useGetAllJobPortalUsers } from '../../../hooks';
import usePaginationhook from '../../../hooks/usePaginationhook';

const JobPortalFeatureProfile = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setitemsPerPage] = useState(1)
    const { users, error, totalItems } = useGetAllJobPortalUsers(currentPage, itemsPerPage)

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
    var settings1 = {
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

    const imageBanner1 = [
        three,
        one,
        two,
        fourth, fifth
    ]

    const imageText = [
        'Sumant Lohar',
        'Nikunj Barot',
        'Himanshu Barot',
        'Shwet Patel'
    ]

    return (
        <div className='featuredprofile-section'>
            <Container fluid>
                <div className='featuredprofile'>
                    <h3>Our <span>Featured Companies</span> <img className='featuredpro' src={borderimg} /></h3>
                </div>
                <Slider className="slider1" {...settings1}>
                    {imageBanner1.map((image, index) => (
                        <div key={index} className="slider-item">
                            <img className='w-100' src={image} alt="" />
                            {/* <div className="overlay123"></div> */}
                            {/* <h3 className='servicetext'>{imageText[index]}</h3> */}
                            {/* <div className="overlay123"></div> */}
                            {/* <h3 className='servicetext'>{imageText[index]}</h3> */}
                        </div>
                    ))}
                </Slider>
            </Container>
        </div>
    )
}

export default JobPortalFeatureProfile
