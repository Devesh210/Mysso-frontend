import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {Button, Table} from 'react-bootstrap';

const CompaniesTable = () => {
    const { companies, searchCompanyByText } = useSelector(store => store.company);
    const [filterCompany, setFilterCompany] = useState(companies);
    const navigate = useNavigate();
    useEffect(() => {
        const filteredCompany = companies.length >= 0 && companies.filter((company) => {
            if (!searchCompanyByText) {
                return true
            };
            return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());

        });
        setFilterCompany(filteredCompany);
    }, [companies, searchCompanyByText])
    return (
        <div>
            <Table>
                {/* <caption>A list of your recent registered companies</caption> */}
                <thead>
                    <tr className='text-center'>
                        <th>Logo</th>
                        <th>Name</th>
                        <th>Date</th>
                        <th className="text-right">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        filterCompany?.map((company) => (
                            <tr className='mb-2'>
                                <td className='d-grid justify-content-center'>

                                    <div className='image-table d-grid align-content-center justify-content-center'>
                                        <img  src={company.logoUrl} />
                                    </div>

                                </td>
                                <td className='text-center align-content-center'>{company.name}</td>
                                <td className='text-center align-content-center'>{company.createdAt.split("T")[0]}</td>
                                <td className="text-center cursor-pointer align-content-center">
                                    {/* <Popover>
                                        <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                                        <PopoverContent className="w-32">
                                            <div onClick={() => navigate(`/admin/companies/${company._id}`)} className='flex items-center gap-2 w-fit cursor-pointer'>
                                                <Edit2 className='w-4' />
                                                <span>Edit</span>
                                            </div>
                                        </PopoverContent>
                                    </Popover> */}
                                    <Button onClick={() => navigate(`/admin/companies/${company._id}`)}><i class="fa fa-edit"></i></Button>
                                </td>
                            </tr>

                        ))
                    }
                </tbody>
                <caption>A list of your recent registered companies</caption>
            </Table>
        </div>
    )
}

export default CompaniesTable