import React, { useState, useEffect } from 'react'

import banner from "../../../assets/matrimonial/banner.png"
import { Col, Container, Row } from 'react-bootstrap'
import API_URL from '../../../../config'
import { useNavigate } from 'react-router-dom'
import { useFilterContext } from '../../../services/FilterContext'

const Banner = () => {

    const Navigate = useNavigate()

    const { matrimonyfilter, setMatrimonyFilter, getMatrimonyData } = useFilterContext();


    const [userdata, setUserdata] = useState([]);


    const [lookingforlist, setLookingforlist] = useState([]);
    const [agelist, setAgelist] = useState([]);
    const [religionlist, setReligionlist] = useState([]);
    const [maritalstatuslist, setMaritalstatuslist] = useState([]);
    const [countrylist, setCountrylist] = useState([]);
    const [statelist, setStateList] = useState([]);
    const [citylist, setCityList] = useState([]);
    const [nationalitylist, setNationalitylist] = useState([]);
    const [castelist, setCastelist] = useState([]);
    const [mothertonguelist, setMothertonguelist] = useState([]);
    const [occupationlist, setOccupationlist] = useState([]);
    const [ismatrimonyuser, setIsMatrimonyUser] = useState('');



    // const [lookingfor, setLookingfor] = useState('');
    // const [agefrom, setAgeFrom] = useState('');
    // const [ageto, setAgeTo] = useState('');
    // const [maritalstatus, setMaritalstatus] = useState('');
    // const [country, setCountry] = useState('');
    // const [nationality, setNationality] = useState('');
    // const [caste, setCaste] = useState('');
    // const [mothertongue, setMothertongue] = useState('');



    useEffect(() => {
        if (localStorage.getItem('token')) {
            getUserData();
            checkuser();
        }
        getLookingfor()
        getAge()
        getReligion()
        getMaritalstatus()
        getCountry()
        // getNationality()
        getCaste()
        getMothertongue()
        getOccupation()
        localStorage.removeItem('matrimonyfilter')
        localStorage.removeItem('matrimonydata')
        setMatrimonyFilter({
            lookingfor: '',
            agefrom: '',
            ageto: '',
            maritalstatus: '',
            nationality: '',
            country: '',
            state: '',
            city: '',
            mothertongue: '',
            caste: '',
            subcaste: '',
            education: '',
            occupation: '',
            income: '',
            hobbies: '',
            gotra: '',
            height: '',
            weight: '',
            handicap: '',
            memberid: ''
        })
     
    }, [])

    console.log(matrimonyfilter)
    useEffect(() => {
        if (matrimonyfilter.country) {
            getState();
        }
    }, [matrimonyfilter.country])

    useEffect(() => {
        if (matrimonyfilter.state) {
            getCity();
        }
    }, [matrimonyfilter.state])

    const getLookingfor = async () => {
        try {
            const requestOption = {
                method: 'GET'
            }
            const response = await fetch(`${API_URL}/api/usergendertypeList`, requestOption)
                .then(res => res.json())
                .then(data => {
                    setLookingforlist(data.data)
                })
        } catch (error) {
            console.log(error)
        }
    }

    const getAge = async () => {
        try {
            const requestOption = {
                method: 'GET'
            }
            const response = await fetch(`${API_URL}/api/ageList`, requestOption)
                .then(res => res.json())
                .then(data => {
                    setAgelist(data.data)
                })
        } catch (error) {
            console.log(error)
        }
    }

    const getReligion = async () => {
        try {
            const requestOption = {
                method: 'GET'
            }
            const response = await fetch(`${API_URL}/api/religionList`, requestOption)
                .then(res => res.json())
                .then(data => {
                    setReligionlist(data.data)
                })
        } catch (error) {
            console.log(error)
        }
    }

    const getMaritalstatus = async () => {
        try {
            const requestOption = {
                method: 'GET'
            }
            const response = await fetch(`${API_URL}/api/maritalStatusList`, requestOption)
                .then(res => res.json())
                .then(data => {
                    setMaritalstatuslist(data.data)
                })
        } catch (error) {
            console.log(error)
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
            await fetch(`${API_URL}/api/getstatebycountry?country_id=${matrimonyfilter.country}`, requestoptions)
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
            await fetch(`${API_URL}/api/getcitybystate?state_id=${matrimonyfilter.state}`, requestoptions)
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

    const getCaste = async () => {
        try {
            const requestOption = {
                method: 'GET'
            }
            const response = await fetch(`${API_URL}/api/castList`, requestOption)
                .then(res => res.json())
                .then(data => {
                    setCastelist(data.data)
                })
        } catch (error) {
            console.log(error)
        }
    }

    const getMothertongue = async () => {
        try {
            const requestOption = {
                method: 'GET'
            }
            const response = await fetch(`${API_URL}/api/motherTongueList`, requestOption)
                .then(res => res.json())
                .then(data => {
                    setMothertonguelist(data.data)
                })
        } catch (error) {
            console.log(error)
        }
    }

    const getOccupation = async () => {
        try {
            const requestOption = {
                method: 'GET'
            }
            const response = await fetch(`${API_URL}/api/proffessionList`, requestOption)
                .then(res => res.json())
                .then(data => {
                    setOccupationlist(data.data)
                })
        } catch (error) {
            console.log(error)
        }
    }


    // const submitFilter = (e) => {
    //     e.preventDefault()
    //     console.log("lookingfor", lookingfor)
    //     console.log("agefrom", agefrom)
    //     console.log("ageto", ageto)
    //     console.log("country", JSON.parse(country))
    //     console.log("caste", caste)

    //     const country1 = JSON.parse(country)
    //     const countrydata = {
    //         value: country1._id,
    //         label: country1.country_name
    //     }



    //     const filterData = {
    //         lookingfor,
    //         agefrom,
    //         ageto,
    //         maritalstatus,
    //         countrydata,
    //         nationality,
    //         caste,
    //         mothertongue
    //     };

    //     console.log("filterData", filterData)
    //     localStorage.setItem('filterData', JSON.stringify(filterData))

    //     Navigate('/matrimonialsearch')
    // }

    console.log('matrimonyfilter', userdata?.isMatrimonyVerified);

    const submitFilter = (e) => {
        e.preventDefault();
       
        console.log('matrimonyfilter', matrimonyfilter);
        setMatrimonyFilter(
            {
                ...matrimonyfilter,
                memberid: ''
            }
        );
        getMatrimonyData(matrimonyfilter);
        if (userdata?.isMatrimonyVerified == false) {
            swal({
                text: "Your profile is Under Verification, we will let you know once it is verified to your Email.",
                icon: "warning",
            }).then(() => {
                Navigate('/Profile');
            });
        } else {
        Navigate('/matrimonialsearch');
        }
    };

    const checkuser = () => {
        try {

            const requestOptions = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token') }`
                },
            };
            fetch(`${API_URL}/api/checkMatrimonyUser`, requestOptions)
                .then(response => response.json())
                .then(data => {
                    console.log("data>?>>>>??????>>>>????", data);
                    setIsMatrimonyUser(data.data);
                });

        } catch (error) {
            console.log(error);
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
                            <h3>Get Your Right Match Here ...</h3>
                            <div className='selectbutt'>
                                <Row style={{justifyContent:'center'}}>
                                    <Col lg={2}>
                                        <select name="" id="" onChange={(e) => setMatrimonyFilter({ ...matrimonyfilter, lookingfor: e.target.value })}>
                                            <option value="" hidden>Looking For</option>
                                            {lookingforlist?.map((item, index) => {
                                                return (
                                                    <option key={index} value={item._id}>{item.type}</option>
                                                )
                                            }
                                            )}
                                        </select>
                                    </Col>
                                    <Col lg={2}>
                                        <select name="" id="" onChange={(e) => setMatrimonyFilter({ ...matrimonyfilter, agefrom: e.target.value })}>
                                            <option value="" hidden>Age From</option>
                                            {agelist?.map((item, index) => {
                                                return (
                                                    <option key={index} value={item.age}>{item.age}</option>
                                                )
                                            }
                                            )}
                                        </select>
                                    </Col>
                                    <Col lg={2}>
                                        <select name="" id="" onChange={(e) => setMatrimonyFilter({ ...matrimonyfilter, ageto: e.target.value })}>
                                            <option value="" hidden>Age To</option>
                                            {agelist?.map((item, index) => {
                                                return (
                                                    <option key={index} value={item.age}>{item.age}</option>
                                                )
                                            }
                                            )}
                                        </select>
                                    </Col>
                                    <Col lg={2}>
                                        <select name="" id="" onChange={(e) => setMatrimonyFilter({ ...matrimonyfilter, maritalstatus: e.target.value })}>
                                            <option value="" hidden>Marital Status</option>
                                            {maritalstatuslist?.map((item, index) => {
                                                return (
                                                    <option key={index} value={item._id}>{item.type}</option>
                                                )
                                            }
                                            )}
                                        </select>
                                    </Col>
                                    <Col lg={2}>
                                        <select name="" id="" onChange={(e) => setMatrimonyFilter({ ...matrimonyfilter, mothertongue: e.target.value })}>
                                            <option value="" hidden>Mother Tongue</option>
                                            {mothertonguelist?.map((item, index) => {
                                                return (
                                                    <option key={index} value={item._id}>{item.type}</option>
                                                )
                                            }
                                            )}
                                        </select>
                                    </Col>
                                    {/* <Col lg={2}>
                                        <select name="" id="" onChange={(e) => setMatrimonyFilter({ ...matrimonyfilter, caste: e.target.value })}>
                                            <option value="" hidden>Caste</option>
                                            {castelist.map((item, index) => {
                                                return (
                                                    <option key={index} value={item._id}>{item.type}</option>
                                                )
                                            }
                                            )}
                                        </select>
                                    </Col> */}
                                    <Col lg={2}>
                                        <select name="" id="" onChange={(e) => setMatrimonyFilter({ ...matrimonyfilter, country: e.target.value })}>
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
                                        <select name="" id="" onChange={(e) => setMatrimonyFilter({ ...matrimonyfilter, state: e.target.value })}>
                                            <option value="" hidden>State</option>

                                        {!matrimonyfilter.country ? <option disabled>Select Country First</option> :
                                            statelist.map((item, index) => {
                                                return (
                                                    <option key={index} value={item._id}>{item.state_name}</option>
                                                )
                                            })
                                            }
                                        </select>
                                    </Col>
                                    <Col lg={2}>
                                        <select name="" id="" onChange={(e) => setMatrimonyFilter({ ...matrimonyfilter, city: e.target.value })}>
                                            <option value="" hidden>City</option>
                                        {!matrimonyfilter.state ? <option disabled>Select State First</option> :
                                            citylist.map((item, index) => {
                                                return (
                                                    <option key={index} value={item._id}>{item.city_name}</option>
                                                )
                                            }
                                            )}
                                        </select>
                                    </Col>
                                </Row>
                            </div>
                            <button className='search-partner' onClick={submitFilter}>Search Partner</button>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default Banner