import React, { useEffect, useState } from 'react'
import logo from "../assets/logo.svg"
import banner5 from "../assets/banner/banner6.jpg"
import banner from "../assets/swamii.png"
import { Link, useNavigate } from 'react-router-dom'
import API_URL from '../../config'
import { Col, Container, Row } from 'react-bootstrap'
import { setUser } from '../redux/authSlice'
import { useDispatch } from 'react-redux'

const Login = () => {
    const dispatch = useDispatch()
    const Navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(prevState => !prevState);
    };

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);




    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            if (!email) {
                swal({ text: 'Please enter email', icon: 'warning' });
                return;
            }
            else if (!password) {
                swal({ text: 'Please enter password', icon: 'warning' });
                return;
            }
            setLoading(true);
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            };
            await fetch(`${API_URL}/api/login`, requestOptions)
                .then(response => response.json())
                .then(data => {
                    if (data.status === 200) {
                        console.log(data);
                        dispatch(setUser(data.data.token));
                        localStorage.setItem('token', data.data.token);
                        localStorage.setItem('user', JSON.stringify(data.data.user));
                        swal({ text: data.message, icon: 'success' });
                        Navigate('/');
                        setLoading(false);
                    } else {
                        swal({ text: data.message, icon: 'error' });
                        setLoading(false);

                    }
                }
                );
        } catch (error) {
            console.error('There was an error!', error);
        }
    }

    useEffect(() => {
        window.googleTranslateElementInit = function () {
            new window.google.translate.TranslateElement({
                pageLanguage: 'en',
                includedLanguages: 'en,hi,mr,gu', // English, Hindi, Marathi
                layout: google.translate.TranslateElement.InlineLayout.SIMPLE
            }, 'google_translate_element');
        }
    }, []);

    useEffect(() => {
        const style = document.createElement('style');
        style.textContent = `
            .goog-te-combo { display: block !important; }
            .skiptranslate iframe { display: none !important; }
            body { top: 0 !important; }
        `;
        document.head.appendChild(style);

        return () => {
            document.head.removeChild(style);
        };
    }, []);

    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <div>
            <div className='topheader'>
                <Container fluid style={{ paddingLeft: '30px', paddingRight: '30px' }}>
                    <Row>
                        <Col lg={4}>
                            <h3>Swaminarayan Satsangis organisation</h3>
                        </Col>
                        <Col lg={8}>
                            <i className="fa fa-envelope" aria-hidden="true"></i>Email: info@shreesso.org
                            <i className="fa fa-phone" aria-hidden="true"></i>Call us: +91 9321131170
                            <i className="fa fa-globe" aria-hidden="true"></i><div id="google_translate_element"></div>
                            {/* <i className="fa fa-globe" aria-hidden="true"></i> */}
                            {/* <select name="cars" id="cars">
                                <option value="volvo">English</option>
                                <option value="saab">Gujrati</option>
                            </select> */}
                        </Col>
                    </Row>
                </Container>
            </div>
            <div className="login" style={{ background: "#F7EAED" }}>
                <div className="row" style={{ alignItems: 'center' }}>
                    <div className="col-lg-6" style={{ paddingRight: 0, paddingLeft: 0 }}>
                        <img
                            // src={pana}
                            src={banner}
                            style={{ width: "100%", padding: '100px', marginLeft: 'auto', marginRight: 'auto', display: 'block' }}
                        />
                    </div>
                    <div className="col-lg-6" style={{ paddingRight: 30, paddingLeft: 30 }}>
                        <div className="login_form">
                            <div className="login_form1">
                                <img src={logo} alt="" />
                                <h2 className='mb-5'>Welcome Back! please enter your details</h2>
                                <form onSubmit={handleLogin}>
                                    <div
                                        className="col-lg-12"
                                        style={{ display: "block", margin: "auto" }}
                                    >
                                        <label htmlFor="firstName" id="labell">
                                            Enter Email Id Or Mobile Number Or Member ID
                                        </label>
                                        <div className="mb-3 input-group">
                                            <span className="input-group-text" id="basic-addon1">
                                                <i className="fa fa-envelope-o" aria-hidden="true" />
                                            </span>
                                            <input
                                                required=""
                                                name="email"
                                                placeholder="Email Id Or Mobile number Or Member ID"
                                                aria-label="Email ID"
                                                type="email"
                                                className="form-control"
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-lg-12" style={{ display: "block", margin: "auto" }}>
                                        <label htmlFor="firstName" id="labell">
                                            Enter Password
                                        </label>
                                        <div className="mb-3 input-group">
                                            <span className="input-group-text" id="basic-addon1">
                                                <i className="fa fa-lock" aria-hidden="true" />
                                            </span>
                                            <input
                                                required=""
                                                name="password"
                                                placeholder="Enter Password"
                                                aria-label="Enter Password"
                                                type={showPassword ? "text" : "password"}
                                                className="form-control"
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                            <span
                                                className="input-group-text"
                                                id="basic-addon1"
                                                style={{ cursor: "pointer" }}
                                                onClick={togglePasswordVisibility}
                                            >
                                                <i className={showPassword ? "fa fa-eye" : "fa fa-eye-slash"} aria-hidden="true" />
                                            </span>
                                        </div>
                                    </div>
                                    {/* <h1>Or sign in with</h1>
                                    <div className="sociallogin">
                                        <Link><img src={social1} /></Link>
                                        <Link><img src={social2} /></Link>
                                        <Link><img src={social3} /></Link>
                                    </div> */}
                                    {loading ?
                                        <div
                                            className="col-lg-12"
                                            style={{ display: "block", margin: "auto" }}
                                            disabled
                                        >
                                            <button type='submit' className="login_btnup">
                                                Please wait...
                                            </button>
                                        </div>
                                        :
                                        <div
                                            className="col-lg-12"
                                            style={{ display: "block", margin: "auto" }}
                                            onClick={handleLogin}
                                        >
                                            <button type='submit' className="login_btnup">
                                                Login
                                            </button>
                                        </div>
                                    }
                                </form>
                                <span className="login_forgot">
                                    {/* Don't have an account ? <a href="/Register" >Register</a> */}
                                    Don't have an account ? <a onClick={() => Navigate("/Register")} >Register</a>

                                </span>
                                <span className="login_forgot">

                                    <a onClick={() => Navigate("/Forgotpassword")} >Forgot Password</a>

                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Login
