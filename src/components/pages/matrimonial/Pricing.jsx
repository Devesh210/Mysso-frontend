import React, { useState, useEffect } from 'react'

import borderimg from '../../../assets/border.svg'

import { Col, Container, Row } from 'react-bootstrap'

import API_URL from '../../../../config'
import axios from 'axios'

const Pricing = () => {

    const [plandetails, setPlandetails] = useState([]);
    const [userdata, setUserdata] = useState([]);
    const [istoken, setIstoken] = useState(false)

    const userdetails = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        getPlanDetails()
        if (localStorage.getItem('token')) {
            getUserData();
            setIstoken(true)
        }
    }, [])

    console.log(localStorage.getItem('token'))

    const getPlanDetails = () => {
        try {
            const requestOptions = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            };
            fetch(`${API_URL}/api/planList`, requestOptions)
                .then(response => response.json())
                .then(data => {
                    // console.log(data.data);
                    setPlandetails(data.data);
                });
        } catch (error) {
            console.log(error);
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
        console.log(plan);
        console.log(plan._id);
        console.log(plan.price);
        console.log("istoken>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", istoken)
        try {

            if (!istoken) {
                await swal({
                    text: 'Please login for plan subscription',
                    icon: "warning",
                });
                return;
            }
            if (!userdata?.isMatrimonyVerified) {
                await swal({
                    text: 'Please wait for your profile to be verified for plan subscription',
                    icon: "warning",
                });
                return;
            }

            
            const orderResponse = await axios.post(`${API_URL}/api/createOrder`, { amount: plan?.price });
            // const orderResponse = await axios.post(`${API_URL}/api/createOrder`, { amount: 1 });
            console.log("plan?>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", plan);
            console.log("orderResponse", orderResponse);
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
                key: 'rzp_live_B42MSpuNtemNis',
                key_secret: "RxY6FuGKRhP8HFAh0c02ZyVg",
                // key: 'rzp_test_0QX2bD80rXxLur',
                // key_secret: "C1fE0DcF36noMY60LL6KG0SN",
                amount: amount,
                currency: currency,
                name: 'MySSO.org',
                // description: `Matrimony Plan Subscription<br>  
                // ${plan.name} - INR ${plan.price} / 3 months<br>  
                // ${plan.content.map(detail => `• ${detail}`).join('<br>') }`,
                description: `Matrimony Plan Subscription<br>
                  ${plan.name} - INR ${plan.price} / 3 months`,
                order_id: order_id,
                handler: async function (response) {
                    console.log(response);
                    const paymentid = response.razorpay_payment_id;

                    let serverData = {
                        plan: plan,
                        paymentId: paymentid,
                        orderId: response.razorpay_order_id,
                        signature: response.razorpay_signature,
                    };

                    // Verify payment (implement this in the backend)
                    await axios.post(
                        `${API_URL}/api/verifyPayment`,
                        serverData,
                        {
                            headers: {
                                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                                'Content-Type': 'application/json'
                            }
                        }
                    ).then((res) => {
                        console.log(res)
                        swal({
                            title: "Payment Successful",
                            text: "Your payment has been successfully Completed.",
                            icon: "success",
                        }).then(async () => {
                            const invoiceUrl = `${API_URL}/api/invoice/${paymentid}`;
                            console.log("invoiceUrl", invoiceUrl);
                            // downloadInvoice(invoiceUrl);


                            // const raw = "";

                            // const requestOptions = {
                            //     responseType: 'blob',
                            //     method: "GET",
                            //     headers: {
                            //         username: "rzp_test_0QX2bD80rXxLur",
                            //         password: "C1fE0DcF36noMY60LL6KG0SN",
                            //         "Content-Type": "application/json"

                            //     },
                            //     body: raw,
                            //     redirect: "follow"
                            // };

                            // await fetch(invoiceUrl, requestOptions)
                            //     .then((response) => response.text())
                            //     .then((result) => console.log("result",result))
                            //     .catch((error) => console.error(error));


                            // downloadInvoice(res?.data?.data);
                            window.location.href = '/Profile';
                        });
                    }).catch(err => {
                        console.log(err)
                        alert("Failed to complete the transaction, please reach help & support")
                    })

                },
                prefill: {
                    name: `${userdetails?.first_name} ${userdetails?.last_name}`,
                    email: `${userdetails?.email}`,
                    contact: `${userdetails?.phone}`
                },
                notes: {
                    address: 'Your address'
                },
                theme: {
                    color: '#F37254'
                }
            };

            console.log("options", options);

            const rzp1 = new window.Razorpay(options);
            rzp1.open();

        } catch (error) {
            console.error(error);
        }
    }


    // const downloadInvoice = (url) => {
    //     console.log("url>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>",url);
    //     const link = document.createElement('a');
    //     link.href = url;
    //     link.setAttribute('download', 'invoice.pdf'); // Change the file name as needed
    //     document.body.appendChild(link);
    //     link.click();
    //     document.body.removeChild(link);
    // };

    const downloadInvoice = (invoiceUrl) => {
        console.log("invoiceUrl", invoiceUrl);
        axios.get(invoiceUrl, { responseType: 'blob' })
            .then(response => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'invoice.pdf');
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            })
            .catch(error => {
                console.error('Error downloading invoice:', error);
                swal({
                    title: "Download Error",
                    text: "Failed to download the invoice.",
                    icon: "error",
                });
            });
    };



    const getUserData = async () => {
        try {
            const requestOptions = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            };

            fetch(`${API_URL}/api/getuserdetail`, requestOptions)
                .then(response => response.json())
                .then(data => {
                    console.log(data.data);
                    if (data.status == 200) {
                        setUserdata(data?.data[0]);
                    }
                }
                );
        }
        catch (err) {
            console.error(err.message);
        }
    }

    console.log('logindetails', userdata);


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
                                <div className="col-md-6 col-lg-4">
                                    {plandetails?.map((plan, index) => (
                                        plan.position == 1 &&
                                        <div className="card">
                                            <div className="card-body">
                                                <div className="plan-name">{plan.name} </div>
                                                <div className="plan-description">
                                                    <div className="plan-price month">
                                                        INR {plan.price}<sub> / <span>3 months</span></sub>
                                                    </div>
                                                    {/* <h5 className='planmembershipp'>{plan.name}</h5> */}
                                                    <span style={{ fontSize: '13px' }}>( Applicable Charges & Levied from time to time )</span>
                                                    <hr />
                                                    <ul>
                                                        {/* <li>Match, Chat & Mee</li>
                                                    <li>5 Super Likes a week</li>
                                                    <li>Hide Advertisements</li>
                                                    <li className='noneed'>1 Free Boost a month</li>
                                                    <li className='noneed'>New Top Picks every day</li>
                                                    <li className='noneed'>Message before Matching</li>
                                                    <li className='noneed'>Prioritised Likese</li>
                                                    <li className='noneed'>See the Likes you’ve sent in the last 7 days,</li> */}
                                                        {plan.content.map((detail, index) => (
                                                            <li>{detail}</li>
                                                        ))}
                                                    </ul>
                                                    <button className='subnow' onClick={() => subscribeNow(plan)}>Subscribe Now</button>
                                                    {/* <button className='subnow' onClick={() => initiatePayment(plan)}>Subscribe Now</button> */}

                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="col-md-6 col-lg-4 second">
                                    {plandetails?.map((plan, index) => (
                                        plan.position == 2 &&
                                        <div className="card">
                                            <div className="card-body">
                                                <h3 className='recommended'>RECOMMENDED</h3>
                                                <div className="plan-name">{plan.name} </div>
                                                <div className="plan-description">
                                                    <div className="plan-price month">
                                                        INR {plan.price}<sub> / <span>3 months</span></sub>
                                                    </div>
                                                    {/* <h5 className='planmembershipp'>{plan.name}</h5> */}
                                                    <span style={{ fontSize: '13px' }}>( Applicable Charges & Levied from time to time )</span>
                                                    <hr />
                                                    <ul>
                                                        {/* <li>Match, Chat & Mee</li>
                                                    <li>5 Super Likes a week</li>
                                                    <li>Hide Advertisements</li>
                                                    <li>1 Free Boost a month</li>
                                                    <li>New Top Picks every day</li>
                                                    <li>Message before Matching</li>
                                                    <li>Prioritised Likese</li>
                                                    <li>See the Likes you’ve sent in the last 7 days,</li>
                                                    <li>And many more.</li> */}
                                                        {plan.content.map((detail, index) => (
                                                            <li>{detail}</li>
                                                        ))}
                                                    </ul>
                                                    <button className='subnow' onClick={() => subscribeNow(plan)}>Subscribe Now</button>
                                                    {/* <button className='subnow'>Subscribe Now</button> */}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="col-md-6 col-lg-4">
                                    {plandetails?.map((plan, index) => (
                                        plan.position == 3 &&
                                        <div className="card">
                                            <div className="card-body">
                                                <div className="plan-name">{plan.name}</div>
                                                <div className="plan-description">
                                                    <div className="plan-price month">
                                                        INR {plan.price}<sub> / <span>3 months</span></sub>
                                                    </div>
                                                    {/* <h5 className='planmembershipp'>{plan.name}</h5> */}
                                                    <span style={{ fontSize: '13px' }}>( Applicable Charges & Levied from time to time )</span>
                                                    <hr />
                                                    <ul>
                                                        {/* <li>Match, Chat & Mee</li>
                                                    <li>5 Super Likes a week</li>
                                                    <li>Hide Advertisements</li>
                                                    <li className='noneed'>1 Free Boost a month</li>
                                                    <li className='noneed'>New Top Picks every day</li>
                                                    <li className='noneed'>Message before Matching</li>
                                                    <li className='noneed'>Prioritised Likese</li>
                                                    <li className='noneed'>See the Likes you’ve sent in the last 7 days,</li> */}
                                                        {plan.content.map((detail, index) => (
                                                            <li>{detail}</li>
                                                        ))}
                                                    </ul>
                                                    <button className='subnow' onClick={() => subscribeNow(plan)}>Subscribe Now</button>
                                                    {/* <button className='subnow'>Subscribe Now</button> */}

                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        {/* ./container*/}
                    </section>
                </Container>
            </div>
        </div>
    )
}

export default Pricing
