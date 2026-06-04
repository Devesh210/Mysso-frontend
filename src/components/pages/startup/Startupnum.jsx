import React from 'react';
import { Container } from 'react-bootstrap';

const Startupnum = () => {

    const achievetitleText = [
        66.6 + 'k',
        9.5 + 'k',
        99.5 + 'k',
        33.9 + 'k',
    ]

    const achieveTitleText = [
        'Members',
        'Events',
        'Customer Satisfaction',
        'Jobs',
    ];

    return (
        <div className='achievement-section'>
            <Container fluid>
                <div className='achievement'>
                    <div className='row achiess'>
                        {achievetitleText.map((image, index) => (
                            <div className='col-lg-2' key={index}>
                                <img src={image} alt="" />
                                <h4 className='service-text mt-0'>{achievetitleText[index]}</h4>
                                <h5 className='service-texts'>{achieveTitleText[index]}</h5>
                            </div>
                        ))}
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default Startupnum;
