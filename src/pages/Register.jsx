import React, { useState, useRef, useEffect } from 'react'
import logo from "../assets/logo.svg"
import banner from "../assets/swamii.png"
import { Link, useNavigate } from 'react-router-dom'
import { Col, Container, Row, Tooltip, OverlayTrigger } from 'react-bootstrap'
import axios from 'axios'
import swal from 'sweetalert'
import PhoneInput, { formatPhoneNumber, formatPhoneNumberIntl, isValidPhoneNumber } from "react-phone-number-input";
import en from 'react-phone-number-input/locale/en';
import 'react-phone-number-input/style.css'
import API_URL from '../../config'


const Register = () => {

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
    const [country, setCountry] = useState('');
    const [aadhar, setAadhar] = useState('');
    const [aadhar_detail, setAadhar_detail] = useState([]);
    const [aadharphoto, setAadharphoto] = useState([]);
    const [aadharpreview, setAadharpreview] = useState([]);
    const [ocraadharnumber, setOcraadharnumber] = useState('');
    const [aadharotpstatus, setAadharotpstatus] = useState('');
    const [showaadharotp, setShowaadharotp] = useState(false);
    const [aadharclientid, setAadharclientid] = useState('');
    const [aadharotp, setAadharotp] = useState('');
    const [aadharupload, setAadharupload] = useState(false);
    const [aadharuploadloading, setAadharuploadloading] = useState(false);
    const [aadharverified, setAadharverified] = useState(false);
    const [passport, setPassport] = useState('');
    const [passport_verified, setPassport_verified] = useState(false);
    const [passport_detail, setPassport_detail] = useState([]);
    const [passportfrontphoto, setPassportFrontphoto] = useState([]);
    const [previewpassportfrontphoto, setPreviewPassportFrontphoto] = useState([]);
    const [passportbackphoto, setPassportBackphoto] = useState([]);
    const [previewpassportbackphoto, setPreviewPassportBackphoto] = useState([]);
    const [ocrpassportnumber, setOcrpassportnumber] = useState('');
    const [loading, setLoading] = useState(false);
    const [passportfrontloading, setPassportFrontloading] = useState(false);
    const [passportbackloading, setPassportBackloading] = useState(false);
    const [passprtverifyloading, setPassportVerifyloading] = useState(false);

    const [passportfrontclicked, setPassportFrontClicked] = useState(false);
    const [passportbackclicked, setPassportBackClicked] = useState(false);

    const [selectedlanguage, setSelectedlanguage] = useState('en');


    // const [sansthaName, setSansthaName] = useState('');
    // const [sansthaAddress, setSansthaAddress] = useState('');
    // const [referenceName, setReferenceName] = useState('');
    // const [refrence_name_sant, setRefrence_name_sant] = useState('');
    // const [refrence_name_haribhagat, setRefrence_name_haribhagat] = useState('');
    // const [referencePhone, setReferencePhone] = useState('');
    // const [referenceisPhoneValid, setReferenceIsPhoneValid] = useState(true);
    // const [referenceAddress, setReferenceAddress] = useState('');

    const firstNameRef = useRef(null);
    const middleNameRef = useRef(null);
    const lastNameRef = useRef(null);
    const genderRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const phoneRef = useRef(null);
    const dobRef = useRef(null);
    const addressRef = useRef(null);
    const aadharRef = useRef(null);
    const aadhaarotpRef = useRef(null);
    const passportRef = useRef(null);
    const passportfrontRef = useRef(null);
    const passportbackRef = useRef(null);
    // const sansthaNameRef = useRef(null);
    // const sansthaAddressRef = useRef(null);
    // const refrence_name_santRef = useRef(null);
    // const refrence_name_haribhagatRef = useRef(null);
    // const referencePhoneRef = useRef(null);


    const [passwordError, setPasswordError] = useState('');
    const [requirements, setRequirements] = useState({
        minLength: false,
        uppercase: false,
        lowercase: false,
        symbol: false,
    });


    const [NationalityList, setNationalityList] = useState([]);
    const [stateList, setStateList] = useState([]);
    const [cityList, setCityList] = useState([]);

    useEffect(() => {
        getCountry()
    }, []);


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
                    setNationalityList(data.data);
                })
        }
        catch (err) {
            console.error(err.message);
        }
    }



    const registerUser = async (e) => {
        e.preventDefault();
        try {

            // Validate the user data
            if (!firstName) {
                swal({
                    text: "Please enter your First Name *",
                    icon: "warning"
                });
                firstNameRef.current.focus();
                return;
            }
            else if (!middleName) {
                swal({
                    text: "Please enter your Middle Name",
                    icon: "warning"
                });
                middleNameRef.current.focus();
                return;
            }
            else if (!lastName) {
                swal({
                    text: "Please enter your Last Name",
                    icon: "warning"
                });
                lastNameRef.current.focus();
                return;
            }
            else if (!gender) {
                swal({
                    text: "Please select Gender",
                    icon: "warning"
                });
                genderRef.current.focus();
                return;
            }
            else if (!email) {
                swal({
                    text: "Please enter your Email",
                    icon: "warning"
                });
                emailRef.current.focus();
                return;
            }
            else if (!email.includes('@') || !email.includes('.')) {
                swal({
                    text: "Please enter a valid Email",
                    icon: "warning"
                });
                emailRef.current.focus();
                return;
            }
            else if (!password) {
                swal({
                    text: "Please enter your Password",
                    icon: "warning"
                });
                passwordRef.current.focus();
                return;
            }
            else if (passwordError) {
                swal({
                    text: `Password must contain at least:
                - 1 Uppercase letter
                - 1 Lowercase letter
                - 1 Symbol
                - 6 Characters`,
                    icon: "warning"
                });
                passwordRef.current.focus();
                return;
            }
            else if (!phone) {
                swal({
                    text: "Please enter your Mobile Number",
                    icon: "warning"
                });
                phoneRef.current.focus();
                return;
            }
            else if (!isPhoneValid) {
                swal({
                    text: "Please enter a valid Mobile Number",
                    icon: "warning"
                });
                phoneRef.current.focus();
                return;
            }
            else if (!dob) {
                swal({
                    text: "Please enter your Date of Birth",
                    icon: "warning"
                });
                dobRef.current.focus();
                return;
            }
            else if (!country) {
                swal({
                    text: "Please select your Country",
                    icon: "warning"
                });
                return;
            }
            else if (!address) {
                swal({
                    text: "Please enter your Address",
                    icon: "warning"
                });
                addressRef.current.focus();
                return;
            }
            else if (!aadharphoto) {
                swal({
                    text: "Please Upload your Aadhar Front Photo",
                    icon: "warning"
                });
                aadharRef.current.focus();
                return;
            }
            else if (!ocraadharnumber) {
                swal({
                    text: "Please Submit your Aadhar Photo",
                    icon: "warning"
                });
                aadharRef.current.focus();
                return;
            }

            else if (!aadhar) {
                swal({
                    text: "Please enter your Aadhar Number",
                    icon: "warning"
                });
                aadharRef.current.focus();
                return;
            }

            // else if (country === '66433282d3f1ba575ea7aa2d' && aadharotpstatus == '') {
            //     swal({
            //         text: "Please Verify your Aadhar OTP",
            //         icon: "warning"
            //     });
            //     aadharRef.current.focus();
            //     return;
            // }
            // else if (country === '66433282d3f1ba575ea7aa2d' && !aadharotp) {
            //     swal({
            //         text: "Please enter your Aadhar OTP",
            //         icon: "warning"
            //     });
            //     return;
            // }
            else if (!aadharverified) {
                swal({
                    text: "Please Verify your Aadhar",
                    icon: "warning"
                });
                aadhaarotpRef.current.focus();
                return;
            }
            // else if (country !== '' && country !== 'Select Country' && country !== '66433282d3f1ba575ea7aa2d' && !passport) {
            //     swal({
            //         text: "Please enter your Passport File Number",
            //         icon: "warning"
            //     });
            //     passportRef.current.focus();
            //     return;
            // }

            // else if (country !== '' && country !== 'Select Country' && country !== '66433282d3f1ba575ea7aa2d' && !passport_verified) {
            //     swal({
            //         text: "Please Verify your Passport",
            //         icon: "warning"
            //     });
            //     passportRef.current.focus();
            //     return;
            // }
            else if (aadhar != ocraadharnumber) {
                swal({
                    text: "Aadhar Number does not match with Aadhar Photo",
                    icon: "warning"
                });
                aadharRef.current.focus();
                return
            }

            // else if (country !== '' && passport?.toLowerCase() != ocrpassportnumber?.toLowerCase()) {
            //     swal({
            //         text: "File Number does not match with Passport Photo, Please Upload Clear Photo or Enter Correct File Number",
            //         icon: "warning"
            //     });
            //     setPassport('');
            //     passportRef.current.focus();
            //     return;
            // }

            // else if (!sansthaName) {
            //     swal({
            //         text: "Please enter your Sanstha Name",
            //         icon: "warning"
            //     });
            //     sansthaNameRef.current.focus();
            //     return;
            // }
            // else if (!sansthaAddress) {
            //     swal({
            //         text: "Please enter your Sanstha Address",
            //         icon: "warning"
            //     });
            //     sansthaAddressRef.current.focus();
            //     return;
            // }
            // else if (!refrence_name_sant) {
            //     swal({
            //         text: "Please enter your Reference Name ( Sant )",
            //         icon: "warning"
            //     });
            //     refrence_name_santRef.current.focus();
            //     return;
            // }
            // else if (!refrence_name_haribhagat) {
            //     swal({
            //         text: "Please enter your Reference Name ( Haribhagat )",
            //         icon: "warning"
            //     });
            //     refrence_name_haribhagatRef.current.focus();
            //     return;
            // }
            // else if (!referencePhone) {
            //     swal({
            //         text: "Please enter your Reference Mobile Number",
            //         icon: "warning"
            //     });
            //     referencePhoneRef.current.focus();
            //     return;
            // }
            // else if (!referenceisPhoneValid) {
            //     swal({
            //         text: "Please enter a valid Reference Mobile Number",
            //         icon: "warning"
            //     });
            //     phoneRef.current.focus();
            //     return;
            // }

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
                country,
                aadhar,
                passport,
                // sansthaName,
                // sansthaAddress,
                // refrence_name_sant,
                // refrence_name_haribhagat,
                // referencePhone,
                // referenceAddress
            });

            // Prepare the data to be sent in the request
            // const data = {
            //     first_name: firstName,
            //     middle_name: middleName,
            //     last_name: lastName,
            //     gender: gender,
            //     email: email,
            //     password: password,
            //     phone: phone,
            //     date_of_birth: dob,
            //     address: address,
            //     country: country,
            //     aadhar_number: aadhar,
            //     passport_number: passport,
            //     aadhar_detail: aadhar_detail,
            //     passport_detail: passport_detail,
            //     aadhar: aadharphoto,
            //     passportback: passportbackphoto,
            //     passportfront: passportfrontphoto,
            // sanstha_name: sansthaName,
            // sanstha_location: sansthaAddress,
            // reference_name_sant: refrence_name_sant,
            // reference_name_haribhagat: refrence_name_haribhagat,
            // reference_phone: referencePhone,
            // reference_location: referenceAddress
            // };

            const data = new FormData();
            data.append('first_name', firstName);
            data.append('middle_name', middleName);
            data.append('last_name', lastName);
            data.append('gender', gender);
            data.append('email', email);
            data.append('password', password);
            data.append('phone', phone);
            data.append('date_of_birth', dob);
            data.append('address', address);
            data.append('country', country);
            data.append('aadhar_number', aadhar);
            data.append('passport_number', passport);
            data.append('aadhar_detail', aadhar_detail);
            data.append('passport_detail', passport_detail);
            data.append('aadhar', aadharphoto); // Assuming aadharphoto is a File object
            data.append('passportback', passportbackphoto); // Assuming passportbackphoto is a File object
            data.append('passportfront', passportfrontphoto);



            console.log(data);

            setLoading(true);

            const requestOptions = {
                method: 'POST',
                // headers: { 'Content-Type': 'application/json' },
                body: data
            };

            // Make the POST request using axios
            await fetch(`${API_URL}/api/register`, requestOptions)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    if (data.status === 201) {
                        swal({
                            text: data.message,
                            icon: "success"
                        }).then(() => {
                            localStorage.setItem('email', email);
                            Navigate("/Registerdetail");
                        })
                        setLoading(false);
                    } else {
                        swal({
                            text: data.message,
                            icon: "error"
                        });
                        setLoading(false);
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

    const handleReferencePhoneChange = (value) => {
        setReferencePhone(value);
        if (value === '' || value === undefined) {
            setReferenceIsPhoneValid(true);
        } else {
            setReferenceIsPhoneValid(isValidPhoneNumber(value));
        }
    };


    const handleCountryChange = (e) => {
        setCountry(e.target.value);
        console.log(e.target.value);
        if (e.target.value === '66433282d3f1ba575ea7aa2d') {
            setPassport('');
            setPassport_verified(false);
            setPassport_detail([]);
            setPassportFrontphoto([]);
            setPreviewPassportFrontphoto([]);
            setPassportBackphoto([]);
            setPreviewPassportBackphoto([]);
            setOcrpassportnumber('');
            setPassportFrontClicked(false);
            setPassportBackClicked(false);
            aadharRef.current.focus();

        }
        else {
            setAadhar('');
            setAadharverified(false);
            setAadhar_detail([]);
            setAadharphoto([]);
            setAadharpreview([]);
            setOcraadharnumber('');
            setAadharotpstatus('');
            setShowaadharotp(false);
            setAadharclientid('');
            setAadharotp('');
            passportRef.current.focus();
        }
    };






    const SUREPASS_API_KEY = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTcyMDY4MTcyOSwianRpIjoiMzIzYWRlYTItNWJkMS00MzYzLTllYjctYjVkZjIyNDY4MGFkIiwidHlwZSI6ImFjY2VzcyIsImlkZW50aXR5IjoiZGV2LnN3YW1pbmFyYXlhbkBzdXJlcGFzcy5pbyIsIm5iZiI6MTcyMDY4MTcyOSwiZXhwIjoyMDM2MDQxNzI5LCJlbWFpbCI6InN3YW1pbmFyYXlhbkBzdXJlcGFzcy5pbyIsInRlbmFudF9pZCI6Im1haW4iLCJ1c2VyX2NsYWltcyI6eyJzY29wZXMiOlsidXNlciJdfX0._ENHzsWdQ2gptnD0a53ZYzoCvTenL6eqFCHYDMIUTss';

    const handleaadharsendotp = (e) => {
        try {
            e.preventDefault();
            console.log(aadhar);
            setShowaadharotp(true);
            setAadharotp('');
            setTimeout(() => {
                if (aadhaarotpRef.current) {
                    aadhaarotpRef.current.focus();
                }
            }, 0);

            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': SUREPASS_API_KEY
                },
                body: JSON.stringify({ id_number: aadhar })
            };

            fetch(`https://kyc-api.surepass.io/api/v1/aadhaar-v2/generate-otp`, requestOptions)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    if (data.status_code === 200) {
                        swal({
                            text: data.message,
                            icon: "success"
                        });
                        setAadharclientid(data.data.client_id);
                        setAadharotpstatus(data.data.status_code);


                    } else {
                        swal({
                            text: data.message,
                            icon: "error"
                        });
                    }
                });
            setShowaadharotp(true);
        } catch (error) {
            console.error(error);
        }
    };

    const handleotpsubmit = (e) => {
        e.preventDefault();
        console.log(aadharotp);
        console.log(aadharclientid);

        // return false;

        const data = {
            client_id: aadharclientid,
            otp: aadharotp
        }
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': SUREPASS_API_KEY
            },
            body: JSON.stringify(data)
        };

        fetch(`https://kyc-api.surepass.io/api/v1/aadhaar-v2/submit-otp`, requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if (data.status_code === 200) {
                    swal({
                        text: 'Aadhar Number Verified Successfully',
                        icon: "success"
                    });
                    setAadharverified(true);
                    setAadhar_detail(data.data);
                } else {
                    swal({
                        text: data.message,
                        icon: "error"
                    });
                }
            });
    };

    console.log("passportbackphoto", passportbackphoto);
    console.log("passportbackclicked", passportbackclicked);

    const handleaadharverification = (e) => {
        e.preventDefault()

        try {
            if (!aadhar) {
                swal({
                    text: 'please fill your aadhar number',
                    icon: 'warning'
                })
            }
            else if (!firstName) {
                swal({
                    text: "Please enter your first name *",
                    icon: "warning"
                });
                firstNameRef.current.focus();
                return;
            }
            else if (!middleName) {
                swal({
                    text: "Please enter your middle name",
                    icon: "warning"
                });
                middleNameRef.current.focus();
                return;
            }
            else if (!lastName) {
                swal({
                    text: "Please enter your last name",
                    icon: "warning"
                });
                lastNameRef.current.focus();
                return;
            }
            else if (!email) {
                swal({
                    text: "Please enter your email",
                    icon: "warning"
                });
                emailRef.current.focus();
                return;
            }
            else if (!email.includes('@') || !email.includes('.')) {
                swal({
                    text: "Please enter a valid email",
                    icon: "warning"
                });
                emailRef.current.focus();
                return;
            }
            else if (!phone) {
                swal({
                    text: "Please enter your mobile number",
                    icon: "warning"
                });
                phoneRef.current.focus();
                return;
            }
            else if (!isPhoneValid) {
                swal({
                    text: "Please enter a valid mobile number",
                    icon: "warning"
                });
                phoneRef.current.focus();
                return;
            }
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", SUREPASS_API_KEY);
            const reqOptions = {
                method: "POST",
                headers: myHeaders,
                body: JSON.stringify({
                    data: {
                        prefill_options: {
                            full_name: `${firstName} ${middleName} ${lastName}`,
                            mobile_number: phone.slice(3),
                            user_email: email
                        },
                        expiry_minutes: 10,
                        send_sms: false,
                        send_email: false,
                        verify_phone: false,
                        verify_email: false,
                        signup_flow: false,
                        redirect_url: "https://google.com",
                        state: "test"
                    }
                }),
                redirect: "follow"
            };

            fetch("https://kyc-api.surepass.app/api/v1/digilocker/initialize", reqOptions)
                .then((response) => response.json())
                .then((result) => {
                    console.log(result, " >>>>>>>> result 1")

                    const popup = window.open(result.data.url, "_blank");

                    const pollTimer = window.setInterval(() => {
                        if (popup.closed) {
                            window.clearInterval(pollTimer);
                            console.log("Popup closed!");

                            const clientId = result?.data?.client_id;
                            DownloadAadhar(clientId);
                        }
                    }, 1000);
                })
                .catch((error) => console.error(error));
        } catch (err) {
            swal({
                text: 'something went wrong, please try again',
                type: 'error'
            })
            console.log(err)
        }
    }

    const DownloadAadhar = (client_id) => {
        try {
            const myHeaders = new Headers();
            myHeaders.append("Authorization", SUREPASS_API_KEY);

            const requestOptions = {
                method: "GET",
                headers: myHeaders,
                redirect: "follow"
            };

            fetch(`https://kyc-api.surepass.app/api/v1/digilocker/download-aadhaar/${client_id}`, requestOptions)
                .then((response) => response.json())
                .then((result) => {
                    console.log(result, " result 2")
                    if (result.status_code == 200) {
                        swal({
                            text: 'Aadhaar Verified Sucessfully',
                            icon: "success"
                        })
                        setAadharverified(true)
                        setAadhar_detail(data.data);
                    } else {
                        swal({
                            text: 'Aadhaar Not Verified',
                            icon: "error"
                        })
                        setAadharverified(false)
                    }
                })
                .catch((error) => console.error(error));
        } catch (error) {
            console.log(error)
        }
    }


    // const handlepassportverification = async (e) => {
    //     e.preventDefault();
    //     console.log(passport);
    //     console.log(dob);

    //     if (!passport){
    //         swal({
    //             text: "Please enter your Passport File Number",
    //             icon: "warning"
    //         });
    //         return;
    //     }

    //     if (!ocrpassportnumber){

    //         if(passportfrontphoto?.length == 0 || passportfrontphoto == null){
    //             swal({
    //                 text: "Please Upload Passport Front Photo",
    //                 icon: "warning"
    //             });
    //             return;
    //         }
    //         if(passportfrontphoto && (passportfrontclicked == false)){
    //             swal({
    //                 text: "Please click on upload Button to upload Passport Front Photo",
    //                 icon: "warning"
    //             });
    //             return;
    //         }
    //         if (passportbackphoto?.length == 0 || passportbackphoto == null) {
    //             swal({
    //                 text: "Please Upload Passport Back Photo",
    //                 icon: "warning"
    //             });
    //             return;
    //         }
    //         if (passportbackphoto && (passportbackclicked === false)) {
    //             swal({
    //                 text: "Please click on upload Button to upload Passport Back Photo",
    //                 icon: "warning"
    //             });
    //             return;
    //         }
    //     }



    //     if (!dob) {
    //         swal({
    //             text: "Please enter your Date of Birth",
    //             icon: "warning"
    //         });
    //         return;
    //     }

    //     setPassportVerifyloading(true);

    //     const data = {
    //         id_number: passport,
    //         dob: dob
    //     }
    //     const requestOptions = {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Authorization': SUREPASS_API_KEY
    //         },
    //         body: JSON.stringify(data)
    //     };

    //     await fetch(`https://kyc-api.surepass.io/api/v1/passport/passport/passport-details`, requestOptions)
    //         .then(response => response.json())
    //         .then(data => {
    //             console.log(data);

    //             if (data.status_code == 200) {
    //                 swal({
    //                     text: 'Passport Number Verified Successfully',
    //                     icon: "success"
    //                 });
    //                 setPassport_verified(true);
    //                 setPassport_detail(data.data);
    //                 console.log("dataaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", data.data);
    //                 setPassportVerifyloading(false);
    //             } else {
    //                 swal({
    //                     text: data.message,
    //                     icon: "error"
    //                 });
    //                 setPassportVerifyloading(false);
    //             }
    //         });



    // };

    console.log("passportfrontphoto", passportfrontphoto);
    console.log("passport_verified", passport_verified);

    const handlepassportverification = async (e) => {
        e.preventDefault();
        try {
            if (passportfrontphoto.length == 0 || passportfrontphoto == null) {
                swal({
                    text: "Please Upload Passport Front Photo",
                    icon: "warning"
                });
                return;
            }

            setPassportVerifyloading(true);

            const formData = new FormData();
            formData.append('file', passportfrontphoto);
            const requestOptions = {
                method: 'POST',
                headers: {

                    'Authorization': SUREPASS_API_KEY
                },
                body: formData
            };

            await fetch(`https://kyc-api.surepass.io/api/v1/ocr/international-passport-v2`, requestOptions)
                .then(response => response.json())
                .then(data => {
                    console.log("data++++", data);
                    console.log("status", data.status);
                    if (data.status_code === 200 && data.success === true) {
                        swal({
                            text: 'Passport Number Verified Successfully',
                            icon: "success"
                        });
                        setPassport_verified(true);
                        setPassport_detail(data.data);
                        setPassportVerifyloading(false);

                        console.log("dataaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", data.data);
                    } else {
                        setPassportVerifyloading(false);
                        setPassport_verified(false);
                        swal({
                            text: data.message,
                            icon: "error"
                        });
                    }
                });
        } catch (error) {
            console.error("error", error);
            setPassportVerifyloading(false);
            swal({
                text: error.message,
                icon: "error"
            });


        }
    };

    // const handlepassportverification = async (e) => {
    //     e.preventDefault()
    //         setPassport_verified(true);
    //         swal({
    //             text: 'Passport Number Verified Successfully',
    //             icon: "success"
    //         });
    // }

    console.log("passport_detail", passport_detail);

    const handleaadharchange = (e) => {
        setAadharupload(false)
        
        const file = e.target.files[0];
        console.log("file>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", file);
        if (file) {
            setAadharphoto(file);
            setAadharpreview(URL.createObjectURL(file));
            console.log("File selected:", file);
            
        } else {
            setAadharphoto(null);
            setAadharpreview(null);
           
        }
    }


    const handlepassportfrontchange = (e) => {
        setPassportFrontClicked(false);
        setPassportFrontphoto([]);
        setPreviewPassportFrontphoto([]);
        setOcrpassportnumber('');
        setPassport_verified(false);

        const file = e.target.files[0];
        console.log("file>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", file);
        if (file) {
            setPassportFrontphoto(file);
            setPreviewPassportFrontphoto(URL.createObjectURL(file));
            console.log("File selected:", file);
        } else {
            setPassportFrontphoto(null);
            setPreviewPassportFrontphoto(null);
        }
    }

    const handlepassportbackchange = (e) => {
        setPassportBackClicked(false);
        setPassportBackphoto([]);
        setPreviewPassportBackphoto([]);
        setOcrpassportnumber('');
        const file = e.target.files[0];
        console.log("file>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", file);
        if (file) {
            setPassportBackphoto(file);
            setPreviewPassportBackphoto(URL.createObjectURL(file));
            console.log("File selected:", file);
        } else {
            setPassportBackphoto(null);
            setPreviewPassportBackphoto(null);
        }
    }

    const handleaadharupload = async(e) => {
        e.preventDefault();
        console.log("aadharphoto", aadharphoto)
        try {
            if (!aadharphoto || aadharphoto == [] || aadharphoto.length == 0) {
                swal({
                    text: "Please Upload your Aadhar Front Photo",
                    icon: "warning"
                });
                aadharRef.current.focus();
                return;
            }
            setAadharuploadloading(true)
            const myHeaders = new Headers();
            myHeaders.append("Authorization", SUREPASS_API_KEY);

            const formdata = new FormData();
            formdata.append("file", aadharphoto);

            const requestOptions = {
                method: "POST",
                headers: {
                    Authorization: SUREPASS_API_KEY
                },
                body: formdata,
                // redirect: "follow"
            };

            await fetch(`https://kyc-api.surepass.io/api/v1/ocr/aadhaar`, requestOptions)
                .then(response => response.json())
                .then(data => {
                    console.log("ocr data", data);
                    if (data.status_code === 200) {
                        swal({
                            text: "Aadhar Front Photo Uploaded Successfully!",
                            icon: "success"
                        });
                        const aadhar_number_data = data?.data?.ocr_fields?.map((item) => item?.aadhaar_number?.value)[0];
                        console.log(aadhar_number_data);
                        setOcraadharnumber(aadhar_number_data);
                        setAadhar(aadhar_number_data)
                        setAadharupload(true)
                        setAadharuploadloading(false)
                    } else {
                        swal({
                            text: data.message,
                            icon: "error"
                        });
                        setAadharuploadloading(false)
                    }
                });
        }
        catch (error) {
            console.error(error);
        }
    };
    console.log("ocraadharnumber", ocraadharnumber)
    const resetfrontpassport = () => {
        setPassportFrontphoto(null);
        setPreviewPassportFrontphoto(null);
        setPassport_verified(false);
        if (passportfrontRef.current) {
            passportfrontRef.current.value = "";
        }
    };

    const resetbackpassport = () => {
        setPassportBackphoto(null);
        setPreviewPassportBackphoto(null);
        if (passportbackRef.current) {
            passportbackRef.current.value = "";
        }
    };


    const handlepassportfrontupload = (e) => {
        e.preventDefault();
        try {
            setPassportFrontClicked(true);
            setPassportFrontloading(true);
            console.log(passportfrontphoto);

            const myHeaders = new Headers();
            myHeaders.append("Authorization", SUREPASS_API_KEY);

            const formdata = new FormData();
            formdata.append("file", passportfrontphoto);

            const requestOptions = {
                method: "POST",
                headers: {
                    Authorization: SUREPASS_API_KEY
                },
                body: formdata,
                // redirect: "follow"
            };

            fetch(`https://kyc-api.surepass.io/api/v1/ocr/passport`, requestOptions)
                .then(response => response.json())
                .then(data => {
                    console.log("ocr data", data);
                    console.log(data.data.ocr_fields?.map(val => val.document_type)[0]);
                    if (data.data.ocr_fields?.map(val => val.document_type)[0] === 'passport_front') {
                        if (data.status_code === 200) {
                            swal({
                                text: "Passport Front Photo Uploaded Successfully",
                                icon: "success"
                            });
                            setPassportFrontloading(false);
                        } else {
                            swal({
                                text: data.message,
                                icon: "error"
                            });
                            setPassportFrontloading(false);
                            setPassportFrontphoto([]);
                            setPassportFrontClicked(false);

                        }
                    }
                    else {
                        swal({
                            text: "Please Upload Passport Front Photo",
                            icon: "error"
                        });
                        setPassportFrontloading(false);
                        setPassportFrontphoto([]);
                        setPreviewPassportFrontphoto([]);
                        resetfrontpassport();
                    }
                });
        }
        catch (error) {
            console.error(error);
        }
    };

    const handlepassportbackpload = (e) => {

        e.preventDefault();
        try {
            setPassportBackClicked(true);
            setPassportBackloading(true);
            console.log(passportbackphoto);

            const myHeaders = new Headers();
            myHeaders.append("Authorization", SUREPASS_API_KEY);

            const formdata = new FormData();
            formdata.append("file", passportbackphoto);

            const requestOptions = {
                method: "POST",
                headers: {
                    Authorization: SUREPASS_API_KEY
                },
                body: formdata,
                // redirect: "follow"
            };

            fetch(`https://kyc-api.surepass.io/api/v1/ocr/passport`, requestOptions)
                .then(response => response.json())
                .then(data => {
                    console.log("ocr data", data);
                    if (data.status_code === 200) {
                        if (data.data.ocr_fields?.map(val => val.document_type === 'passport_back')) {
                            swal({
                                text: "Passport Back Photo Uploaded Successfully",
                                icon: "success"
                            });
                            console.log(data.data.ocr_fields?.map(val => val.file_num?.value)[0]);
                            setOcrpassportnumber(data.data.ocr_fields?.map(val => val.file_num?.value)[0]);
                            setPassportBackloading(false);
                        } else {
                            swal({
                                text: "Please Upload Passport Back Photo",
                                icon: "error"
                            });
                            setPassportBackloading(false);
                            setPassportBackphoto([]);
                            setPassportBackClicked(false);
                        }

                    } else {
                        swal({
                            text: data.message,
                            icon: "error"
                        });
                        setPassportBackloading(false);
                        setPassportBackClicked(false);
                        setPassportBackphoto([]);
                        setPreviewPassportBackphoto([]);
                        resetbackpassport();
                    }
                });
        }
        catch (error) {
            console.error(error);
        }
    };


    const handlePassportChange = (e) => {

        setPassport_verified(false);
        setPassport(e.target.value);

    };


    useEffect(() => {
        window.googleTranslateElementInit = function () {
            new window.google.translate.TranslateElement({
                pageLanguage: '',
                includedLanguages: 'en,hi,mr,gu', // English, Hindi, Marathi, Gujarati
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
        console.log("script", script);

        return () => {
            document.body.removeChild(script);

        };
    }, []);

    useEffect(() => {
        // Set up a MutationObserver to detect language changes
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                console.log('Language changed:', mutation.target.textContent);
                if (mutation.target.textContent === 'જાતિ') {
                    document.getElementById('genderlabell').textContent = 'લિંગ';
                    document.getElementById('genderplaceholder').textContent = 'લિંગ';
                }

                if (mutation.target.textContent === 'ચિહ્ન') {
                    document.getElementById('dateofbirthlabell').textContent = 'જન્મ તારીખ';
                }
            });
        });

        // Observe changes in the document body
        observer.observe(document.body, { childList: true, subtree: true });

        // Cleanup observer on component unmount
        return () => {
            observer.disconnect();
        };

    }, []);



    console.log("ocrpass", ocrpassportnumber?.toLowerCase());
    console.log("passport", passport?.toLowerCase());
    console.log("selectedlanguage", selectedlanguage);

    console.log("passportfrontclicked", passportfrontclicked);
    console.log("passportbackclicked", passportbackclicked);

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
                        </div>
                        <div className="login_form">
                            <div className="login_form1">
                                How to Register? <a href={`https://myssoapi.handsintechnology.in/assests/register.mp4`} rel='' target='_blank'>Click Here</a>
                                <img src={logo} alt="" />
                                <h2>Create your account</h2>
                                <p className='mandoyjsdsjhdsjhj'>(Fields with  <span className='labelerrorssss'>*</span> mark are mandatory)</p>
                                <form method='POST'>
                                    <div className='scrollregister'>
                                        <Row>
                                            <div
                                                className="col-lg-4"
                                                style={{ display: "block", margin: "auto" }}
                                            >
                                                <label htmlFor="firstName" id="labell">
                                                    First Name <span className='labelerrorssss'>*</span>
                                                    {/* <p className='note'>sdm,smkdlmksldmkslmkdlsld</p> */}
                                                </label>
                                                <div className="mb-3 input-group">
                                                    <span className="input-group-text" id="basic-addon1">
                                                        <i className="fa fa-user" aria-hidden="true" />
                                                    </span>
                                                    <input
                                                        required
                                                        name="First Name"
                                                        placeholder="First Name"
                                                        aria-label="First Name"
                                                        type="text"
                                                        className="form-control"
                                                        onChange={(e) => setFirstName(e.target.value)}
                                                        ref={firstNameRef}
                                                    />
                                                </div>
                                            </div>
                                            <div
                                                className="col-lg-4"
                                                style={{ display: "block", margin: "auto" }}
                                            >
                                                <label htmlFor="firstName" id="labell">
                                                    Middle Name <span className='labelerrorssss'>*</span>
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
                                                className="col-lg-4"
                                                style={{ display: "block", margin: "auto" }}
                                            >
                                                <label htmlFor="firstName" id="labell">
                                                    Last Name <span className='labelerrorssss'>*</span>
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

                                            <div
                                                className="col-lg-6"
                                                style={{ display: "block", margin: "auto" }}
                                            >
                                                <label htmlFor="Gender" id="genderlabell">
                                                    Gender <span className='labelerrorssss'>*</span>
                                                </label>
                                                <div className="mb-3 input-group">
                                                    <span className="input-group-text" id="basic-addon1">
                                                        <i className="fa fa-user" aria-hidden="true" />
                                                    </span>
                                                    <select className="form-control" aria-label="Default select example" name='gender' onChange={(e) => setGender(e.target.value)} ref={genderRef}>
                                                        <option selected hidden id='genderplaceholder'>Gender</option>
                                                        <option value="Male" >Male</option>
                                                        <option value="Female" >Female</option>
                                                        <option value="Others" >Others</option>
                                                    </select>

                                                </div>
                                            </div>

                                            <div
                                                className="col-lg-6"
                                                style={{ display: "block", margin: "auto" }}
                                            >
                                                <label htmlFor="firstName" id="dateofbirthlabell">
                                                    Date Of Birth <span className='labelerrorssss'>*</span>
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
                                                className="col-lg-6"
                                                style={{ display: "block", margin: "auto" }}
                                            >
                                                <label htmlFor="firstName" id="labell">
                                                    Email Id <span className='labelerrorssss'>*</span>
                                                </label>
                                                <div className="mb-3 input-group">
                                                    <span className="input-group-text" id="basic-addon1">
                                                        <i className="fa fa-envelope-o" aria-hidden="true" />
                                                    </span>
                                                    <input
                                                        autoComplete='off'
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
                                            <div className="col-lg-6" style={{ display: "block", margin: "auto" }}>
                                                <label htmlFor="firstName" id="labell">
                                                    Password <span className='labelerrorssss'>*</span>
                                                </label>
                                                <div className="mb-3 input-group">
                                                    <span className="input-group-text" id="basic-addon1">
                                                        <i className="fa fa-lock" aria-hidden="true" />
                                                    </span>
                                                    <input
                                                        autoComplete='off'
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
                                                {password && passwordError &&
                                                    <div className="mt-2">
                                                        <OverlayTrigger
                                                            placement="bottom"
                                                            show={passwordError}  // Control the tooltip's visibility based on passwordError
                                                            overlay={
                                                                <Tooltip id="tooltip-bottom">
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
                                                                </Tooltip>
                                                            }
                                                        >
                                                            <small className="text-danger mb-4">Password doesn't meet the requirements</small>

                                                        </OverlayTrigger>

                                                    </div>
                                                }

                                            </div>
                                            <div
                                                className="col-lg-6"
                                                style={{ display: "block", margin: "auto" }}
                                            >
                                                <label htmlFor="firstName" id="labell">
                                                    Mobile Number <span className='labelerrorssss'>*</span>
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
                                                className="col-lg-6"
                                                style={{ display: "block", margin: "auto" }}
                                            >
                                                <label htmlFor="firstName" id="labell">
                                                    Select Country <span className='labelerrorssss'>*</span>
                                                </label>
                                                <div className="mb-3 input-group">
                                                    <span className="input-group-text" id="basic-addon1">
                                                        <i className="fa fa-user" aria-hidden="true" />
                                                    </span>
                                                    <select className="form-control" aria-label="Default select example" onChange={handleCountryChange}>
                                                        <option hidden>Select Country </option>
                                                        {NationalityList?.map((nationality, index) => (
                                                            <option key={index} value={nationality._id}>{nationality.country_name}</option>
                                                        ))}
                                                    </select>

                                                </div>
                                            </div>
                                        </Row>
                                        <div
                                            className="col-lg-12"
                                            style={{ display: "block", margin: "auto" }}
                                        >
                                            <label htmlFor="firstName" id="labell">
                                                Enter Address <span className='labelerrorssss'>*</span>
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
                                        </div>

                                        <>
                                            <div
                                                className="col-lg-12"
                                                style={{ display: "block", margin: "auto", position: 'relative' }}

                                            >
                                                <label htmlFor="firstName" id="labell">
                                                    Upload Aadhaar Front Photo <span className='labelerrorssss'>*</span>
                                                    {/* <p className='mandoyjsdsjhdsjhj'>(Mandatory for India Users)</p> */}
                                                </label>
                                                <div className="mb-3 input-group">
                                                    <span className="input-group-text" id="basic-addon1">
                                                        <i className="fa fa-user" aria-hidden="true" />
                                                    </span>
                                                    <input
                                                        required
                                                        id='aadhar'
                                                        name="Aadhaar Number"
                                                        placeholder="Aadhaar Number"
                                                        aria-label="Aadhaar Number"
                                                        type="file"
                                                        className="form-control"
                                                        onChange={handleaadharchange}
                                                        ref={aadharRef}
                                                        accept='image/*'

                                                    />
                                                </div>
                                                {
                                                    aadharuploadloading == true ? (
                                                        <button className='send-opttp'>please wait ...</button>
                                                    ) : aadharupload ? (
                                                        <button className='submit-opttpverified1'>uploaded</button>
                                                    ) : (
                                                        <button className='send-opttp' onClick={handleaadharupload}>Click to Upload</button>
                                                    )
                                                }

                                                <div>

                                                    {aadharpreview?.length ? <img src={aadharpreview} style={{ width: '100px', height: '100px' }} alt="Aadhaar preview" /> : null}

                                                </div>
                                            </div>
                                            <div
                                                className="col-lg-12"
                                                style={{ display: "block", margin: "auto", position: 'relative' }}
                                            >
                                                <label htmlFor="firstName" id="labell">
                                                    Aadhaar Number <span className='labelerrorssss'>*</span>
                                                    {/* <p className='mandoyjsdsjhdsjhj'>(Mandatory for India Users)</p> */}
                                                </label>
                                                <div className="mb-3 input-group">
                                                    <span className="input-group-text" id="basic-addon1">
                                                        <i className="fa fa-user" aria-hidden="true" />
                                                    </span>
                                                    <input
                                                        required
                                                        name="Aadhaar Number"
                                                        placeholder="Aadhaar Number"
                                                        aria-label="Aadhaar Number"
                                                        type="text"
                                                        className="form-control"
                                                        value={aadhar}
                                                        onChange={(e) => setAadhar(e.target.value)}
                                                        ref={aadharRef}

                                                    />
                                                </div>
                                                {/* <button className='send-opttp' onClick={handleaadharsendotp}>Send OTP</button> */}
                                                {aadharverified == true ?
                                                    <button className='submit-opttpverified1' >Aadhar Verified</button>
                                                    :
                                                    <button className='send-opttp' onClick={handleaadharverification}>Verify Aadhar</button>
                                                }
                                            </div>
                                        </>

                                    </div>
                                    <div
                                        className="col-lg-12"
                                        style={{ display: "block", margin: "auto" }}
                                    >
                                        {loading ? <button type="submit" className="login_btnup" disabled>
                                            Please wait...
                                        </button> :
                                            <button type="submit" className="login_btnup" onClick={registerUser}>
                                                {/* <button type="submit" className="login_btnup" onClick={() => Navigate("/Registerdetail")}> */}
                                                Register
                                            </button>
                                        }
                                    </div>
                                </form>
                                <span className="login_forgot">
                                    Already have an account?  <a onClick={() => Navigate("/Login")}>Login</a>
                                </span>
                            </div>
                        </div>
                    </div >
                </div >
            </div >

        </div >
    )
}

export default Register
