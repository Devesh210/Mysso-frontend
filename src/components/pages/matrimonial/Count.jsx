import React from 'react';
import { Container } from 'react-bootstrap';

import flower from '../../../assets/matrimonial/flower.svg';

const Count = () => {

    const achievetitleText = [
        9.5 + 'k',
        9.5 + 'k',
        9.5 + 'k',
        9.5 + 'k',
    ]

    const achieveTitleText = [
        'Happy Couples',
        'Happy Couples',
        'Happy Couples',
        'Happy Couples',
    ];

    return (
        <div className='counttop-section'>
            <Container fluid>
                <div className='counttop'>
                    <div className='row'>
                        {achievetitleText.map((image, index) => (
                            <div className={`col-lg-3 flowerimg ${index === 0 ? 'hide-flower' : ''}`} key={index}>
                                {index !== 0 && <img src={flower} />}
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

export default Count;
