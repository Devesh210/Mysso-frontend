import Slider from "react-slick";
import borderimg from '../../../../assets/border.svg';
import ash1 from "../../../../assets/supportlogo.png"
import fb from "../../../../assets/supportsocial/1.svg"
import linkd from "../../../../assets/supportsocial/2.svg"
import inst from "../../../../assets/supportsocial/3.svg"
import twitter from "../../../../assets/supportsocial/4.svg"
const Educationalbannerslid = () => {
    var settings1 = {
        nav: false,
        infinite: false,
        slidesToShow: 4,
        dots: false,
        margin: 60,
        slidesToScroll: 3,
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
        <>
            <div className='edutionalbanner'>
                <h3 className='startuabout'>Our Educational   <span>Supporter</span> <img className='imgsabouts' src={borderimg} alt="border" /></h3>
                <Slider className="mldksldk" {...settings1}>
                    <div>
                        <div
                            className="slider-item eductknkk"
                        >
                            <img className="w-100s" src={ash1} alt="" />
                            <h3>Hency Jadeja</h3>
                            <h4>Email ID : <span>name12@gmail.com</span></h4>
                            <h4>Phone Number : <span>+91 99999 99999</span></h4>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting</p>
                            <div className="socialssasdd">
                                <img src={fb} />
                                <img src={twitter} />
                                <img src={inst} />
                                <img src={linkd} />
                            </div>
                        </div>
                    </div>
                    <div>
                        <div
                            className="slider-item eductknkk"
                        >
                            <img className="w-100s" src={ash1} alt="" />
                            <h3>Hency Jadeja</h3>
                            <h4>Email ID : <span>name12@gmail.com</span></h4>
                            <h4>Phone Number : <span>+91 99999 99999</span></h4>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting</p>
                            <div className="socialssasdd">
                                <img src={fb} />
                                <img src={twitter} />
                                <img src={inst} />
                                <img src={linkd} />
                            </div>
                        </div>
                    </div>
                    <div>
                        <div
                            className="slider-item eductknkk"
                        >
                            <img className="w-100s" src={ash1} alt="" />
                            <h3>Hency Jadeja</h3>
                            <h4>Email ID : <span>name12@gmail.com</span></h4>
                            <h4>Phone Number : <span>+91 99999 99999</span></h4>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting</p>
                            <div className="socialssasdd">
                                <img src={fb} />
                                <img src={twitter} />
                                <img src={inst} />
                                <img src={linkd} />
                            </div>
                        </div>
                    </div>
                    <div>
                        <div
                            className="slider-item eductknkk"
                        >
                            <img className="w-100s" src={ash1} alt="" />
                            <h3>Hency Jadeja</h3>
                            <h4>Email ID : <span>name12@gmail.com</span></h4>
                            <h4>Phone Number : <span>+91 99999 99999</span></h4>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting</p>
                            <div className="socialssasdd">
                                <img src={fb} />
                                <img src={twitter} />
                                <img src={inst} />
                                <img src={linkd} />
                            </div>
                        </div>
                    </div>
                    <div>
                        <div
                            className="slider-item eductknkk"
                        >
                            <img className="w-100s" src={ash1} alt="" />
                            <h3>Hency Jadeja</h3>
                            <h4>Email ID : <span>name12@gmail.com</span></h4>
                            <h4>Phone Number : <span>+91 99999 99999</span></h4>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting</p>
                            <div className="socialssasdd">
                                <img src={fb} />
                                <img src={twitter} />
                                <img src={inst} />
                                <img src={linkd} />
                            </div>
                        </div>
                    </div>
                </Slider>
            </div>
        </>
    )
}

export default Educationalbannerslid