import React from 'react'
import start from "../../../assets/startup/star.png"
import investor from "../../../assets/startup/investor.png"
import { useNavigate } from 'react-router-dom'
import API_URL from '../../../../config'
const Startupcards = () => {
    const Navigate = useNavigate();
    const token = localStorage.getItem('token');

    const handlestartupportal = async () => {
        try {
            if (!token) {
                Navigate('/StartupList')
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
            const portalPayload = { portal: "startup" };
    
            await fetch(`${API_URL}/api/lastvisitedportals`, {
                method: 'POST',
                headers,
                body: JSON.stringify(portalPayload),
            })
                .then(response => response.json())
                .then(data => {
                    console.log("Last visited portal response:", data);
                    // Update session storage for the new portal
                    sessionStorage.setItem('portal', "startup");
                    sessionStorage.setItem('starttime', new Date());
                    Navigate('/StartupList')
                })
                .catch(err => {
                    console.error("Error updating last visited portal:", err);
                    // Update session storage for the new portal
                    sessionStorage.setItem('portal', "startup");
                    sessionStorage.setItem('starttime', new Date());
                    Navigate('/StartupList')
                });
        } catch (error) {
            console.error("Error in handlestartupportal:", error);
            Navigate('/StartupList')

        }

        }

        const handleinvestorportal = async () => {
            try {

                if (!token) {
                    Navigate('/InvestorList')
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
                const portalPayload = { portal: "investor" };
        
                await fetch(`${API_URL}/api/lastvisitedportals`, {
                    method: 'POST',
                    headers,
                    body: JSON.stringify(portalPayload),
                })
                    .then(response => response.json())
                    .then(data => {
                        console.log("Last visited portal response:", data);
                        // Update session storage for the new portal
                        sessionStorage.setItem('portal', "investor");
                        sessionStorage.setItem('starttime', new Date());
                        Navigate('/InvestorList')
                    })
                    .catch(err => {
                        console.error("Error updating last visited portal:", err);
                        // Update session storage for the new portal
                        sessionStorage.setItem('portal', "investor");
                        sessionStorage.setItem('starttime', new Date());
                        Navigate('/InvestorList')
                    });
            } catch (error) {
                console.error("Error in handlestartupportal:", error);
                Navigate('/InvestorList')
    
            }
     }




    return (
        <div className='starupvadrssds'>
            <div className='row'>
                <div className='col-lg-5 sasa' onClick={()=>handlestartupportal()}>
                    <img className="w-100" src={start} alt="" />
                    <div className="overlay123" />
                    <h3 className="servicetext">Startup</h3>
                </div>
                <div className='col-lg-5 sasa' onClick={handleinvestorportal}>
                    <img className="w-100" src={investor} alt="" />
                    <div className="overlay123" />
                    <h3 className="servicetext">Investor</h3>
                </div>
            </div>
        </div>
    )
}

export default Startupcards