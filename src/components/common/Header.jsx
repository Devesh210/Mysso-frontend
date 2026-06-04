import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import logo from "../../assets/logo.svg"
import { useLocation, NavLink, Link } from "react-router-dom";
import { useEffect, useState } from 'react';
import API_URL, { SEEKER } from '../../../config';
import { Dropdown, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { clearAllStates } from '../../redux/store';
import { UseJobPortalVisitorHandler } from '../../hooks';
const Header = () => {

    const { role } = useSelector((state) => state.auth)
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const token = localStorage.getItem('token');
    const userdata = JSON.parse(localStorage.getItem('user'));
    const location = useLocation();
    const element = document.getElementById("toplocation");

    if (element) {
        element.scrollIntoView({
            behavior: "smooth",
            block: "start",
            inline: "nearest",
        });
    }
    useEffect(() => {
        getdetails();
    }, [])

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


    const getdetails = () => {
        console.log(token);
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        };
        fetch(`${API_URL}/api/userList`, requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setUser(data.data);
            });
    }

    console.log(user);


    const logout = () => {
        localStorage.clear();
        sessionStorage.clear();
        clearAllStates()
        navigate('/');
    }

    useEffect(() => {
    }, [location.pathname]);

    const handlematrimonyportal = async () => {
        try {
            if (!token) {
                window.location.href = "/Matrimonial"
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
            const portalPayload = { portal: "matrimony" };

            await fetch(`${API_URL}/api/lastvisitedportals`, {
                method: 'POST',
                headers,
                body: JSON.stringify(portalPayload),
            })
                .then(response => response.json())
                .then(data => {
                    console.log("Last visited portal response:", data);
                    // Update session storage for the new portal
                    sessionStorage.setItem('portal', "matrimony");
                    sessionStorage.setItem('starttime', new Date());
                    window.location.href = "/Matrimonial"
                })
                .catch(err => {
                    console.error("Error updating last visited portal:", err);
                    // Update session storage for the new portal
                    sessionStorage.setItem('portal', "matrimony");
                    sessionStorage.setItem('starttime', new Date());
                    window.location.href = "/Matrimonial"

                });
        } catch (error) {
            console.error("Error in handlematrimonyportal:", error);
            window.location.href = "/Matrimonial"

        }
    };


    const handlememberportal = async () => {
        try {
            if (!token) {
                // If token is not present, redirect to the Aboutmember page
                window.location.href = "/Aboutmember"

                return;
            }

            // Retrieve current portal and start time from session storage
            const current_portal = sessionStorage.getItem('portal');
            const current_portal_start_time = sessionStorage.getItem('starttime');

            console.log('Current Portal:', current_portal);



            // Prepare headers for API requests
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            };

            // Log time spent on the current portal (if it exists)
            if (current_portal && current_portal_start_time) {
                const timeSpentPayload = {
                    portal: current_portal,
                    start_time: current_portal_start_time,
                    end_time: new Date(),
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
            const portalPayload = { portal: "member" };

            await fetch(`${API_URL}/api/lastvisitedportals`, {
                method: 'POST',
                headers,
                body: JSON.stringify(portalPayload),
            })
                .then(response => response.json())
                .then(data => {
                    console.log("Last visited portal response:", data);
                    // Update session storage with the new portal and start time
                    sessionStorage.setItem('portal', "member");
                    sessionStorage.setItem('starttime', new Date());
                    window.location.href = "/Aboutmember"
                })
                .catch(err => {
                    // Update session storage with the new portal and start time
                    sessionStorage.setItem('portal', "member");
                    sessionStorage.setItem('starttime', new Date());
                    console.error("Error updating last visited portal:", err);
                    window.location.href = "/Aboutmember"

                });
        } catch (error) {
            console.error("Error in handlememberportal:", error);
        }
    };


    const handlelogohomepage = async () => {
        try {
            if (!token) {
                // If token is not present, redirect to the Aboutmember page
                window.location.href = "/";
                return;
            }

            // Retrieve current portal and start time from session storage
            const current_portal = sessionStorage.getItem('portal');
            const current_portal_start_time = sessionStorage.getItem('starttime');

            console.log('Current Portal:', current_portal);



            // Prepare headers for API requests
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            };

            // Log time spent on the current portal (if it exists)
            if (current_portal && current_portal_start_time) {
                const timeSpentPayload = {
                    portal: current_portal,
                    start_time: current_portal_start_time,
                    end_time: new Date(),
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
            const portalPayload = { portal: "" };

            await fetch(`${API_URL}/api/lastvisitedportals`, {
                method: 'POST',
                headers,
                body: JSON.stringify(portalPayload),
            })
                .then(response => response.json())
                .then(data => {
                    console.log("Last visited portal response:", data);
                    // Update session storage with the new portal and start time
                    sessionStorage.setItem('portal', "");
                    sessionStorage.setItem('starttime', "");
                    window.location.href = "/";
                })
                .catch(err => {
                    // Update session storage with the new portal and start time
                    sessionStorage.setItem('portal', "");
                    sessionStorage.setItem('starttime', "");
                    console.error("Error updating last visited portal:", err);
                    window.location.href = "/";

                });
        } catch (error) {
            console.error("Error in handlememberportal:", error);
        }
    };
    UseJobPortalVisitorHandler()



    return (
        <div id="toplocation">
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
            {['sm'].map((expand) => (
                <Navbar key={expand} expand={expand} className="bg-body-tertiary">
                    <Container fluid>
                        <Navbar.Brand onClick={handlelogohomepage}>
                            <img className='logo' src={logo} alt="" />
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
                        <Navbar.Offcanvas
                            id={`offcanvasNavbar-expand-${expand}`}
                            aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                            placement="end"
                        >
                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                                    <img className='logo' src={logo} alt="" />
                                </Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body>
                                <Nav className="justify-content-center flex-grow-1">
                                    <NavDropdown title="About Us" id="about-us-dropdown">
                                        <NavDropdown.Item as={NavLink} to="/aboutus" activeClassName="active">About Us</NavDropdown.Item>
                                        {/* <NavDropdown.Item as={NavLink} to="/ourteam" activeClassName="active">Our Team</NavDropdown.Item> */}
                                        {/* <NavDropdown.Item as={NavLink} to="/ourdirectors" activeClassName="active">Our Directors</NavDropdown.Item> */}
                                        <NavDropdown.Item as={NavLink} to="/governmentregistration" activeClassName="active">Government Registration</NavDropdown.Item>
                                        {/* <NavDropdown.Item as={NavLink} to="/achievements" activeClassName="active">Achievements</NavDropdown.Item> */}

                                    </NavDropdown>
                                    {/* <Nav.Link href="Aboutus">About Us</Nav.Link> */}
                                    {/* <Nav.Link href="https://docs.google.com/forms/d/e/1FAIpQLSfm0U025k5oDiT19uiMu5XVTn2YmrJOVa8RpYBb4AwQNlBXOA/viewform">Members</Nav.Link> */}
                                    <Nav.Link as={Link} onClick={handlememberportal}>Members</Nav.Link>
                                    <Nav.Link as={Link} onClick={handlematrimonyportal} >Matrimonial</Nav.Link>
                                    {/* <Nav.Link href="https://docs.google.com/forms/d/e/1FAIpQLSdzAH-LNpcI2ezsXHwkj6UQ5K6slFQ4kPArWogOE2mARRa4Mw/viewform">Job</Nav.Link> */}
                                    {role === SEEKER || !role ? <Nav.Link to="/JobSection" as={Link}>Job</Nav.Link> : null}
                                    {/* <Nav.Link href="https://docs.google.com/forms/d/e/1FAIpQLSe9S3SHpzcc-uOB6jJMNfwf_d_hvJITHNeGrmoLklPy35T3Hw/viewform">Startup</Nav.Link> */}
                                    <Nav.Link to="/Startup" as={Link}>Startup</Nav.Link>
                                    {/* <Nav.Link href="https://docs.google.com/forms/d/e/1FAIpQLSfxyRdGbzccRpvChQ0by9fkVSqyZTS1vUGEtIg6PRFHkH9hRQ/viewform">Networking</Nav.Link> */}
                                    <Nav.Link to="/Withoutchapters" as={Link}>Networking</Nav.Link>
                                    {/* <Nav.Link href="https://docs.google.com/forms/d/e/1FAIpQLSe5SXtw28qlPDK-Q5gEIbliCQ04oW1Q2Cs2O0EJ5EtBruAetQ/viewform">Support</Nav.Link> */}
                                    <Nav.Link to="/Support" as={Link}>Support</Nav.Link>

                                </Nav>
                                <Form className="d-flex">
                                    {/* <div className='formsearch'>
                                        <Form.Control
                                            type="search"
                                            placeholder="Search here........."
                                            className="search-header"
                                            aria-label="Search"
                                        />
                                        <i class="fa fa-search" aria-hidden="true"></i>
                                    </div> */}
                                    {!token ? (
                                        <>
                                            <Button className='login' onClick={() => navigate('/Register')}>
                                                <i className="fa fa-user pe-2" aria-hidden="true"></i>
                                                Free Register
                                            </Button>
                                            <Button className='login' onClick={() => navigate('/Login')}>
                                                <i className="fa fa-user pe-2" aria-hidden="true"></i>
                                                Login
                                            </Button>
                                        </>
                                    ) : (
                                        <>
                                            <Dropdown>
                                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                                    <i className="fa fa-user-circle-o pe-2" aria-hidden="true"></i>
                                                    {`${userdata?.first_name} ${userdata?.last_name}`}
                                                </Dropdown.Toggle>

                                                <Dropdown.Menu>
                                                    <Dropdown.Item href="/Profile">My Profile</Dropdown.Item>
                                                    <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </>
                                    )}
                                </Form>
                            </Offcanvas.Body>
                        </Navbar.Offcanvas>
                    </Container>
                </Navbar>
            ))}
        </div>
    )
}

export default Header
