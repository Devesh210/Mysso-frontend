import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
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
import aa from "../../../assets/matrimonial/socials/11.svg"
import bb from "../../../assets/matrimonial/socials/22.svg"
import cc from "../../../assets/matrimonial/socials/33.svg"
import dd from "../../../assets/matrimonial/socials/44.svg"
import ee from "../../../assets/matrimonial/socials/55.svg"
import one from "../../../assets/matrimonial/socials/1.svg"
import two from "../../../assets/matrimonial/socials/2.svg"
import three from "../../../assets/matrimonial/socials/3.svg"
import four from "../../../assets/matrimonial/socials/4.svg"
import five from "../../../assets/matrimonial/socials/5.svg"
import six from "../../../assets/matrimonial/socials/6.svg"
import seven from "../../../assets/matrimonial/socials/7.svg"
import height from "../../../assets/matrimonial/socials/height.svg"
import width from "../../../assets/matrimonial/socials/width.svg"
import thirty from "../../../assets/matrimonial/socials/thirty.svg"
import Banner from '../matrimonialsearch/Banner';
import location from "../../../assets/matrimonial/location.svg"
import API_URL from '../../../../config';


const MyMatrimonyprofile = () => {

    const Navigate = useNavigate();

    useEffect(() => {
        const url = window.location.href;
        const url1 = url.split("/")[3];
        const url2 = url1.split("?")[1];
        const id = url2.split("=")[1];
        getProfiledata(id)
    }, [])


    const [profiledata, setProfiledata] = useState([])
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };


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

    const renderLastCareerItem = () => {
        if (profiledata?.career?.length > 0) {
            const lastCareerItem = profiledata?.career[profiledata?.career?.length - 1];
            return (
                <div>
                    <p>{lastCareerItem.occupation}</p>
                    {/* <p>Company: {lastCareerItem.company}</p>
                    <p>Income: {lastCareerItem.income}</p> */}
                </div>
            );
        }
        return <p>No career data available.</p>;
    };

    const renderAboutMe = () => {
        const aboutMeText = profiledata?.infoAboutMe || "";
        const maxLength = 100; // The max length for the preview text
        if (aboutMeText.length > maxLength) {
            return (
                <p className='aboutprofile'>
                    {isExpanded ? aboutMeText : `${aboutMeText.substring(0, maxLength)}...`}
                    <a onClick={toggleExpand} style={{ cursor: 'pointer', color: 'blue' }}>
                        {isExpanded ? ' Read Less' : ' Read More'}
                    </a>
                </p>
            );
        }
        return <p className='aboutprofile'>{aboutMeText}</p>;
    };




    return (

        <>
            <Banner />
            <Container fluid className='matrimonial-profile pt-3' >
                <Row style={{ justifyContent: 'end' }}>
                    <Button className='addbtn' style={{ width: 'auto', marginBottom: '20px' }} onClick={() => Navigate(`/EditProfile?id=${profiledata?._id}`)}>Edit Profile </Button>
                    <Button className='addbtn' style={{ width: 'auto', marginBottom: '20px' }} onClick={() => Navigate(`/profile`)}>Back To Profile </Button>
                </Row>
                <Row>
                    <Col lg={3}>
                        <div>
                            <div className='profileleftsec'>
                                <img className='prr' src={`${API_URL}/uploads/profile_pic/${profiledata?.profilePic?.map((val) => val.filename)}`} alt='profile' />
                                {profiledata && (
                                    <div className='profilesectioncontent'>
                                        <h3 className='profilename'>{`${profiledata.firstName} ${profiledata.lastName}`}</h3>
                                        <h5 className='profileemail'>Email: {`${profiledata.email}`}</h5>
                                        <h6 className='profilephone'>Mobile No : {`${profiledata.phoneNumber}`}</h6>
                                        <h4 className='profilelocation'><img src={location} alt='profile' />{`${profiledata?.present_city_details?.map((val) => val.city_name)} ${profiledata?.present_state_details?.map((val) => val.state_name)} ${profiledata?.present_country_details?.map((val) => val.country_name)}`}</h4>
                                        <div className='profilesocials'>
                                            <img src={one} alt='profile' onClick={() => openLink(profiledata?.socialMedia?.linkedinLink)} />
                                            <img src={two} alt='profile' onClick={() => openLink(profiledata?.socialMedia?.instagramLink)} />
                                            <img src={three} alt='profile' onClick={() => handleWhatsappClick(profiledata?.socialMedia?.whatsappNumber)} />
                                            {/* <img src={four} alt='profile' />
                        <img src={five} alt='profile' /> */}
                                            <img src={six} alt='profile' onClick={() => openLink(profiledata?.socialMedia?.facebookLink)} />
                                            {/* <img src={seven} alt='profile' /> */}
                                        </div>
                                        <h3 className='aboutprofile'>ABOUT ME</h3>
                                        <p className='aboutprofile'>
                                            {/* {isExpanded
                            ? 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s...'
                            : 'Lorem Ipsum is simply Lorem Ipsum has been the industry\'s standard dummy text...'}
                        <a onClick={toggleExpand}>
                            {isExpanded ? 'Read Less' : 'Read More'}
                        </a> */}
                                            {renderAboutMe()}

                                        </p>
                                        <h3 className='currentdes'>CURRENT DESIGNATION</h3>
                                        <p className='currentdes'>{renderLastCareerItem()}</p>
                                        <h3 className='heightwidth'>HEIGHT & WEIGHT</h3>
                                        <div className='heightwidth1 d-flex'>
                                            <div className='width'>
                                                <img src={height} alt='profile' /><br />{profiledata?.weight} Kg
                                            </div>
                                            <div className='width'>
                                                <img src={width} alt='profile' /><br />{profiledata?.height} Cm
                                            </div>
                                            <div className='width'>
                                                    <img src={width} alt='profile' /><br />{profiledata?.heightInFeet} Feet {profiledata?.heightInInch} Inch
                                                </div>
                                        </div>
                                        <h3 className='currentdes'>MARRIED OR NOT?</h3>
                                        <p className='nevermarried'>{profiledata?.marital_status_details?.map((val) => val?.type)}</p>
                                        {/* <h3 className='breifaction'>BRIEF ACTION</h3>
                            <div className='bree'>
                                <img className='bb' src={bb} alt='profile' onClick={shortlist} />
                                <img className='aa' src={aa} alt='profile' onClick={interested} />
                                <img className='dd' src={dd} alt='profile' />
                            </div> */}
                                        {/* <h3 className='matchingno'>Your Matching Number</h3>
                            <div className='matchingno'>
                                <img src={thirty} alt='profile' />
                                <span>23</span>
                            </div> */}
                                    </div>
                                )}
                            </div>
                        </div>
                    </Col>
                    <Col lg={9}>

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
                                            {/* <p>{profiledata?.caste_details?.map((val) => val?.type)}</p> */}
                                            <p>{profiledata?.caste}</p>

                                        </Col>
                                        <Col lg={3} className='mb-4'>
                                            <h5>Handicap</h5>
                                            {/* <p>{profiledata?.caste_details?.map((val) => val?.type)}</p> */}
                                            <p>{profiledata?.handicap == true ? 'Yes' : 'No'}</p>

                                        </Col>
                                        {profiledata?.handicap == true ?
                                        <Col lg={3} className='mb-4'>
                                            <h5>specification of impairments or disabilities</h5>
                                            {/* <p>{profiledata?.caste_details?.map((val) => val?.type)}</p> */}
                                            <p>{profiledata?.handicapDetails}</p>

                                        </Col>
                                        :
                                        null
                                            }
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
                                {profiledata?.career?.map((val,index) => (
                                    <div className='descr-content' key={index}>
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
                                                <h5>Annual Income (INR)</h5>
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
                                            <p>{profiledata?.mother_tongue_details?.map((val) => val.type)}</p>
                                        </Col>
                                        <Col lg={9} className='mb-4'>
                                            <h5>Known Languages</h5>
                                            {/* <p>{profiledata?.languages_known_details?.map((val) => val.language).join(', ')}</p> */}
                                            <p>{profiledata?.languagesKnown}</p>
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
                                            <p>{profiledata?.astroDetails?.timeOfBirth}</p>
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
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default MyMatrimonyprofile
