import React, { useState, useEffect } from 'react'
import startup from "../../../assets/startup/startup.png"
import { useStartupFilterContext } from '../../../services/StartupFllterContext'
import { useInvestorFilterContext } from '../../../services/InvestorFilterContext'


const Startupbanner = () => {

    const {  setStartupFilter } = useStartupFilterContext();
    const {  setInvestorFilter } = useInvestorFilterContext();

    useEffect(() => {
        localStorage.removeItem('startupfilter')
        localStorage.removeItem('startupdata')
        setStartupFilter({
            business_type: '',
            industry: '',
            startup_stage: '',
            revenue_model: '',
            minimum_investment: '',
            maximum_investment: ''
        })

        localStorage.removeItem('investorfilter')
        localStorage.removeItem('investordata')
        setInvestorFilter({
            country: '',
            state: '',
            city: '',
            yearofexperience: '',
            minimum_investment: '',
            maximum_investment: ''
        })


    }, [])

    return (
        <div>
            <div className="container-fluid" style={{ padding: 0 }}>
                <div className="image-container">
                    <img src={startup} className="w-100" alt=""/>
                    <div className="overlay12">
                        <div className="overlaycontentnt starup">
                            <h3>Enter The World Of An Innovative Future To Start Your Start-
                                Up Journey.</h3>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Startupbanner