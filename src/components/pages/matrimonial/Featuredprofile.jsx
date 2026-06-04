import React from 'react'
import Slider from "react-slick";

import { Container } from 'react-bootstrap'

import borderimg from '../../../assets/border.svg'
import one from "../../../assets/matrimonial/11.png"
import two from "../../../assets/matrimonial/karan.jpg"
import three from "../../../assets/matrimonial/33.png"
import fourth from "../../../assets/matrimonial/44.png"

const Featuredprofile = () => {
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
        fourth
    ]

    const imageText = [
        'Sumant Lohar',
        'Nikunj Barot',
        'Karan Gadlani',
        'Shwet Patel'
    ]

    return (
        <div className='featuredprofile-section'>
            <Container fluid>
                <div className='featuredprofile'>
                    <h3>Our <span>Featured Profile</span> <img className='featuredpro' src={borderimg} /></h3>
                </div>
                <Slider className="slider1" {...settings1}>
                    {imageBanner1.map((image, index) => (
                        <div key={index} className="slider-item">
                            <img className='w-100' src={image} alt="" />
                            <div className="overlay123"></div>
                            <h3 className='servicetext'>{imageText[index]}</h3>
                        </div>
                    ))}
                </Slider>
            </Container>
        </div>
    )
}

export default Featuredprofile
