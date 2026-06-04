import React, { useEffect } from 'react'
import HeroSection from './HeroSection'
import CategoryCarousel from './CategoryCarousel'
import LatestJobs from './LatestJobs'

import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Testimonial from './Testimonial'
import Steps from './steps'
import Counter from './Counter'
import JobPortalFeatureProfile from './components/JobPortalFeatureProfile'
import ComanyCarousel from './ComanyCarousel'
import JobSupport from './components/JobSupport'

const JobSection = () => {

  const { role } = useSelector(store => store.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (role === 'recruiter') {
      navigate("/admin/companies");
    }
  }, []);
  return (
    <div>

      <HeroSection />
      <CategoryCarousel />
      <Counter />
      {/* <Steps /> */}
      <LatestJobs />
      <JobSupport />
      <ComanyCarousel />
      <JobPortalFeatureProfile />
    </div>
  )
}

export default JobSection