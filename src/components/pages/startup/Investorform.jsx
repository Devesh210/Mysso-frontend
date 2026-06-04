import React, { useState, useEffect, useRef } from 'react'
import { Col, Container, Form, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import profile from "../../../assets/profile.png"
import companylogo from "../../../assets/companylogo.png"
import swal from 'sweetalert';
import PhoneInput, { formatPhoneNumber, formatPhoneNumberIntl, isValidPhoneNumber } from "react-phone-number-input";
import en from 'react-phone-number-input/locale/en';
import 'react-phone-number-input/style.css'
import Select from 'react-select';
import API_URL from '../../../../config';

const Investorform = () => {
    const Navigate = useNavigate();


    const [countryList, setCountryList] = useState([]);
    const [statelist, setStateList] = useState([]);
    const [cityList, setCitylist] = useState([]);
    const [industryList, setIndustryList] = useState([]);
    const [startupStageList, setStartupStageList] = useState([]);
    const [revenueModelList, setRevenueModelList] = useState([]);
    const [investmentTypeList, setInvestmentTypeList] = useState([]);
    const [investmentStageList, setInvestmentStagelist] = useState([]);
    const [exitstrategyList, setExitstrategyList] = useState([]);

    //Personal Information
    const [fullName, setFullName] = useState('');
    const [emailid, setEmailId] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isPhoneValid, setIsPhoneValid] = useState(true);
    const [linkedIn, setLinkedIn] = useState('');
    const [country_id, setCountry_id] = useState('');
    const [state_id, setState_id] = useState('');
    const [city_id, setCity_id] = useState('');
    const [timezone, setTimezone] = useState('');

    //Professional Background
    const [currentRole, setCurrentRole] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [investorIndustry, setInvestorIndustry] = useState('');
    const [yearofexperience, setYearOfExperience] = useState('');
    const [professionalbio, setProfessionalBio] = useState('');
    const [previousInvestments, setPreviousInvestments] = useState('');

    //Investment Preferences
    const [preferredInvestmentStage, setPreferredInvestmentStage] = useState('');
    const [preferredIndustrySectors, setPreferredIndustrySectors] = useState('');
    const [preferredGeographic, setPreferredGeographic] = useState('');
    const [minimumInvestmentAmount, setMinimumInvestmentAmount] = useState('');
    const [maximumInvestmentAmount, setMaximumInvestmentAmount] = useState('');
    const [preferredInvestmentType, setPreferredInvestmentType] = useState('');

    //Startup Characteristics
    const [preferredStartupStage, setPreferredStartupStage] = useState('');
    const [revenuemodel, setRevenuemodel] = useState('');

    //Investment Experience
    const [startupsInvested, setStartupsInvested] = useState('');
    const [notableInvestments, setNotableInvestments] = useState('');
    const [averageHoldingPeriod, setAverageHoldingPeriod] = useState('');
    const [exitStrategiesPreferred, setExitStrategiesPreferred] = useState('');
    const [successStories, setSuccessStories] = useState('');

    const [loading, setLoading] = useState(false);


    const fullNameRef = useRef();
    const emailRef = useRef();
    const phoneRef = useRef();
    const linkedInRef = useRef();
    const countryRef = useRef();
    const stateRef = useRef();
    const cityRef = useRef();
    const timezoneRef = useRef();
    const currentRoleRef = useRef();
    const companyNameRef = useRef();
    const investorIndustryRef = useRef();
    const yearOfExperienceRef = useRef();
    const professionalBioRef = useRef();
    const previousInvestmentsRef = useRef();
    const preferredInvestmentStageRef = useRef();
    const preferredIndustrySectorsRef = useRef();
    const preferredGeographicRef = useRef();
    const minimumInvestmentAmountRef = useRef();
    const maximumInvestmentAmountRef = useRef();
    const preferredInvestmentTypeRef = useRef();
    const preferredStartupStageRef = useRef();
    const revenueModelRef = useRef();
    const startupsInvestedRef = useRef();
    const notableInvestmentsRef = useRef();
    const averageHoldingPeriodRef = useRef();
    const exitStrategiesPreferredRef = useRef();
    const successStoriesRef = useRef();




    useEffect(() => {
        if (localStorage.getItem('token')) {
            fetchAllData();
        } else {
            Navigate('/login');
        }
    }, []);

    useEffect(() => {
        getState()
    }, [country_id])

    useEffect(() => {
        getCity()
    }, [state_id])


    const fetchAllData = async () => {
        try {
            await Promise.all([
                fetchData('countryList', setCountryList),
                fetchData('getstartupIndustryType', setIndustryList),
                fetchData('getstartupStage', setStartupStageList),
                fetchData('getstartupRevenue', setRevenueModelList),
                fetchData('getstartupinvestmentType', setInvestmentTypeList),
                fetchData('getpreferredinvestmentStage', setInvestmentStagelist),
                fetchData('getexitstrategy', setExitstrategyList)


            ]);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const fetchData = async (endpoint, setter) => {
        try {
            const response = await fetch(`${API_URL}/api/${endpoint}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });
            const data = await response.json();
            if (response.ok) {
                setter(data.data);
            } else {
                throw new Error(data.message || 'Failed to fetch data');
            }
        } catch (error) {
            console.error(`Error fetching ${endpoint}:`, error.message);
        }
    };


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
                    setCitylist(data.data);
                })
        }
        catch (err) {
            console.error(err.message);
        }
    }

    const handleCountrychange = (e) => {
        setCountry_id(e.target.value)
        setStateList([])
        setState_id('')
        setCitylist([])
        setCity_id([])
    }

    const handleStatechange = (e) => {
        setState_id(e.target.value)
        setCitylist([])
        setCity_id([])
    }

    const handleCitychange = (e) => {
        setCity_id(e.target.value)
    }

    // Handle multi-select change
    const handleInvestmentStageChange = (selectedOptions) => {
        setPreferredInvestmentStage(selectedOptions); // This will contain an array of selected options
    };

    // Map investmentStageList to react-select format
    const investmentOptions = investmentStageList?.map((val) => ({
        value: val._id,
        label: val.preferred_investment_stage,
    }));

    const handleIndustryChange = (selectedOptions) => {
        setPreferredIndustrySectors(selectedOptions);
    };

    // Convert industryList to the format required by react-select
    const industryOptions = industryList.map(industry => ({
        value: industry._id,
        label: industry.startup_industry,
    }));

    const handleInvestmentTypeChange = (selectedOptions) => {
        setPreferredInvestmentType(selectedOptions);
    };

    // Convert investmentTypeList to the format required by react-select
    const investmentTypeOptions = investmentTypeList.map(investmentType => ({
        value: investmentType._id,
        label: investmentType.startup_investment,
    }));


    const handleStartupStageChange = (selectedOptions) => {
        setPreferredStartupStage(selectedOptions);
    };


    // Convert lists to options format for react-select
    const startupStageOptions = startupStageList.map(stage => ({
        value: stage._id,
        label: stage.startup_stage,
    }));

    const handleRevenueModelChange = (selectedOptions) => {
        setRevenuemodel(selectedOptions);
    };

    const revenueModelOptions = revenueModelList.map(model => ({
        value: model._id,
        label: model.startup_revenue,
    }));

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            if (!fullName){
                swal({
                    text: 'Please Enter Full Name',
                    icon: "warning",
                });
                fullNameRef.current.focus();
                return false;
            }
            else if (!emailid){
                swal({
                    text: 'Please Enter Email Address',
                    icon: "warning",
                });
                emailRef.current.focus();
                return false;
            }
            else if (emailid && !/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/.test(emailid)) {
                swal({
                    text: 'Please Enter Valid Email Address',
                    icon: "warning",
                });
                emailRef.current.focus();
                return false;
            }
            else if (!phoneNumber){
                swal({
                    text: 'Please Enter Phone Number',
                    icon: "warning",    
                });
                phoneRef.current.focus();
                return false;
            }
            else if (!isPhoneValid){
                swal({
                    text: 'Please Enter Valid Phone Number',
                    icon: "warning",
                });
                phoneRef.current.focus();
                return false;
            }
            else if (!country_id){
                swal({
                    text: 'Please Select Country',
                    icon: "warning",
                });
                countryRef.current.focus();
                return false;
            }
            else if (!state_id){
                swal({
                    text: 'Please Select State',
                    icon: "warning",
                });
                stateRef.current.focus();
                return false;
            }
            else if (!city_id){
                swal({
                    text: 'Please Select City',
                    icon: "warning",
                });
                cityRef.current.focus();
                return false;
            }
            else if (!timezone){
                swal({
                    text: 'Please Select Timezone',
                    icon: "warning",
                });
                timezoneRef.current.focus();
                return false;
            }
            else if (!currentRole){
                swal({
                    text: 'Please Enter Current Role/Title',
                    icon: "warning",
                });
                currentRoleRef.current.focus();
                return false;
            }
            else if (!companyName){
                swal({
                    text: 'Please Enter Company Name',
                    icon: "warning",
                });
                companyNameRef.current.focus();
                return false;
            }
            // else if (!investorIndustry){
            //     swal({
            //         text: 'Please Select Industry',
            //         icon: "warning",
            //     });
            //     investorIndustryRef.current.focus();
            //     return false;
            // }
            else if (!yearofexperience){
                swal({
                    text: 'Please Enter Years of Experience',
                    icon: "warning",
                });
                yearOfExperienceRef.current.focus();
                return false;
            }
            else if (!professionalbio){
                swal({
                    text: 'Please Enter Professional Summary/Bio',
                    icon: "warning",
                });
                professionalBioRef.current.focus();
                return false;
            }
            else if (!previousInvestments){
                swal({
                    text: 'Please Enter Previous Investments',
                    icon: "warning",
                });
                previousInvestmentsRef.current.focus();
                return false;
            }
            else if (!preferredInvestmentStage){
                swal({
                    text: 'Please Select Preferred Investment Stage',
                    icon: "warning",
                });
                preferredInvestmentStageRef.current.focus();
                return false;
            }
            else if (!preferredIndustrySectors){
                swal({
                    text: 'Please Select Preferred Industry Sectors',
                    icon: "warning",
                });
                preferredIndustrySectorsRef.current.focus();
                return false;
            }
            else if (!preferredGeographic){
                swal({
                    text: 'Please Select Geographic Preferences',
                    icon: "warning",
                });
                preferredGeographicRef.current.focus();
                return false;
            }
            else if (!minimumInvestmentAmount){
                swal({
                    text: 'Please Enter Minimum Investment Amount',
                    icon: "warning",
                });
                minimumInvestmentAmountRef.current.focus();
                return false;
            }
            else if (!maximumInvestmentAmount){
                swal({
                    text: 'Please Enter Maximum Investment Amount',
                    icon: "warning",
                });
                maximumInvestmentAmountRef.current.focus();
                return false;
            }
            else if (!preferredInvestmentType){
                swal({
                    text: 'Please Select Preferred Investment Type',
                    icon: "warning",
                });
                preferredInvestmentTypeRef.current.focus();
                return false;
            }
            else if (!preferredStartupStage){
                swal({
                    text: 'Please Select Preferred Startup Stage',
                    icon: "warning",
                });
                preferredStartupStageRef.current.focus();
                return false;
            }
            else if (!revenuemodel){
                swal({
                    text: 'Please Select Revenue Model',
                    icon: "warning",
                });
                revenueModelRef.current.focus();
                return false;
            }
            else if (!startupsInvested){
                swal({
                    text: 'Please Enter Startups Invested',
                    icon: "warning",
                });
                startupsInvestedRef.current.focus();
                return false;
            }
            else if (!notableInvestments){
                swal({
                    text: 'Please Enter Notable Investments',
                    icon: "warning",
                });
                notableInvestmentsRef.current.focus();
                return false;
            }
            else if (!averageHoldingPeriod){
                swal({
                    text: 'Please Enter Average Holding Period',
                    icon: "warning",
                });
                averageHoldingPeriodRef.current.focus();
                return false;
            }
            else if (!exitStrategiesPreferred){
                swal({
                    text: 'Please Enter Exit Strategies Preferred',
                    icon: "warning",
                });
                exitStrategiesPreferredRef.current.focus();
                return false;
            }
            else if (!successStories){
                swal({
                    text: 'Please Enter Success Stories',
                    icon: "warning",
                });
                successStoriesRef.current.focus();
                return false;
            }

            setLoading(true);


            const InvestmentStage_len = preferredInvestmentStage?.length;
            const preferredInvestmentStage_arr = [];
            for (let i = 0; i < InvestmentStage_len; i++) {
                preferredInvestmentStage_arr?.push(preferredInvestmentStage[i]?.value);
            }

            console.log("preferredInvestmentStage_arr", preferredInvestmentStage_arr)

            const preferredIndustrySectors_len = preferredIndustrySectors?.length;
            const preferredIndustrySectors_arr = [];
            for (let i = 0; i < preferredIndustrySectors_len; i++) {
                preferredIndustrySectors_arr?.push(preferredIndustrySectors[i]?.value);
            }

            console.log("preferredIndustrySectors_arr", preferredIndustrySectors_arr)

            const preferredInvestmentType_len = preferredInvestmentType?.length;
            const preferredInvestmentType_arr = [];
            for (let i = 0; i < preferredInvestmentType_len; i++) {
                preferredInvestmentType_arr?.push(preferredInvestmentType[i]?.value);
            }

            console.log("preferredInvestmentType_arr", preferredInvestmentType_arr)

            const preferredStartupStage_len = preferredStartupStage?.length;
            const preferredStartupStage_arr = [];
            for (let i = 0; i < preferredStartupStage_len; i++) {
                preferredStartupStage_arr?.push(preferredStartupStage[i]?.value);
            }

            console.log("preferredStartupStage_arr", preferredStartupStage_arr)

            const revenuemodel_len = revenuemodel?.length;
            const revenuemodel_arr = [];
            for (let i = 0; i < revenuemodel_len; i++) {
                revenuemodel_arr.push(revenuemodel[i]?.value);
            }

            console.log("revenuemodel_arr", revenuemodel_arr)

            const formdata = 
               { 'fullName': fullName,
                'emailid': emailid,
                'phoneNumber': phoneNumber,
                'linkedIn': linkedIn,
                'country_id': country_id,
                'state_id': state_id,
                'city_id': city_id,
                'timezone': timezone,

                'currentRole': currentRole, 
                'companyName': companyName,
                'investorIndustry': investorIndustry,
                'yearofexperience': yearofexperience,
                'professionalbio': professionalbio,
                'previousInvestments': previousInvestments,

                'preferredInvestmentStage': JSON.stringify(preferredInvestmentStage_arr),
                'preferredIndustrySectors': JSON.stringify(preferredIndustrySectors_arr),
                'preferredGeographic': preferredGeographic,
                'minimumInvestmentAmount': minimumInvestmentAmount,
                'maximumInvestmentAmount': maximumInvestmentAmount,
                'preferredInvestmentType': JSON.stringify(preferredInvestmentType_arr),

                'preferredStartupStage': JSON.stringify(preferredStartupStage_arr),
                'revenuemodel': JSON.stringify(revenuemodel_arr),

                'startupsInvested': startupsInvested,
                'notableInvestments': notableInvestments,
                'averageHoldingPeriod': averageHoldingPeriod,
                'exitStrategiesPreferred': exitStrategiesPreferred,
                'successStories': successStories,
               }

                console.log(Array.from(formdata));

            // return false;

            const requestoptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}` 
                },
                body: JSON.stringify({formdata}),
            };
            await fetch(`${API_URL}/api/addInvestordata`, requestoptions)
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

        } catch (error) {
            console.error(error.message);
        }
    };

    const handlePhoneChange = (value) => {
        setPhoneNumber(value);
        if (value === '' || value === undefined) {
            setIsPhoneValid(true);
        } else {
            setIsPhoneValid(isValidPhoneNumber(value));
        }
    };

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
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Control type="text" placeholder="Enter Full Name" onChange={(e) => setFullName(e.target.value)} ref={fullNameRef}/>
                                </Form.Group>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>Email Address <span className='labelerrorssss'>*</span></label>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Control type="text" placeholder="Enter Email Address" onChange={(e) => setEmailId(e.target.value)} ref={emailRef} />
                                </Form.Group>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>Phone Number <span className='labelerrorssss'>*</span></label>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <PhoneInput
                                    className={`form-control ${!isPhoneValid ? 'is-invalid' : ''}`}
                                    defaultCountry="IN"
                                    international
                                    countryCallingCodeEditable={false}
                                    localization={en}
                                    placeholder="Enter your Mobile Number"
                                    value={phoneNumber}
                                    onChange={handlePhoneChange}
                                    ref={phoneRef}
                                />
                                </Form.Group> 
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>LinkedIn Profile </label>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Control type="text" placeholder="Enter LinkedIn Profile" onChange={(e) => setLinkedIn(e.target.value)}  />
                                </Form.Group>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>Country <span className='labelerrorssss'>*</span></label>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Select className='mb-3' onChange={handleCountrychange} ref={countryRef}>
                                        <option hidden>Select Country</option>
                                        {countryList?.map((country, index) => (
                                            <option key={index} value={country._id}>{country.country_name}</option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>State <span className='labelerrorssss'>*</span></label>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Select className='mb-3' onChange={handleStatechange} ref={stateRef}>
                                        <option hidden>Select State</option>
                                        {statelist?.map((state, index) => (
                                            <option key={index} value={state._id}>{state.state_name}</option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>City <span className='labelerrorssss'>*</span></label>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Select className='mb-3' onChange={handleCitychange} ref={cityRef}>
                                        <option hidden>Select City</option>
                                        {cityList?.map((city, index) => (
                                            <option key={index} value={city._id}>{city.city_name}</option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>Timezone <span className='labelerrorssss'>*</span></label>
                                <Form.Group className="mb-3" controlId="timezone">
                                    <Form.Select className='mb-3' onChange={(e) => setTimezone(e.target.value)} ref={timezoneRef}>
                                        <option hidden>Select Timezone</option>
                                        <option value="International Date Line West (UTC-12:00)">International Date Line West (UTC-12:00)</option>
                                        <option value="Coordinated Universal Time-11 (UTC-11:00)">Coordinated Universal Time-11 (UTC-11:00)</option>
                                        <option value="Hawaii Standard Time (UTC-10:00)">Hawaii Standard Time (UTC-10:00)</option>
                                        <option value="Alaska Standard Time (UTC-09:00)">Alaska Standard Time (UTC-09:00)</option>
                                        <option value="Pacific Standard Time (US & Canada) (UTC-08:00)">Pacific Standard Time (US & Canada) (UTC-08:00)</option>
                                        <option value="Mountain Standard Time (US & Canada) (UTC-07:00)">Mountain Standard Time (US & Canada) (UTC-07:00)</option>
                                        <option value="Central Standard Time (US & Canada) (UTC-06:00)">Central Standard Time (US & Canada) (UTC-06:00)</option>
                                        <option value="Eastern Standard Time (US & Canada) (UTC-05:00)">Eastern Standard Time (US & Canada) (UTC-05:00)</option>
                                        <option value="Atlantic Standard Time (Canada) (UTC-04:00)">Atlantic Standard Time (Canada) (UTC-04:00)</option>
                                        <option value="Argentina Standard Time (UTC-03:00)">Argentina Standard Time (UTC-03:00)</option>
                                        <option value="Coordinated Universal Time-02 (UTC-02:00)">Coordinated Universal Time-02 (UTC-02:00)</option>
                                        <option value="Azores Standard Time (UTC-01:00)">Azores Standard Time (UTC-01:00)</option>
                                        <option value="Greenwich Mean Time (GMT) (UTC+00:00)">Greenwich Mean Time (GMT) (UTC+00:00)</option>
                                        <option value="Central European Time (UTC+01:00)">Central European Time (UTC+01:00)</option>
                                        <option value="Eastern European Time (UTC+02:00)">Eastern European Time (UTC+02:00)</option>
                                        <option value="Moscow Standard Time (UTC+03:00)">Moscow Standard Time (UTC+03:00)</option>
                                        <option value="Iran Standard Time (UTC+03:30)">Iran Standard Time (UTC+03:30)</option>
                                        <option value="Gulf Standard Time (UTC+04:00)">Gulf Standard Time (UTC+04:00)</option>
                                        <option value="Afghanistan Time (UTC+04:30)">Afghanistan Time (UTC+04:30)</option>
                                        <option value="Pakistan Standard Time (UTC+05:00)">Pakistan Standard Time (UTC+05:00)</option>
                                        <option value="India Standard Time (UTC+05:30)">India Standard Time (UTC+05:30)</option>
                                        <option value="Bangladesh Standard Time (UTC+06:00)">Bangladesh Standard Time (UTC+06:00)</option>
                                        <option value="Indochina Time (UTC+07:00)">Indochina Time (UTC+07:00)</option>
                                        <option value="China Standard Time (UTC+08:00)">China Standard Time (UTC+08:00)</option>
                                        <option value="Japan Standard Time (UTC+09:00)">Japan Standard Time (UTC+09:00)</option>
                                        <option value="Australian Eastern Standard Time (UTC+10:00)">Australian Eastern Standard Time (UTC+10:00)</option>
                                        <option value="Solomon Islands Time (UTC+11:00)">Solomon Islands Time (UTC+11:00)</option>
                                        <option value="Fiji Time (UTC+12:00)">Fiji Time (UTC+12:00)</option>
                                        <option value="Tonga Time (UTC+13:00)">Tonga Time (UTC+13:00)</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>


                        </Row>
                    </div>
                </div>

                <div className='profilegallery mb-5'>
                    <h3 className='text-center'>Professional Background</h3>
                    <div className='descr-content'>
                        <Row>
                            <Col lg={4} className='mb-2'>
                                <label>Current Role/Title <span className='labelerrorssss'>*</span></label>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Control type="text" placeholder="Enter Current Role/Title" onChange={(e) => setCurrentRole(e.target.value)} ref={currentRoleRef} />
                                </Form.Group>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>Company Name <span className='labelerrorssss'>*</span></label>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Control type="text" placeholder="Enter Company Name" onChange={(e) => setCompanyName(e.target.value)} ref={companyNameRef} />
                                </Form.Group>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>Industry </label>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Select className='mb-3' onChange={(e) => setInvestorIndustry(e.target.value)} >
                                        <option hidden>Select Industry</option>
                                        {industryList?.map((val, index) => (
                                            <option key={index} value={val._id}>{val.startup_industry}</option>
                                        ))}

                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>Years of Experience <span className='labelerrorssss'>*</span></label>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Control type="text" placeholder="Enter Years of Experience" onInput={allowOnlyNumbers} onChange={(e) => setYearOfExperience(e.target.value)} ref={yearOfExperienceRef} />
                                </Form.Group>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>Professional Summary/Bio <span className='labelerrorssss'>*</span></label>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        placeholder="Enter Professional Summary/Bio"
                                        onChange={(e) => setProfessionalBio(e.target.value)}
                                        ref={professionalBioRef}
                                        style={{ height: '180px' }}
                                    />
                                </Form.Group>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>Previous Investments (if any) <span className='labelerrorssss'>*</span><p className='inputhelper'>(If None then Specify None)</p></label>
                                
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        placeholder="Enter Previous Investments"
                                        onChange={(e) => setPreviousInvestments(e.target.value)}
                                        ref={previousInvestmentsRef}
                                        style={{ height: '160px' }}
                                    />
                                </Form.Group>
                            </Col>

                        </Row>
                    </div>
                </div>

                <div className='profilegallery mb-5'>
                    <h3 className='text-center'>Investment Preferences</h3>
                    <div className='descr-content'>
                        <Row>
                            <Col lg={4} className='mb-2'>
                                <label>Preferred Investment Stage <span className='labelerrorssss'>*</span></label>
                                <Form.Group className="mb-3 multiselect" controlId="formBasicEmail">
                                    <Select
                                        closeMenuOnSelect={false}
                                        isMulti // Enables multi-select
                                        options={investmentOptions} // Options to be displayed in the dropdown
                                        value={preferredInvestmentStage} // The currently selected values
                                        onChange={handleInvestmentStageChange} // Handles the selection
                                        className="mb-3 custom-select-class"
                                        placeholder="Select Preferred Investment Stage"
                                        ref={preferredInvestmentStageRef}
                                    />
                                </Form.Group>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>Preferred Industry Sectors <span className='labelerrorssss'>*</span></label>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Select
                                        closeMenuOnSelect={false}
                                        isMulti
                                        options={industryOptions}
                                        value={preferredIndustrySectors}
                                        onChange={handleIndustryChange}
                                        className="mb-3 custom-select-class"
                                        placeholder="Select Preferred Industry Sectors"
                                        ref={preferredIndustrySectorsRef}
                                    />
                                </Form.Group>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>Geographic Preferences <span className='labelerrorssss'>*</span></label>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Select className='mb-3' onChange={(e) => setPreferredGeographic(e.target.value)} ref={preferredGeographicRef}>
                                        <option hidden>Select Geographic Preferences</option>
                                        <option value='National'>National</option>
                                        <option value='International'>International</option>
                                        <option value='Both'>Both National & international</option>


                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>Minimum Investment Amount <span className='labelerrorssss'>*</span></label>
                                <Form.Group className="mb-3" controlId="formBasicEmail"  >
                                    <Form.Control type="text" placeholder="Enter Minimum Investment Amount" onInput={allowOnlyNumbers} onChange={(e) => setMinimumInvestmentAmount(e.target.value)} ref={minimumInvestmentAmountRef} />
                                </Form.Group>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>Maximum Investment Amount <span className='labelerrorssss'>*</span></label>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Control type="text" placeholder="Enter Maximum Investment Amount" onInput={allowOnlyNumbers} onChange={(e) => setMaximumInvestmentAmount(e.target.value)} ref={maximumInvestmentAmountRef} />
                                </Form.Group>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>Preferred Investment Types <span className='labelerrorssss'>*</span></label>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Select
                                        closeMenuOnSelect={false}
                                        isMulti
                                        options={investmentTypeOptions}
                                        value={preferredInvestmentType}
                                        onChange={handleInvestmentTypeChange}
                                        className="mb-3 custom-select-class"
                                        placeholder="Select Preferred Investment Types"
                                        ref={preferredInvestmentTypeRef}
                                    />
                                </Form.Group>
                            </Col>

                        </Row>
                    </div>
                </div>

                <div className='profilegallery mb-5'>
                    <h3 className='text-center'>Startup Characteristics</h3>
                    <div className='descr-content'>
                        <Row>
                            <Col lg={4} className='mb-2'>
                                <label>Startup Stage Preference <span className='labelerrorssss'>*</span></label>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Select
                                        closeMenuOnSelect={false}
                                        isMulti
                                        options={startupStageOptions}
                                        value={preferredStartupStage}
                                        onChange={handleStartupStageChange}
                                        className="mb-3 custom-select-class"
                                        placeholder="Select Startup Stage Preference"
                                        ref={preferredStartupStageRef}
                                    />
                                </Form.Group>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>Revenue Model <span className='labelerrorssss'>*</span></label>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Select
                                        closeMenuOnSelect={false}
                                        isMulti
                                        options={revenueModelOptions}
                                        value={revenuemodel}
                                        onChange={handleRevenueModelChange}
                                        className="mb-3 custom-select-class"
                                        placeholder="Select Revenue Model"
                                        ref={revenueModelRef}
                                    />
                                </Form.Group>
                            </Col>

                        </Row>
                    </div>
                </div>

                <div className='profilegallery mb-5'>
                    <h3 className='text-center'>Investment Experience</h3>
                    <div className='descr-content'>
                        <Row>
                            <Col lg={4} className='mb-2'>
                                <label>Number of Startups Invested In <span className='labelerrorssss'>*</span></label>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Control type="text" placeholder="Enter Number of Startups Invested In" onInput={allowOnlyNumbers} onChange={(e) => setStartupsInvested(e.target.value)} ref={startupsInvestedRef} />
                                </Form.Group>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>Notable Investments <span className='labelerrorssss'>*</span></label>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        placeholder="Enter Notable Investments"
                                        onChange={(e) => setNotableInvestments(e.target.value)}
                                        ref={notableInvestmentsRef}
                                        style={{ height: '180px' }}
                                    />
                                </Form.Group>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>Average Holding Period <span className='labelerrorssss'>*</span></label>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Control type="text" placeholder="Enter Average Holding Period" onChange={(e) => setAverageHoldingPeriod(e.target.value)} ref={averageHoldingPeriodRef} />
                                </Form.Group>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>Exit Strategies Preferred <span className='labelerrorssss'>*</span></label>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Select className='mb-3' onChange={(e) => setExitStrategiesPreferred(e.target.value)} ref={exitStrategiesPreferredRef}>
                                        <option hidden>Select Exit Strategies Preferred</option>
                                        {exitstrategyList?.map((val, index) => (
                                            <option key={index} value={val._id}>{val.exit_strategy}</option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>Success Stories <span className='labelerrorssss'>*</span></label>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        placeholder="Enter Success Stories"
                                        onChange={(e) => setSuccessStories(e.target.value)}
                                        ref={successStoriesRef}
                                        style={{ height: '180px' }}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                    </div>
                </div>
                {loading ?
                    <button className='submitforms' disabled>Please wait...</button>
                    :
                    <button className='submitforms' onClick={handleSubmit}>Submit Form</button>
                }
            </Container>
        </div>
    )
}

export default Investorform;