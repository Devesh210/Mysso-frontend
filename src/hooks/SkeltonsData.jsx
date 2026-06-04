import { Skeleton } from '@mui/material'
import React from 'react'
import Slider from "react-slick";
import borderimg from '../assets/border.svg'
import { Badge, Button, Card, Col, Container, Row } from 'react-bootstrap'
import { Hourglass } from 'react-loader-spinner';
const FilerCardsSkelton = () => {
    return (
        <div className='rounded-md filter-left'>
            <h3><Skeleton variant="rectangular" width="100%" height={40} /></h3>
            <div className='filter-fields'>
                <div className="input-search-group mb-4">

                    <Skeleton variant="rectangular" width="100%" height={40} />

                </div>

                <Skeleton variant="rectangular" width="100%" height={40} className="mb-4" />


                <Skeleton variant="rectangular" width="100%" height={40} className="mb-4" />



                <Skeleton variant="rectangular" width="100%" height={40} className="mb-4" />

                <Skeleton variant="rectangular" width="100%" height={40} className="mb-4" />
                <Skeleton variant="rectangular" width="100%" height={40} className="mb-4" />
                <div className='row'>
                    <div className=' col-lg-4'>
                        <Skeleton variant="rectangular" width="100%" height={40} className="mb-4" />
                    </div>
                    <div className=' col-lg-2'>
                        <Skeleton variant="rectangular" width="20%" height={40} className="mb-4" />
                    </div>
                    <div className=' col-lg-3'>
                        <Skeleton variant="rectangular" width="100%" height={40} className="mb-4" />
                    </div>
                    <div className='col-lg-2'>
                        <Skeleton variant="rectangular" width="100%" height={40} className="mb-4" />
                    </div>
                </div>
                <Skeleton variant="text" width="20%" height={40} className="mb-4" />
            </div>
        </div>
    )
}
const JobsSkelton = () => {
    return <Row>
        <Col xs={12} md={4} lg={3} className="mb-4">
            <FilerCardsSkelton />
        </Col>
        <Col xs={12} md={12} lg={9} className='p-0'>
            <Row className="g-4 m-2">
                {
                    Array.from(new Array(9)).map((item) => (
                        <Col xs={12} md={12} lg={4} key={item}>
                            <Card className="job-card " >
                                <Card.Body className="text-center">
                                    <div className="d-flex justify-content-between">
                                        <Card.Text className="text-muted job-head">
                                            <Skeleton variant="text" />
                                        </Card.Text>
                                    </div>
                                    <div>
                                        <Card.Text className="text-center mt-4 mb-4" >
                                            <Skeleton variant="rectangular" className="job-logo text-center" />
                                        </Card.Text>
                                    </div>
                                    <div>
                                        <Card.Title className="job-head mt-4"> <Skeleton variant="text" /></Card.Title>
                                    </div>
                                    <div>
                                        <Card.Title className='job-location mt-3'> <Skeleton variant="text" /></Card.Title>
                                    </div>


                                    <div className="d-flex justify-content-center  asss mt-3 mb-3">
                                        <Skeleton variant="text" />
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                }

            </Row>

        </Col>
    </Row>


}
const LatestJobsSkelton = () => {
    return <Row className='mt-5'>

        {
            Array.from(new Array(9)).map((item) => (
                <Col xs={12} md={3} lg={4} className="mb-4 px-4" key={item}>
                    <Card className="job-card " >
                        <Card.Body className="text-center">
                            <div className="d-flex justify-content-between">
                                <Card.Text className="text-muted job-head">
                                    <Skeleton variant="text" />
                                </Card.Text>
                            </div>
                            <div>
                                <Card.Text className="text-center mt-4 mb-4" >
                                    <Skeleton variant="rectangular" className="job-logo text-center" />
                                </Card.Text>
                            </div>
                            <div>
                                <Card.Title className="job-head mt-4"> <Skeleton variant="text" /></Card.Title>
                            </div>
                            <div>
                                <Card.Title className='job-location mt-3'> <Skeleton variant="text" /></Card.Title>
                            </div>


                            <div className="d-flex justify-content-center  asss mt-3 mb-3">
                                <Skeleton variant="text" />
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            ))
        }
    </Row>







}
const CategoriesCarouselSkelton = () => {
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
    return <div className='CATEGORYROW'>
        <Slider className="slider1" {...settings1}>
            {Array.from(new Array(4)).map((cat, index) => (
                <div key={index} className="slider-item job-category-container "  >
                    <Skeleton variant="rectangular" />
                    <Skeleton variant="text" />
                    <Skeleton variant="text" />
                </div>

            ))}
        </Slider>
    </div>
}
const CategoriesListSkelton = () => {

    return <Row>
        {Array.from(new Array(4)).map((cat, index) => (
            <Col lg={3} >
                <div className=' slider-item job-category-container ' >
                    <Skeleton variant="rectangular" />

                    <Skeleton variant="text" />
                </div>
            </Col>


        ))}
    </Row>

}
const Loading = () => {
    return (
        <div className='spinloader'>

            <Hourglass
                visible={true}
                height="80"
                width="80"
                ariaLabel="hourglass-loading"
                wrapperStyle={{}}
                wrapperClass=""
                colors={['#306cce', '#72a1ed']}
            />
        </div>
    )
}


export { FilerCardsSkelton, JobsSkelton, LatestJobsSkelton, Loading, CategoriesCarouselSkelton, CategoriesListSkelton }
