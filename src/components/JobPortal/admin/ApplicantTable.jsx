import React from 'react'
import { Table } from 'react-bootstrap';
import { useApplicatSTatuschangeMutation } from '../../../redux/apiSlice';
import { Alert, Button } from 'react-bootstrap';
const shortlistingStatus = ["accepted", "rejected"];

const ApplicantsTable = ({ applicants, refetch }) => {
    // Ensure that refetch is available and a function

    const [updateStatus] = useApplicatSTatuschangeMutation()
    const statusHandler = async (status, id) => {
        // console.log('called');
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
                                    <td className='text-center pt-3 pb-3'>
                                        {
                                            item?.applicant?.additionalInformation?.resumeurl ? <a className="text-blue-600 cursor-pointer" href={item?.applicant?.additionalInformation?.resumeurl} target="_blank" rel="noopener noreferrer">{item?.applicant?.additionalInformation?.resumeOriginalName.length > 15 ? item?.applicant?.additionalInformation?.resumeOriginalName?.substring(-1, 15) + "..." : item?.applicant?.additionalInformation?.resumeOriginalName}</a> : <span>NA</span>
                                        }
                                    </td>
                                </td>
                                <td className='text-center pt-3 pb-3'>{new Date(item?.createdAt).toLocaleDateString('en-uk')}</td>
                                <td className='text-capitalize text-center pt-3 pb-3'>{item.status}</td>
                                <td className="text-center cursor-pointer pt-3 pb-3">
                                    <span className='d-inline-flex '>
                                        {
                                            shortlistingStatus.map((status, index) => (

                                                !item?.status?.includes(status) && (
                                                    <div onClick={() => statusHandler(status, item?._id)} key={index} className=' mx-2 cursor-pointer'>
                                                        <Button className={`text-capitalize text-light border-0 bg-${status === "rejected" ? 'danger' : 'success'}`}><span>{status.replace("ed", "")}</span></Button>
                                                    </div>
                                                )
                                            ))
                                        }
                                    </span>
                                </td>

                            </tr>
                        ))
                    }

                </tbody>

            </Table>
        </div>
    )
}

export default ApplicantsTable