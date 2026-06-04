import React, { useState, useEffect, useRef } from 'react'
import { Col, Container, Form, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import profile from "../../../assets/profile.png"
import companylogo from "../../../assets/companylogo.png"
import companybusinessfront from "../../../assets/companybusinessfront.png"
import companybusinessback from "../../../assets/companybusinessback.png"
import swal from 'sweetalert';
import PhoneInput, { formatPhoneNumber, formatPhoneNumberIntl, isValidPhoneNumber } from "react-phone-number-input";
import en from 'react-phone-number-input/locale/en';
import 'react-phone-number-input/style.css'
import API_URL from '../../../../config';

const Businesseditform = () => {
  const Navigate = useNavigate();


  const [image, setImage] = useState(companylogo);
  const [companybusinessfrontimage, setCompanybusinessfrontimage] = useState(companybusinessfront);
  const [companybusinessbackimage, setCompanybusinessbackimage] = useState(companybusinessback);
  const [loading, setLoading] = useState(false);
  const [ispersonalPhoneValid, setIsPersonalPhoneValid] = useState(true);
  const [ispersonalAlternatePhoneValid, setIsPersonalAlternatePhoneValid] = useState(true);
  const [ispersonalWhatsappPhoneValid, setIsPersonalWhatsappPhoneValid] = useState(true);
  const [isPhoneValid, setIsPhoneValid] = useState(true);
  const [isAlternatePhoneValid, setIsAlternatePhoneValid] = useState(true);
  const [isWhatsappPhoneValid, setIsWhatsappPhoneValid] = useState(true);

  const [categorylist, setCategorylist] = useState([]);
  const [subcategorylist, setSubCategorylist] = useState([]);

  const [personalcountrylist, setPersonalcountrylist] = useState([]);
  const [personalstatelist, setPersonalstatelist] = useState([]);
  const [personalcitylist, setPersonalcitylist] = useState([]);

  const [countryList, setCountryList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [companytype, setCompanytypelist] = useState([]);
  const [businesstypelist, setBusinesstypelist] = useState([]);

  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [personalphone, setPersonalPhone] = useState('')
  const [personalalternatephone, setPersonalAlternatePhone] = useState('')
  const [personalwhatsapp, setPersonalWhatsapp] = useState('')
  const [personalemail, setPersonalEmail] = useState('')
  const [personallocation, setPersonallocation] = useState('')
  const [personalcountryid, setPersonalcountryId] = useState('')
  const [personalstateid, setPersonalStateid] = useState('')
  const [personalcityid, setPersonalCityid] = useState('')
  const [personalwebsite, setPersonalWebsite] = useState('')
  const [personalblog, setPersonalBlog] = useState('')
  const [personallinkedin, setPersonalLinkedin] = useState('')
  const [personaltwitter, setPersonalTwitter] = useState('')
  const [personalfacebook, setPersonalFacebook] = useState('')
  const [personalinstagram, setPersonalInstagram] = useState('')
  const [personalyoutube, setPersonalYoutube] = useState('')
  const [personalpodcast, setPersonalPodcast] = useState('')

  const [logo, setLogo] = useState([]);
  const [businesscardfront, setBusinesscardfront] = useState([]);
  const [businesscardback, setBusinesscardback] = useState([]);

  const [company_name, SetCompany_Name] = useState('');
  const [company_industry_exp, setCompany_industry_exp] = useState('');
  const [company_type, SetCompany_Type] = useState('');
  const [company_bio, setCompany_Bio] = useState("");

  const [businesscategory, SetBusinessCategory] = useState('');
  const [businesssubcategory, SetBusinessSubCategory] = useState('');
  const [businesstype, SetBusinessType] = useState('');
  const [businessdescription, SetBusinessDescription] = useState('');

  const [country_id, setCountry_id] = useState('');
  const [state_id, setState_id] = useState('');
  const [city_id, setCity_id] = useState('');
  const [company_address, setCompanyAddress] = useState('');
  const [branch1, setBranch1] = useState('');
  const [branch2, setBranch2] = useState('');

  const [company_phone, setCompany_Phone] = useState('');
  const [company_alternate_phone, setCompany_Alternate_Phone] = useState('');
  const [company_whatsapp, setCompany_Whatsapp] = useState('');
  const [company_email, setCompany_Email] = useState('');
  const [company_website, setCompany_Website] = useState('');

  const [linkedin_link, setLinkedin_link] = useState('');
  const [twitter_link, setTwitter_link] = useState('');
  const [instagram_link, setInstagram_link] = useState('');
  const [facebook_link, setFacebook_link] = useState('');
  const [youtube_link, setYoutube_link] = useState('');
  const [podcast_link, setPodcast_link] = useState('');
  const [id, setId] = useState('');


  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const personalPhoneRef = useRef(null);
  const personalAlternatePhoneRef = useRef(null);
  const personalWhatsappRef = useRef(null);
  const personalEmailRef = useRef(null);
  const personalCountryRef = useRef(null);
  const personalStateRef = useRef(null);
  const personalCityRef = useRef(null);

  const personalLinkedinRef = useRef(null);
  const personalTwitterRef = useRef(null);

  const companyNameRef = useRef(null);
  const companyIndustryExpRef = useRef(null);
  const companyTypeRef = useRef(null);
  const companyBioRef = useRef(null);

  const businessCategoryRef = useRef(null);
  const businessSubCategoryRef = useRef(null);
  const businessTypeRef = useRef(null);
  const businessDescriptionRef = useRef(null);

  const countryRef = useRef(null);
  const stateRef = useRef(null);
  const cityRef = useRef(null);
  const companyAddressRef = useRef(null);

  const companyPhoneRef = useRef(null);
  const companyAlternatePhoneRef = useRef(null);
  const companyWhatsappRef = useRef(null);
  const companyEmailRef = useRef(null);
  const companyWebsiteRef = useRef(null);


  useEffect(() => {
    const url = window.location.href;
    const url1 = url.split("/")[3];
    const url2 = url1.split("?")[1];
    const id = url2.split("=")[1];
    getBusinessdata(id)
    getCountry();
    getCategorylist();
    getCompanytypelist();
    getBusinesstypelist();
    getpersonalCountry()
  }, []);

  useEffect(() => {
    if(personalcountryid) getpersonalState();
  }, [personalcountryid]);

  useEffect(() => {
    if (personalstateid) getpersonalCity();
  }, [personalstateid]);


  useEffect(() => {
    if (country_id) getState();
  }, [country_id]);

  useEffect(() => {
    if (state_id) getCity();
  }, [state_id]);


  useEffect(() => {
    if (businesscategory) getsubCategorylist();
  }, [businesscategory])

  const getCategorylist = async () => {
    try {
      const response = await fetch(`${API_URL}/api/getBusinessCategory`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      setCategorylist(data.data);
    } catch (error) {
      console.log(error);
    }
  }

  const getsubCategorylist = async () => {
    try {
      const response = await fetch(`${API_URL}/api/getBusinessByCategory?id=${businesscategory}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      setSubCategorylist(data.data);
    } catch (error) {
      console.log(error);
    }
  }

  const getCompanytypelist = async () => {
    try {
      const response = await fetch(`${API_URL}/api/getCompanyType`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      setCompanytypelist(data.data);
    } catch (error) {
      console.log(error);
    }
  }

  const getBusinesstypelist = async () => {
    try {
      const response = await fetch(`${API_URL}/api/getBusinessType`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      setBusinesstypelist(data.data);
    } catch (error) {
      console.log(error);
    }
  }

  const getpersonalCountry = async () => {
    try {
      const requestoptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      };
      await fetch(`${API_URL}/api/countryList`, requestoptions)
        .then(response => response.json())
        .then(data => {
          console.log(data.data);
          setPersonalcountrylist(data.data)
        })
    }
    catch (err) {
      console.error(err.message);
    }
  }


  const getpersonalState = async () => {
    try {
      const requestoptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      };
      await fetch(`${API_URL}/api/getstatebycountry?country_id=${personalcountryid}`, requestoptions)
        .then(response => response.json())
        .then(data => {
          console.log(data.data);
          setPersonalstatelist(data.data)
        })
    }
    catch (err) {
      console.error(err.message);
    }
  }

  const getpersonalCity = async () => {
    try {
      const requestoptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      };
      await fetch(`${API_URL}/api/getcitybystate?state_id=${personalstateid}`, requestoptions)
        .then(response => response.json())
        .then(data => {
          console.log(data.data);
          setPersonalcitylist(data.data)
        })
    }
    catch (err) {
      console.error(err.message);
    }
  }

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


  // const handleImageChange = (e) => {
  //   const reader = new FileReader();
  //   const file = e.target.files[0];
  //   setLogo(file);
  //   reader.onloadend = () => {
  //     setImage(reader.result);
  //   };
  //   if (file) {
  //     reader.readAsDataURL(file);
  //   }
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

  const handleBusinessfrontChange = (e) => {
    const file = e.target.files[0];
    console.log(file)

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



  const handlepersonalPhoneChange = (value) => {
    setPersonalPhone(value);
    if (value === '' || value === undefined) {
      setIsPersonalPhoneValid(true);
    } else {
      setIsPersonalPhoneValid(isValidPhoneNumber(value));
    }
  };

  const handlepersonalalternatePhoneChange = (value) => {
    setPersonalAlternatePhone(value);
    if (value === '' || value === undefined) {
      setIsPersonalAlternatePhoneValid(true);
    } else {
      setIsPersonalAlternatePhoneValid(isValidPhoneNumber(value));
    }
  };

  const handlepersonalWhatsappPhoneChange = (value) => {
    setPersonalWhatsapp(value);
    if (value === '' || value === undefined) {
      setIsPersonalWhatsappPhoneValid(true);
    } else {
      setIsPersonalWhatsappPhoneValid(isValidPhoneNumber(value));
    }
  };

  const handlepersonalCountrychange = (e) => {
    setPersonalcountryId(e.target.value)
    setPersonalstatelist([])
    setPersonalStateid('')
    setPersonalcitylist([])
    setPersonalCityid([])
  }

  const handlepersonalStatechange = (e) => {
    setPersonalStateid(e.target.value)
    setPersonalcitylist([])
    setPersonalCityid([])
  }

  const handlepersonalCitychange = (e) => {
    setPersonalCityid(e.target.value)
  }


  const handlePhoneChange = (value) => {
    setCompany_Phone(value);
    if (value === '' || value === undefined) {
      setIsPhoneValid(true);
    } else {
      setIsPhoneValid(isValidPhoneNumber(value));
    }
  };

  const handleAlternatePhoneChange = (value) => {
    setCompany_Alternate_Phone(value);
    if (value === '' || value === undefined) {
      setIsAlternatePhoneValid(true);
    } else {
      setIsAlternatePhoneValid(isValidPhoneNumber(value));
    }
  };

  const handleWhatsappPhoneChange = (value) => {
    setCompany_Whatsapp(value);
    if (value === '' || value === undefined) {
      setIsWhatsappPhoneValid(true);
    } else {
      setIsWhatsappPhoneValid(isValidPhoneNumber(value));
    }
  };

  const handleCategorychange = (e) => {
    SetBusinessCategory(e.target.value)
    setSubCategorylist([])
    SetBusinessSubCategory('')
  }

  const handleSubCategorychange = (e) => {
    SetBusinessSubCategory(e.target.value)
  }


  const handleCountrychange = (e) => {
    setCountry_id(e.target.value)
    setStateList([])
    setState_id('')
    setCityList([])
    setCity_id([])
  }

  const handleStatechange = (e) => {
    setState_id(e.target.value)
    setCityList([])
    setCity_id([])
  }

  const handleCitychange = (e) => {
    setCity_id(e.target.value)
  }


  const [businessdata, setBusinessdata] = useState([])

  console.log(businessdata)


  const getBusinessdata = async (id) => {
    try {
      const requestOption = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };
      await fetch(`${API_URL}/api/getNetworkById?id=${id}`, requestOption)
        .then((res) => res.json())
        .then((data) => {
          console.log(data?.data[0])
          const { data: profile } = data;
          const business = data?.data[0]

          console.log(business)
          setBusinessdata(business)
          setId(business?._id)
          // Setting personal details
          setFirstname(business?.firstname);
          setLastname(business?.lastname);
          setPersonalPhone(business?.personalphone);
          setPersonalAlternatePhone(business?.personalalternatephone);
          setPersonalWhatsapp(business?.personalwhatsapp);
          setPersonalEmail(business?.personalemail);
          setPersonallocation(business?.personallocation);
          setPersonalcountryId(business?.personalcountryid);
          setPersonalStateid(business?.personalstateid);
          setPersonalCityid(business?.personalcityid);
          setPersonalWebsite(business?.personalwebsite);
          setPersonalBlog(business?.personalblog);
          setPersonalLinkedin(business?.personalsocialMedia?.personallinkedin);
          setPersonalTwitter(business?.personalsocialMedia?.personaltwitter);
          setPersonalFacebook(business?.personalsocialMedia?.personalfacebook);
          setPersonalInstagram(business?.personalsocialMedia?.personalinstagram);
          setPersonalYoutube(business?.personalsocialMedia?.personalyoutube);
          setPersonalPodcast(business?.personalsocialMedia?.personalpodcast);

          // Setting company details
          setLogo(business?.logo?.length ? business?.logo[0] : []);
          setBusinesscardfront(business?.businesscardfront?.length ? business?.businesscardfront[0] : []);
          setBusinesscardback(business?.businesscardback?.length ? business?.businesscardback[0] : []);
          SetCompany_Name(business?.company_name);
          setCompany_industry_exp(business?.company_industry_exp);
          SetCompany_Type(business?.company_type);
          setCompany_Bio(business?.company_bio)

          // Setting business details
          SetBusinessCategory(business?.businesscategory);
          SetBusinessSubCategory(business?.businesssubcategory);
          SetBusinessType(business?.businesstype);
          SetBusinessDescription(business?.businessdescription);

          // Setting company location
          setCountry_id(business?.company_country);
          setState_id(business?.company_state);
          setCity_id(business?.company_city);
          setCompanyAddress(business?.company_address)
          setBranch1(business?.branch1)
          setBranch2(business?.branch2)

          // Setting company contact information
          setCompany_Phone(business?.company_phone);
          setCompany_Alternate_Phone(business?.company_alternate_phone);
          setCompany_Whatsapp(business?.company_whatsapp);
          setCompany_Email(business?.company_email);
          setCompany_Website(business?.company_website);

          // Setting social media links
          setLinkedin_link(business?.companysocialMedia?.linkedinLink);
          setTwitter_link(business?.companysocialMedia?.twitterLink);
          setInstagram_link(business?.companysocialMedia?.instagramLink);
          setFacebook_link(business?.companysocialMedia?.facebookLink);
          setYoutube_link(business?.companysocialMedia?.youtubeLink);
          setPodcast_link(business?.companysocialMedia?.podcastLink);



        })
    } catch (error) {
      console.log(error)
    }

  }




  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      if (!firstname) {
        swal({
          text: "Please Enter First Name",
          icon: "warning",
        });
        firstNameRef.current.focus();
        return false;
      }
      else if (!lastname) {
        swal({
          text: "Please Enter Last Name",
          icon: "warning",
        });
        lastNameRef.current.focus();
        return false;
      }
      else if (!personalphone) {
        swal({
          text: "Please Enter Mobile Number",
          icon: "warning",
        });
        personalPhoneRef.current.focus();
        return false;
      }
      else if (!ispersonalPhoneValid) {
        swal({
          text: "Please Enter Valid Mobile Number",
          icon: "warning",
        });
        personalPhoneRef.current.focus();
        return false;
      }
      else if (personalalternatephone && (!ispersonalAlternatePhoneValid)) {
        swal({
          text: "Please Enter Valid Alternate Mobile Number",
          icon: "warning",
        });
        personalAlternatePhoneRef.current.focus();
        return false;
      }
      else if (personalwhatsapp && (!ispersonalWhatsappPhoneValid)) {
        swal({
          text: "Please Enter Valid WhatsApp Number",
          icon: "warning",
        });
        personalWhatsappRef.current.focus();
        return false;
      }
      else if (!personalemail) {
        swal({
          text: "Please Enter Email",
          icon: "warning",
        });
        personalEmailRef.current.focus();
        return false;
      }
      else if (personalemail !== '' && (!personalemail?.includes('@') || !personalemail?.includes('.'))) {
        swal({
          text: "Please enter valid Email Id",
          icon: "warning",
        })
        personalEmailRef.current.focus();
        return;
      }
      else if (!personalcountryid) {
        swal({
          text: "Please Select Country",
          icon: "warning",
        });
        personalCountryRef.current.focus();
        return false;
      }
      else if (!personalstateid) {
        swal({
          text: "Please Select State",
          icon: "warning",
        });
        personalStateRef.current.focus();
        return false;
      }
      else if (!personalcityid) {
        swal({
          text: "Please Select City",
          icon: "warning",
        });
        personalCityRef.current.focus();
        return false;
      }
      else if (!personallinkedin) {
        swal({
          text: "Please Enter Linkedin Link",
          icon: "warning",
        });
        personalLinkedinRef.current.focus();
        return false;
      }
      else if (!personaltwitter) {
        swal({
          text: "Please Enter Twitter Link",
          icon: "warning",
        });
        personalTwitterRef.current.focus();
        return false;
      }
      else if (!company_name) {
        swal({
          text: "Please Enter Company Name",
          icon: "warning",
        });
        companyNameRef.current.focus();
        return false;
      }
      else if (!company_industry_exp) {
        swal({
          text: "Please Enter Industry Experience",
          icon: "warning",
        });
        companyIndustryExpRef.current.focus();
        return false;
      }
      else if (!company_type) {
        swal({
          text: "Please Select Company Type",
          icon: "warning",
        });
        companyTypeRef.current.focus();
        return false;
      }
      else if (!company_bio) {
        swal({
          text: "Please Enter Company Bio",
          icon: "warning",
        });
        companyBioRef.current.focus();
        return false;
      }
      else if (!businesscategory) {
        swal({
          text: "Please Select Business Category",
          icon: "warning",
        });
        businessCategoryRef.current.focus();
        return false;
      }
      else if (!businesssubcategory) {
        swal({
          text: "Please Select Business Sub Category",
          icon: "warning",
        });
        businessSubCategoryRef.current.focus();
        return false;
      }
      else if (!businesstype) {
        swal({
          text: "Please Select Business Type",
          icon: "warning",
        });
        businessTypeRef.current.focus();
        return false;
      }
      else if (!businessdescription) {
        swal({
          text: "Please Enter Business Description",
          icon: "warning",
        });
        businessDescriptionRef.current.focus();
        return false;
      }
      else if (!country_id) {
        swal({
          text: "Please Select Country",
          icon: "warning",
        });
        countryRef.current.focus();
        return false;
      }
      else if (!state_id) {
        swal({
          text: "Please Select State",
          icon: "warning",
        });
        stateRef.current.focus();
        return false;
      }
      else if (!city_id) {
        swal({
          text: "Please Select City",
          icon: "warning",
        });
        cityRef.current.focus();
        return false;
      }
      else if (!company_address) {
        swal({
          text: "Please Enter Company Address",
          icon: "warning",
        });
        companyAddressRef.current.focus();
        return false;
      }
      else if (!company_phone) {
        swal({
          text: "Please Enter Company Phone",
          icon: "warning",
        });
        companyPhoneRef.current.focus();
        return false;
      }
      else if (!isPhoneValid) {
        swal({
          text: "Please Enter Valid Company Phone",
          icon: "warning",
        });
        companyPhoneRef.current.focus();
        return false;
      }
      else if (company_alternate_phone && (!isAlternatePhoneValid)) {
        swal({
          text: "Please Enter Valid Alternate Phone",
          icon: "warning",
        });
        companyAlternatePhoneRef.current.focus();
        return false;
      }
      else if (!company_whatsapp) {
        swal({
          text: "Please Enter Company Whatsapp",
          icon: "warning",
        });
        companyWhatsappRef.current.focus();
        return false;
      }
      else if (!isWhatsappPhoneValid) {
        swal({
          text: "Please Enter Valid Company Whatsapp",
          icon: "warning",
        });
        companyWhatsappRef.current.focus();
        return false;
      }
      else if (!company_email) {
        swal({
          text: "Please Enter Company Email",
          icon: "warning",
        });
        companyEmailRef.current.focus();
        return false;
      }
      else if (company_email !== '' && (!company_email?.includes('@') || !company_email?.includes('.'))) {
        swal({
          text: "Please enter valid Company Email Id",
          icon: "warning",
        })
        companyEmailRef.current.focus();
        return;
      }
      else if (!company_website) {
        swal({
          text: "Please Enter Company Website",
          icon: "warning",
        });
        companyWebsiteRef.current.focus();
        return false;
      }

      setLoading(true);

      const formdata = new FormData();
      formdata.append('id', id);
      formdata.append('firstname', firstname)
      formdata.append('lastname', lastname)
      formdata.append('personalphone', personalphone)
      formdata.append('personalalternatephone', personalalternatephone)
      formdata.append('personalwhatsapp', personalwhatsapp)
      formdata.append('personalemail', personalemail)
      formdata.append('personallocation', personallocation)
      formdata.append('personalcountryid', personalcountryid)
      formdata.append('personalstateid', personalstateid)
      formdata.append('personalcityid', personalcityid)
      formdata.append('personalwebsite', personalwebsite)
      formdata.append('personalblog', personalblog)
      formdata.append('personallinkedin', personallinkedin)
      formdata.append('personaltwitter', personaltwitter)
      formdata.append('personalfacebook', personalfacebook)
      formdata.append('personalinstagram', personalinstagram)
      formdata.append('personalyoutube', personalyoutube)
      formdata.append('personalpodcast', personalpodcast)


      formdata.append('file', logo)
      formdata.append('businesscardfront', businesscardfront)
      formdata.append('businesscardback', businesscardback)
      formdata.append('company_name', company_name)
      formdata.append('company_industry_exp', company_industry_exp)
      formdata.append('company_type', company_type)
      formdata.append('company_bio', company_bio)

      formdata.append('businesscategory', businesscategory)
      formdata.append('businesssubcategory', businesssubcategory)
      formdata.append('businesstype', businesstype)
      formdata.append('businessdescription', businessdescription)

      formdata.append('company_country', country_id)
      formdata.append('company_state', state_id)
      formdata.append('company_city', city_id)
      formdata.append('company_address', company_address)
      formdata.append('branch1', branch1)
      formdata.append('branch2', branch2)

      formdata.append('company_phone', company_phone)
      formdata.append('company_alternate_phone', company_alternate_phone)
      formdata.append('company_whatsapp', company_whatsapp)
      formdata.append('company_email', company_email)
      formdata.append('company_website', company_website)

      formdata.append('linkedinLink', linkedin_link)
      formdata.append('twitterLink', twitter_link)
      formdata.append('instagramLink', instagram_link)
      formdata.append('facebookLink', facebook_link)
      formdata.append('youtubeLink', youtube_link)
      formdata.append('podcastLink', podcast_link)
      formdata.append('networking_type', 'business')




      // formdata.append('company_address', company_address)
      // formdata.append('company_location', company_location)
      // formdata.append('company_profile', company_profile)
      // formdata.append('company_category', categoryid)
      // formdata.append('company_subcategory', subcategoryid)


      console.table(Array.from(formdata))

      // return false;

      const requestoptions = {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
        body: formdata,
      };
      await fetch(`${API_URL}/api/updateNetwork`, requestoptions)
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

    } catch (err) {
      console.error(err.message);
    }
  }

  const maxCharacters = 200;

  const handleBioChange = (event) => {
    setCompany_Bio(event.target.value.slice(0, maxCharacters)); // Limit the input to the maxCharacters
  };


  console.log('firstname', firstname)
  console.log('personallinkedin', personallinkedin)
  console.log('logo', logo.filename)
  console.log('businesscardfront', businesscardfront.filename)
  console.log('businesscardback', businesscardback.filename)

  const allowOnlyNumbers = (e) => {
    e.preventDefault();
    const input = e.target;
    const value = input.value.replace(/[^\d]/g, ''); // Replace any non-numeric characters with an empty string
    input.value = value; // Set the input value to the filtered value
  }

  console.log('companybusinessback', companybusinessback)
  console.log('companybusinessbackimage', companybusinessbackimage)
  console.log('logo', logo)


  return (
    <div>
      <Container fluid className='matrimonialform mt-5 mb-5'>
        <div className='profilegallery mb-5'>
          <h3 className='text-center'>Personal Information</h3>
          <div className='descr-content'>
            <Row>
              <Col lg={4} className='mb-2'>
                <label>First Name <span className='labelerrorssss'>*</span></label>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Control type="text" placeholder="Enter Your First Name" defaultValue={firstname} onChange={(e) => setFirstname(e.target.value)} ref={firstNameRef} />
                </Form.Group>
              </Col>
              <Col lg={4} className='mb-2'>
                <label>Last Name <span className='labelerrorssss'>*</span></label>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Control type="text" placeholder="Enter Your Last Name" defaultValue={lastname} onChange={(e) => setLastname(e.target.value)} ref={lastNameRef} />
                </Form.Group>
              </Col>
              <Col lg={4} className='mb-2'>
                <label>Mobile Number <span className='labelerrorssss'>*</span></label>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <PhoneInput
                    className={`form-control ${!ispersonalPhoneValid ? 'is-invalid' : ''}`}
                    defaultCountry="IN"
                    international
                    countryCallingCodeEditable={false}
                    localization={en}
                    placeholder="Phone Number"
                    value={personalphone}
                    onChange={handlepersonalPhoneChange}
                    ref={personalPhoneRef}
                  />
                </Form.Group>
              </Col>
              <Col lg={4} className='mb-2'>
                <label>Alternate Mobile Number </label>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <PhoneInput
                    className={`form-control ${!ispersonalAlternatePhoneValid ? 'is-invalid' : ''}`}
                    defaultCountry="IN"
                    international
                    countryCallingCodeEditable={false}
                    localization={en}
                    placeholder="Phone Number"
                    value={personalalternatephone}
                    onChange={handlepersonalalternatePhoneChange}
                    ref={personalAlternatePhoneRef}
                  />
                </Form.Group>
              </Col>
              <Col lg={4} className='mb-2'>
                <label>WhatsApp Number</label>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <PhoneInput
                    className={`form-control ${!ispersonalWhatsappPhoneValid ? 'is-invalid' : ''}`}
                    defaultCountry="IN"
                    international
                    countryCallingCodeEditable={false}
                    localization={en}
                    placeholder="Phone Number"
                    value={personalwhatsapp}
                    onChange={handlepersonalWhatsappPhoneChange}
                    ref={personalWhatsappRef}
                  />
                </Form.Group>
              </Col>
              <Col lg={4} className='mb-2'>
                <label>Email <span className='labelerrorssss'>*</span></label>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Control type="email" placeholder="Enter Your Email Id" defaultValue={personalemail} onChange={(e) => setPersonalEmail(e.target.value)} ref={personalEmailRef} />
                </Form.Group>
              </Col>
              <Col lg={4} className='mb-2'>
                <label>Location</label>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Control type="text" placeholder="Enter Your Location" defaultValue={personallocation} onChange={(e) => setPersonallocation(e.target.value)} />
                </Form.Group>
              </Col>
              <Col lg={4} className='mb-2'>
                <label>Country <span className='labelerrorssss'>*</span></label>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Select className='mb-3' onChange={handlepersonalCountrychange} ref={personalCountryRef}>
                    <option hidden>Select Country </option>
                    {personalcountrylist?.map((country, index) => (
                      <option key={index} selected={personalcountryid == country?._id} value={country?._id}>{country?.country_name}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col lg={4} className='mb-2'>
                <label>State <span className='labelerrorssss'>*</span></label>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Select className='mb-3' onChange={handlepersonalStatechange} ref={personalStateRef}>
                    <option hidden>Select State</option>
                    {personalstatelist?.map((state, index) => (
                      <option key={index} selected={personalstateid == state?._id} value={state?._id}>{state?.state_name}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col lg={4} className='mb-2'>
                <label>City <span className='labelerrorssss'>*</span></label>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Select className='mb-3' onChange={handlepersonalCitychange} ref={personalCityRef}>
                    <option hidden>Select City</option>
                    {personalcitylist?.map((city, index) => (
                      <option key={index} selected={personalcityid == city?._id} value={city._id}>{city.city_name}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
          </div>
        </div>
        <div className='profilegallery mb-5'>
          <h3 className='text-center'>Personal Social Profiles</h3>
          <div className='descr-content'>
            <Row>
              <Col lg={4} className='mb-2'>
                <label>Personal Website </label>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Control type="text" placeholder="Enter Your Personal Website" defaultValue={personalwebsite} onChange={(e) => setPersonalWebsite(e.target.value)} />
                </Form.Group>
              </Col>
              <Col lg={4} className='mb-2'>
                <label>Blog </label>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Control type="text" placeholder="Enter Your Blog" defaultValue={personalblog} onChange={(e) => setPersonalBlog(e.target.value)} />
                </Form.Group>
              </Col>
              <Col lg={4} className='mb-2'>
                <label>LinkedIn <span className='labelerrorssss'>*</span></label>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Control type="text" placeholder="Enter Your Linkedin Link" defaultValue={personallinkedin} onChange={(e) => setPersonalLinkedin(e.target.value)} ref={personalLinkedinRef} />
                </Form.Group>
              </Col>
              <Col lg={4} className='mb-2'>
                <label>Twitter <span className='labelerrorssss'>*</span></label>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Control type="text" placeholder="Enter Your Twitter Link" defaultValue={personaltwitter} onChange={(e) => setPersonalTwitter(e.target.value)} ref={personalTwitterRef} />
                </Form.Group>
              </Col>
              <Col lg={4} className='mb-2'>
                <label>Facebook</label>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Control type="text" placeholder="Enter Your Facebook Link" defaultValue={personalfacebook} onChange={(e) => setPersonalFacebook(e.target.value)} />
                </Form.Group>
              </Col>
              <Col lg={4} className='mb-2'>
                <label>Instagram</label>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Control type="text" placeholder="Enter Your Instagram Link" defaultValue={personalinstagram} onChange={(e) => setPersonalInstagram(e.target.value)} />
                </Form.Group>
              </Col>
              <Col lg={4} className='mb-2'>
                <label>Youtube Channel</label>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Control type="text" placeholder="Enter Your Youtube Channel Link" defaultValue={personalyoutube} onChange={(e) => setPersonalYoutube(e.target.value)} />
                </Form.Group>
              </Col>
              <Col lg={4} className='mb-2'>
                <label>Podcast Link</label>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Control type="text" placeholder="Enter Your Podcast Link" defaultValue={personalpodcast} onChange={(e) => setPersonalPodcast(e.target.value)} />
                </Form.Group>
              </Col>
            </Row>
          </div>
        </div>
        <div className='profilegallery mb-5'>
          <h3 className='text-center'>Company Information</h3>
          <div className='descr-content'>
            <Row>
              <Row>
                <Col lg={4}>
                  <label>Logo</label>
                  <div className='profileimgc12'>
                    <img src={image != companylogo || !logo || logo?.filename == undefined || logo == [] ? image : `${API_URL}/uploads/company_logo/${logo.filename}`} alt="Profile" />
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
                    {/* <img src={`${API_URL}/uploads/business_card/${businesscardfront.filename}`} alt="Profile" /> */}
                    <img src={companybusinessfrontimage != companybusinessfront || !businesscardfront || businesscardfront?.filename == undefined ? companybusinessfrontimage : `${API_URL}/uploads/business_card/${businesscardfront?.filename }`} alt="Profile" />
                    <div className='image edit1' style={{ width: '19%' }} onClick={() => document.getElementById('uploadInput1').click()}>
                      <i className='fa fa-edit' > Select File</i>
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
                    {/* <img src={companybusinessbackimage} alt="Profile" /> */}
                    <img src={companybusinessbackimage != companybusinessback || !businesscardback || businesscardback?.filename == undefined ? companybusinessbackimage : `${API_URL}/uploads/business_card/${businesscardback?.filename }`} alt="Profile" />
                    <div className='image edit1' style={{ width: '19%' }} onClick={() => document.getElementById('uploadInput2').click()}>
                      <i className='fa fa-edit' > Select File</i>
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
                  {/* Information about file restrictions */}
                  <div className='disclaimer-note'>
                    <strong>Note : </strong> File formats allowed: .jpg, .jpeg, .png.<br />
                    Maximum dimensions: 300x300 pixels.<br />
                    Maximum file size: 500KB.
                  </div>
                </Col>
              </Row>
              <Col lg={4} className='mb-2'>
                <label>Company Name <span className='labelerrorssss'>*</span></label>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Control type="text" placeholder="Enter Your Company name" defaultValue={company_name} onChange={(e) => SetCompany_Name(e.target.value)} ref={companyNameRef} />
                </Form.Group>
              </Col>
              {/* <Col lg={4} className='mb-2'>
                                <label>Company Description <span className='labelerrorssss'>*</span></label>
                                <Form.Group className="mb-3" controlId="formBasicEmail" >
                                    <Form.Control as="textarea"
                                        rows={3}
                                        placeholder="Enter Company Description"
                                        value={company_desc}
                                        onChange={(e) => setCompany_Desc(e.target.value)}
                                    />

                                </Form.Group>
                            </Col> */}

              <Col lg={4} className='mb-2'>
                <label>Industry Experience (In Years) <span className='labelerrorssss'>*</span></label>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Control type="text" placeholder="Enter Industry Experience (In Years)" defaultValue={company_industry_exp} onInput={allowOnlyNumbers} maxLength={3} onChange={(e) => setCompany_industry_exp(e.target.value)} ref={companyIndustryExpRef} />
                </Form.Group>
              </Col>
              <Col lg={4} className='mb-2'>
                <label>Company Type <span className='labelerrorssss'>*</span></label>
                <Form.Select className='mb-3' onChange={(e) => SetCompany_Type(e.target.value)} ref={companyTypeRef}>
                  <option hidden>Select Company Type</option>
                  {companytype?.map((val, index) => (
                    <option key={index} selected={company_type == val._id} value={val._id}>{val.company_type}</option>
                  ))}
                </Form.Select>
              </Col>
              <Col lg={4} className='mb-2'>
                <label>Company Bio <span className='labelerrorssss'>*</span></label>
                <Form.Group className="mb-3" controlId="companyBio">
                  <Form.Control
                    as="textarea"
                    rows={12}
                    placeholder="Enter Your Company Bio"
                    value={company_bio}
                    onChange={handleBioChange}
                    ref={companyBioRef}
                    style={{ height: '180px' }}
                  />
                  <small className="text-muted">
                    {company_bio?.length}/{maxCharacters} characters
                  </small>
                </Form.Group>
              </Col>
            </Row>
          </div>
        </div>

        <div className='profilegallery mb-5'>
          <h3 className='text-center'>Buisness Information</h3>
          <div className='descr-content'>
            <Row>
              <Col lg={4} className='mb-2'>
                <label>Business Category (Industry) <span className='labelerrorssss'>*</span></label>
                {/* <Form.Select className='mb-3' onChange={handleCategorychange}>
                  <option hidden>Select Buisness Category</option>
                  {categorylist?.map((val, index) => (
                    <option key={index} value={val._id}>{val.business_category}</option>
                  ))}
                </Form.Select> */}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Control type="text" placeholder="Enter Buisness Category (Industry)" defaultValue={businesscategory} onChange={(e) => SetBusinessCategory(e.target.value)} ref={businessCategoryRef} />
                </Form.Group>
              </Col>
              <Col lg={4} className='mb-2'>
                <label>Business Sub-Category <span className='labelerrorssss'>*</span></label>
                {/* <Form.Select className='mb-3' onChange={handleSubCategorychange}>
                  <option hidden>Select Sub-Category</option>
                  {subcategorylist?.map((val, index) => (
                    <option key={index} value={val._id}>{val.business_subcategory}</option>
                  ))}
                </Form.Select> */}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Control type="text" placeholder="Enter Buisness Category (Industry)" defaultValue={businesssubcategory} onChange={(e) => SetBusinessSubCategory(e.target.value)} ref={businessSubCategoryRef} />
                </Form.Group>
              </Col>
              <Col lg={4} className='mb-2'>
                <label>Business Type <span className='labelerrorssss'>*</span></label>
                <Form.Select className='mb-3' onChange={(e) => SetBusinessType(e.target.value)} ref={businessTypeRef}>
                  <option hidden>Select Buisness Type</option>
                  {businesstypelist?.map((val, index) => (
                    <option key={index} selected={businesstype == val._id} value={val._id}>{val.business_type}</option>
                  ))}
                </Form.Select>
              </Col>
              <Col lg={4} className='mb-2'>
                <label>Business Description <span className='labelerrorssss'>*</span></label>
                <Form.Control as="textarea"
                  rows={3}
                  placeholder="Enter Buisness Description"
                  defaultValue={businessdescription}
                  onChange={(e) => SetBusinessDescription(e.target.value)}
                  ref={businessDescriptionRef}
                  style={{ height: '180px' }}

                />
              </Col>
            </Row>
          </div>
        </div>

        <div className='profilegallery mb-5'>
          <h3 className='text-center'>Company Location</h3>
          <div className='descr-content'>
            <Row>
              <Col lg={4} className='mb-2'>
                <label>Country <span className='labelerrorssss'>*</span></label>
                <Form.Select className='mb-3' onChange={handleCountrychange} ref={countryRef}>
                  <option hidden>Select Country </option>
                  {countryList?.map((country, index) => (
                    <option key={index} selected={country_id == country._id} value={country._id}>{country.country_name}</option>
                  ))}
                </Form.Select>
              </Col>
              <Col lg={4} className='mb-2'>
                <label>State <span className='labelerrorssss'>*</span></label>
                <Form.Select className='mb-3' onChange={handleStatechange} ref={stateRef}>
                  <option hidden>Select State</option>
                  {stateList?.map((state, index) => (
                    <option key={index} selected={state_id == state._id} value={state._id}>{state.state_name}</option>
                  ))}
                </Form.Select>
              </Col>
              <Col lg={4} className='mb-2'>
                <label>City <span className='labelerrorssss'>*</span></label>
                <Form.Select className='mb-3' onChange={handleCitychange} ref={cityRef}>
                  <option hidden>Select City</option>
                  {cityList?.map((city, index) => (
                    <option key={index} selected={city_id == city._id} value={city._id}>{city.city_name}</option>
                  ))}
                </Form.Select>
              </Col>
              <Col lg={4} className='mb-2'>
                <label>Company Full Address <span className='labelerrorssss'>*</span></label>
                <Form.Group className="mb-3" controlId="formBasicEmail" >
                  <Form.Control as="textarea"
                    rows={3}
                    placeholder="Enter Company Full Address"
                    value={company_address}
                    onChange={(e) => setCompanyAddress(e.target.value)}
                    ref={companyAddressRef}
                    style={{ height: '180px' }}
                  />
                </Form.Group>
              </Col>
              <Col lg={4} className='mb-2'>
                <label>Branch 1 (if any)</label>
                <Form.Group className="mb-3" controlId="formBasicEmail" >
                  <Form.Control as="textarea"
                    rows={3}
                    placeholder="Enter Company Branch"
                    value={branch1}
                    onChange={(e) => setBranch1(e.target.value)}
                    style={{ height: '180px' }}
                  />
                </Form.Group>
              </Col>
              <Col lg={4} className='mb-2'>
                <label>Branch 2 (if any)</label>
                <Form.Group className="mb-3" controlId="formBasicEmail" >
                  <Form.Control as="textarea"
                    rows={3}
                    placeholder="Enter Company Branch"
                    value={branch2}
                    onChange={(e) => setBranch2(e.target.value)}
                    style={{ height: '180px' }}
                  />
                </Form.Group>
              </Col>
            </Row>
          </div>
        </div>

        <div className='profilegallery mb-5'>
          <h3 className='text-center'>Company Contact Details</h3>
          <div className='descr-content'>
            <Row>
              <Col lg={4} className='mb-2'>
                <label>Phone <span className='labelerrorssss'>*</span></label>
                <PhoneInput
                  className={`form-control ${!isPhoneValid ? 'is-invalid' : ''}`}
                  defaultCountry="IN"
                  international
                  countryCallingCodeEditable={false}
                  localization={en}
                  placeholder="Phone Number"
                  value={company_phone}
                  onChange={handlePhoneChange}
                  ref={companyPhoneRef}
                />
              </Col>
              <Col lg={4} className='mb-2'>
                <label>Alternate Phone <span className='labelerrorssss'>*</span></label>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <PhoneInput
                    className={`form-control ${!isAlternatePhoneValid ? 'is-invalid' : ''}`}
                    defaultCountry="IN"
                    international
                    countryCallingCodeEditable={false}
                    localization={en}
                    placeholder="Phone Number"
                    value={company_alternate_phone}
                    onChange={handleAlternatePhoneChange}
                    ref={companyAlternatePhoneRef}
                  />
                </Form.Group>
              </Col>
              <Col lg={4} className='mb-2'>
                <label>Whatsapp Number <span className='labelerrorssss'>*</span></label>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <PhoneInput
                    className={`form-control ${!isWhatsappPhoneValid ? 'is-invalid' : ''}`}
                    defaultCountry="IN"
                    international
                    countryCallingCodeEditable={false}
                    localization={en}
                    placeholder="Phone Number"
                    value={company_whatsapp}
                    onChange={handleWhatsappPhoneChange}
                    ref={companyWhatsappRef}
                  />
                </Form.Group>
              </Col>
              <Col lg={4} className='mb-2'>
                <label>Email <span className='labelerrorssss'>*</span></label>
                <Form.Control type="email" placeholder="Enter Company Email Id" defaultValue={company_email} onChange={(e) => setCompany_Email(e.target.value)} ref={companyEmailRef} />
              </Col>
              <Col lg={4} className='mb-2'>
                <label>Website <span className='labelerrorssss'>*</span></label>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Control type="text" placeholder="Enter Company Website Link" defaultValue={company_website} onChange={(e) => setCompany_Website(e.target.value)} ref={companyWebsiteRef} />
                </Form.Group>
              </Col>
            </Row>
          </div>
        </div>

        <div className='profilegallery mb-5'>
          <h3 className='text-center'>Company Social Profiles</h3>
          <div className='descr-content'>
            <Row>
              <Col lg={6} className='mb-2'>
                <label>LinkedIn Link</label>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Control type="text" placeholder="Enter Company LinkedIn Link" defaultValue={linkedin_link} onChange={(e) => setLinkedin_link(e.target.value)} />
                </Form.Group>
              </Col>
              <Col lg={6} className='mb-2'>
                <label>Twitter Link</label>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Control type="text" placeholder="Enter Company Twitter Link" defaultValue={twitter_link} onChange={(e) => setTwitter_link(e.target.value)} />
                </Form.Group>
              </Col>
              <Col lg={6} className='mb-2'>
                <label>Instagram Link</label>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Control type="text" placeholder="Enter Company Instagram Link" defaultValue={instagram_link} onChange={(e) => setInstagram_link(e.target.value)} />
                </Form.Group>
              </Col>
              <Col lg={6} className='mb-2'>
                <label>Facebook Link</label>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Control type="text" placeholder="Enter Company Facebook Link" defaultValue={facebook_link} onChange={(e) => setFacebook_link(e.target.value)} />
                </Form.Group>
              </Col>
              <Col lg={6} className='mb-2'>
                <label>Youtube Channel Link</label>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Control type="text" placeholder="Enter Company Youtube Channel Link" defaultValue={youtube_link} onChange={(e) => setYoutube_link(e.target.value)} />
                </Form.Group>
              </Col>
              <Col lg={6} className='mb-2'>
                <label>Podcast Channel Link</label>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Control type="text" placeholder="Enter Company Podcast Channel Link" defaultValue={podcast_link} onChange={(e) => setPodcast_link(e.target.value)} />
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

export default Businesseditform;