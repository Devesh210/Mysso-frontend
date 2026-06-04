import React, { useState, useEffect } from 'react'
import { Container } from 'react-bootstrap'
import API_URL from '../../../../config';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const Navigate = useNavigate();
    const token = localStorage.getItem('token');
    const [user, setUser] = useState({});
    const [ismatrimonyuser, setIsMatrimonyUser] = useState('');

    useEffect(() => {
        getdetails();
        checkuser();
    }, [])


    const getdetails = () => {
        try {

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

        } catch (error) {
            console.log(error);
        }
    }

    console.log(user);

    const checkuser = () => {
        try {

            const requestOptions = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            };
            fetch(`${API_URL}/api/checkMatrimonyUser`, requestOptions)
                .then(response => response.json())
                .then(data => {
                    console.log("data>?>>>>??????>>>>????", data);
                    setIsMatrimonyUser(data.data);
                });

        } catch (error) {
            console.log(error);
        }
    }




    return (
        <div>
            <Container fluid className='profile'>
                <h1>Profile</h1>

                <div className='profile-details'>
                    <div className='profile-image'>
                        <img src='https://via.placeholder.com/150' alt='profile' />
                    </div>
                    <div className='profile-info'>
                        <h2>{`${user?.first_name} ${user?.middle_name} ${user?.last_name}`}</h2>
                        <p>
                            <strong>Gender:</strong>
                            <span>
                                {user?.gender}
                            </span>
                        </p>
                        <p>
                            <strong>Email:</strong>
                            <span>
                                {user?.email}
                            </span>
                        </p>
                        <p>
                            <strong>Mobile Number:</strong>
                            <span>
                                {user.phone}
                            </span>
                        </p>
                        <p>
                            <strong>Date Of Birth :</strong>
                            <span>
                                {user.date_of_birth}
                            </span>
                        </p>
                        <p>
                            <strong>Address :</strong>
                            <span>
                                {user.address}
                            </span>
                        </p>
                        <p>
                            <strong>Sanstha name :</strong>
                            <span>
                                {user.sanstha_name}
                            </span>
                        </p>
                        <p>
                            <strong>Sanstha Address :</strong>
                            <span>
                                {user.sanstha_location}
                            </span>
                        </p>
                        <p>
                            <strong>Reference Name (Sant & Haribhagat ) :</strong>
                            <span>
                                {user.refrence_name}
                            </span>
                        </p>
                        <p>
                            <strong>Reference Mobile Number :</strong>
                            <span>
                                {user.refrence_phone}
                            </span>
                        </p>
                        <p>
                            <strong>Reference Address :</strong>
                            <span>
                                {user.refrence_location}
                            </span>
                        </p>
                    </div>
                </div>
            </Container>
            <Container fluid className='profile'>
                <h1>Matrimony</h1>
                <div className='profile-details'>
                    <div className='profile-image'>
                        <button onClick={() => Navigate('/Matrimonialform')}>Add Matrimony data </button>
                        <button>View Matrimony data </button>
                    </div>

                </div>
            </Container>
        </div>
    )
}

export default Profile