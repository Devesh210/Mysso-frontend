import React, { useState, useEffect, useRef } from 'react'
import { Table, Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import API_URL from '../../../../../config';

const MedicalHospitalServicesList = () => {
    const Navigate = useNavigate();

    const [perPage] = useState(10);
    const [pageCount, setPageCount] = useState(0);
    const [page, setPage] = useState(1);
    const [hospital_id, setHospital_Id] = useState('');
    const [services, setServices] = useState([]);


    useEffect(() => {
        if (localStorage.getItem('token')) {
            const url = window.location.href;
            const url1 = url.split("/")[3];
            const url2 = url1.split("?")[1];
            const id = url2.split("=")[1];
            setHospital_Id(id)
            getHospitalServices(id)
        } else {
            Navigate('/login');
        }
    }, [])

    console.log(hospital_id)

    const getHospitalServices = async(id) => {
        try {

            const requestOptions = {
                method: 'GET',
                headers: { 
                    'Content-Type': 'application/json', 
                    'Authorization': `Bearer ${localStorage.getItem('token')}` 
                },
            };
            await fetch(`${API_URL}/api/gethospitalServicesList?page=${page}&limit=${perPage}&hospital_id=${id}`, requestOptions)
                .then(response => response.json())
                .then(data => {
                    if (data.status === 200) {
                        setServices(data.data)
                    } else {
                        swal('Error', data.message, 'error');
                    }
                });
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div>
            <Container className="mt-4">
                <Row className="mb-3">
                    <Col>
                        <h2>Hospital Services</h2>
                    </Col>
                    <Col className="text-end">
                        <Button className="common" onClick={() => Navigate('/MedicalHospitalServicesForm')}>Add Service</Button>
                        <Button className="common" onClick={() => Navigate('/profile')}>Back To Profile</Button>

                    </Col>
                </Row>

                <Table bordered hover responsive>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Service Category</th>
                            <th>Service Name</th>
                            <th>Service Location</th>
                            <th>Doctor Name</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {services?.length > 0 ? (
                            services?.map((service, index) => (
                                <tr key={service._id}>
                                    <td>{index + 1}</td>
                                    <td>{service.serviceCategorydetails?.map(val => val?.service_category)}</td>
                                    <td>{service.serviceName}</td>
                                    <td className='text-break'>{service.serviceLocation}</td>
                                    <td>{service.doctorName}</td>
                                    <td>
                                        <Button className="common" onClick={() => Navigate(`/MedicalHospitalServicesView?id=${service._id}`)}>View</Button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center">
                                        No Records Found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </Container>
        </div>
    )
}

export default MedicalHospitalServicesList