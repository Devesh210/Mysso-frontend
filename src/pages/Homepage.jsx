import React,{useEffect,useState} from 'react'
import Slider from "react-slick";

import Services from '../components/pages/home/Services';
import Banner from '../components/pages/home/Banner';

import { Container } from 'react-bootstrap';

// import banner1 from "../assets/banners/banner1.jpg"
// import banner2 from "../assets/banners/banner2.jpeg"
// import banner3 from "../assets/banners/banner3.jpeg"
// import banner4 from "../assets/banners/banner4.jpeg"
// import banner5 from "../assets/banners/banner5.jpeg"
// import banner6 from "../assets/banners/banner6.jpeg"
// import banner7 from "../assets/banners/banner7.jpeg"
import one from "../assets/services/1.jpg"
import two from "../assets/services/2.jpg"
import three from "../assets/services/3.jpg"
import fourth from "../assets/services/4.jpg"
import fifth from "../assets/services/5.jpg"
import six from "../assets/services/6.jpg"
import seven from "../assets/services/7.jpg"
import Achievement from '../components/pages/home/Achievement';
import About from '../components/pages/home/About';
import Worldwide from '../components/pages/home/Worldwide';
import Contact from '../components/pages/home/Contact';
import Faq from '../components/pages/home/Faq';
import Testimonials from '../components/pages/home/Testimonials';
import Videosection from '../components/pages/home/Videosection';
import Photogallery from '../components/pages/home/Photogallery';
import SubscriptionNotification from '../components/pages/home/SubscriptionNotification';
import API_URL from '../../config';
import Feedbackform from './Feedbackform ';

const Homepage = () => {

    const banner1 = "https://myssoapi.handsintechnology.in/assests/banners/banner1.jpg"
    const banner2 = "https://myssoapi.handsintechnology.in/assests/banners/banner2.jpeg"
    const banner3 = "https://myssoapi.handsintechnology.in/assests/banners/banner3.jpeg"
    const banner4 = "https://myssoapi.handsintechnology.in/assests/banners/banner4.jpeg"
    const banner5 = "https://myssoapi.handsintechnology.in/assests/banners/banner5.jpeg"
    const banner6 = "https://myssoapi.handsintechnology.in/assests/banners/banner6.jpeg"
    const banner7 = "https://myssoapi.handsintechnology.in/assests/banners/banner7.jpeg"


    // Banner
    var settings = {
        dots: true,
        autoplay: true,
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

    //Services
    var settings1 = {
        dots: false,
        autoplay: true,
        autoplaySpeed: 3000,
        nav: true,
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

    const imageBanner = [banner1, banner2, banner3, banner4, banner7, banner6, banner5]

    console.log(imageBanner)
    const imageLink1 = [
        '/Aboutmember',
        '/Matrimonial',
        '/JobSection',
        '/Startup',
        '/Educationalsupport',
        '/Seniorcitizen',
        '/Withoutchapters',
    ]

    const imageBanner1 = [
        one,
        two,
        three,
        fourth,
        fifth,
        six,
        seven
    ]

    const imageText = [
        'Members',
        'Matrimonial',
        'Job',
        'Startup',
        'Education',
        'Senior citizen',
        'Networking',
    ]

    const imageLink = [
        '/Aboutmember',
        '/Matrimonial',
        '/JobSection',
        '/Startup',
        '/Educationalsupport',
        '/Seniorcitizen',
        '/Withoutchapters',
    ]



    // Second banner





    const [userdata, setUserdata] = useState([]);


    useEffect(() => {
        if (localStorage.getItem('token')) {
            getUserData();
        }
    }, [])


    const getUserData = async () => {
        try {
            const requestOptions = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            };

            fetch(`${API_URL}/api/getuserdetail`, requestOptions)
                .then(response => response.json())
                .then(data => {
                    console.log(data.data);
                    if (data.status == 200) {
                        setUserdata(data?.data[0]);
                    }
                }
                );
        }
        catch (err) {
            console.error(err.message); 
        }
    }

console.log(userdata);

const expiryDate = new Date ('2024-08-07');

    const subscriptionstartDate = new Date (userdata?.matrimonyplans?.start_date);
    const subscriptionExpiryDate = new Date (userdata?.matrimonyplans?.end_date);

    console.log(subscriptionstartDate); // Example date
    console.log(subscriptionExpiryDate);

 // Example date

    return (
        <>
            <SubscriptionNotification expiryDate={subscriptionExpiryDate} />
            <Banner Slider={Slider} settings={settings} images={imageBanner} links={imageLink1} />
            <Container fluid className='mt-5 mb-4'>
                <Services Slider={Slider} settings1={settings1} images={imageBanner1} texts={imageText} links={imageLink} />
            </Container>
            {/* <Container fluid className='achievement'>
                <Achievement />
            </Container> */}
            <About />
            {/* <Container fluid className='photogallery'>
                <Photogallery />
            </Container> */}
            {/* <Container fluid className='mt-5'>
                <Worldwide />
            </Container> */}
            <Videosection />
            <Testimonials />
            <Contact />
            <Faq />
            <Feedbackform />
        </>
    )
}

export default Homepage