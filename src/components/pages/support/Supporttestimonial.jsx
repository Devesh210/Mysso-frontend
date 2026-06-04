import React, { useState, useEffect } from 'react'
import Slider from "react-slick";

import { Container } from 'react-bootstrap';

import borderimg from '../../../assets/border.svg';
import ash from "../../../assets/testimonials/ash.jpeg"
import manoj from "../../../assets/testimonials/manoj.jpeg"
import dhanji from "../../../assets/testimonials/dhanji.jpeg"
import API_URL from '../../../../config';

const Supporttestimonial = () => {
    var settings1 = {
        nav: false,
        infinite: false,
        slidesToShow: 3,
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

    const [testimonials, setTestimonials] = useState([]);


    useEffect(() => {
        getTestimonials();
    }, []);

    const getTestimonials = async () => {
        try {
            const requestOption = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            }
            const response = await fetch(`${API_URL}/api/getTestimonialList`, requestOption)
                .then(response => response.json())
                .then(data => {
                    // console.log(data.data);
                    setTestimonials(data.data);

                });


        } catch (error) {
            console.error(error.message);
        }
    }





    return (
        <div className='testimonial-section'>
            <Container fluid>
                <div className='testimonial mb-5'>
                    <h3 className='mb-4'>What Our Users  <span>Say About Us</span> <img className='imgtestimonial' src={borderimg} alt="border" /></h3>
                </div>
                <Container fluid className='testimonial-blocks'>
                    <Slider className="testislider" {...settings1}>
                        <div>
                            <div className="testimonial-box">
                                <div className="box-top">
                                    <div className="profile">
                                        <div className="profile-img">
                                            <img
                                                src={dhanji}
                                                alt="image"
                                                height={100}
                                                width={100}
                                            />
                                        </div>
                                        <div className="name-user">
                                            <strong>Dhanjibhai Rakholiya </strong>
                                            <span>Minakshi Diamonds</span>
                                            <span>Surat, Gujarat</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="client-comment">
                                    <p>
                                        Satsangi Saathe Satsangi Mate; A feeling of bond and attachment in ShreeSSO under blessing of Shri Harikrishna Maharaj.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="testimonial-box">
                                <div className="box-top">
                                    <div className="profile">
                                        <div className="profile-img">
                                            <img
                                                src={manoj}
                                                alt="image"
                                                height={100}
                                                width={100}
                                            />
                                        </div>
                                        <div className="name-user">
                                            <strong>Manojbhai Ajmera </strong>
                                            <span>Managing Director</span>
                                            <span>Ajmera Realty & Infra India Ltd</span>
                                            <span>Mumbai, Maharashtra</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="client-comment">
                                    <p>
                                        It’s time when all the followers of Swaminarayan Bhagwan will be under one roof for their personal and professional growth. I wish ShreeSSO heartiest wishes for this good Initiative.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="testimonial-box">
                                <div className="box-top">
                                    <div className="profile">
                                        <div className="profile-img">
                                            <img
                                                src={ash}
                                                alt="image"
                                                height={100}
                                                width={100}
                                            />
                                        </div>
                                        <div className="name-user">
                                            <strong>Ashvinkumar M Golaviya</strong>
                                            <span>Nyalkaran Group</span>
                                            <span>Vadodara, Gujarat</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="client-comment">
                                    <p>
                                        Unity is our biggest strength and I am glad to see that in our Sampraday for ShreeSSO. Wishing Goodluck to ShreeSSO
                                    </p>
                                </div>
                            </div>
                        </div>

                    </Slider>
                </Container>
            </Container>
        </div>
    );
};

export default Supporttestimonial;
