import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import API_URL from '../../../config';

const UpdateProfileDialog = ({ open, setOpen }) => {
    const [loading, setLoading] = useState(false);
    const { data } = useSelector(store => store.auth);

    const [input, setInput] = useState({
        bio: data && data?.bio || "",
        skills: data && data?.skills?.map(skill => skill) || "",
        file: null
    });
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const fileChangeHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("bio", input.bio);
        formData.append("skills", input.skills);
        if (input.file) {
            formData.append("resume", input.file);
        }
        try {
            setLoading(true);
            const res = await axios.put(`${API_URL}/api/jobportal/user/updateprofile`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            });
            if (res.data.success) {
                // dispatch(setJobProfileData(res.data.data));
                swal("Success", res.data.message, "success");
            }
        } catch (error) {
            // console.log(error);
            swal("Error", error.response.data.message, "error");
        } finally {
            setLoading(false);
        }
        setOpen(false);
        // console.log(input);
    };

    return (
        <Modal show={open} onHide={() => setOpen(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Update Profile</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={submitHandler}>

                    <Form.Group className='mb-3' controlId="bio">
                        <Form.Label>Bio</Form.Label>
                        <Form.Control
                            type="text"
                            name="bio"
                            value={input.bio}
                            onChange={changeEventHandler}
                        />
                    </Form.Group>
                    <Form.Group className='mb-3' controlId="skills">
                        <Form.Label>Skills</Form.Label>
                        <Form.Control
                            type="text"
                            name="skills"
                            value={input.skills}
                            onChange={changeEventHandler}
                        />
                    </Form.Group>
                    <Form.Group className='mb-3' controlId="file">
                        <Form.Label>Resume</Form.Label>
                        <Form.Control
                            type="file"
                            name="file"
                            accept="application/pdf"
                            onChange={fileChangeHandler}
                        />
                    </Form.Group>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setOpen(false)}>
                            Close
                        </Button>
                        <Button variant="primary" type="submit" disabled={loading}>
                            {loading ? (
                                <>
                                    <span className='spinner-border spinner-border-sm mr-2'></span>
                                    Please wait
                                </>
                            ) : (
                                'Update'
                            )}
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default UpdateProfileDialog;
