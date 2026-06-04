import React from 'react'
import Startupbanner from './Startupbanner'
import Testimonials from '../home/Testimonials'
import Startupnew from './Startupnew'
import borderimg from '../../../assets/border.svg';
import Startupstage from './Startupstage';
const Startupdetail = () => {
    return (
        <div className='startupabout'>
            {/* <Startupbanner /> */}
            <h3 className='startuabout'>About  <span>Startup</span> <img className='imgsabouts' src={borderimg} alt="border" /></h3>
            <div className='startup-intross'>
                {/* <h3>Lorem Ipsum is simply dummy text of the printing and typesetting industry printing and typesetting industry printing and typesetting industry printing and typesetting industry</h3> */}
                <p>The Swaminarayan Satsangi Organisation proudly presents a transformative Start-
                    up Initiative that bridges the gap between wisdom and entrepreneurial excellence.
                    Our program seeks to inspire and empower aspiring entrepreneurs to create
                    ventures that achieve economic success and contribute positively to society.
                    Our initiative provides a complete platform combining mentorship from
                    experienced business leaders and guidance, comprehensive educational resources,
                    and a supportive community committed to shared values. Actual innovation
                    benefits when grounded in ethics, compassion, and a higher purpose.
                    Participants will have access to workshops, networking opportunities, and funding
                    avenues designed to nurture ideas from conception to realization. Whether you're
                    looking to launch a tech start-up, a social enterprise, or a community project, our
                    program equips you with the tools and guidance needed to navigate the challenges
                    of the modern business landscape while staying true to your moral and spiritual
                    convictions.
                    Join us in crafting a future where entrepreneurship serves as a force for good,
                    driving sustainable growth and uplifting communities worldwide. Together, let's
                    embark on a journey of innovation, integrity, and inspired leadership that reflects
                    the profound principles of the business tradition.</p>
            </div>
            {/* <Startupstage/>
            <Startupnew />
            <Testimonials /> */}
        </div>
    )
}

export default Startupdetail