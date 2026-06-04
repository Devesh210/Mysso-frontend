import React, { useEffect } from 'react'
import Testimonials from '../components/pages/home/Testimonials'
import Successstories from '../components/pages/matrimonial/Successstories'
import About from '../components/pages/matrimonial/About'
import Featuredprofile from '../components/pages/matrimonial/Featuredprofile'
import Banner from '../components/pages/matrimonial/Banner'
import Pricing from '../components/pages/matrimonial/Pricing'
import Support from '../components/pages/matrimonial/Support'
import Count from '../components/pages/matrimonial/Count'
import swal from 'sweetalert'
import { Container } from 'react-bootstrap'

const Matrimonial = () => {

    // useEffect(() => {
    //     if (!localStorage.getItem('token')) {
    //         swal({
    //             title: "Your Session Has Expired",
    //             text: "Please log in again to continue.",
    //             icon: "warning",
    //         }).then(() => {
    //             window.location.href = '/new/login';
    //         });
    //     }
    // }, [])


    return (
        <div>

            <Banner />
            <Featuredprofile />
            {/* <Container fluid className='achievement'>
                    <Count />
                </Container> */}
            <About />
            <Support />
            <Pricing />
            {/* <Successstories /> */}
            {/* <Testimonials /> */}
        </div>
    )
}

export default Matrimonial
