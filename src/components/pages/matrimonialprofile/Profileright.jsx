import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap'

import profile from "../../../assets/matrimonial/searchimg.png"
import gallery from "../../../assets/matrimonial/gallery.svg"
import info from "../../../assets/matrimonial/info.svg"
import home from "../../../assets/matrimonial/home.svg"
import edu from "../../../assets/matrimonial/education.svg"
import language from "../../../assets/matrimonial/language.svg"
import hobbies from "../../../assets/matrimonial/hobbies.svg"
import lifesty from "../../../assets/matrimonial/lifestyle.svg"
import astro from "../../../assets/matrimonial/astro.svg"
import satsang from "../../../assets/matrimonial/satsang.svg"
import family from "../../../assets/matrimonial/family.svg"
import API_URL from '../../../../config';


const Profileright = () => {

    useEffect(() => {
        const url = window.location.href;
        const url1 = url.split("/")[3];
        const url2 = url1.split("?")[1];
        const id = url2.split("=")[1];
        getProfiledata(id)
    }, [])


    const [profiledata, setProfiledata] = useState([])


    const getProfiledata = async (id) => {
        try {
            const requestOption = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            };
            await fetch(`${API_URL}/api/getMatrimonyUserDataById?id=${id}`, requestOption)
                .then((res) => res.json())
                .then((data) => {
                    console.log(data)
                    setProfiledata(data.data)
                })
        } catch (error) {
            console.log(error)
        }

    }

const formatDate = (date) => {
    const d = new Date(date);
    const dt = d.getDate();
    const mn = d.getMonth();
    const mnth = mn + 1;
    const yyyy = d.getFullYear();
    return `${dt}/${mnth}/${yyyy}`;
}






    return (
        <div>
            <div className='profilegallery mb-4'>
                <h3><img className='gallimg' src={gallery} />GALLERY</h3>
                <Row>
                    {profiledata?.photos?.map((val) => (
                    <Col lg={3}>
                        <img className='user-profile-image' src={`${API_URL}/uploads/photos/${val.filename}`} alt="profile" />
                    </Col>
                        ))}
                    {/* <Col lg={3}>
                        <img className='user-profile-image' src={profile} alt="profile" />
                    </Col>
                    <Col lg={3}>
                        <img className='user-profile-image' src={profile} alt="profile" />
                    </Col>
                    <Col lg={3}>
                        <img className='user-profile-image' src={profile} alt="profile" />
                    </Col> */}
                </Row>
            </div>
            <div className='profilegallery mb-4'>
                <h3><img className='gallimg' src={info} />BASIC INFORMATION</h3>
                <div className='descr-content'>
                    <Row>
                        <Col lg={3} className='mb-4'>
                            <h5>First Name</h5>
                            <p>{profiledata?.firstName}</p>
                        </Col>
                        <Col lg={3} className='mb-4'>
                            <h5>Last Name</h5>
                            <p>{profiledata?.lastName}</p>
                        </Col>
                        <Col lg={3} className='mb-4'>
                            <h5>Gender</h5>
                            <p>{profiledata?.gender}</p>
                        </Col>
                        <Col lg={3} className='mb-4'>
                            <h5>Date Of Birth</h5>
                            <p>{formatDate(profiledata?.dateOfBirth)}</p>
                        </Col>
                        <Col lg={3} className='mb-4'>
                            <h5>Age</h5>
                            <p>{profiledata?.age}</p>
                        </Col>
                        <Col lg={3} className='mb-4'>
                            <h5>Marital Status</h5>
                            <p>{profiledata?.marital_status_details?.map((val) => val?.type)}</p>
                        </Col>
                        <Col lg={3} className='mb-4'>
                            <h5>Mother Tongue</h5>
                            <p>{profiledata?.mother_tongue_details?.map((val) => val?.type)}</p>
                        </Col>
                        <Col lg={3} className='mb-4'>
                            <h5>Caste</h5>
                            <p>{profiledata?.caste_details?.map((val) => val?.type)}</p>
                        </Col>
                    </Row>
                </div>
            </div>
            <div className='profilegallery mb-4'>
                <h3><img className='gallimg' src={home} />PRESENT ADDRESS</h3>
                <div className='descr-content'>
                    <Row>
                        <Col lg={3} className='mb-4'>
                            <h5>Country</h5>
                            <p>{`${profiledata?.present_country_details?.map((val) => val.country_name)}`}</p>
                        </Col>
                        <Col lg={3} className='mb-4'>
                            <h5>State</h5>
                            <p>{`${profiledata?.present_state_details?.map((val) => val.state_name)}`}</p>
                        </Col>
                        <Col lg={3} className='mb-4'>
                            <h5>City</h5>
                            <p>{`${profiledata?.present_city_details?.map((val) => val.city_name)}`}</p>
                        </Col>
                    </Row>
                </div>
            </div>
            <div className='profilegallery mb-4'>
                <h3><img className='gallimg' src={edu} />EDUCATION</h3>
                {profiledata?.education?.map((val) => (
                <div className='descr-content'>
                    <Row>
                        <Col lg={3} className='mb-2'>
                            <h5>Degree</h5>
                            <p>{val?.degree}</p>
                        </Col>
                        <Col lg={3} className='mb-2'>
                            <h5>Institution</h5>
                                <p>{val?.institution}</p>
                        </Col>
                        <Col lg={3} className='mb-2'>
                            <h5>Year of Passing</h5>
                                <p>{val?.year_of_passing}</p>
                        </Col>
                    </Row>
                </div>
                ))}
            </div>
            <div className='profilegallery mb-4'>
                <h3><img className='gallimg' src={edu} />CAREER</h3>
                {profiledata?.career?.map((val) => (
                <div className='descr-content'>
                    <Row>
                        <Col lg={3} className='mb-4'>
                            <h5>Designation</h5>
                                <p>{val?.occupation}</p>
                        </Col>
                        <Col lg={3} className='mb-4'>
                            <h5>Company</h5>
                                <p>{val?.company}</p>
                        </Col>
                        <Col lg={3} className='mb-4'>
                            <h5>Annual Income</h5>
                            <p>RS. {val?.income}</p>
                        </Col>
                    </Row>
                </div>
                ))}
            </div>
            <div className='profilegallery mb-4'>
                <h3><img className='gallimg' src={hobbies} />HOBBIES</h3>
                <div className='descr-content'>
                    <Row>
                        <Col lg={2} className='mb-4'>
                            <p>{profiledata?.hobbies}</p>
                        </Col>
                        {/* <Col lg={2} className='mb-4'>
                            <p>Photography</p>
                        </Col>
                        <Col lg={2} className='mb-4'>
                            <p>Painting</p>
                        </Col>
                        <Col lg={2} className='mb-4'>
                            <p>Writing</p>
                        </Col>
                        <Col lg={2} className='mb-4'>
                            <p>Gardening</p>
                        </Col>
                        <Col lg={2} className='mb-4'>
                            <p>Dance</p>
                        </Col>
                        <Col lg={2} className='mb-4'>
                            <p>Drawing</p>
                        </Col>
                        <Col lg={2} className='mb-4'>
                            <p>Woodworking</p>
                        </Col> */}
                    </Row>
                </div>
            </div>
            <div className='profilegallery mb-4'>
                <h3><img className='gallimg' src={language} />LANGUAGE</h3>
                <div className='descr-content'>
                    <Row>
                        <Col lg={3} className='mb-4'>
                            <h5>Mother Tongue</h5>
                            <p>{profiledata?.mother_tongue_details?.map((val)=> val.type)}</p>
                        </Col>
                        <Col lg={9} className='mb-4'>
                            <h5>Known Languages</h5>
                            <p>{profiledata?.languages_known_details?.map((val) => val.language).join(', ')}</p>
                        </Col>
                    </Row>
                </div>
            </div>
            <div className='profilegallery mb-4'>
                <h3><img className='gallimg' src={lifesty} />LIFE STYLE</h3>
                <div className='descr-content'>
                    <Row>
                        <Col lg={3} className='mb-4'>
                            <h5>Are you a fitness freak ?</h5>
                            <p>{profiledata?.lifeStyle?.fitnessFreak}</p>
                        </Col>
                        <Col lg={6} className='mb-4'>
                            <h5>Are you prepared to take on more responsibilities?</h5>
                            <p>{profiledata?.lifeStyle?.moreResponsibilities}</p>
                        </Col>
                        <Col lg={3} className='mb-4'>
                            <h5>Do you like cooking?</h5>
                            <p>{profiledata?.lifeStyle?.likeCooking}</p>
                        </Col>
                        <Col lg={3} className='mb-4'>
                            <h5>Do you like traveling?</h5>
                            <p>{profiledata?.lifeStyle?.likeTraveling}</p>
                        </Col>
                        <Col lg={6} className='mb-4'>
                            <h5>Are you and your family fine with your partner (wife) working after marriage?</h5>
                            <p>{profiledata?.lifeStyle?.partnerWorking}</p>
                        </Col>
                        <Col lg={3} className='mb-4'>
                            <h5>Are you spiritually strong?</h5>
                            <p>{profiledata?.lifeStyle?.spirituallyStrong}</p>
                        </Col>
                    </Row>
                </div>
            </div>
            <div className='profilegallery mb-4'>
                <h3><img className='gallimg' src={astro} />ASTRONOMIC INFORMATION</h3>
                <div className='descr-content'>
                    <Row>
                        <Col lg={3} className='mb-4'>
                            <h5>Time Of Birth</h5>
                            <p>{profiledata?.astroDetails?.timeOfBirth} PM</p>
                        </Col>
                        <Col lg={3} className='mb-4'>
                            <h5>City Of Birth</h5>
                            <p>{profiledata?.astroDetails?.cityOfBirth}</p>
                        </Col>
                        <Col lg={3} className='mb-4'>
                            <h5>Mangal Dosh</h5>
                            <p>{profiledata?.astroDetails?.mangalDosh}</p>
                        </Col>
                        <Col lg={3} className='mb-4'>
                            <h5>Shani Dosh</h5>
                            <p>{profiledata?.astroDetails?.shanidosh}</p>
                        </Col>
                    </Row>
                </div>
            </div>
            <div className='profilegallery mb-4'>
                <h3><img className='gallimg' src={home} />PERMANENT ADDRESS</h3>
                <div className='descr-content'>
                    <Row>
                        <Col lg={3} className='mb-4'>
                            <h5>Country</h5>
                            <p>{`${profiledata?.permanent_country_details?.map((val) => val?.country_name)}`}</p>
                        </Col>
                        <Col lg={3} className='mb-4'>
                            <h5>State</h5>
                            <p>{`${profiledata?.permanent_state_details?.map((val) => val?.state_name)}`}</p>
                        </Col>
                        <Col lg={3} className='mb-4'>
                            <h5>City</h5>
                            <p>{`${profiledata?.permanent_city_details?.map((val) => val?.city_name)}`}</p>
                        </Col>
                    </Row>
                </div>
            </div>
            <div className='profilegallery mb-4'>
                <h3><img className='gallimg' src={home} />FAMILY INFORMATION</h3>
                <div className='descr-content'>
                    
                    <Row>
                        <Col lg={4} className='mb-4'>
                            <h5>Father's Name</h5>
                            <p>{profiledata?.father?.father_name}</p>
                            {/* <h6><span>Profession</span> : <span style={{ color: '#E83A14' }}>Business Man</span></h6>
                            <h6><span>Education</span> : <span style={{ color: '#E83A14' }}>MCom</span></h6> */}
                        </Col>
                        <Col lg={4} className='mb-4'>
                            <h5> Proffesion</h5>
                            <p>{profiledata?.father?.father_occupation}</p>
                            {/* <h6><span>Profession</span> : <span style={{ color: '#E83A14' }}>House Wife</span></h6>
                            <h6><span>Education</span> : <span style={{ color: '#E83A14' }}>BCom</span></h6> */}
                        </Col>
                        <Col lg={4} className='mb-4'>
                            <h5>Education</h5>
                            <p>{profiledata?.father?.father_education}</p>
                            {/* <p>1 Brother (Married)</p>
                            <p>1 Sister (Unmarried)</p> */}
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={4} className='mb-4'>
                            <h5>Mother's Name</h5>
                            <p>{profiledata?.mother?.mother_name}</p>
                            {/* <h6><span>Profession</span> : <span style={{ color: '#E83A14' }}>Business Man</span></h6>
                            <h6><span>Education</span> : <span style={{ color: '#E83A14' }}>MCom</span></h6> */}
                        </Col>
                        <Col lg={4} className='mb-4'>
                            <h5> Proffesion</h5>
                            <p>{profiledata?.mother?.mother_occupation}</p>
                            {/* <h6><span>Profession</span> : <span style={{ color: '#E83A14' }}>House Wife</span></h6>
                            <h6><span>Education</span> : <span style={{ color: '#E83A14' }}>BCom</span></h6> */}
                        </Col>
                        <Col lg={4} className='mb-4'>
                            <h5>Education</h5>
                            <p>{profiledata?.mother?.mother_education}</p>
                            {/* <p>1 Brother (Married)</p>
                            <p>1 Sister (Unmarried)</p> */}
                        </Col>
                    </Row>
                    {profiledata?.siblings?.map((val) => (
                    <Row>
                        <Col lg={4} className='mb-4'>
                            <h5>Sibling’s Name</h5>
                                <p>{val?.siblingName}</p>
                            {/* <h6><span>Profession</span> : <span style={{ color: '#E83A14' }}>Business Man</span></h6>
                            <h6><span>Education</span> : <span style={{ color: '#E83A14' }}>MCom</span></h6> */}
                        </Col>
                        <Col lg={4} className='mb-4'>
                            <h5> Marital Status</h5>
                                <p>{val?.siblingMaritalStatusDetails?.type}</p>
                            {/* <h6><span>Profession</span> : <span style={{ color: '#E83A14' }}>House Wife</span></h6>
                            <h6><span>Education</span> : <span style={{ color: '#E83A14' }}>BCom</span></h6> */}
                        </Col>
                        <Col lg={4} className='mb-4'>
                            <h5>Education</h5>
                                <p>{val?.siblingEducation}</p>
                            {/* <p>1 Brother (Married)</p>
                            <p>1 Sister (Unmarried)</p> */}
                        </Col>
                    </Row>
                    ))}

                </div>
            </div>
            <div className='profilegallery mb-4'>
                <h3><img className='gallimg' src={satsang} />SATSANG DETAILS</h3>
                <div className='descr-content'>
                    <Row>
                        <Col lg={6} className='mb-4'>
                            <h5>Do you perform Nitya Pooja Daily?</h5>
                            <p>{profiledata?.satsang?.nityaPoojaDaily}</p>
                        </Col>
                        <Col lg={3} className='mb-4'>
                            <h5>Follower of</h5>
                            <p>{profiledata?.satsang?.sansthaName}</p>
                        </Col>
                        <Col lg={3} className='mb-4'>
                            <h5>Name of the Mandal</h5>
                            <p>{profiledata?.satsang?.mandalName}</p>
                        </Col>
                        <Col lg={6} className='mb-4'>
                            <h5>Do you observe all fast prescribed in Sampradaya?</h5>
                            <p>{profiledata?.satsang?.sampradayaFast}</p>
                        </Col>
                        <Col lg={3} className='mb-4'>
                            <h5>Frequency of Temple Visits</h5>
                            <p>{profiledata?.satsang?.templeVisit}</p>
                        </Col>
                        <Col lg={3} className='mb-4'>
                            <h5>Do you Eat Onion/Garlic?</h5>
                            <p>{profiledata?.satsang?.eatOnionGarlic}</p>
                        </Col>
                        <Col lg={6} className='mb-4'>
                            <h5>Do you Perform Aarti, Evening Ghar Sabha etc ?</h5>
                            <p>{profiledata?.satsang?.aarti}</p>
                        </Col>
                        <Col lg={3} className='mb-4'>
                            <h5>Do you wear Kanthi ?</h5>
                            <p>{profiledata?.satsang?.wearKanthi}</p>
                        </Col>
                        <Col lg={3} className='mb-4'>
                            <h5>Any Volunteer Activities?</h5>
                            <p>{profiledata?.satsang?.volunteerActivities}</p>
                        </Col>
                        <Col lg={6} className='mb-4'>
                            <h5>Define Yourself as Satsangi</h5>
                            <p>{profiledata?.satsang?.define}</p>
                        </Col>
                        <Col lg={3} className='mb-4'>
                            <h5>Do you make Tilak Chandlo?</h5>
                            <p>{profiledata?.satsang?.tilakChandlo}</p>
                        </Col>
                        <Col lg={3} className='mb-4'>
                            <h5>Do you attend Shibir ?</h5>
                            <p>{profiledata?.satsang?.shibir}</p>
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
    )
}

export default Profileright
