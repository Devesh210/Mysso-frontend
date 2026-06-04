import React from 'react'
import { Table } from 'react-bootstrap';
import { useApplicatSTatuschangeMutation } from '../../../redux/apiSlice';
import { Container, Button } from 'react-bootstrap';

const ApplicantTrackingTable = ({ applicants, refetch }) => {
    const [updateStatus] = useApplicatSTatuschangeMutation()
    const statusHandler = async (status, id) => {
        try {
            // Use RTK Query mutation to perform the API call
            const res = await updateStatus({ status, id }).unwrap();

            console.log({ res });
            if (res?.success) {
                refetch()
                swal({ text: "Status Updated ", icon: "success" });
            }
        } catch (error) {
            console.log("error", error)
            swal({ text: error?.response?.message, icon: "error" });
        }

    }

    return (
        <div>
            <Container>
                <Table>
                    <caption>A list of your recent applied user</caption>
                    <thead>
                        <tr>
                            <th className='text-center'>FullName</th>
                            <th className='text-center'>Email</th>
                            <th className='text-center'>Contact</th>
                            <th className='text-center'>Resume</th>
                            <th className='text-center'>Date</th>
                            <th className='text-center'>Application Status</th>
                            <th className="text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            applicants && applicants?.map((item) => (
                                <tr key={item._id} >
                                    <td className='text-center pt-3 pb-3'>{item?.applicant?.personalDetails?.first_name + item?.applicant?.personalDetails?.last_name}</td>
                                    <td className='text-center pt-3 pb-3'>{item?.applicant?.email}</td>
                                    <td className='text-center pt-3 pb-3'>{item?.applicant?.ContactDetails?.phone}</td>
                                    <td className='text-center pt-3 pb-3'>
                                        {
                                            item?.applicant?.additionalInformation?.resumeurl ? <a className="text-blue-600 cursor-pointer" href={item?.applicant?.additionalInformation?.resumeurl} target="_blank" rel="noopener noreferrer">{item?.applicant?.additionalInformation?.resumeOriginalName?.length > 15 ? item?.applicant?.additionalInformation?.resumeOriginalName?.substring(-1, 15) : item?.applicant?.additionalInformation?.resumeOriginalName}</a> : <span>NA</span>
                                        }
                                    </td>

                                    <td className='text-center pt-3 pb-3'>{new Date(item?.createdAt).toLocaleDateString('en-uk')}</td>
                                    <td className={`text-capitalize text-center pt-3 pb-3 text-${item.status === "rejected" ? 'danger' : item.status === 'pending' ? 'secondary' : 'success'}`}>{item.status}</td>
                                    <td className="text-center cursor-pointer pt-3 pb-3">
                                        {
                                            shortlistingStatus.map((status, index) => (

                                                !item?.status?.includes(status) && (
                                                    <div onClick={() => statusHandler(status, item?._id)} key={index} className=' mx-2 cursor-pointer'>
                                                        <Button c className={`text-capitalize text-light border-0 bg-${status === "rejected" ? 'danger' : 'success'}`}><span>{status.replace("ed", "")}</span></Button>
                                                    </div>
                                                )
                                            ))
                                        }
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

export default ApplicantTrackingTable