import React, { useState, useEffect } from 'react'
import Slider from "react-slick";
import borderimg from '../../../assets/border.svg';
import ash1 from "../../../assets/startup/stage1.png"
import ash2 from "../../../assets/startup/stage2.jpeg"
import ash3 from "../../../assets/startup/stage3.jpeg"
import ash4 from "../../../assets/startup/growth.jpeg"
import ash5 from "../../../assets/startup/stage5.jpeg"
const Startupstage = () => {
    var settings1 = {
        nav: false,
        infinite: false,
        slidesToShow: 5,
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
        <>
            <div className='startupstagess'>
                <h3 className='startuabout'>Our Startup  <span>Stages</span> <img className='imgsabouts' src={borderimg} alt="border" /></h3>
                <div className='startup-intross'>
                    <p>Welcome to the Start-up Pages of the My Swaminarayan Satsangi Organisation,
                        where innovation meets spirituality. Here, you'll find resources and guidance to
                        realize your entrepreneurial dreams. Our pages offer insights into building a
                        business grounded in ethical principles and community values. Explore success
                        stories, access mentorship opportunities, and discover tools that support your
                        journey from idea to impact. Whether you're an experienced entrepreneur or just
                        starting, our platform provides the support and inspiration needed to create
                        ventures that make a difference. Join us in shaping a future driven by purpose and
                        integrity.</p>
                </div>
                <Slider className="sartuco" {...settings1}>
                    <div>
                        <div
                            className="slider-item"
                        >
                            <img className="w-100" src={ash1} alt="" />
                            <div className="overlay123" />
                            <h3 className="servicetextsss">Ideation stage</h3>
                            <p className='loreser'>Brainstorm and develop your start-up concept, focusing on
                                identifying a unique value proposition.</p>
                        </div>
                    </div>
                    <div>
                        <div
                            className="slider-item"
                        >
                            <img className="w-100" src={ash2} alt="" />
                            <div className="overlay123" />
                            <h3 className="servicetextsss">Validation stage</h3>
                            <p className='loreser'>Test your idea through market research and feedback to ensure
                                it meets customer needs.</p>
                        </div>
                    </div>
                    <div>
                        <div
                            className="slider-item"
                        >
                            <img className="w-100" src={ash3} alt="" />
                            <div className="overlay123" />
                            <h3 className="servicetextsss">Launch stage</h3>
                            <p className='loreser'>Introduce your product or service to the market, setting the
                                foundation for your business operations.</p>
                        </div>
                    </div>
                    <div>
                        <div
                            className="slider-item"
                        >
                            <img className="w-100" src={ash4} alt="" />
                            <div className="overlay123" />
                            <h3 className="servicetextsss">Growth stage</h3>
                            <p className='loreser'>Expand your business by scaling operations, increasing market
                                share, and optimizing processes.</p>
                        </div>
                    </div>
                    <div>
                        <div
                            className="slider-item"
                        >
                            <img className="w-100" src={ash5} alt="" />
                            <div className="overlay123" />
                            <h3 className="servicetextsss">Maturity stage</h3>
                            <p className='loreser'>Achieve stability and sustained success while exploring new
                                opportunities for innovation and diversification.</p>
                        </div>
                    </div>
                    {/* <div>
                        <div
                            className="slider-item"
                        >
                            <img className="w-100" src={ash1} alt="" />
                            <div className="overlay123" />
                            <h3 className="servicetextsss">Sumant Lohar</h3>
                            <p className='loreser'>Lorem ipsum dolor sit amet consectur adipiscing elit sed eiusmod</p>
                        </div>
                    </div> */}
                </Slider>
            </div>
            {/* <div className='strat-content'>
                <h3>Lorem Ipsum is simply dummy text of the printing and typesetting industry printing and typesetting industry printing and typesetting industry printing and typesetting industry</h3>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book Lorem Ipsum is simply dummy text of the printing and typesetting industry. </p>
                <div className='container'>
                    <ul className='ul-listss'>
                        <div className='row'>
                            <div className='col-lg-6'>
                                <li>Lorem Ipsum is simply dummy text of the printing and typesetting industry</li>
                                <li>Lorem Ipsum is simply dummy text of the printing and typesetting industry</li>
                                <li>Lorem Ipsum is simply dummy text of the printing and typesetting industry</li>
                                <li>Lorem Ipsum is simply dummy text of the printing and typesetting industry</li>
                                <li>Lorem Ipsum is simply dummy text of the printing and typesetting industry</li>
                            </div>
                            <div className='col-lg-6'>
                                <li>Lorem Ipsum is simply dummy text of the printing and typesetting industry</li>
                                <li>Lorem Ipsum is simply dummy text of the printing and typesetting industry</li>
                                <li>Lorem Ipsum is simply dummy text of the printing and typesetting industry</li>
                                <li>Lorem Ipsum is simply dummy text of the printing and typesetting industry</li>
                                <li>Lorem Ipsum is simply dummy text of the printing and typesetting industry</li>
                            </div>
                        </div>
                    </ul>
                </div>
            </div> */}
        </>
    )
}

export default Startupstage