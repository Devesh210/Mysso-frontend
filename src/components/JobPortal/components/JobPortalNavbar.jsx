import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { Row, Col, Button } from 'react-bootstrap';
import { usegetSubsription } from '../../../hooks';
import { RERECRUITER, SEEKER } from '../../../../config';
const JobPortalNavbar = () => {
  const { state } = useLocation()

  console.log("state???", state)
  const { role, token } = useSelector((state) => state.auth);
  const [navlinks, setNavlinks] = useState([])
  // for subcription
  const { SubscriptionisRequired } = usegetSubsription();
  const navigate = useNavigate();

  const jobSeekerLinks = [
    { label: 'Jobs', path: '/jobs' },
    { label: 'Your Profile', path: '/job/profiledata' },
    { label: 'Applied Jobs', path: '/jobs/applied' },
  ];
  const recruiterLinks = [
    // { label: 'Companies', path: '/admin/companies' },
    { label: 'Posted Jobs', path: '/admin/jobs' },
    { label: 'Your Profile', path: '/job/profiledata' },
    { label: 'Shortlists Candidates', path: '/admin/applicants/shortlists' },
    { label: 'Applicant Tracking', path: '/admin/applicants' },
    { label: 'Post a Job', path: '/admin/jobs/create' },
  ];
  const subscriptionLink = {
    label: 'Subscribe Plans',
    path: '/JobPortalPricing',
  };
  const getLinks = () => {
    if (!role) return [
      { label: 'Register as a Recruiter', path: '/job/RecuiterForm' },
      { label: 'Register as a JobSeeker', path: '/job/JobseekerForm' },
    ];
    let links = [];
    if (role === RERECRUITER) {
      links = [...recruiterLinks]
    }
    if (role === SEEKER) {
      links = [...jobSeekerLinks]
    }
    // for subcription
    // if (role === RERECRUITER && SubscriptionisRequired) {
    //   links.push(subscriptionLink);
    // }
    console.log({ links })
    return links;
  };


  useEffect(() => {
    const links = getLinks()
    setNavlinks(links)
  }, [role, token])
  useEffect(() => {
    if (navlinks.length > 0 && state?.isApplyjob) {
      const element = document.getElementById('job-portal-navbar');
      if (element) {
        const yOffset = -100; // Adjust this value as needed
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
  }, [state, navlinks]);
  return (
    <div className='matrinformass' id='job-portal-navbar'>
      <h2>Job Portal Information</h2>
      <div className="job-portal-navbar" >
        <Row className="gy-2">
          {navlinks.map((link, index) => (
            <Col xs={12} sm={6} md={4} lg={3} key={index}>
              <Button
                className='addbtn w-100'
                //   variant="outline-primary"
                onClick={() => navigate(link.path)}
              >
                {link.label}
              </Button>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default JobPortalNavbar;