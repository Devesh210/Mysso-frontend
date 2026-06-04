import React, { useState, useEffect } from 'react';
import { Alert, Col, Row } from 'react-bootstrap';
import API_URL from '../../../../config';

const SubscriptionNotification = ({ expiryDate }) => {
    const [timeRemaining, setTimeRemaining] = useState(null);
    const [showNotification, setShowNotification] = useState(false);
    const [show15DayNotification, setShow15DayNotification] = useState(false);
    const [show7DayNotification, setShow7DayNotification] = useState(false);

    console.log(expiryDate);

    useEffect(() => {

        const calculateTimeRemaining = () => {
            const now = new Date();
            const expiryDateNormalized = new Date(expiryDate.getFullYear(), expiryDate.getMonth(), expiryDate.getDate());
            const nowNormalized = new Date(now.getFullYear(), now.getMonth(), now.getDate());

            const timeLeft = expiryDateNormalized - nowNormalized;
            console.log("timeLeft", timeLeft);
            setTimeRemaining(timeLeft);

            // Calculate the difference in days
            const daysLeft = Math.ceil(timeLeft / (24 * 60 * 60 * 1000));
            console.log("daysLeft", daysLeft);

            // Check if the subscription is about to expire in 15 days
            if (daysLeft === 15) {
                setShow15DayNotification(true);
            } else {
                setShow15DayNotification(false);
            }

            // Check if the subscription is about to expire in 7 days
            if (daysLeft === 7) {
                setShow7DayNotification(true);
            } else {
                setShow7DayNotification(false);
            }

            // To see the current state of notifications in the next render
            setTimeout(() => {
                console.log("show15DayNotification", show15DayNotification);
                console.log("show7DayNotification", show7DayNotification);
            }, 0);

            console.log("timeLeft (days)", timeLeft / (24 * 60 * 60 * 1000));
            console.log("timeRemaining (days)", daysLeft);

            // When subscription expires (daysLeft === 0), call API to reset plan
            if (daysLeft <= 0) {
                resetPlan();
            }

        };


        const resetPlan = async () => {
            try {
                const requestOptions = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                };

                fetch(`${API_URL}/api/resetplan`, requestOptions)
                    .then(response => response.json())
                    .then(data => {
                        console.log(data);
                        if (data.status === 200) {
                            console.log('Plan has been reset successfully.');
                        }
                    });
            } catch (error) {
                console.error('Error resetting the plan:', error);
            }
        };


        calculateTimeRemaining();

        // Update the time remaining every day
        const timerId = setInterval(calculateTimeRemaining, 24 * 60 * 60 * 1000);

        console.log("timerId", timerId);

        return () => clearInterval(timerId);
    }, [expiryDate]);


    console.log("timeRemaining", Math.ceil(timeRemaining / (24 * 60 * 60 * 1000)));

    return (
        <>
            {show15DayNotification && (
                <Row>
                    <Col>
                        <Alert variant="danger" onClose={() => setShow15DayNotification(false)} dismissible className='custom-alert d-flex align-items-center'>
                            <div className="d-flex align-items-center">
                                <p className="mb-0 mr-3">Your subscription is about to expire in {Math.ceil(timeRemaining / (24 * 60 * 60 * 1000))} days.</p>
                            </div>
                        </Alert>
                    </Col>
                </Row>
            )}
            {show7DayNotification && (
                <Row>
                    <Col>
                        <Alert variant="danger" onClose={() => setShow7DayNotification(false)} dismissible className='custom-alert d-flex align-items-center'>
                            <div className="d-flex align-items-center">
                                <p className="mb-0 mr-3"><strong>Your subscription is about to expire in {Math.ceil(timeRemaining / (24 * 60 * 60 * 1000))} days.</strong></p>
                            </div>
                        </Alert>
                    </Col>
                </Row>
            )}
        </>
    );
};

export default SubscriptionNotification;