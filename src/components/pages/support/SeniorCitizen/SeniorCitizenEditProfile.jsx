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

const SeniorCitizenEditProfile = () => {
  const Navigate = useNavigate();


  const [countryList, setCountryList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);


  const [image, setImage] = useState(profile);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [isPhoneValid, setIsPhoneValid] = useState(true);
  const [provideServices, setProvideServices] = useState('No');
  const [profilePicture, setProfilePicture] = useState(null);
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [languages, setLanguages] = useState('');
  const [address, setAddress] = useState('');
  const [emergencyName, setEmergencyName] = useState('');
  const [emergencyContactNumber, setEmergencyContactNumber] = useState('');
  const [isemergencyPhoneValid, setIsEmergencyPhoneValid] = useState(true);
  const [emergencyRelationship, setEmergencyRelationship] = useState('');
  const [pastTreatments, setPastTreatments] = useState('');
  const [regularMedication, setRegularMedication] = useState('');
  const [mealPreferences, setMealPreferences] = useState('');
  const [dietaryRestrictions, setDietaryRestrictions] = useState('');
  const [mealTiming, setMealTiming] = useState('');

  const [loading, setLoading] = useState(false);

  const fullNameRef = useRef();
  const emailRef = useRef();
  const contactNumberRef = useRef();
  const profilePictureRef = useRef();
  const ageRef = useRef();
  const genderRef = useRef();
  const countryRef = useRef();
  const stateRef = useRef();
  const cityRef = useRef();
  const addressRef = useRef();
  const emergencyNameRef = useRef();
  const emergencyContactNumberRef = useRef();
  const mealPreferencesRef = useRef();
  const mealTimingRef = useRef();



  useEffect(() => {
    if (localStorage.getItem('token')) {
    const url = window.location.href;
    const url1 = url.split("/")[3];
    const url2 = url1.split("?")[1];
    const id = url2.split("=")[1];
    getSeniorcitizendata(id)
    getCountry();
    } else {
      Navigate('/Login')
    }
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


  const [seniorcitizendata, setSeniorcitizendata] = useState([])
  const [id, setId] = useState('');


  const getSeniorcitizendata = async (id) => {
    try {
      const requestOption = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };
      await fetch(`${API_URL}/api/getSeniorCitizendataById?id=${id}`, requestOption)
        .then((res) => res.json())
        .then((data) => {
          console.log(data)
          const seniorcitizen = data?.data[0]
          setSeniorcitizendata(data?.data[0])
          setId(seniorcitizen?._id)
          setFullName(seniorcitizen?.fullName)
          setEmail(seniorcitizen?.email)
          setContactNumber(seniorcitizen?.contactNumber)
          setProvideServices(seniorcitizen?.provideServices)
          setAge(seniorcitizen?.age)
          setGender(seniorcitizen?.gender)
          setCountry(seniorcitizen?.country)
          setState(seniorcitizen?.state)
          setCity(seniorcitizen?.city)
          setLanguages(seniorcitizen?.languages)
          setAddress(seniorcitizen?.address)
          setEmergencyName(seniorcitizen?.emergencyContactName)
          setEmergencyContactNumber(seniorcitizen?.emergencyContactNumber)
          setEmergencyRelationship(seniorcitizen?.emergencyRelationship)
          setPastTreatments(seniorcitizen?.pastTreatments)
          setRegularMedication(seniorcitizen?.regularMedication)

          const mealPreferences = seniorcitizen?.mealPreferences?.map((meal) => ({ value: meal, label: meal }))
          setMealPreferences(mealPreferences)
          const mealTiming = seniorcitizen?.mealTiming?.map((timing) => ({ value: timing, label: timing }))
          setMealTiming(mealTiming)
          setDietaryRestrictions(seniorcitizen?.dietaryRestrictions)
          setProfilePicture(seniorcitizen?.profilePicture[0])

        })
    } catch (error) {
      console.log(error)
    }

  }

  console.log(seniorcitizendata)


  const mealPreferencesOptions = [
    { value: 'Veg', label: 'Veg' },
    { value: 'Vegan', label: 'Vegan' },
    { value: 'Swaminarayan', label: 'Swaminarayan' },
    { value: 'Jain', label: 'Jain' },
  ];

  const mealTimingOptions = [
    { value: 'Morning', label: 'Morning' },
    { value: 'Afternoon', label: 'Afternoon' },
    { value: 'Evening', label: 'Evening' },
    { value: 'Night', label: 'Night' },
  ];

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

  const handleMealPreferencesChange = (e) => {
    setMealPreferences(e);
  }

  const handleMealTimingChange = (e) => {
    setMealTiming(e);
  }

  const handleSubmit = async () => {
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
      else if (!contactNumber) {
        swal({
          text: "Please Enter Contact Number",
          icon: "warning",
        });
        contactNumberRef.current.focus();
        return false;
      }
      else if (!isPhoneValid) {
        swal({
          text: "Please Enter Valid Contact Number",
          icon: "warning",
        });
        contactNumberRef.current.focus();
        return false;
      }
      else if (!profilePicture) {
        swal({
          text: "Please Upload Profile Picture",
          icon: "warning",
        });
        profilePictureRef.current.focus();
        return false;
      }
      else if (!age) {
        swal({
          text: "Please Enter Age",
          icon: "warning",
        });
        ageRef.current.focus();
        return false;
      }
      else if (!gender) {
        swal({
          text: "Please Select gender",
          icon: "warning",
        });
        genderRef.current.focus();
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
      else if (!address) {
        swal({
          text: "Please Enter Address",
          icon: "warning",
        });
        addressRef.current.focus();
        return false;
      }
      else if (!emergencyName) {
        swal({
          text: "Please Enter Emergency Contact Name",
          icon: "warning",
        });
        emergencyNameRef.current.focus();
        return false;
      }
      else if (!emergencyContactNumber) {
        swal({
          text: "Please Enter Emergency Contact Number",
          icon: "warning",
        });
        emergencyContactNumberRef.current.focus();
        return false;
      }
      else if (!isemergencyPhoneValid) {
        swal({
          text: "Please Enter Valid Emergency Contact Number",
          icon: "warning",
        });
        emergencyContactNumberRef.current.focus();
        return false;
      }
      else if (!mealPreferences?.length > 0) {
        swal({
          text: "Please Select Meal Preferences",
          icon: "warning",
        });
        mealPreferencesRef.current.focus();
        return false;
      }
      else if (!mealTiming?.length) {
        swal({
          text: "Please Select Meal Timing",
          icon: "warning",
        });
        mealTimingRef.current.focus();
        return false;
      }
      else {
        setLoading(true);

      const mealPreferences_len = mealPreferences.length;
      const mealPreferences_arr = [];
      for (let i = 0; i < mealPreferences_len; i++) {
        mealPreferences_arr.push(mealPreferences[i]?.value);
      }

      const mealTiming_len = mealTiming.length;
      const mealTiming_arr = [];
      for (let i = 0; i < mealTiming_len; i++) {
        mealTiming_arr.push(mealTiming[i]?.value);
      }

      const formData = new FormData();
      formData.append('id', id);
      formData.append('fullName', fullName);
      formData.append('email', email);
      formData.append('contactNumber', contactNumber);
      formData.append('provideServices', provideServices);
      formData.append('profilePicture', profilePicture);

      formData.append('age', age);
      formData.append('gender', gender);
      formData.append('country', country);
      formData.append('state', state);
      formData.append('city', city);
      formData.append('languages', languages);
      formData.append('address', address);

      formData.append('emergencyContactName', emergencyName);
      formData.append('emergencyContactNumber', emergencyContactNumber);
      formData.append('emergencyRelationship', emergencyRelationship);

      formData.append('pastTreatments', pastTreatments);
      formData.append('regularMedication', regularMedication);

      formData.append('mealPreferences', JSON.stringify(mealPreferences_arr));
      formData.append('mealTiming', JSON.stringify(mealTiming_arr));
      formData.append('dietaryRestrictions', dietaryRestrictions);

      console.table(Array.from(formData))

      const requestoptions = {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
        body: formData,
      };
      await fetch(`${API_URL}/api/updateSeniorcitizenData`, requestoptions)
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
                  <Form.Control type="text" placeholder="Enter your full name" value={fullName} onChange={(e) => setFullName(e.target.value)} ref={fullNameRef} />
                </Form.Group>
              </Col>
              <Col lg={4} className='mb-2'>
                <label>Email Id <span className='labelerrorssss'>*</span></label>
                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Control type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} ref={emailRef} />
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
                <label>Would you like to stay in temple and provide services? </label>
                <Form.Group className="mb-3" controlId="formProvideServices">
                  <div className="d-flex">
                    <Form.Check
                      type="radio"
                      label="Yes"
                      name="formProvideServices"
                      value="Yes"
                      checked={provideServices === "Yes"}
                      className="me-3"
                      onChange={(e) => setProvideServices(e.target.value)}

                    />
                    <Form.Check
                      type="radio"
                      label="No"
                      name="formProvideServices"
                      value="No"
                      checked={provideServices === "No"}
                      className="me-3"
                      onChange={(e) => setProvideServices(e.target.value)}

                    />
                  </div>
                </Form.Group>

              </Col>  
              <Col lg={4} className='mb-2'>
                <label>Profile Picture <span className='labelerrorssss'>*</span></label>
                <div className='profileimgc' >
                  <img src={image != profile ? image : `${API_URL}/uploads/user_profile/${profilePicture?.filename}`} alt="Profile" />

                  <div className='image edit1' style={{ width: '19%' }} onClick={() => document.getElementById('uploadInput').click()}>
                    <i className='fa fa-edit' > Select File</i>
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
                  <Form.Control type="text" placeholder="Enter your age" value={age} onChange={(e) => setAge(e.target.value)} ref={ageRef} />
                </Form.Group>
              </Col>
              <Col lg={4} className='mb-2'>
                <label>Gender <span className='labelerrorssss'>*</span></label>
                <Form.Group className="mb-3" controlId="formGender">
                  <Form.Select className='mb-3' value={gender} onChange={(e) => setGender(e.target.value)} ref={genderRef}>
                    <option hidden>Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Prefer not to reveal">Prefer not to reveal</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col lg={4} className='mb-2'>
                <label>Country <span className='labelerrorssss'>*</span></label>
                <Form.Group className="mb-3" controlId="formCountry">
                  <Form.Select className='mb-3' value={country} onChange={handleCountrychange} ref={countryRef}>
                    <option hidden>Select Country</option>
                    {countryList?.map((country, index) => (
                      <option key={index} value={country?._id}>{country?.country_name}</option>
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
                      <option key={index} value={state?._id}>{state?.state_name}</option>
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
                      <option key={index} value={city?._id}>{city?.city_name}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col lg={4} className='mb-2'>
                <label>Languages </label>
                <Form.Group className="mb-3" controlId="formLanguage">
                  <Form.Control type="text" placeholder="Enter language" value={languages} onChange={(e) => setLanguages(e.target.value)} />
                </Form.Group>
              </Col>
              <Col lg={4} className='mb-2'>
                <label>Address <span className='labelerrorssss'>*</span></label>
                <Form.Group className="mb-3" controlId="formLanguage">
                  {/* <Form.Control type="text" placeholder="Enter language" value={address} onChange={(e) => setAddress(e.target.value)} /> */}
                  <Form.Control
                    as="textarea"
                    rows={3}
                    style={{ height: '180px' }}
                    placeholder="Enter Address"
                    value={address} onChange={(e) => setAddress(e.target.value)}
                    ref={addressRef}
                  />
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
                  <Form.Control type="text" placeholder="Enter emergency contact name" value={emergencyName} onChange={(e) => setEmergencyName(e.target.value)} ref={emergencyNameRef} />
                </Form.Group>
              </Col>
              <Col lg={4} className='mb-2'>
                <label>Emergency Contact Number <span className='labelerrorssss'>*</span></label>
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
              <Col lg={4} className='mb-2'>
                <label>Emergency Contact Relationship </label>
                <Form.Group className="mb-3" controlId="formRelationship">
                  <Form.Select className='mb-3' value={emergencyRelationship} onChange={(e) => setEmergencyRelationship(e.target.value)}>
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

            </Row>
          </div>
        </div>

        <div className='profilegallery mb-5'>
          <h3 className='text-center'>Health Information</h3>
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
                    value={pastTreatments} onChange={(e) => setPastTreatments(e.target.value)}
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
                    value={regularMedication} onChange={(e) => setRegularMedication(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
          </div>
        </div>

        <div className='profilegallery mb-5'>
          <h3 className='text-center'>Tiffin Service Preference</h3>
          <div className='descr-content'>
            <Row>
              <Col lg={4} className='mb-2'>
                <label>Meal Preferences </label>
                <Form.Group className="mb-3" controlId="formMealPreferences">
                  {/* <Form.Select className='mb-3' value={mealPreferences} onChange={(e) => setMealPreferences(e.target.value)} >
                    <option hidden>Select Meal Preferences</option>
                    <option value="Veg">Veg</option>
                    <option value="Vegan">Vegan</option>
                    <option value="Swaminarayan">Swaminarayan</option>
                    <option value="Jain">Jain</option>
                  </Form.Select> */}
                  <Select
                    closeMenuOnSelect={false}
                    isMulti
                    options={mealPreferencesOptions}
                    value={mealPreferences}
                    className="custom-select"
                    placeholder="Select Meal Preferences"
                    onChange={handleMealPreferencesChange}
                    ref={mealPreferencesRef}
                  />

                </Form.Group>
              </Col>
              <Col lg={4} className='mb-2'>
                <label>Meal Timing </label>
                <Form.Group className="mb-3" controlId="formSkills">
                  {/* <Form.Select className='mb-3' value={mealTiming} onChange={(e) => setMealTiming(e.target.value)}>
                    <option hidden>Select Meal Timing</option>
                    <option value="Morning">Morning</option>
                    <option value="Afternoon">Afternoon</option>
                    <option value="Evening">Evening</option>
                    <option value="Night">Night</option>
                  </Form.Select> */}
                  <Select
                    closeMenuOnSelect={false}
                    isMulti
                    options={mealTimingOptions}
                    value={mealTiming}
                    className="custom-select"
                    placeholder="Select Meal Timing"
                    onChange={handleMealTimingChange}
                    ref={mealTimingRef}
                  />

                </Form.Group>
              </Col>
              <Col lg={4} className='mb-2'>
                <label>Dietary Restrictions </label>
                <Form.Group className="mb-3" controlId="formSkills">
                  <Form.Control
                    as="textarea"
                    rows={3}
                    style={{ height: '180px' }}
                    placeholder="Enter Coverage Details"
                    value={dietaryRestrictions} onChange={(e) => setDietaryRestrictions(e.target.value)}
                  />
                </Form.Group>
              </Col>

            </Row>
          </div>
        </div>
        <button type='submit' className='submitforms' onClick={handleSubmit}>Submit Form</button>

      </Container>
    </div>
  )
}

export default SeniorCitizenEditProfile;