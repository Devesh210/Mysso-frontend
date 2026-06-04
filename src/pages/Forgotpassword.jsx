import React, { useState } from 'react'
import logo from "../assets/logo.svg"
import banner5 from "../assets/banner/banner6.jpg"
import banner from "../assets/swamii.png"
import { Link, useNavigate } from 'react-router-dom'
import API_URL from '../../config'

const Forgotpassword = () => {

  const Navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      if (!email) {
        swal({ text: 'Please enter email', icon: 'warning' });
        return;
      }
      setLoading(true);
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      };
      await fetch(`${API_URL}/api/forgotpassword`, requestOptions)
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
                <form onSubmit={handleForgotPassword}>
                  <div
                    className="col-lg-12"
                    style={{ display: "block", margin: "auto" }}
                  >
                    <label htmlFor="firstName" id="labell">
                      Enter Registered Email Id To Reset Your Password
                    </label>
                    <div className="mb-3 input-group">
                      <span className="input-group-text" id="basic-addon1">
                        <i className="fa fa-envelope-o" aria-hidden="true" />
                      </span>
                      <input
                        required=""
                        name="email"
                        placeholder="Email Id"
                        aria-label="Email ID"
                        type="email"
                        className="form-control"
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>
               
                
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

export default Forgotpassword;
