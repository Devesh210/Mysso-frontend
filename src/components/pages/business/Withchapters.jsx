import React from 'react'
import Pricing from '../matrimonial/Pricing'
import Testimonials from '../home/Testimonials'
import Businessbanner from './Businessbanner'
import Businesscount from './Businesscount'
import Partnership from './Partnership'
import Businesssteps from './Businesssteps'
import Chapterconnect from './Chapterconnect'

const Withchapters = () => {
  return (
    <div>
        <Businessbanner/>
        <Businesscount/>
        <Partnership/>
        <Businesssteps/>
        <Chapterconnect/>
        <Pricing/>
        <Testimonials/>
    </div>
  )
}

export default Withchapters