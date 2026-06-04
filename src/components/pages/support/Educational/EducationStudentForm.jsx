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

const EducationStudentForm = () => {

    const Navigate = useNavigate();


    const [educationList, setEducationList] = useState([]);
    const [fieldofstudyList, setFieldofstudyList] = useState([]);
    const [highestqualificationList, setHighestqualificationList] = useState([]);
    const [countryList, setCountryList] = useState([]);
    const [stateList, setStateList] = useState([]);
    const [cityList, setCityList] = useState([]);


    const [image, setImage] = useState(profile);
    const [profile_pic, setProfile_pic] = useState([]);
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [contact, setContact] = useState('');
    const [isPhoneValid, setIsPhoneValid] = useState(true);
    const [bio, setBio] = useState('');
    const [currentEducation, setCurrentEducation] = useState('');
    const [fieldStudy, setFieldStudy] = useState('');
    const [schoolCollege, setSchoolCollege] = useState('');
    const [qualification, setQualification] = useState('');
    const [careerInterest, setCareerInterest] = useState('');
    const [careerPath, setCareerPath] = useState('');
    const [skills, setSkills] = useState('');
    const [goals, setGoals] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [country, setCountry] = useState('');
    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    const [languages, setLanguages] = useState('');
    const [loading, setLoading] = useState(false);

    const fullNameRef = useRef();
    const emailRef = useRef();
    const contactRef = useRef();
    const bioRef = useRef();
    const currentEducationRef = useRef();
    const fieldStudyRef = useRef();
    const schoolCollegeRef = useRef();

    useEffect(() => {
        EducationList();
        FieldofstudyList();
        HighestqualificationList();
        getCountry();
    }, []);

    useEffect(() => {
        getState();
    }, [country]);

    useEffect(() => {
        getCity();
    }, [state]);


    const EducationList = async () => {
        const requestoptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        };

        await fetch(`${API_URL}/api/getEducationList`, requestoptions)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setEducationList(data.data);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }

    const FieldofstudyList = async () => {
        const requestoptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        };

        await fetch(`${API_URL}/api/getEducationFieldofStudy`, requestoptions)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setFieldofstudyList(data.data);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }

    const HighestqualificationList = async () => {
        const requestoptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        };

        await fetch(`${API_URL}/api/getEducationQualification`, requestoptions)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setHighestqualificationList(data.data);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }

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

    const handlePhoneChange = (value) => {
        setContact(value);
        if (value === '' || value === undefined) {
            setIsPhoneValid(true);
        } else {
            setIsPhoneValid(isValidPhoneNumber(value));
        }
    };



    const maxCharacters = 500;

    const handleBioChange = (event) => {
        setBio(event.target.value.slice(0, maxCharacters)); // Limit the input to the maxCharacters
    };


    const allowOnlyNumbers = (e) => {
        e.preventDefault();
        const input = e.target;
        const value = input.value.replace(/[^\d]/g, ''); // Replace any non-numeric characters with an empty string
        input.value = value; // Set the input value to the filtered value
    }

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
            setProfile_pic(file);
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
            if (!fullName) {
                swal({
                    text: "Please Enter Full Name",
                    icon: "warning",
                });
                fullNameRef.current.focus();
                return false;
            }
            else if (!email) {
                swal({
                    text: "Please Enter Email Address",
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
            else if (!contact) {
                swal({
                    text: "Please Enter Contact Number",
                    icon: "warning",
                });
                contactRef.current.focus();
                return false;
            }
            else if (!isPhoneValid) {
                swal({
                    text: "Please Enter Valid Contact Number",
                    icon: "warning",
                });
                contactRef.current.focus();
                return false;
            }
            else if (!bio) {
                swal({
                    text: "Please Enter Short Bio",
                    icon: "warning",
                });
                bioRef.current.focus();
                return false;
            }
            else if (profile_pic?.length == 0) {
                swal({
                    text: "Please Select Profile Picture",
                    icon: "warning",
                });
                return false;
            }
            else if (!currentEducation) {
                swal({
                    text: "Please Select Current Education",
                    icon: "warning",
                });
                currentEducationRef.current.focus();
                return false;
            }
            else if (!fieldStudy) {
                swal({
                    text: "Please Select Field of Study",
                    icon: "warning",
                });
                fieldStudyRef.current.focus();
                return false;
            }
            else if (!schoolCollege) {
                swal({
                    text: "Please Enter School/College Name",
                    icon: "warning",
                });
                schoolCollegeRef.current.focus();
                return false;
            }
            else {
                setLoading(true);
                const formData = new FormData();
                formData.append('profile_pic', profile_pic);
                formData.append('fullName', fullName);
                formData.append('email', email);
                formData.append('contact', contact);
                formData.append('bio', bio);
                formData.append('currentEducation', currentEducation);
                formData.append('fieldStudy', fieldStudy);
                formData.append('schoolCollege', schoolCollege);
                formData.append('qualification', qualification);
                formData.append('careerInterest', careerInterest);
                formData.append('careerPath', careerPath);
                formData.append('skills', skills);
                formData.append('goals', goals);
                formData.append('age', age);
                formData.append('gender', gender);
                formData.append('country', country);
                formData.append('state', state);
                formData.append('city', city);
                formData.append('languages', languages);

                console.table(Array.from(formData))

                // return false;

                const requestoptions = {
                    method: 'POST',
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
                    body: formData,
                };
                await fetch(`${API_URL}/api/createStudentData`, requestoptions)
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
            console.error(error.message);
        }
    }



    return (
        <div>
            <Container fluid className='matrimonialform mt-5 mb-5'>
                <div className='profilegallery mb-5'>
                    <h3 className='text-center'>Basic Information</h3>
                    <div className='descr-content'>
                        <Row>

                            <Col lg={4} className='mb-2'>
                                <label>Full Name <span className='labelerrorssss'>*</span></label>
                                <Form.Group className="mb-3" controlId="formFullName">
                                    <Form.Control type="text" placeholder='Enter Your Full Name' value={fullName} onChange={(e) => setFullName(e.target.value)} ref={fullNameRef} />
                                </Form.Group>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>Email Address <span className='labelerrorssss'>*</span></label>
                                <Form.Group className="mb-3" controlId="formEmail">
                                    <Form.Control type="email" placeholder='Enter Your Email Address' value={email} onChange={(e) => setEmail(e.target.value)} ref={emailRef} />
                                </Form.Group>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>Contact No. <span className='labelerrorssss'>*</span></label>
                                <PhoneInput
                                    className={`form-control ${!isPhoneValid ? 'is-invalid' : ''}`}
                                    defaultCountry="IN"
                                    international
                                    countryCallingCodeEditable={false}
                                    localization={en}
                                    placeholder="Phone Number"
                                    value={contact}
                                    onChange={handlePhoneChange}
                                    ref={contactRef}
                                />
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>Short Bio <span className='labelerrorssss'>*</span></label>
                                <Form.Group className="mb-3" controlId="formBio">
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        placeholder='Write a short bio about yourself'
                                        style={{ height: '180px' }}
                                        onChange={handleBioChange}
                                        value={bio}
                                        ref={bioRef}
                                    />
                                    <small className='text-muted'>{bio.length}/{maxCharacters} characters</small>
                                </Form.Group>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>Profile Picture <span className='labelerrorssss'>*</span></label>
                                <div className='profileimgc'>
                                    <img src={image} alt="Profile" />
                                    <div className='image edit1' style={{ width: '19%' }} onClick={() => document.getElementById('uploadInput').click()}>
                                        <i className='fa fa-edit' style={{ width: '19%' }}> Select File</i>
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
                    <h3 className='text-center'>Educational Background</h3>
                    <div className='descr-content'>
                        <Row>
                            <Col lg={4} className='mb-2'>
                                <label>Current Education <span className='labelerrorssss'>*</span></label>
                                <Form.Group className="mb-3" controlId="formCurrentEducation">
                                    <Form.Select className='mb-3' value={currentEducation} onChange={(e) => setCurrentEducation(e.target.value)} ref={currentEducationRef}>
                                        <option hidden>Select Current Education</option>
                                        {educationList.map((education, index) => (
                                            <option key={index} value={education?._id}>{education?.education_list}</option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>Field of Study <span className='labelerrorssss'>*</span></label>
                                <Form.Group className="mb-3" controlId="formFieldStudy">
                                    <Form.Select className='mb-3' value={fieldStudy} onChange={(e) => setFieldStudy(e.target.value)} ref={fieldStudyRef}>
                                        <option hidden>Select Field of Study</option>
                                        {fieldofstudyList.map((fieldofstudy, index) => (
                                            <option key={index} value={fieldofstudy?._id}>{fieldofstudy?.education_fieldofstudy}</option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>Current School/College Name <span className='labelerrorssss'>*</span></label>
                                <Form.Group className="mb-3" controlId="formSchoolCollege">
                                    <Form.Control type="text" placeholder='Enter Your School/College Name' value={schoolCollege} onChange={(e) => setSchoolCollege(e.target.value)} ref={schoolCollegeRef} />
                                </Form.Group>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>Highest Qualification Completed </label>
                                <Form.Group className="mb-3" controlId="formQualification">
                                    <Form.Select className='mb-3' value={qualification} onChange={(e) => setQualification(e.target.value)}>
                                        <option hidden>Select Qualification</option>
                                        {educationList.map((education, index) => (
                                            <option key={index} value={education?._id}>{education?.education_list}</option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                        </Row>
                    </div>
                </div>

                <div className='profilegallery mb-5'>
                    <h3 className='text-center'>Career Preferences</h3>
                    <div className='descr-content'>
                        <Row>
                            <Col lg={4} className='mb-2'>
                                <label>Career Interest </label>
                                <Form.Group className="mb-3" controlId="formCareerInterest">
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        placeholder='Enter Your Career Interest'
                                        style={{ height: '180px' }}
                                        value={careerInterest}
                                        onChange={(e) => setCareerInterest(e.target.value)}
                                    />
                                </Form.Group>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>Preferred Career Path </label>
                                <Form.Group className="mb-3" controlId="formCareerPath">
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        placeholder='Describe your preferred career path'
                                        style={{ height: '180px' }}
                                        value={careerPath}
                                        onChange={(e) => setCareerPath(e.target.value)}
                                    />
                                </Form.Group>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>Skills or Subjects of Interest </label>
                                <Form.Group className="mb-3" controlId="formSkills">
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        placeholder='Enter your skills or subjects of interest'
                                        style={{ height: '180px' }}
                                        value={skills}
                                        onChange={(e) => setSkills(e.target.value)}
                                    />
                                </Form.Group>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>Current Goals </label>
                                <Form.Group className="mb-3" controlId="formGoals">
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        placeholder='Mention your current goals'
                                        style={{ height: '180px' }}
                                        value={goals}
                                        onChange={(e) => setGoals(e.target.value)}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                    </div>
                </div>

                <div className='profilegallery mb-5'>
                    <h3 className='text-center'>Demographics</h3>
                    <div className='descr-content'>
                        <Row>
                            <Col lg={4} className='mb-2'>
                                <label>Age </label>
                                <Form.Group className="mb-3" controlId="formAge">
                                    <Form.Control type="text" placeholder='Enter Your Age' onInput={allowOnlyNumbers} maxLength={2} value={age} onChange={(e) => setAge(e.target.value)} />
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
                                <label>Languages </label>
                                <Form.Group className="mb-3" controlId="formLanguages">
                                    <Form.Control type="text" placeholder='Enter Languages You Speak' value={languages} onChange={(e) => setLanguages(e.target.value)} />
                                </Form.Group>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>Country </label>
                                <Form.Group className="mb-3" controlId="formCountry">
                                    <Form.Select className='mb-3' onChange={handleCountrychange} >
                                        <option hidden>Select Country </option>
                                        {countryList?.map((country, index) => (
                                            <option key={index} value={country._id}>{country.country_name}</option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>State </label>
                                <Form.Select className='mb-3' onChange={handleStatechange} >
                                    <option hidden>Select State</option>
                                    {stateList?.map((state, index) => (
                                        <option key={index} value={state._id}>{state.state_name}</option>
                                    ))}
                                </Form.Select>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>City </label>
                                <Form.Select className='mb-3' onChange={handleCitychange} >
                                    <option hidden>Select City</option>
                                    {cityList?.map((city, index) => (
                                        <option key={index} value={city._id}>{city.city_name}</option>
                                    ))}
                                </Form.Select>
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
    );
}

export default EducationStudentForm;
