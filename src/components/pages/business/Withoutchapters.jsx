import React from 'react'
import Pricing from '../matrimonial/Pricing'
import Testimonials from '../home/Testimonials'
import Businessbanner from './Businessbanner'
import Businesscount from './Businesscount'
import Partnership from './Partnership'
import Businesssteps from './Businesssteps'
import NetworkSupport from './NetworkSupport'

const Withoutchapters = () => {
  return (
    <div>
        <Businessbanner/>
        <Businesscount/>
        <Partnership/>
        {/* <Businesssteps/> */}
        {/* <Pricing/> */}
        <NetworkSupport/>
        <Testimonials/>
    </div>
  )
}

export default Withoutchapters