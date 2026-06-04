import React, { useState, useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import banner from "../../../assets/business/networkingbanner.jpg"
import API_URL from '../../../../config';
import { useNavigate } from 'react-router-dom';
import { useNetworkFilterContext } from '../../../services/NetworkFilterContext';
const Businessbanner = () => {

    const Navigate = useNavigate();

    const { networkfilter, setNetworkFilter, getNetworkData } = useNetworkFilterContext();

    const [networktypelist, setNetworktypelist] = useState([]);
    const [categorylist, setCategorylist] = useState([]);
    const [countrylist, setCountrylist] = useState([]);
    const [statelist, setStateList] = useState([]);
    const [citylist, setCityList] = useState([]);
    const [userdata, setUserdata] = useState([]);

    useEffect(() => {
        // if(localStorage.getItem('token')){
        // }
        getNetworkTypelist();
        getCountry();
        localStorage.removeItem('networkfilter')
        localStorage.removeItem('networkdata')
        setNetworkFilter({
            networking_company_category: '',
            networking_company_subcategory: '',
            country: '',
            state: '',
            city: '',
        })
    }, [])

    console.log(networkfilter)

    useEffect(() => {
        getCategorylist();
    }, [networkfilter.networking_company_category])

    useEffect(() => {
        if (networkfilter.country) {
            getState();
        }
    }, [networkfilter.country])

    useEffect(() => {
        if (networkfilter.state) {
            getCity();
        }
    }, [networkfilter.state])





    const getNetworkTypelist = async () => {
        try {
            const response = await fetch(`${API_URL}/api/getNetworkingCategory`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            setNetworktypelist(data.data);
        } catch (error) {
            console.log(error);
        }
    }

    const getCategorylist = async () => {
        try {
            const response = await fetch(`${API_URL}/api/getNetworkingSubCategoryByCategory?id=${networkfilter.networking_company_category}`, {
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
            await fetch(`${API_URL}/api/getstatebycountry?country_id=${networkfilter.country}`, requestoptions)
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
            await fetch(`${API_URL}/api/getcitybystate?state_id=${networkfilter.state}`, requestoptions)
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

    const handleNetworkType = (e) => {
        setNetworkFilter({ ...networkfilter, networking_company_category: e.target.value })
        setCategorylist([])
    }

    const handleCategory = (e) => {
        setNetworkFilter({ ...networkfilter, networking_company_subcategory: e.target.value })
    }

    const handlecountry = (e) => {
        setNetworkFilter({ ...networkfilter, country: e.target.value })
        setStateList([])
        setCityList([])
    }

    const handlestate = (e) => {
        setNetworkFilter({ ...networkfilter, state: e.target.value })
        setCityList([])
    }

    const handlecity = (e) => {
        setNetworkFilter({ ...networkfilter, city: e.target.value })
    }

    const submitFilter = (e) => {
        if (localStorage.getItem('token')) {

        e.preventDefault();

        console.log('networkfilter', networkfilter);
        setNetworkFilter(
            {
                ...networkfilter
            }
        )
        getNetworkData(networkfilter);
        if (userdata?.isMatrimonyVerified == false) {
            swal({
                text: "Your profile is Under Verification, we will let you know once it is verified to your Email.",
                icon: "warning",
            }).then(() => {
                Navigate('/Profile');
            });
        } else {
            Navigate('/Businesslist');
        }
    } else {
        Navigate('/login');
    }

    }

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



    return (
        <div>
            <Container fluid style={{ padding: '0px' }}>
                <div className="image-container">
                    <img src={banner} className="w-100" alt="" />
                    <div className="overlay12">
                        <div className='overlaycontentnt'>
                            <h3>
                                Unlock your growth opportunities with Satsangi business and professional
                                networking connections.</h3>
                            <div className='selectbutt'>
                                <Row style={{ justifyContent: 'center' }}>
                                    <Col lg={2}>
                                        {/* <select name="" id="" onChange={handleNetworkType}>
                                            <option value="" hidden>Networking Type</option>
                                            {
                                                networktypelist.map((item, index) => {
                                                    return <option key={index} value={item._id}>{item.category}</option>
                                                })
                                            }
                                        </select> */}

                                        <select name="" id="" onChange={handleNetworkType}>
                                            <option value="" hidden>Networking Type</option>
                                            <option value="business">Business</option>
                                            <option value="profession">Professional</option>

                                        </select>
                                    </Col>
                                    {/* <Col lg={2}>
                                        <select name="" id="" onChange={handleCategory}>
                                            <option value="" hidden>Category</option>
                                            {!networkfilter.networking_company_category ? <option disabled>Select Networking Type</option> :
                                                categorylist?.map((item, index) => {
                                                    return <option key={index} value={item._id}>{item.subcategory}</option>
                                                })
                                            }
                                        </select>
                                    </Col> */}
                                    <Col lg={2}>
                                        <select name="" id="" onChange={handlecountry}>
                                            <option value="" hidden>Country</option>
                                            {countrylist?.map((item, index) => {
                                                return (
                                                    <option key={index} value={item._id}>{item.country_name}</option>
                                                )
                                            }
                                            )}
                                        </select>
                                    </Col>
                                    <Col lg={2}>
                                        <select name="" id="" onChange={handlestate}>
                                            <option value="" hidden>State</option>

                                            {!networkfilter.country ? <option disabled>Select Country First</option> :
                                                statelist.map((item, index) => {
                                                    return (
                                                        <option key={index} value={item._id}>{item.state_name}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </Col>
                                    <Col lg={2}>
                                        <select name="" id="" onChange={handlecity}>
                                            <option value="" hidden>City</option>
                                            {!networkfilter.state ? <option disabled>Select State First</option> :
                                                citylist.map((item, index) => {
                                                    return (
                                                        <option key={index} value={item._id}>{item.city_name}</option>
                                                    )
                                                }
                                                )}
                                        </select>
                                    </Col>
                                    <Col lg={2}>
                                        <button className='search-partners' onClick={submitFilter}>Search</button>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default Businessbanner