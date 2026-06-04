import React, { useState,useEffect } from 'react';

import Banner from '../components/pages/matrimonialsearch/Banner'
import { Col, Container, Row } from 'react-bootstrap'
import Searchright from '../components/pages/matrimonialsearch/Searchright'
import Filterleft from '../components/pages/matrimonialsearch/Filterleft'
import API_URL from '../../config';

const Matrimonialsearch = () => {

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            swal({
                title: "Your Session Has Expired",
                text: "Please log in again to continue.",
                icon: "warning",
            }).then(() => {
                window.location.href = '/login';
            });
        }
    }, [])

    const [data, setData] = useState('');

    const handleDataChange = (newData) => {
        setData(newData);
    };






    return (
        <div>
            <Banner />
            <Container fluid className='matrimonial-search'>
                <Row>
                    <Col lg={3}>
                        <Filterleft onDataChange={handleDataChange} />
                    </Col>
                    <Col lg={9}>
                        <Searchright data={data} />
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Matrimonialsearch
