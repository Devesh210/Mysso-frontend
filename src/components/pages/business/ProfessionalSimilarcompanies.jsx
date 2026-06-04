import React from 'react'
import wipro from "../../../assets/business/clogo.svg"
import { Col, Container, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import Nodatafound from '../nodatafound/Nodatafound'
import dummyLogo from "../../../assets/dummyLogo.png"
import API_URL from '../../../../config'
const ProfessionalSimilarcompanies = (data) => {
    const Navigate = useNavigate();

    const details = data.data
    console.log("similar details", details)


    return (
        <div>
            <Container fluid style={{ paddingLeft: '30px', paddingRight: '30px' }}>
                <h3 className='similar-commm'>Similar Companies</h3>
                <Row className='mt-5 mb-5'>
                    {details?.length > 0 ? (
                        details?.map((data, index) => (
                            <Col lg={3}>
                                <div className='company-info'>
                                    <img src={!data?.logo || data?.logo.length == 0 ? dummyLogo : `${API_URL}/uploads/company_logo/${data?.logo?.map(val => val.filename)}`}
                                        alt=""
                                        height={150}
                                        width={200}
                                        style={{ objectFit: 'contain' }}
                                    />
                                    <h3>{data.Firmname}</h3>
                                    <p className="companybio">{data.company_bio}</p>
                                    <h6>Type: {data?.profession}</h6>
                                    {/* <div className='rating'>
                                <h3>4.7
                                    <i className="fa fa-star" aria-hidden="true"></i>
                                    <i className="fa fa-star" aria-hidden="true"></i>
                                    <i className="fa fa-star" aria-hidden="true"></i>
                                    <i className="fa fa-star" aria-hidden="true"></i>
                                    <i className="fa fa-star" aria-hidden="true"></i>
                                </h3>
                            </div> */}
                                    <button
                                        className='connnnnnnect'
                                        onClick={() => window.location.href = `/Professionaldetailpage?id=${data._id}`}
                                    >
                                        Connect now
                                    </button>
                                </div>
                            </Col>
                        )))
                        :
                        <Nodatafound />
                    }
                </Row>
            </Container>
        </div>
    )
}

export default ProfessionalSimilarcompanies;