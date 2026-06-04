import React from 'react';
import { Container } from 'react-bootstrap';
import borderimg from '../../../assets/border.svg';
import one from '../../../assets/achievement/1.svg';
import two from '../../../assets/achievement/2.svg';
import three from '../../../assets/achievement/3.svg';
import four from '../../../assets/achievement/4.svg';
import five from '../../../assets/achievement/5.svg';

const Achievement = () => {
    const achieveBanner = [
        one,
        two,
        three,
        four,
        five
    ];

    const achievetitleText = [
        66.6 + 'k',
        9.5 + 'k',
        99.5 + 'k',
        33.9 + 'k',
        504 + '+'
    ]

    const achieveTitleText = [
        'Members',
        'Events',
        'Customer Satisfaction',
        'Jobs',
        'Awards Won'
    ];

    return (
        <div className='achievement-section'>
            <Container fluid>
                <div className='achievement'>
                    <h3>Great <span>Achievements</span> <img className='borderimgg' src={borderimg} alt="border" /></h3>
                    <div className='row achie'>
                        {achieveBanner.map((image, index) => (
                            <div className='col-lg-2' key={index}>
                                <img src={image} alt="" />
                                <h4 className='service-text'>{achievetitleText[index]}</h4>
                                <h5 className='service-texts'>{achieveTitleText[index]}</h5>
                            </div>
                        ))}
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default Achievement;
