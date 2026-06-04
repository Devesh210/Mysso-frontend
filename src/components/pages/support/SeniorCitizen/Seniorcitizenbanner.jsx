import React, { useState, useEffect } from 'react'
import { Col, Container, Form, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { useNgofilterContext } from '../../../../services/NgofilterContext';

import Slider from "react-slick";
import borderimg from '../../../../assets/border.svg';
import ash1 from "../../../../assets/medicalrtype.png"
import Select from 'react-select';
import API_URL from '../../../../../config';
import Nodatafound from '../../nodatafound/Nodatafound.jsx';
import { RotatingLines } from 'react-loader-spinner'


const Seniorcitizenbanner = () => {
    var settings1 = {
        nav: false,
        infinite: false,
        slidesToShow: 3,
        dots: false,
        margin: 60,
        slidesToScroll: 3,
        cssEase: "linear",
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: false,
                    dots: false
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };


    const Navigate = useNavigate();

    const { ngofilter, setNgoFilter, ngodata, setNgodata, getNgoData } = useNgofilterContext();


    const [countryList, setCountryList] = useState([]);
    const [stateList, setStateList] = useState([]);
    const [cityList, setCityList] = useState([]);
    const [ngoList, setNGOList] = useState([]);


    const [country, setCountry] = useState([]);
    const [state, setState] = useState([]);
    const [city, setCity] = useState([]);
    const [ngo, setNgo] = useState([]);
    const [category, setCategory] = useState([]);

    const [localFilter, setLocalFilter] = useState(ngofilter);
    const [loading, setLoading] = useState(false);

    



    useEffect(() => {
        if (localStorage.getItem('token')) {
            getCountry();
            // getNGOLists();
        } else {
            Navigate('/login');
        }
    }, [])


    useEffect(() => {
        if (localStorage.getItem('token')) {
            getState();
        }
    }, [country]);

    useEffect(() => {
        if (localStorage.getItem('token')) {
            getCity();
        }
    }, [state]);

    useEffect(() => {
        if (localStorage.getItem('token')) {
            if (city.length > 0) {
                getNGOLists();
            }
        }
    }, [city]);

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
            await fetch(`${API_URL}/api/getstatebymultiplecountry?country_id=${country?.map(val => val.value)}`, requestoptions)
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
            await fetch(`${API_URL}/api/getcitybymultiplestate?state_id=${state?.map(val => val.value)}`, requestoptions)
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



    const getNGOLists = async () => {
        try {
            const requestOptions = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            };

            await fetch(`${API_URL}/api/getListsofNGOsbycity?city=${city?.map(val => val.value)}`, requestOptions)
                .then(response => response.json())
                .then(data => {
                    if (data.status === 200) {
                        console.log(data.data)
                        setNGOList(data.data)
                    } else {
                        swal('Error', data.message, 'error');
                    }
                });
        }
        catch (error) {
            console.log(error)
        }
    }

    console.log("ngoList", ngoList)


    const countryListOptions = countryList?.map((item) => {
        return {
            value: item._id,
            label: item.country_name
        }
    })

    const stateListOptions = stateList?.map((item) => {
        return {
            value: item._id,
            label: item.state_name
        }
    })

    const cityListOptions = cityList?.map((item) => {
        return {
            value: item._id,
            label: item.city_name
        }
    })


    const ngoListOptions = ngoList?.map((item) => {
        return {
            value: item._id,
            label: item.ngoName
        }
    })

    const categoryListOptions = [
        { value: 'Food Service', label: 'Food Service' },
        { value: 'Health', label: 'Health' },
        { value: 'Elder Care', label: 'Elder Care' },
        { value: 'General', label: 'General' },
    ]


    const handleCountrychange = (selectedOption) => {
        console.log("eeeeeeeeeeeeeeeee", selectedOption)
        setCountry(selectedOption)
        setLocalFilter({ ...localFilter, country: selectedOption })
        setStateList([])
        setState('')
        setCityList([])
        setCity('')
        setNGOList([])
    }

    const handleStatechange = (selectedOption) => {
        setState(selectedOption)
        setLocalFilter({ ...localFilter, state: selectedOption })
        setCityList([])
        setCity('')
        setNGOList([])
    }

    const handleCitychange = (selectedOption) => {
        setCity(selectedOption)
        setLocalFilter({ ...localFilter, city: selectedOption })
        setNGOList([])
    }

    const handleNgochange = (selectedOption) => {
        setNgo(selectedOption)
        setLocalFilter({ ...localFilter, ngo_name: selectedOption })
    }

    const handleCategorychange = (selectedOption) => {
        setCategory(selectedOption)
        setLocalFilter({ ...localFilter, ngo_services: selectedOption })
    }


    console.log("country", country)
    console.log("state", state)
    console.log("city", city)
    console.log("ngo", ngo)
    console.log("category", category)


    const submitFilter = () => {

        if(country.length === 0 ){
            swal({
                text: "Please Select Country",
                icon: "warning",
            });
            return false;
        }
        else if (state.length === 0) {
            swal({
                text: "Please Select State",
                icon: "warning",
            });
            return false;
        }
        else if (city.length === 0) {
            swal({
                text: "Please Select City",
                icon: "warning",
            });
            return false;
        }
        setLoading(true);
        setNgoFilter(localFilter);
        getNgoData(localFilter).finally(() => setLoading(false));

    }

    const resetFilter = () => {
        setLoading(true);
        setCountry([])
        setState([])
        setCity([])
        setNgo([])
        setCategory([])
        setLocalFilter({
            country: [],
            state: [],
            city: [],
            ngo_name: [],
            ngo_services: []
        })
        setNgoFilter({
            country: [],
            state: [],
            city: [],
            ngo_name: [],
            ngo_services: []
        })
        getNgoData({
            country: [],
            state: [],
            city: [],
            ngo_name: [],
            ngo_services: []
        }).finally(() => setLoading(false));
    }

    console.log("localFilter", localFilter)
    

console.log("ngodata", ngodata)


    return (
        <>
            <div className='edutionalbanner mb-5'>
                <h3 className='startuabout'>Our Senior Citizen   <span>Supporter</span> <img className='imgsabouts' src={borderimg} alt="border" /></h3>
                <div className="educational-banner">
                    <Container fluid >
                        <div className="selectbutt">
                            <Row className="justify-content-center">
                                <Col lg={2}>
                                    <Form.Group>
                                        <Select
                                            closeMenuOnSelect={false}
                                            isMulti
                                            options={countryListOptions}
                                            value={localFilter.country}
                                            className="custom-select"
                                            placeholder="Select Country"
                                            onChange={handleCountrychange}

                                        />
                                    </Form.Group>
                                </Col>

                                <Col lg={2}>
                                    <Form.Group>
                                        <Select
                                            closeMenuOnSelect={false}
                                            isMulti
                                            options={stateListOptions}
                                            value={localFilter.state}
                                            className="custom-select"
                                            placeholder="Select State"
                                            onChange={handleStatechange}

                                        />
                                    </Form.Group>
                                </Col>

                                <Col lg={2}>
                                    <Form.Group>
                                        <Select
                                            closeMenuOnSelect={false}
                                            isMulti
                                            options={cityListOptions}
                                            value={localFilter.city}
                                            className="custom-select"
                                            placeholder="Select City"
                                            onChange={handleCitychange}

                                        />
                                    </Form.Group>
                                </Col>

                                <Col lg={2}>
                                    <Form.Group>
                                        <Select
                                            closeMenuOnSelect={false}
                                            isMulti
                                            options={ngoListOptions}
                                            value={localFilter.ngo_name}
                                            className="custom-select"
                                            placeholder="Select NGO"
                                            onChange={handleNgochange}
                                        />
                                    </Form.Group>
                                </Col>

                                <Col lg={2}>
                                    <Form.Group>
                                        <Select
                                            closeMenuOnSelect={false}
                                            isMulti
                                            options={categoryListOptions}
                                            value={localFilter.ngo_services}
                                            className="custom-select"
                                            placeholder="Select Category"
                                            onChange={handleCategorychange}
                                        />
                                    </Form.Group>
                                </Col>

                                <Col lg={2} className="d-flex justify-content-center">
                                    <button className="search-partners" onClick={submitFilter}>Search</button>
                                    <button className="search-partners" onClick={resetFilter}>Reset</button>

                                </Col>
                            </Row>
                        </div>

                        {loading ? (
                            <div className='loader my-5'>
                                <RotatingLines
                                    visible={true}
                                    height="96"
                                    width="96"
                                    color="grey"
                                    strokeWidth="5"
                                    animationDuration="0.75"
                                    ariaLabel="rotating-lines-loading"
                                    wrapperStyle={{}}
                                    wrapperClass=""
                                    className="loader-spinner"
                                    strokeColor='#E36414'

                                />
                            </div>
                        ) : (
                            <>
                        <Row className="supporters-section mt-5 mb-5">
                            {ngodata?.length > 0 ? (
                                ngodata?.map((data, index) => (
                                    <Col lg={3} className="mb-5" key={index}>
                                        <div className="supporter-card">
                                            {/* <img className="supporter-image" src={ash1} alt="" /> */}
                                            <img className="supporter-image fixed-size" src={`${API_URL}/uploads/company_logo/${data?.ngodetails?.map(val => val.logo.map(file => file.filename))}`} alt="" />

                                            <h3>{data.ngodetails?.map(val => val?.ngoName)}</h3>
                                            <p>Main Branch Address: <span>{data.ngodetails?.map(val => val?.officeAddress)}</span></p>
                                            <p className='text-break'>About Hospital: <span>{data.ngodetails?.map(val => val?.aboutNgo)}</span></p>
                                            <p>Contact No: <span>{data.ngodetails?.map(val => val?.primaryContactNumber)}</span></p>
                                            <p>Email address: <span>{data.ngodetails?.map(val => val?.primaryEmail)}</span></p>
                                            <p>Service available <span>{data.ngodetails?.map(val => val?.availability)}</span></p>
                                            <p>Website URL <span>{data.ngodetails?.map(val => val?.website)}</span></p>
                                            {/* <p className='expertbio'>{data?.bio}</p> */}
                                            <button
                                                className="connnnnnnect"
                                                onClick={() => Navigate(`/SeniorcitizenNGOView?id=${data.ngo_id}`)}
                                            >
                                                More details
                                            </button>
                                            <button
                                                className="connnnnnnect"
                                                onClick={() => Navigate(`/SeniorcitizenNGOServices?id=${data.ngo_id}`)}
                                            >
                                                Services Available
                                            </button>
                                        </div>
                                    </Col>
                                ))
                            ) : (
                                <Nodatafound />
                            )}
                        </Row>
                        </>
                        )}

                    </Container>
                </div>







            </div>
        </>
    )
}

export default Seniorcitizenbanner