import React, { useState, useEffect } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import { useUpdateProfileMutation } from '../../../../redux/apiSlice';
import { useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import { setUpdatedJobProfileData } from '../../../../redux/authSlice';
import profile from '../../../../assets/profile.png';
import swal from 'sweetalert';
const ProfileUpdate = ({ profileData }) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [updateProfile] = useUpdateProfileMutation();
    const [formData, setFormData] = useState({
        profilephotoPreview: profile,
        resumePreview: null,
        IdProofPreview: null,
        resumeurl: "",
        IdProofurl: "",
        profilephoto: null,
        resume: null,
        IdProof: null,
        IdProofOriginalName: "",
        resumeOriginalName: ""
    });

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        if (files && files.length > 0) {
            const file = files[0];
            setFormData(prevState => ({ ...prevState, [name]: file }));
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prevState => ({ ...prevState, [name + "Preview"]: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleUpdate = async (fileType) => {
        if (!formData[fileType]) {
            swal({ text: `Please upload a ${fileType}`, icon: "warning" });
            return;
        }
        try {
            setLoading(true);
            const formDataObj = new FormData();
            formDataObj.append(fileType, formData[fileType]);

            const response = await updateProfile(formDataObj).unwrap();
            dispatch(setUpdatedJobProfileData(response.data));
            swal({ text: response.message, icon: "success" });
        } catch (err) {
            swal({ text: err.data?.message || err.error, icon: "error" });
            console.error(err);
        } finally {
            setLoading(false);
        }
    };
    console.log({ formData })
    useEffect(() => {
        if (profileData && Object.keys(profileData).length > 0) {
            const { profilePhotoUrl, IdProofurl, IdProofOriginalName, resumeurl, resumeOriginalName } = { ...profileData.personalDetails, ...profileData.additionalInformation };
            setFormData(prevState => ({
                ...prevState,
                profilephotoPreview: profilePhotoUrl || profile,
                IdProofurl,
                IdProofOriginalName,
                resumeurl,
                resumeOriginalName
            }));
        }
    }, [profileData]);

    return (
        <div>
            <Row className='mb-4'>
                <Col lg={4}>
                    <div className='profileimgc text-center'>
                        <img src={formData.profilephotoPreview} alt="Profile" />
                        <div className='profilephoto edit' onClick={() => document.getElementById('uploadInput').click()}>
                            <i className='fa fa-edit'></i>
                        </div>
                        <input
                            id="uploadInput"
                            type="file"
                            name='profilephoto'
                            accept=".jpg, .jpeg, .png"
                            style={{ display: 'none' }}
                            onChange={handleFileChange}
                        />
                        {/* <span className='labelerrorssss'>*</span> */}
                        <button type='button' className='addbtn' onClick={() => handleUpdate('profilephoto')} disabled={loading}>
                            Update Profile Photo
                        </button>
                    </div>

                </Col>
                <Col lg={4} >
                    <label>Upload Resume <span className='labelerrorssss'>*</span></label>
                    <Form.Group className="mb-3">
                        <Form.Control
                            type="file"
                            name="resume"
                            accept=".pdf, .doc, .docx"
                            onChange={handleFileChange}
                        />
                    </Form.Group>
                    {formData.resumeurl && <div>
                        <a href={formData.resumeurl} target="_blank" rel="noopener noreferrer">{formData.resumeOriginalName}t</a>
                    </div>}

                    <button type='button' onClick={() => handleUpdate('resume')} className='addbtn mt-4' disabled={loading}>
                        Update Resume
                    </button>
                </Col>
                <Col lg={4} >
                    <label>Upload Id Proof <span className='labelerrorssss'>*</span></label>
                    <Form.Group className="mb-3">
                        <Form.Control
                            type="file"
                            name="IdProof"
                            accept=".jpg, .jpeg, .png,.pdf,"
                            onChange={handleFileChange}
                        />
                    </Form.Group>
                    {formData.IdProofurl && (
                        <div>
                            <a href={formData.IdProofurl} target="_blank" rel="noopener noreferrer">{formData.IdProofOriginalName}</a>
                        </div>
                    )}
                    <button type='button' onClick={() => handleUpdate('IdProof')} className='addbtn mt-4' disabled={loading}>
                        Update ID Proof
                    </button>
                </Col>
            </Row>
        </div>

    );
};

export default ProfileUpdate;