import React, { useState, useEffect, useRef } from 'react'
import { Col, Container, Form, Row, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import PhoneInput, { formatPhoneNumber, formatPhoneNumberIntl, isValidPhoneNumber } from "react-phone-number-input";
import en from 'react-phone-number-input/locale/en';
import 'react-phone-number-input/style.css';
import profile from "../../../../assets/profile.png";
import companylogo from "../../../../assets/companylogo.png"
import Select from 'react-select';
import API_URL from '../../../../../config';

const SeniorcitizenNGOEditProfile = () => {

  const Navigate = useNavigate();

  const [countryList, setCountryList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);



  // State for each field
  const [ngoName, setNgoName] = useState('');
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [yearOfEstablishment, setYearOfEstablishment] = useState('');
  const [aboutNgo, setAboutNgo] = useState('');
  const [ngoType, setNgoType] = useState('');
  const [primaryService, setPrimaryService] = useState('');
  const [image, setImage] = useState(companylogo);
  const [logo, setLogo] = useState(null);

  const [primaryContactName, setPrimaryContactName] = useState('');
  const [primaryContactRole, setPrimaryContactRole] = useState('');
  const [isPhoneValid, setIsPhoneValid] = useState(true);
  const [primaryContactNumber, setPrimaryContactNumber] = useState('');
  const [primaryEmail, setPrimaryEmail] = useState('');
  const [officeAddress, setOfficeAddress] = useState('');
  const [subBranches, setSubBranches] = useState([{ address: "", contactNumber: "" }]);
  const [isbranchPhoneValid, setIsBranchPhoneValid] = useState(true);
  const [website, setWebsite] = useState('');
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');

  const [servicesDescription, setServicesDescription] = useState('');
  const [operatingHours, setOperatingHours] = useState('');
  const [availability, setAvailability] = useState('');
  const [numberOfVolunteers, setNumberOfVolunteers] = useState('');
  const [successStories, setSuccessStories] = useState('');

  const [mediaGallery, setMediaGallery] = useState([]);
  const [previewMedia, setPreviewMedia] = useState([]);

  const [loading, setLoading] = useState(false);

  const ngonameRef = useRef(null);
  const registrationnumberRef = useRef(null);
  const yearofestablishmentRef = useRef(null);
  const aboutngoRef = useRef(null);
  const ngotypeRef = useRef(null);
  const primaryserviceRef = useRef(null);
  const logoRef = useRef(null);
  const primarycontactnameRef = useRef(null);
  const primarycontactroleRef = useRef(null);
  const primarycontactnumberRef = useRef(null);
  const primaryemailRef = useRef(null);
  const officeaddressRef = useRef(null);
  const countryRef = useRef(null);
  const stateRef = useRef(null);
  const cityRef = useRef(null);
  const operatinghoursRef = useRef(null);
  const availabilityRef = useRef(null);
  const servicesdescriptionRef = useRef(null);
  const mediaRef = useRef(null);

  useEffect(() => {
    const url = window.location.href;
    const url1 = url.split("/")[3];
    const url2 = url1.split("?")[1];
    const id = url2.split("=")[1];
    getNGOdata(id)
    getCountry();
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



  const [ngodata, setNGOdata] = useState([])
  const [id, setId] = useState('')

  const getNGOdata = async (id) => {
    try {
      const requestOption = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };
      await fetch(`${API_URL}/api/getSeniorCitizenNGOdataById?id=${id}`, requestOption)
        .then((res) => res.json())
        .then((data) => {
          console.log(data)
          const ngo = data?.data[0]
          setNGOdata(data?.data[0])
          setId(ngo?._id)
          setNgoName(ngo?.ngoName)
          setRegistrationNumber(ngo?.registrationNumber)
          setYearOfEstablishment(ngo?.yearOfEstablishment)
          setAboutNgo(ngo?.aboutNgo)
          const ngoTypes = ngo?.ngoType.map(type => ({ value: type, label: type }));
          setNgoType(ngoTypes)
          setPrimaryService(ngo?.primaryService)
          setPrimaryContactName(ngo?.primaryContactName)
          setPrimaryContactRole(ngo?.primaryContactRole)
          setPrimaryContactNumber(ngo?.primaryContactNumber)
          setPrimaryEmail(ngo?.primaryEmail)
          setOfficeAddress(ngo?.officeAddress)
          setSubBranches(ngo?.subBranches)
          setWebsite(ngo?.website)
          setCountry(ngo?.country)
          setState(ngo?.state)
          setCity(ngo?.city)
          setServicesDescription(ngo?.servicesDescription)
          setOperatingHours(ngo?.operatingHours)
          setAvailability(ngo?.availability)
          setNumberOfVolunteers(ngo?.numberOfVolunteers)
          setSuccessStories(ngo?.successStories)
          setMediaGallery(ngo?.mediaGallery)
          setPreviewMedia(ngo?.mediaGallery)
          setLogo(ngo?.logo[0])

        })
    } catch (error) {
      console.log(error)
    }

  }

  console.log(ngodata)

  const ngoTypesOptions = [
    { value: 'Food Service', label: 'Food Service' },
    { value: 'Health', label: 'Health' },
    { value: 'Elder Care', label: 'Elder Care' },
    { value: 'General', label: 'General' },
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
      setLogo(file);
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
    setPrimaryContactNumber(value);
    if (value === '' || value === undefined) {
      setIsPhoneValid(true);
    } else {
      setIsPhoneValid(isValidPhoneNumber(value));
    }
  };

  const handleBranchPhoneChange = (index, value) => {
    // Create a new array with the updated contact number for the specific branch
    const updatedBranches = subBranches.map((branch, i) =>
      i === index ? { ...branch, contactNumber: value } : branch
    );

    // Update the state with the new subBranches array
    setSubBranches(updatedBranches);

    // Perform validation and set validation state
    const isValid = value === '' || value === undefined || isValidPhoneNumber(value);
    setIsBranchPhoneValid(isValid);
  };


  const maxCharacters = 500;

  const handleBioChange = (event) => {
    setAboutNgo(event.target.value.slice(0, maxCharacters)); // Limit the input to the maxCharacters
  };

  const handleNgoTypeChange = (e) => {
    setNgoType(e);
  }


  const handleAddBranch = () => {
    setSubBranches([...subBranches, { address: "", contactNumber: "" }]);
  };

  const handleRemoveBranch = (index) => {
    const newSubBranches = subBranches.filter((_, i) => i !== index);
    setSubBranches(newSubBranches);
  };

  const handleSubBranchChange = (index, field, value) => {
    const updatedSubBranches = [...subBranches];
    updatedSubBranches[index][field] = value;
    setSubBranches(updatedSubBranches);
  };



  const handleMediaChange = (e) => {
    const files = Array.from(e.target.files);
    const mediaCountLimit = 10; // Assuming there's a media count limit like photos

    if (mediaGallery?.length + files.length > mediaCountLimit) {
      const remainingSlots = mediaCountLimit - mediaGallery.length;
      const filesToAdd = files.slice(0, remainingSlots);

      swal({
        text: `You can only upload ${mediaCountLimit} media files (photos/videos)`,
        icon: "warning",
      });

      handleMediaFiles(filesToAdd);
    } else {
      handleMediaFiles(files);
    }
  };

  const handleMediaFiles = (files) => {
    const previews = files.map(file => {
      if (file.type.startsWith("image/")) {
        return { type: "image", preview: URL.createObjectURL(file) };
      } else if (file.type.startsWith("video/")) {
        return { type: "video", preview: URL.createObjectURL(file) };
      }
      return null;
    }).filter(Boolean);

    setMediaGallery([...mediaGallery, ...files]);
    setPreviewMedia([...previewMedia, ...previews]);
  };

  const removeMedia = (index) => {
    const updatedMediaGallery = [...mediaGallery];
    updatedMediaGallery.splice(index, 1);

    const updatedPreviews = [...previewMedia];
    updatedPreviews.splice(index, 1);

    setMediaGallery(updatedMediaGallery);
    setPreviewMedia(updatedPreviews);
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!ngoName) {
        swal({
          text: "Please enter NGO name.",
          icon: "warning",
        });
        ngonameRef.current.focus();
        return;
      }
      else if (!registrationNumber) {
        swal({
          text: "Please enter registration number.",
          icon: "warning",
        });
        registrationnumberRef.current.focus();
        return;
      }
      else if (!yearOfEstablishment) {
        swal({
          text: "Please enter year of establishment.",
          icon: "warning",
        });
        yearofestablishmentRef.current.focus();
        return;
      }
      else if (!aboutNgo) {
        swal({
          text: "Please enter about the NGO.",
          icon: "warning",
        });
        aboutngoRef.current.focus();
        return;
      }
      else if (!ngoType) {
        swal({
          text: "Please select type of NGO.",
          icon: "warning",
        });
        ngotypeRef.current.focus();
        return;
      }
      else if (!primaryService) {
        swal({
          text: "Please enter primary service offered.",
          icon: "warning",
        });
        primaryserviceRef.current.focus();
        return;
      }
      else if (logo.length == 0) {
        swal({
          text: "Please upload a logo.",
          icon: "warning",
        }).then(() => logoRef.current.click());
        document.getElementById('focusableDiv').focus();
        return;
      }
      else if (!primaryContactName) {
        swal({
          text: "Please enter primary contact name.",
          icon: "warning",
        });
        primarycontactnameRef.current.focus();
        return;
      }
      else if (!primaryContactRole) {
        swal({
          text: "Please enter primary contact role.",
          icon: "warning",
        });
        primarycontactroleRef.current.focus();
        return;
      }
      else if (!primaryContactNumber) {
        swal({
          text: "Please enter primary contact number.",
          icon: "warning",
        });
        primarycontactnumberRef.current.focus();
        return;
      }
      else if (!isPhoneValid) {
        swal({
          text: "Please enter a valid primary contact number.",
          icon: "warning",
        });
        primarycontactnumberRef.current.focus();
        return;
      }
      else if (!primaryEmail) {
        swal({
          text: "Please enter primary email.",
          icon: "warning",
        });
        primaryemailRef.current.focus();
        return;
      }
      else if (primaryEmail && (!primaryEmail.includes("@") || !primaryEmail.includes("."))) {
        swal({
          text: "Please enter a valid primary email.",
          icon: "warning",
        });
        primaryemailRef.current.focus();
        return;
      }
      else if (!officeAddress) {
        swal({
          text: "Please enter office address.",
          icon: "warning",
        });
        officeaddressRef.current.focus();
        return;
      }
      else if (!country) {
        swal({
          text: "Please select country.",
          icon: "warning",
        });
        countryRef.current.focus();
        return;
      }
      else if (!state) {
        swal({
          text: "Please select state.",
          icon: "warning",
        });
        stateRef.current.focus();
        return;
      }
      else if (!city) {
        swal({
          text: "Please select city.",
          icon: "warning",
        });
        cityRef.current.focus();
        return;
      }
      else if (!operatingHours) {
        swal({
          text: "Please enter operating hours.",
          icon: "warning",
        });
        operatinghoursRef.current.focus();
        return;
      }
      else if (!availability) {
        swal({
          text: "Please enter availability details.",
          icon: "warning",
        });
        availabilityRef.current.focus();
        return;
      }
      else if (!servicesDescription) {
        swal({
          text: "Please enter services description.",
          icon: "warning",
        });
        servicesdescriptionRef.current.focus();
        return;
      }
      else if (mediaGallery.length === 0) {
        swal({
          text: "Please upload media files (photos/videos).",
          icon: "warning",
        });
        mediaRef.current.focus();
        return;
      }
      else {
        setLoading(true);
      const ngoType_len = ngoType.length;
      const ngoTypeArr = [];
      for (let i = 0; i < ngoType_len; i++) {
        ngoTypeArr.push(ngoType[i].value);
      }
      const formData = new FormData();
      formData.append('id', id);
      formData.append('ngoName', ngoName);
      formData.append('registrationNumber', registrationNumber);
      formData.append('yearOfEstablishment', yearOfEstablishment);
      formData.append('aboutNgo', aboutNgo);
      formData.append('ngoType', JSON.stringify(ngoTypeArr));
      formData.append('primaryService', primaryService);
      formData.append('logo', logo);
      formData.append('primaryContactName', primaryContactName);
      formData.append('primaryContactRole', primaryContactRole);
      formData.append('primaryContactNumber', primaryContactNumber);
      formData.append('primaryEmail', primaryEmail);
      formData.append('officeAddress', officeAddress);
      formData.append('subBranches', JSON.stringify(subBranches));
      formData.append('website', website);
      formData.append('country', country);
      formData.append('state', state);
      formData.append('city', city);
      formData.append('servicesDescription', servicesDescription);
      formData.append('operatingHours', operatingHours);
      formData.append('availability', availability);
      formData.append('numberOfVolunteers', numberOfVolunteers);
      formData.append('successStories', successStories);
      mediaGallery.forEach(file => {
        if (file instanceof File) {
          formData.append('mediaGallery', file);
        } else {
          formData.append('mediaGallery', file.filename);
        }
      });

      console.table(Array.from(formData))
      const requestoptions = {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
        body: formData,
      };
      await fetch(`${API_URL}/api/updateSeniorCitizenNgoData`, requestoptions)
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
      console.log(error);
    }
  };


  return (
    <div>
      <Container fluid className='matrimonialform mt-5 mb-5'>
        <form onSubmit={handleSubmit}>
          <div className='profilegallery mb-5'>
            <h3 className='text-center'>NGO Details</h3>
            <div className='descr-content'>
              <Row>
                <Col lg={4} className='mb-2'>
                  <label>NGO Name <span className='labelerrorssss'>*</span></label>
                  <Form.Group className="mb-3">
                    <Form.Control
                      type="text"
                      placeholder="Enter NGO name"
                      value={ngoName}
                      onChange={(e) => setNgoName(e.target.value)}
                      ref={ngonameRef}

                    />
                  </Form.Group>
                </Col>
                <Col lg={4} className='mb-2'>
                  <label>Registration Number <span className='labelerrorssss'>*</span></label>
                  <Form.Group className="mb-3">
                    <Form.Control
                      type="text"
                      placeholder="Enter registration number"
                      value={registrationNumber}
                      onChange={(e) => setRegistrationNumber(e.target.value)}
                      ref={registrationnumberRef}

                    />
                  </Form.Group>
                </Col>
                <Col lg={4} className='mb-2'>
                  <label>Year of Establishment <span className='labelerrorssss'>*</span></label>
                  <Form.Group className="mb-3">
                    <Form.Control
                      type="text"
                      placeholder="Enter year of establishment"
                      value={yearOfEstablishment}
                      onChange={(e) => setYearOfEstablishment(e.target.value)}
                      ref={yearofestablishmentRef}

                    />
                  </Form.Group>
                </Col>
                <Col lg={4} className='mb-2'>
                  <label>About the NGO <span className='labelerrorssss'>*</span></label>
                  <Form.Group className="mb-3">
                    <Form.Control
                      as="textarea"
                      rows={3}
                      style={{ height: '180px' }}
                      placeholder="Enter NGO description"
                      value={aboutNgo}
                      onChange={handleBioChange}
                      ref={aboutngoRef}

                    />
                    <small className="text-muted">
                      {aboutNgo.length}/{maxCharacters} characters
                    </small>
                  </Form.Group>
                </Col>
                <Col lg={4} className='mb-2'>
                  <label>Type of NGO <span className='labelerrorssss'>*</span></label>
                  <Form.Group className="mb-3" >
                    {/* <Form.Select
                      className="mb-3"
                      value={ngoType}
                      onChange={(e) => setNgoType(e.target.value)}
                    >
                      <option hidden>Select Type of NGO</option>
                      <option value="Food Service">Food Service</option>
                      <option value="Health">Health</option>
                      <option value="Elder Care">Elder Care</option>
                      <option value="General">General</option>
                    </Form.Select> */}
                    <Select
                      closeMenuOnSelect={false}
                      isMulti
                      options={ngoTypesOptions}
                      value={ngoType}
                      className="custom-select"
                      placeholder="Select Type of NGO"
                      onChange={handleNgoTypeChange}
                      ref={ngotypeRef}
                    />
                  </Form.Group>
                </Col>
                <Col lg={4} className='mb-2'>
                  <label>Primary Service Offered <span className='labelerrorssss'>*</span></label>
                  <Form.Group className="mb-3">
                    <Form.Control
                      type="text"
                      placeholder="Enter primary service"
                      value={primaryService}
                      onChange={(e) => setPrimaryService(e.target.value)}
                      ref={primaryserviceRef}

                    />
                  </Form.Group>
                </Col>
                <Col lg={4} className='mb-2'>
                  <label>Logo <span className='labelerrorssss'>*</span></label>
                  <div className='profileimgc12'>
                    <img src={image != companylogo ? image : `${API_URL}/uploads/company_logo/${logo?.filename}`} alt="Profile" />
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
                      ref={logoRef}

                    />
                  </div>
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
            <h3 className='text-center'>NGO Contact Details</h3>
            <div className='descr-content'>
              <Row>
                <Col lg={4} className='mb-2'>
                  <label>Primary Contact Name <span className='labelerrorssss'>*</span></label>
                  <Form.Group className="mb-3">
                    <Form.Control
                      type="text"
                      placeholder="Enter contact name"
                      value={primaryContactName}
                      onChange={(e) => setPrimaryContactName(e.target.value)}
                      ref={primarycontactnameRef}

                    />
                  </Form.Group>
                </Col>
                <Col lg={4} className='mb-2'>
                  <label>Primary Contact Role <span className='labelerrorssss'>*</span></label>
                  <Form.Group className="mb-3">
                    <Form.Control
                      type="text"
                      placeholder="Enter contact role"
                      value={primaryContactRole}
                      onChange={(e) => setPrimaryContactRole(e.target.value)}
                      ref={primarycontactroleRef}

                    />
                  </Form.Group>
                </Col>
                <Col lg={4} className='mb-2'>
                  <label>Primary Contact Number <span className='labelerrorssss'>*</span></label>
                  <PhoneInput
                    className={`form-control ${!isPhoneValid ? 'is-invalid' : ''}`}
                    defaultCountry="IN"
                    international
                    countryCallingCodeEditable={false}
                    localization={en}
                    placeholder="Enter phone number"
                    value={primaryContactNumber}
                    onChange={handlePhoneChange}
                    ref={primarycontactnumberRef}

                  />
                </Col>
                <Col lg={4} className='mb-2'>
                  <label>Primary Email <span className='labelerrorssss'>*</span></label>
                  <Form.Group className="mb-3">
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      value={primaryEmail}
                      onChange={(e) => setPrimaryEmail(e.target.value)}
                      ref={primaryemailRef}

                    />
                  </Form.Group>
                </Col>
                <Col lg={4} className='mb-2'>
                  <label>Office Address <span className='labelerrorssss'>*</span></label>
                  <Form.Group className="mb-3">
                    <Form.Control
                      type="text"
                      placeholder="Enter office address"
                      value={officeAddress}
                      onChange={(e) => setOfficeAddress(e.target.value)}
                      ref={officeaddressRef}

                    />
                  </Form.Group>
                </Col>
                <Col lg={12}>
                  <label>Sub-Branches Information  (if any)
                    <div className='add-branch-btn' onClick={handleAddBranch}>
                      <i className="fa fa-plus" aria-hidden="true" ></i>
                    </div>
                  </label>
                  {subBranches?.map((branch, index) => (
                    <div key={index} className='mb-3'>
                      <Row>
                        <Col lg={4} className='mb-2'>
                          <label>Contact Number</label>


                          <PhoneInput
                            className={`form-control ${!isbranchPhoneValid ? 'is-invalid' : ''}`}
                            defaultCountry="IN"
                            international
                            countryCallingCodeEditable={false}
                            localization={en}
                            placeholder="Phone Number"
                            value={subBranches[index].contactNumber}  // Make sure to access the correct branch's contactNumber
                            onChange={(value) => handleBranchPhoneChange(index, value)}
                          />

                        </Col>
                        <Col lg={4} className='mb-2'>
                          <label>Sub-Branch Address</label>
                          <Form.Control
                            as="textarea"
                            rows={3}
                            style={{ height: '180px' }}
                            value={branch.address}
                            placeholder='Enter Sub-Branch Address'
                            onChange={(e) => handleSubBranchChange(index, 'address', e.target.value)}
                          />
                        </Col>

                        <Col lg={4} className='mb-2' >
                          <div className='remove-branch-btn' onClick={() => handleRemoveBranch(index)}>
                            <i className="fa fa-minus" aria-hidden="true" ></i>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  ))}

                </Col>
                <Col lg={4} className='mb-2'>
                  <label>Website <span className='labelerrorssss'>*</span></label>
                  <Form.Group className="mb-3">
                    <Form.Control
                      type="text"
                      placeholder="Enter website"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col lg={4} className='mb-2'>
                  <label>Country </label>
                  <Form.Group className="mb-3">
                    <Form.Select className='mb-3' value={country} onChange={handleCountrychange} ref={countryRef}>
                      <option hidden>Select Country</option>
                      {countryList?.map((country, index) => (
                        <option key={index} value={country?._id}>{country?.country_name}</option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col lg={4} className='mb-2'>
                  <label>State </label>
                  <Form.Group className="mb-3">
                    <Form.Select className='mb-3' value={state} onChange={handleStatechange} ref={stateRef}>
                      <option hidden>Select State</option>
                      {stateList?.map((state, index) => (
                        <option key={index} value={state?._id}>{state?.state_name}</option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col lg={4} className='mb-2'>
                  <label>City </label>
                  <Form.Group className="mb-3">
                    <Form.Select className='mb-3' value={city} onChange={handleCitychange} ref={cityRef}>
                      <option hidden>Select City</option>
                      {cityList?.map((city, index) => (
                        <option key={index} value={city?._id}>{city?.city_name}</option>
                      ))}
                    </Form.Select>
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
                  <label>Operating Hours <span className='labelerrorssss'>*</span></label>
                  <Form.Group className="mb-3">
                    <Form.Control
                      type="text"
                      placeholder="Enter operating hours"
                      value={operatingHours}
                      onChange={(e) => setOperatingHours(e.target.value)}
                      ref={operatinghoursRef}

                    />
                  </Form.Group>
                </Col>
                <Col lg={4} className='mb-2'>
                  <label>Availability <span className='labelerrorssss'>*</span></label>
                  <Form.Group className="mb-3">
                    <Form.Control
                      type="text"
                      placeholder="Enter availability details"
                      value={availability}
                      onChange={(e) => setAvailability(e.target.value)}
                      ref={availabilityRef}

                    />
                  </Form.Group>
                </Col>
                <Col lg={4} className='mb-2'>
                  <label>Number of Volunteers <span className='labelerrorssss'>*</span></label>
                  <Form.Group className="mb-3">
                    <Form.Control
                      type="number"
                      placeholder="Enter number of volunteers"
                      value={numberOfVolunteers}
                      onChange={(e) => setNumberOfVolunteers(e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col lg={4} className='mb-2'>
                  <label>Services Description <span className='labelerrorssss'>*</span></label>
                  <Form.Group className="mb-3">
                    <Form.Control
                      as="textarea"
                      rows={3}
                      placeholder="Enter services description"
                      value={servicesDescription}
                      onChange={(e) => setServicesDescription(e.target.value)}
                      style={{ height: '180px' }}
                      ref={servicesdescriptionRef}

                    />
                  </Form.Group>
                </Col>
                <Col lg={4} className='mb-2'>
                  <label>Success Stories <span className='labelerrorssss'>*</span></label>
                  <Form.Group className="mb-3">
                    <Form.Control
                      as="textarea"
                      rows={3}
                      placeholder="Enter success stories"
                      value={successStories}
                      onChange={(e) => setSuccessStories(e.target.value)}
                      style={{ height: '180px' }}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </div>
          </div>
          <div className='profilegallery mb-5'>
            <h3 className='text-center'>Media Gallery <span className='labelerrorssss'>*</span></h3>
            <div className='descr-content'>
              <div className="image-upload">
                <label style={{ cursor: "pointer" }} htmlFor="file_upload">
                  <div className="h-100">
                    <div className="dplay-tbl">
                      <div className="dplay-tbl-cell">
                        <i className="fa fa-cloud-upload" />
                        <h5><b>Choose Your Media (Photos/Videos)</b></h5>
                        <h6 className="mt-10 mb-70">Or Drop Your Media Here</h6>
                      </div>
                    </div>
                  </div>
                  <input
                    type="file"
                    id="file_upload"
                    className="image-input"
                    onChange={handleMediaChange}
                    multiple
                    accept=".jpg, .jpeg, .png, .mp4, .mov, .avi"
                    ref={mediaRef}

                  />
                </label>
              </div>
              <div>
                <Row>
                  {previewMedia?.map((media, index) => (
                    <Col lg={3} key={index}>
                      {media.filename ?
                        <div className='photo-container mb-2'>
                          {media.mimetype?.startsWith("image") ? (
                            <img src={`${API_URL}/uploads/photos/${media.filename}`} alt="Preview" className="photoorodfd" />
                          ) : (
                            <video src={`${API_URL}/uploads/photos/${media.filename}`} className="photoorodfd" controls />
                          )}
                          <button className='remove' onClick={() => removeMedia(index)}>
                            <span className='cross'>x</span>
                          </button>
                        </div>


                        :
                        <div className='photo-container mb-2'>
                          {media.type === "image" ? (
                            <img src={media.preview} alt="Preview" className="photoorodfd" />
                          ) : (
                            <video src={media.preview} className="photoorodfd" controls />
                          )}
                          <button className='remove' onClick={() => removeMedia(index)}>
                            <span className='cross'>x</span>
                          </button>
                        </div>
                      }
                    </Col>
                  ))}
                </Row>
              </div>
            </div>
          </div>

          <div className='text-center'>
            <button type='submit' className='submitforms' onClick={handleSubmit}>Submit Form</button>
          </div>
        </form>
      </Container>
    </div>
  );
};

export default SeniorcitizenNGOEditProfile;
