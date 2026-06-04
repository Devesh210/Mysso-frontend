import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Slider from "react-slick";
import API_URL from '../../../../config';


const Videosection = () => {
    var settings = {
        dots: false,
        autoplay: false,
        autoplaySpeed: 3000,
        nav: true,
        slidesToShow: 1,
        initialSlide: 0,
        cssEase: "linear",
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
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
        <div className='videosection'>
            <Container>
                <Row>
                    <Col lg={9}>
                        <Slider {...settings}>
                            <div>
                                <video className='w-100' controls autoPlay muted>
                                    <source src={`https://myssoapi.handsintechnology.in/assests/videocall.mp4`} type="video/mp4">
                                    </source>
                                </video>
                            </div>
                            <div>
                                <video className='w-100' controls autoPlay muted>
                                    <source src={`https://myssoapi.handsintechnology.in/assests/MYSSO.mp4`} type="video/mp4">
                                    </source>
                                </video>
                            </div>
                        </Slider>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Videosection
