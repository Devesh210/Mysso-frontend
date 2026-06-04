import React, { useState, useEffect, useRef } from 'react'
import { Col, Container, Form, Row, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import PhoneInput, { formatPhoneNumber, formatPhoneNumberIntl, isValidPhoneNumber } from "react-phone-number-input";
import en from 'react-phone-number-input/locale/en';
import 'react-phone-number-input/style.css';
import profile from "../../../../assets/profile.png";
import companylogo from "../../../../assets/companylogo.png"
import Select from 'react-select';
import API_URL from '../../../../../config';

const MedicalHospitalEditProfile = () => {
    const Navigate = useNavigate();

    const [image, setImage] = useState(companylogo);
    const [logo, setLogo] = useState('');
    const [hospitalName, setHospitalName] = useState('');
    const [hospitalType, setHospitalType] = useState('');
    const [accreditations, setAccreditations] = useState('');
    const [aboutHospital, setAboutHospital] = useState('');

    const [emergencyContactNumber, setEmergencyContactNumber] = useState('');
    const [isemergencyPhoneValid, setIsEmergencyPhoneValid] = useState(true);
    const [email, setEmail] = useState('');
    const [website, setWebsite] = useState('');
    const [mainContact, setMainContact] = useState('');
    const [ismainPhoneValid, setIsMainPhoneValid] = useState(true);
    const [mainBranchAddress, setMainBranchAddress] = useState('');
    const [numberOfBranches, setNumberOfBranches] = useState('');
    const [subBranches, setSubBranches] = useState([{ address: "", contactNumber: "" }]);
    const [isbranchPhoneValid, setIsBranchPhoneValid] = useState(true);

    const [availableFacilities, setAvailableFacilities] = useState('');
    const [hospitalCapacity, setHospitalCapacity] = useState('');
    const [parkingFacilities, setParkingFacilities] = useState('');
    const [visitingHours, setVisitingHours] = useState('');
    const [appointmentProcess, setAppointmentProcess] = useState('');
    const [cancellationPolicies, setCancellationPolicies] = useState('');
    const [twentyFourSeven, setTwentyFourSeven] = useState('');
    const [ambulanceService, setAmbulanceService] = useState('');

    const [insurancePartners, setInsurancePartners] = useState('');
    const [cashlessFacilities, setCashlessFacilities] = useState('');
    const [insuranceProcess, setInsuranceProcess] = useState('');

    const [mediaGallery, setMediaGallery] = useState([]);
    const [previewMedia, setPreviewMedia] = useState([]);

    const [loading, setLoading] = useState(false);
    const [id, setId] = useState('');

    const LogoRef = useRef(null);
    const HospitalNameRef = useRef(null);
    const HospitalTypeRef = useRef(null);
    const AboutHospitalRef = useRef(null);
    const EmergencyContactNumberRef = useRef(null);
    const EmailRef = useRef(null);
    const MainContactRef = useRef(null);
    const MainBranchAddressRef = useRef(null);
    const NumberOfBranchesRef = useRef(null);
    const AvailableFacilitiesRef = useRef(null);
    const HospitalCapacityRef = useRef(null);
    const VisitingHoursRef = useRef(null);
    const TwentyFourSevenRef = useRef(null);
    const mediaRef = useRef(null);

    useEffect(() => {
        if (localStorage.getItem('token')) {
        const url = window.location.href;
        const url1 = url.split("/")[3];
        const url2 = url1.split("?")[1];
        const id = url2.split("=")[1];
        getHospitaldata(id)
        } else {
            Navigate('/login');
        }
    }, [])

    const [hospitaldata, setHospitaldata] = useState([])

    const getHospitaldata = async (id) => {
        try {
            const requestOption = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            };
            await fetch(`${API_URL}/api/getHospitalById?id=${id}`, requestOption)
                .then((res) => res.json())
                .then((data) => {
                    console.log(data)
                    const hospital = data?.data[0]
                    setHospitaldata(hospital)
                    setId(hospital._id)
                    setLogo(hospital?.logo[0])
                    setHospitalName(hospital?.hospitalName)
                    setHospitalType(hospital?.hospitalType)
                    setAccreditations(hospital?.accreditations)
                    setAboutHospital(hospital?.aboutHospital)
                    setEmergencyContactNumber(hospital?.emergencyContactNumber)
                    setEmail(hospital?.email)
                    setWebsite(hospital?.website)
                    setMainContact(hospital?.mainContact)
                    setMainBranchAddress(hospital?.mainBranchAddress)
                    setNumberOfBranches(hospital?.numberOfBranches)
                    setSubBranches(hospital?.subBranches)
                    setAvailableFacilities(hospital?.availableFacilities)
                    setHospitalCapacity(hospital?.hospitalCapacity)
                    setParkingFacilities(hospital?.parkingFacilities)
                    setVisitingHours(hospital?.visitingHours)
                    setAppointmentProcess(hospital?.appointmentProcess)
                    setCancellationPolicies(hospital?.cancellationPolicies)
                    setTwentyFourSeven(hospital?.twentyFourSeven)
                    setAmbulanceService(hospital?.ambulanceService)
                    setInsurancePartners(hospital?.insurancePartners)
                    setCashlessFacilities(hospital?.cashlessFacilities)
                    setInsuranceProcess(hospital?.insuranceProcess)
                    setMediaGallery(hospital?.mediaGallery)
                    setPreviewMedia(hospital?.mediaGallery)

                })
        } catch (error) {
            console.log(error)
        }

    }

    console.log(hospitaldata)
    console.log(previewMedia)



    const handleAddBranch = () => {
        setSubBranches([...subBranches, { address: "", contactNumber: "" }]);
    };

    const handleRemoveBranch = (index) => {
        const newSubBranches = subBranches.filter((_, i) => i !== index);
        setSubBranches(newSubBranches);
    };

    const handleSubBranchChange = (index, field, value) => {
        const updatedSubBranches = [...subBranches];
        updatedSubBranches[index][field] = value;
        setSubBranches(updatedSubBranches);
    };

    const handleEmergencyPhoneChange = (value) => {
        setEmergencyContactNumber(value);
        if (value === '' || value === undefined) {
            setIsEmergencyPhoneValid(true);
        } else {
            setIsEmergencyPhoneValid(isValidPhoneNumber(value));
        }
    };

    const handleMainPhoneChange = (value) => {
        setMainContact(value);
        if (value === '' || value === undefined) {
            setIsMainPhoneValid(true);
        } else {
            setIsMainPhoneValid(isValidPhoneNumber(value));
        }
    };

    const handleBranchPhoneChange = (index, value) => {
        // Create a new array with the updated contact number for the specific branch
        const updatedBranches = subBranches.map((branch, i) =>
            i === index ? { ...branch, contactNumber: value } : branch
        );

        // Update the state with the new subBranches array
        setSubBranches(updatedBranches);

        // Perform validation and set validation state
        const isValid = value === '' || value === undefined || isValidPhoneNumber(value);
        setIsBranchPhoneValid(isValid);
    };



    const handleImageChange = (e) => {
        const file = e.target.files[0];

        if (!file) return;

        // // Set maximum file size to 2MB (can be adjusted)
        // const maxSize = 1 * 1024 * 1024; // 2MB

        //Set maximum file size to 500kb
        const maxSize = 500 * 1024; // 500kb

        // Check file size
        if (file.size > maxSize) {
            swal({
                text: "File size exceeds 500KB limit.",
                icon: "warning",
            });
            return;
        }

        const img = new Image();
        img.src = URL.createObjectURL(file);

        img.onload = () => {
            const { width, height } = img;

            // Set minimum width and height (300px x 300px as an example)
            if (width > 300 || height > 300) {
                swal({
                    text: "Image dimensions should not be more than 300x300 pixels.",
                    icon: "warning",
                });
                return;
            }

            // If image is valid, read the file
            const reader = new FileReader();
            setLogo(file);
            reader.onloadend = () => {
                setImage(reader.result);
            };

            reader.readAsDataURL(file);
        };

        img.onerror = () => {
            swal({
                text: "Invalid image file.",
                icon: "error",
            });
        };
    };


    const handleMediaChange = (e) => {
        const files = Array.from(e.target.files);
        const mediaCountLimit = 10; // Assuming there's a media count limit like photos

        if (mediaGallery?.length + files.length > mediaCountLimit) {
            const remainingSlots = mediaCountLimit - mediaGallery.length;
            const filesToAdd = files.slice(0, remainingSlots);

            swal({
                text: `You can only upload ${mediaCountLimit} media files (photos/videos)`,
                icon: "warning",
            });

            handleMediaFiles(filesToAdd);
        } else {
            handleMediaFiles(files);
        }
    };

    const handleMediaFiles = (files) => {
        const previews = files.map(file => {
            if (file.type.startsWith("image/")) {
                return { type: "image", preview: URL.createObjectURL(file) };
            } else if (file.type.startsWith("video/")) {
                return { type: "video", preview: URL.createObjectURL(file) };
            }
            return null;
        }).filter(Boolean);

        setMediaGallery([...mediaGallery, ...files]);
        setPreviewMedia([...previewMedia, ...previews]);
    };

    const removeMedia = (index) => {
        const updatedMediaGallery = [...mediaGallery];
        updatedMediaGallery.splice(index, 1);

        const updatedPreviews = [...previewMedia];
        updatedPreviews.splice(index, 1);

        setMediaGallery(updatedMediaGallery);
        setPreviewMedia(updatedPreviews);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (logo.length == 0) {
                swal({
                    text: "Please upload a logo.",
                    icon: "warning",
                }).then(() => LogoRef.current.click());
                document.getElementById('focusableDiv').focus();
                // LogoRef.current.click();
                return;
            }
            else if (!hospitalName) {
                swal({
                    text: "Please enter hospital name.",
                    icon: "warning",
                });
                HospitalNameRef.current.focus();
                return;
            }
            else if (!hospitalType) {
                swal({
                    text: "Please select hospital type.",
                    icon: "warning",
                });
                HospitalTypeRef.current.focus();
                return;
            }
            else if (!aboutHospital) {
                swal({
                    text: "Please enter about hospital.",
                    icon: "warning",
                });
                AboutHospitalRef.current.focus();
                return;
            }
            else if (!emergencyContactNumber) {
                swal({
                    text: "Please enter emergency contact number.",
                    icon: "warning",
                });
                EmergencyContactNumberRef.current.focus();
                return;
            }
            else if (!isemergencyPhoneValid) {
                swal({
                    text: "Please enter valid emergency contact number.",
                    icon: "warning",
                });
                EmergencyContactNumberRef.current.focus();
                return;
            }
            else if (email && (!email.includes('@') || !email.includes('.'))) {
                swal({
                    text: "Please enter valid email address.",
                    icon: "warning",
                });
                EmailRef.current.focus();
                return;
            }
            else if (!mainContact) {
                swal({
                    text: "Please enter main contact number.",
                    icon: "warning",
                });
                MainContactRef.current.focus();
                return;
            }
            else if (!ismainPhoneValid) {
                swal({
                    text: "Please enter valid main contact number.",
                    icon: "warning",
                });
                MainContactRef.current.focus();
                return;
            }
            else if (!mainBranchAddress) {
                swal({
                    text: "Please enter main branch address.",
                    icon: "warning",
                });
                MainBranchAddressRef.current.focus();
                return;
            }
            else if (!numberOfBranches) {
                swal({
                    text: "Please enter number of branches.",
                    icon: "warning",
                });
                NumberOfBranchesRef.current.focus();
                return;
            }
            else if (!availableFacilities) {
                swal({
                    text: "Please enter available facilities.",
                    icon: "warning",
                });
                AvailableFacilitiesRef.current.focus();
                return;
            }
            else if (!hospitalCapacity) {
                swal({
                    text: "Please enter hospital capacity.",
                    icon: "warning",
                });
                HospitalCapacityRef.current.focus();
                return;
            }
            else if (!visitingHours) {
                swal({
                    text: "Please enter visiting hours.",
                    icon: "warning",
                });
                VisitingHoursRef.current.focus();
                return;
            }
            else if (!twentyFourSeven) {
                swal({
                    text: "Please select 24/7 services available.",
                    icon: "warning",
                });
                TwentyFourSevenRef.current.focus();
                return;
            }
            else if (mediaGallery.length == 0) {
                swal({
                    text: "Please upload media files.",
                    icon: "warning",
                });
                mediaRef.current.focus();
                return;
            }
            else {
                setLoading(true);

            const formData = new FormData();
            formData.append('id', id);
            formData.append('logo', logo);
            formData.append('hospitalName', hospitalName);
            formData.append('hospitalType', hospitalType);
            formData.append('accreditations', accreditations);
            formData.append('aboutHospital', aboutHospital);
            formData.append('emergencyContactNumber', emergencyContactNumber);
            formData.append('email', email);
            formData.append('website', website);
            formData.append('mainContact', mainContact);
            formData.append('mainBranchAddress', mainBranchAddress);
            formData.append('numberOfBranches', numberOfBranches);
            formData.append('subBranches', JSON.stringify(subBranches));
            formData.append('availableFacilities', availableFacilities);
            formData.append('hospitalCapacity', hospitalCapacity);
            formData.append('parkingFacilities', parkingFacilities);
            formData.append('visitingHours', visitingHours);
            formData.append('appointmentProcess', appointmentProcess);
            formData.append('cancellationPolicies', cancellationPolicies);
            formData.append('twentyFourSeven', twentyFourSeven);
            formData.append('ambulanceService', ambulanceService);
            formData.append('insurancePartners', insurancePartners);
            formData.append('cashlessFacilities', cashlessFacilities);
            formData.append('insuranceProcess', insuranceProcess);
            // mediaGallery.forEach(file => {
            //     formData.append('mediaGallery', file);
            // });
            mediaGallery.forEach(file => {
                if(file instanceof File){
                    formData.append('mediaGallery', file);
                } else {
                    formData.append('mediaGallery', file.filename);
                }
            });

            console.table(Array.from(formData));

            const requestoptions = {
                method: 'PUT',
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
                body: formData,
            };
            await fetch(`${API_URL}/api/updateHospitalData`, requestoptions)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    if (data.status == 200) {
                        swal({
                            text: data.message,
                            icon: "success",
                        });
                        Navigate('/Profile')
                        setLoading(false);
                    } else {
                        swal({
                            text: data.message,
                            icon: "error",
                        });
                        setLoading(false);
                    }
                })
            }
        } catch (error) {
            console.log(error);
        }
    }

    const allowOnlyNumbers = (e) => {
        e.preventDefault();
        const input = e.target;
        const value = input.value.replace(/[^\d]/g, ''); // Replace any non-numeric characters with an empty string
        input.value = value; // Set the input value to the filtered value
    }

    console.log(logo)

    return (
        <div>
            <Container fluid className='matrimonialform mt-5 mb-5'>
                <div className='profilegallery mb-5'>
                    <h3 className='text-center'>Hospital Information</h3>
                    <div className='descr-content'>
                        <Row>
                            <Col lg={4} className='mb-2'>
                                <label>Logo <span className='labelerrorssss'>*</span></label>
                                <div className='profileimgc12'>
                                    {/* <img src={image} alt="Profile" /> */}
                                    <img src={image != companylogo ? image : `${API_URL}/uploads/company_logo/${logo.filename}`} alt="Profile" />
                                    <div className='image edit1' style={{ width: '18%' }} onClick={() => document.getElementById('uploadInput').click()}>
                                        <i className='fa fa-edit'> Select file</i>
                                    </div>
                                    <input
                                        id="uploadInput"
                                        type="file"
                                        accept=".jpg, .jpeg, .png"
                                        style={{ display: 'none' }}
                                        onChange={handleImageChange}
                                        required
                                        ref={LogoRef}

                                    />
                                </div>
                                <div className='disclaimer-note'>
                                    <strong>Note : </strong> File formats allowed: .jpg, .jpeg, .png.<br />
                                    Maximum dimensions: 300x300 pixels.<br />
                                    Maximum file size: 500KB.
                                </div>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>Hospital Name <span className='labelerrorssss'>*</span></label>
                                <Form.Group className="mb-3" controlId="formFullName">
                                    <Form.Control type="text" placeholder='Enter Hospital Name' value={hospitalName} onChange={(e) => setHospitalName(e.target.value)} ref={HospitalNameRef} />
                                </Form.Group>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>Hospital Type <span className='labelerrorssss'>*</span></label>
                                <Form.Group className="mb-3" controlId="formGender">
                                    <Form.Select className='mb-3' value={hospitalType} onChange={(e) => setHospitalType(e.target.value)} ref={HospitalTypeRef}>
                                        <option hidden>Select Hospital Type</option>
                                        <option value="General">General</option>
                                        <option value="Specialist">Specialist</option>
                                        <option value="Clinic">Clinic</option>
                                        <option value="Diagnostic Center">Diagnostic Center</option>
                                        <option value="Multi-Specialty Hospital">Multi-Specialty Hospital</option>
                                        <option value="Super-Specialty Hospital">Super-Specialty Hospital</option>
                                        <option value="Rehabilitation Center">Rehabilitation Center</option>
                                        <option value="Maternity Hospital">Maternity Hospital</option>
                                        <option value="Children's Hospital">Children's Hospital</option>
                                        <option value="Mental Health Hospital">Mental Health Hospital</option>
                                        <option value="Veterinary Hospital">Veterinary Hospital</option>
                                        <option value="Nursing Home">Nursing Home</option>
                                        <option value="Community Health Center">Community Health Center</option>
                                        <option value="Telemedicine Facility">Telemedicine Facility</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>Accreditation's/Certifications </label>
                                <Form.Group className="mb-3"  controlId="formSkills">
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        style={{ height: '180px' }}
                                        placeholder='Enter Accreditation/Certifications'
                                        onChange={(e) => setAccreditations(e.target.value)}
                                        value={accreditations}
                                        
                                    />
                                </Form.Group>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>About the Hospital <span className='labelerrorssss'>*</span></label>
                                <Form.Group className="mb-3"  controlId="formSkills">
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        style={{ height: '180px' }}
                                        placeholder='Enter About the Hospital'
                                        onChange={(e) => setAboutHospital(e.target.value)}
                                        value={aboutHospital}
                                        ref={AboutHospitalRef}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                    </div>
                </div>

                <div className='profilegallery mb-5'>
                    <h3 className='text-center'>Location and Contact Details</h3>
                    <div className='descr-content'>
                        <Row>
                            <Col lg={4} className='mb-2'>
                                <label>Emergency Contact Number <span className='labelerrorssss'>*</span></label>
                                <PhoneInput
                                    className={`form-control ${!isemergencyPhoneValid ? 'is-invalid' : ''}`}
                                    defaultCountry="IN"
                                    international
                                    countryCallingCodeEditable={false}
                                    localization={en}
                                    placeholder="Phone Number"
                                    value={emergencyContactNumber}
                                    onChange={handleEmergencyPhoneChange}
                                    ref={EmergencyContactNumberRef}

                                />
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>Email address </label>
                                <Form.Group className="mb-3" controlId="formFullName">
                                    <Form.Control type="text" placeholder='Please Enter Your Email Address' value={email} onChange={(e) => setEmail(e.target.value)} ref={EmailRef} />
                                </Form.Group>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>Website URL </label>
                                <Form.Group className="mb-3" controlId="formFullName">
                                    <Form.Control type="text" placeholder='Please Enter Your Website URL' value={website} onChange={(e) => setWebsite(e.target.value)} />
                                </Form.Group>
                            </Col>

                            <Col lg={4} className='mb-2'>
                                <label>Main Contact Number <span className='labelerrorssss'>*</span></label>
                                <PhoneInput
                                    className={`form-control ${!ismainPhoneValid ? 'is-invalid' : ''}`}
                                    defaultCountry="IN"
                                    international
                                    countryCallingCodeEditable={false}
                                    localization={en}
                                    placeholder="Phone Number"
                                    value={mainContact}
                                    onChange={handleMainPhoneChange}
                                    ref={MainContactRef}
                                />
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>Main Branch Address <span className='labelerrorssss'>*</span></label>
                                <Form.Group className="mb-3" controlId="formSkills">
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        style={{ height: '180px' }}
                                        placeholder='Please Enter Main Branch Address'
                                        value={mainBranchAddress}
                                        onChange={(e) => setMainBranchAddress(e.target.value)}
                                        ref={MainBranchAddressRef}

                                    />
                                </Form.Group>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>Number of Branches <span className='labelerrorssss'>*</span></label>
                                <Form.Group className="mb-3" controlId="formFullName">
                                    <Form.Control type="text" placeholder='Enter Number of Branches' value={numberOfBranches} onInput={allowOnlyNumbers} maxLength={3} onChange={(e) => setNumberOfBranches(e.target.value)} ref={NumberOfBranchesRef} />
                                </Form.Group>
                            </Col>
                            {/* Sub-Branches Section */}
                            <Col lg={12}>
                                <label>Sub-Branches Information  (if any)
                                    <div className='add-branch-btn' onClick={handleAddBranch}>
                                        <i className="fa fa-plus" aria-hidden="true" ></i>
                                    </div>
                                </label>
                                {subBranches?.map((branch, index) => (
                                    <div key={index} className='mb-3'>
                                        <Row>
                                            <Col lg={4} className='mb-2'>
                                                <label>Contact Number</label>


                                                <PhoneInput
                                                    className={`form-control ${!isbranchPhoneValid ? 'is-invalid' : ''}`}
                                                    defaultCountry="IN"
                                                    international
                                                    countryCallingCodeEditable={false}
                                                    localization={en}
                                                    placeholder="Phone Number"
                                                    value={subBranches[index].contactNumber}  // Make sure to access the correct branch's contactNumber
                                                    onChange={(value) => handleBranchPhoneChange(index, value)}
                                                />

                                            </Col>
                                            <Col lg={4} className='mb-2'>
                                                <label>Sub-Branch Address</label>
                                                <Form.Control
                                                    as="textarea"
                                                    rows={3}
                                                    style={{ height: '180px' }}
                                                    value={branch.address}
                                                    placeholder='Enter Sub-Branch Address'
                                                    onChange={(e) => handleSubBranchChange(index, 'address', e.target.value)}
                                                />
                                            </Col>

                                            <Col lg={4} className='mb-2' >
                                                <div className='remove-branch-btn' onClick={() => handleRemoveBranch(index)}>
                                                    <i className="fa fa-minus" aria-hidden="true" ></i>
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                ))}

                            </Col>

                        </Row>
                    </div>
                </div>

                <div className='profilegallery mb-5'>
                    <h3 className='text-center'>Facilities & Infrastructure</h3>
                    <div className='descr-content'>
                        <Row>
                            <Col lg={4} className='mb-2'>
                                <label>Available Facilities <span className='labelerrorssss'>*</span></label>
                                <Form.Group className="mb-3" controlId="formSkills">
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        style={{ height: '180px' }}
                                        placeholder='Enter Available Facilities'
                                        value={availableFacilities}
                                        onChange={(e) => setAvailableFacilities(e.target.value)}
                                        ref={AvailableFacilitiesRef}

                                    />
                                </Form.Group>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>Hospital Capacity <span className='labelerrorssss'>*</span></label>
                                <Form.Group className="mb-3" controlId="formSkills">
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        style={{ height: '180px' }}
                                        placeholder='Enter Hospital Capacity'
                                        value={hospitalCapacity}
                                        onChange={(e) => setHospitalCapacity(e.target.value)}
                                        ref={HospitalCapacityRef}
                                    />
                                </Form.Group>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>Parking Facilities  </label>
                                <Form.Group className="mb-3" controlId="formGender">
                                    <Form.Select className='mb-3' value={parkingFacilities} onChange={(e) => setParkingFacilities(e.target.value)} >
                                        <option hidden>Select</option>
                                        <option value="Yes">Yes</option>
                                        <option value="No">No</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>Visiting Hours <span className='labelerrorssss'>*</span></label>
                                <Form.Group className="mb-3" controlId="formSkills">
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        style={{ height: '180px' }}
                                        placeholder='Enter Visiting Hours'
                                        value={visitingHours}
                                        onChange={(e) => setVisitingHours(e.target.value)}
                                        ref={VisitingHoursRef}

                                    />
                                </Form.Group>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>Appointment Booking Process </label>
                                <Form.Group className="mb-3" controlId="formSkills">
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        style={{ height: '180px' }}
                                        placeholder='Enter Appointment Booking Process'
                                        value={appointmentProcess}
                                        onChange={(e) => setAppointmentProcess(e.target.value)}
                                    />
                                </Form.Group>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>Cancellation/Rescheduling Policies </label>
                                <Form.Group className="mb-3" controlId="formSkills">
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        style={{ height: '180px' }}
                                        placeholder='Enter Cancellation/Rescheduling Policies'
                                        value={cancellationPolicies}
                                        onChange={(e) => setCancellationPolicies(e.target.value)}
                                    />
                                </Form.Group>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>24/7 Services Available <span className='labelerrorssss'>*</span></label>
                                <Form.Group className="mb-3" controlId="formGender">
                                    <Form.Select className='mb-3' value={twentyFourSeven} onChange={(e) => setTwentyFourSeven(e.target.value)} ref={TwentyFourSevenRef}>
                                        <option hidden>Select</option>
                                        <option value="Yes">Yes</option>
                                        <option value="No">No</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>Ambulance Service Information</label>
                                <Form.Group className="mb-3" controlId="formSkills">
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        style={{ height: '180px' }}
                                        placeholder='Enter Ambulance Service Information'
                                        value={ambulanceService}
                                        onChange={(e) => setAmbulanceService(e.target.value)}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                    </div>
                </div>

                <div className='profilegallery mb-5'>
                    <h3 className='text-center'>Insurance Partners</h3>
                    <div className='descr-content'>
                        <Row>
                            <Col lg={4} className='mb-2'>
                                <label>List Insurance Partners </label>
                                <Form.Group className="mb-3" controlId="formSkills">
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        style={{ height: '180px' }}
                                        placeholder='Enter Insurance Partners'
                                        value={insurancePartners}
                                        onChange={(e) => setInsurancePartners(e.target.value)}
                                    />
                                </Form.Group>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>Cashless Facilities </label>
                                <Form.Group className="mb-3" controlId="formGender">
                                    <Form.Select className='mb-3' value={cashlessFacilities} onChange={(e) => setCashlessFacilities(e.target.value)}>
                                        <option hidden>Select</option>
                                        <option value="Yes">Yes</option>
                                        <option value="No">No</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>Insurance Process Details </label>
                                <Form.Group className="mb-3" controlId="formSkills">
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        style={{ height: '180px' }}
                                        placeholder='Enter Insurance Process Details'
                                        value={insuranceProcess}
                                        onChange={(e) => setInsuranceProcess(e.target.value)}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                    </div>
                </div>
                <div className='profilegallery mb-5'>
                    <h3 className='text-center'>Media Gallery <span className='labelerrorssss'>*</span></h3>
                    <div className='descr-content'>
                        <div className="image-upload">
                            <label style={{ cursor: "pointer" }} htmlFor="file_upload">
                                <div className="h-100">
                                    <div className="dplay-tbl">
                                        <div className="dplay-tbl-cell">
                                            <i className="fa fa-cloud-upload" />
                                            <h5><b>Choose Your Media (Photos/Videos)</b></h5>
                                            <h6 className="mt-10 mb-70">Or Drop Your Media Here</h6>
                                        </div>
                                    </div>
                                </div>
                                <input
                                    type="file"
                                    id="file_upload"
                                    className="image-input"
                                    onChange={handleMediaChange}
                                    multiple
                                    accept=".jpg, .jpeg, .png, .mp4, .mov, .avi"
                                    ref={mediaRef}

                                />
                            </label>
                        </div>
                        <div>
                            <Row>
                                {previewMedia?.map((media, index) => (
                                    <Col lg={3} key={index}>
                                        {media.filename ?
                                            <div className='photo-container mb-2'>
                                                {media.mimetype?.startsWith("image") ? (
                                                    <img src={`${API_URL}/uploads/photos/${media.filename}`} alt="Preview" className="photoorodfd" />
                                                ) : (
                                                    <video src={`${API_URL}/uploads/photos/${media.filename}`} className="photoorodfd" controls />
                                                )}
                                                <button className='remove' onClick={() => removeMedia(index)}>
                                                    <span className='cross'>x</span>
                                                </button>
                                            </div>


                                            :
                                        <div className='photo-container mb-2'>
                                            {media.type === "image" ? (
                                                <img src={media.preview} alt="Preview" className="photoorodfd" />
                                            ) : (
                                                <video src={media.preview} className="photoorodfd" controls />
                                            )}
                                            <button className='remove' onClick={() => removeMedia(index)}>
                                                <span className='cross'>x</span>
                                            </button>
                                        </div>
                                            }
                                    </Col>
                                ))}
                            </Row>
                        </div>
                    </div>
                </div>

                <button type='submit' className='submitforms' onClick={handleSubmit} >Submit Form</button>

            </Container>
        </div>
    )
}

export default MedicalHospitalEditProfile;
