import React, { useState, useEffect, useRef } from 'react'
import { Table, Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import API_URL from '../../../../../config';

const MedicalHospitalServices = () => {
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

    const getHospitalServices = async (id) => {
        try {

            const requestOptions = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
            };
            await fetch(`${API_URL}/api/getListsofHospitalServicesbyIdForUser?page=${page}&limit=${perPage}&hospital_id=${id}`, requestOptions)
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

    const formatDate = (date) => {
        const d = new Date(date);
        const dt = d.getDate();
        const mn = d.getMonth();
        const mnth = mn + 1;
        const yyyy = d.getFullYear();
        return `${dt}/${mnth}/${yyyy}`;
    }


    return (
        <div>
            <Container className="mt-4">
                <Row className="mb-3">
                    <Col>
                        <h2>Hospital Services</h2>
                    </Col>
                    <Col className="text-end">
                        <Button className="common" onClick={() => Navigate(`/Medicalsupport`)}>Back</Button>

                    </Col>
                </Row>

                <Table bordered hover responsive>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Service Name</th>
                            <th>Start Date</th>
                            <th>Start Time</th>
                            <th>End Date</th>
                            <th>End Time</th>
                            <th>Doctor Name</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {services?.length > 0 ? (
                            services?.map((service, index) => (
                                <tr key={service._id}>
                                    <td>{index + 1}</td>
                                    <td>{service.serviceName}</td>
                                    <td>{formatDate(service.startDate)}</td>
                                    <td>{service.startTime}</td>
                                    <td>{formatDate(service.endDate)}</td>
                                    <td>{service.endTime}</td>
                                    <td>{service.doctorName}</td>
                                    <td>
                                        <Button className="common" onClick={() => Navigate(`/MedicalHospitalServicesdetails?id=${service._id}`)}>View</Button>
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

export default MedicalHospitalServices
