import React, { useState, useRef, useEffect } from 'react'
import logo from "../assets/logo.svg"
import banner from "../assets/swamii.png"
import { Link, useNavigate } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'
import axios from 'axios'
import swal from 'sweetalert'
import PhoneInput, { formatPhoneNumber, formatPhoneNumberIntl, isValidPhoneNumber } from "react-phone-number-input";
import en from 'react-phone-number-input/locale/en';
import 'react-phone-number-input/style.css'
import API_URL from '../../config'


const Registerdetail = () => {

    const Navigate = useNavigate();


    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(prevState => !prevState);
    };


    const [firstName, setFirstName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [lastName, setLastName] = useState('');
    const [gender, setGender] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [isPhoneValid, setIsPhoneValid] = useState(true);
    const [dob, setDob] = useState('');
    const [address, setAddress] = useState('');
    const [sansthaName, setSansthaName] = useState('');
    const [sansthaAddress, setSansthaAddress] = useState('');
    const [referenceName, setReferenceName] = useState('');
    const [refrence_name_sant, setRefrence_name_sant] = useState('');
    const [refrence_name_haribhagat, setRefrence_name_haribhagat] = useState('');
    const [referencesantPhone, setReferenceSantPhone] = useState('');
    const [referenceharibhagatPhone, setReferenceHaribhagatPhone] = useState('');
    const [referencesantisPhoneValid, setReferenceSantIsPhoneValid] = useState(true);
    const [referenceharibhagatisPhoneValid, setReferenceHaribhagatIsPhoneValid] = useState('');
    const [referenceAddress, setReferenceAddress] = useState('');

    const firstNameRef = useRef(null);
    const middleNameRef = useRef(null);
    const lastNameRef = useRef(null);
    const genderRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const phoneRef = useRef(null);
    const dobRef = useRef(null);
    const addressRef = useRef(null);
    const sansthaNameRef = useRef(null);
    const sansthaAddressRef = useRef(null);
    const refrence_name_santRef = useRef(null);
    const refrence_name_haribhagatRef = useRef(null);
    const referencesantPhoneRef = useRef(null);
    const referenceharibhagatPhoneRef = useRef(null);


    useEffect(() => {
        setEmail(localStorage.getItem('email'));
    }, []);




    const [passwordError, setPasswordError] = useState('');
    const [requirements, setRequirements] = useState({
        minLength: false,
        uppercase: false,
        lowercase: false,
        symbol: false,
    });


    const validatePassword = (password) => {
        const minLength = 6;
        const uppercase = /[A-Z]/;
        const lowercase = /[a-z]/;
        const symbol = /[!@#$%^&*(),.?":{}|<>]/;

        const newRequirements = {
            minLength: password.length >= minLength,
            uppercase: uppercase.test(password),
            lowercase: lowercase.test(password),
            symbol: symbol.test(password),
        };
        setRequirements(newRequirements);

        if (!newRequirements.minLength) {
            return 'Password must be at least 6 characters';
        } else if (!newRequirements.uppercase) {
            return 'Password must contain at least one uppercase letter';
        } else if (!newRequirements.lowercase) {
            return 'Password must contain at least one lowercase letter';
        } else if (!newRequirements.symbol) {
            return 'Password must contain at least one symbol';
        }

        return '';
    };

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        const validationError = validatePassword(newPassword);
        setPasswordError(validationError);
    };

    const getValidationIcon = (isValid) => {
        return isValid ? <i className="fa fa-check text-success" aria-hidden="true" /> : <i className="fa fa-times text-danger" aria-hidden="true" />;
    };

    console.log(email);

    const registerUser = async (e) => {
        e.preventDefault();
        try {

            if(!sansthaName){
                swal({
                    text: 'please enter the sanstha name',
                    icon: 'warning'
                });
                return;
            }

            else if(!sansthaAddress){
                swal({
                    text: 'please enter the sanstha address',
                    icon: 'warning'
                });
                return;
            }

            else if(!refrence_name_sant && !refrence_name_haribhagat ){
                swal({
                    text: 'please enter the name of a Sant or Haribhagat.',
                    icon: 'warning'
                });
                return;
            }

            // Log user data for debugging purposes
            console.log({
                firstName,
                middleName,
                lastName,
                gender,
                email,
                password,
                phone,
                dob,
                address,
                sansthaName,
                sansthaAddress,
                refrence_name_sant,
                refrence_name_haribhagat,
                referencesantPhone,
                referenceharibhagatPhone
                // referenceAddress
            });

            // Prepare the data to be sent in the request
            const data = {
                // first_name: firstName,
                // middle_name: middleName,
                // last_name: lastName,
                // gender: gender,
                // email: email,
                // password: password,
                // phone: phone,
                // date_of_birth: dob,
                // address: address,
                email: email,
                sanstha_name: sansthaName,
                sanstha_location: sansthaAddress,
                reference_name_sant: refrence_name_sant,
                reference_name_haribhagat: refrence_name_haribhagat,
                reference_phone_sant: referencesantPhone,
                reference_phone_haribhagat: referenceharibhagatPhone,
                // reference_location: referenceAddress
            };



            console.log(data);

            // return false;

            const requestOptions = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            };

            // Make the POST request using axios
            await fetch(`${API_URL}/api/updateregister`, requestOptions)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    if (data.status === 200) {
                        swal({
                            text: data.message,
                            icon: "success"
                        });
                        Navigate("/Login");
                    } else {
                        swal({
                            text: data.message,
                            icon: "error"
                        });
                    }
                });

        } catch (error) {
            console.error(error);
        }
    }

    const allowOnlyNumbers = (e) => {
        e.preventDefault();
        const input = e.target;
        const value = input.value.replace(/[^\d]/g, ''); // Replace any non-numeric characters with an empty string
        input.value = value; // Set the input value to the filtered value
    }

    const handlePhoneChange = (value) => {
        setPhone(value);
        if (value === '' || value === undefined) {
            setIsPhoneValid(true);
        } else {
            setIsPhoneValid(isValidPhoneNumber(value));
        }
    };

    const handleReferenceSantPhoneChange = (value) => {
        setReferenceSantPhone(value);
        if (value === '' || value === undefined) {
            setReferenceSantIsPhoneValid(true);
        } else {
            setReferenceSantIsPhoneValid(isValidPhoneNumber(value));
        }
    };

    const handleReferenceHaribhagatPhoneChange = (value) => {
        setReferenceHaribhagatPhone(value);
        if (value === '' || value === undefined) {
            setReferenceHaribhagatIsPhoneValid(true);
        } else {
            setReferenceHaribhagatIsPhoneValid(isValidPhoneNumber(value));
        }
    };


    useEffect(() => {
        window.googleTranslateElementInit = function () {
            new window.google.translate.TranslateElement({
                pageLanguage: 'en',
                includedLanguages: 'en,hi,mr,gu', // English, Hindi, Marathi
                layout: google.translate.TranslateElement.InlineLayout.SIMPLE
            }, 'google_translate_element');
        }
    }, []);

    useEffect(() => {
        const style = document.createElement('style');
        style.textContent = `
            .goog-te-combo { display: block !important; }
            .skiptranslate iframe { display: none !important; }
            body { top: 0 !important; }
        `;
        document.head.appendChild(style);

        return () => {
            document.head.removeChild(style);
        };
    }, []);

    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);




    return (
        <div>
            <div className='topheader'>
                <Container fluid style={{ paddingLeft: '30px', paddingRight: '30px' }}>
                    <Row>
                        <Col lg={4}>
                            <h3>Swaminarayan Satsangis organisation</h3>
                        </Col>
                        <Col lg={8}>
                            <i className="fa fa-envelope" aria-hidden="true"></i>Email: info@shreesso.org
                            <i className="fa fa-phone" aria-hidden="true"></i>Call us: +91 9321131170
                            <i className="fa fa-globe" aria-hidden="true"></i><div id="google_translate_element"></div>
                            {/* <i className="fa fa-globe" aria-hidden="true"></i> */}
                            {/* <select name="cars" id="cars">
                                <option value="volvo">English</option>
                                <option value="saab">Gujrati</option>
                            </select> */}
                        </Col>
                    </Row>
                </Container>
            </div>
            <div className="login" style={{ background: "#F7EAED" }}>
                <div className="row" style={{ alignItems: 'center' }}>
                    <div className="col-lg-6" style={{ paddingRight: 0, paddingLeft: 0 }}>
                        <img
                            // src={pana}
                            src={banner}
                            style={{ width: "100%", padding: '100px', marginLeft: 'auto', marginRight: 'auto', display: 'block' }}
                        />
                    </div>
                    <div className="col-lg-6" style={{ paddingRight: 30, paddingLeft: 30 }}>
                        <div className="login_form">
                            <div className="login_form1">
                                <img src={logo} alt="" />
                                {/* <h2>Create your account</h2>
                                <p className='mandoyjsdsjhdsjhj'>(Fields with   mark are mandatory)</p> */}
                                <form method='POST'>
                                    <div className='scrollregister1'>
                                        {/* <div
                                            className="col-lg-12"
                                            style={{ display: "block", margin: "auto" }}
                                        >
                                            <label htmlFor="firstName" id="labell">
                                                First Name 
                                            </label>
                                            <div className="mb-3 input-group">
                                                <span className="input-group-text" id="basic-addon1">
                                                    <i className="fa fa-user" aria-hidden="true" />
                                                </span>
                                                <input
                                                    required
                                                    name="First Name *"
                                                    placeholder="First Name *"
                                                    aria-label="First Name *"
                                                    type="text"
                                                    className="form-control"
                                                    onChange={(e) => setFirstName(e.target.value)}
                                                    ref={firstNameRef}
                                                />
                                            </div>
                                        </div>
                                        <Row>
                                            <div
                                                className="col-lg-6"
                                                style={{ display: "block", margin: "auto" }}
                                            >
                                                <label htmlFor="firstName" id="labell">
                                                    Middle Name 
                                                </label>
                                                <div className="mb-3 input-group">
                                                    <span className="input-group-text" id="basic-addon1">
                                                        <i className="fa fa-user" aria-hidden="true" />
                                                    </span>
                                                    <input
                                                        required
                                                        name="Middle Name"
                                                        placeholder="Middle Name"
                                                        aria-label="Middle Name"
                                                        type="text"
                                                        className="form-control"
                                                        onChange={(e) => setMiddleName(e.target.value)}
                                                        ref={middleNameRef}
                                                    />
                                                </div>
                                            </div>
                                            <div
                                                className="col-lg-6"
                                                style={{ display: "block", margin: "auto" }}
                                            >
                                                <label htmlFor="firstName" id="labell">
                                                    Last Name 
                                                </label>
                                                <div className="mb-3 input-group">
                                                    <span className="input-group-text" id="basic-addon1">
                                                        <i className="fa fa-user" aria-hidden="true" />
                                                    </span>
                                                    <input
                                                        required
                                                        name="Last Name"
                                                        placeholder="Last Name"
                                                        aria-label="Email ID"
                                                        type="text"
                                                        className="form-control"
                                                        onChange={(e) => setLastName(e.target.value)}
                                                        ref={lastNameRef}
                                                    />
                                                </div>
                                            </div>
                                        </Row>
                                        <div
                                            className="col-lg-12"
                                            style={{ display: "block", margin: "auto" }}
                                        >
                                            <label htmlFor="firstName" id="labell">
                                                Select Gender 
                                            </label>
                                            <div className="mb-3 input-group">
                                                <span className="input-group-text" id="basic-addon1">
                                                    <i className="fa fa-user" aria-hidden="true" />
                                                </span>
                                                <select className="form-control" aria-label="Default select example" onChange={(e) => setGender(e.target.value)} ref={genderRef}>
                                                    <option selected hidden>Select Gender</option>
                                                    <option value="Male" >Male</option>
                                                    <option value="Female" >Female</option>
                                                    <option value="Others" >Others</option>
                                                </select>

                                            </div>
                                        </div>
                                        <div
                                            className="col-lg-12"
                                            style={{ display: "block", margin: "auto" }}
                                        >
                                            <label htmlFor="firstName" id="labell">
                                                Email Id 
                                            </label>
                                            <div className="mb-3 input-group">
                                                <span className="input-group-text" id="basic-addon1">
                                                    <i className="fa fa-envelope-o" aria-hidden="true" />
                                                </span>
                                                <input
                                                    required
                                                    name="email"
                                                    placeholder="Email Id"
                                                    aria-label="Email ID"
                                                    type="text"
                                                    className="form-control"
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    ref={emailRef}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-lg-12" style={{ display: "block", margin: "auto" }}>
                                            <label htmlFor="firstName" id="labell">
                                                Password 
                                            </label>
                                            <div className="mb-3 input-group">
                                                <span className="input-group-text" id="basic-addon1">
                                                    <i className="fa fa-lock" aria-hidden="true" />
                                                </span>
                                                <input
                                                    required
                                                    name="password"
                                                    placeholder="Enter Password"
                                                    aria-label="Enter Password"
                                                    type={showPassword ? "text" : "password"}
                                                    className={`form-control`}
                                                    onChange={handlePasswordChange}
                                                    ref={passwordRef}
                                                />
                                                <span
                                                    className="input-group-text"
                                                    id="basic-addon1"
                                                    style={{ cursor: "pointer" }}
                                                    onClick={togglePasswordVisibility}
                                                >
                                                    <i className={showPassword ? "fa fa-eye" : "fa fa-eye-slash"} aria-hidden="true" />
                                                </span>
                                            </div>
                                            {password &&
                                                <div className="mt-2">
                                                    <small><strong>PASSWORD MUST CONTAIN</strong></small>
                                                    <ul className="text-muted" style={{ fontSize: '0.875rem', listStyle: 'none' }}>
                                                        <li>
                                                            {getValidationIcon(requirements.uppercase)}
                                                            At least 1 uppercase letter
                                                        </li>
                                                        <li>
                                                            {getValidationIcon(requirements.lowercase)}
                                                            At least 1 lowercase letter
                                                        </li>
                                                        <li>
                                                            {getValidationIcon(requirements.symbol)}
                                                            At least 1 symbol
                                                        </li>
                                                        <li>
                                                            {getValidationIcon(requirements.minLength)}
                                                            At least 6 characters
                                                        </li>
                                                    </ul>
                                                </div>
                                            }
                                        </div>
                                        <div
                                            className="col-lg-12"
                                            style={{ display: "block", margin: "auto" }}
                                        >
                                            <label htmlFor="firstName" id="labell">
                                                Mobile Number 
                                            </label>
                                            <div className="mb-3 input-group">
                                                <PhoneInput
                                                    className={`form-control ${!isPhoneValid ? 'is-invalid' : ''}`}
                                                    defaultCountry="IN"
                                                    international
                                                    countryCallingCodeEditable={false}
                                                    localization={en}
                                                    placeholder="Mobile Number"
                                                    value={phone}
                                                    onChange={handlePhoneChange}
                                                    ref={phoneRef}
                                                />
                                            </div>
                                        </div>
                                        <div
                                            className="col-lg-12"
                                            style={{ display: "block", margin: "auto" }}
                                        >
                                            <label htmlFor="firstName" id="labell">
                                                Date Of Birth 
                                            </label>
                                            <div className="mb-3 input-group">
                                                <span className="input-group-text" id="basic-addon1">
                                                    <i className="fa fa-calendar" aria-hidden="true" />
                                                </span>
                                                <input
                                                    required
                                                    name="Date Of Birth"
                                                    placeholder="Date Of Birth"
                                                    aria-label="Date Of Birth"
                                                    type="date"
                                                    className="form-control"
                                                    onChange={(e) => setDob(e.target.value)}
                                                    ref={dobRef}
                                                />
                                            </div>
                                        </div>
                                        <div
                                            className="col-lg-12"
                                            style={{ display: "block", margin: "auto" }}
                                        >
                                            <label htmlFor="firstName" id="labell">
                                                Enter Address 
                                            </label>
                                            <div className="mb-3 input-group">
                                                <span className="input-group-text" id="basic-addon1">
                                                    <i className="fa fa-map-marker" aria-hidden="true" />
                                                </span>
                                                <input
                                                    required
                                                    name="Address"
                                                    placeholder="Enter Address"
                                                    aria-label="Eddress"
                                                    type="text"
                                                    className="form-control"
                                                    onChange={(e) => setAddress(e.target.value)}
                                                    ref={addressRef}
                                                />
                                            </div>
                                        </div> */}
                                        <ul className='referdetailss'>
                                            <li>Reference Details</li>
                                        </ul>
                                        <Row>

                                            <div
                                                className="col-lg-6"
                                                style={{ display: "block", margin: "auto" }}
                                            >
                                                <label htmlFor="firstName" id="labell">
                                                    Sanstha name you belong to
                                                </label>
                                                <div className="mb-3 input-group">
                                                    <span className="input-group-text" id="basic-addon1">
                                                        <i className="fa fa-university" aria-hidden="true" />
                                                    </span>
                                                    <input
                                                        required
                                                        name="Sanstha"
                                                        placeholder="Sanstha name you belong to"
                                                        aria-label="Sanstha"
                                                        type="text"
                                                        className="form-control"
                                                        onChange={(e) => setSansthaName(e.target.value)}
                                                        ref={sansthaNameRef}
                                                    />
                                                </div>
                                            </div>
                                            <div
                                                className="col-lg-6"
                                                style={{ display: "block", margin: "auto" }}
                                            >
                                                <label htmlFor="firstName" id="labell">
                                                    Sanstha Address
                                                </label>
                                                <div className="mb-3 input-group">
                                                    <span className="input-group-text" id="basic-addon1">
                                                        <i className="fa fa-map-marker" aria-hidden="true" />
                                                    </span>
                                                    <input
                                                        required
                                                        name="sanstha Address"
                                                        placeholder="Sanstha Address"
                                                        aria-label="sanstha Address"
                                                        type="text"
                                                        className="form-control"
                                                        onChange={(e) => setSansthaAddress(e.target.value)}
                                                        ref={sansthaAddressRef}
                                                    />
                                                </div>
                                            </div>
                                            <div
                                                className="col-lg-6"
                                                style={{ display: "block", margin: "auto" }}
                                            >
                                                <label htmlFor="firstName" id="labell">
                                                    Reference Name ( Sant )
                                                </label>
                                                <div className="mb-3 input-group">
                                                    <span className="input-group-text" id="basic-addon1">
                                                        <i className="fa fa-user" aria-hidden="true" />
                                                    </span>
                                                    <input
                                                        required
                                                        name="Reference Name"
                                                        placeholder="Reference Name ( Sant )"
                                                        aria-label="Reference Name"
                                                        type="text"
                                                        className="form-control"
                                                        onChange={(e) => setRefrence_name_sant(e.target.value)}
                                                        ref={refrence_name_santRef}
                                                    />
                                                </div>
                                            </div>
                                            <div
                                                className="col-lg-6"
                                                style={{ display: "block", margin: "auto" }}
                                            >
                                                <label htmlFor="firstName" id="labell">
                                                    Reference ( Sant ) Mobile Number
                                                </label>
                                                <div className="mb-3 input-group">
                                                    <PhoneInput
                                                        className={`form-control ${!referencesantisPhoneValid ? 'is-invalid' : ''}`}
                                                        defaultCountry="IN"
                                                        international
                                                        countryCallingCodeEditable={false}
                                                        localization={en}
                                                        placeholder="Mobile Number"
                                                        value={referencesantPhone}
                                                        onChange={handleReferenceSantPhoneChange}
                                                        ref={referencesantPhoneRef}
                                                    />
                                                </div>
                                            </div>

                                            <div
                                                className="col-lg-12"
                                                style={{ display: "block", margin: "auto", paddingLeft: '46%' }}
                                            >
                                                <span style={{ fontWeight: "bold" }}>-- OR --</span>
                                            </div>

                                            <div
                                                className="col-lg-6"
                                                style={{ display: "block", margin: "auto" }}
                                            >
                                                <label htmlFor="firstName" id="labell">
                                                    Reference Name ( Haribhagat )
                                                </label>
                                                <div className="mb-3 input-group">
                                                    <span className="input-group-text" id="basic-addon1">
                                                        <i className="fa fa-user" aria-hidden="true" />
                                                    </span>
                                                    <input
                                                        required
                                                        name="Reference Name"
                                                        placeholder="Reference Name ( Haribhagat )"
                                                        aria-label="Reference Name"
                                                        type="text"
                                                        className="form-control"
                                                        onChange={(e) => setRefrence_name_haribhagat(e.target.value)}
                                                        ref={refrence_name_haribhagatRef}
                                                    />
                                                </div>
                                            </div>
                                            <div
                                                className="col-lg-6"
                                                style={{ display: "block", margin: "auto" }}
                                            >
                                                <label htmlFor="firstName" id="labell">
                                                    Reference Mobile Number ( Haribhagat )
                                                </label>
                                                <div className="mb-3 input-group">
                                                    <PhoneInput
                                                        className={`form-control ${!referenceharibhagatisPhoneValid ? 'is-invalid' : ''}`}
                                                        defaultCountry="IN"
                                                        international
                                                        countryCallingCodeEditable={false}
                                                        localization={en}
                                                        placeholder="Mobile Number"
                                                        value={referenceharibhagatPhone}
                                                        onChange={handleReferenceHaribhagatPhoneChange}
                                                        ref={referenceharibhagatPhoneRef}
                                                    />
                                                </div>
                                            </div>
                                        </Row>

                                    </div>
                                    <div
                                        className="col-lg-12"
                                        style={{ display: "block", margin: "auto" }}
                                    >
                                        <button type="submit" className="login_btnup" onClick={registerUser}>
                                            <span>Submit</span>
                                        </button>
                                        <a
                                            className="skip-btn"
                                            onClick={() => {
                                                swal({
                                                title: 'Are you sure?',
                                                text: 'Are you sure you want to skip providing reference details? Please note that verification will not be completed without submitting reference details.',
                                                icon: 'warning',
                                                buttons: {
                                                    cancel: {
                                                    text: 'Cancel',
                                                    value: null,
                                                    visible: true,
                                                    className: '',
                                                    closeModal: true,
                                                    },
                                                    confirm: {
                                                    text: 'Yes, skip it!',
                                                    value: true,
                                                    visible: true,
                                                    className: '',
                                                    closeModal: true,
                                                    },
                                                },
                                                }).then((willSkip) => {
                                                if (willSkip) {
                                                    Navigate('/Login');
                                                }
                                                });
                                            }}
                                            >
                                            Skip &gt;&gt;&gt;
                                            </a>
                                            {/* <a className='skip-btn' onClick={() => { if (window.confirm(`Are you sure you want to skip providing reference details? Please note that verification will not be completed without submitting reference details.`)) Navigate("/Login") }}>Skip &gt;&gt;&gt;</a>*/}
                                        
                                        
                                        {/* <button type="submit" className="login_btnup" onClick={() => Navigate("/Login")}>
                                        </button> */}
                                    </div>
                                </form>
                                <span className="login_forgot">
                                    Already have an account?  <a onClick={() => Navigate("/Login")}>Login</a>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>      
    )
}

export default Registerdetail
