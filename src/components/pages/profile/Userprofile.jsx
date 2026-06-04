import React, { useState, useEffect } from 'react'
import { Badge, Button, Col, Container, Row } from 'react-bootstrap'
import profileimg from "../../../assets/profile.png"
import banner5 from "../../../assets/banner/banner6.jpg"
// import banner from "../assets/matrimonial/search.png"
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import PhoneInput, { formatPhoneNumber, formatPhoneNumberIntl, isValidPhoneNumber } from "react-phone-number-input";
import en from 'react-phone-number-input/locale/en';
import 'react-phone-number-input/style.css'
import profilebanner from "../../../assets/profilebanner.png"
import check from "../../../assets/check.png"
import glass from "../../../assets/glass.png"
import API_URL from '../../../../config';
import JobPortalNavbar from "../../JobPortal/components/JobPortalNavbar"
const Userprofile = () => {

    const Navigate = useNavigate();
    const token = localStorage.getItem('token');
    const [user, setUser] = useState({});

    const [ismatrimonyuser, setIsMatrimonyUser] = useState('');
    const [matrimonial_id, setMatrimonial_id] = useState('');
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [favouriteunreadCount, setFavouriteUnreadCount] = useState(0);
    const [matchunreadCount, setMatchUnreadCount] = useState(0);
    const [edit, setEdit] = useState(false);

    const [isbusinessuser, setIsBusinessUser] = useState('');
    const [business_id, setBusiness_id] = useState('');
    const [isprofessionuser, setIsProfessionUser] = useState('');
    const [profession_id, setProfession_id] = useState('');

    const [isstartupuser, setIsStartupUser] = useState('');
    const [startup_id, setStartupId] = useState('');
    const [isInvestoruser, setIsInvestorUser] = useState('');
    const [investor_id, setInvestorId] = useState('');

    const [isEducationStudentuser, setIsEducationStudentUser] = useState('');
    const [educationStudent_id, setEducationStudentId] = useState('');

    const [isEducationExpertuser, setIsEducationExpertUser] = useState('');
    const [educationExpert_id, setEducationExpertId] = useState('');

    const [isEndUser, setIsEndUser] = useState('');
    const [endUser_id, setEndUserId] = useState('');

    const [isHospitalUser, setIsHospitalUser] = useState('');
    const [hospital_id, setHospitalId] = useState('');

    const [isSeniorCitizenUser, setIsSeniorCitizenUser] = useState('');
    const [seniorCitizen_id, setSeniorCitizenId] = useState('');

    const [isNGOUser, setIsNGOUser] = useState('');
    const [ngo_id, setNGOId] = useState('');

    const [isMemberUser, setIsMemberUser] = useState('');
    const [member_id, setMemberId] = useState('');


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
    const [refrence_name_sant, setRefrence_name_sant] = useState('');
    const [refrence_name_haribhagat, setRefrence_name_haribhagat] = useState('');
    const [referencesantPhone, setReferenceSantPhone] = useState('');
    const [referenceharibhagatPhone, setReferenceHaribhagatPhone] = useState('');
    const [referencesantisPhoneValid, setReferenceSantIsPhoneValid] = useState(true);
    const [referenceharibhagatisPhoneValid, setReferenceHaribhagatIsPhoneValid] = useState('');
    const [referenceAddress, setReferenceAddress] = useState('');
    const [image, setImage] = useState([]);
    const [profileImage, setProfileImage] = useState([]);
    const [imageedit, setImageEdit] = useState(false);
    const [imagePreview, setImagePreview] = useState(profileimg);


    useEffect(() => {
        if (!localStorage.getItem('token')) {
            swal({
                title: "Your Session Has Expired",
                text: "Please log in again to continue.",
                icon: "warning",
            }).then(() => {
                window.location.href = '/login';
            });
        } else {
            getdetails();
            checkuser();
            checkbusinessuser();
            checkprofessionaluser();
            getConversationuser();
            checkStartupuser()
            checkInvestoruser()
            checkEducationStudentuser()
            checkEducationExpertuser()
            checkEndUser()
            checkHospitalUser()
            checkSeniorCitizenUser()
            checkNGOUser()
            checkMemberUser()

        }

    }, [])

    useEffect(() => {
        if (user != {}) {
            console.log("sansthaName", sansthaName);
            console.log("sansthaAddress", sansthaAddress);
            console.log("referenceAddress", referenceAddress);
            if (user.isMatrimonyVerified == false) {
                if (user.sanstha_name == '' || user.sanstha_location == '' || user.refrence_location == '' || user.refrence_name_sant == '' && user.refrence_name_haribhagat == '' || user.reference_phone_sant == '' && user.reference_phone_haribhagat == '') {
                    swal({
                        text: "Please Update Reference Details To Get Verified.",
                        icon: "warning",
                    })
                }
            }
        }
    }, [user])


    const getdetails = () => {
        try {

            const requestOptions = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            };
            fetch(`${API_URL}/api/userList`, requestOptions)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    setUser(data.data);
                    setUnreadCount(data?.data?.matrimony_interested_user?.filter(val => val.read === false).length);
                    setFavouriteUnreadCount(data?.data?.matrimony_favourite_users_list?.filter(val => val.read === false).length);
                    setFirstName(data.data.first_name);
                    setMiddleName(data.data.middle_name);
                    setLastName(data.data.last_name);
                    setGender(data.data.gender);
                    setEmail(data.data.email);
                    setPhone(data.data.phone);
                    setDob(data.data.date_of_birth);
                    setAddress(data.data.address);
                    setSansthaName(data.data.sanstha_name);
                    setSansthaAddress(data.data.sanstha_location);
                    setRefrence_name_sant(data.data.refrence_name_sant);
                    setRefrence_name_haribhagat(data.data.refrence_name_haribhagat);
                    setReferenceSantPhone(data.data.reference_phone_sant);
                    setReferenceHaribhagatPhone(data.data.reference_phone_haribhagat);
                    setReferenceAddress(data.data.refrence_location);
                    setImage(data?.data?.profile_image[0]);
                    setProfileImage(data?.data?.profile_image[0]);
                });

        } catch (error) {
            console.log(error);
        }
    }

    console.log(user);
    console.log(unreadCount);

    const checkuser = async () => {
        try {

            const requestOptions = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            };
            await fetch(`${API_URL}/api/checkMatrimonyUser`, requestOptions)
                .then(response => response.json())
                .then(data => {
                    console.log("data>?>>>>??????>>>>????", data);
                    if (data.status === 200) {
                        setIsMatrimonyUser(true);
                        setMatrimonial_id(data?.data[0]?._id);
                    }
                    else {
                        setIsMatrimonyUser(false);
                    }

                });

        } catch (error) {
            console.log(error);
        }
    }

    const checkbusinessuser = async () => {
        try {

            const requestOptions = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            };
            await fetch(`${API_URL}/api/checkbusinessuser`, requestOptions)
                .then(response => response.json())
                .then(data => {
                    console.log("data>?>>>>??????>>>>????", data);
                    if (data.status === 200) {
                        setIsBusinessUser(true);
                        setBusiness_id(data?.data[0]?._id);
                    }
                    else {
                        setIsBusinessUser(false);
                    }

                });

        } catch (error) {
            console.log(error);
        }
    }

    console.log("isbusinessuser", isbusinessuser)

    const checkprofessionaluser = async () => {
        try {

            const requestOptions = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            };
            await fetch(`${API_URL}/api/checkprofessionuser`, requestOptions)
                .then(response => response.json())
                .then(data => {
                    console.log("data>?>>>>??????>>>>????", data);
                    if (data.status === 200) {
                        setIsProfessionUser(true);
                        setProfession_id(data?.data[0]?._id);
                    }
                    else {
                        setIsProfessionUser(false);
                    }

                });

        } catch (error) {
            console.log(error);
        }
    }

    const checkStartupuser = async () => {
        try {

            const requestOptions = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            };
            await fetch(`${API_URL}/api/checkstartupuser`, requestOptions)
                .then(response => response.json())
                .then(data => {
                    console.log("data>?>>>>??????>>>>????", data);
                    if (data.status === 200) {
                        setIsStartupUser(true);
                        setStartupId(data?.data[0]?._id);
                    }
                    else {
                        setIsStartupUser(false);
                    }

                });

        } catch (error) {
            console.log(error);
        }
    }

    console.log(isstartupuser);

    const checkInvestoruser = async () => {
        try {

            const requestOptions = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            };
            await fetch(`${API_URL}/api/checkinvestoruser`, requestOptions)
                .then(response => response.json())
                .then(data => {
                    console.log("data>?>>>>??????>>>>????", data);
                    if (data.status === 200) {
                        setIsInvestorUser(true);
                        setInvestorId(data?.data[0]?._id);
                    }
                    else {
                        setIsInvestorUser(false);
                    }

                });

        } catch (error) {
            console.log(error);
        }
    }

    const checkEducationStudentuser = async () => {
        try {
            const requestOptions = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            };
            await fetch(`${API_URL}/api/checkEducationStudentuser`, requestOptions)
                .then(response => response.json())
                .then(data => {
                    console.log("data>?>>>>??????>>>>????", data);
                    if (data.status === 200) {
                        setIsEducationStudentUser(true);
                        setEducationStudentId(data?.data[0]?._id);
                    }
                    else {
                        setIsEducationStudentUser(false);
                    }

                });

        } catch (error) {
            console.log(error);
        }
    }

    const checkEducationExpertuser = async () => {
        try {
            const requestOptions = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            };
            await fetch(`${API_URL}/api/checkEducationExpertuser`, requestOptions)
                .then(response => response.json())
                .then(data => {
                    console.log("data>?>>>>??????>>>>????", data);
                    if (data.status === 200) {
                        setIsEducationExpertUser(true);
                        setEducationExpertId(data?.data[0]?._id);
                    }
                    else {
                        setIsEducationExpertUser(false);
                    }

                });

        } catch (error) {
            console.log(error);
        }
    }

    const checkEndUser = async () => {
        try {
            const requestOptions = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            };
            await fetch(`${API_URL}/api/checkEndUser`, requestOptions)
                .then(response => response.json())
                .then(data => {
                    console.log("data>?>>>>??????>>>>????", data);
                    if (data.status === 200) {
                        setIsEndUser(true);
                        setEndUserId(data?.data[0]?._id);
                    }
                    else {
                        setIsEndUser(false);
                    }
                });
        } catch (error) {
            console.log(error);
        }
    }

    const checkHospitalUser = async () => {
        try {
            const requestOptions = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            };
            await fetch(`${API_URL}/api/checkHospitalUser`, requestOptions)
                .then(response => response.json())
                .then(data => {
                    console.log("data>?>>>>??????>>>>????", data);
                    if (data.status === 200) {
                        setIsHospitalUser(true);
                        setHospitalId(data?.data[0]?._id);
                    }
                    else {
                        setIsHospitalUser(false);
                    }
                });
        } catch (error) {
            console.log(error);
        }
    }

    const checkSeniorCitizenUser = async () => {
        try {
            const requestOptions = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            };
            await fetch(`${API_URL}/api/checkSeniorCitizenuser`, requestOptions)
                .then(response => response.json())
                .then(data => {
                    console.log("data>?>>>>??????>>>>????", data);
                    if (data.status === 200) {
                        setIsSeniorCitizenUser(true);
                        setSeniorCitizenId(data?.data[0]?._id);
                    }
                    else {
                        setIsSeniorCitizenUser(false);
                    }
                });
        } catch (error) {
            console.log(error);
        }
    }

    const checkNGOUser = async () => {
        try {
            const requestOptions = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            };
            await fetch(`${API_URL}/api/checkSeniorCitizenNGOUser`, requestOptions)
                .then(response => response.json())
                .then(data => {
                    console.log("data>?>>>>??????>>>>????", data);
                    if (data.status === 200) {
                        setIsNGOUser(true);
                        setNGOId(data?.data[0]?._id);
                    }
                    else {
                        setIsNGOUser(false);
                    }
                });
        } catch (error) {
            console.log(error);
        }
    }

    const checkMemberUser = async () => {
        try {
            const requestOptions = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            };
            await fetch(`${API_URL}/api/checkMemberuser`, requestOptions)
                .then(response => response.json())
                .then(data => {
                    console.log("data>?>>>>??????>>>>????", data);
                    if (data.status === 200) {
                        setIsMemberUser(true);
                        setMemberId(data?.data[0]?._id);
                    }
                    else {
                        setIsMemberUser(false);
                    }
                });
        } catch (error) {
            console.log(error);
        }
    }



    console.log(isInvestoruser);

    const handleNotification = () => {
        try {
            const requestOptions = {
                method: 'Put',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            };
            fetch(`${API_URL}/api/handlematriomonyrequestmarkasread`, requestOptions)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    // setNotifications(data.data);
                });
            Navigate(`/MatrimonyRequest`)
        }
        catch (error) {
            console.log(error);
        }
    }

    const handlefavouriteNotification = () => {
        try {
            const requestOptions = {
                method: 'Put',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            };
            fetch(`${API_URL}/api/handlefavouriterequestmarkasread`, requestOptions)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    // setNotifications(data.data);
                });
            Navigate(`/ViewFavoriterequestprofiles`)
        }
        catch (error) {
            console.log(error);
        }
    }

    const handlematchedNotification = () => {
        try {
            const requestOptions = {
                method: 'Put',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            };
            fetch(`${API_URL}/api/handlematchrequestmarkasread`, requestOptions)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    // setNotifications(data.data);
                });
            Navigate(`/Matchedprofile`)
        }
        catch (error) {
            console.log(error);
        }
    }

    console.log("edit", edit);

    const allowOnlyNumbers = (e) => {
        e.preventDefault();
        const input = e.target;
        const value = input.value.replace(/[^\d]/g, ''); // Replace any non-numeric characters with an empty string
        input.value = value; // Set the input value to the filtered value
    }

    const handleupdate = () => {
        try {
            const data = {
                gender: gender,
                phone: phone,
                date_of_birth: dob,
                address: address,
                sanstha_name: sansthaName,
                sanstha_location: sansthaAddress,
                refrence_name_sant: refrence_name_sant,
                refrence_name_haribhagat: refrence_name_haribhagat,
                reference_phone_sant: referencesantPhone,
                reference_phone_haribhagat: referenceharibhagatPhone,
                refrence_location: referenceAddress
            }
            const requestOptions = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(data)
            };
            fetch(`${API_URL}/api/updateprofile`, requestOptions)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    if (data.status === 200) {
                        swal({
                            text: "Profile Updated Successfully",
                            icon: "success",
                        })
                        setEdit(false);
                        getdetails();
                    }

                });
        } catch (error) {
            console.log(error);
        }
    }

    const formatDate = (date) => {
        const d = new Date(date);
        let month = '' + (d.getMonth() + 1);
        let day = '' + d.getDate();
        const year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [day, month, year].join('-');
    };

    const formatdob = (date) => {
        const d = new Date(date);
        let month = '' + (d.getMonth() + 1);
        let day = '' + d.getDate();
        const year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [year, month, day].join('-');
    };

    console.log("dob", dob);

    const handlePhoneChange = (value) => {
        setPhone(value);
        if (value === '' || value === undefined) {
            setIsPhoneValid(true);
        } else {
            setIsPhoneValid(isValidPhoneNumber(value));
        }
    };


    const handleReferenceSantPhoneChange = (value) => {
        setReferenceSantPhone(value || '');
        if (value === '' || value === undefined) {
            setReferenceSantIsPhoneValid(true);
        } else {
            setReferenceSantIsPhoneValid(isValidPhoneNumber(value));
        }
    };

    const handleReferenceHaribhagatPhoneChange = (value) => {
        console.log("value", value);
        setReferenceHaribhagatPhone(value || '');
        if (value === '' || value === undefined) {
            setReferenceHaribhagatIsPhoneValid(true);
        } else {
            setReferenceHaribhagatIsPhoneValid(isValidPhoneNumber(value));
        }
    };


    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageEdit(true);
            setProfileImage(file);
            const reader = new FileReader();
            reader.onloadend = () => setImagePreview(reader.result);
            reader.readAsDataURL(file);
        }
        try {
            const formData = new FormData();
            formData.append('profile', file);
            const response = await fetch(`${API_URL}/api/updateprofilepic`, {
                method: 'PUT',
                headers: { 'Authorization': `Bearer ${token}` },
                body: formData
            });
            const data = await response.json();
            if (data.status === 200) {
                swal({ text: "Profile Image Updated Successfully", icon: "success" });
                setImageEdit(false);
                getdetails();

            }
        }
        catch (error) {
            console.error(error);
        }


    };


    const RemoveProfileImage = async () => {
        try {
            const response = await fetch(`${API_URL}/api/removeprofilepic`, {
                method: 'PUT',
                headers: { 'Authorization': `Bearer ${token}` },
            });
            const data = await response.json();
            if (data.status === 200) {
                swal({ text: "Profile Image Updated Successfully", icon: "success" });
                setImageEdit(false);
                setImagePreview(profileimg)
                getdetails();
                // window.location.href = '/Profile'

            }
        } catch (error) {
            console.error(error);
        }
    };

    const getConversationuser = () => {
        try {
            const requestOptions = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            };

            fetch(`${API_URL}/api/getConversation`, requestOptions)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                });
        }
        catch (error) {
            console.log(error);
        }
    }



    return (
        <div className='usersforporifile'>
            <Container fluid className='profilebannerrr' style={{ padding: '0px' }}>
                <div className="image-container mb-0">
                    {/* <img src="https://d2n9ha3hrkss16.cloudfront.net/uploads/stage/stage_image/23693/optimized_product_thumb_stage.jpg" className="w-100" alt="" /> */}
                    <img className="userporifleasse" src={profilebanner} alt="" />
                </div>
            </Container>
            <Container>
                <Col lg={12}>
                    <div className='userprofilesec'>
                        <Col lg={12} >
                            {/* <img src={profileimg} alt="" /> */}
                            <Col lg={4}>
                                <div className='profileimgc'>

                                    <img src={!profileImage?.filename ? imagePreview : `${API_URL}/uploads/user_profile/${profileImage?.filename}`} alt="Profile" />

                                    {/* <div className='image edit' onClick={() => document.getElementById('uploadInput').click()}>
                                        <i className='fa fa-edit'></i>
                                    </div>
                                    <input
                                        id="uploadInput"
                                        type="file"
                                        accept="image/*"
                                        style={{ display: 'none' }}
                                        onChange={handleImageChange}
                                    /> */}
                                </div>
                            </Col>

                            <>
                                <button className='addbtn' onClick={() => document.getElementById('uploadInput').click()}>Change Profile Picture
                                    <input
                                        id="uploadInput"
                                        type="file"
                                        accept="image/*"
                                        style={{ display: 'none' }}
                                        onChange={handleImageChange}
                                    />
                                </button>
                                {image == undefined ?
                                    null
                                    :
                                    <button className='addbtn' onClick={() => { if (window.confirm('Are you sure you wish to remove your profile picture?')) RemoveProfileImage() }}>Remove</button>
                                }
                            </>

                            <h2>{`${user.first_name} ${user.middle_name} ${user.last_name}`}
                                {/* <img className='verified' width={"20px"} src="https://p1.hiclipart.com/preview/989/847/759/facebook-icons-verified-badge-symbol-account-verification-blue-turquoise-azure-electric-blue-png-clipart-thumbnail.jpg" alt="" /> */}
                            </h2>
                            <h6>Member ID: {user.member_id}</h6>
                            <h6>Profile Status: {user.isMatrimonyVerified == true ? <span style={{ color: 'green' }}>Verified <img src={check} height={17} /></span> : <span style={{ color: 'red' }}>Under Verification <img src={glass} height={17} /></span>}</h6>


                        </Col>
                    </div>
                </Col>
                <Col lg={12}>
                    <div className='basicsinformass'>
                        <h2>Basic Information <i className="fa fa-edit" style={{ cursor: 'pointer' }} onClick={() => edit == false ? setEdit(true) : setEdit(false)}></i></h2>
                        {edit == false ?
                            <div>
                                <Row>
                                    <Col lg={3}>
                                        <h5>Gender</h5>
                                        <p>{user.gender}</p>
                                    </Col>
                                    <Col lg={3}>
                                        <h5>Email</h5>
                                        <p>{user.email}</p>
                                    </Col>
                                    <Col lg={3}>
                                        <h5>Mobile Number</h5>
                                        <p>{user.phone}</p>
                                    </Col>
                                    <Col lg={3}>
                                        <h5>Date Of Birth</h5>
                                        <p>{formatDate(user.date_of_birth)}</p>
                                    </Col>
                                    <Col lg={3}>
                                        <h5>Address</h5>
                                        <p>{user.address}</p>
                                    </Col>
                                    <Col lg={3}>
                                        <h5>Sanstha name</h5>
                                        <p>{user.sanstha_name}</p>
                                    </Col>
                                    <Col lg={3}>
                                        <h5>Sanstha Address</h5>
                                        <p>{user.sanstha_location}</p>
                                    </Col>
                                    <Col lg={3}>
                                        <h5>Reference Name (Sant)</h5>
                                        <p>{user.refrence_name_sant}</p>
                                    </Col>
                                    <Col lg={3}>
                                        <h5>Reference Mobile Number (Sant)</h5>
                                        <p>{user.reference_phone_sant}</p>
                                    </Col>
                                    <Col lg={3}>
                                        <h5>Reference Name (Haribhagat)</h5>
                                        <p>{user.refrence_name_haribhagat}</p>
                                    </Col>
                                    <Col lg={3}>
                                        <h5>Reference Mobile Number (Haribhagat)</h5>
                                        <p>{user.reference_phone_haribhagat}</p>
                                    </Col>
                                    <Col lg={3}>
                                        <h5>Reference Address</h5>
                                        <p> {user.refrence_location}</p>
                                    </Col>

                                </Row>
                            </div>
                            :
                            <div>
                                <Row>
                                    <Col lg={3}>
                                        <h5>Gender</h5>
                                        <p>
                                            <select className="form-control" aria-label="Default select example" onChange={(e) => setGender(e.target.value)} defaultValue={gender}>
                                                <option selected hidden>Select Gender</option>
                                                <option value="Male" >Male</option>
                                                <option value="Female" >Female</option>
                                                <option value="Others" >Others</option>
                                            </select>
                                        </p>
                                    </Col>
                                    <Col lg={3}>
                                        <h5>Email</h5>
                                        <p>
                                            <input
                                                name="email"
                                                placeholder="Email Id"
                                                aria-label="Email ID"
                                                type="text"
                                                className="form-control"
                                                defaultValue={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                readOnly={true}
                                                disabled
                                            />
                                        </p>
                                    </Col>
                                    <Col lg={3}>
                                        <h5>Mobile Number</h5>
                                        <p>
                                            {/* <input
                                                required
                                                name="Phone Number"
                                                placeholder="Mobile Number"
                                                aria-label="Phone Number"
                                                type="text"
                                                className="form-control"
                                                defaultValue={phone}
                                                onChange={(e) => setPhone(e.target.value)}
                                                min={0}
                                                maxLength={12}
                                                onInput={allowOnlyNumbers}
                                            /> */}
                                            <PhoneInput
                                                className={`form-control ${!isPhoneValid ? 'is-invalid' : ''}`}
                                                defaultCountry="IN"
                                                international
                                                countryCallingCodeEditable={false}
                                                localization={en}
                                                placeholder="Mobile Number"
                                                value={phone}
                                                onChange={handlePhoneChange}
                                            />
                                        </p>
                                    </Col>
                                    <Col lg={3}>
                                        <h5>Date Of Birth</h5>
                                        <p>
                                            <input
                                                required
                                                name="Date Of Birth"
                                                placeholder="Date Of Birth"
                                                aria-label="Date Of Birth"
                                                type="date"
                                                defaultValue={formatdob(dob)}
                                                className="form-control"
                                                onChange={(e) => setDob(e.target.value)}
                                            />
                                        </p>
                                    </Col>
                                    <Col lg={3}>
                                        <h5>Address</h5>
                                        <p> <input
                                            required
                                            name="Address"
                                            placeholder="Enter Address"
                                            aria-label="Eddress"
                                            type="text"
                                            className="form-control"
                                            defaultValue={address}
                                            onChange={(e) => setAddress(e.target.value)}
                                        /></p>
                                    </Col>
                                    <Col lg={3}>
                                        <h5>Sanstha name</h5>
                                        <p> <input
                                            required
                                            name="Sanstha"
                                            placeholder="Sanstha name you belong to"
                                            aria-label="Sanstha"
                                            type="text"
                                            className="form-control"
                                            defaultValue={sansthaName}
                                            onChange={(e) => setSansthaName(e.target.value)}
                                        /></p>
                                    </Col>
                                    <Col lg={3}>
                                        <h5>Sanstha Address</h5>
                                        <p> <input
                                            required
                                            name="sanstha Address"
                                            placeholder="Sanstha Address"
                                            aria-label="sanstha Address"
                                            type="text"
                                            className="form-control"
                                            defaultValue={sansthaAddress}
                                            onChange={(e) => setSansthaAddress(e.target.value)}
                                        /></p>
                                    </Col>
                                    <Col lg={3}>
                                        <h5>Reference Name (Sant)</h5>
                                        <p> <input
                                            required
                                            name="Reference Name"
                                            placeholder="Reference Name (Sant & Haribhagat )"
                                            aria-label="Reference Name"
                                            type="text"
                                            className="form-control"
                                            defaultValue={refrence_name_sant}
                                            onChange={(e) => setRefrence_name_sant(e.target.value)}
                                        /></p>
                                    </Col>
                                    <Col lg={3}>
                                        <h5>Reference Mobile Number (Sant)</h5>
                                        <p>
                                            <PhoneInput
                                                className={`form-control ${!referencesantisPhoneValid ? 'is-invalid' : ''}`}
                                                defaultCountry="IN"
                                                international
                                                countryCallingCodeEditable={false}
                                                localization={en}
                                                placeholder="Mobile Number"
                                                value={referencesantPhone}
                                                onChange={handleReferenceSantPhoneChange}

                                            />
                                        </p>
                                    </Col>
                                    <Col lg={3}>
                                        <h5>Reference Name (Haribhagat)</h5>
                                        <p> <input
                                            required
                                            name="Reference Name"
                                            placeholder="Reference Name (Sant & Haribhagat )"
                                            aria-label="Reference Name"
                                            type="text"
                                            className="form-control"
                                            defaultValue={refrence_name_haribhagat}
                                            onChange={(e) => setRefrence_name_haribhagat(e.target.value)}
                                        /></p>
                                    </Col>
                                    <Col lg={3}>
                                        <h5>Reference Mobile Number (Haribhagat)</h5>
                                        <p>
                                            <PhoneInput
                                                className={`form-control ${!referenceharibhagatisPhoneValid ? 'is-invalid' : ''}`}
                                                defaultCountry="IN"
                                                international
                                                countryCallingCodeEditable={false}
                                                localization={en}
                                                placeholder="Mobile Number"
                                                value={referenceharibhagatPhone}
                                                onChange={handleReferenceHaribhagatPhoneChange}

                                            />
                                        </p>
                                    </Col>
                                    <Col lg={3}>
                                        <h5>Reference Address</h5>
                                        <p><input
                                            required
                                            name="Reference Address"
                                            placeholder="Reference Address"
                                            aria-label="Reference Address"
                                            type="text"
                                            className="form-control"
                                            defaultValue={referenceAddress}
                                            onChange={(e) => setReferenceAddress(e.target.value)}
                                        /></p>
                                    </Col>

                                </Row>
                                <Row>
                                    <Col lg={6}>
                                        <Button className='addbtn' onClick={handleupdate}>Submit</Button>
                                    </Col>
                                </Row>
                            </div>
                        }
                    </div>
                </Col>
                {/* <Col lg={12}>
                    <div className='matrinformass'>
                        <h2>Membership</h2>
                        <Button className='addbtn' onClick={() => Navigate('/Plandetails')}>plan details </Button>

                        </div>
                </Col>  */}
                <Col lg={12}>
                    <div className='matrinformass'>
                        <h2>Matrimonial Information</h2>

                        {ismatrimonyuser === false ?
                            <Button className='addbtn' onClick={() => Navigate('/Matrimonialform')}>Add Matrimony data </Button>

                            :
                            <>

                                <Row className='userrr-proiffiilee'>
                                    <div className='col-lg-3'>
                                        <Button className='addbtn' onClick={() => Navigate(`/MyMatrimonyprofile?id=${matrimonial_id}`)}>Your Profile</Button>
                                    </div>
                                    <div className='col-lg-3'>
                                        <Button className='addbtn' onClick={() => Navigate(`/MatrimonyShortlisted`)}>Your Shortlisted Profile</Button>
                                    </div>
                                    <div className='col-lg-3'>
                                        <Button className='addbtn' onClick={() => Navigate(`/MatrimonyInterested`)}>Your Liked Profile</Button>
                                    </div>
                                    <div className='col-lg-3'>
                                        <Button className='addbtn' onClick={handlefavouriteNotification} style={{ position: 'relative' }}>Your Favourited Profiles {favouriteunreadCount > 0 ? <Badge bg="danger" style={{ position: 'absolute', top: '-18px', right: '11px', fontSize: 'medium', borderRadius: 'inherit' }}>{favouriteunreadCount}</Badge> : ''}</Button>
                                    </div>
                                </Row>
                                <Row className='userrr-proiffiilee'>
                                    <div className='col-lg-4'>
                                        <Button className='reqbtn' onClick={handleNotification} style={{ position: 'relative' }}>You Got Interested {unreadCount > 0 ? <Badge bg="danger" style={{ position: 'absolute', top: '-18px', right: '11px', fontSize: 'medium', borderRadius: 'inherit' }}>{unreadCount}</Badge> : ''}</Button>
                                    </div>
                                    <div className='col-lg-4'>
                                        <Button className='addbtn' onClick={handlematchedNotification} style={{ position: 'relative' }}>Matched Profiles {matchunreadCount > 0 ? <Badge bg="danger" style={{ position: 'absolute', top: '-18px', right: '11px', fontSize: 'medium', borderRadius: 'inherit' }}>{matchunreadCount}</Badge> : ''}</Button>
                                    </div>
                                    <div className='col-lg-4'>
                                        <Button className='reqbtn' onClick={() => Navigate(`/ViewFavouriteProfile`)}>You Got Favourite</Button>
                                    </div>
                                </Row>
                            </>
                        }

                    </div>
                </Col>
                <Col lg={12}>
                    <JobPortalNavbar />
                </Col>
                {/* <Col lg={12}>
                    <div className='matrinformass'>
                        <h2>Matrimonial Information</h2>
                        <Button className='addbtn' onClick={() => Navigate(`/AllChatApplication`)}>Chat</Button>
                        </div>
                </Col> */}
                <Col lg={12}>
                    <div className='matrinformass'>
                        <h2>Networking Information</h2>

                        <h5>Business Networking Information</h5>

                        {isbusinessuser === false ?
                        <Button className='addbtn' onClick={() => Navigate('/Businessform')}>Add Business Networking data </Button>
                            :

                        <>
                            <Button className='addbtn' onClick={() => Navigate(`/Businessdetails?id=${business_id}`)}>Your Business Networking details </Button>

                        </>
                }

                        <h5>Professional Networking Information</h5>
                        {isprofessionuser === false ?

                        <Button className='addbtn' onClick={() => Navigate('/Professionalform')}>Add Professional Networking data </Button>
                            :
                        <>
                            <Button className='addbtn' onClick={() => Navigate(`/Professiondetails?id=${profession_id}`)}>Your Professional Networking details </Button>
                        </>
                        }
                    </div>
                </Col>
                <Col lg={12}>
                    <div className='matrinformass'>
                        <h2>StartUp Information</h2>

                        <h5>StartUp Information</h5>
                        {isstartupuser === false ?

                        <Button className='addbtn' onClick={() => Navigate('/Startupform')}>Add StartUp data </Button>
                            :
                        <Button className='addbtn' onClick={() => Navigate(`/Startupprofile?id=${startup_id}`)}>View StartUp data </Button>

                        }


                        <h5>Investor Information</h5>
                        {isInvestoruser === false ?

                        <Button className='addbtn' onClick={() => Navigate('/Investorform')}>Add Investor data </Button>
                            :
                        <Button className='addbtn' onClick={() => Navigate(`/Investorprofile?id=${investor_id}`)}>View Investor data </Button>

                        }
                    </div>
                </Col>

                <Col lg={12}>
                    <div className='matrinformass'>
                        <h2>Education Support</h2>

                        <h5>Student Information</h5>
                        {isEducationStudentuser === false ?

                        <Button className='addbtn' onClick={() => Navigate('/EducationStudentForm')}>Add Student data </Button>
                            :
                        <Button className='addbtn' onClick={() => Navigate(`/EducationStudentProfile?id=${educationStudent_id}`)}>View Student data </Button>
                       
                       }

                        <h5>Expert Information</h5>
                        {isEducationExpertuser === false ?
                        <Button className='addbtn' onClick={() => Navigate('/EducationExpertform')}>Add Expert/Consultant data </Button>
                            :
                            <>
                        <Button className='addbtn' onClick={() => Navigate(`/EducationExpertprofile?id=${educationExpert_id}`)}>View Expert/Consultant data </Button>

                        <Button className='addbtn' onClick={() => Navigate(`/EducationalExpertStudentView?id=${educationExpert_id}`)}>View Students List </Button>
                            </>
                        }
                    </div>
                </Col>

                <Col lg={12}>
                    <div className='matrinformass'>
                        <h2>Medical Support</h2>

                        <h5>End User Information</h5>
                        {isEndUser === false ?

                        <Button className='addbtn' onClick={() => Navigate('/MedicalEndUserform')}>Add End User data </Button>
                            :
                        <Button className='addbtn' onClick={() => Navigate(`/MedicalEnduserProfile?id=${endUser_id}`)}>View End User data </Button>

                        }


                        <h5>Hospital Information</h5>
                        {isHospitalUser === false ?
                        <Button className='addbtn' onClick={() => Navigate('/MedicalHospitalForm')}>Add Hospital data </Button>
                            
                            :

                        <Button className='addbtn' onClick={() => Navigate(`/MedicalHospitalProfile?id=${hospital_id}`)}>View Hospital data </Button>
                        }

                        {isHospitalUser === true ?
                        <>
                        <h5>Hospital Services Information</h5>
                        <Button className='addbtn' onClick={() => Navigate('/MedicalHospitalServicesForm')}>Add Hospital Services data </Button>
                        <Button className='addbtn' onClick={() => Navigate(`/MedicalHospitalServicesList?id=${hospital_id}`)}>View Hospital Services data </Button>
                        </>
                        :
                        null
                        }
                            
                    </div>
                </Col>

                <Col lg={12}>
                    <div className='matrinformass'>
                        <h2>Senior Citizen Support</h2>

                        <h5>Senior Citizen Information</h5>
                        {isSeniorCitizenUser === false ?
                        <Button className='addbtn' onClick={() => Navigate('/SeniorCitizenForm')}>Add Senior Citizen data </Button>
                            :
                        <Button className='addbtn' onClick={() => Navigate(`/SeniorCitizenProfile?id=${seniorCitizen_id}`)}>View Senior Citizen data </Button>
                        }

                        <h5>NGO Information</h5>
                        {isNGOUser === false ?

                        <Button className='addbtn' onClick={() => Navigate('/SeniorNGOForm')}>Add NGO data </Button>
                            :
                        <Button className='addbtn' onClick={() => Navigate(`/SeniorcitizenNGOProfile?id=${ngo_id}`)}>View NGO data </Button>
                        }

                        {isNGOUser === true ?
                            <>
                        <h5>NGO Services Information</h5>

                        <Button className='addbtn' onClick={() => Navigate('/SeniorcitizenNGOServicesForm')}>Add NGO Services data </Button>

                        <Button className='addbtn' onClick={() => Navigate(`/SeniorcitizenNGOServicesList?id=${ngo_id}`)}>View NGO Services data </Button>
                        </>
                        :
                        null
                        }

                    </div>
                </Col>

                <Col lg={12}>
                    <div className='matrinformass'>
                        <h2>Members</h2>

                        <h5>Member Information</h5>
                        {isMemberUser === false ?
                        <Button className='addbtn' onClick={() => Navigate('/Becamemember')}>Add Member data </Button>
                            :
                        <Button className='addbtn' onClick={() => Navigate(`/MemberProfile?id=${member_id}`)}>View Member data </Button>
                        }

                    </div>
                </Col>

            </Container>
        </div>
    )
}

export default Userprofile
