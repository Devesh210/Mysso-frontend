import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Slider from "react-slick";
// import "../../Jobportal.css"
import borderimg from '../../assets/border.svg'

const Testimonial = () => {
    var settings1 = {
        dots: true,
        arrows: false,
        infinite: false,
        slidesToShow: 2,
        slidesToScroll: 1,
        initialSlide: 0,
        cssEase: "linear",
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: false,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 1,
                    dots: true
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: true
                }
            }
        ]
    };

    return (
        <div className='featuredprofile-section bg-testimonial'>
            <Container className="my-5 mt-5">
                <div className='featuredprofile mb-2 pb-0'>
                    <h3>What Our Users  <span>Say About Us</span><img className='featuredpro' src={borderimg} style={{ width: "220px", left: "52%" }} />  </h3>
                </div>
                <Slider className="slider1 mt-5 mb-4 pb-4 p-0 " {...settings1} >
                    <div className="slider-item job-category-container border-1 pt-4 px-5 pb-4 col-test">
                        <div class="services-content pt-3">
                            <Row>
                                <Col lg={2}  >
                                    <div class="services-inner">
                                        <figure class="position-relative testimonial-img">
                                            <img src="" alt="testimonial" class="img-fluid services-icons" />
                                        </figure>
                                    </div>
                                </Col>
                                <Col lg={4}>
                                    <h4 class="testimonial-name mb-0">Elisa burger</h4>
                                    <h6 class="testimonial-role mb-0">customer</h6>
                                </Col>
                                <Col className='text-end'>
                                    <div class="testimonial-rating">
                                        <i class="fa fa-star"></i>
                                        <i class="fa fa-star"></i>
                                        <i class="fa fa-star"></i>
                                        <i class="fa fa-star"></i>
                                        <i class="fa fa-star"></i>
                                    </div>
                                </Col>
                            </Row>
                            <Row className='justify-content-end '>
                                <Col lg={10} className='justify-content-end '>
                                    <p className='testimonial-text'>
                                        efrtgyuiopgbfbgfhnygnjgbvnj vvcf nvctgfynjfn vvcf
                                    </p>
                                </Col>
                            </Row>
                        </div>
                    </div>

                    <div className="slider-item job-category-container border-1 pt-4 px-5 pb-4 ">
                        <div class="services-content pt-3">
                            <Row>
                                <Col lg={2}  >
                                    <div class="services-inner">
                                        <figure class="position-relative testimonial-img">
                                            <img src="" alt="testimonial" class="img-fluid services-icons" />
                                        </figure>
                                    </div>
                                </Col>
                                <Col lg={4}>
                                    <h4 class="testimonial-name mb-0">Elisa burger</h4>
                                    <h6 class="testimonial-role mb-0">customer</h6>
                                </Col>
                                <Col className='text-end'>
                                    <div class="testimonial-rating">
                                        <i class="fa fa-star"></i>
                                        <i class="fa fa-star"></i>
                                        <i class="fa fa-star"></i>
                                        <i class="fa fa-star"></i>
                                        <i class="fa fa-star"></i>
                                    </div>
                                </Col>
                            </Row>
                            <Row className='justify-content-end '>
                                <Col lg={10} className='justify-content-end '>
                                    <p className='testimonial-text'>
                                        efrtgyuiopgbfbgfhnygnjgbvnj vvcf nvctgfynjfn vvcf
                                    </p>
                                </Col>
                            </Row>
                        </div>
                    </div>
                    <div className="slider-item job-category-container border-1 pt-4 px-5 pb-4 ">
                        <div class="services-content pt-3">
                            <Row>
                                <Col lg={2}  >
                                    <div class="services-inner">
                                        <figure class="position-relative testimonial-img">
                                            <img src="" alt="testimonial" class="img-fluid services-icons" />
                                        </figure>
                                    </div>
                                </Col>
                                <Col lg={4}>
                                    <h4 class="testimonial-name mb-0">Elisa burger</h4>
                                    <h6 class="testimonial-role mb-0">customer</h6>
                                </Col>
                                <Col className='text-end'>
                                    <div class="testimonial-rating">
                                        <i class="fa fa-star"></i>
                                        <i class="fa fa-star"></i>
                                        <i class="fa fa-star"></i>
                                        <i class="fa fa-star"></i>
                                        <i class="fa fa-star"></i>
                                    </div>
                                </Col>
                            </Row>
                            <Row className='justify-content-end '>
                                <Col lg={10} className='justify-content-end '>
                                    <p className='testimonial-text'>
                                        efrtgyuiopgbfbgfhnygnjgbvnj vvcf nvctgfynjfn vvcf
                                    </p>
                                </Col>
                            </Row>
                        </div>
                    </div>
                    <div className="slider-item job-category-container border-1 pt-4 px-5 pb-4">
                        <div class="services-content pt-3">
                            <Row>
                                <Col lg={2}  >
                                    <div class="services-inner">
                                        <figure class="position-relative testimonial-img">
                                            <img src="" alt="testimonial" class="img-fluid services-icons" />
                                        </figure>
                                    </div>
                                </Col>
                                <Col lg={4}>
                                    <h4 class="testimonial-name mb-0">Elisa burger</h4>
                                    <h6 class="testimonial-role mb-0">customer</h6>
                                </Col>
                                <Col className='text-end'>
                                    <div class="testimonial-rating">
                                        <i class="fa fa-star"></i>
                                        <i class="fa fa-star"></i>
                                        <i class="fa fa-star"></i>
                                        <i class="fa fa-star"></i>
                                        <i class="fa fa-star"></i>
                                    </div>
                                </Col>
                            </Row>
                            <Row className='justify-content-end '>
                                <Col lg={10} className='justify-content-end '>
                                    <p className='testimonial-text'>
                                        efrtgyuiopgbfbgfhnygnjgbvnj vvcf nvctgfynjfn vvcf
                                    </p>
                                </Col>
                            </Row>
                        </div>
                    </div>
                    <div className="slider-item job-category-container border-1 pt-4 px-5 pb-4 ">
                        <div class="services-content pt-3">
                            <Row>
                                <Col lg={2}  >
                                    <div class="services-inner">
                                        <figure class="position-relative testimonial-img">
                                            <img src="" alt="testimonial" class="img-fluid services-icons" />
                                        </figure>
                                    </div>
                                </Col>
                                <Col lg={4}>
                                    <h4 class="testimonial-name mb-0">Elisa burger</h4>
                                    <h6 class="testimonial-role mb-0">customer</h6>
                                </Col>
                                <Col className='text-end'>
                                    <div class="testimonial-rating">
                                        <i class="fa fa-star"></i>
                                        <i class="fa fa-star"></i>
                                        <i class="fa fa-star"></i>
                                        <i class="fa fa-star"></i>
                                        <i class="fa fa-star"></i>
                                    </div>
                                </Col>
                            </Row>
                            <Row className='justify-content-end '>
                                <Col lg={10} className='justify-content-end '>
                                    <p className='testimonial-text'>
                                        efrtgyuiopgbfbgfhnygnjgbvnj vvcf nvctgfynjfn vvcf
                                    </p>
                                </Col>
                            </Row>
                        </div>
                    </div>
                    <div className="slider-item job-category-container border-1 pt-4 px-5 pb-4 ">
                        <div class="services-content pt-3">
                            <Row>
                                <Col lg={2}  >
                                    <div class="services-inner">
                                        <figure class="position-relative testimonial-img">
                                            <img src="" alt="testimonial" class="img-fluid services-icons" />
                                        </figure>
                                    </div>
                                </Col>
                                <Col lg={4}>
                                    <h4 class="testimonial-name mb-0">Elisa burger</h4>
                                    <h6 class="testimonial-role mb-0">customer</h6>
                                </Col>
                                <Col className='text-end'>
                                    <div class="testimonial-rating">
                                        <i class="fa fa-star"></i>
                                        <i class="fa fa-star"></i>
                                        <i class="fa fa-star"></i>
                                        <i class="fa fa-star"></i>
                                        <i class="fa fa-star"></i>
                                    </div>
                                </Col>
                            </Row>
                            <Row className='justify-content-end '>
                                <Col lg={10} className='justify-content-end '>
                                    <p className='testimonial-text'>
                                        efrtgyuiopgbfbgfhnygnjgbvnj vvcf nvctgfynjfn vvcf
                                    </p>
                                </Col>
                            </Row>
                        </div>
                    </div>


                </Slider>
            </Container>
        </div>
    )
}

export default Testimonial;
