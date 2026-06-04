import React, { useEffect, useState } from 'react';
import { Badge, Button, Col, Container, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import profile from "../../assets/matrimonial/searchimg.png"
import info from "../../assets/matrimonial/info.svg"
import home from "../../assets/matrimonial/home.svg"

import Banner from '../pages/matrimonialsearch/Banner';
import location from "../../assets/matrimonial/location.svg"
import { useGetJobProfile } from '../../hooks';
import { useSelector } from 'react-redux';
import { RERECRUITER } from '../../../config';
import RecruiterProfile from './RecruiterProfile';
import JobSeekerProfile from './JobSeekerProfile';
import { useGetJobPortalProfileQuery } from '../../redux/apiSlice';


const MyJobprofile = () => {
    const { role } = useSelector((state) => state.auth)
    const { data: profiledata } = useGetJobPortalProfileQuery()
    return (

        <>
            {/* <Banner /> */}
            {
                profiledata?.data && Object.keys(profiledata?.data).length > 0 && role == RERECRUITER ? <RecruiterProfile profiledata={profiledata?.data} /> : <JobSeekerProfile profiledata={profiledata?.data} />
            }
        </>
    )
}

export default MyJobprofile
