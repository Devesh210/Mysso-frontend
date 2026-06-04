import React from 'react'
import Testimonials from '../home/Testimonials'
import Startupsteps from './Startupsteps'
import Startupnum from './Startupnum'
import Startupintro from './Startupintro'
import Startupbanner from './Startupbanner'
import Startupcards from './Startupcards'
import Startupcom from './Startupcom'
import Startupstage from './Startupstage'
import Startupdetail from './Startupdetail'
import Startupnew from './Startupnew'

const Startup = () => {
    return (
        <div>
            <Startupbanner />
            <Startupintro />
            <Startupdetail />
            {/* <Startupnum /> */}
            <Startupcards/>
            {/* <Startupsteps /> */}
            <Startupstage />
            {/* <Startupcom/> */}
            <Startupnew />

            <Testimonials />
        </div>
    )
}

export default Startup