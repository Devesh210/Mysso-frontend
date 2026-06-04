import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import wipro from "../../../assets/business/clogo.svg"
import { Col, Container, Row } from 'react-bootstrap'
import banner from '../../../assets/startup/investorbanner.jpeg'
// import banner from '../../../assets/startup/banner.png'

import dummyLogo from "../../../assets/dummyLogo.png"
import profileimg from "../../../assets/profile.png"
import API_URL from '../../../../config'
import { useInvestorFilterContext } from '../../../services/InvestorFilterContext'
import Nodatafound from '../nodatafound/Nodatafound'
import { RotatingLines } from 'react-loader-spinner'


const InvestorList = () => {
    const Navigate = useNavigate();

    const { investorfilter, setInvestorFilter, getInvestorData, investordata, totalcount } = useInvestorFilterContext();
    const [countrylist, setCountrylist] = useState([]);
    const [statelist, setStateList] = useState([]);
    const [citylist, setCityList] = useState([]);
    const [localFilter, setLocalFilter] = useState('');

    const [loading, setLoading] = useState(false);


    useEffect(() => {
        if (localStorage.getItem('token')) {
            getCountry();
        } else {
            Navigate('/login');
        }
    }, [])

    useEffect(() => {
        if (localFilter.country) {
            getState();
        }
    }, [localFilter.country]);

    useEffect(() => {
        if (localFilter.state) {
            getCity();
        }
    }, [localFilter.state]);

    const getCountry = async () => {
        try {
            const requestOption = {
                method: 'GET'
            }
            const response = await fetch(`${API_URL}/api/countryList`, requestOption)
                .then(res => res.json())
                .then(data => {
                    setCountrylist(data.data)
                })
        } catch (error) {
            console.log(error)
        }
    }

    const getState = async () => {
        try {
            const requestoptions = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            };
            await fetch(`${API_URL}/api/getstatebycountry?country_id=${localFilter.country}`, requestoptions)
                .then(response => response.json())
                .then(data => {
                    console.log(data.data);
                    const statedata = data.data.map((item) => {
                        return { value: item._id, label: item.state_name }
                    }
                    )
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
            await fetch(`${API_URL}/api/getcitybystate?state_id=${localFilter.state}`, requestoptions)
                .then(response => response.json())
                .then(data => {
                    console.log(data.data);
                    const citydata = data.data.map((item) => {
                        return { value: item._id, label: item.city_name }
                    }
                    )
                    setCityList(data.data);
                })
        }
        catch (err) {
            console.error(err.message);
        }
    }

    console.log("investordata",investordata)


    const handlecountrychange = (e) => {
        setLocalFilter({ ...localFilter, country: e.target.value })
    }

    const handlestatechange = (e) => {
        setLocalFilter({ ...localFilter, state: e.target.value })
    }

    const handlecitychange = (e) => {
        setLocalFilter({ ...localFilter, city: e.target.value })
    }

    const handleexpchange = (e) => {
        setLocalFilter({ ...localFilter, yearofexperience: e.target.value })
    }

    const handleminimuminvestment = (e) => {
        setLocalFilter({ ...localFilter, minimum_investment: e.target.value })
    }

    const handleMaximuminvestment = (e) => {
        setLocalFilter({ ...localFilter, maximum_investment: e.target.value })
    }

    const submitFilter = () => {
        setLoading(true);
        setInvestorFilter(localFilter);
        getInvestorData(localFilter).finally(() => {
            setLoading(false); // Hide loader after data is fetched
        });
    }

    const resetFilter = () => {
        setLoading(true);
        setLocalFilter({
            country: '',
            state: '',
            city: '',
            yearofexperience: '',
            minimum_investment: '',
            maximum_investment: ''
        });
        setInvestorFilter({
            country: '',
            state: '',
            city: '',
            yearofexperience: '',
            minimum_investment: '',
            maximum_investment: ''
        });
        getInvestorData({
            country: '',
            state: '',
            city: '',
            yearofexperience: '',
            minimum_investment: '',
            maximum_investment: ''
        }).finally(() => {
            setLoading(false); // Hide loader after data is fetched
        });

    }

    const allowOnlyNumbers = (e) => {
        e.preventDefault();
        const input = e.target;
        const value = input.value.replace(/[^\d]/g, ''); // Replace any non-numeric characters with an empty string
        input.value = value; // Set the input value to the filtered value
    }


    return (
        <div>
            <img src={banner} className="w-100" alt="" />
            <Container>
                <div className='selectbutt'>
                    <Row style={{ justifyContent: 'center' }}>
                        <Col lg={2}>
                            <select name="" id="" onChange={handlecountrychange}>
                                <option value="" hidden>Country</option>
                                {countrylist?.map((item, index) => {
                                    return (
                                        <option key={index} selected={localFilter?.country == item._id} value={item._id}>{item.country_name}</option>
                                    )
                                }
                                )}
                            </select>
                        </Col>
                        <Col lg={2}>
                            <select name="" id="" onChange={handlestatechange}>
                                <option value="" hidden>State</option>
                                <option disabled>Select State First</option>
                                {
                                    statelist.map((item, index) => {
                                        return (
                                            <option key={index} selected={localFilter?.state == item._id } value={item._id}>{item.state_name}</option>
                                        )
                                    })
                                }
                            </select>
                        </Col>
                        <Col lg={2}>
                            <select name="" id="" onChange={handlecitychange}>
                                <option value="" hidden>City</option>
                                <option disabled>Select State First</option>
                                {
                                    citylist.map((item, index) => {
                                        return (
                                            <option key={index} selected={localFilter?.city == item._id} value={item._id}>{item.city_name}</option>
                                        )
                                    }
                                    )}
                            </select>
                        </Col>
                        <Col lg={2}>
                            <select name="" id="" onChange={handleexpchange} value={localFilter?.yearofexperience}>
                                <option value="" hidden >Years Of Experience</option>
                                <option value="1 - 3 years">1 - 3 years</option>
                                <option value="3 - 5 Years">3 - 5 Years</option>
                                <option value="5 - 10 Years">5 - 10 Years</option>
                                <option value="10+ Years">10+ Years</option>
                            </select>
                        </Col>
                        <Col lg={2}>
                            <input type='text' value={localFilter?.minimum_investment} placeholder='Minimum Investment Amount' onInput={allowOnlyNumbers} onChange={handleminimuminvestment} />
                        </Col>
                        <Col lg={2}>
                            <input type='text' value={localFilter?.maximum_investment} placeholder='Maximum Investment Amount' onInput={allowOnlyNumbers} onChange={handleMaximuminvestment} />
                        </Col>
                        <Col lg={2}>
                            <button className='search-partners' onClick={submitFilter}>Search</button>
                        </Col>
                        <Col lg={2}>
                            <button className='search-partners' onClick={resetFilter}>Reset</button>
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
                <h3 className='similar-commm'>{totalcount} Investor</h3>
                <Row className='mt-5 mb-5'>
                    {investordata?.length > 0 ? (
                        investordata?.map((data, index) => (
                            <React.Fragment key={index}>
                                <Col lg={3} className="mb-5">
                                    <div className="company-info">
                                        <img
                                            src={profileimg}
                                            alt="Company Logo"
                                            height={150}
                                            width={200}
                                            style={{ objectFit: 'contain' }}
                                        />
                                        <h3>{data.fullName}</h3>
                                        <h6 style={{ textAlign: 'start', paddingLeft: '5px' }}>
                                            <span style={{ color: "gray" }}> Company Name: </span>
                                            <span style={{ color: "#9A031E" }}>{data?.companyName}</span>
                                        </h6>
                                        <h6 style={{ textAlign: 'start', paddingLeft: '5px' }}>
                                            <span style={{ color: "gray" }}> Current Role/Title: </span>
                                            <span className='text-break' style={{ color: "#9A031E" }}>{data?.currentRole}</span>
                                        </h6>
                                        <h6 style={{ textAlign: 'start', paddingLeft: '5px' }}>
                                            <span style={{ color: "gray" }}> Years of Experience: </span>
                                            <span className='text-break' style={{ color: "#9A031E" }}>{data?.yearofexperience}</span>
                                        </h6>
                                        <button
                                            className="connnnnnnect"
                                            onClick={() => Navigate(`/Investordetails?id=${data._id}`)}
                                        >
                                            Connect now
                                        </button>
                                    </div>
                                </Col>
                            </React.Fragment>
                        ))
                    ) : (
                        <div>
                            <Nodatafound />
                        </div>
                    )}
                </Row>
                    </>
                )}
            </Container>
        </div>
    )
}

export default InvestorList