import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Table, Container,Button } from 'react-bootstrap';
const AdminJobsTable = ({ jobs }) => {
    const navigate = useNavigate();
    return (
        <div>
            <Container>
                <Table responsive>
                    <caption>A list of your recent  posted jobs</caption>
                    <thead>
                        <tr>
                            <th className="text-center" >Company Name</th>
                            <th className="text-center">Role</th>
                            <th className="text-center">Date</th>
                            <th className="text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            jobs && jobs?.jobs?.map((job) => (
                                <tr>
                                    <td className="text-center">{job?.company?.name}</td>
                                    <td className="text-center">{job?.title}</td>
                                    <td className="text-center">{job?.createdAt.split("T")[0]}</td>
                                    <td className="text-center cursor-pointer edit-button">
                                        <Button onClick={() => navigate(`/admin/job/${job._id}`)} className='bg-light text-dark border-0 mx-2'><i class="fa fa-edit"></i></Button>
                                        <Button onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)} className='bg-light text-dark border-0 '><i class="fa fa-eye"></i><span className='px-2'>Applicants</span></Button>
                                    </td>
                                </tr>

                            ))
                        }
                    </tbody>
                </Table>
            </Container>
        </div>
    )
}

export default AdminJobsTable