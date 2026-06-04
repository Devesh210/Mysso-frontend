import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import API_URL from '../../../../config';

const Temps = () => {
   

    const [maritalStatusList, setMaritalStatusList] = useState([]);
    const [NationalityList, setNationalityList] = useState([]);
    const [MotherTongueList, setMotherTongueList] = useState([]);
    const [casteList, setCasteList] = useState([]);
    const [subCasteList, setSubCasteList] = useState([]);
    const [stateList, setStateList] = useState([]);
    const [cityList, setCityList] = useState([]);
    const [permanentStateList, setPermanentStateList] = useState([]);
    const [permanentCityList, setPermanentCityList] = useState([]);

    //personal information
    const [first_name, setFirst_name] = useState('');
    const [last_name, setLast_name] = useState('');
    const [gender, setGender] = useState('');
    const [dob, setDob] = useState('');
    const [age, setAge] = useState('');
    const [marital_status, setMarital_status] = useState('');
    const [nationality, setNationality] = useState('');
    const [mother_tongue, setMother_tongue] = useState('');
    const [language_known, setLanguage_known] = useState('');
    const [cast_id, setCast_id] = useState('');
    const [sub_caste, setSub_caste] = useState('');
    const [gotra, setGotra] = useState('');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [info_about_me, setInfo_about_me] = useState('');
    const [hobbies, setHobbies] = useState('');
    //present address
    const [country_id, setCountry_id] = useState('');
    const [state_id, setState_id] = useState('');
    const [city_id, setCity_id] = useState('');
    //permanent address
    const [permanent_country_id, setPermanent_country_id] = useState('');
    const [permanent_state_id, setPermanent_state_id] = useState('');
    const [permanent_city_id, setPermanent_city_id] = useState('');
    //career information
   const [careers, setCareers] = useState([]);
    //sibling information
    const [siblings, setSiblings] = useState([]);

    useEffect(() => {
        getMaritalstatus();
        getNationality();
        getMothertongue();
        getCaste();
        getSubCaste();
        getState();
        getCity();
    }, []);

    useEffect(() => {
        getState();
    }, [country_id]);

    useEffect(() => {
        getCity();
    }, [state_id]);

    useEffect(() => {
        getPermanentState();
    }, [permanent_country_id]);

    useEffect(() => {
        getPermanentCity();
    }, [permanent_state_id]);

    useEffect(() => {
        getSubCaste();
    }, [cast_id]);


    const handleCareerChange = (index, field, value) => {
        const newCareers = careers.map((career, i) =>
            i === index ? { ...career, [field]: value } : career
        );
        setCareers(newCareers);
    };

    const addCareer = () => {
        setCareers([...careers, { occupation: '', company: '', income: '' }]);
    };

    const removeCareer = (index) => {
        const newCareers = careers.filter((_, i) => i !== index);
        setCareers(newCareers);
    };

    const handleSiblingChange = (index, field, value) => {
        const newSiblings = siblings.map((sibling, i) =>
            i === index ? { ...sibling, [field]: value } : sibling
        );
        setSiblings(newSiblings);
    };

    const addSibling = () => {
        setSiblings([...siblings, { name: '', maritalStatus: '', education: '' }]);
    };

    const removeSibling = (index) => {
        const newSiblings = siblings.filter((_, i) => i !== index);
        setSiblings(newSiblings);
    };

    const getMaritalstatus = async () => {
        try {
            const requestoptions = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            };
           await fetch(`${API_URL}/api/maritalStatusList`, requestoptions)
            .then(response => response.json())
            .then(data => {
                console.log(data.data);
                setMaritalStatusList(data.data);
            })
        } catch (err) {
            console.error(err.message);
        }
    }

    const getNationality = async () => {
        try {
            const requestoptions = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            };
            await fetch(`${API_URL}/api/countryList`, requestoptions)
            .then(response => response.json())
            .then(data => {
                console.log(data.data);
                setNationalityList(data.data);
            })
        }
        catch (err) {
            console.error(err.message);
        }
    }

    const getMothertongue = async () => {
        try {
            const requestoptions = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            };
            await fetch(`${API_URL}/api/motherTongueList`, requestoptions)
            .then(response => response.json())
            .then(data => {
                console.log(data.data);
                setMotherTongueList(data.data);
            })
        }
        catch (err) {
            console.error(err.message);
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
                setCasteList(data.data);
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
            await fetch(`${API_URL}/api/getSubcastbycastid?cast_id=${cast_id}`, requestoptions)
            .then(response => response.json())
            .then(data => {
                console.log(data.data);
                setSubCasteList(data.data);
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

    const getPermanentState = async () => {
        try {
            const requestoptions = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            };
            await fetch(`${API_URL}/api/getstatebycountry?country_id=${permanent_country_id}`, requestoptions)
                .then(response => response.json())
                .then(data => {
                    console.log(data.data);
                    setPermanentStateList(data.data);
                })
        }
        catch (err) {
            console.error(err.message);
        }
    }

    const getPermanentCity = async () => {
        try {
            const requestoptions = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            };
            await fetch(`${API_URL}/api/getcitybystate?state_id=${permanent_state_id}`, requestoptions)
                .then(response => response.json())
                .then(data => {
                    console.log(data.data);
                    setPermanentCityList(data.data);
                })
        }
        catch (err) {
            console.error(err.message);
        }
    }


const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const formdata = new FormData();
        formdata.append('firstName', first_name);
        formdata.append('lastName', last_name);
        formdata.append('gender',gender);
        formdata.append('dateOfBirth',dob);
        formdata.append('age',age);
        formdata.append('maritalStatus',marital_status);
        formdata.append('nationality',nationality);
        formdata.append('motherTongue',mother_tongue);
        formdata.append('languagesKnown',language_known);
        formdata.append('caste',cast_id);
        formdata.append('subCaste',sub_caste);
        formdata.append('gotra',gotra);
        formdata.append('height',height);
        formdata.append('weight',weight);
        formdata.append('infoAboutMe',info_about_me);
        formdata.append('hobbies',hobbies);
        formdata.append('present_country',country_id);
        formdata.append('present_state',state_id);
        formdata.append('present_city',city_id);
        formdata.append('permanent_country',permanent_country_id);
        formdata.append('permanent_state',permanent_state_id);
        formdata.append('permanent_city',permanent_city_id);
        formdata.append('career',JSON.parse(careers));
        formdata.append('siblings', JSON.parse(siblings));

        console.log(Array.from(formdata));

        const requestoptions = {
            method: 'POST',
            body: formdata,
        };
        await fetch(`${API_URL}/api/addMatrimonyUserData`, requestoptions)
            .then(response => response.json())
            .then(data => {
                console.log(data);
            })

    } catch (err) {
        console.error(err.message);
    }
}







    return (
        <div className="container mt-4">
            <h2>Personal Information</h2>
            <div className="row">
                <div className="col-md-6">
                    <div className="form-group">
                        <label>First Name</label>
                        <input type="text" className="form-control" placeholder="Enter your first name" onChange={(e)=>setFirst_name(e.target.value)} />
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label>Last Name</label>
                        <input type="text" className="form-control" placeholder="Enter your last name" onChange={(e)=>setLast_name(e.target.value)} />
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label>Gender</label>
                        <select className="form-control" onChange={(e)=>setGender(e.target.value)}>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label>Date of Birth</label>
                        <input type="date" className="form-control" onChange={(e)=>setDob(e.target.value)} />
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label>Age</label>
                        <input type="text" className="form-control" placeholder="Enter your age" onChange={(e)=>setAge(e.target.value)} />
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label>Marital Status</label>
                        <select className="form-control" onChange={(e)=>setMarital_status(e.target.value)} >
                            <option hidden>Select Status</option>
                            {maritalStatusList?.map((status, index) => (
                                <option key={index} value={status._id}>{status.type}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label>Nationality</label>
                        <select className="form-control" onChange={(e)=>setNationality(e.target.value)} >
                            <option hidden>Select Nationality</option>
                            {NationalityList?.map((nationality,index) => (
                                <option key={index} value={nationality._id}>{nationality.country_name}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label>Mother Tongue</label>
                        <select className="form-control" onChange={(e)=>setMother_tongue(e.target.value)} >
                            <option hidden>Select Mother Tongue</option>
                            {MotherTongueList?.map((motherTongue,index) => (
                                <option key={index} value={motherTongue._id}>{motherTongue.type}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label>Language Known</label>
                        <select className="form-control" onChange={(e)=>setLanguage_known(e.target.value)} >
                            <option hidden>Select Languages Known</option>
                            {MotherTongueList?.map((motherTongue, index) => (
                                <option key={index} value={motherTongue._id}>{motherTongue.type}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label>Caste</label>
                        <select className="form-control"  onChange={(e)=> setCast_id(e.target.value)} >
                            <option hidden>Select Caste</option>
                            {casteList?.map((caste, index) => (
                                <option key={index} value={caste._id}>{caste.type}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label>Sub caste</label>
                        <select className="form-control" onChange={(e)=>setSub_caste(e.target.value)} >
                            <option hidden>Select Sub Caste</option>
                            {subCasteList?.map((subCaste, index) => (
                                <option key={index} value={subCaste._id}>{subCaste.type}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label>Gotra</label>
                        <input type="text" className="form-control" placeholder="Enter your Gotra" onChange={(e)=>setGotra(e.target.value)} />
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label>Height</label>
                        <input type="text" className="form-control" placeholder="Enter your height" onChange={(e)=>setHeight(e.target.value)} />
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label>Weight</label>
                        <input type="text" className="form-control" placeholder="Enter your weight" onChange={(e)=>setWeight(e.target.value)} />
                    </div>
                </div>
                <div className="col-12">
                    <div className="form-group">
                        <label>Info about me</label>
                        <textarea className="form-control" placeholder="Enter about you" rows="3" onChange={(e)=>setInfo_about_me(e.target.value)}></textarea>
                    </div>
                </div>
                <div className="col-12">
                    <div className="form-group">
                        <label>Hobbies</label>
                        <textarea className="form-control" placeholder="Enter your hobbies" rows="3" onChange={(e) => setHobbies(e.target.value)}></textarea>
                    </div>
                </div>
            </div>

            <h2 className="mt-4">Present Address</h2>
            <div className="row">
                <div className="col-lg-4">
                    <div className="form-group">
                        <label>Country</label>
                        <select className="form-control" onChange={(e)=>setCountry_id(e.target.value)}>
                            <option hidden>Select Country</option>
                            {NationalityList?.map((nationality, index) => (
                                <option key={index} value={nationality._id}>{ nationality.country_name }</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="col-lg-4">
                    <div className="form-group">
                        <label>State</label>
                        <select className="form-control" onChange={(e)=> setState_id(e.target.value)}>
                            <option hidden>Select State</option>
                            {stateList?.map((state, index) => (
                                <option key={index} value={state._id}>{state.state_name}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="col-lg-4">
                    <div className="form-group">
                        <label>City</label>
                        <select className="form-control" onChange={(e) => setCity_id(e.target.value)}>
                            <option hidden>Select City</option>
                            {cityList?.map((city, index) => (
                                <option key={index} value={city._id}>{city.city_name}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            <h2 className="mt-4">Permanent Address</h2>
            <div className="row">
                <div className="col-lg-4">
                    <div className="form-group">
                        <label>Country</label>
                        <select className="form-control"  onChange={(e)=> setPermanent_country_id(e.target.value)} >
                            <option hidden>Select Country</option>
                            {NationalityList?.map((nationality, index) => (
                                <option key={index} value={nationality._id}>{nationality.country_name}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="col-lg-4">
                    <div className="form-group">
                        <label>State</label>
                        <select className="form-control" onChange={(e)=> setPermanent_state_id(e.target.value)}>
                            <option hidden>Select State</option>
                            {permanentStateList?.map((state, index) => (
                                <option key={index} value={state._id}>{state.state_name}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="col-lg-4">
                    <div className="form-group">
                        <label>City</label>
                        <select className="form-control" onChange={(e)=>setPermanent_city_id(e.target.value)} >
                            <option hidden>Select City</option>
                            {permanentCityList?.map((city, index) => (
                                <option key={index} value={city._id}>{city.city_name}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            <h2 className="mt-4">Career Information</h2>
            {careers.map((career, index) => (
                <div key={index} className="row">
                    <div className="col-lg-4">
                        <div className="form-group">
                            <label>Occupation</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter occupation"
                                value={career.occupation}
                                onChange={(e) => handleCareerChange(index, 'occupation', e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="form-group">
                            <label>Company</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter company"
                                value={career.company}
                                onChange={(e) => handleCareerChange(index, 'company', e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="form-group">
                            <label>Income</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter income"
                                value={career.income}
                                onChange={(e) => handleCareerChange(index, 'income', e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="col-12 mb-3">
                       
                            <button className="btn btn-success" onClick={addCareer}>+</button>
                    
                            <button type="button" className="btn btn-danger" onClick={() => removeCareer(index)}>
                                Remove
                            </button>
                    
                    </div>
                </div>
            ))}

            <h2 className="mt-4">Sibling Information</h2>
            {siblings.map((sibling, index) => (
                <div key={index} className="row">
                    <div className="col-lg-4">
                        <div className="form-group">
                            <label>Name</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter name"
                                value={sibling.name}
                                onChange={(e) => handleSiblingChange(index, 'name', e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="form-group">
                            <label>Marital Status</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter marital status"
                                value={sibling.maritalStatus}
                                onChange={(e) => handleSiblingChange(index, 'maritalStatus', e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="form-group">
                            <label>Education</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter education"
                                value={sibling.education}
                                onChange={(e) => handleSiblingChange(index, 'education', e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="col-12 mb-3">
                        {index === siblings.length - 1 ? (
                            <button type="button" className="btn btn-primary" onClick={addSibling}>
                                Add Sibling
                            </button>
                        ) : (
                            <button type="button" className="btn btn-danger" onClick={() => removeSibling(index)}>
                                Remove
                            </button>
                        )}
                    </div>
                </div>
            ))}
            <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
        </div>
    );
};

export default Temps;
