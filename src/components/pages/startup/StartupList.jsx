import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import wipro from "../../../assets/business/clogo.svg"
import { Col, Container, Row } from 'react-bootstrap'
import banner from '../../../assets/startup/banner.png'
import dummyLogo from "../../../assets/dummyLogo.png"
import API_URL from '../../../../config'
import { useStartupFilterContext } from '../../../services/StartupFllterContext'
import Nodatafound from '../nodatafound/Nodatafound'
import { RotatingLines } from 'react-loader-spinner'


const StartupList = () => {
    const Navigate = useNavigate();

    const { startupfilter, setStartupFilter, getStartupData, startupdata, totalcount } = useStartupFilterContext();

    const [businessTypeList, setBusinessTypeList] = useState([]);
    const [industryList, setIndustryList] = useState([]);
    const [startupStageList, setStartupStageList] = useState([]);
    const [revenueModelList, setRevenueModelList] = useState([]);
    const [localFilter, setLocalFilter] = useState(startupfilter);

    const [loading, setLoading] = useState(false);



    useEffect(() => {
        if (localStorage.getItem('token')) {
            fetchAllData();
        } else {
            Navigate('/login');
        }
    }, []);

    const fetchAllData = async () => {
        try {
            await Promise.all([
                fetchData('getstartupBusinessType', setBusinessTypeList),
                fetchData('getstartupIndustryType', setIndustryList),
                fetchData('getstartupStage', setStartupStageList),
                fetchData('getstartupRevenue', setRevenueModelList),
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


    const handleBusinesstype = (e) => {
        setLocalFilter({ ...localFilter, business_type: e.target.value });
    };
    const handleIndustry = (e) => {
        setLocalFilter({ ...localFilter, industry: e.target.value });
    };
    const handleStartupstage = (e) => {
        setLocalFilter({ ...localFilter, startup_stage: e.target.value });
    };
    const handleRevenuemodel = (e) => {
        setLocalFilter({ ...localFilter, revenue_model: e.target.value });
    };
    const handleminimuminvestment = (e) => {
        setLocalFilter({ ...localFilter, minimum_investment: e.target.value });
    };
    const handleMaximuminvestment = (e) => {
        setLocalFilter({ ...localFilter, maximum_investment: e.target.value });
    };

    console.log('startupdata', startupdata)

    const submitFilter = () => {
        setLoading(true);
        setStartupFilter(localFilter);
        getStartupData(localFilter).finally(() => {
            setLoading(false); // Hide loader after data is fetched
        });
    };

    const resetFilter = () => {
        setLoading(true);
        setLocalFilter({
            business_type: '',
            industry: '',
            startup_stage: '',
            revenue_model: '',
            minimum_investment: '',
            maximum_investment: ''
        });
        setStartupFilter({
            business_type: '',
            industry: '',
            startup_stage: '',
            revenue_model: '',
            minimum_investment: '',
            maximum_investment: ''
        });
        getStartupData({
            business_type: '',
            industry: '',
            startup_stage: '',
            revenue_model: '',
            minimum_investment: '',
            maximum_investment: ''
        }).finally(() => {
            setLoading(false); // Hide loader after data is fetched
        });
    };

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
                            <select name="" id="" onChange={handleBusinesstype}>
                                <option value="" hidden>Business Type</option>
                                {businessTypeList?.map((val, index) => (
                                    <option key={index} selected={localFilter?.business_type == val?._id} value={val?._id}>{val?.startupbusiness_type}</option>
                                ))}
                            </select>
                        </Col>
                        <Col lg={2}>
                            <select name="" id="" onChange={handleIndustry}>
                                <option value="" hidden>Industry</option>
                                {industryList?.map((val, index) => (
                                    <option key={index} selected={localFilter?.industry == val?._id} value={val._id}>{val.startup_industry}</option>
                                ))}
                            </select>
                        </Col>
                        <Col lg={2}>
                            <select name="" id="" onChange={handleStartupstage}>
                                <option value="" hidden>Startup Stage</option>
                                {startupStageList?.map((val, index) => (
                                    <option key={index} selected={localFilter?.startup_stage == val?._id} value={val._id}>{val.startup_stage}</option>
                                ))}
                            </select>
                        </Col>
                        <Col lg={2}>
                            <select name="" id="" onChange={handleRevenuemodel}>
                                <option value="" hidden >Revenue model</option>
                                {revenueModelList?.map((val, index) => (
                                    <option key={index} selected={localFilter?.revenue_model == val?._id} value={val._id}>{val.startup_revenue}</option>
                                ))}
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
                        <h3 className='similar-commm'>{totalcount} StartUps</h3>
                        <Row className='mt-5 mb-5'>
                            {startupdata?.length > 0 ? (
                                startupdata?.map((data, index) => (
                                    <React.Fragment key={index}>
                                        <Col lg={3} className="mb-5">
                                            <div className="company-info">
                                                <img
                                                    src={`${API_URL}/uploads/company_logo/${data?.companyLogo?.map(val => val.filename)}`}
                                                    alt="Company Logo"
                                                    height={150}
                                                    width={200}
                                                    style={{ objectFit: 'contain' }}
                                                />
                                                <h3>{data.companyName}</h3>
                                                <h6 style={{ textAlign: 'start', paddingLeft: '5px' }}>
                                                    <span style={{ color: "gray" }}>Business Type: </span>
                                                    <span style={{ color: "#9A031E" }}>{data?.businessType_details?.map(val => val?.startupbusiness_type)}</span>
                                                </h6>
                                                <h6 style={{ textAlign: 'start', paddingLeft: '5px' }}>
                                                    <span style={{ color: "gray" }}> Industry: </span>
                                                    <span className='text-break' style={{ color: "#9A031E" }}>{data?.industry_details?.map(val => val?.startup_industry)}</span>
                                                </h6>
                                                <button
                                                    className="connnnnnnect"
                                                    onClick={() => Navigate(`/Startupdetails?id=${data._id}`)}
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

export default StartupList