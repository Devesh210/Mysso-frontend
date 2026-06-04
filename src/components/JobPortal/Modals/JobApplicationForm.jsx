import React, { useState } from 'react';
import { Form, Button, Row, Col, Modal } from 'react-bootstrap';
import { useApplyJobMutation, useUpdateProfileMutation } from "../../../redux/apiSlice";
import { useDispatch } from 'react-redux';
import { useValidateJobDescription } from '../../../hooks';
import swal from 'sweetalert';

const JobApplicationForm = ({ singleJob, jobId, setOpenModal, singleJObrefetch }) => {
    const { data, setTimestatmp } = useValidateJobDescription(setOpenModal);

    const [formData, setFormData] = useState({
        cv: "",
        loading: false,
        resumeLoading: false,
        isResumeUploaded: true,
    });

    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']; // PDF, DOC, DOCX

        if (selectedFile && !allowedTypes.includes(selectedFile?.type)) {
            swal("Error", "Only PDF and DOC files are allowed.", "error");
            setFile(null);
            setFormData(prevState => ({ ...prevState, cv: "", isResumeUploaded: false }));
            return;
        }
        setFile(selectedFile);
        setFormData(prevState => ({ ...prevState, cv: selectedFile?.name, isResumeUploaded: false }));
    };

    // RTK Query Mutations
    const [applyJob] = useApplyJobMutation();
    const [uploadresume] = useUpdateProfileMutation();

    const applyJobHandler = async (e) => {
        e.preventDefault();
        try {
            if (file && !formData.isResumeUploaded) {
                swal("Error", "Please upload your resume.", "error");
                return;
            }

            if (!data?.additionalInformation?.resumeurl && !file) {
                swal("Error", "Please upload your resume.", "error");
                return;
            }

            const res = await applyJob({ jobId }).unwrap();
            if (res.success) {
                setOpenModal(false); // Close the modal
                singleJObrefetch();
                swal("Success", res.message, "success");
            }
        } catch (error) {
            console.log("Error", error);
            swal("Error", error.data?.message || "An error occurred", "error");
        }
    };

    const uploadResume = async () => {
        try {
            if (!file) {
                swal("Error", "Please select a file.", "error");
                return;
            }

            const formData = new FormData();
            formData.append('resume', file);
            setFormData(prevState => ({ ...prevState, resumeLoading: true, isResumeUploaded: false }));

            const res = await uploadresume(formData).unwrap();
            if (res.success) {
                // dispatch(setJobProfileData(res.data));
                setFormData(prevState => ({
                    ...prevState,
                    resumeurl: res.data.resumeurl,
                    resumeLoading: false,
                    isResumeUploaded: true
                }));
                setTimestatmp(Date.now());
                swal("Success", res.message, "success");
            }
        } catch (error) {
            setFormData(prevState => ({ ...prevState, resumeLoading: false }));
            swal("Error", error.data?.message || "An error occurred", "error");
        }
    };

    return (
        <>
            <Modal.Header closeButton style={{ background: "#102A7F" }}>
                <Modal.Title className="text-white">Apply for {singleJob?.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Are you sure you want to apply for this job?</p>
                <Form onSubmit={applyJobHandler} className="p-2">
                    <Row>
                        <Col md={8}>
                            <Form.Group className="mb-3">
                                <Form.Label><h4>Upload Your CV</h4></Form.Label>
                                <Form.Control
                                    type="file"
                                    name="cv"
                                    onChange={handleFileChange}
                                    id="cvUpload"
                                    accept=".pdf, .doc, .docx"
                                />
                                <small className="text-muted">
                                    Allowed file types: PDF, DOC, DOCX
                                </small>
                                <div>
                                    {data && data?.additionalInformation?.resumeurl && (
                                        <a
                                            href={data?.additionalInformation?.resumeurl}
                                            className="h-64 w-full object-contain"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {data?.additionalInformation?.resumeOriginalName}
                                        </a>
                                    )}
                                </div>
                            </Form.Group>
                        </Col>
                        <Col md={4} className="d-flex align-items-center justify-content-end">
                            <Button
                                className="border-0"
                                style={{ background: "#102A7F" }}
                                disabled={singleJob?.isApplied || formData.resumeLoading || formData.loading}
                                onClick={uploadResume}
                            >
                                {singleJob?.isApplied || formData.resumeLoading || formData.loading ? "Uploading" : " Upload"}
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => setOpenModal(false)} variant="outline">Close</Button>
                <Button
                    disabled={formData.resumeLoading || formData.loading || singleJob?.isApplied}
                    onClick={applyJobHandler}
                    style={{ background: "#102A7F" }}
                    className="bg-[#102A7F] hover:bg-[#5f32ad]"
                >
                    {singleJob?.isApplied ? "Applied" : formData.resumeLoading ? "Resume Uploading..." : formData.loading ? "...Please Wait" : "Apply Now"}
                </Button>
            </Modal.Footer>
        </>
    );
};

export default JobApplicationForm;
