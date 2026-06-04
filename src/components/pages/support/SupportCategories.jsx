import Slider from "react-slick";
import borderimg from '../../../assets/border.svg';
import ash1 from "../../../assets/support/health.jpg"
import ash2 from "../../../assets/support/senior.jpeg"
import ash3 from "../../../assets/support/education.jpeg"
import { useNavigate } from "react-router-dom";
import API_URL from "../../../../config";
const SupportCategories = () => {

    const navigate = useNavigate();
    const token = localStorage.getItem('token');

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

    const handleeducationportal = async () => {
        try {

            if (!token) {
                navigate('/Educationalsupport');
                return;
            }
    
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
            const portalPayload = { portal: "expert" };
    
            await fetch(`${API_URL}/api/lastvisitedportals`, {
                method: 'POST',
                headers,
                body: JSON.stringify(portalPayload),
            })
                .then(response => response.json())
                .then(data => {
                    console.log("Last visited portal response:", data);
                    // Update session storage for the new portal
                    sessionStorage.setItem('portal', "expert");
                    sessionStorage.setItem('starttime', new Date());
                    navigate('/Educationalsupport');

                })
                .catch(err => {
                    console.error("Error updating last visited portal:", err);
                    // Update session storage for the new portal
                    sessionStorage.setItem('portal', "expert");
                    sessionStorage.setItem('starttime', new Date());
                    navigate('/Educationalsupport');

                });
        } catch (error) {
            console.error("Error in handlestartupportal:", error);
            navigate('/Educationalsupport');


        }
    }

        const handlemedicalportal = async () => {
            try {

                if (!token) {
                    navigate('/Medicalsupport');
                    return;
                }
        
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
                const portalPayload = { portal: "hospital" };
        
                await fetch(`${API_URL}/api/lastvisitedportals`, {
                    method: 'POST',
                    headers,
                    body: JSON.stringify(portalPayload),
                })
                    .then(response => response.json())
                    .then(data => {
                        console.log("Last visited portal response:", data);
                        // Update session storage for the new portal
                        sessionStorage.setItem('portal', "hospital");
                        sessionStorage.setItem('starttime', new Date());
                        navigate('/Medicalsupport');
    
                    })
                    .catch(err => {
                        console.error("Error updating last visited portal:", err);
                        // Update session storage for the new portal
                        sessionStorage.setItem('portal', "hospital");
                        sessionStorage.setItem('starttime', new Date());
                        navigate('/Medicalsupport');
    
                    });
            } catch (error) {
                console.error("Error in handlestartupportal:", error);
                navigate('/Medicalsupport');
            }
        }


            const handleseniorcitizenportal = async () => {
                try {

                if (!token) {
                    navigate('/Seniorcitizen');
                    return;
                }
        
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
                const portalPayload = { portal: "seniorcitizenngo" };
        
                await fetch(`${API_URL}/api/lastvisitedportals`, {
                    method: 'POST',
                    headers,
                    body: JSON.stringify(portalPayload),
                })
                    .then(response => response.json())
                    .then(data => {
                        console.log("Last visited portal response:", data);
                        // Update session storage for the new portal
                        sessionStorage.setItem('portal', "seniorcitizenngo");
                        sessionStorage.setItem('starttime', new Date());
                        navigate('/Seniorcitizen');
    
                    })
                    .catch(err => {
                        console.error("Error updating last visited portal:", err);
                        // Update session storage for the new portal
                        sessionStorage.setItem('portal', "seniorcitizenngo");
                        sessionStorage.setItem('starttime', new Date());
                        navigate('/Seniorcitizen');
    
                    });
            } catch (error) {
                console.error("Error in handlestartupportal:", error);
                navigate('/Seniorcitizen');
            }
        }
    





    return (
        <>
            <div className='Support Categories'>
                <h3 className='startuabout mb-5'>Our Support  <span>Categories</span> <img className='imgsabouts' src={borderimg} alt="border" /></h3>
                <Slider className="sartuco" {...settings1}>
                    <div>
                        <div
                            className="slider-item"
                            onClick={handleeducationportal}
                        >
                            <img className="w-100" src={ash3} alt="" />
                            <div className="overlay12344" />
                            <h3 className="servicetextsss" >Educational Support</h3>
                        </div>
                    </div>
                    <div>
                        <div
                            className="slider-item"
                            onClick={handlemedicalportal}
                        >
                            <img className="w-100" src={ash1} alt="" />
                            <div className="overlay12344" />
                            <h3 className="servicetextsss"  >Health First</h3>
                        </div>
                    </div>
                    <div>
                        <div
                            className="slider-item"
                            onClick={handleseniorcitizenportal}
                        >
                            <img className="w-100" src={ash2} alt="" />
                            <div className="overlay12344"  />
                            <h3 className="servicetextsss">Senior Citizen Welfare</h3>
                        </div>
                    </div>
                </Slider>
            </div>
        </>
    )
}

export default SupportCategories