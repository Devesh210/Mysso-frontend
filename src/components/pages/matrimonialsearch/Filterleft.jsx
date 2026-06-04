import React, { useEffect, useState } from 'react'
import { Row, Col } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';

import orimg from "../../../assets/matrimonial/or.svg";
import API_URL from '../../../../config';
import Select from 'react-select';
import { useFilterContext } from '../../../services/FilterContext'


const Filterleft = ({ onDataChange }) => {

    const { matrimonyfilter, setMatrimonyFilter, getMatrimonyData } = useFilterContext();


    const [lookingforlist, setLookingforlist] = useState([]);
    const [agelist, setAgelist] = useState([]);
    const [maritalStatusList, setMaritalStatusList] = useState([]);
    const [countryList, setCountryList] = useState([]);
    const [stateList, setStateList] = useState([]);
    const [cityList, setCityList] = useState([]);
    const [motherTongueList, setMotherTongueList] = useState([]);
    const [castList, setCastList] = useState([]);
    const [subCastList, setSubCastList] = useState([]);

    const [country_id, setCountry_id] = useState('');
    const [state_id, setState_id] = useState('');
    const [city_id, setCity_id] = useState('');
    const [cast_id, setCast_id] = useState('');
    const [subcast_id, setSubcast_id] = useState('');


    const [lookingforsearch, setLookingforsearch] = useState('');
    const [agefromsearch, setAgefromsearch] = useState('');
    const [ageto, setAgeto] = useState('');
    const [maritalstatussearch, setMaritalstatussearch] = useState('');
    const [searchnationality, setSearchnationality] = useState('');
    const [searchcountry, setSearchcountry] = useState('');
    const [searchstate, setSearchstate] = useState('');
    const [searchcity, setSearchcity] = useState('');
    const [searchmothertongue, setSearchmothertongue] = useState('');
    // const [searchcaste, setSearchcaste] = useState('');
    // const [searchsubcaste, setSearchsubcaste] = useState('');
    const [searcheducation, setSearcheducation] = useState('');
    const [searchoccupation, setSearchoccupation] = useState('');
    const [searchincome, setSearchincome] = useState('');
    const [searchhobbies, setSearchhobbies] = useState('');
    const [searchgotra, setSearchgotra] = useState('');
    const [searchheight, setSearchheight] = useState('');
    const [searchweight, setSearchweight] = useState('');
    const [searchhandicap, setSearchhandicap] = useState('');
    const [searchmemberid, setSearchmemberid] = useState('');
    const [localFilter, setLocalFilter] = useState(matrimonyfilter);







    useEffect(() => {
        getLookingForList();
        getAge();
        getMaritalstatus();
        getCountry();
        getMothertongue();
        getCaste();

        const storedFilterData = localStorage.getItem('filterData');
        if (storedFilterData) {
            const parsedFilterData = JSON.parse(storedFilterData);
            console.log(parsedFilterData);
            setLookingforsearch(parsedFilterData.lookingfor);
            setAgefromsearch(parsedFilterData.agefrom);
            setAgeto(parsedFilterData.ageto);
            setSearchcountry(parsedFilterData.countrydata);
            setCast_id(parsedFilterData.caste);
            // localStorage.removeItem('filterData');
        }

    }, []);

    // useEffect(() => {
    //     if (localFilter?.country) {
    //         getState();
    //     } else {
    //         setStateList([]);
    //         setCityList([]);
    //         setMatrimonyFilter({
    //             ...localFilter,
    //             state: '',
    //             city: ''
    //         })
    //         setLocalFilter({
    //             state: '',
    //             city: ''
    //         })
    //     }
    // }, [localFilter?.country]);

    // useEffect(() => {
    //     if (localFilter?.state) {
    //         getCity();
    //     }
    // }, [localFilter.state]);


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



    useEffect(() => {
        if (localFilter.caste) {
            getSubCaste();
        }
    }, [localFilter.caste]);



   


    const getLookingForList = () => {
        try {
            const requestoptions = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            }
            fetch(`${API_URL}/api/usergendertypeList`, requestoptions)
                .then(response => response.json())
                .then(data => {
                    if (data.status == 200) {
                        setLookingforlist(data.data);
                    }
                    else {
                        console.log(data.message);
                    }
                })
        } catch (error) {
            console.log(error);
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

    const getMaritalstatus = async () => {
        try {
            const requestOption = {
                method: 'GET'
            }
            const response = await fetch(`${API_URL}/api/maritalStatusList`, requestOption)
                .then(res => res.json())
                .then(data => {
                    setMaritalStatusList(data.data)
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
                    const countrydata = data.data.map((item) => {
                        return { value: item._id, label: item.country_name }
                    }
                    )
                    setCountryList(countrydata)
                    // setCountryList({ value: data.data[0]?._id, label: data.data[0]?.country_name})
                })
        } catch (error) {
            console.log(error)
        }
    }

    console.log(countryList);

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
                    setStateList(statedata);
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
                    setCityList(citydata);
                })
        }
        catch (err) {
            console.error(err.message);
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
                    setMotherTongueList(data.data)
                })
        } catch (error) {
            console.log(error)
        }
    }

    const getCaste = async () => {
        try {
            const requestoptions = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            };
            await fetch(`${API_URL}/api/castList`, requestoptions)
                .then(response => response.json())
                .then(data => {
                    console.log(data.data);
                    setCastList(data.data);
                })
        }
        catch (err) {
            console.error(err.message);
        }
    }

    const getSubCaste = async () => {
        try {
            const requestoptions = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            };
            await fetch(`${API_URL}/api/getSubcastbycastid?cast_id=${matrimonyfilter.caste}`, requestoptions)
                .then(response => response.json())
                .then(data => {
                    console.log(data.data);
                    setSubCastList(data.data);
                })
        }
        catch (err) {
            console.error(err.message);
        }
    }

    const handleSearchNationality = (e) => {
        setLocalFilter({
            ...localFilter,
            nationality: e.value
        })
    }

    const handleSearchCountry = (e) => {
        setLocalFilter({
            ...localFilter,
            country: e.value,
            state: '',
            city: ''
        })
    }

    const handleSearchState = (e) => {
        setLocalFilter({
            ...localFilter,
            state: e.value,
            city: '',
        })
    }

    const handleSearchCity = (e) => {
        setLocalFilter({
            ...localFilter,
            city: e.value
        })
    }

  
    console.log("localFilter",localFilter);

    const handleApply = (e) => {
        e.preventDefault();
        try {
            setLocalFilter({ ...localFilter, memberid: '' })
            setMatrimonyFilter({
                lookingfor: localFilter.lookingfor,
                agefrom: localFilter.agefrom,
                ageto: localFilter.ageto,
                maritalstatus: localFilter.maritalstatus,
                nationality: localFilter.nationality,
                country: localFilter.country,
                state: localFilter.state,
                city: localFilter.city,
                mothertongue: localFilter.mothertongue,
                caste: localFilter.caste,
                subcaste: localFilter.subcaste,
                education: localFilter.education,
                occupation: localFilter.occupation,
                income: localFilter.income,
                hobbies: localFilter.hobbies,
                gotra: localFilter.gotra,
                height: localFilter.height,
                weight: localFilter.weight,
                handicap: localFilter.handicap,
                memberid: ''
            })
            getMatrimonyData({
                lookingfor: localFilter.lookingfor,
                agefrom: localFilter.agefrom,
                ageto: localFilter.ageto,
                maritalstatus: localFilter.maritalstatus,
                nationality: localFilter.nationality,
                country: localFilter.country,
                state: localFilter.state,
                city: localFilter.city,
                mothertongue: localFilter.mothertongue,
                caste: localFilter.caste,
                subcaste: localFilter.subcaste,
                education: localFilter.education,
                occupation: localFilter.occupation,
                income: localFilter.income,
                hobbies: localFilter.hobbies,
                gotra: localFilter.gotra,
                height: localFilter.height,
                weight: localFilter.weight,
                handicap: localFilter.handicap,
                memberid: ''

            })
            window.scrollTo(0, 0); // Scroll to the top after pagination click


        } catch (error) {
            console.log(error)
        }

    };

    const handleReset = (e) => {
        e.preventDefault();
        setLocalFilter({
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
        }
        )
        getMatrimonyData({
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
        });
        window.scrollTo(0, 0); // Scroll to the top after pagination click

    };


    const handleSearch = (e) => {
        e.preventDefault();
        setLocalFilter({
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
         })
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
            memberid: localFilter.memberid
        }
        )
        getMatrimonyData({
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
            memberid: localFilter.memberid
        });
        window.scrollTo(0, 0); // Scroll to the top after pagination click
    };

  
    console.log(matrimonyfilter);

    const allowOnlyNumbers = (e) => {
        e.preventDefault();
        const input = e.target;
        const value = input.value.replace(/[^\d]/g, ''); // Replace any non-numeric characters with an empty string
        input.value = value; // Set the input value to the filtered value
    }



    return (
        <div>
            <div className='filter-left'>
                <h3>Advanced Search</h3>
                <div className='filter-fields'>
                    <Form.Select className='mb-4' onChange={(e) => setLocalFilter({ ...localFilter, lookingfor: e.target.value })} >
                        <option hidden>Looking For</option>
                        {lookingforlist?.map((item, index) => (
                            <option key={index} selected={localFilter.lookingfor == item._id} value={item._id}>{item.type}</option>
                        ))}
                    </Form.Select>
                    <Row>
                        <Col lg={6}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Control type="number" placeholder="Enter AGE From" onChange={(e) => setLocalFilter({ ...localFilter, agefrom: e.target.value })} value={localFilter.agefrom} />
                            </Form.Group>
                        </Col>
                        <Col lg={6}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Control type="number" placeholder="Enter AGE To" onChange={(e) => setLocalFilter({ ...localFilter, ageto: e.target.value })} value={localFilter.ageto} />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Form.Select className='mb-4' onChange={(e) => setLocalFilter({ ...localFilter, maritalstatus: e.target.value })} >
                        <option hidden>Select Marital Status</option>
                        {maritalStatusList?.map((status, index) => (
                            <option key={index} value={status._id} selected={localFilter?.maritalstatus == status?._id}>{status?.type}</option>
                        ))}
                    </Form.Select>
                    <Select
                        className='mb-4'
                        options={countryList}
                        name='type'
                        placeholder='Select Nationality'
                        value={countryList.find(option => option.value === localFilter?.nationality)}
                        required
                        autoComplete="off"
                        onChange={handleSearchNationality}
                    />
                    <Select
                        className='mb-4'
                        options={countryList}
                        name='type'
                        placeholder='Select Country'
                        value={!localFilter.country ? " " : countryList.find(option => option.value === localFilter?.country)}
                        required
                        autoComplete="off"
                        onChange={handleSearchCountry}
                    />
                    <Select
                        className='mb-4'
                        options={stateList}
                        name='type'
                        placeholder='Select State'
                        value={!localFilter.state ? " " : stateList.find(option => option.value === localFilter?.state)}
                        required
                        autoComplete="off"
                        onChange={handleSearchState}
                    />
                    <Select
                        className='mb-4'
                        options={cityList}
                        name='type'
                        placeholder='Select City'
                        value={!localFilter.city ? " " : cityList.find(option => option.value === localFilter?.city)}
                        required
                        autoComplete="off"
                        onChange={handleSearchCity}
                    />
                    <Form.Select className='mb-4' onChange={(e) => setLocalFilter({ ...localFilter, mothertongue: e.target.value })}>
                        <option hidden>Select Mother Tongue</option>
                        {motherTongueList?.map((motherTongue, index) => (
                            <option key={index} value={motherTongue._id} selected={localFilter.mothertongue == motherTongue._id}>{motherTongue.type}</option>
                        ))}
                    </Form.Select>
                    {/* <Form.Select className='mb-4' onChange={(e) => setMatrimonyFilter({ ...matrimonyfilter, caste: e.target.value })}>
                        <option hidden>Select Caste</option>
                        {castList?.map((caste, index) => (
                            <option key={index} value={caste?._id} selected={matrimonyfilter.caste == caste?._id}>{caste.type}</option>
                        ))}
                    </Form.Select>
                    <Form.Select className='mb-4' onChange={(e) => setMatrimonyFilter({ ...matrimonyfilter, subcaste: e.target.value })}>
                        <option hidden>Select Sub Caste</option>

                        {!matrimonyfilter.caste ? <option disabled>Select Caste First</option> :
                            subCastList?.map((subCaste, index) => (
                                <option key={index} value={subCaste._id} selected={matrimonyfilter.subcaste == subCaste?._id}>{subCaste.type}</option>
                            ))
                        }
                    </Form.Select> */}
                    <Form.Group className="mb-4" controlId="formBasicEmail">
                        <Form.Control type="text" placeholder="Enter Caste" value={localFilter.caste} onChange={(e) => setLocalFilter({ ...localFilter, caste: e.target.value })} />
                    </Form.Group>
                    <Form.Group className="mb-4" controlId="formBasicEmail">
                        <Form.Control type="text" placeholder="Enter Subcaste" value={localFilter.subcaste} onChange={(e) => setLocalFilter({ ...localFilter, subcaste: e.target.value })} />
                    </Form.Group>
                    <Form.Group className="mb-4" controlId="formBasicEmail">
                        <Form.Control type="text" placeholder="Enter Education" value={localFilter.education} onChange={(e) => setLocalFilter({ ...localFilter, education: e.target.value })} />
                    </Form.Group>
                    <Form.Group className="mb-4" controlId="formBasicEmail">
                        <Form.Control type="text" placeholder="Enter Occupation" value={localFilter.occupation} onChange={(e) => setLocalFilter({ ...localFilter, occupation: e.target.value })} />
                    </Form.Group>
                    <Form.Group className="mb-4" controlId="formBasicEmail">
                        <Form.Control type="text" placeholder="Enter Income" value={localFilter.income} onChange={(e) => setLocalFilter({ ...localFilter, income: e.target.value })} />
                    </Form.Group>
                    <Form.Group className="mb-4" controlId="formBasicEmail">
                        <Form.Control type="text" placeholder="Enter Hobbies" value={localFilter.hobbies} onChange={(e) => setLocalFilter({ ...localFilter, hobbies: e.target.value })} />
                    </Form.Group>
                    <Form.Group className="mb-4" controlId="formBasicEmail">
                        <Form.Control type="text" placeholder="Enter Gotra" value={localFilter.gotra} onChange={(e) => setLocalFilter({ ...localFilter, gotra: e.target.value })} />
                    </Form.Group>
                    <Form.Group className="mb-4" controlId="formBasicEmail">
                        <Form.Control type="text" placeholder="Enter Height (cm)" value={localFilter.height} onChange={(e) => setLocalFilter({ ...localFilter, height: e.target.value })} onInput={allowOnlyNumbers} maxLength={3} />
                    </Form.Group>
                    <Form.Group className="mb-4" controlId="formBasicEmail">
                        <Form.Control type="text" placeholder="Enter Weight (kg)" value={localFilter.weight} onChange={(e) => setLocalFilter({ ...localFilter, weight: e.target.value })} onInput={allowOnlyNumbers} maxLength={3} />
                    </Form.Group>
                    <Row>
                        <Col lg={12}>
                            <Form.Group className="mb-4" controlId="formBasicEmail" style={{ position: 'relative' }}>
                                <Form.Control type="number" placeholder="Handicap" />
                                <Form.Check // prettier-ignore
                                    type="checkbox"
                                    id="mycheckbox"
                                    onChange={(e) => setLocalFilter({ ...localFilter, handicap: e.target.checked })}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <button className='searchfilter mb-4' onClick={handleApply}>Apply</button>

                    <img className='orimgg' src={orimg} />

                    <Row>
                        <Col lg={12}>
                            <Form.Group className="mb-4" controlId="formBasicEmail">
                                <Form.Control type="text" placeholder="Search by Member ID" value={localFilter?.memberid} onChange={(e) => setLocalFilter({ ...localFilter, memberid: e.target.value })} />
                            </Form.Group>
                        </Col>
                    </Row>
                    <button className='searchfilter mb-5' onClick={handleSearch}>Search</button>
                    <button className='searchfilter mb-4' onClick={handleReset}>Reset All</button>
                </div>
            </div>
        </div>
    )
}

export default Filterleft
