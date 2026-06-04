import React, { useState, useEffect, useRef } from 'react'
import { Col, Container, Form, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import PhoneInput, { formatPhoneNumber, formatPhoneNumberIntl, isValidPhoneNumber } from "react-phone-number-input";
import en from 'react-phone-number-input/locale/en';
import 'react-phone-number-input/style.css';
import profile from "../../../assets/profile.png";
import API_URL from '../../../../config';

const MemberProfileEdit = () => {
    const Navigate = useNavigate();

    const [countryList, setCountryList] = useState([]);
    const [stateList, setStateList] = useState([]);
    const [cityList, setCityList] = useState([]);

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [contact, setContact] = useState('');
    const [isPhoneValid, setIsPhoneValid] = useState(true);
    const [country, setCountry] = useState('');
    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    const [residentialAddress, setResidentialAddress] = useState('');
    const [officeAddress, setOfficeAddress] = useState('');
    const [image, setImage] = useState(profile);
    const [profilePicture, setProfilePicture] = useState('');
    const [businessDetails, setBusinessDetails] = useState('');
    const [membershipTier, setMembershipTier] = useState('');
    const [shortBio, setShortBio] = useState('');
    const [purpose, setPurpose] = useState('');
    const [publishDetails, setPublishDetails] = useState('');
    const [directorMySSO, setDirectorMySSO] = useState('No');
    const [loading, setLoading] = useState(false);

    const [memberdata, setMemberdata] = useState([])
    const [id, setId] = useState('')


    const fullNameRef = useRef();
    const emailRef = useRef();
    const contactRef = useRef();
    const countryRef = useRef();
    const stateRef = useRef();
    const cityRef = useRef();
    const residentialAddressRef = useRef();
    const officeAddressRef = useRef();
    const profilePictureRef = useRef();
    const businessDetailsRef = useRef();
    const membershipTierRef = useRef();
    const shortBioRef = useRef();
    const purposeRef = useRef();
    const publishDetailsRef = useRef();
    const directorMySSORef = useRef();




    useEffect(() => {
        const url = window.location.href;
        const url1 = url.split("/")[3];
        const url2 = url1.split("?")[1];
        const id = url2.split("=")[1];
        getMemberdata(id)
        getCountry();
    }, []);

    useEffect(() => {
        if (country) getState();
    }, [country]);

    useEffect(() => {
        if (state) getCity();
    }, [state]);


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

    const getMemberdata = async (id) => {
        try {
            const requestOption = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            };
            await fetch(`${API_URL}/api/getMemberById?id=${id}`, requestOption)
                .then((res) => res.json())
                .then((data) => {
                    console.log(data)
                    const member = data?.data[0];
                    setMemberdata(data?.data[0])
                    setId(member?._id);
                    setFullName(member?.fullName);
                    setEmail(member?.email);
                    setContact(member?.contact);
                    setCountry(member?.country);
                    setState(member?.state);
                    setCity(member?.city);
                    setResidentialAddress(member?.residentialAddress);
                    setOfficeAddress(member?.officeAddress);
                    setProfilePicture(member?.profilePicture[0]);
                    setBusinessDetails(member?.businessDetails);
                    setMembershipTier(member?.membershipTier);
                    setShortBio(member?.shortBio);
                    setPurpose(member?.purpose);
                    setPublishDetails(member?.publishDetails);
                    setDirectorMySSO(member?.directorMySSO);

                })
        } catch (error) {
            console.log(error)
        }

    }

    console.log(memberdata)


    console.log(profilePicture)


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

    const handlemembershipTier = (e) => {
        setMembershipTier(e.target.value)
        if (e.target.value === "Patron Member") {
            setDirectorMySSO('No')
        }
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
                    text: "Please Enter Email",
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
            // else if (!contact) {
            //     swal({
            //         text: "Please Enter Contact Number",
            //         icon: "warning",
            //     });
            //     contactRef.current.focus();
            //     return false;
            // }
            else if (contact && (!isPhoneValid)) {
                swal({
                    text: "Please Enter Valid Contact Number",
                    icon: "warning",
                });
                contactRef.current.focus();
                return false;
            }
            else if (!country) {
                swal({
                    text: "Please Select Country",
                    icon: "warning",
                });
                countryRef.current.focus();
                return false;
            }
            else if (!state) {
                swal({
                    text: "Please Select State",
                    icon: "warning",
                });
                stateRef.current.focus();
                return false;
            }
            else if (!city) {
                swal({
                    text: "Please Select City",
                    icon: "warning",
                });
                cityRef.current.focus();
                return false;
            }
            // else if (!residentialAddress) {
            //     swal({
            //         text: "Please Enter Residential Address",
            //         icon: "warning",
            //     });
            //     residentialAddressRef.current.focus();
            //     return false;
            // }
            else if (profilePicture?.length == 0) {
                swal({
                    text: "Please Select Profile Picture",
                    icon: "warning",
                });
                profilePictureRef.current.focus();
                return false;
            }
            else if (!businessDetails) {
                swal({
                    text: "Please Enter Business / Profession Details",
                    icon: "warning",
                });
                businessDetailsRef.current.focus();
                return false;
            }
            else if (!membershipTier) {
                swal({
                    text: "Please Select Membership Tier",
                    icon: "warning",
                });
                membershipTierRef.current.focus();
                return false;
            }
            else if (!shortBio) {
                swal({
                    text: "Please Enter Short Bio",
                    icon: "warning",
                });
                shortBioRef.current.focus();
                return false;
            }
            else if (!purpose) {
                swal({
                    text: "Please Enter Purpose of becoming a Member",
                    icon: "warning",
                });
                purposeRef.current.focus();
                return false;
            }
            else if (!publishDetails) {
                swal({
                    text: "Please Select Publish Details",
                    icon: "warning",
                });
                publishDetailsRef.current.focus();
                return false;
            }

            else {
                setLoading(true);
                const formData = new FormData();
                formData.append('id', id);
                formData.append('fullName', fullName);
                formData.append('email', email);
                formData.append('contact', contact);
                formData.append('country', country);
                formData.append('state', state);
                formData.append('city', city);
                formData.append('residentialAddress', residentialAddress);
                formData.append('officeAddress', officeAddress);
                formData.append('profilePicture', profilePicture);
                formData.append('businessDetails', businessDetails);
                formData.append('membershipTier', membershipTier);
                formData.append('shortBio', shortBio);
                formData.append('purpose', purpose);
                formData.append('publishDetails', publishDetails);
                // formData.append('directorMySSO', directorMySSO);


                console.table(Array.from(formData));

                // return false;


                const requestoptions = {
                    method: 'PUT',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                    body: formData,
                };
                await fetch(`${API_URL}/api/updateMember`, requestoptions)
                    .then(response => response.json())
                    .then(data => {
                        console.log(data);
                        if (data.status === 200) {
                            setLoading(false);
                            swal({
                                text: data.message,
                                icon: "success",
                            });
                            Navigate('/Profile');
                        }
                        else {
                            setLoading(false);
                            swal({
                                text: data.message,
                                icon: "error",
                            });
                        }
                    })
            }


        } catch (err) {
            console.error(err.message);
        }
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
                                    <Form.Control type="text" placeholder="Enter full name" value={fullName} onChange={(e) => setFullName(e.target.value)} ref={fullNameRef} />
                                </Form.Group>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>Email id <span className='labelerrorssss'>*</span></label>
                                <Form.Group className="mb-3" controlId="formFullName">
                                    <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} ref={emailRef} />
                                </Form.Group>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>Contact Number </label>
                                <PhoneInput
                                    className={`form-control ${!isPhoneValid ? 'is-invalid' : ''}`}
                                    defaultCountry="IN"
                                    international
                                    countryCallingCodeEditable={false}
                                    localization={en}
                                    placeholder="Enter phone number"
                                    value={contact}
                                    onChange={handlePhoneChange}
                                    ref={contactRef}
                                />
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>Country <span className='labelerrorssss'>*</span></label>
                                <Form.Group className="mb-3" controlId="formCountry">
                                    <Form.Select className='mb-3' value={country} onChange={handleCountrychange} ref={countryRef} >
                                        <option hidden>Select Country </option>
                                        {countryList?.map((country, index) => (
                                            <option key={index} value={country._id}>{country.country_name}</option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>State <span className='labelerrorssss'>*</span></label>
                                <Form.Group className="mb-3" controlId="formState">
                                    <Form.Select className='mb-3' value={state} onChange={handleStatechange} ref={stateRef}>
                                        <option hidden>Select State</option>
                                        {stateList?.map((state, index) => (
                                            <option key={index} value={state._id}>{state.state_name}</option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>City <span className='labelerrorssss'>*</span></label>
                                <Form.Group className="mb-3" controlId="formCity">
                                    <Form.Select className='mb-3' value={city} onChange={handleCitychange} ref={cityRef}>
                                        <option hidden>Select City</option>
                                        {cityList?.map((city, index) => (
                                            <option key={index} value={city._id}>{city.city_name}</option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>Residential Address </label>
                                <Form.Group className="mb-3" controlId="formResient">
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        placeholder="Enter residential address"
                                        value={residentialAddress}
                                        onChange={(e) => setResidentialAddress(e.target.value)}
                                        style={{ height: '180px' }}
                                        ref={residentialAddressRef}
                                    />
                                </Form.Group>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>Office Address </label>
                                <Form.Group className="mb-3" controlId="formOffice">
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        placeholder="Enter office address"
                                        value={officeAddress}
                                        onChange={(e) => setOfficeAddress(e.target.value)}
                                        style={{ height: '180px' }}
                                    />
                                </Form.Group>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>Profile Picture <span className='labelerrorssss'>*</span></label>
                                <div className='profileimgc' >
                                    <img src={image != profile ? image : `${API_URL}/uploads/user_profile/${profilePicture?.filename}`} alt="Profile" />
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
                                        ref={profilePictureRef}
                                    />
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>

                <div className='profilegallery mb-5'>
                    <h3 className='text-center'>Additional Information</h3>
                    <div className='descr-content'>
                        <Row>
                            <Col lg={4} className='mb-2'>
                                <label>Business / Profession Details <span className='labelerrorssss'>*</span></label>
                                <Form.Group className="mb-3" controlId="formFullName">
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        placeholder="Enter business/profession details"
                                        value={businessDetails}
                                        onChange={(e) => setBusinessDetails(e.target.value)}
                                        style={{ height: '180px' }}
                                        ref={businessDetailsRef}
                                    />
                                </Form.Group>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>Choose Membership Tier <span className='labelerrorssss'>*</span></label>
                                <Form.Group className="mb-3" controlId="formMembershipTier">
                                    <div className="d-flex">
                                        <Form.Check
                                            type="radio"
                                            label="Patron Member"
                                            name="membershipTier"
                                            value="Patron Member"
                                            checked={membershipTier === "Patron Member"}
                                            onChange={handlemembershipTier}
                                            className="me-3"
                                            ref={membershipTierRef}
                                        />
                                        <Form.Check
                                            type="radio"
                                            label="Chief Patron Member"
                                            name="membershipTier"
                                            value="Chief Patron Member"
                                            checked={membershipTier === "Chief Patron Member"}
                                            onChange={handlemembershipTier}
                                        />
                                    </div>
                                </Form.Group>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>Short Bio <span className='labelerrorssss'>*</span></label>
                                <Form.Group className="mb-3" controlId="formFullName">
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        placeholder="Enter short bio"
                                        value={shortBio}
                                        onChange={(e) => setShortBio(e.target.value)}
                                        style={{ height: '180px' }}
                                        ref={shortBioRef}
                                    />
                                </Form.Group>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>Purpose of becoming a Member <span className='labelerrorssss'>*</span></label>
                                <Form.Group className="mb-3" controlId="formFullName">
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        placeholder="Enter purpose of becoming a member"
                                        value={purpose}
                                        onChange={(e) => setPurpose(e.target.value)}
                                        style={{ height: '180px' }}
                                        ref={purposeRef}
                                    />
                                </Form.Group>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>Do you want to publish your details on the ShreeSSO website? <span className='labelerrorssss'>*</span></label>
                                <Form.Group className="mb-3" controlId="formPublishDetails">
                                    <div className="d-flex">
                                        <Form.Check
                                            type="radio"
                                            label="Yes"
                                            name="publishDetails"
                                            value="Yes"
                                            checked={publishDetails === "Yes"}
                                            onChange={(e) => setPublishDetails(e.target.value)}
                                            className="me-3"
                                            ref={publishDetailsRef}
                                        />
                                        <Form.Check
                                            type="radio"
                                            label="No"
                                            name="publishDetails"
                                            value="No"
                                            checked={publishDetails === "No"}
                                            onChange={(e) => setPublishDetails(e.target.value)}
                                        />
                                    </div>
                                </Form.Group>
                            </Col>
                            {/* {membershipTier === "Chief Patron Member" &&
                                <Col lg={4} className='mb-2'>
                                    <label>Do you want to become Director of MySSO? </label>
                                    <Form.Group className="mb-3" controlId="formDirectorMySSO">
                                        <div className="d-flex">
                                            <Form.Check
                                                type="radio"
                                                label="Yes"
                                                name="directorMySSO"
                                                value="Yes"
                                                checked={directorMySSO === "Yes"}
                                                onChange={(e) => setDirectorMySSO(e.target.value)}
                                                className="me-3"
                                            />
                                            <Form.Check
                                                type="radio"
                                                label="No"
                                                name="directorMySSO"
                                                value="No"
                                                checked={directorMySSO === "No"}
                                                onChange={(e) => setDirectorMySSO(e.target.value)}
                                            />
                                        </div>
                                    </Form.Group>
                                </Col>
                            } */}
                        </Row>
                    </div>
                </div>
                {loading ?
                    <button className='submitforms' disabled>Please wait...</button>
                    :
                    <button type='submit' className='submitforms' onClick={handleSubmit} >Submit Form</button>
                }
            </Container>
        </div>
    )
}

export default MemberProfileEdit;