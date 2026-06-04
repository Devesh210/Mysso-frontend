import React, { useEffect, useState, useRef } from 'react';

import location from "../../../assets/matrimonial/location.svg"
import profile from "../../../assets/matrimonial/searchimg.png"
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
import shortlisted from "../../../assets/shortlisted.svg"
import interested1 from "../../../assets/interested.svg"
import instagram from "../../../assets/matrimonial/instagram.svg"
import instagram1 from "../../../assets/matrimonial/instagram.png"

import { useParams, } from 'react-router-dom';
import API_URL from '../../../../config';
import swal from 'sweetalert';
import { useScreenshot } from 'use-react-screenshot'
import {
    EmailShareButton,
    FacebookShareButton,
    LinkedinShareButton,
    TwitterShareButton,
    WhatsappShareButton,
    EmailIcon,
    FacebookIcon,
    LinkedinIcon,
    TwitterIcon,
    WhatsappIcon,
    XIcon
} from "react-share";

import { Modal } from 'react-bootstrap';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import PdfGenerator from './PdfGenerator';

const Profileleft = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [user, setUser] = useState({});
    const [profiledata, setProfiledata] = useState([])
    const [profileId, setProfileId] = useState(null);
    const [show, setShow] = useState(false);
    const ref = useRef(null)
    const [image, takeScreenshot] = useScreenshot()
    const getImage = () => takeScreenshot(ref.current)

    console.log(getImage)

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    useEffect(() => {
        const url = window.location.href;
        const url1 = url.split("/")[3];
        const url2 = url1.split("?")[1];
        const id = url2.split("=")[1];
        getProfiledata(id)
        checkuser()
    }, [])





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

    const openLink = (url) => {
        if (url) {
            window.location.href = url;
        }
    };

    const handleWhatsappClick = (phoneNumber) => {
        if (!phoneNumber) {
            return;
        }
        const whatsappLink = `https://wa.me/${phoneNumber}`;
        window.open(whatsappLink);
    }

    const shortlist = async () => {
        try {
            console.log("Shortlisted")
            const requestOption = {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
                body: JSON.stringify({ profileId: profiledata._id }),
            };
            await fetch(`${API_URL}/api/shortlistprofile`, requestOption)
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    if (data.status === 200) {
                        swal({
                            text: data.message,
                            icon: "success"
                        });
                        getProfiledata(profiledata._id)
                        checkuser()
                    } else {
                        swal(
                            {
                                text: data.message,
                                icon: "warning"
                            }
                        );
                    }
                })

        } catch (error) {
            console.log(error)
        }
    }

    const interested = async () => {
        try {
            console.log("interested")
            const requestOption = {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
                body: JSON.stringify({ profileId: profiledata._id }),
            };
            await fetch(`${API_URL}/api/likeprofile`, requestOption)
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    if (data.status === 200) {
                        swal({
                            text: data.message,
                            icon: "success"
                        });
                        getProfiledata(profiledata._id)
                        checkuser()

                    } else {
                        swal(
                            {
                                text: data.message,
                                icon: "error"
                            }
                        );
                    }
                });

        } catch (error) {
            console.log(error)
        }
    }

    const checkuser = async () => {
        try {
            const requestOption = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
            };
            await fetch(`${API_URL}/api/userList`, requestOption)
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    if (data.status === 200) {
                        console.log("User is authenticated")
                        console.log(data)
                        setUser(data.data)

                    } else {
                        console.log("User is not authenticated")
                    }
                });
        } catch (error) {
            console.log(error)
        }
    }

    console.log(user?.matrimony_shortlisted_user?.includes(profiledata._id))
    console.log(profiledata._id)

    const handleshare = () => {
        console.log("Share")
        setShow(true)
    }

    const generatePdf = async () => {
        const input = document.getElementById('pdfContent');
        const canvas = await html2canvas(input);
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('download.pdf');
    };

    const handlesharedata = (id) => {
        setProfileId(id);
        // Open the PdfGenerator component with the profileId
        // You can trigger a modal or simply call a function to generate the PDF
        console.log("Share", id);
        <PdfGenerator profileId={id} />
    }





    return (
        <div >
            <div className='profileleftsec' id='pdfContent' ref={ref}>
                <img className='prr' src={`${API_URL}/uploads/profile_pic/${profiledata?.profilePic?.map((val) => val.filename)}`} alt='profile' />
                {profiledata && (
                    <div className='profilesectioncontent'>
                        <h3 className='profilename'>{`${profiledata.firstName} ${profiledata.lastName}`}</h3>
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
                        </div>
                        <h3 className='currentdes'>MARRIED OR NOT?</h3>
                        <p className='nevermarried'>{profiledata?.marital_status_details?.map((val) => val?.type)}</p>
                        <h3 className='breifaction'>BRIEF ACTION</h3>
                        <div className='bree'>
                            {user?.matrimony_shortlisted_user?.includes(profiledata?._id) === true ?
                                <img className='bb' src={shortlisted} alt='profile' />
                                :
                                <img className='bb' src={bb} alt='profile' onClick={shortlist} />
                            }
                            {user?.matrimony_liked_user?.includes(profiledata?._id) === true ?
                                <img className='aa' src={interested1} alt='profile' />
                                :
                                <img className='aa' src={aa} alt='profile' onClick={interested} />
                            }
                            <img className='dd' src={dd} alt='profile'
                                onClick={() => handlesharedata(profiledata?._id)}
                            />

                            {/* <img className='dd' src={dd} alt='profile' onClick={() => handlesharedata(profiledata?._id)} /> */}
                            {/* {profileId && <PdfGenerator profileId={profileId} />} */}
                            {/* <img className='cc' src={cc} alt='profile' /> */}
                            {/* <img className='ee' src={ee} alt='profile' /> */}
                        </div>
                        <h3 className='matchingno'>Your Matching Number</h3>
                        <div className='matchingno'>
                            <img src={thirty} alt='profile' />
                            <span>23</span>
                        </div>
                    </div>
                )}

                {/* <div>
                    <div>
                        <button style={{ marginBottom: '10px' }} onClick={takeScreenshot1}>
                            Take screenshot
                        </button>
                    </div>
                    <img width={width} src={image} alt={'Screenshot'} />
                </div> */}


            </div>
            <Modal show={show} onHide={() => setShow(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Share Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='d-flex justify-content-around'>
                        <WhatsappShareButton url={window.location.href} title={"Check out this profile!"}>
                            <WhatsappIcon size={32} round={true} />
                        </WhatsappShareButton>
                        <FacebookShareButton url={window.location.href} quote={"Check out this profile!"}>
                            <FacebookIcon size={32} round={true} />
                        </FacebookShareButton>
                        <button onClick={() => openLink(`https://www.instagram.com/`)} style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}>
                            <img src={instagram1} alt='Instagram' />
                        </button>
                        {/* <TwitterShareButton url={window.location.href} title={"Check out this profile!"}>
                            <XIcon size={32} round={true} />
                        </TwitterShareButton> */}
                        {/* <LinkedinShareButton url={window.location.href} title={"Check out this profile!"}>
                            <LinkedinIcon size={32} round={true} />
                        </LinkedinShareButton> */}

                        <EmailShareButton url={window.location.href} subject={"Check out this profile!"} body={"Check out this profile!"}>
                            <EmailIcon size={32} round={true} />
                        </EmailShareButton>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default Profileleft
