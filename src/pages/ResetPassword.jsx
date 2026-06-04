import React, { useState, useRef, useEffect } from 'react'
import logo from "../assets/logo.svg"
import banner5 from "../assets/banner/banner6.jpg"
import banner from "../assets/swamii.png"
import { Link, useNavigate } from 'react-router-dom'
import API_URL from '../../config'

const ResetPassword = () => {

    const Navigate = useNavigate();
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    const email = params.get('email');
    console.log(params.get('token'));
    console.log(params.get('email'));

    const [loading, setLoading] = useState(false);
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [passwordError, setPasswordError] = useState('');
    const [requirements, setRequirements] = useState({
        minLength: false,
        uppercase: false,
        lowercase: false,
        symbol: false,
    });

    const passwordRef = useRef(null);

    const togglePasswordVisibility = () => {
        setShowPassword(prevState => !prevState);
    };

    const validatePassword = (password) => {
        const minLength = 6;
        const uppercase = /[A-Z]/;
        const lowercase = /[a-z]/;
        const symbol = /[!@#$%^&*(),.?":{}|<>]/;

        const newRequirements = {
            minLength: password.length >= minLength,
            uppercase: uppercase.test(password),
            lowercase: lowercase.test(password),
            symbol: symbol.test(password),
        };
        setRequirements(newRequirements);

        if (!newRequirements.minLength) {
            return 'Password must be at least 6 characters';
        } else if (!newRequirements.uppercase) {
            return 'Password must contain at least one uppercase letter';
        } else if (!newRequirements.lowercase) {
            return 'Password must contain at least one lowercase letter';
        } else if (!newRequirements.symbol) {
            return 'Password must contain at least one symbol';
        }

        return '';
    };

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        const validationError = validatePassword(newPassword);
        setPasswordError(validationError);
    };

    const getValidationIcon = (isValid) => {
        return isValid ? <i className="fa fa-check text-success" aria-hidden="true" /> : <i className="fa fa-times text-danger" aria-hidden="true" />;
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        try {
            if (!password) {
                swal({ text: 'Please enter password', icon: 'warning' });
                return;
            }
            else if (passwordError) {
                swal({
                    text: `Password must contain at least:
                - 1 Uppercase letter
                - 1 Lowercase letter
                - 1 Symbol
                - 6 Characters`,
                    icon: "warning"
                });
                passwordRef.current.focus();
                return;
            }
            setLoading(true);
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token: token, email: email, newPassword: password })
            };
            await fetch(`${API_URL}/api/resetPassword`, requestOptions)
                .then(response => response.json())
                .then(data => {
                    if (data.status === 200) {
                        console.log(data);
                        swal({ text: data.message, icon: 'success' });
                        Navigate('/login');
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

    return (
        <div>
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
                                <h2 className='mb-5'>Reset Your Password</h2>
                                <form onSubmit={handleResetPassword}>
                                    <div className="col-lg-12" style={{ display: "block", margin: "auto" }}>
                                        <label htmlFor="firstName" id="labell">
                                            Enter New Password
                                        </label>
                                        <div className="mb-3 input-group">
                                            <span className="input-group-text" id="basic-addon1">
                                                <i className="fa fa-lock" aria-hidden="true" />
                                            </span>
                                            <input
                                                required=""
                                                name="password"
                                                placeholder="Enter New Password"
                                                aria-label="Enter Password"
                                                type={showPassword ? "text" : "password"}
                                                className="form-control"
                                                onChange={handlePasswordChange}
                                                ref={passwordRef}
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
                                    {password && passwordError &&
                                        <div className="mt-2">
                                            <small><strong>PASSWORD MUST CONTAIN</strong></small>
                                            <ul className="text-muted" style={{ fontSize: '0.875rem', listStyle: 'none' }}>
                                                <li>
                                                    {getValidationIcon(requirements.uppercase)}
                                                    At least 1 uppercase letter
                                                </li>
                                                <li>
                                                    {getValidationIcon(requirements.lowercase)}
                                                    At least 1 lowercase letter
                                                </li>
                                                <li>
                                                    {getValidationIcon(requirements.symbol)}
                                                    At least 1 symbol
                                                </li>
                                                <li>
                                                    {getValidationIcon(requirements.minLength)}
                                                    At least 6 characters
                                                </li>
                                            </ul>
                                        </div>
                                    }

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

                                        >
                                            <button type='submit' className="login_btnup">
                                                Submit
                                            </button>
                                        </div>
                                    }
                                </form>
                                {/* <span className="login_forgot">
                  Don't have an account ? <a onClick={() => Navigate("/Register")} >Register</a>

                </span>
                <span className="login_forgot">

                  <a onClick={() => Navigate("/Forgotpassword")} >Forgot Password</a>

                </span> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ResetPassword;
