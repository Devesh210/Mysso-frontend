
import React, { useState, useEffect } from 'react'
import wipro from "../../../assets/business/clogo.svg"
import { Col, Container, Row } from 'react-bootstrap'
import banner from "../../../assets/business/businessbann.png"
import { useNavigate } from 'react-router-dom'
import { useNetworkFilterContext } from '../../../services/NetworkFilterContext'
import API_URL from '../../../../config'
import Nodatafound from '../nodatafound/Nodatafound'
import dummyLogo from "../../../assets/dummyLogo.png"
import { RotatingLines } from 'react-loader-spinner'


const Businesslist = () => {

    const Navigate = useNavigate();
    const token = localStorage.getItem('token');

    const { networkfilter, setNetworkFilter, getNetworkData, networkdata, totalcount } = useNetworkFilterContext();
    const [networktypelist, setNetworktypelist] = useState([]);
    const [categorylist, setCategorylist] = useState([]);
    const [countrylist, setCountrylist] = useState([]);
    const [statelist, setStateList] = useState([]);
    const [citylist, setCityList] = useState([]);
    const [userdata, setUserdata] = useState([]);
    const [localFilter, setLocalFilter] = useState(networkfilter);

    const [loading, setLoading] = useState(false);


    useEffect(() => {
        getNetworkTypelist();
        getCountry();

    }, [])

    console.log(networkfilter)

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
            await fetch(`${API_URL}/api/getstatebycountry?country_id=${localFilter?.country}`, requestoptions)
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
            await fetch(`${API_URL}/api/getcitybystate?state_id=${localFilter?.state}`, requestoptions)
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
        setLocalFilter({ ...localFilter, networking_company_category: e.target.value });
    };

    const handleCategory = (e) => {
        setNetworkFilter({ ...networkfilter, networking_company_subcategory: e.target.value })
    }

    const handleCountry = (e) => {
        setLocalFilter({ ...localFilter, country: e.target.value });
        setStateList([]);
        setCityList([]);
    };

    const handleState = (e) => {
        setLocalFilter({ ...localFilter, state: e.target.value });
        setCityList([]);
    };

    const handleCity = (e) => {
        setLocalFilter({ ...localFilter, city: e.target.value });
    };

    const submitFilter = () => {
        setLoading(true);
        setNetworkFilter(localFilter);
        getNetworkData(localFilter).finally(() => {
                setLoading(false); // Hide loader after data is fetched
            });

        if (token) {
        handlenetworkingportal();
        }

    };

    const resetFilter = () => {
        setLoading(true);
        setLocalFilter({
            networking_company_category: '',
            country: '',
            state: '',
            city: ''
        });
        setNetworkFilter({
            networking_company_category: '',
            country: '',
            state: '',
            city: ''
        });
        getNetworkData().finally(() => {
            setLoading(false); // Hide loader after data is fetched
        });
    };

    const handlenetworkingportal = async () => {
        try {
           
    
            // Fetch current portal and start time from session storage
            const current_portal = sessionStorage.getItem('portal');
            const current_portal_start_time = sessionStorage.getItem('starttime');
    
            console.log('current_portal:', current_portal);

    
            // Prepare common headers for API requests
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            };
    
            // Send time spent data to the backend
            if (current_portal && current_portal_start_time) {
                const timeSpentPayload = {
                    portal: current_portal,
                    start_time: current_portal_start_time,
                    end_time: new Date()
                };
    
                await fetch(`${API_URL}/api/timespentonportals`, {
                    method: 'POST',
                    headers,
                    body: JSON.stringify(timeSpentPayload),
                })
                    .then(response => response.json())
                    .then(data => {
                        console.log("Time spent data response:", data);
                    })
                    .catch(err => {
                        console.error("Error logging time spent:", err);
                    });
            }
    
            // Update the last visited portal
            const portalPayload = { portal: localFilter.networking_company_category === 'business' ? 'business' : 'proffession' };
    
            await fetch(`${API_URL}/api/lastvisitedportals`, {
                method: 'POST',
                headers,
                body: JSON.stringify(portalPayload),
            })
                .then(response => response.json())
                .then(data => {
                    console.log("Last visited portal response:", data);
                    // Update session storage for the new portal
                    sessionStorage.setItem('portal', localFilter.networking_company_category === 'business' ? 'business' : 'proffession');
                    sessionStorage.setItem('starttime', new Date());
                    // Navigate('/InvestorList')
                })
                .catch(err => {
                    console.error("Error updating last visited portal:", err);
                    // Update session storage for the new portal
                    sessionStorage.setItem('portal', localFilter.networking_company_category === 'business' ? 'business' : 'proffession');
                    sessionStorage.setItem('starttime', new Date());
                    // Navigate('/InvestorList')
                });
        } catch (error) {
            console.error("Error in handlestartupportal:", error);
            // Navigate('/InvestorList')

        }








            // let portal = localFilter.networking_company_category === 'business' ? 'business' : 'proffession';
            // if (token) {
            // const requestOptions = {
            //     method: 'post',
            //     headers: {
            //         'Content-Type': 'application/json',
            //         'Authorization': `Bearer ${token}`
            //     },
            //     body: JSON.stringify({
            //         portal: portal

            //     })
            // };
            // fetch(`${API_URL}/api/lastvisitedportals`, requestOptions)
            //     .then(response => response.json())
            //     .then(data => {
            //         console.log("data>?>>>>??????>>>>????", data);
            //         // window.location.href = "Businesslist";
            //     })
            //     .catch(err => {
            //         console.log(err);
            //     });
            // }
            // // else {
            // //     window.location.href = "Businesslist";
            // // }
            // } catch (error) {
            //     console.log(error);
            // } 
        }


    console.log(networkdata)
    console.log("totalcount",totalcount)
    console.log("networkfilter",networkfilter)

    return (
        <div>
            <img src={banner} alt="" />
            <Container>
                <div className='selectbutt'>
                    <Row style={{ justifyContent: 'center' }}>
                        <Col lg={2}>
                            <select name="" id="" onChange={handleNetworkType} value={localFilter?.networking_company_category}>
                                <option value="" hidden >Networking Type</option>
                                <option value="business">Business</option>
                                <option value="profession">Professional</option>

                            </select>
                        </Col>
                        <Col lg={2}>
                            <select name="" id="" onChange={handleCountry}>
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
                            <select name="" id="" onChange={handleState}>
                                <option value="" hidden>State</option>

                                {!networkfilter.country ? <option disabled>Select Country First</option> :
                                    statelist.map((item, index) => {
                                        return (
                                            <option key={index} selected={localFilter?.state == item._id} value={item._id}>{item.state_name}</option>
                                        )
                                    })
                                }
                            </select>
                        </Col>
                        <Col lg={2}>
                            <select name="" id="" onChange={handleCity}>
                                <option value="" hidden>City</option>
                                {!networkfilter.state ? <option disabled>Select State First</option> :
                                    citylist.map((item, index) => {
                                        return (
                                            <option key={index} selected={localFilter?.city == item._id} value={item._id}>{item.city_name}</option>
                                        )
                                    }
                                    )}
                            </select>
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
                
                {/* {networkfilter.networking_company_category != '' &&
                    <h3 className='similar-commm'>{totalcount} {networkfilter?.networking_company_category == 'business' ? 'Businesses' : 'Professions' }</h3>
                } */}

                            {networkfilter.networking_company_category !== '' && (
                                <h3 className='similar-commm'>
                                    {totalcount} {networkfilter.networking_company_category === 'business'
                                        ? totalcount === 1 ? 'Business' : 'Businesses'
                                        : totalcount === 1 ? 'Profession' : 'Professions'}
                                </h3>
                            )}

                <Row className="mt-5 mb-5">
                    {networkdata?.length > 0 ? (
                        networkdata?.map((data, index) => (
                            <React.Fragment key={index}>
                                {networkfilter.networking_company_category === 'business' ? (
                                    <Col lg={3} className="mb-5">
                                        <div className="company-info">
                                            <img
                                                src={`${API_URL}/uploads/company_logo/${data?.logo?.map(val => val.filename)}`}
                                                alt=""
                                                height={150}
                                                width={200}
                                                style={{ objectFit: 'contain' }}
                                            />
                                            <h3>{data.company_name}</h3>
                                            <p className="companybio">{data.company_bio}</p>
                                            <h6>Type: {data?.business_type_details?.map(val => val?.business_type)}</h6>
                                            <button
                                                className="connnnnnnect"
                                                onClick={() => Navigate(`/Businessdetailpage?id=${data._id}`)}
                                            >
                                                Connect now
                                            </button>
                                        </div>
                                    </Col>
                                ) : (
                                    <Col lg={3} className="mb-5">
                                        <div className="company-info">
                                                <img src={!data?.logo || data?.logo.length == 0 ? dummyLogo : `${API_URL}/uploads/company_logo/${data?.logo?.map(val => val.filename)}`}
                                                    alt=""
                                                    height={150}
                                                    width={200}
                                                    style={{ objectFit: 'contain' }}
                                                />
                                                <h3>{data?.Firmname}</h3>
                                                <p className="companybio">{data?.company_bio}</p>
                                                <h6>Type: {data?.profession_type}</h6>
                                            <button
                                                className="connnnnnnect"
                                                    onClick={() => Navigate(`/Professionaldetailpage?id=${data._id}`)}
                                            >
                                                Connect now
                                            </button>
                                        </div>
                                    </Col>
                                )}
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

export default Businesslist