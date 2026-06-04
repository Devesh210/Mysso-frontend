import React, { useState, useEffect, useRef } from 'react'
import { Col, Container, Form, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';

import profile from "../../../assets/profile.png"
import swal from 'sweetalert';
import PhoneInput, { formatPhoneNumber, formatPhoneNumberIntl, isValidPhoneNumber } from "react-phone-number-input";
import en from 'react-phone-number-input/locale/en';
import 'react-phone-number-input/style.css'
import API_URL from '../../../../config';


const Matrimonialform = () => {
    const Navigate = useNavigate();

    const [userdata, setUserdata] = useState([]);

    const [maritalStatusList, setMaritalStatusList] = useState([]);
    const [NationalityList, setNationalityList] = useState([]);
    const [MotherTongueList, setMotherTongueList] = useState([]);
    const [LanguageList, setLanguageList] = useState([]);
    const [casteList, setCasteList] = useState([]);
    const [subCasteList, setSubCasteList] = useState([]);
    const [stateList, setStateList] = useState([]);
    const [cityList, setCityList] = useState([]);
    const [permanentStateList, setPermanentStateList] = useState([]);
    const [permanentCityList, setPermanentCityList] = useState([]);
    const [genderList, setGenderList] = useState([]);

    //personal information
    const [whoAmI, setWhoAmI] = useState('');
    const [first_name, setFirst_name] = useState('');
    const [last_name, setLast_name] = useState('');
    const [gender, setGender] = useState('');
    const [dob, setDob] = useState('');
    const [age, setAge] = useState('');
    const [marital_status, setMarital_status] = useState('');
    const [nationality, setNationality] = useState('');
    const [mother_tongue, setMother_tongue] = useState('');
    const [language_known, setLanguage_known] = useState('');

    const [cast_id, setCast_id] = useState('');
    const [sub_caste, setSub_caste] = useState('');
    const [gotra, setGotra] = useState('');
    const [height, setHeight] = useState('');
    const [heightFeet, setHeightFeet] = useState({ feet: "0", inches: "0" });
    const [weight, setWeight] = useState('');
    const [info_about_me, setInfo_about_me] = useState('');
    const [hobbies, setHobbies] = useState('');
    const [phone_number, setPhone_number] = useState('');
    const [isPhoneValid, setIsPhoneValid] = useState(true);
    const [WhatsApp_number, setWhatsApp_number] = useState('');
    const [facebook_link, setFacebook_link] = useState('');
    const [instagram_link, setInstagram_link] = useState('');
    const [linkedin_link, setLinkedin_link] = useState('');
    const [handicap, setHandicap] = useState(false);
    const [handicapdetails, setHandicapdetails] = useState('');
    //present address
    const [country_id, setCountry_id] = useState('');
    const [state_id, setState_id] = useState('');
    const [city_id, setCity_id] = useState('');
    //permanent address
    const [permanent_country_id, setPermanent_country_id] = useState('');
    const [permanent_state_id, setPermanent_state_id] = useState('');
    const [permanent_city_id, setPermanent_city_id] = useState('');

    //education information
    const [educationEntries, setEducationEntries] = useState([{ degree: '', institution: '', year_of_passing: '' }]);
    //career information
    const [careers, setCareers] = useState([{ occupation: '', company: '', income: '' }]);

    //family information
    const [fatherName, setFatherName] = useState('');
    const [fatherOccupation, setFatherOccupation] = useState('');
    const [fatherEducation, setFatherEducation] = useState('');
    const [motherName, setMotherName] = useState('');
    const [motherOccupation, setMotherOccupation] = useState('');
    const [motherEducation, setMotherEducation] = useState('');

    //sibling information
    const [siblings, setSiblings] = useState([{ siblingName: '', siblingMaritalStatus: '', siblingEducation: '' }]);
    //profile image
    const [image, setImage] = useState(profile);
    const [profile_pic, setProfile_pic] = useState([]);

    //astrological information
    const [timeOfBirth, setTimeOfBirth] = useState('');
    const [cityOfBirth, setCityOfBirth] = useState('');
    const [mangalDosh, setMangalDosh] = useState('');
    const [shanidosh, setShanidosh] = useState('');

    //life style
    const [fitnessFreak, setFitnessFreak] = useState('');
    const [moreResponsibilities, setMoreResponsibilities] = useState('');
    const [likeCooking, setLikeCooking] = useState('');
    const [likeTraveling, setLikeTraveling] = useState('');
    const [partnerWorking, setPartnerWorking] = useState('');
    const [spirituallyStrong, setSpirituallyStrong] = useState('');

    //satsang information
    const [nityaPoojaDaily, setNityaPoojaDaily] = useState('');
    const [sansthaName, setSansthaName] = useState('');
    const [mandalName, setMandalName] = useState('');
    const [sampradayaFast, setSampradayaFast] = useState('');
    const [templeVisit, setTempleVisit] = useState('');
    const [eatOnionGarlic, setEatOnionGarlic] = useState('');
    const [aarti, setAarti] = useState('');
    const [wearKanthi, setWearKanthi] = useState('');
    const [volunteerActivities, setVolunteerActivities] = useState('');
    const [define, setDefine] = useState('');
    const [tilakChandlo, setTilakChandlo] = useState('');
    const [shibir, setShibir] = useState('');
    const [photos, setPhotos] = useState([]);
    const [previewPhotos, setPreviewPhotos] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getMaritalstatus();
        getNationality();
        getMothertongue();
        getLanguage();
        getCaste();
        getSubCaste();
        getState();
        getCity();
        usergender();
        getUserData();
    }, []);

    useEffect(() => {
        getState();
    }, [country_id]);

    useEffect(() => {
        getCity();
    }, [state_id]);

    useEffect(() => {
        getPermanentState();
    }, [permanent_country_id]);

    useEffect(() => {
        getPermanentCity();
    }, [permanent_state_id]);

    useEffect(() => {
        getSubCaste();
    }, [cast_id]);


    const handlepresentCountryChange = (e) => {
        setCountry_id(e.target.value);
        setState_id('');
        setCity_id('');
    }

    const handlepresentStateChange = (e) => {
        setState_id(e.target.value);
        setCity_id('');
    }

    const handlepermamentCountryChange = (e) => {
        setPermanent_country_id(e.target.value);
        setPermanent_state_id('');
        setPermanent_city_id('');
    }

    const handlepermamentStateChange = (e) => {
        setPermanent_state_id(e.target.value);
        setPermanent_city_id('');
    }


    const handleEducationChange = (index, field, value) => {
        const newEducationEntries = educationEntries.map((educationEntries, i) =>
            i === index ? { ...educationEntries, [field]: value } : educationEntries

        );
        setEducationEntries(newEducationEntries);
    };

    const addEducationEntry = () => {
        setEducationEntries([...educationEntries, { degree: '', institution: '', year_of_passing: '' }]);
    };

    const removeEducationEntry = (index) => {
        const newEducationEntries = educationEntries.filter((_, i) => i !== index);
        setEducationEntries(newEducationEntries);
    };






    const handleCareerChange = (index, field, value) => {
        const newCareers = careers.map((career, i) =>
            i === index ? { ...career, [field]: value } : career
        );
        setCareers(newCareers);
    };

    const addCareer = () => {
        setCareers([...careers, { occupation: '', company: '', income: '' }]);
    };

    const removeCareer = (index) => {
        const newCareers = careers.filter((_, i) => i !== index);
        setCareers(newCareers);
    };

    const handleSiblingChange = (index, field, value) => {
        const newSiblings = siblings.map((sibling, i) =>
            i === index ? { ...sibling, [field]: value } : sibling
        );
        setSiblings(newSiblings);
    };

    const addSibling = () => {
        setSiblings([...siblings, { siblingName: '', siblingMaritalStatus: '', siblingEducation: '' }]);
    };

    const removeSibling = (index) => {
        const newSiblings = siblings.filter((_, i) => i !== index);
        setSiblings(newSiblings);
    };

    const getMaritalstatus = async () => {
        try {
            const requestoptions = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            };
            await fetch(`${API_URL}/api/maritalStatusList`, requestoptions)
                .then(response => response.json())
                .then(data => {
                    console.log(data.data);
                    setMaritalStatusList(data.data);
                })
        } catch (err) {
            console.error(err.message);
        }
    }

    const getNationality = async () => {
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

    const getMothertongue = async () => {
        try {
            const requestoptions = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            };
            await fetch(`${API_URL}/api/motherTongueList`, requestoptions)
                .then(response => response.json())
                .then(data => {
                    console.log(data.data);
                    setMotherTongueList(data.data);
                })
        }
        catch (err) {
            console.error(err.message);
        }
    }

    const getLanguage = async () => {
        try {
            const requestoptions = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            };
            await fetch(`${API_URL}/api/languageList`, requestoptions)
                .then(response => response.json())
                .then(data => {
                    console.log(data.data);
                    setLanguageList(data.data);
                })
        }
        catch (err) {
            console.error(err.message);
        }
    }


    const getCaste = async () => {
        try {
            const requestoptions = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            };
            await fetch(`${API_URL}/api/castList`, requestoptions)
                .then(response => response.json())
                .then(data => {
                    console.log(data.data);
                    setCasteList(data.data);
                })
        }
        catch (err) {
            console.error(err.message);
        }
    }

    const getSubCaste = async () => {
        try {
            const requestoptions = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            };
            await fetch(`${API_URL}/api/getSubcastbycastid?cast_id=${cast_id}`, requestoptions)
                .then(response => response.json())
                .then(data => {
                    console.log(data.data);
                    setSubCasteList(data.data);
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
            await fetch(`${API_URL}/api/getstatebycountry?country_id=${country_id}`, requestoptions)
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
            await fetch(`${API_URL}/api/getcitybystate?state_id=${state_id}`, requestoptions)
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

    const getPermanentState = async () => {
        try {
            const requestoptions = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            };
            await fetch(`${API_URL}/api/getstatebycountry?country_id=${permanent_country_id}`, requestoptions)
                .then(response => response.json())
                .then(data => {
                    console.log(data.data);
                    setPermanentStateList(data.data);
                })
        }
        catch (err) {
            console.error(err.message);
        }
    }

    const getPermanentCity = async () => {
        try {
            const requestoptions = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            };
            await fetch(`${API_URL}/api/getcitybystate?state_id=${permanent_state_id}`, requestoptions)
                .then(response => response.json())
                .then(data => {
                    console.log(data.data);
                    setPermanentCityList(data.data);
                })
        }
        catch (err) {
            console.error(err.message);
        }
    }

    const handleImageChange = (e) => {
        const reader = new FileReader();
        const file = e.target.files[0];
        setProfile_pic(file);
        reader.onloadend = () => {
            setImage(reader.result);
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handlePhoneChange = (value) => {
        setPhone_number(value);
        if (value === '' || value === undefined) {
            setIsPhoneValid(true);
        } else {
            setIsPhoneValid(isValidPhoneNumber(value));
        }
    };


    const profilePicRef = useRef(null);
    const firstNameRef = useRef(null);
    const lastNameRef = useRef(null);
    const genderRef = useRef(null);
    const dobRef = useRef(null);
    const ageRef = useRef(null);
    const maritalStatusRef = useRef(null);
    const nationalityRef = useRef(null);
    const motherTongueRef = useRef(null);
    const languageKnownRef = useRef(null);
    const casteRef = useRef(null);
    const subCasteRef = useRef(null);
    const gotraRef = useRef(null);
    const heightRef = useRef(null);
    const weightRef = useRef(null);
    const infoAboutMeRef = useRef(null);
    const hobbiesRef = useRef(null);
    const phone_numberRef = useRef(null);
    const handicap_detailRef = useRef(null);
    const countryRef = useRef(null);
    const stateRef = useRef(null);
    const cityRef = useRef(null);
    const permanentCountryRef = useRef(null);
    const permanentStateRef = useRef(null);
    const permanentCityRef = useRef(null);
    const educationRef = useRef([]);
    const educationDegreeRef = useRef(null);
    const educationInstitutionRef = useRef(null);
    const educationYearOfPassingRef = useRef(null);
    const careerRef = useRef([]);
    const careerOccupationRef = useRef(null);
    const careerCompanyRef = useRef(null);
    const careerIncomeRef = useRef(null);
    const fatherNameRef = useRef(null);
    const fatherOccupationRef = useRef(null);
    const fatherEducationRef = useRef(null);
    const motherNameRef = useRef(null);
    const motherOccupationRef = useRef(null);
    const motherEducationRef = useRef(null);
    const siblingRef = useRef(null);
    const timeOfBirthRef = useRef(null);
    const cityOfBirthRef = useRef(null);
    const mangalDoshRef = useRef(null);
    const shanidoshRef = useRef(null);
    const fitnessFreakRef = useRef(null);
    const moreResponsibilitiesRef = useRef(null);
    const likeCookingRef = useRef(null);
    const likeTravelingRef = useRef(null);
    const partnerWorkingRef = useRef(null);
    const spirituallyStrongRef = useRef(null);
    const nityaPoojaDailyRef = useRef(null);
    const sansthaNameRef = useRef(null);
    const mandalNameRef = useRef(null);
    const sampradayaFastRef = useRef(null);
    const templeVisitRef = useRef(null);
    const eatOnionGarlicRef = useRef(null);
    const aartiRef = useRef(null);
    const wearKanthiRef = useRef(null);
    const volunteerActivitiesRef = useRef(null);
    const defineRef = useRef(null);
    const tilakChandloRef = useRef(null);
    const shibirRef = useRef(null);
    const photosRef = useRef(null);


    const handleSubmit = async (e) => {
        e.preventDefault();


        try {
            if (profile_pic.length == 0) {
                swal({
                    text: "Please upload profile picture",
                    icon: "warning",
                })
                    .then(() => profilePicRef.current.focus());
                // return;
            }
            else if (!first_name) {
                swal({
                    text: "Please enter first name",
                    icon: "warning",
                });
                firstNameRef.current.focus();
                return;
            }
            else if (!last_name) {
                swal({
                    text: "Please enter last name",
                    icon: "warning",
                });
                lastNameRef.current.focus();
                return;
            }
            else if (!gender) {
                swal({
                    text: "Please select Gender",
                    icon: "warning",
                });
                genderRef.current.focus();
                return;
            }
            else if (!dob) {
                swal({
                    text: "Please enter date of birth",
                    icon: "warning",
                });
                dobRef.current.focus();
                return;
            }
            else if (!age) {
                swal({
                    text: "Please enter age",
                    icon: "warning",
                });
                ageRef.current.focus();
                return;
            }
            else if (!marital_status) {
                swal({
                    text: "Please select marital status",
                    icon: "warning",
                });
                maritalStatusRef.current.focus();
                return;
            }
            else if (!nationality) {
                swal({
                    text: "Please select nationality",
                    icon: "warning",
                });
                nationalityRef.current.focus();
                return;
            }
            else if (!mother_tongue) {
                swal({
                    text: "Please select mother tongue",
                    icon: "warning",
                });
                motherTongueRef.current.focus();
                return;
            }
            else if (!language_known) {
                swal({
                    text: "Please select language known",
                    icon: "warning",
                });
                languageKnownRef.current.focus();
                return;
            }
            else if (!cast_id) {
                swal({
                    text: "Please select caste",
                    icon: "warning",
                });
                casteRef.current.focus();
                return;
            }
            // else if (!sub_caste) {
            //     swal({
            //         text: "Please select sub caste",
            //         icon: "warning",
            //     });
            //     subCasteRef.current.focus();
            //     return;
            // }
            // else if (!gotra) {
            //     swal({
            //         text: "Please enter gotra",
            //         icon: "warning",
            //     });
            //     gotraRef.current.focus();
            //     return;
            // }
            else if (!height) {
                swal({
                    text: "Please enter height",
                    icon: "warning",
                });
                heightRef.current.focus();
                return;
            }
            else if (!weight) {
                swal({
                    text: "Please enter weight",
                    icon: "warning",
                });
                weightRef.current.focus();
                return;
            }
           
            else if (!hobbies) {
                swal({
                    text: "Please enter hobbies",
                    icon: "warning",
                });
                hobbiesRef.current.focus();
                return;
            }
            else if (!phone_number) {
                swal({
                    text: "Please enter Mobile number",
                    icon: "warning",
                });
                phone_numberRef.current.focus();
                return;
            }
            else if (!isPhoneValid) {
                swal({
                    text: "Please enter valid Mobile number",
                    icon: "warning",
                });
                phone_numberRef.current.focus();
                return;
            }
            else if (handicap && (handicapdetails == '')) {
                swal({
                    text: "Please specify the impairments or disabilities",
                    icon: "warning",
                });
                handicap_detailRef.current.focus();
                return;
            }
            else if (!info_about_me) {
                swal({
                    text: "Please enter info about me",
                    icon: "warning",
                });
                infoAboutMeRef.current.focus();
                return;
            }
            else if (!country_id) {
                swal({
                    text: "Please select country",
                    icon: "warning",
                });
                countryRef.current.focus();
                return;
            }
            else if (!state_id) {
                swal({
                    text: "Please select state",
                    icon: "warning",
                });
                stateRef.current.focus();
                return;
            }
            else if (!city_id) {
                swal({
                    text: "Please select city",
                    icon: "warning",
                });
                cityRef.current.focus();
                return;
            }
            else if (!permanent_country_id) {
                swal({
                    text: "Please select permanent country",
                    icon: "warning",
                });
                permanentCountryRef.current.focus();
                return;
            }
            else if (!permanent_state_id) {
                swal({
                    text: "Please select permanent state",
                    icon: "warning",
                });
                permanentStateRef.current.focus();
                return;
            }
            else if (!permanent_city_id) {
                swal({
                    text: "Please select permanent city",
                    icon: "warning",
                });
                permanentCityRef.current.focus();
                return;
            }
            else if (educationEntries.find(education => education.degree == '')) {
                swal({
                    text: "Please enter degree",
                    icon: "warning",
                });
                educationDegreeRef.current.focus();
                return;
            }
            else if (educationEntries.find(education => education.institution == '')) {
                swal({
                    text: "Please enter institution",
                    icon: "warning",
                });
                educationInstitutionRef.current.focus();
                return;
            }
            else if (educationEntries.find(education => education.year_of_passing == '')) {
                swal({
                    text: "Please enter year of passing",
                    icon: "warning",
                });
                educationYearOfPassingRef.current.focus();
                return;
            }
            else if (careers.find(career => career.occupation == '')) {
                swal({
                    text: "Please enter career occupation",
                    icon: "warning",
                });
                careerOccupationRef.current.focus();
                return;
            }
            else if (careers.find(career => career.company == '')) {
                swal({
                    text: "Please enter company",
                    icon: "warning",
                });
                careerCompanyRef.current.focus();
                return;
            }
            // else if (careers.find(career => career.income == '')) {
            //     swal({
            //         text: "Please enter income",
            //         icon: "warning",
            //     });
            //     careerIncomeRef.current.focus();
            //     return;
            // }
            // else if (siblings.length == 0) {
            //     swal({
            //         text: "Please enter sibling details",
            //         icon: "warning",
            //     });
            //     siblingRef.current.focus();
            //     return;
            // }
            else if (!fatherName) {
                swal({
                    text: "Please enter father name",
                    icon: "warning",
                });
                fatherNameRef.current.focus();
                return;
            }
            else if (!fatherOccupation) {
                swal({
                    text: "Please enter father occupation",
                    icon: "warning",
                });
                fatherOccupationRef.current.focus();
                return;
            }
            else if (!fatherEducation) {
                swal({
                    text: "Please enter father education",
                    icon: "warning",
                });
                fatherEducationRef.current.focus();
                return;
            }
            else if (!motherName) {
                swal({
                    text: "Please enter mother name",
                    icon: "warning",
                });
                motherNameRef.current.focus();
                return;
            }
            else if (!motherOccupation) {
                swal({
                    text: "Please enter mother occupation",
                    icon: "warning",
                });
                motherOccupationRef.current.focus();
                return;
            }
            else if (!timeOfBirth) {
                swal({
                    text: "Please enter time of birth",
                    icon: "warning",
                });
                timeOfBirthRef.current.focus();
                return;
            }
            else if (!cityOfBirth) {
                swal({
                    text: "Please enter city of birth",
                    icon: "warning",
                });
                cityOfBirthRef.current.focus();
                return;
            }
            else if (!mangalDosh) {
                swal({
                    text: "Please enter mangal dosh",
                    icon: "warning",
                });
                mangalDoshRef.current.focus();
                return;
            }
            else if (!shanidosh) {
                swal({
                    text: "Please enter shani dosh",
                    icon: "warning",
                });
                shanidoshRef.current.focus();
                return;
            }
            else if (!fitnessFreak) {
                swal({
                    text: "Please enter fitness freak",
                    icon: "warning",
                });
                fitnessFreakRef.current.focus();
                return;
            }
            else if (!moreResponsibilities) {
                swal({
                    text: "Please enter more responsibilities",
                    icon: "warning",
                });
                moreResponsibilitiesRef.current.focus();
                return;
            }
            else if (!likeCooking) {
                swal({
                    text: "Please enter like cooking",
                    icon: "warning",
                });
                likeCookingRef.current.focus();
                return;
            }
            else if (!likeTraveling) {
                swal({
                    text: "Please enter like traveling",
                    icon: "warning",
                });
                likeTravelingRef.current.focus();
                return;
            }
            else if (!partnerWorking) {
                swal({
                    text: "Please enter partner working",
                    icon: "warning",
                });
                partnerWorkingRef.current.focus();
                return;
            }
            else if (!spirituallyStrong) {
                swal({
                    text: "Please enter spiritually strong",
                    icon: "warning",
                });
                spirituallyStrongRef.current.focus();
                return;
            }
            else if (!nityaPoojaDaily) {
                swal({
                    text: "Please enter nitya pooja daily",
                    icon: "warning",
                });
                nityaPoojaDailyRef.current.focus();
                return;
            }
            else if (!sansthaName) {
                swal({
                    text: "Please enter sanstha name",
                    icon: "warning",
                });
                sansthaNameRef.current.focus();
                return;
            }
            else if (!mandalName) {
                swal({
                    text: "Please enter mandal name",
                    icon: "warning",
                });
                mandalNameRef.current.focus();
                return;
            }
            else if (!sampradayaFast) {
                swal({
                    text: "Please enter sampradaya fast",
                    icon: "warning",
                });
                sampradayaFastRef.current.focus();
                return;
            }
            else if (!templeVisit) {
                swal({
                    text: "Please enter temple visit",
                    icon: "warning",
                });
                templeVisitRef.current.focus();
                return;
            }
            else if (!eatOnionGarlic) {
                swal({
                    text: "Please enter eat onion garlic",
                    icon: "warning",
                });
                eatOnionGarlicRef.current.focus();
                return;
            }
            else if (!aarti) {
                swal({
                    text: "Please enter aarti",
                    icon: "warning",
                });
                aartiRef.current.focus();
                return;
            }
            else if (!wearKanthi) {
                swal({
                    text: "Please enter wear kanthi",
                    icon: "warning",
                });
                wearKanthiRef.current.focus();
                return;
            }
            else if (!volunteerActivities) {
                swal({
                    text: "Please enter volunteer activities",
                    icon: "warning",
                });
                volunteerActivitiesRef.current.focus();
                return;
            }
            else if (!define) {
                swal({
                    text: "Please enter define",
                    icon: "warning",
                });
                defineRef.current.focus();
                return;
            }
            else if (!tilakChandlo) {
                swal({
                    text: "Please enter tilak chandlo",
                    icon: "warning",
                });
                tilakChandloRef.current.focus();
                return;
            }
            else if (!shibir) {
                swal({
                    text: "Please enter shibir",
                    icon: "warning",
                });
                shibirRef.current.focus();
                return;
            }
            else if (photos.length == 0) {
                swal({
                    text: "Please upload photos",
                    icon: "warning",
                });
                photosRef.current.focus();
                return;
            } else {
                setLoading(true);
                const formdata = new FormData();
                // formdata.append('whoAmI', whoAmI);
                formdata.append('profile', profile_pic);
                formdata.append('firstName', first_name);
                formdata.append('lastName', last_name);
                formdata.append('gender', gender);
                formdata.append('dateOfBirth', dob);
                formdata.append('age', age);
                formdata.append('maritalStatus', marital_status);
                formdata.append('nationality', nationality);
                formdata.append('motherTongue', mother_tongue);
                formdata.append('languagesKnown', language_known);
                formdata.append('caste', cast_id);
                formdata.append('subCaste', sub_caste);
                formdata.append('gotra', gotra);
                formdata.append('height', height);
                formdata.append('heightFeet', JSON.stringify(heightFeet));
                formdata.append('weight', weight);
                formdata.append('infoAboutMe', info_about_me);
                formdata.append('hobbies', hobbies);
                formdata.append('phoneNumber', phone_number);
                formdata.append('whatsappNumber', WhatsApp_number);
                formdata.append('facebookLink', facebook_link);
                formdata.append('instagramLink', instagram_link);
                formdata.append('linkedinLink', linkedin_link);
                formdata.append('handicap', handicap);
                formdata.append('handicapDetails', handicapdetails);
                formdata.append('present_country', country_id);
                formdata.append('present_state', state_id);
                formdata.append('present_city', city_id);
                formdata.append('permanent_country', permanent_country_id);
                formdata.append('permanent_state', permanent_state_id);
                formdata.append('permanent_city', permanent_city_id);
                formdata.append('career', JSON.stringify(careers));
                formdata.append('father_name', fatherName);
                formdata.append('father_occupation', fatherOccupation);
                formdata.append('father_education', fatherEducation);
                formdata.append('mother_name', motherName);
                formdata.append('mother_occupation', motherOccupation);
                formdata.append('mother_education', motherEducation);
                formdata.append('siblings', JSON.stringify(siblings));
                formdata.append('education', JSON.stringify(educationEntries));
                formdata.append('timeOfBirth', timeOfBirth);
                formdata.append('cityOfBirth', cityOfBirth);
                formdata.append('mangalDosh', mangalDosh);
                formdata.append('shanidosh', shanidosh);
                formdata.append('fitnessFreak', fitnessFreak);
                formdata.append('moreResponsibilities', moreResponsibilities);
                formdata.append('likeCooking', likeCooking);
                formdata.append('likeTraveling', likeTraveling);
                formdata.append('partnerWorking', partnerWorking);
                formdata.append('spirituallyStrong', spirituallyStrong);
                formdata.append('nityaPoojaDaily', nityaPoojaDaily);
                formdata.append('sansthaName', sansthaName);
                formdata.append('mandalName', mandalName);
                formdata.append('sampradayaFast', sampradayaFast);
                formdata.append('templeVisit', templeVisit);
                formdata.append('eatOnionGarlic', eatOnionGarlic);
                formdata.append('aarti', aarti);
                formdata.append('wearKanthi', wearKanthi);
                formdata.append('volunteerActivities', volunteerActivities);
                formdata.append('define', define);
                formdata.append('tilakChandlo', tilakChandlo);
                formdata.append('shibir', shibir);
                photos.forEach(photo => {
                    formdata.append('file', photo);
                });



                console.table(Array.from(formdata));

                // return false;

                const requestoptions = {
                    method: 'POST',
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
                    body: formdata,
                };
                await fetch(`${API_URL}/api/addMatrimonyUserData`, requestoptions)
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

        } catch (err) {
            swal({
                text: 'Something went wrong, Please try again later',
                icon: "error",
            })
            console.error(err.message);
            setLoading(false);
        }
    }


    const handlePhotosChange = (e) => {
        const files = Array.from(e.target.files);

        // Proceed as normal if the limit is not exceeded
        // const previews = files.map(file => URL.createObjectURL(file));
        // setPhotos([...photos, ...files]);
        // setPreviewPhotos([...previewPhotos, ...previews]);

        // If the limit is exceeded, alert the user
        if (photos?.length + files.length > userdata?.matrimonyplans?.photos_count) {
            const remainingSlots = userdata?.matrimonyplans?.photos_count - photos.length;
            const filesToAdd = files.slice(0, remainingSlots);

            swal({
                text: `You can only upload ${userdata?.matrimonyplans?.photos_count} Photos`,
                icon: "warning",
            });

            const previews = filesToAdd.map(file => URL.createObjectURL(file));
            setPhotos([...photos, ...filesToAdd]);
            setPreviewPhotos([...previewPhotos, ...previews]);
        }
        else {
            const previews = files.map(file => URL.createObjectURL(file));
            setPhotos([...photos, ...files]);
            setPreviewPhotos([...previewPhotos, ...previews]);

        }
    };


    const removePhoto = (index) => {
        const updatedSelectedPhotos = [...photos];
        updatedSelectedPhotos.splice(index, 1);

        const updatedPreviews = [...previewPhotos];
        updatedPreviews.splice(index, 1);

        setPhotos(updatedSelectedPhotos);
        setPreviewPhotos(updatedPreviews);
    };



    console.log(photos);

    const usergender = () => {
        try {
            const requestOptions = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            fetch(`${API_URL}/api/usergendertypeList`, requestOptions)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    setGenderList(data.data);
                });

        } catch (error) {
            console.log(error);
        }
    }


    console.log(genderList)

    const allowOnlyNumbers = (e) => {
        e.preventDefault();
        const input = e.target;
        const value = input.value.replace(/[^\d]/g, ''); // Replace any non-numeric characters with an empty string
        input.value = value; // Set the input value to the filtered value
    }

    const calculateage = (e) => {
        const dobValue = e.target.value;
        setDob(dobValue);

        const birthDate = new Date(dobValue);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();

        // Adjust age if birth date hasn't occurred yet this year
        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        setAge(age);
    };


    const getUserData = async () => {
        try {
            const requestOptions = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            };

            fetch(`${API_URL}/api/getuserdetail`, requestOptions)
                .then(response => response.json())
                .then(data => {
                    console.log(data.data);
                    if (data.status == 200) {
                        setUserdata(data?.data[0]);
                    }
                }
                );
        }
        catch (err) {
            console.error(err.message);
        }
    }

    console.log(userdata)


     // Convert cm to feet and inches
  const convertCmToFeet = (cm) => {
    const totalInches = cm / 2.54;
    const feet = Math.floor(totalInches / 12);
    const inches = Math.round(totalInches % 12);
    return { feet, inches };
  };

  // Convert feet and inches to cm
  const convertFeetToCm = (feet, inches) => {
    return Math.round(feet * 30.48 + inches * 2.54);
  };

  // Handle cm input
  const handleCmChange = (e) => {
    const cmValue = e.target.value;
    setHeight(cmValue);
    if (cmValue) {
      const { feet, inches } = convertCmToFeet(cmValue);
      setHeightFeet({ feet, inches });
    } else {
      setHeightFeet({ feet: "", inches: "" });
    }
  };

  // Handle feet and inches input
  const handleFeetChange = (e) => {
    const feetValue = e.target.value.replace(/\D/g, ""); // Only numbers
    setHeightFeet((prev) => {
        const updatedFeet = feetValue || 0;
        const cmValue = convertFeetToCm(updatedFeet, prev.inches || 0);
        setHeight(cmValue); // Update cm
        return { ...prev, feet: updatedFeet };
    });
};

const handleInchesChange = (e) => {
    const inchesValue = e.target.value.replace(/\D/g, ""); // Only numbers
    setHeightFeet((prev) => {
        const updatedInches = inchesValue || 0;
        const cmValue = convertFeetToCm(prev.feet || 0, updatedInches);
        setHeight(cmValue); // Update cm
        return { ...prev, inches: updatedInches };
    });
};


    return (
        <div>
            <Container fluid className='matrimonialform mt-5 mb-5'>
                <div className='profilegallery mb-5'>
                    <h3 className='text-center'>Basic Information</h3>
                    <div className='descr-content'>
                        <Row>
                            <Col lg={4}>
                                <div className='profileimgc'>
                                    <img src={image} alt="Profile" />
                                    <div className='image edit' onClick={() => document.getElementById('uploadInput').click()}>
                                        <i className='fa fa-edit'></i>
                                    </div>
                                    <input
                                        id="uploadInput"
                                        type="file"
                                        ref={profilePicRef}
                                        accept=".jpg, .jpeg, .png"
                                        style={{ display: 'none' }}
                                        onChange={handleImageChange}
                                        required
                                    />
                                </div>
                            </Col>
                            <Col lg={8}>

                                {/* <Col lg={4} className='mb-2'>
                                    <label>Who Am I</label>
                                    <Form.Select className='mb-3' onChange={(e) => setWhoAmI(e.target.value)}>
                                        <option hidden>Select</option>
                                        {genderList?.map((val, index) => (
                                            <option key={index} value={val._id}>{val.type}</option>
                                        ))}
                                    </Form.Select>
                                </Col> */}
                                <Row>
                                    <Col lg={6} className='mb-2'>
                                        <label>First Name <span className='labelerrorssss'>*</span></label>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Control type="text" placeholder="Enter your first name" onChange={(e) => setFirst_name(e.target.value)} ref={firstNameRef} />
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6} className='mb-2'>
                                        <label>Last Name <span className='labelerrorssss'>*</span></label>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Control type="text" placeholder="Enter your last name" onChange={(e) => setLast_name(e.target.value)} ref={lastNameRef} />
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6} className='mb-2'>
                                        <label>Gender <span className='labelerrorssss'>*</span></label>
                                        <Form.Group className="mb-3" controlId="formBasicEmail" >
                                            <Form.Select className='mb-3' onChange={(e) => setGender(e.target.value)} ref={genderRef}>
                                                <option hidden>Select</option>
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6} className='mb-2'>
                                        <label>Date of Birth <span className='labelerrorssss'>*</span></label>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Control type="date" placeholder="Enter your date of birth" onChange={calculateage} ref={dobRef} />
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>Age <span className='labelerrorssss'>*</span></label>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Control type="number" placeholder="Enter your age" value={age} onChange={(e) => setAge(e.target.value)} ref={ageRef} />
                                </Form.Group>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>Marital Status <span className='labelerrorssss'>*</span></label>
                                <Form.Select className='mb-3' onChange={(e) => setMarital_status(e.target.value)} ref={maritalStatusRef}>
                                    <option hidden>Select Status</option>
                                    {maritalStatusList?.map((status, index) => (
                                        <option key={index} value={status._id}>{status.type}</option>
                                    ))}
                                </Form.Select>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>Nationality <span className='labelerrorssss'>*</span></label>
                                <Form.Select className='mb-3' onChange={(e) => setNationality(e.target.value)} ref={nationalityRef}>
                                    <option hidden>Select Nationality</option>
                                    {NationalityList?.map((nationality, index) => (
                                        <option key={index} value={nationality._id}>{nationality.country_name}</option>
                                    ))}
                                </Form.Select>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>Mother Tongue <span className='labelerrorssss'>*</span></label>
                                <Form.Select className='mb-3' onChange={(e) => setMother_tongue(e.target.value)} ref={motherTongueRef}>
                                    <option hidden>Select Mother Tongue</option>
                                    {MotherTongueList?.map((motherTongue, index) => (
                                        <option key={index} value={motherTongue._id}>{motherTongue.type}</option>
                                    ))}
                                </Form.Select>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>Language Known <span className='labelerrorssss'>*</span></label>
                                {/* <Form.Select className='mb-3' onChange={(e) => setLanguage_known(e.target.value)} ref={languageKnownRef}>
                                    <option hidden>Select Languages Known</option>
                                    {LanguageList?.map((motherTongue, index) => (
                                        <option key={index} value={motherTongue._id}>{motherTongue.language}</option>
                                    ))}
                                </Form.Select> */}
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Control type="text" placeholder="Enter Languages Known" onChange={(e) => setLanguage_known(e.target.value)} ref={languageKnownRef} />
                                </Form.Group>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>Caste <span className='labelerrorssss'>*</span></label>
                                {/* <Form.Select className='mb-3' onChange={(e) => setCast_id(e.target.value)} ref={casteRef}>
                                    <option hidden>Select Caste</option>
                                    {casteList?.map((caste, index) => (
                                        <option key={index} value={caste._id}>{caste.type}</option>
                                    ))}
                                </Form.Select> */}
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Control type="text" placeholder="Enter your caste" onChange={(e) => setCast_id(e.target.value)} ref={casteRef} />
                                </Form.Group>

                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>Sub Caste </label>
                                {/* <Form.Select className='mb-3' onChange={(e) => setSub_caste(e.target.value)} ref={subCasteRef}>
                                    <option hidden>Select Sub Caste</option>
                                    {!cast_id ? <option disabled>Select Caste First</option> :
                                        subCasteList?.map((subCaste, index) => (
                                            <option key={index} value={subCaste._id}>{subCaste.type}</option>
                                        ))
                                    }
                                </Form.Select> */}

                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Control type="text" placeholder="Enter your sub Caste" onChange={(e) => setSub_caste(e.target.value)} ref={subCasteRef} />
                                </Form.Group>

                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>Gotra </label>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Control type="text" placeholder='Enter your Gotra' className='mb-3' onChange={(e) => setGotra(e.target.value)} ref={gotraRef} />
                                </Form.Group>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <Row>
                                <Col lg={6} className='mb-2'>
                                <label>Height(cm) <span className='labelerrorssss'>*</span></label>
                                <Form.Group className="mb-3">

                                    <Form.Control type="text" placeholder="Enter your height (cm)" value={height} onChange={handleCmChange} onInput={allowOnlyNumbers} maxLength={3} ref={heightRef} />
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6} className='mb-2'>
                                        <label>Height(feet & inches) <span className='labelerrorssss'>*</span></label>
                                    <div className="d-flex">
                                    <Form.Control
                                        type="text"
                                        placeholder="Feet"
                                        value={heightFeet.feet}
                                        onChange={handleFeetChange}
                                        onInput={allowOnlyNumbers}
                                        maxLength={2}
                                        className="me-2"
                                    />
                                    <Form.Control
                                        type="text"
                                        placeholder="Inches"
                                        value={heightFeet.inches}
                                        onChange={handleInchesChange}
                                        onInput={allowOnlyNumbers}
                                        maxLength={2}
                                    />
                                    </div>
                                </Col>
                                </Row>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>Weight(kg) <span className='labelerrorssss'>*</span></label>
                                <Form.Group className="mb-3" controlId="formBasicEmail"  >
                                    <Form.Control type="text" placeholder="Enter your weight (kg)" onChange={(e) => setWeight(e.target.value)} onInput={allowOnlyNumbers} maxLength={3} ref={weightRef} />
                                </Form.Group>
                            </Col>
                           
                            <Col lg={4} className='mb-2'>
                                <label>Hobbies <span className='labelerrorssss'>*</span></label>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Control type="text" placeholder="Enter your hobbies here" onChange={(e) => setHobbies(e.target.value)} ref={hobbiesRef} />
                                </Form.Group>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>Mobile Number <span className='labelerrorssss'>*</span></label>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    {/* <Form.Control type="text" placeholder="Enter your Mobile Number" onChange={(e) => setPhone_number(e.target.value)} onInput={allowOnlyNumbers} maxLength={12} ref={phone_numberRef} /> */}
                                    <PhoneInput
                                        className={`form-control ${!isPhoneValid ? 'is-invalid' : ''}`}
                                        defaultCountry="IN"
                                        international
                                        countryCallingCodeEditable={false}
                                        localization={en}
                                        placeholder="Enter your Mobile Number"
                                        value={phone_number}
                                        onChange={handlePhoneChange}
                                        ref={phone_numberRef}
                                    />
                                </Form.Group>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>WhatsApp Number</label>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Control type="text" placeholder="Enter your WhatsApp Number" onChange={(e) => setWhatsApp_number(e.target.value)} onInput={allowOnlyNumbers} maxLength={12} />
                                </Form.Group>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>Facebook Link</label>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Control type="text" placeholder="Enter your Facebook Link" onChange={(e) => setFacebook_link(e.target.value)} />
                                </Form.Group>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>Instagram Link</label>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Control type="text" placeholder="Enter your Instagram Link" onChange={(e) => setInstagram_link(e.target.value)} />
                                </Form.Group>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>LinkedIn Link</label>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Control type="text" placeholder="Enter your LinkedIn Link" onChange={(e) => setLinkedin_link(e.target.value)} />
                                </Form.Group>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>Handicap</label>
                                <input type="checkbox" className='mb-3' style={{ display: 'block', width: '22px', height: '22px' }} onChange={(e) => setHandicap(e.target.checked)} />
                            </Col>
                            { handicap &&
                            <Col lg={4} className='mb-2'>
                                <label>Please specify the impairments or disabilities <span className='labelerrorssss'>*</span></label>
                                <Form.Group className="mb-3" controlId="formBasicEmail" >
                                    <Form.Control as="textarea"
                                        rows={3}
                                        placeholder="specify the impairments or disabilities"
                                        value={handicapdetails}
                                        onChange={(e) => setHandicapdetails(e.target.value)}
                                        ref={handicap_detailRef}
                                        style={{ height: '180px' }}
                                    />

                                </Form.Group>
                            </Col>
                            }
                        </Row>
                    </div>
                </div>
                <div className='profilegallery mb-5'>
                    <h3 className='text-center'>Info About me </h3>
                    <div className='descr-content'>
                        <Row>
                        <Col lg={12} className='mb-2'>
                                <label>Info About me <span className='labelerrorssss'>*</span></label>
                                <Form.Group className="mb-3" controlId="formBasicEmail" >
                                    <Form.Control as="textarea"
                                        rows={3}
                                        placeholder="Enter info here"
                                        value={info_about_me}
                                        onChange={(e) => setInfo_about_me(e.target.value)}
                                        ref={infoAboutMeRef}
                                        style={{ height: '180px' }}
                                    />

                                </Form.Group>
                            </Col>
                        </Row>
                    </div>
                </div>
                <div className='profilegallery mb-5'>
                    <h3 className='text-center'>Present Address </h3>
                    <div className='descr-content'>
                        <Row>
                            <Col lg={4} className='mb-2'>
                                <label>Country <span className='labelerrorssss'>*</span></label>
                                <Form.Select className='mb-3' onChange={handlepresentCountryChange} ref={countryRef}>
                                    <option hidden>Select Country </option>
                                    {NationalityList?.map((nationality, index) => (
                                        <option key={index} value={nationality._id}>{nationality.country_name}</option>
                                    ))}
                                </Form.Select>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>State <span className='labelerrorssss'>*</span></label>
                                <Form.Select className='mb-3' onChange={handlepresentStateChange} ref={stateRef}>
                                    <option hidden>Select State</option>
                                    {stateList?.map((state, index) => (
                                        <option key={index} value={state._id}>{state.state_name}</option>
                                    ))}
                                </Form.Select>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>City <span className='labelerrorssss'>*</span></label>
                                <Form.Select className='mb-3' onChange={(e) => setCity_id(e.target.value)} ref={cityRef}>
                                    <option hidden>Select City</option>
                                    {cityList?.map((city, index) => (
                                        <option key={index} value={city._id}>{city.city_name}</option>
                                    ))}
                                </Form.Select>
                            </Col>
                        </Row>
                    </div>
                </div>
                <div className='profilegallery mb-5'>
                    <h3 className='text-center'>Permanent Address</h3>
                    <div className='descr-content'>
                        <Row>
                            <Col lg={4} className='mb-2'>
                                <label>Country <span className='labelerrorssss'>*</span></label>
                                <Form.Select className='mb-3' onChange={handlepermamentCountryChange} ref={permanentCountryRef}>
                                    <option hidden>Select Country</option>
                                    {NationalityList?.map((nationality, index) => (
                                        <option key={index} value={nationality._id}>{nationality.country_name}</option>
                                    ))}
                                </Form.Select>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>State <span className='labelerrorssss'>*</span></label>
                                <Form.Select className='mb-3' onChange={handlepermamentStateChange} ref={permanentStateRef}>
                                    <option hidden>Select State</option>
                                    {permanentStateList?.map((state, index) => (
                                        <option key={index} value={state._id}>{state.state_name}</option>
                                    ))}
                                </Form.Select>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>City <span className='labelerrorssss'>*</span></label>
                                <Form.Select className='mb-3' onChange={(e) => setPermanent_city_id(e.target.value)} ref={permanentCityRef}>
                                    <option hidden>Select City</option>
                                    {permanentCityList?.map((city, index) => (
                                        <option key={index} value={city._id}>{city.city_name}</option>
                                    ))}
                                </Form.Select>
                            </Col>
                        </Row>
                    </div>
                </div>
                <div className='profilegallery mb-5'>
                    <h3 className='text-center'>Education</h3>

                    <div className='descr-content'>
                        {educationEntries.map((entry, index) => (
                            <div key={index}>
                                <Row>
                                    <Col lg={4} className='mb-2'>
                                        <label>Degree <span className='labelerrorssss'>*</span></label>
                                        <Form.Group className="mb-3">
                                            <Form.Control type="text"
                                                placeholder="Enter your degree"
                                                defaultValue={entry.degree}
                                                onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
                                                ref={educationDegreeRef}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col lg={4} className='mb-2'>
                                        <label>Institution <span className='labelerrorssss'>*</span></label>
                                        <Form.Group className="mb-3">
                                            <Form.Control type="text"
                                                placeholder="Enter your institute name"
                                                defaultValue={entry.institution}
                                                onChange={(e) => handleEducationChange(index, 'institution', e.target.value)}
                                                ref={educationInstitutionRef}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col lg={3} className='mb-2'>
                                        <label>Year Of Passing <span className='labelerrorssss'>*</span></label>
                                        <Form.Group className="mb-3">
                                            <Form.Control type="text"
                                                placeholder="Enter your year of passing"
                                                defaultValue={entry.year_of_passing}
                                                onChange={(e) => handleEducationChange(index, 'year_of_passing', e.target.value)}
                                                onInput={allowOnlyNumbers} maxLength={4}
                                                ref={educationYearOfPassingRef}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col lg={1} className='mb-2'>
                                        <div className='plus'>
                                            <i className="fa fa-plus" aria-hidden="true" onClick={addEducationEntry}></i>
                                            {index > 0 && (
                                                <i className="fa fa-minus" aria-hidden="true" onClick={() => removeEducationEntry(index)}></i>
                                            )}
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='profilegallery mb-5'>
                    <h3 className='text-center'>Career</h3>
                    <div className='descr-content'>
                        {careers.map((career, index) => (
                            <div key={index}>
                                <Row>
                                    <Col lg={4} className='mb-2'>
                                        <label>Occupation <span className='labelerrorssss'>*</span></label>
                                        <Form.Group className="mb-3">
                                            <Form.Control type="text"
                                                placeholder="Enter your occupation"
                                                value={career.occupation}
                                                onChange={(e) => handleCareerChange(index, 'occupation', e.target.value)}
                                                ref={careerOccupationRef}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col lg={4} className='mb-2'>
                                        <label>Company <span className='labelerrorssss'>*</span></label>
                                        <Form.Group className="mb-3" >
                                            <Form.Control type="text"
                                                placeholder="Enter your company"
                                                value={career.company}
                                                onChange={(e) => handleCareerChange(index, 'company', e.target.value)}
                                                ref={careerCompanyRef}

                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col lg={3} className='mb-2'>
                                        <label>Annual Income (INR) </label>
                                        <Form.Group className="mb-3" >
                                            <Form.Control type="text"
                                                placeholder="Enter your annual income"
                                                value={career.income}
                                                onChange={(e) => handleCareerChange(index, 'income', e.target.value)}
                                                onInput={allowOnlyNumbers}
                                                ref={careerIncomeRef}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col lg={1} className='mb-2'>
                                        <div className='plus'>
                                            {/* {index == 0 && ( */}
                                            <i className="fa fa-plus" aria-hidden="true" onClick={addCareer}></i>
                                            {/* )} */}
                                            {index > 0 && (
                                                <i className="fa fa-minus" aria-hidden="true" onClick={() => removeCareer(index)}></i>
                                            )}
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='profilegallery mb-5'>
                    <h3 className='text-center'>Family Information</h3>
                    <div className='descr-content'>
                        <Row>
                            <Col lg={4} className='mb-2'>
                                <label>Father’s Name <span className='labelerrorssss'>*</span></label>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Control type="text" placeholder="Enter your father's name" onChange={(e) => setFatherName(e.target.value)} ref={fatherNameRef} />
                                </Form.Group>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>Father’s Occupation <span className='labelerrorssss'>*</span></label>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Control type="text" placeholder="Enter your father's occupation" onChange={(e) => setFatherOccupation(e.target.value)} ref={fatherOccupationRef} />
                                </Form.Group>
                            </Col>
                            <Col lg={3} className='mb-2'>
                                <label>Father’s Education <span className='labelerrorssss'>*</span></label>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Control type="text" placeholder="Enter your father's education" onChange={(e) => setFatherEducation(e.target.value)} ref={fatherEducationRef} />
                                </Form.Group>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>Mother’s Name <span className='labelerrorssss'>*</span></label>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Control type="text" placeholder="Enter your mother's name" onChange={(e) => setMotherName(e.target.value)} ref={motherNameRef} />
                                </Form.Group>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>Mother’s Occupation <span className='labelerrorssss'>*</span></label>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Control type="text" placeholder="Enter your mother's occupation" onChange={(e) => setMotherOccupation(e.target.value)} ref={motherOccupationRef} />
                                </Form.Group>
                            </Col>
                            <Col lg={3} className='mb-2'>
                                <label>Mother’s Education <span className='labelerrorssss'>*</span></label>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Control type="text" placeholder="Enter your mother's education" onChange={(e) => setMotherEducation(e.target.value)} ref={motherEducationRef} />
                                </Form.Group>
                            </Col>
                        </Row>
                        {siblings.map((sibling, index) => (
                            <div key={index}>
                                <Row>
                                    <Col lg={4} className='mb-2'>
                                        <label>Sibling’s Name</label>
                                        <Form.Group className="mb-3">
                                            <Form.Control type="text"
                                                placeholder="Enter name"
                                                value={sibling.name}
                                                onChange={(e) => handleSiblingChange(index, 'siblingName', e.target.value)}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col lg={4} className='mb-2'>
                                        <label>Marital Status</label>
                                        {/* <Form.Group className="mb-3" >
                                            <Form.Control type="text"
                                                placeholder="Enter your company"
                                                value={sibling.maritalStatus}
                                                onChange={(e) => handleSiblingChange(index, 'maritalStatus', e.target.value)}

                                            />
                                        </Form.Group> */}
                                        <Form.Select className='mb-3' onChange={(e) => handleSiblingChange(index, 'siblingMaritalStatus', e.target.value)}>
                                            <option hidden>Select Status</option>
                                            {maritalStatusList?.map((status, index) => (
                                                <option key={index} value={status._id}>{status.type}</option>
                                            ))}
                                        </Form.Select>

                                    </Col>
                                    <Col lg={3} className='mb-2'>
                                        <label>Sibling’s Education</label>
                                        <Form.Group className="mb-3" >
                                            <Form.Control type="text"
                                                placeholder="Enter education"
                                                defaultValue={sibling.education}
                                                onChange={(e) => handleSiblingChange(index, 'siblingEducation', e.target.value)}

                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col lg={1} className='mb-2'>
                                        <div className='plus'>
                                            <i className="fa fa-plus" aria-hidden="true" onClick={addSibling}></i>
                                            {index > 0 && (
                                                <i className="fa fa-minus" aria-hidden="true" onClick={() => removeSibling(index)}></i>
                                            )}
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='profilegallery mb-5'>
                    <h3 className='text-center'>Astronomic Information</h3>
                    <div className='descr-content'>
                        <Row>
                            <Col lg={4} className='mb-2'>
                                <label>Time Of Birth <span className='labelerrorssss'>*</span></label>
                                <Form.Group className="mb-3"  >
                                    <Form.Control type="time" placeholder="Enter your time of birth" onChange={(e) => setTimeOfBirth(e.target.value)} ref={timeOfBirthRef} />
                                </Form.Group>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>City Of Birth <span className='labelerrorssss'>*</span></label>
                                <Form.Group className="mb-3">
                                    <Form.Control type="text" placeholder="Enter your City of birth" onChange={(e) => setCityOfBirth(e.target.value)} ref={cityOfBirthRef} />
                                </Form.Group>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>Mangal Dosh <span className='labelerrorssss'>*</span></label>
                                <Form.Select className='mb-3' onChange={(e) => setMangalDosh(e.target.value)} ref={mangalDoshRef}>
                                    <option hidden>Select</option>
                                    <option value="YES">YES</option>
                                    <option value="NO">NO</option>
                                </Form.Select>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>Shani Dosh <span className='labelerrorssss'>*</span></label>
                                <Form.Select className='mb-3' onChange={(e) => setShanidosh(e.target.value)} ref={shanidoshRef}>
                                    <option hidden>Select</option>
                                    <option value="YES">YES</option>
                                    <option value="NO">NO</option>
                                </Form.Select>
                            </Col>
                        </Row>
                    </div>
                </div>
                <div className='profilegallery mb-5'>
                    <h3 className='text-center'>Life Style</h3>
                    <div className='descr-content'>
                        <Row>
                            <Col lg={4} className='mb-2'>
                                <label>Are you a fitness freak? <span className='labelerrorssss'>*</span></label>
                                <Form.Select className='mb-3' onChange={(e) => setFitnessFreak(e.target.value)} ref={fitnessFreakRef}>
                                    <option hidden>Select</option>
                                    <option value="YES">YES</option>
                                    <option value="NO">NO</option>
                                </Form.Select>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>Are you prepared to take on more responsibilities? <span className='labelerrorssss'>*</span></label>
                                <Form.Select className='mb-3' onChange={(e) => setMoreResponsibilities(e.target.value)} ref={moreResponsibilitiesRef}>
                                    <option hidden>Select</option>
                                    <option value="YES">YES</option>
                                    <option value="NO">NO</option>
                                </Form.Select>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>Do you like cooking? <span className='labelerrorssss'>*</span></label>
                                <Form.Select className='mb-3' onChange={(e) => setLikeCooking(e.target.value)} ref={likeCookingRef}>
                                    <option hidden>Select</option>
                                    <option value="YES">YES</option>
                                    <option value="NO">NO</option>
                                </Form.Select>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>Do you like traveling? <span className='labelerrorssss'>*</span></label>
                                <Form.Select className='mb-3' onChange={(e) => setLikeTraveling(e.target.value)} ref={likeTravelingRef}>
                                    <option hidden>Select</option>
                                    <option value="YES">YES</option>
                                    <option value="NO">NO</option>
                                </Form.Select>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>Are you and your family fine with your partner working after marriage? <span className='labelerrorssss'>*</span></label>
                                <Form.Select className='mb-3' onChange={(e) => setPartnerWorking(e.target.value)} ref={partnerWorkingRef}>
                                    <option hidden>Select</option>
                                    <option value="YES">YES</option>
                                    <option value="NO">NO</option>
                                </Form.Select>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>Are you spiritually strong? <span className='labelerrorssss'>*</span></label>
                                <Form.Select className='mb-3' onChange={(e) => setSpirituallyStrong(e.target.value)} ref={spirituallyStrongRef}>
                                    <option hidden>Select</option>
                                    <option value="YES">YES</option>
                                    <option value="NO">NO</option>
                                </Form.Select>
                            </Col>
                        </Row>
                    </div>
                </div>
                <div className='profilegallery mb-5'>
                    <h3 className='text-center'>Satsangi Details</h3>
                    <div className='descr-content'>
                        <Row>
                            <Col lg={4} className='mb-2'>
                                <label>Do you perform Nitya Pooja Daily? <span className='labelerrorssss'>*</span></label>
                                <Form.Select className='mb-3' onChange={(e) => setNityaPoojaDaily(e.target.value)} ref={nityaPoojaDailyRef}>
                                    <option hidden>Select</option>
                                    <option value="YES">YES</option>
                                    <option value="NO">NO</option>
                                </Form.Select>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>From which sanstha of swaminarayan you belongs to? <span className='labelerrorssss'>*</span></label>
                                <Form.Group className="mb-3">
                                    <Form.Control type="text" placeholder="Enter here" onChange={(e) => setSansthaName(e.target.value)} ref={sansthaNameRef} />
                                </Form.Group>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>Name of the Mandal <span className='labelerrorssss'>*</span></label>
                                <Form.Group className="mb-3">
                                    <Form.Control type="text" placeholder="Enter here" onChange={(e) => setMandalName(e.target.value)} ref={mandalNameRef} />
                                </Form.Group>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>Do you observe all fast prescribed in Sampradaya? <span className='labelerrorssss'>*</span></label>
                                <Form.Select className='mb-3' onChange={(e) => setSampradayaFast(e.target.value)} ref={sampradayaFastRef}>
                                    <option hidden>Select</option>
                                    <option value="YES">YES</option>
                                    <option value="NO">NO</option>
                                </Form.Select>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>Frequency of Temple Visits <span className='labelerrorssss'>*</span></label>
                                <Form.Group className="mb-3">
                                    <Form.Control type="text" placeholder="Enter here" onChange={(e) => setTempleVisit(e.target.value)} ref={templeVisitRef} />
                                </Form.Group>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>Do you Eat Onion/Garlic? <span className='labelerrorssss'>*</span></label>
                                <Form.Select className='mb-3' onChange={(e) => setEatOnionGarlic(e.target.value)} ref={eatOnionGarlicRef}>
                                    <option hidden>Select</option>
                                    <option value="YES">YES</option>
                                    <option value="NO">NO</option>
                                </Form.Select>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>Do you Perform Aarti, Evening Ghar Sabha etc? <span className='labelerrorssss'>*</span></label>
                                <Form.Select className='mb-3' onChange={(e) => setAarti(e.target.value)} ref={aartiRef}>
                                    <option hidden>Select</option>
                                    <option value="YES">YES</option>
                                    <option value="NO">NO</option>
                                </Form.Select>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>Do you wear Kanthi? <span className='labelerrorssss'>*</span></label>
                                <Form.Select className='mb-3' onChange={(e) => setWearKanthi(e.target.value)} ref={wearKanthiRef}>
                                    <option hidden>Select</option>
                                    <option value="YES">YES</option>
                                    <option value="NO">NO</option>
                                </Form.Select>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>Any Volunteer Activities? <span className='labelerrorssss'>*</span></label>
                                <Form.Select className='mb-3' onChange={(e) => setVolunteerActivities(e.target.value)} ref={volunteerActivitiesRef}>
                                    <option hidden>Select</option>
                                    <option value="YES">YES</option>
                                    <option value="NO">NO</option>
                                </Form.Select>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>Define Yourself as Satsangi <span className='labelerrorssss'>*</span></label>
                                <Form.Group className="mb-3">
                                    <Form.Control as="textarea"
                                        rows={3}
                                        placeholder="Enter here"
                                        value={define}
                                        onChange={(e) => setDefine(e.target.value)}
                                        ref={defineRef}
                                    />
                                </Form.Group>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>Do you make Tilak Chandlo? <span className='labelerrorssss'>*</span></label>
                                <Form.Select className='mb-3' onChange={(e) => setTilakChandlo(e.target.value)} ref={tilakChandloRef}>
                                    <option hidden>Select</option>
                                    <option value="YES">YES</option>
                                    <option value="NO">NO</option>
                                </Form.Select>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>Do you attend shibir? <span className='labelerrorssss'>*</span></label>
                                <Form.Select className='mb-3' onChange={(e) => setShibir(e.target.value)} ref={shibirRef}>
                                    <option hidden>Select</option>
                                    <option value="YES">YES</option>
                                    <option value="NO">NO</option>
                                </Form.Select>
                            </Col>
                        </Row>
                    </div>
                </div>
                <div className='profilegallery mb-5'>
                    <h3 className='text-center'>Upload Your Multiple Photos <span className='labelerrorssss'>*</span></h3>
                    <div className='descr-content'>
                        <div className="image-upload">
                            <label style={{ cursor: "pointer" }} htmlFor="file_upload">
                                <img src="" alt="" className="uploaded-image" />
                                <div className="h-100">
                                    <div className="dplay-tbl">
                                        <div className="dplay-tbl-cell">
                                            <i className="fa fa-cloud-upload" />
                                            <h5>
                                                <b>Choose Your Image to Upload</b>
                                            </h5>
                                            <h6 className="mt-10 mb-70">Or Drop Your Image Here</h6>
                                        </div>
                                    </div>
                                </div>
                                {/*upload-content*/}
                                <input
                                    data-required="image"
                                    type="file"
                                    name="image_name"
                                    id="file_upload"
                                    className="image-input"
                                    data-traget-resolution="image_resolution"
                                    defaultValue=""
                                    onChange={handlePhotosChange}
                                    multiple
                                    accept=".jpg, .jpeg, .png"
                                    ref={photosRef}
                                />
                            </label>


                        </div>
                        <div>
                            <Row>
                                {previewPhotos?.map((photo, index) => (
                                    <Col lg={2} key={index}>
                                        <div className='photo-container mb-2'>
                                            <img src={photo} alt="Photo" className="photoorodfd" />
                                            <button className='remove' onClick={() => removePhoto(index)}><span className='cross'>x</span></button>
                                        </div>
                                    </Col>
                                ))}
                            </Row>
                        </div>
                    </div>
                </div>
                {loading == true ?
                    <button className='submitforms' disabled>Please wait...</button>
                    :
                    <button className='submitforms' onClick={handleSubmit}>Submit Form</button>
                }
            </Container>
        </div>
    )
}

export default Matrimonialform
