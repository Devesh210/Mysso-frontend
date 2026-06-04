import React, { useState, useEffect, useRef } from 'react'
import { Col, Container, Form, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import PhoneInput, { formatPhoneNumber, formatPhoneNumberIntl, isValidPhoneNumber } from "react-phone-number-input";
import en from 'react-phone-number-input/locale/en';
import 'react-phone-number-input/style.css';
import profile from "../../../../assets/profile.png";
import companybusinessfront from "../../../../assets/companybusinessfront.png"
import companybusinessback from "../../../../assets/companybusinessback.png"
import Select from 'react-select';
import API_URL from '../../../../../config';

const EducationExpertform = () => {
  const navigate = useNavigate();

  const [countryList, setCountryList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [industryList, setIndustryList] = useState([]);
  const [careerFieldsList, setCareerFieldsList] = useState([]);
  const [guidanceTypeList, setGuidanceTypeList] = useState([]);
  const [targetAudienceList, setTargetAudienceList] = useState([]);
  const [consultationModeList, setConsultationModeList] = useState([]);

  const [image, setImage] = useState(profile);
  const [profile_pic, setProfile_pic] = useState([]);
  const [companybusinessfrontimage, setCompanybusinessfrontimage] = useState(companybusinessfront);
  const [companybusinessbackimage, setCompanybusinessbackimage] = useState(companybusinessback);
  const [businesscardfront, setBusinesscardfront] = useState([]);
  const [businesscardback, setBusinesscardback] = useState([]);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [isPhoneValid, setIsPhoneValid] = useState(true);
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [bio, setBio] = useState('');
  const [occupation, setOccupation] = useState('');
  const [experience, setExperience] = useState('');
  const [industry, setIndustry] = useState('');
  const [education, setEducation] = useState('');
  const [certifications, setCertifications] = useState('');
  const [workExperience, setWorkExperience] = useState('');
  const [careerFields, setCareerFields] = useState('');
  const [guidanceType, setGuidanceType] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  const [skills, setSkills] = useState('');
  const [consultationMode, setConsultationMode] = useState('');
  const [timeSlots, setTimeSlots] = useState('');
  const [consultationLanguage, setConsultationLanguage] = useState('');
  const [loading, setLoading] = useState(false);

  const fullNameRef = useRef();
  const emailRef = useRef();
  const contactRef = useRef();
  const countryRef = useRef();
  const stateRef = useRef();
  const cityRef = useRef();
  const bioRef = useRef();
  const profilePicRef = useRef();

  const occupationRef = useRef();
  const experienceRef = useRef(); 
  const industryRef = useRef();

  const guidanceTypeRef = useRef();
  const targetAudienceRef = useRef();
  const skillsRef = useRef();
  const consultationModeRef = useRef();


  useEffect(() => {
    getCountry();
    getIndustryofexpertiseList();
    getcareerFieldsList();
    getTypeofGuidance();
    gettargetAudience();
    getPrefferedmodeofConsultation();
  }, []);

  useEffect(() => {
    getState();
  }, [country]);

  useEffect(() => {
    getCity();
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

  const getIndustryofexpertiseList = async () => {
    try {
      const requestoptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      };
      await fetch(`${API_URL}/api/getstartupIndustryType`, requestoptions)
        .then(response => response.json())
        .then(data => {
          console.log(data.data);
          setIndustryList(data.data);
        })
    }
    catch (err) {
      console.error(err.message);
    }
  }

  const getcareerFieldsList = async () => {
    try {
      const requestoptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      };
      await fetch(`${API_URL}/api/getEducationFieldofStudy`, requestoptions)
        .then(response => response.json())
        .then(data => {
          console.log(data.data);
          setCareerFieldsList(data.data);
        })
    }
    catch (err) {
      console.error(err.message);
    }
  }

  const getTypeofGuidance = async () => {
    try {
      const requestoptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      };
      await fetch(`${API_URL}/api/getEducationTypeofGuidance`, requestoptions)
        .then(response => response.json())
        .then(data => {
          console.log(data.data);
          setGuidanceTypeList(data.data);
        })
    }
    catch (err) {
      console.error(err.message);
    }
  }

  const gettargetAudience = async () => {
    try {
      const requestoptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      };
      await fetch(`${API_URL}/api/getEducationTargetAudience`, requestoptions)
        .then(response => response.json())
        .then(data => {
          console.log(data.data);
          setTargetAudienceList(data.data);
        })
    }
    catch (err) {
      console.error(err.message);
    }
  }

  const getPrefferedmodeofConsultation = async () => {
    try {
      const requestoptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      };
      await fetch(`${API_URL}/api/getEducationConsultation`, requestoptions)
        .then(response => response.json())
        .then(data => {
          console.log(data.data);
          setConsultationModeList(data.data);
        })
    }
    catch (err) {
      console.error(err.message);
    }
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


  const handleBusinessfrontChange = (e) => {
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
      setBusinesscardfront(file);
      reader.onloadend = () => {
        setCompanybusinessfrontimage(reader.result);
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

  const handleBusinessbackChange = (e) => {
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
      setBusinesscardback(file);
      reader.onloadend = () => {
        setCompanybusinessbackimage(reader.result);
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



  const careerFieldsOptions = careerFieldsList?.map(val => ({ 
    value: val._id, 
    label: val.education_fieldofstudy 
  }))

  const handleCareerfieldchange = (selectedOptions) => {
    setCareerFields(selectedOptions);
  };

  const guidanceTypeOptions = guidanceTypeList?.map(val => ({
    value: val._id,
    label: val.education_typeof_guidance
  }))

  const handleGuidancetypechange = (selectedOptions) => { 
    setGuidanceType(selectedOptions);
  };

  const targetAudienceOptions = targetAudienceList?.map(val => ({
    value: val._id,
    label: val.education_target_audience
  }))

  const handleTargetAudiencechange = (selectedOptions) => {
    setTargetAudience(selectedOptions);
  };

  console.log(consultationModeList)

  const consultationModeOptions = consultationModeList?.map(val => ({
    value: val._id,
    label: val.education_consultation
  }))

  console.log(consultationModeOptions);

  const handleConsultationModechange = (selectedOptions) => {
    setConsultationMode(selectedOptions);
  };





  const allowOnlyNumbers = (e) => {
    e.preventDefault();
    const input = e.target;
    const value = input.value.replace(/[^\d]/g, ''); // Replace any non-numeric characters with an empty string
    input.value = value; // Set the input value to the filtered value
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      if(!fullName){
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
          text: "Please Upload Profile Picture",
          icon: "warning",
        });
        profilePicRef.current.focus();
        return false;
      }
      else if (!occupation) {
        swal({
          text: "Please Enter Current Occupation",
          icon: "warning",
        });
        occupationRef.current.focus();
        return false;
      }
      else if (!experience) {
        swal({
          text: "Please Enter Years of Experience",
          icon: "warning",
        });
        experienceRef.current.focus();
        return false;
      }
      else if (!industry) {
        swal({
          text: "Please Select Industry of Expertise",
          icon: "warning",
        });
        industryRef.current.focus();
        return false;
      }
      else if (!guidanceTypeRef) {
        swal({
          text: "Please Select Type of Guidance",
          icon: "warning",
        });
        guidanceTypeRef.current.focus();
        return false;
      }
      else if (!targetAudience) {
        swal({
          text: "Please Select Target Audience",
          icon: "warning",
        });
        targetAudienceRef.current.focus();
        return false;
      }
      else if (!skills) {
        swal({
          text: "Please Enter Specialized Skills",
          icon: "warning",
        });
        skillsRef.current.focus();
        return false;
      }
      else if (!consultationMode) {
        swal({
          text: "Please Select Preferred Mode of Consultation",
          icon: "warning",
        });
        consultationModeRef.current.focus();
        return false;
      }
      else{
          setLoading(true);
        const careerFields_len = careerFields?.length;
        const careerFields_arr = [];
        for (let i = 0; i < careerFields_len; i++) {
          careerFields_arr?.push(careerFields[i]?.value);
        }

        const guidanceType_len = guidanceType?.length;
        const guidanceType_arr = [];
        for (let i = 0; i < guidanceType_len; i++) {
          guidanceType_arr?.push(guidanceType[i]?.value);
        }

        const targetAudience_len = targetAudience?.length;
        const targetAudience_arr = [];
        for (let i = 0; i < targetAudience_len; i++) {
          targetAudience_arr?.push(targetAudience[i]?.value);
        }

        const consultationMode_len = consultationMode?.length;
        const consultationMode_arr = [];
        for (let i = 0; i < consultationMode_len; i++) {
          consultationMode_arr?.push(consultationMode[i]?.value);
        }

        const formData = new FormData();
          formData.append('file', profile_pic);
          formData.append('businesscardfront', businesscardfront)
          formData.append('businesscardback', businesscardback)
          formData.append('fullName', fullName);
          formData.append('email', email);
          formData.append('contact', contact);
          formData.append('country', country);
          formData.append('state', state);
          formData.append('city', city);
          formData.append('bio', bio);
          formData.append('occupation', occupation);
          formData.append('experience', experience);
          formData.append('industry', industry);
          formData.append('education', education);
          formData.append('certifications', certifications);
          formData.append('work_experience', workExperience);
          formData.append('career_fields', JSON.stringify(careerFields_arr));
          formData.append('guidance_type', JSON.stringify(guidanceType_arr));
          formData.append('target_audience', JSON.stringify(targetAudience_arr));
          formData.append('skills', skills);
          formData.append('consultation_mode', JSON.stringify(consultationMode_arr));
          formData.append('time_slots', timeSlots);
          formData.append('consultation_language', consultationLanguage);
          
       
        console.table(Array.from(formData))

        // return false;

        const requestoptions = {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
          body: formData,
        };
        await fetch(`${API_URL}/api/createExpertData`, requestoptions)
          .then(response => response.json())
          .then(data => {
            console.log(data);
            if (data.status === 200) {
              swal({
                text: data.message,
                icon: "success",
              });
              navigate('/Profile');
              setLoading(false);

            }
            else {
              swal({
                text: data.message,
                icon: "error",
              });
              setLoading(false);

            }
          })
      }
    }catch(err){
      console.error(err.message);
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
                  <Form.Control type="text" placeholder="Enter your full name" value={fullName} onChange={(e) => setFullName(e.target.value)} ref={fullNameRef}/>
                </Form.Group>
              </Col>
              <Col lg={4} className='mb-2'>
                <label>Email Address <span className='labelerrorssss'>*</span></label>
                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Control type="email" placeholder="Enter your email address" value={email} onChange={(e) => setEmail(e.target.value)} ref={emailRef} />
                </Form.Group>
              </Col>
              <Col lg={4} className='mb-2'>
                <label>Contact Number <span className='labelerrorssss'>*</span></label>
                <Form.Group className="mb-3" controlId="formContact">
                  <PhoneInput
                    className={`form-control ${!isPhoneValid ? 'is-invalid' : ''}`}
                    defaultCountry="IN"
                    international
                    countryCallingCodeEditable={false}
                    localization={en}
                    placeholder="Contact Number"
                    value={contact}
                    onChange={handlePhoneChange}
                    ref={contactRef}
                  />
                </Form.Group>
              </Col>
              <Col lg={4} className='mb-2'>
                <label>Country <span className='labelerrorssss'>*</span></label>
                <Form.Group className="mb-3" controlId="formCountry">
                  <Form.Select className='mb-3'  onChange={handleCountrychange} ref={countryRef}>
                    <option value="" hidden>Select country</option>
                    {countryList?.map((country, index) => (
                      <option key={index} value={country._id}>{country.country_name}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col lg={4} className='mb-2'>
                <label>State <span className='labelerrorssss'>*</span></label>
                <Form.Group className="mb-3" controlId="formState">
                  <Form.Select className='mb-3'  onChange={handleStatechange} ref={stateRef}>
                    <option value="" hidden>Select state</option>
                    {stateList?.map((state, index) => (
                      <option key={index} value={state._id}>{state.state_name}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col lg={4} className='mb-2'>
                <label>City <span className='labelerrorssss'>*</span></label>
                <Form.Group className="mb-3" controlId="formCity">
                  <Form.Select className='mb-3'  onChange={handleCitychange} ref={cityRef}>
                    <option value="" hidden>Select city</option>
                    {cityList?.map((city, index) => (
                      <option key={index} value={city._id}>{city.city_name}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col lg={4} className='mb-2'>
                <label>Short Bio <span className='labelerrorssss'>*</span></label>
                <Form.Group className="mb-3" controlId="formBio">
                  <Form.Control
                    as="textarea"
                    rows={3}
                    style={{ height: '180px' }}
                    placeholder="Write a short bio"
                    value={bio}
                    onChange={handleBioChange}
                    ref={bioRef}
                  />
                  <small className='text-muted'>{bio.length}/{maxCharacters} characters</small>
                </Form.Group>
              </Col>
              <Col lg={12} className='mb-2'>
              <Row>
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
                    ref={profilePicRef}
                  />
                </div>
                {/* Information about file restrictions */}
                <div className='disclaimer-note'>
                  <strong>Note : </strong> File formats allowed: .jpg, .jpeg, .png.<br />
                  Maximum dimensions: 300x300 pixels.<br />
                  Maximum file size: 500KB.
                </div>
              </Col>
              <Col lg={4}>
                    <label>Business Card Front</label>

                <div className='profileimgc12'>
                  <img src={companybusinessfrontimage} alt="Profile" />
                  <div className='image edit1' style={{ width: '19%' }} onClick={() => document.getElementById('uploadInput1').click()}>
                    <i className='fa fa-edit'> Select File</i>
                  </div>
                  <input
                    id="uploadInput1"
                    type="file"
                    accept=".jpg, .jpeg, .png"
                    style={{ display: 'none' }}
                    onChange={handleBusinessfrontChange}
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
              <Col lg={4}>
                <label>Business Card Back</label>
                <div className='profileimgc12'>
                  <img src={companybusinessbackimage} alt="Profile" />
                  <div className='image edit1' style={{ width: '19%' }} onClick={() => document.getElementById('uploadInput2').click()}>
                    <i className='fa fa-edit'> Select File</i>
                  </div>
                  <input
                    id="uploadInput2"
                    type="file"
                    accept=".jpg, .jpeg, .png"
                    style={{ display: 'none' }}
                    onChange={handleBusinessbackChange}
                    required
                  />
                </div>
                    <div className='disclaimer-note'>
                      <strong>Note : </strong> File formats allowed: .jpg, .jpeg, .png.<br />
                      Maximum dimensions: 300x300 pixels.<br />
                      Maximum file size: 500KB.
                    </div>
                </Col>
                </Row>
              </Col>
            </Row>
          </div>
        </div>

        <div className='profilegallery mb-5'>
          <h3 className='text-center'>Professional Background</h3>
          <div className='descr-content'>
            <Row>
              <Col lg={4} className='mb-2'>
                <label>Current Occupation <span className='labelerrorssss'>*</span></label>
                <Form.Group className="mb-3" controlId="formOccupation">
                  <Form.Control type="text" placeholder="Enter your current occupation" value={occupation} onChange={(e) => setOccupation(e.target.value)} ref={occupationRef}/>
                </Form.Group>
              </Col>
              <Col lg={4} className='mb-2'>
                <label>Years of Experience <span className='labelerrorssss'>*</span></label>
                <Form.Group className="mb-3" controlId="formExperience">
                  <Form.Control type="text" placeholder="Enter your years of experience" value={experience} onInput={allowOnlyNumbers} maxLength={2} onChange={(e) => setExperience(e.target.value)} ref={experienceRef}/>
                </Form.Group>
              </Col>
              <Col lg={4} className='mb-2'>
                <label>Industry of Expertise <span className='labelerrorssss'>*</span></label>
                <Form.Group className="mb-3" controlId="formIndustry">
                  <Form.Select className="mb-3" value={industry} onChange={(e) => setIndustry(e.target.value)} ref={industryRef}>
                    <option value="" hidden>Select industry</option>
                    {industryList?.map((industry, index) => (
                      <option key={index} value={industry._id}>{industry.startup_industry}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col lg={4} className='mb-2'>
                <label>Educational Qualification</label>
                <Form.Group className="mb-3" controlId="formEducation">
                  <Form.Control type="text" placeholder="Enter your educational qualifications" value={education} onChange={(e) => setEducation(e.target.value)} />
                </Form.Group>
              </Col>
              <Col lg={4} className='mb-2'>
                <label>Certifications</label>
                <Form.Group className="mb-3" controlId="formCertifications">
                  <Form.Control
                    as="textarea"
                    rows={3}
                    style={{ height: '180px' }}
                    placeholder="Enter your certifications"
                    value={certifications}
                    onChange={(e) => setCertifications(e.target.value.slice(0, maxCharacters))}
                  />
                </Form.Group>
                <small className='text-muted'>{certifications.length}/{maxCharacters} characters</small>
              </Col>
              <Col lg={4} className='mb-2'>
                <label>Work Experience</label>
                <Form.Group className="mb-3" controlId="formWorkExperience">
                  <Form.Control
                    as="textarea"
                    rows={3}
                    style={{ height: '180px' }}
                    placeholder="Provide details of your work experience"
                    value={workExperience}
                    onChange={(e) => setWorkExperience(e.target.value.slice(0, maxCharacters))}
                  />
                </Form.Group>
                <small className='text-muted'>{workExperience.length}/{maxCharacters} characters</small>
              </Col>
            </Row>
          </div>
        </div>

        <div className='profilegallery mb-5'>
          <h3 className='text-center'>Areas of Guidance Expertise Section</h3>
          <div className='descr-content'>
            <Row>
              <Col lg={4} className='mb-2'>
                <label>Career Fields</label>
                <Form.Group className="mb-3" controlId="formCareerFields">
                  {/* <Form.Select className="mb-3" value={careerFields} onChange={(e) => setCareerFields(e.target.value)}>
                    <option value="" hidden>Select career field</option>
                    {careerFieldsList?.map((fieldofstudy, index) => (
                      <option key={index} value={fieldofstudy?._id}>{fieldofstudy?.education_fieldofstudy}</option>
                    ))}
                  </Form.Select> */}
                  <Select
                    closeMenuOnSelect={false}
                    isMulti
                    options={careerFieldsOptions}
                    value={careerFields}
                    onChange={handleCareerfieldchange}
                    className="mb-3 custom-select-class"
                    placeholder="Select career field"
                   
                    
                  />
                </Form.Group>
              </Col>
              <Col lg={4} className='mb-2'>
                <label>Type of Guidance <span className='labelerrorssss'>*</span></label>
                <Form.Group className="mb-3" controlId="formGuidanceType">
                  {/* <Form.Select className="mb-3" value={guidanceType} onChange={(e) => setGuidanceType(e.target.value)} ref={guidanceTypeRef}>
                    <option value="" hidden>Select guidance type</option>
                    {guidanceTypeList?.map((guidance, index) => (
                      <option key={index} value={guidance._id}>{guidance.education_typeof_guidance}</option>
                    ))}
                  </Form.Select> */}
                  <Select
                    closeMenuOnSelect={false}
                    isMulti
                    options={guidanceTypeOptions}
                    value={guidanceType}
                    onChange={handleGuidancetypechange}
                    className="mb-3 custom-select-class"
                    placeholder="Select guidance type"
                    ref={guidanceTypeRef}
                  />
                </Form.Group>
              </Col>
              <Col lg={4} className='mb-2'>
                <label>Target Audience <span className='labelerrorssss'>*</span></label>
                <Form.Group className="mb-3" controlId="formTargetAudience">
                  {/* <Form.Select className="mb-3" value={targetAudience} onChange={(e) => setTargetAudience(e.target.value)} ref={targetAudienceRef}>
                    <option value="" hidden>Select target audience</option>
                    {targetAudienceList?.map((audience, index) => (
                      <option key={index} value={audience._id}>{audience.education_target_audience}</option>
                    ))}
                  </Form.Select> */}
                  <Select
                    closeMenuOnSelect={false}
                    isMulti
                    options={targetAudienceOptions}
                    value={targetAudience}
                    onChange={handleTargetAudiencechange}
                    className="mb-3 custom-select-class"
                    placeholder="Select guidance type"
                    ref={targetAudienceRef}
                  />
                </Form.Group>
              </Col>
              <Col lg={4} className='mb-2'>
                <label>Specialized Skills <span className='labelerrorssss'>*</span></label>
                <Form.Group className="mb-3" controlId="formSkills">
                  <Form.Control
                    as="textarea"
                    rows={3}
                    style={{ height: '180px' }}
                    placeholder="List your specialized skills"
                    value={skills}
                    onChange={(e) => setSkills(e.target.value.slice(0, maxCharacters))}
                    ref={skillsRef}
                  />
                </Form.Group>
                <small className='text-muted'>{skills.length}/{maxCharacters} characters</small>

              </Col>
            </Row>
          </div>
        </div>

        <div className='profilegallery mb-5'>
          <h3 className='text-center'>Session Information</h3>
          <div className='descr-content'>
            <Row>
              <Col lg={4} className='mb-2'>
                <label>Preferred Mode of Consultation <span className='labelerrorssss'>*</span></label>
                <Form.Group className="mb-3" controlId="formConsultationMode">
                  {/* <Form.Select className="mb-3" value={consultationMode} onChange={(e) => setConsultationMode(e.target.value)} ref={consultationModeRef}>
                    <option value="" hidden>Select consultation mode</option>
                    {consultationModeList?.map((consultation, index) => (
                      <option key={index} value={consultation._id}>{consultation.education_consultation}</option>
                    ))}
                  </Form.Select> */}

                  <Select
                    closeMenuOnSelect={false}
                    isMulti
                    options={consultationModeOptions}
                    value={consultationMode}
                    onChange={handleConsultationModechange}
                    className="mb-3 custom-select-class"
                    placeholder="Select Preferred Mode of Consultation"
                    ref={consultationModeRef}
                  />
                </Form.Group>
              </Col>
              <Col lg={4} className='mb-2'>
                <label>Preferred Time Slots</label>
                <Form.Group className="mb-3" controlId="formTimeSlots">
                  <Form.Select className="mb-3" value={timeSlots} onChange={(e) => setTimeSlots(e.target.value)}>
                    <option value="" hidden>Select preferred time slot</option>
                    <option value="Morning Slot">Morning Slot</option>
                    <option value="Afternoon Slot">Afternoon Slot</option>
                    <option value="Evening Slot">Evening Slot</option>
                    <option value="Night Slot">Night Slot</option>
                    <option value="Anytime of the Day">Anytime of the Day</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col lg={4} className='mb-2'>
                <label>Consultation Language</label>
                <Form.Group className="mb-3" controlId="formConsultationLanguage">
                  <Form.Control type="text" placeholder="Enter consultation language" value={consultationLanguage} onChange={(e) => setConsultationLanguage(e.target.value)} />
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

export default EducationExpertform;
