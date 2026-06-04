import React, { useEffect, useState, useRef } from 'react';
import Businesslocation from './Businesslocation'
import Businessgallery from './Businessgallery'
import Businessprofile from './Businessprofile'
import Similarcompanies from './Similarcompanies'
import { useNavigate } from 'react-router-dom';
import API_URL from '../../../../config';
import Professionallocation from './Professionallocation';
import Professionalprofile from './Professionalprofile';
import ProfessionalSimilarcompanies from './ProfessionalSimilarcompanies';
import { RotatingLines } from 'react-loader-spinner'


const Professionaldetailpage = () => {
    const Navigate = useNavigate();
    const [details, setdetails] = useState([]);
    const [category, setCategory] = useState('')
    const [country, setCountry] = useState('')
    const [state, setState] = useState('')
    const [city, setCity] = useState('')
    const [businesstype, setBusinesstype] = useState('')
    const [similarbusiness, setSimilarbusiness] = useState([]);
    const [id, setId] = useState('');

    const [loading, setLoading] = useState(false);
    const [similarloading, setSimilarloading] = useState(false);



    useEffect(() => {
        if (!localStorage.getItem('token')) {
            swal({
                title: "Your Session Has Expired",
                text: "Please log in again to continue.",
                icon: "warning",
            }).then(() => {
                window.location.href = '/login';
            });
        } else {
            const url = window.location.href;
            const urlParams = new URLSearchParams(url.split('?')[1]);
            const idParam = urlParams.get('id');
            console.log("id?>>>>>>>>>>>>>>>>>>>>>>>>>>>", idParam);
            setId(idParam);
            getdetailsbyid(idParam)
        }
    }, [])

    useEffect(() => {
        if (id) {
            getdetailsbyid(id);
        }
    }, [id]);

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            swal({
                title: "Your Session Has Expired",
                text: "Please log in again to continue.",
                icon: "warning",
            }).then(() => {
                window.location.href = '/login';
            });
        } else {
            getsimilarbusinessdata()
        }
    }, [details])

    const getdetailsbyid = async (id) => {
        try {
            setLoading(true)
            const requestOption = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            };
            await fetch(`${API_URL}/api/getNetworkById?id=${id}`, requestOption)
                .then((res) => res.json())
                .then((data) => {
                    console.log(data)
                    setdetails(data?.data)
                    setCategory(data?.data?.map(val => val?.networking_type))
                    setBusinesstype(data?.data?.map(val => val?.businesstype))
                    setCountry(data?.data?.map(val => val?.company_country))
                    setState(data?.data?.map(val => val?.company_state))
                    setCity(data?.data?.map(val => val?.company_city))
                    setLoading(false)
                })
        } catch (error) {
            console.log(error)
        }
    }
    console.log("details", details)

    const getsimilarbusinessdata = async () => {
        try {
            setSimilarloading(true)
            const requestOption = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                },
            };
            await fetch(`${API_URL}/api/getSimilarNetworkList?id=${id}&category=${category}&businesstype=${businesstype}&country=${country}&state=${state}&city=${city}`, requestOption)
                .then((res) => res.json())
                .then((data) => {
                    console.log(data)
                    setSimilarbusiness(data.data)
                    setSimilarloading(false)

                })
        } catch (error) {
            console.log(error)
        }
    }

    console.log("details??????????", details)


    return (
        <div>
            {loading ? (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
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
            <Professionallocation data={details} />
            <Professionalprofile data={details} />
                </>
            )}
            {/* <Businessgallery/> */}
            {similarloading ? (
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
                <ProfessionalSimilarcompanies data={similarbusiness} />
                </>
            )}
        </div>
    )
}

export default Professionaldetailpage