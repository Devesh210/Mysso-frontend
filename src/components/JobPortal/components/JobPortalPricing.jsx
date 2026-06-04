import React, { useState, useEffect } from 'react'

import borderimg from '../../../assets/border.svg'

import { Col, Container, Row } from 'react-bootstrap'

import API_URL from '../../../../config'
import axios from 'axios'
import { useSelector } from 'react-redux'

const JobPortalPricing = () => {

    const [plandetails, setPlandetails] = useState([]);
    const { jobuser } = useSelector(state => state.auth)

    useEffect(() => {
        getPlanDetails()
    }, [])
    const getPlanDetails = async () => {
        try {
            let response = await axios.get(`${API_URL}/api/jobportal/plan`)
            setPlandetails(response.data.data)
        } catch (error) {
            // console.log(error);
            setPlandetails([])
        }
    }

    function loadScript(src) {
        return new Promise((resolve) => {
            const script = document.createElement('script')
            script.src = src
            script.onload = () => {
                resolve(true)
            }
            script.onerror = () => {
                resolve(false)
            }
            document.body.appendChild(script)
        })
    }

    const subscribeNow = async (plan) => {
        // console.log(plan);
        // console.log(plan._id);
        // console.log(plan.price);
        const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')
        if (!res) {
            alert('Razropay failed to load!!')
            return
        }
        try {
            const orderResponse = await axios.post(`${API_URL}/api/createOrder`, { amount: plan?.price });
            if (!orderResponse) {
                alert("Server error. Are you online?");
                return;
            }

            const { id: order_id, amount, currency } = orderResponse.data.data;
            if (!order_id || !amount || !currency) {
                alert("Invalid order data");
                return;
            }

            const options = {
                key: '',
                key_secret: "",
                amount: amount,
                currency: currency,
                name: 'MySSO.org',
                description: `Job Portal Plan Subscription<br>
                  ${plan.name} - INR ${plan.price} / 3 months`,
                order_id: order_id,
                handler: async function (response) {
                    // console.log(response);
                    const paymentid = response.razorpay_payment_id;

                    let serverData = {
                        plan: plan,
                        paymentId: paymentid,
                        orderId: response.razorpay_order_id,
                        signature: response.razorpay_signature,
                    };

                    // Verify payment (implement this in the backend)
                    await axios.post(
                        `${API_URL}/api/jobportal/subscription`,
                        serverData,
                        {
                            headers: {
                                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                                'Content-Type': 'application/json'
                            }
                        }
                    ).then((res) => {
                        // console.log(res)
                        swal({
                            title: "Payment Successful",
                            text: "Your payment has been successfully Completed.",
                            icon: "success",
                        }).then(async () => {
                            const invoiceUrl = `${API_URL}/api/invoice/${paymentid}`;
                            // console.log("invoiceUrl", invoiceUrl);
                            // window.location.href = '/Profile';
                        });
                    }).catch(err => {
                        // console.log(err)
                        alert("Failed to complete the transaction, please reach help & support")
                    })

                },
                prefill: {
                    name: `${jobuser?.first_name} ${jobuser?.last_name}`,
                    email: `${jobuser?.email}`,
                    contact: `${jobuser?.phone_number}`
                },
                notes: {
                    address: 'Your address'
                },
                theme: {
                    color: '#F37254'
                }
            };

            // console.log("options", options);

            const rzp1 = new window.Razorpay(options);
            rzp1.open();
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <div>
            <div className='membership-section'>
                <Container fluid>
                    <div className='membership'>
                        <h3>Our <span>Membership Plan</span> <img className='membershipimg' src={borderimg} /></h3>
                    </div>
                    <section className='memberplanboxx'>
                        <div className="container">
                            <div className="row">

                                {plandetails?.map((plan, index) => (
                                    <div className="col-md-6 col-lg-4">
                                        <div className="card" key={index}>
                                            <div className="card-body">
                                                <div className="plan-name">{plan.name} </div>
                                                <div className="plan-description">
                                                    <div className="plan-price month">
                                                        INR {plan.price}<sub> / <span>{plan.type !== "lifetime" ? plan.month + " mo" : "Lifetime"} </span></sub>
                                                    </div>
                                                    <span style={{ fontSize: '13px' }}>( Applicable Charges & Levied from time to time )</span>
                                                    <hr />
                                                    <ul>
                                                        <li>  {plan.jobPostLimit} Job Ad</li>
                                                    </ul>
                                                    <button className='subnow' onClick={() => subscribeNow(plan)}>Subscribe Now</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                            </div>
                        </div>
                    </section>
                </Container>
            </div>
        </div>

    )
}

export default JobPortalPricing
