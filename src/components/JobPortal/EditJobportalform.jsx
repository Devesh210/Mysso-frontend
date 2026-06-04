// use formik here 
// EditJobportalform.js
import React from 'react';
import 'react-phone-number-input/style.css';
import { useGetJobProfile } from '../../hooks';
import { useSelector } from 'react-redux';
import JobseekerFormEdit from './components/JobseekerFormEdit';
import { SEEKER } from '../../../config';
import RecuiterFormEdit from './components/RecuiterFormEdit';

const EditJobportalform = () => {
    const { role } = useSelector((state) => state.auth)
    const { data: profileData, isLoading: isProfileLoading } = useGetJobProfile();

    if (isProfileLoading) return <div>Loading...</div>;

    return (role === SEEKER ?
        <JobseekerFormEdit profileData={profileData} /> :
        <RecuiterFormEdit profileData={profileData} />

    )
};

export default EditJobportalform;
