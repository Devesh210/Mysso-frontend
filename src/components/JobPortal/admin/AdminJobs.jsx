import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import AdminJobsTable from './AdminJobsTable'
import { SpinLoader, useGetAllAdminJobs } from '../../../hooks'
import { setSearchJobByText } from '../../../redux/jobSlice'
import usePaginationhook from '../../../hooks/usePaginationhook'
import { Button, Container } from 'react-bootstrap'

const AdminJobs = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setitemsPerPage] = useState(5)
  const { totalItems, totalJobs, error, jobs, isLoading } = useGetAllAdminJobs(currentPage, itemsPerPage);
  const { searchJobByText } = useSelector(store => store.job);
  const [input, setInput] = useState("")
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // Handle page change
  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  // Use the custom hook for pagination
  const pagination = usePaginationhook({
    totalItems: totalItems,
    perPage: itemsPerPage,
    currentPage: currentPage,
    onPageChange,
  });
  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [input]);
  return (
    <div>
      <Container>
        <div className='max-w-6xl mx-auto my-10'>
          <div className='d-flex items-center justify-content-between my-5'>
            <input
              className="w-fit form-control"
              placeholder=" Filter by  role,description,skills,tags"
              value={searchJobByText}
              onChange={(e) => setInput(e.target.value)}
            />
            <Button onClick={() => navigate("/admin/jobs/create")} className='search-partner add-company mb-0 mt-0'>New Jobs</Button>
          </div>
          {
            isLoading ? <SpinLoader /> : <>
              <AdminJobsTable jobs={jobs} />
              {pagination}
            </>
          }

        </div>
      </Container>
    </div>
  )
}

export default AdminJobs