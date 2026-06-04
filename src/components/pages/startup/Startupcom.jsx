import React, { useState, useEffect } from 'react'
import Slider from "react-slick";

import { Col, Container, Row } from 'react-bootstrap';

import ash from "../../../assets/startup/clogo.svg"

const Startupcom = () => {
    var settings1 = {
        nav: false,
        infinite: false,
        slidesToShow: 6,
        dots: false,
        margin: 60,
        slidesToScroll: 3,
        cssEase: "linear",
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
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
        <div className='testimonial-section'>
            <Container fluid>
                <Container fluid className='testimonial-blocks'>
                    <Slider className="sartuco" {...settings1}>
                        <div>
                            <img src={ash} alt="" />
                        </div>
                        <div>
                            <img src={ash} alt="" />
                        </div>

                        <div>
                            <img src={ash} alt="" />
                        </div>

                        <div>
                            <img src={ash} alt="" />
                        </div>

                        <div>
                            <img src={ash} alt="" />
                        </div>

                        <div>
                            <img src={ash} alt="" />
                        </div>

                        <div>
                            <img src={ash} alt="" />
                        </div>

                        <div>
                            <img src={ash} alt="" />
                        </div>

                        <div>
                            <img src={ash} alt="" />
                        </div>

                        <div>
                            <img src={ash} alt="" />
                        </div>
                    </Slider>
                </Container>
            </Container>
        </div>
    );
};

export default Startupcom;
