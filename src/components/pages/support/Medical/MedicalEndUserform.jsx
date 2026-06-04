import React, { useState, useEffect, useRef } from 'react'
import { Col, Container, Form, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import PhoneInput, { formatPhoneNumber, formatPhoneNumberIntl, isValidPhoneNumber } from "react-phone-number-input";
import en from 'react-phone-number-input/locale/en';
import 'react-phone-number-input/style.css';
import profile from "../../../../assets/profile.png";
import Select from 'react-select';
import API_URL from '../../../../../config';

const MedicalEndUserform = () => {
    const Navigate = useNavigate();

    const [countryList, setCountryList] = useState([]);
    const [stateList, setStateList] = useState([]);
    const [cityList, setCityList] = useState([]);
    const [emergencyStateList, setEmergencyStateList] = useState([]);
    const [emergencyCityList, setEmergencyCityList] = useState([]);

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [isPhoneValid, setIsPhoneValid] = useState(true);
    const [image, setImage] = useState(profile);
    const [profilePicture, setProfilePicture] = useState(null);

    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [country, setCountry] = useState('');
    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    const [preferredLanguage, setPreferredLanguage] = useState('');

    const [emergencyContactName, setEmergencyContactName] = useState('');
    const [relationship, setRelationship] = useState('');
    const [emergencyCountry, setEmergencyCountry] = useState('');
    const [emergencyState, setEmergencyState] = useState('');
    const [emergencyCity, setEmergencyCity] = useState('');
    const [emergencyContactNumber, setEmergencyContactNumber] = useState('');
    const [isemergencyPhoneValid, setIsEmergencyPhoneValid] = useState(true);

    const [pastTreatments, setPastTreatments] = useState('');
    const [regularMedication, setRegularMedication] = useState('');
    
    const [insuranceProvider, setInsuranceProvider] = useState('');
    const [coverageDetails, setCoverageDetails] = useState('');

    const [loading, setLoading] = useState(false);

    //create refs for mandatory fields
    const fullNameRef = useRef();
    const emailRef = useRef();
    const contactNumberRef = useRef();
    const profilePic = useRef();
    const ageRef = useRef();
    const emergencyContactNameRef = useRef();
    const emergencyCountryRef = useRef();
    const emergencyStateRef = useRef();
    const emergencyCityRef = useRef();
    const emergencyContactNumberRef = useRef();




    useEffect(() => {
        getCountry();
    }, []);

    useEffect(() => {
        getState();
    }, [country]);

    useEffect(() => {
        getCity();
    }, [state]);

    useEffect(() => {
        getEmergencyState();
    }, [emergencyCountry]);

    useEffect(() => {
        getEmergencyCity();
    }, [emergencyState]);


    const getCountry = async () => {
        try {
            const requestoptions = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            };
            await fetch(`${API_URL}/api/countryList`, requestoptions)
                .then(response => response.json())
                .then(data => {
                    console.log(data.data);
                    setCountryList(data.data);

                })
        }
        catch (err) {
            console.error(err.message);
        }
    }


    const getState = async () => {
        try {
            const requestoptions = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            };
            await fetch(`${API_URL}/api/getstatebycountry?country_id=${country}`, requestoptions)
                .then(response => response.json())
                .then(data => {
                    console.log(data.data);
                    setStateList(data.data);
                })
        }
        catch (err) {
            console.error(err.message);
        }
    }

    const getCity = async () => {
        try {
            const requestoptions = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            };
            await fetch(`${API_URL}/api/getcitybystate?state_id=${state}`, requestoptions)
                .then(response => response.json())
                .then(data => {
                    console.log(data.data);
                    setCityList(data.data);
                })
        }
        catch (err) {
            console.error(err.message);
        }
    }


    const getEmergencyState = async () => {
        try {
            const requestoptions = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            };
            await fetch(`${API_URL}/api/getstatebycountry?country_id=${emergencyCountry}`, requestoptions)
                .then(response => response.json())
                .then(data => {
                    console.log(data.data);
                    setEmergencyStateList(data.data);
                })
        }
        catch (err) {
            console.error(err.message);
        }
    }

    const getEmergencyCity = async () => {
        try {
            const requestoptions = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            };
            await fetch(`${API_URL}/api/getcitybystate?state_id=${emergencyState}`, requestoptions)
                .then(response => response.json())
                .then(data => {
                    console.log(data.data);
                    setEmergencyCityList(data.data);
                })
        }
        catch (err) {
            console.error(err.message);
        }
    }

    const handleCountrychange = (e) => {
        setCountry(e.target.value)
        setStateList([])
        setState('')
        setCityList([])
        setCity('')
    }

    const handleStatechange = (e) => {
        setState(e.target.value)
        setCityList([])
        setCity('')
    }

    const handleCitychange = (e) => {
        setCity(e.target.value)
    }

    const handleEmergencyCountrychange = (e) => {
        setEmergencyCountry(e.target.value)
        setEmergencyStateList([])
        setEmergencyState('')
        setEmergencyCityList([])
        setEmergencyCity('')
    }

    const handleEmergencyStatechange = (e) => {
        setEmergencyState(e.target.value)
        setEmergencyCityList([])
        setEmergencyCity('')
    }

    const handleEmergencyCitychange = (e) => {
        setEmergencyCity(e.target.value)
    }

    const handlePhoneChange = (value) => {
        setContactNumber(value);
        if (value === '' || value === undefined) {
            setIsPhoneValid(true);
        } else {
            setIsPhoneValid(isValidPhoneNumber(value));
        }
    };

    const handleEmergencyPhoneChange = (value) => {
        setEmergencyContactNumber(value);
        if (value === '' || value === undefined) {
            setIsEmergencyPhoneValid(true);
        } else {
            setIsEmergencyPhoneValid(isValidPhoneNumber(value));
        }
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
            setProfilePicture(file);
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


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            if(!fullName) {
                swal({
                    text: "Please enter full name",
                    icon: "warning",
                });
                fullNameRef.current.focus();
                return false;
            }
            else if(!email) {
                swal({
                    text: "Please enter email",
                    icon: "warning",
                });
                emailRef.current.focus();
                return false;
            }
            else if (email !== '' && (!email?.includes('@') || !email?.includes('.'))) {
                swal({
                    text: "Please Enter Valid Email Address",
                    icon: "warning",
                });
                emailRef.current.focus();
                return false;
            }
            else if(!contactNumber) {
                swal({
                    text: "Please enter contact number",
                    icon: "warning",
                });
                contactNumberRef.current.focus();
                return false;
            }
            else if(!isPhoneValid) {
                swal({
                    text: "Please enter valid contact number",
                    icon: "warning",
                });
                contactNumberRef.current.focus();
                return false;
            }
            else if(!profilePicture) {
                swal({
                    text: "Please upload profile picture",
                    icon: "warning",
                });
                profilePic.current.focus();
                return false;
            }
            else if(!age) {
                swal({
                    text: "Please enter age",
                    icon: "warning",
                });
                ageRef.current.focus();
                return false;
            }
            else if(!emergencyContactName) {
                swal({
                    text: "Please enter emergency contact name",
                    icon: "warning",
                });
                emergencyContactNameRef.current.focus();
                return false;
            }
            else if(!emergencyCountry) {
                swal({
                    text: "Please select emergency contact country",
                    icon: "warning",
                });
                emergencyCountryRef.current.focus();
                return false;
            }
            else if(!emergencyState) {
                swal({
                    text: "Please select emergency contact state",
                    icon: "warning",
                });
                emergencyStateRef.current.focus();
                return false;
            }
            else if(!emergencyCity) {
                swal({
                    text: "Please select emergency contact city",
                    icon: "warning",
                });
                emergencyCityRef.current.focus();
                return false;
            }
            else if(!emergencyContactNumber) {
                swal({
                    text: "Please enter emergency contact number",
                    icon: "warning",
                });
                emergencyContactNumberRef.current.focus();
                return false;
            }
            else if(!isemergencyPhoneValid) {
                swal({
                    text: "Please enter valid emergency contact number",
                    icon: "warning",
                });
                emergencyContactNumberRef.current.focus();
                return false;
            }
            else {
                setLoading(true);
            const formData = new FormData();
            formData.append('fullName', fullName);
            formData.append('email', email);
            formData.append('contactNumber', contactNumber);
            formData.append('profilePicture', profilePicture);
            formData.append('age', age);
            formData.append('gender', gender);
            formData.append('country', country);
            formData.append('state', state);
            formData.append('city', city);
            formData.append('preferredLanguage', preferredLanguage);
            formData.append('emergencyContactName', emergencyContactName);
            formData.append('relationship', relationship);
            formData.append('emergencyCountry', emergencyCountry);
            formData.append('emergencyState', emergencyState);
            formData.append('emergencyCity', emergencyCity);
            formData.append('emergencyContactNumber', emergencyContactNumber);
            formData.append('pastTreatments', pastTreatments);
            formData.append('regularMedication', regularMedication);
            formData.append('insuranceProvider', insuranceProvider);
            formData.append('coverageDetails', coverageDetails);

            console.table(Array.from(formData))

                const requestoptions = {
                    method: 'POST',
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
                    body: formData,
                };
                await fetch(`${API_URL}/api/createEndUser`, requestoptions)
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
            console.error(error.message)
        };

    }

    const allowOnlyNumbers = (e) => {
        e.preventDefault();
        const input = e.target;
        const value = input.value.replace(/[^\d]/g, ''); // Replace any non-numeric characters with an empty string
        input.value = value; // Set the input value to the filtered value
    }

    return (
        <div>
            <Container fluid className='matrimonialform mt-5 mb-5'>
                <div className='profilegallery mb-5'>
                    <h3 className='text-center'>Personal Information</h3>
                    <div className='descr-content'>
                        <Row>

                            <Col lg={4} className='mb-2'>
                                <label>Full Name <span className='labelerrorssss'>*</span></label>
                                <Form.Group className="mb-3" controlId="formFullName">
                                    <Form.Control type="text" placeholder="Enter your full name" value={fullName} onChange={(e) => setFullName(e.target.value)} ref={fullNameRef}/>
                                </Form.Group>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>Email Id <span className='labelerrorssss'>*</span></label>
                                <Form.Group className="mb-3" controlId="formEmail">
                                    <Form.Control type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} ref={emailRef}/>
                                </Form.Group>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>Contact Number <span className='labelerrorssss'>*</span></label>
                                <PhoneInput
                                    className={`form-control ${!isPhoneValid ? 'is-invalid' : ''}`}
                                    defaultCountry="IN"
                                    international
                                    countryCallingCodeEditable={false}
                                    localization={en}
                                    placeholder="Phone Number"
                                    value={contactNumber}
                                    onChange={handlePhoneChange}
                                    ref={contactNumberRef}
                                />
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>Profile Picture <span className='labelerrorssss'>*</span></label>
                                <div className='profileimgc' >
                                    <img src={image} alt="Profile" />
                                    <div className='image edit1' style={{ width: '19%' }} onClick={() => document.getElementById('uploadInput').click()}>
                                        <i className='fa fa-edit'> Select File</i>
                                    </div>
                                    <input
                                        id="uploadInput"
                                        type="file"
                                        accept=".jpg, .jpeg, .png"
                                        style={{ display: 'none' }}
                                        onChange={handleImageChange}
                                        required
                                    />
                                </div>
                                {/* Information about file restrictions */}
                                <div className='disclaimer-note'>
                                    <strong>Note : </strong> File formats allowed: .jpg, .jpeg, .png.<br />
                                    Maximum dimensions: 300x300 pixels.<br />
                                    Maximum file size: 500KB.
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>

                <div className='profilegallery mb-5'>
                    <h3 className='text-center'>Demographics</h3>
                    <div className='descr-content'>
                        <Row>
                            <Col lg={4} className='mb-2'>
                                <label>Age <span className='labelerrorssss'>*</span></label>
                                <Form.Group className="mb-3" controlId="formAge">
                                    <Form.Control type="text" placeholder="Enter your age" onInput={allowOnlyNumbers} maxLength={2} value={age} onChange={(e) => setAge(e.target.value)} ref={ageRef}/>
                                </Form.Group>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>Gender </label>
                                <Form.Group className="mb-3" controlId="formGender">
                                    <Form.Select className='mb-3' value={gender} onChange={(e) => setGender(e.target.value)}>
                                        <option hidden>Select Gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Prefer not to reveal">Prefer not to reveal</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>Country </label>
                                <Form.Group className="mb-3" controlId="formCountry">
                                    <Form.Select className='mb-3' value={country} onChange={handleCountrychange}>
                                        <option hidden>Select Country</option>
                                        {countryList?.map((country, index) => (
                                            <option key={index} value={country?._id}>{country?.country_name}</option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>State </label>
                                <Form.Group className="mb-3" controlId="formState">
                                    <Form.Select className='mb-3' value={state} onChange={handleStatechange}>
                                        <option hidden>Select State</option>
                                        {stateList?.map((state, index) => (
                                            <option key={index} value={state?._id}>{state?.state_name}</option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>City </label>
                                <Form.Group className="mb-3" controlId="formCity">
                                    <Form.Select className='mb-3' value={city} onChange={handleCitychange}>
                                        <option hidden>Select City</option>
                                        {cityList?.map((city, index) => (
                                            <option key={index} value={city?._id}>{city?.city_name}</option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>Preferred Language </label>
                                <Form.Group className="mb-3" controlId="formLanguage">
                                    <Form.Control type="text" placeholder="Enter preferred language" value={preferredLanguage} onChange={(e) => setPreferredLanguage(e.target.value)} />
                                </Form.Group>
                            </Col>
                        </Row>
                    </div>
                </div>

                <div className='profilegallery mb-5'>
                    <h3 className='text-center'>Emergency Contact</h3>
                    <div className='descr-content'>
                        <Row>
                            <Col lg={4} className='mb-2'>
                                <label>Emergency Contact Name <span className='labelerrorssss'>*</span></label>
                                <Form.Group className="mb-3" controlId="formEmergencyName">
                                    <Form.Control type="text" placeholder="Enter emergency contact name" value={emergencyContactName} onChange={(e) => setEmergencyContactName(e.target.value)} ref={emergencyContactNameRef}/>
                                </Form.Group>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>Relationship </label>
                                <Form.Group className="mb-3" controlId="formRelationship">
                                    <Form.Select className='mb-3' value={relationship} onChange={(e) => setRelationship(e.target.value)}>
                                        <option hidden>Select Relationship</option>
                                        <option value="Father">Father</option>
                                        <option value="Mother">Mother</option>
                                        <option value="Son">Son</option>
                                        <option value="Daughter">Daughter</option>
                                        <option value="Grand-father">Grand-father</option>
                                        <option value="Grand-mother">Grand-mother</option>
                                        <option value="Grand-son">Grand-son</option>
                                        <option value="Grand-daughter">Grand-daughter</option>
                                        <option value="Guardian">Guardian</option>
                                        <option value="In Laws">In Laws</option>
                                        <option value="Friend">Friend</option>
                                        <option value="Other">Other</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>Emergency Contact Country <span className='labelerrorssss'>*</span></label>
                                <Form.Group className="mb-3" controlId="formEmergencyCountry">
                                    <Form.Select className='mb-3' onChange={handleEmergencyCountrychange} ref={emergencyCountryRef}>
                                        <option hidden>Select Country </option>
                                        {countryList?.map((country, index) => (
                                            <option key={index} value={country._id}>{country.country_name}</option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>Emergency Contact State <span className='labelerrorssss'>*</span></label>
                                <Form.Group className="mb-3" controlId="formEmergencyState">
                                    <Form.Select className='mb-3' onChange={handleEmergencyStatechange} ref={emergencyStateRef}>
                                        <option hidden>Select State</option>
                                        {emergencyStateList?.map((state, index) => (
                                            <option key={index} value={state._id}>{state.state_name}</option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>Emergency Contact City <span className='labelerrorssss'>*</span></label>
                                <Form.Group className="mb-3" controlId="formEmergencyCity">
                                    <Form.Select className='mb-3' onChange={handleEmergencyCitychange} ref={emergencyCityRef}>
                                        <option hidden>Select City</option>
                                        {emergencyCityList?.map((city, index) => (
                                            <option key={index} value={city._id}>{city.city_name}</option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>Emergency Contact Number <span className='labelerrorssss'>*</span></label>
                                {/* <Form.Group className="mb-3" controlId="formEmergencyContact">
                                    <Form.Control type="text" placeholder="Enter Contact Number" value={emergencyContactNumber} onChange={(e) => setEmergencyContactNumber(e.target.value)} />
                                </Form.Group> */}
                                <PhoneInput
                                    className={`form-control ${!isemergencyPhoneValid ? 'is-invalid' : ''}`}
                                    defaultCountry="IN"
                                    international
                                    countryCallingCodeEditable={false}
                                    localization={en}
                                    placeholder="Phone Number"
                                    value={emergencyContactNumber}
                                    onChange={handleEmergencyPhoneChange}
                                    ref={emergencyContactNumberRef}
                                />
                            </Col>
                        </Row>
                    </div>
                </div>

                <div className='profilegallery mb-5'>
                    <h3 className='text-center'>Medical History</h3>
                    <div className='descr-content'>
                        <Row>
                            <Col lg={4} className='mb-2'>
                                <label>Past Treatments </label>
                                <Form.Group className="mb-3" controlId="formSkills">
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        style={{ height: '180px' }}
                                        placeholder="Enter Past Treatments Details"
                                        value={pastTreatments}
                                        onChange={(e) => setPastTreatments(e.target.value)}
                                    />
                                </Form.Group>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>Regular Medication </label>
                                <Form.Group className="mb-3" controlId="formSkills">
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        style={{ height: '180px' }}
                                        placeholder="Enter Regular Medication Details"
                                        value={regularMedication}
                                        onChange={(e) => setRegularMedication(e.target.value)}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                    </div>
                </div>

                <div className='profilegallery mb-5'>
                    <h3 className='text-center'>Insurance Information</h3>
                    <div className='descr-content'>
                        <Row>
                            <Col lg={4} className='mb-2'>
                                <label>Insurance Provider </label>
                                <Form.Group className="mb-3" controlId="formFullName">
                                    <Form.Control type="text" placeholder='Enter Insurance Provider' value={insuranceProvider} onChange={(e) => setInsuranceProvider(e.target.value)} />
                                </Form.Group>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>Coverage Details </label>
                                <Form.Group className="mb-3" controlId="formSkills">
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        style={{ height: '180px' }}
                                        placeholder="Enter Coverage Details"
                                        value={coverageDetails}
                                        onChange={(e) => setCoverageDetails(e.target.value)}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                    </div>
                </div>
                {loading ?
                    <button className='submitforms' disabled>Please wait...</button>
                    :
                    <button type='submit' className='submitforms' onClick={handleSubmit}>Submit Form</button>
                }
            </Container>
        </div>
    )
}

export default MedicalEndUserform