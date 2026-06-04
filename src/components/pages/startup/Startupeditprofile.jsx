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

const Startupeditprofile = () => {
    const Navigate = useNavigate();

    const [businessTypeList, setBusinessTypeList] = useState([]);
    const [countryList, setCountryList] = useState([]);
    const [industryList, setIndustryList] = useState([]);
    const [startupStageList, setStartupStageList] = useState([]);
    const [revenueModelList, setRevenueModelList] = useState([]);
    const [investmentTypeList, setInvestmentTypeList] = useState([]);

    //Company Information
    const [companyName, setCompanyName] = useState('');
    const [businessType, setBusinessType] = useState('');
    const [registrationNumber, setRegistrationNumber] = useState('');
    const [dateOfIncorporation, setDateOfIncorporation] = useState('');
    const [countryOfIncorporation, setCountryOfIncorporation] = useState('');
    const [businessAddress, setBusinessAddress] = useState('');
    const [contactInformation, setContactInformation] = useState('');
    const [isPhoneValid, setIsPhoneValid] = useState(true);
    const [businessEmail, setBusinessEmail] = useState('');
    const [image, setImage] = useState(companylogo);
    const [companyLogo, setCompanyLogo] = useState([]);


    //Founders/owners Information
    const [founderName, setFounderName] = useState('');
    const [founderDOB, setFounderDOB] = useState('');
    const [founderNationality, setFounderNationality] = useState('');
    const [founderID, setFounderID] = useState('');
    const [founderAddress, setFounderAddress] = useState('');
    const [founderEmail, setFounderEmail] = useState('');
    const [founderContact, setFounderContact] = useState('');
    const [isfounderPhoneValid, setIsFounderPhoneValid] = useState(true);

    //Business Operation Details
    const [industry, setIndustry] = useState('');
    const [businessActivity, setBusinessActivity] = useState('');
    const [numOfEmployees, setNumOfEmployees] = useState('');
    const [annualRevenue, setAnnualRevenue] = useState('');
    const [startupStage, setStartupStage] = useState('');
    const [revenueModel, setRevenueModel] = useState('');
    const [bankDetails, setBankDetails] = useState('');

    //Legal and Compliance
    const [taxNumber, setTaxNumber] = useState('');
    const [legalAgreements, setLegalAgreements] = useState('');
    const [intellectualpropertyDetails, setIntellectualPropertyDetails] = useState('');
    const [complianceCerts, setComplianceCerts] = useState('');

    //Investment Requirements
    const [investmentType, setInvestmentType] = useState([]);
    const [investorExperience, setInvestorExperience] = useState('');
    const [minInvestment, setMinInvestment] = useState('');
    const [maxInvestment, setMaxInvestment] = useState('');

    //Additional Information
    const [previousFunding, setPreviousFunding] = useState('');
    const [businessPlan, setBusinessPlan] = useState('');
    const [pitchDeck, setPitchDeck] = useState('');
    const [referenceContacts, setReferenceContacts] = useState('');
    const [loading, setLoading] = useState(false);

    const [startupdata, setStartupdata] = useState([])
    const [id, setId] = useState('');



    const companyNameRef = useRef(null);
    const businessTypeRef = useRef(null);
    const registrationNumberRef = useRef(null);
    const dateOfIncorporationRef = useRef(null);
    const countryOfIncorporationRef = useRef(null);
    const contactInformationRef = useRef(null);
    const businessemailRef = useRef(null);
    const founderNameRef = useRef(null);
    const founderDOBRef = useRef(null);
    const founderNationalityRef = useRef(null);
    const founderIDRef = useRef(null);
    const founderAddressRef = useRef(null);
    const founderContactRef = useRef(null);
    const email = useRef(null);
    const industryRef = useRef(null);
    const businessActivityRef = useRef(null);
    const startupStageRef = useRef(null);
    const revenueModelRef = useRef(null);
    const taxNumberRef = useRef(null);
    const investmentTypeRef = useRef(null);
    const investorExperienceRef = useRef(null);
    const minInvestmentRef = useRef(null);
    const maxInvestmentRef = useRef(null);
    const pitchDeckRef = useRef(null);

    useEffect(() => {
        if (localStorage.getItem('token')) {
            fetchAllData();
            const url = window.location.href;
            const url1 = url.split("/")[3];
            const url2 = url1.split("?")[1];
            const id = url2.split("=")[1];
            getStartupdata(id)
        } else {
            Navigate('/login');
        }
    }, []);

    const fetchAllData = async () => {
        try {
            await Promise.all([
                fetchData('getstartupBusinessType', setBusinessTypeList),
                fetchData('countryList', setCountryList),
                fetchData('getstartupIndustryType', setIndustryList),
                fetchData('getstartupStage', setStartupStageList),
                fetchData('getstartupRevenue', setRevenueModelList),
                fetchData('getstartupinvestmentType', setInvestmentTypeList)
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

    const handleInvestmentTypeChange = (selectedOptions) => {
        setInvestmentType(selectedOptions);
    };
    const investmentTypeOptions = investmentTypeList.map(investmentType => ({
        value: investmentType._id,
        label: investmentType.startup_investment,
    }));



    const getStartupdata = async (id) => {
        try {
            const requestOption = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            };
            await fetch(`${API_URL}/api/getStartUpId?id=${id}`, requestOption)
                .then((res) => res.json())
                .then((data) => {
                    console.log(data)
                    const startup = data?.data[0]
                    setStartupdata(data?.data[0])
                    setId(startup?._id)
                    setCompanyName(startup?.companyName)
                    setBusinessType(startup?.businessType)
                    setRegistrationNumber(startup?.registrationNumber)
                    setDateOfIncorporation(startup?.dateOfIncorporation)
                    setCountryOfIncorporation(startup?.countryOfIncorporation)
                    setBusinessAddress(startup?.businessAddress)
                    setContactInformation(startup?.contactInformation)
                    setBusinessEmail(startup?.businessEmail)
                    setCompanyLogo(startup?.companyLogo?.length ? startup?.companyLogo[0] : [] )

                    setFounderName(startup?.founderName)
                    setFounderDOB(startup?.founderDOB)
                    setFounderNationality(startup?.founderNationality)
                    setFounderID(startup?.founderID)
                    setFounderAddress(startup?.founderAddress)
                    setFounderEmail(startup?.founderEmail)
                    setFounderContact(startup?.founderContact)

                    setIndustry(startup?.industry)
                    setBusinessActivity(startup?.businessActivity)
                    setNumOfEmployees(startup?.numOfEmployees)
                    setAnnualRevenue(startup?.annualRevenue)
                    setStartupStage(startup?.startupStage)
                    setRevenueModel(startup?.revenueModel)
                    setBankDetails(startup?.bankDetails)

                    setTaxNumber(startup?.taxNumber)
                    setLegalAgreements(startup?.legalAgreements)
                    setIntellectualPropertyDetails(startup?.intellectualpropertyDetails)
                    setComplianceCerts(startup?.complianceCerts)

                    const investmentTypedata = startup?.investmentType_details?.map(investmentType => ({
                        value: investmentType._id,
                        label: investmentType.startup_investment,
                    }));
                    setInvestmentType(investmentTypedata)
                    setInvestorExperience(startup?.investorExperience)
                    setMinInvestment(startup?.minInvestment)
                    setMaxInvestment(startup?.maxInvestment)

                    setPreviousFunding(startup?.previousFunding)
                    setBusinessPlan(startup?.businessPlan)
                    setPitchDeck(startup?.pitchDeck)
                    setReferenceContacts(startup?.referenceContacts)
                })
        } catch (error) {
            console.log(error)
        }

    }

    console.log(startupdata)



    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            if (!companyName) {
                swal({
                    text: "Please enter Company Name",
                    icon: "warning",
                })
                companyNameRef.current.focus();
                return;
            }
            else if (!businessType) {
                swal({
                    text: "Please select Business Type",
                    icon: "warning",
                })
                businessTypeRef.current.focus();
                return;
            }
            else if (!registrationNumber) {
                swal({
                    text: "Please enter Registration Number",
                    icon: "warning",
                })
                registrationNumberRef.current.focus();
                return;
            }
            else if (!dateOfIncorporation) {
                swal({
                    text: "Please enter Date of Incorporation",
                    icon: "warning",
                })
                dateOfIncorporationRef.current.focus();
                return;
            }
            else if (!countryOfIncorporation) {
                swal({
                    text: "Please select Country of Incorporation",
                    icon: "warning",
                })
                countryOfIncorporationRef.current.focus();
                return;
            }
            // else if (!contactInformation) {
            //     swal({
            //         text: "Please enter Contact Number",
            //         icon: "warning",
            //     })
            //     contactInformationRef.current.focus();
            //     return;
            // }
            else if (contactInformation && (!isPhoneValid)) {
                swal({
                    text: "Please enter valid Contact Number",
                    icon: "warning",
                })
                contactInformationRef.current.focus();
                return;
            }
            else if (businessEmail !== '' && (!businessEmail?.includes('@') || !businessEmail?.includes('.'))) {
                swal({
                    text: "Please enter valid Business Email Id",
                    icon: "warning",
                })
                businessemailRef.current.focus();
                return;
            }
            else if (!founderName) {
                swal({
                    text: "Please enter Founder Full Name",
                    icon: "warning",
                })
                founderNameRef.current.focus();
                return;
            }
            else if (!founderDOB) {
                swal({
                    text: "Please enter Founder Date of Birth",
                    icon: "warning",
                })
                founderDOBRef.current.focus();
                return;
            }
            else if (!founderNationality) {
                swal({
                    text: "Please select Founder Nationality",
                    icon: "warning",
                })
                founderNationalityRef.current.focus();
                return;
            }
            else if (!founderID) {
                swal({
                    text: "Please enter Founder Identification Proof",
                    icon: "warning",
                })
                founderIDRef.current.focus();
                return;
            }
            else if (!founderAddress) {
                swal({
                    text: "Please enter Founder Address Proof",
                    icon: "warning",
                })
                founderAddressRef.current.focus();
                return;
            }
            // else if (!founderContact) {
            //     swal({
            //         text: "Please enter Founder Contact Information",
            //         icon: "warning",
            //     })
            //     founderContactRef.current.focus();
            //     return;
            // }
            else if (!isfounderPhoneValid) {
                swal({
                    text: "Please enter valid Founder Contact Information",
                    icon: "warning",
                })
                founderContactRef.current.focus();
                return;
            }
            else if (!industry) {
                swal({
                    text: "Please select Industry",
                    icon: "warning",
                })
                industryRef.current.focus();
                return;
            }
            else if (!businessActivity) {
                swal({
                    text: "Please enter Business Activity Description",
                    icon: "warning",
                })
                businessActivityRef.current.focus();
                return;
            }
            else if (!startupStage) {
                swal({
                    text: "Please select Startup Stage",
                    icon: "warning",
                })
                startupStageRef.current.focus();
                return;
            }
            else if (!revenueModel) {
                swal({
                    text: "Please select Revenue Model",
                    icon: "warning",
                })
                revenueModelRef.current.focus();
                return;
            }
            else if (!taxNumber) {
                swal({
                    text: "Please enter Tax Identification Number (TIN)",
                    icon: "warning",
                })
                taxNumberRef.current.focus();
                return;
            }
            else if (!investmentType) {
                swal({
                    text: "Please select Investment Type",
                    icon: "warning",
                })
                investmentTypeRef.current.focus();
                return;
            }
            else if (!investorExperience) {
                swal({
                    text: "Please enter Preferred Experience of Investor in Years",
                    icon: "warning",
                })
                investorExperienceRef.current.focus();
                return;
            }
            else if (!minInvestment) {
                swal({
                    text: "Please enter Minimum Investment Required",
                    icon: "warning",
                })
                minInvestmentRef.current.focus();
                return;
            }
            else if (!maxInvestment) {
                swal({
                    text: "Please enter Maximum Investment Required",
                    icon: "warning",
                })
                maxInvestmentRef.current.focus();
                return;
            }

            setLoading(true);



            const investmentType_len = investmentType?.length;
            const investmentType_arr = [];
            for (let i = 0; i < investmentType_len; i++) {
                investmentType_arr?.push(investmentType[i]?.value);
            }

            console.log("investmentType_arr", investmentType_arr)

            const formdata = new FormData();
            formdata.append('id', id);
            formdata.append('companyName', companyName),
                formdata.append('businessType', businessType),
                formdata.append('registrationNumber', registrationNumber),
                formdata.append('dateOfIncorporation', dateOfIncorporation),
                formdata.append('countryOfIncorporation', countryOfIncorporation),
                formdata.append('businessAddress', businessAddress),
                formdata.append('contactInformation', contactInformation),
                formdata.append('businessEmail', businessEmail),
                formdata.append('file', companyLogo), // For file input, handle accordingly
                formdata.append('founderName', founderName),
                formdata.append('founderDOB', founderDOB),
                formdata.append('founderNationality', founderNationality),
                formdata.append('founderID', founderID),
                formdata.append('founderAddress', founderAddress),
                formdata.append('founderEmail', founderEmail),
                formdata.append('founderContact', founderContact),
                formdata.append('industry', industry),
                formdata.append('businessActivity', businessActivity),
                formdata.append('numOfEmployees', numOfEmployees),
                formdata.append('annualRevenue', annualRevenue),
                formdata.append('startupStage', startupStage),
                formdata.append('revenueModel', revenueModel),
                formdata.append('bankDetails', bankDetails),
                formdata.append('taxNumber', taxNumber),
                formdata.append('legalAgreements', legalAgreements),
                formdata.append('intellectualPropertyDetails', intellectualpropertyDetails),
                formdata.append('complianceCerts', complianceCerts),
                formdata.append('investmentType', JSON.stringify(investmentType_arr)),
                formdata.append('investorExperience', investorExperience),
                formdata.append('minInvestment', minInvestment),
                formdata.append('maxInvestment', maxInvestment),
                formdata.append('previousFunding', previousFunding),
                formdata.append('businessPlan', businessPlan),
                formdata.append('pitchDeck', pitchDeck),
                formdata.append('referenceContacts', referenceContacts),


                console.log(Array.from(formdata));

            // return false;

            const requestoptions = {
                method: 'PUT',
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
                body: formdata,
            };
            await fetch(`${API_URL}/api/updatestartupdetail`, requestoptions)
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

    // const handleImageChange = (e) => {
    //     const reader = new FileReader();
    //     const file = e.target.files[0];
    //     setCompanyLogo(file);
    //     reader.onloadend = () => {
    //         setImage(reader.result);
    //     };
    //     if (file) {
    //         reader.readAsDataURL(file);
    //     }
    // };

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
            setCompanyLogo(file);
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


    const handlePhoneChange = (value) => {
        setContactInformation(value);
        if (value === '' || value === undefined) {
            setIsPhoneValid(true);
        } else {
            setIsPhoneValid(isValidPhoneNumber(value));
        }
    };

    const handlefounderPhoneChange = (value) => {
        setFounderContact(value);
        if (value === '' || value === undefined) {
            setIsFounderPhoneValid(true);
        } else {
            setIsFounderPhoneValid(isValidPhoneNumber(value));
        }
    };



    const formatDate = (date) => {
        if (!date) return ''; // Return an empty string if the date is undefined or invalid
        const d = new Date(date);
        let month = '' + (d.getMonth() + 1);
        let day = '' + d.getDate();
        const year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [year, month, day].join('-');
    };

    console.log(formatDate(dateOfIncorporation))
    console.log(dateOfIncorporation)

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
                    <h3 className='text-center'>Company Information</h3>
                    <div className='descr-content'>
                        <Row>
                            <Col lg={4} className='mb-2'>
                                <label>Company Logo </label>
                                {/* <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Control type="file" placeholder="Enter Company Name" onChange={(e) => setCompanyLogo(e.target.files[0])} />
                                </Form.Group> */}
                                <div className='profileimgc12'>
                                    <img src={image != companylogo || !companyLogo || companyLogo?.filename == undefined || companyLogo == [] ? image : `${API_URL}/uploads/company_logo/${companyLogo.filename}`} alt="Profile" />
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
                                    />
                                </div>
                                {/* Information about file restrictions */}
                                <div className='disclaimer-note'>
                                    <strong>Note : </strong> File formats allowed: .jpg, .jpeg, .png.<br />
                                    Maximum dimensions: 300x300 pixels.<br />
                                    Maximum file size: 500KB.
                                </div>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>Company Name <span className='labelerrorssss'>*</span></label>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Control type="text" placeholder="Enter Company Name" defaultValue={companyName} onChange={(e) => setCompanyName(e.target.value)} ref={companyNameRef} />
                                </Form.Group>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>Business Type <span className='labelerrorssss'>*</span></label>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Select className='mb-3' onChange={(e) => setBusinessType(e.target.value)} ref={businessTypeRef}>
                                        <option hidden>Select Business Type</option>
                                        {businessTypeList?.map((val, index) => (
                                            <option key={index} selected={businessType == val._id} value={val?._id}>{val?.startupbusiness_type}</option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>Registration Number/CIN No. <span className='labelerrorssss'>*</span></label>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Control type="text" placeholder="Enter Registration Number/CIN No." defaultValue={registrationNumber} onChange={(e) => setRegistrationNumber(e.target.value)} ref={registrationNumberRef} />
                                </Form.Group>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>Date of Incorporation <span className='labelerrorssss'>*</span></label>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Control type="date" placeholder="Enter Company Name" defaultValue={formatDate(dateOfIncorporation)} onChange={(e) => setDateOfIncorporation(e.target.value)} ref={dateOfIncorporationRef} />
                                </Form.Group>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>Country of Incorporation <span className='labelerrorssss'>*</span></label>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Select className='mb-3' onChange={(e) => setCountryOfIncorporation(e.target.value)} ref={countryOfIncorporationRef}>
                                        <option hidden>Select Country</option>
                                        {countryList?.map((country, index) => (
                                            <option key={index} selected={countryOfIncorporation == country._id} value={country._id}>{country.country_name}</option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>Business Address </label>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        placeholder="Enter Business Address"
                                        onChange={(e) => setBusinessAddress(e.target.value)}
                                        defaultValue={businessAddress}
                                    />
                                </Form.Group>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>Contact Information <span className='labelerrorssss'>*</span></label>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <PhoneInput
                                        className={`form-control ${!isPhoneValid ? 'is-invalid' : ''}`}
                                        defaultCountry="IN"
                                        international
                                        countryCallingCodeEditable={false}
                                        localization={en}
                                        placeholder="Enter your Mobile Number"
                                        value={contactInformation}
                                        onChange={handlePhoneChange}
                                        ref={contactInformationRef}
                                    />
                                </Form.Group>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>Business Email ID </label>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Control type="text" placeholder="Enter Business Email ID" defaultValue={businessEmail} onChange={(e) => setBusinessEmail(e.target.value)} ref={businessemailRef} />
                                </Form.Group>
                            </Col>

                        </Row>
                    </div>
                </div>

                <div className='profilegallery mb-5'>
                    <h3 className='text-center'>Founders’/Owners’ Information</h3>
                    <div className='descr-content'>
                        <Row>
                            <Col lg={4} className='mb-2'>
                                <label>Full Name <span className='labelerrorssss'>*</span></label>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Control type="text" placeholder="Enter Full Name" defaultValue={founderName} onChange={(e) => setFounderName(e.target.value)} ref={founderNameRef} />
                                </Form.Group>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>Date of Birth <span className='labelerrorssss'>*</span></label>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Control type="date" placeholder="Enter Company Name" defaultValue={formatDate(founderDOB)} onChange={(e) => setFounderDOB(e.target.value)} ref={founderDOBRef} />
                                </Form.Group>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>Nationality <span className='labelerrorssss'>*</span></label>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Select className='mb-3' onChange={(e) => setFounderNationality(e.target.value)} ref={founderNationalityRef}>
                                        <option hidden>Select Nationality</option>
                                        {countryList?.map((country, index) => (
                                            <option key={index} selected={founderNationality == country._id} value={country._id}>{country.country_name}</option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>Identification Proof  <span className='labelerrorssss'>*</span></label>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Control type="text" placeholder="Enter Founders/Owners Valid Government issued ID Number" defaultValue={founderID} onChange={(e) => setFounderID(e.target.value)} ref={founderIDRef} />
                                </Form.Group>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>Address Proof <span className='labelerrorssss'>*</span></label>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        placeholder="Enter Address Proof"
                                        onChange={(e) => setFounderAddress(e.target.value)}
                                        ref={founderAddressRef}
                                        defaultValue={founderAddress}
                                    />
                                </Form.Group>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>Email ID </label>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Control type="email" placeholder="Enter Company Name" defaultValue={founderEmail} onChange={(e) => setFounderEmail(e.target.value)} />
                                </Form.Group>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>Contact Information </label>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    {/* <Form.Control type="text" placeholder="Enter Company Name" defaultValue={founderContact} onChange={(e) => setFounderContact(e.target.value)} /> */}
                                    <PhoneInput
                                        className={`form-control ${!isfounderPhoneValid ? 'is-invalid' : ''}`}
                                        defaultCountry="IN"
                                        international
                                        countryCallingCodeEditable={false}
                                        localization={en}
                                        placeholder="Enter your Mobile Number"
                                        value={founderContact}
                                        onChange={handlefounderPhoneChange}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                    </div>
                </div>

                <div className='profilegallery mb-5'>
                    <h3 className='text-center'>Business Operation Details</h3>
                    <div className='descr-content'>
                        <Row>
                            <Col lg={4} className='mb-2'>
                                <label>Industry <span className='labelerrorssss'>*</span></label>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Select className='mb-3' onChange={(e) => setIndustry(e.target.value)} ref={industryRef}>
                                        <option hidden>Select Industry</option>
                                        {industryList?.map((val, index) => (
                                            <option key={index} selected={industry == val._id} value={val._id}>{val.startup_industry}</option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>Business Activity Description <span className='labelerrorssss'>*</span></label>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Control type="text" placeholder="Enter Business Activity Description" defaultValue={businessActivity} onChange={(e) => setBusinessActivity(e.target.value)} ref={businessActivityRef} />
                                </Form.Group>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>Number of Employees </label>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Control type="text" placeholder="Enter Number of Employees" defaultValue={numOfEmployees} onInput={allowOnlyNumbers} onChange={(e) => setNumOfEmployees(e.target.value)} />
                                </Form.Group>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>Annual Revenue (Projected) </label>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Control type="text" placeholder="Enter Annual Revenue (Projected)" defaultValue={annualRevenue} onInput={allowOnlyNumbers} onChange={(e) => setAnnualRevenue(e.target.value)} />
                                </Form.Group>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>Startup Stage <span className='labelerrorssss'>*</span></label>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Select className='mb-3' onChange={(e) => setStartupStage(e.target.value)} ref={startupStageRef}>
                                        <option hidden>Select Startup Stage</option>
                                        {startupStageList?.map((val, index) => (
                                            <option key={index} selected={startupStage == val._id} value={val._id}>{val.startup_stage}</option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>Revenue Model <span className='labelerrorssss'>*</span></label>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Select className='mb-3' onChange={(e) => setRevenueModel(e.target.value)} ref={revenueModelRef}>
                                        <option hidden>Select Revenue Model</option>
                                        {revenueModelList?.map((val, index) => (
                                            <option key={index} selected={revenueModel == val._id} value={val._id}>{val.startup_revenue}</option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>Business Bank Account Details </label>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        placeholder="Enter Business Bank Account Details"
                                        onChange={(e) => setBankDetails(e.target.value)}
                                        defaultValue={bankDetails}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                    </div>
                </div>

                <div className='profilegallery mb-5'>
                    <h3 className='text-center'>Legal and Compliance</h3>
                    <div className='descr-content'>
                        <Row>
                            <Col lg={4} className='mb-2'>
                                <label>Tax Identification Number (TIN) <span className='labelerrorssss'>*</span></label>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Control type="text" placeholder="Enter Tax Identification Number (TIN)" defaultValue={taxNumber} onChange={(e) => setTaxNumber(e.target.value)} ref={taxNumberRef} />
                                </Form.Group>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>Legal Agreements </label>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        placeholder="Enter Legal Agreements"
                                        onChange={(e) => setLegalAgreements(e.target.value)}
                                        defaultValue={legalAgreements}
                                    />
                                </Form.Group>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>Intellectual Property Details </label>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        placeholder="Enter Intellectual Property Details"
                                        onChange={(e) => setIntellectualPropertyDetails(e.target.value)}
                                        defaultValue={intellectualpropertyDetails}
                                    />
                                </Form.Group>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>Compliance Certifications </label>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        placeholder="Enter Compliance Certifications"
                                        onChange={(e) => setComplianceCerts(e.target.value)}
                                        defaultValue={complianceCerts}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                    </div>
                </div>

                <div className='profilegallery mb-5'>
                    <h3 className='text-center'>Investment Requirements</h3>
                    <div className='descr-content'>
                        <Row>
                            <Col lg={4} className='mb-2'>
                                <label>Investment Type <span className='labelerrorssss'>*</span></label>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Select
                                        closeMenuOnSelect={false}
                                        isMulti // Enables multi-select
                                        options={investmentTypeOptions} // Options to be displayed in the dropdown
                                        value={investmentType} // The currently selected values
                                        onChange={handleInvestmentTypeChange} // Handles the selection
                                        className=" mb-3 custom-select-class"
                                        placeholder="Select Preferred Investment Stage"
                                        ref={investmentTypeRef}
                                    />


                                </Form.Group>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>Preferred Experience of Investor in Years <span className='labelerrorssss'>*</span></label>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Control type="text" placeholder="Enter Preferred Experience of Investor in Years" onInput={allowOnlyNumbers} defaultValue={investorExperience} onChange={(e) => setInvestorExperience(e.target.value)} ref={investorExperienceRef} />
                                </Form.Group>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>Minimum Investment Required <span className='labelerrorssss'>*</span></label>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Control type="text" placeholder="Enter Minimum Investment Required" onInput={allowOnlyNumbers}  defaultValue={minInvestment} onChange={(e) => setMinInvestment(e.target.value)} ref={minInvestmentRef} />
                                </Form.Group>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>Maximum Investment Required <span className='labelerrorssss'>*</span></label>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Control type="text" placeholder="Enter Maximum Investment Required" onInput={allowOnlyNumbers} defaultValue={maxInvestment} onChange={(e) => setMaxInvestment(e.target.value)} ref={maxInvestmentRef} />
                                </Form.Group>
                            </Col>

                        </Row>
                    </div>
                </div>

                <div className='profilegallery mb-5'>
                    <h3 className='text-center'>Additional Information</h3>
                    <div className='descr-content'>
                        <Row>
                            <Col lg={4} className='mb-2'>
                                <label>Previous Funding </label>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Control type="text" placeholder="Enter Previous Funding" onInput={allowOnlyNumbers} defaultValue={previousFunding} onChange={(e) => setPreviousFunding(e.target.value)} />
                                </Form.Group>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>Business Plan </label>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        placeholder="Enter Business Plan"
                                        onChange={(e) => setBusinessPlan(e.target.value)}
                                        defaultValue={businessPlan}
                                    />
                                </Form.Group>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>Pitch Deck <span className='labelerrorssss'>*</span></label>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        placeholder="Enter Company Name"
                                        onChange={(e) => setPitchDeck(e.target.value)}
                                        defaultValue={pitchDeck}
                                        ref={pitchDeckRef}
                                    />
                                </Form.Group>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>Reference Contacts </label>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        placeholder="Enter Company Name"
                                        onChange={(e) => setReferenceContacts(e.target.value)}
                                        defaultValue={referenceContacts}
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

export default Startupeditprofile;