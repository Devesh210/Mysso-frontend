import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Nopagefound = () => {

    return (
        <div className='nopagefound'>
            <Row>
                <Col lg={6}>
                    <div className='nopagefound12'>
                            <img className="nopageimg" src="https://www.biffl.org.bd/frontend/images/no_result.gif" alt="No Records Found" />
                        <div className="empty-state__message">No page Found</div>
                        <Link className='gohome'><i className="fa fa-arrow-left" aria-hidden="true"></i> Go Back to home</Link>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default Nopagefound