import React from 'react'
import Slider from "react-slick";

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';


import borderimg from '../../../assets/border.svg';
import worldimg from '../../../assets/world/1.png';


const Worldwide = () => {

    //Services
    var settings = {
        nav: true,
        dots: false,
        infinite: true,
        slidesToShow: 6,
        slidesToScroll: 6,
        initialSlide: 0,
        cssEase: "linear",
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 6,
                    slidesToScroll: 6,
                    infinite: true,
                    dots: true
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

    const worldBanner = [
        worldimg,
        worldimg,
        worldimg,
        worldimg,
        worldimg,
        worldimg,
        worldimg,
        worldimg,
        worldimg,
        worldimg,
        worldimg,
        worldimg,
        worldimg,
        worldimg,

    ]

    const worldText = [
        'Afghanistan',
        'Albania',
        'Algeria',
        'Andorra',
        'Angola',
        'Barbuda',
        'Argentina',
        'Armenia',
        'Australia',
        'Austria',
        'Azerbaijan',
        'Madagascar',
        'Malaw',
    ]

    const stateBanner = [
        worldimg,
        worldimg,
        worldimg,
        worldimg,
        worldimg,
        worldimg,
        worldimg,
        worldimg,
        worldimg,
        worldimg,
        worldimg,
        worldimg,
        worldimg,
        worldimg,

    ]

    const stateText = [
        'Mumbai',
        'Chennai',
        'Uttar Pradesh',
        'Punjab',
        'Assam',
        'Gujarat',
        'Haryana',
        'Delhi',
        'Sikkim',
        'Kerala',
        'Andhra Pradesh',
        'Rajasthan',
        'Goa',
        'Manipur'
    ]

    const cityBanner = [
        worldimg,
        worldimg,
        worldimg,
        worldimg,
        worldimg,
        worldimg,
        worldimg,
        worldimg,
        worldimg,
        worldimg,
        worldimg,
        worldimg,
        worldimg,
        worldimg,

    ]

    const cityText = [
        'Adoni',
        'Amaravati',
        'Anantapur',
        'Chandragiri',
        'Chittoor',
        'Dowlaiswaram',
        'Eluru',
        'Guntur',
        'Kadapa',
        'Kakinada',
        'Kurnool',
        'Machilipatnam',
        'Nagarjunakoṇḍa',
        'Rajahmundry',
    ]

    return (
        <div className='worldwide-section'>
            <div className='worldwide'>
                <h3>World Wide <span>Chapters</span> <img className='borderimgg1' src={borderimg} alt="border" /></h3>
                <div className='world-tabs'>
                    <Tabs
                        defaultActiveKey="profile"
                        id="uncontrolled-tab-example"
                        className="mb-5"
                    >
                        <Tab eventKey="home" title="Country wise">
                            <Slider className="state" {...settings}>
                                {worldBanner.map((image, index) => (
                                    <div key={index}>
                                        <img className='w-100' src={image} alt="" />
                                        <h6 className='worldtext'>{worldText[index]}</h6>
                                    </div>
                                ))}
                            </Slider>
                        </Tab>
                        <Tab eventKey="profile" title="State wise">
                            <Slider className="state" {...settings}>
                                {stateBanner.map((image, index) => (
                                    <div key={index}>
                                        <img className='w-100' src={image} alt="" />
                                        <h6 className='worldtext'>{stateText[index]}</h6>
                                    </div>
                                ))}
                            </Slider>
                        </Tab>
                        <Tab eventKey="contact" title="City wise">
                            <Slider className="state" {...settings}>
                                {cityBanner.map((image, index) => (
                                    <div key={index}>
                                        <img className='w-100' src={image} alt="" />
                                        <h6 className='worldtext'>{cityText[index]}</h6>
                                    </div>
                                ))}
                            </Slider>
                        </Tab>
                    </Tabs>
                </div>
            </div>
        </div>
    );
};

export default Worldwide;
