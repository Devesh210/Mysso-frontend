import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

import about from '../assets/homepage/about.png'
import banner from "../assets/matrimonial/search.png"
import borderimg from '../assets/border.svg'

const Cancellation = () => {
    return (
        <div>
            <Container fluid style={{ padding: '0px' }}>
                <div className="image-container mb-0">
                    <img src={banner} className="w-100" alt="" />
                    <div className="overlay12">
                    </div>
                </div>
            </Container>
            <div className='about-us'>
                <Container fluid>
                    <div className='textabout'>
                        <h3>Cancellation and <span>Refund policy</span> <img src={borderimg} /></h3>
                    </div>
                    <Row>
                        <Col lg={12}>
                            <p className='mb-3'>
                                This cancellation policy outlines about how you can cancel or seek a refund for a product / service that you have purchased through the Platform.  Under this policy:
                            </p>
                            <ul className='termskhddll'>
                                <li>Cancellations will only be considered if the request is made within 7 days of placing the order.
                                    However, cancellation requests may not be entertained if the orders have been communicated
                                    to such sellers / merchant(s) listed on the Platform and they have initiated the process of
                                    shipping them, or the product is out for delivery. In such an event, you may choose to reject the
                                    product at the doorstep. </li>
                                <li>
                                    shreesso.org does not accept cancellation requests for perishable items like flowers, eatables, etc.
                                    However, the refund / replacement can be made if the user establishes that the quality of the
                                    product delivered is not good.
                                </li>
                                <li>
                                    In case of receipt of damaged or defective items, please report to our customer service team.
                                    The request would be entertained once the seller/ merchant listed on the Platform, has checked
                                    and determined the same at its own end. This should be reported within 7 days of receipt of
                                    products. In case you feel that the product received is not as shown on the site or as per your
                                    expectations, you must bring it to the notice of our customer service within 7 of receiving the
                                    product. The customer service team after looking into your complaint will take an appropriate
                                    decision.
                                </li>
                                <li>
                                    In case of complaints regarding the products that come with a warranty from the manufacturers,
                                    please refer the issue to them. In case of any refunds approved by ShreeSSO  it will take 15 days
                                    for the refund to be processed to you.
                                </li>
                            </ul>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    )
}

export default Cancellation
