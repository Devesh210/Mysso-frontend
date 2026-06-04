
import React from 'react'
import { Container,Row,Col } from 'react-bootstrap';
import borderimg from '../../assets/border.svg'

const Steps = () => {

    const steps = [
        { id: 1, text: 'Step 1 Text', imgAlt: 'step1', imgSrc: '/Jobs/step_1.png', color:"#E4A321" },
        { id: 2, text: 'Step 2 Text', imgAlt: 'step2', imgSrc: '/Jobs/step_2.png', color:"#F67240" },
        { id: 3, text: 'Step 3 Text', imgAlt: 'step3', imgSrc: '/Jobs/step_3.png', color:"#1FA5B0" },
        { id: 4, text: 'Step 4 Text', imgAlt: 'step4', imgSrc: '/Jobs/step_4.png', color:"#EF434C"},
        { id: 5, text: 'Step 5 Text', imgAlt: 'step5', imgSrc: '/Jobs/step_5.png', color:'#1F4645' },
    ];

    return (
        <div>
            <Container className='pb-5 pt-5'>
                <div className='featuredprofile mb-5'>
                    <h3>Simple  <span>Steps</span><img className='featuredpro' src={borderimg} style={{width:"130px",left:"51%"}} />  </h3>
                </div>
                <Row className='justify-content-between text-center '>
                    {steps.map((step) => (
                        <Col key={step.id} lg={2} className='text-center'>
                            <div>
                                <img className='w-100' src={step.imgSrc} alt={step.imgAlt} />
                                <h5 style={{ color: step.color }} className='mt-2'>{step.text}</h5>
                            </div>
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    )
}
export default Steps;