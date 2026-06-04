import React, { useState, useEffect } from 'react'
import { Col, Container, Form, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { useMedicalFilterContext } from '../../../../services/MedicalFiltercontext.jsx';

import Slider from "react-slick";
import borderimg from '../../../../assets/border.svg';
import ash1 from "../../../../assets/medicalrtype.png"
import Select from 'react-select';
import API_URL from '../../../../../config';
import Nodatafound from '../../nodatafound/Nodatafound.jsx';
import { RotatingLines } from 'react-loader-spinner'


const Medicalsupportbanner = () => {
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

    const { medicalfilter, setMedicalFilter, getMedicalData, medicaldata, totalcount } = useMedicalFilterContext();



    const [hospitalList, setHospitalList] = useState([]);
    const [hospitalServicesList, setHospitalServicesList] = useState([]);


    const [localFilter, setLocalFilter] = useState(medicalfilter);
    const [loading, setLoading] = useState(false);



    useEffect(() => {
        if (localStorage.getItem('token')) {
            getHospitalsLists();
        } else {
            Navigate('/login');
        }
    }, [])

    useEffect(() => {
        getHospitalServicesList();
    }, [localFilter])



    const getHospitalsLists = async () => {
        try {
            const requestOptions = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            };

            await fetch(`${API_URL}/api/getListsofHospitals`, requestOptions)
                .then(response => response.json())
                .then(data => {
                    if (data.status === 200) {
                        console.log(data.data)
                        setHospitalList(data.data)
                    } else {
                        swal('Error', data.message, 'error');
                    }
                });
        }
        catch (error) {
            console.log(error)
        }
    }

    console.log(localFilter.hospital_name?.map(val => val.value))

    const getHospitalServicesList = async () => {
        try {
            const requestOptions = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            };

            await fetch(`${API_URL}/api/getListsofHospitalServicesbyid?hospital_id=${localFilter.hospital_name?.map(val => val.value) }`, requestOptions)
                .then(response => response.json())
                .then(data => {
                    if (data.status === 200) {
                        console.log(data.data)
                        setHospitalServicesList(data.data.map(item => item.serviceCategorydetails).flat())
                    } else {
                        swal('Error', data.message, 'error');
                    }
                });
        }
        catch (error) {
            console.log(error)
        }
    }


    const hospitalListOptions = hospitalList?.map((item) => {
        return {
            value: item._id,
            label: item.hospitalName
        }
    })

    const hospitalServicesListOptions = hospitalServicesList?.map((item) => {
        return {
            value: item._id,
            label: item.service_category
        }
    })

    const submitFilter = () => {
        setLoading(true);
        setMedicalFilter(localFilter);
        getMedicalData(localFilter).finally(() => setLoading(false));
    }

    console.log("medicaldata",medicaldata)

    const resetFilter = () => {
        setLoading(true);
        setLocalFilter({
            hospital_name: [],
            hospital_services: []
        })
        setMedicalFilter({
            hospital_name: [],
            hospital_services: []
        });
        getMedicalData({
            hospital_name: [],
            hospital_services: []
        }).finally(() => setLoading(false));
    }
    



    return (
        <>
            <div className='edutionalbanner mb-5'>
                <h3 className='startuabout'>Our Medical   <span>Supporter</span> <img className='imgsabouts' src={borderimg} alt="border" /></h3>
                <div className="educational-banner">
                    <Container fluid >
                        <div className="selectbutt">
                            <Row className="justify-content-center">
                                <Col lg={3}>
                                    <Form.Group>
                                        <Select
                                            closeMenuOnSelect={false}
                                            isMulti
                                            options={hospitalListOptions}
                                            value={localFilter.hospital_name}
                                            className="custom-select"
                                            placeholder="Select Hospitals"
                                            onChange={(selected) => { setLocalFilter({ ...localFilter, hospital_name: selected }) }}
                                        />
                                    </Form.Group>
                                </Col>

                                <Col lg={3}>
                                    <Form.Group>
                                        <Select
                                            closeMenuOnSelect={false}
                                            isMulti
                                            options={hospitalServicesListOptions}
                                            value={localFilter.hospital_services}
                                            className="custom-select"
                                            placeholder="Select Services"
                                            onChange={(selected) => { setLocalFilter({ ...localFilter, hospital_services: selected }) }}
                                            
                                        />
                                    </Form.Group>
                                </Col>

                                <Col lg={3} className="justify-content-center">
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
                            {medicaldata?.length > 0 ? (
                                medicaldata?.map((data, index) => (
                                    <Col lg={3} className="mb-5" key={index}>
                                        <div className="supporter-card">
                                            {/* <img className="supporter-image" src={ash1} alt="" /> */}
                                            <img className="supporter-image fixed-size" src={`${API_URL}/uploads/company_logo/${data?.hospitaldetails?.map(val => val.logo.map(file => file.filename))}`} alt="" />

                                            <h3>{data.hospitaldetails?.map(val => val?.hospitalName)}</h3>
                                            <p>Main Branch Address: <span>{data.hospitaldetails?.map(val => val?.mainBranchAddress)}</span></p>
                                            <p className='text-break'>About Hospital: <span>{data.hospitaldetails?.map(val => val?.aboutHospital)}</span></p>
                                            <p>Main Contact No: <span>{data.hospitaldetails?.map(val => val?.mainContact)}</span></p>
                                            <p>Email address: <span>{data.hospitaldetails?.map(val => val?.email)}</span></p>
                                            <p>24/7 Service available <span>{data.hospitaldetails?.map(val => val?.twentyFourSeven)}</span></p>
                                            <p>Website URL <span>{data.hospitaldetails?.map(val => val?.website)}</span></p>
                                            {/* <p className='expertbio'>{data?.bio}</p> */}
                                            <button
                                                className="connnnnnnect"
                                                onClick={() => Navigate(`/MedicalHospitalView?id=${data.hospital_id}`)}
                                            >
                                                More details
                                            </button>
                                            <button
                                                className="connnnnnnect"
                                                onClick={() => Navigate(`/MedicalHospitalServices?id=${data.hospital_id}`)}
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

export default Medicalsupportbanner