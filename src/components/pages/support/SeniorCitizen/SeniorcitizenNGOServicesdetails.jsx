import React, { useState, useEffect, useRef } from 'react'
import { Col, Container, Form, Row, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import API_URL from '../../../../../config';


const SeniorcitizenNGOServicesdetails = () => {

  const Navigate = useNavigate();

  const [services, setServices] = useState([])
  const [ngo_id, setNGO_Id] = useState('');

  useEffect(() => {
    if (localStorage.getItem('token')) {

      const url = window.location.href;
      const url1 = url.split("/")[3];
      const url2 = url1.split("?")[1];
      const id = url2.split("=")[1];
      getservicedetails(id)
    } else {
      Navigate('/login');
    }
  }, [])

  const getservicedetails = async (id) => {
    try {
      const requestOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      };
      await fetch(`${API_URL}/api/getngoServicesbyId?ngo_id=${id}`, requestOptions)
        .then(response => response.json())
        .then(data => {
          if (data.status === 200) {
            console.log(data?.data)
            const ngodata = data?.data[0]
            setServices(ngodata)
            setNGO_Id(ngodata?.ngo_id)

          } else {
            swal('Error', data.message, 'error');
          }
        });
    }
    catch (error) {
      console.log(error)
    }
  }
  console.log(services)

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
      <Container fluid className='matrimonialform mt-5 mb-5'>
        <Row style={{ justifyContent: 'end' }}>
          <Button className='addbtn' style={{ width: 'auto', marginBottom: '20px' }} onClick={() => Navigate(`/SeniorcitizenNGOServices?id=${ngo_id}`)}>Back To Services List </Button>
        </Row>
        <div className='profilegallery mb-5'>
          <h3 className='text-center'>NGO Services Information</h3>
          <div className='descr-content'>
            <Row>

              <Col lg={4} className='mb-6'>
                <h5>Services Category </h5>
                <p>{services?.service_type}</p>
              </Col>

              <Col lg={4} className='mb-4'>
                <h5>Service Name </h5>
                <p>{services?.service_name}</p>
              </Col>

              <Col lg={4} className='mb-4'>
                <h5>Service Description </h5>
                <p>{services?.service_description}</p>
              </Col>

              <Col lg={12} className='mb-4'>
                <Row>
                  <h5>Service Duration </h5>
                  <Col lg={4} className='mb-2'>
                    <h5>Start Date </h5>
                    <p>{formatDate(services?.service_start_date)}</p>
                  </Col>

                  <Col lg={4} className='mb-4'>
                    <h5>End Date </h5>
                    <p>{formatDate(services?.service_end_date)}</p>
                  </Col>

                </Row>
              </Col>

              <Col lg={4} className='mb-4'>
                <h5>Service Location (Address) </h5>
                <p className='text-break'>{services?.service_location}</p>
              </Col>

              <Col lg={4} className='mb-4'>
                <h5>Service Contact </h5>
                <p>{services?.service_contact}</p>
              </Col>

            </Row>
          </div>
        </div>

      </Container>
    </div>
  )
}

export default SeniorcitizenNGOServicesdetails

