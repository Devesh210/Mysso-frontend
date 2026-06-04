import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import swal from 'sweetalert';
import { setCompanies, setSingleCompany } from '../redux/companySlice'
import { setAllAdminJobs, setAllAppliedJobs, setAllJobs, setAllSimilarJobs, setEditJob, setFIlter } from '../redux/jobSlice'
import { reset, setLoading, setUser } from "../redux/authSlice";
import { JobroutesData as jobroutes } from "../utils/initialData.json"
import {
  useGetAllAdminJobsQuery,
  useGetAllCompaniesQuery,
  useGetAllJobsQuery,
  useGetAllJobsByCategoryQuery,
  useGetAppliedJobsQuery,
  useGetCompanyByIdQuery,
  useGetAdminJobByIdQuery,
  useGetIndustryFiltersQuery,
  useGetAllJobPortalUsersQuery,
  useGetRoleQuery,
  useGetSubscriptionQuery,
  jobPortalApi
} from "../redux/apiSlice"
import axios from 'axios';
import API_URL from '../../config';

import { FilerCardsSkelton, JobsSkelton, Loading, LatestJobsSkelton, CategoriesCarouselSkelton, CategoriesListSkelton } from "./SkeltonsData"
import { setPortalDetails } from '../redux/jobPortalSlice';
import { logTimeSpent, updateLastVisitedPortal } from "../redux/reduxthink/portalLogs"
const useGetAllAdminJobs = (currentPage, itemsPerPage) => {
  const { token, role } = useSelector((state) => state.auth)
  const { searchJobByText } = useSelector(store => store.job);
  const { data: jobs, error, isLoading, refetch } = useGetAllAdminJobsQuery({
    currentPage, itemsPerPage, keyword: searchJobByText
  }, {
    skip: !token || role === "student",
  });


  return { error, isLoading, jobs, totalItems: jobs && jobs.totalJobs || 0, totalPages: jobs && jobs.totalJobs || 0 };

}

const useGetAllCompanies = () => {
  const { token } = useSelector((state) => state.auth)
  const dispatch = useDispatch();
  const { data: companies, error, isLoading } = useGetAllCompaniesQuery(undefined, {
    skip: !token,
  });

  useEffect(() => {
    if (companies?.success) {
      dispatch(setCompanies(companies.companies));
    }
  }, [companies, dispatch]);

  return { error, isLoading };
}
const useGetAllJobs = (limit = 8, page = 1, sort = "") => {
  const { token } = useSelector((state) => state.auth)
  const { location, category, maxSalary, minSalary, min_years, subcategory, max_years, searchedQuery, jobtypes } = useSelector((state) => state.job);

  const { data, error, isLoading, refetch } = useGetAllJobsQuery({ limit, page, subcategory: subcategory, location: location, category: category, searchedQuery: searchedQuery, sort: sort, minSalary, maxSalary, min_years, max_years, jobtype: jobtypes });
  const handleRefetch = async () => {
    try {
      token && await refetch();
    } catch (err) {
      console.error("Refetch failed:", err);
    }
  };
  useEffect(() => {
    handleRefetch()
  }, [location, category, maxSalary, minSalary, min_years, max_years, searchedQuery, jobtypes])

  return { error, isLoading, data: data?.jobs, totalItems: data && data.totalJobs || 0, totalPages: data && data.totalJobs || 0 };

}

const useGetAllJobsByCategory = (limit = 8, page = 1, category, id) => {
  const { token } = useSelector((state) => state.auth)
  const dispatch = useDispatch();
  const { searchedQuery } = useSelector((state) => state.job);
  const { data: jobs, error, isLoading, refetch } = useGetAllJobsByCategoryQuery({ limit, page, category, id, searchedQuery });

  useEffect(() => {
    try {
      refetch()
    } catch (error) {
      return
    }
  }, [id]);

  return { error, isLoading, data: jobs?.jobs };
}

const useGetAppliedJobs = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth)
  const { data: appliedJobs, error, isLoading } = useGetAppliedJobsQuery(undefined, {
    skip: !token,
  });

  useEffect(() => {
    if (appliedJobs?.success) {
      dispatch(setAllAppliedJobs(appliedJobs.application));
    }
  }, [appliedJobs, dispatch]);

  return { error, isLoading };
};

const useGetCompanyById = (company) => {
  const { token } = useSelector((state) => state.auth)
  const dispatch = useDispatch();
  const { data, error, isLoading, refetch } = useGetCompanyByIdQuery({ companyId: company });

  useEffect(() => {
    try {
      refetch()
    } catch (error) {
      return
    }
  }, [data, dispatch]);

  return { error, data: data?.company, isLoading };
}

const useGetAdminJobById = (company, setCities, setStates) => {
  const { token } = useSelector((state) => state.auth);
  const [initialValues, setInitialValues] = useState({});

  const { data: jobData, error, isLoading, refetch } = useGetAdminJobByIdQuery(
    { companyId: company },
    { skip: !token || !company }
  );

  // Fetch cities based on state_id and update state
  const handleStateChange = async (stateId) => {
    try {
      setInitialValues((prevValues) => ({ ...prevValues, state_id: stateId }));
      const cityRes = await axios.get(
        `${API_URL}/api/getcitybystate?state_id=${stateId}`
      );
      const cities = cityRes.data.data;
      setCities(cities);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  // Fetch states based on country_id and update state
  const getState = async (country_id) => {
    try {
      const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      };
      const response = await fetch(
        `${API_URL}/api/getstatebycountry?country_id=${country_id}`,
        requestOptions
      );
      const data = await response.json();
      setStates(data.data);
    } catch (err) {
      console.error(err.message);
    }
  };
  const handleRefetch = async () => {
    try {
      token && await refetch();
    } catch (err) {
      console.error("Refetch failed:", err);
    }
  };
  // Refetch job data when company changes
  useEffect(() => {

    handleRefetch()

  }, [company]);

  // Update initial values when jobData changes
  useEffect(() => {
    if (jobData?.success) {
      const editJob = jobData.job;
      const initialData = {
        title: editJob.title || "",
        description: editJob.description || "",
        short_description: editJob.short_description || "",
        requirements: editJob.requirements || "",
        skills: editJob.skills || [],
        benefits: editJob.benefits || [],
        salary1: editJob.salary_range?.min || "",
        salary2: editJob.salary_range?.max || "",
        state_id: editJob.state_id || "",
        city_id: editJob.city_id || "",
        country_id: editJob.country_id || "",
        jobType: editJob.jobType || "",
        position: editJob.position || "",
        min_years: editJob.experience?.min_years || "",
        max_years: editJob.experience?.max_years || "",
        education: editJob.education || "",
        category: editJob.category || "",
        tags: editJob.tags || [],
        interview_process: editJob.interview_process || "",
        additional_instructions: editJob.additional_instructions || "",
        application_deadline: editJob.application_deadline || "",
      };
      setInitialValues(initialData);

      const setData = async () => {
        // Fetch states and cities after setting initial data
        if (editJob.country_id) {
          await getState(editJob.country_id);
        }
        if (editJob.state_id) {
          await handleStateChange(editJob.state_id);
        }
      }
      setData()
    }
  }, [jobData]); // Removed `dispatch` from the dependency array

  return { initialValues, error, isLoading };
};



const useGetJObCategories = (currentPage = 1, perPage = 8) => {
  const { token } = useSelector((state) => state.auth)
  const { data, error, isLoading } = useGetIndustryFiltersQuery({ page: currentPage, limit: perPage });


  return {
    categories: data && data?.data || [],
    error,
    totalItems: data?.totalCount || 0,
    isLoading
  };
}

const useGetAllJobPortalUsers = (currentPage = 1, perPage = 8) => {
  const { data, error, isLoading } = useGetAllJobPortalUsersQuery({ currentPage, perPage });
  const { token } = useSelector((state) => state.auth)
  return {
    users: data?.data || [],
    error,
    totalItems: data?.totalCount || 0,
    isLoading
  };
}
const useGetFiltersData = (endpoint = [
  "locationData", "industryData",

]) => {
  console.log("endpoint", endpoint)
  const dispatch = useDispatch();
  // Initial State
  const [search, setSearch] = useState({
    locationpage: 1,
    industrypage: 1,
    locationData: [],
    industryData: [],
    FunctionalAreas: [],
    CareerLevel: []

  })


  // Function to handle state update
  const handleChangeData = (name, value) => {
    setSearch((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Fetch all location data
  const fetchAllLocations = async () => {
    let currentPage = 1;
    let allLocationData = [];

    while (true) {
      const data = await dispatch(
        jobPortalApi.endpoints.getLocationFilters.initiate({ page: currentPage, limit: 10 })
      ).unwrap();
      console.log(data)
      allLocationData = Array.from(new Set([...allLocationData, ...data.data]))

      if (!data.hasMore) break;
      currentPage = currentPage + 1
    }

    handleChangeData("locationData", allLocationData);
  };

  // Fetch all industry data
  const fetchAllIndustries = async () => {
    let currentPage = 1;
    let allIndustryData = [];

    while (true) {
      const data = await dispatch(
        jobPortalApi.endpoints.getIndustryFilters.initiate({ page: currentPage, limit: 10 })
      ).unwrap();

      allIndustryData = Array.from(new Set([...allIndustryData, ...data.data]))

      if (!data.hasMore) break;

      currentPage = currentPage + 1
    }
    handleChangeData("industryData", allIndustryData);
  };
  // Fetch all industry data
  const fetchAllFunctionalArea = async () => {
    let currentPage = 1;
    let allIndustryData = [];

    while (true) {
      const data = await dispatch(
        jobPortalApi.endpoints.getFunctionalAreas.initiate({ page: currentPage, limit: 10 })
      ).unwrap();

      allIndustryData = Array.from(new Set([...allIndustryData, ...data.data]))

      if (!data.hasMore) break;

      currentPage = currentPage + 1
    }
    handleChangeData("FunctionalAreas", allIndustryData);
  };
  const fetchAllCareerLevel = async () => {
    let currentPage = 1;
    let allIndustryData = [];

    while (true) {
      const data = await dispatch(
        jobPortalApi.endpoints.getCareerLevels.initiate({ page: currentPage, limit: 10 })
      ).unwrap();

      allIndustryData = Array.from(new Set([...allIndustryData, ...data.data]))

      if (!data.hasMore) break;

      currentPage = currentPage + 1
    }
    handleChangeData("CareerLevel", allIndustryData);
  };
  useEffect(() => {
    endpoint.includes("locationData") && fetchAllLocations();
    endpoint.includes("industryData") && fetchAllIndustries();
    endpoint.includes("FunctionalAreas") && fetchAllFunctionalArea()
    endpoint.includes("CareerLevel") && fetchAllCareerLevel()
  }, [])
  return search
}
// Custom debounce hook
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};


const useValidateJobDescription = (setmodal) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth)
  const { data: profile, error, isLoading } = useGetRoleQuery(undefined, {
    skip: !token,
  });
  const [timestatmp, setTimestatmp] = useState(Date.now());

  useEffect(() => {
    if (profile?.success) {
      let response = profile.data;

      if (response && !response.role) {
        swal("Error", "Please Select Your Role", "error").then(() => {
          navigate('/profile');
        });
        setmodal(false);
      }
    } else if (error) {
      swal("Error", "Something went wrong", "error").then(() => {
        setmodal(false);
      });
    }
    dispatch(setLoading(isLoading));
  }, [profile, error, isLoading, dispatch, navigate, setmodal, timestatmp]);

  return {
    data: profile?.data,
    setTimestatmp
  };
};

const useGetRole = () => {
  const { token } = useSelector((state) => state.auth)
  const dispatch = useDispatch();
  const { data: role, error, isLoading, refetch, isError } = useGetRoleQuery(undefined, {
    skip: !token,
  });

  useEffect(() => {
    const handleRefetch = async () => {
      try {
        token && await refetch();
        // role?.data && token && dispatch(setJobProfileData(role.data));
      } catch (err) {
        console.error("Refetch failed:", err);
      }
    };
    handleRefetch()
    if (!token) {
      dispatch(reset())
    } else {

      console.log(" error, isLoading", error, isLoading)
    }

  }, [token, role]);

  useEffect(() => {
    if (isError) {
      dispatch(reset())
      console.log("Error fetching role:", error);
    } else {
      console.log({ error, role, isError });
    }
  }, [error, role, isError]);


  return { error, isLoading };
}

const useGetJobProfile = () => {
  const { token, data } = useSelector((state) => state.auth)

  const { data: role, error, isLoading, refetch } = useGetRoleQuery(undefined, {
    skip: !token,
  });
  console.log({ role })
  useEffect(() => {
    try {
      refetch()
    } catch (error) {
      return
    }
  }, [data])
  return { data: role?.data, error, isLoading };
}

const usegetSubsription = () => {
  const { token } = useSelector((state) => state.auth)
  const { data, error, isLoading } = useGetSubscriptionQuery(undefined, {
    skip: !token,
  });
  const SubscriptionisRequired = error ? true : false
  const message = error?.data?.message || data?.message || "Subscription Not found";

  return { SubscriptionisRequired, message, isLoading };
}

// Keeping non-axios functions as they are
const ProtectedAdminRoute = ({ component }) => {
  const { token, role } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const isAuthenticated = !!token; // More concise way to check if token exists

  useEffect(() => {
    if (!isAuthenticated) {
      // If not authenticated, show an alert and navigate to login
      // swal("Unauthorized", "You need to be logged in to access this page.", "warning")
      //   .then(() =>
      navigate("/login", { state: window.location.pathname })
      // );
    } else if (role !== 'recruiter') {
      // If authenticated but not a recruiter, show a different message
      // swal("Access Denied", "You do not have the required permissions to access this page.", "error")
      //   .then(() =>
      navigate("/login", { state: window.location.pathname })
      // ); // Navigate to login or an appropriate route
    }
  }, [isAuthenticated, role, navigate]);

  // Render the element if authenticated and the role is 'recruiter'
  return isAuthenticated && role === 'recruiter' ? (
    React.cloneElement(component, { isAuthenticated })
  ) : null; // Return null if not authorized
};
const ProtectJObportalformrouterRoute = ({ component }) => {
  const { token, role } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const isAuthenticated = !!token; // More concise way to check if token exists

  useEffect(() => {
    if (!isAuthenticated) {
      // If not authenticated, show an alert and navigate to login
      // swal("Unauthorized", "You need to be logged in to access this page.", "warning")
      //   .then(() =>
      navigate("/login")
      // );
    } else if (role !== '') {
      // If authenticated but not a recruiter, show a different message
      // swal("Access Denied", "You do not have the required permissions to access this page.", "error")
      //   .then(() =>
      // navigate("/profile", { state: window.location.pathname })
      // ); // Navigate to login or an appropriate route
    }
  }, [isAuthenticated, role, navigate]);

  // Render the element if authenticated and the role is 'recruiter'
  // return isAuthenticated && role === '' ? (
  return React.cloneElement(component, { isAuthenticated })
  // ) : null; // Return null if not authDorized
};


const ProtectedUserRoute = ({ component }) => {
  const { token, role } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {

      navigate("/login");

    } else if (token && role === '') {
      // If the user is authenticated but does not have a role, show a different message
      // swal("Role Not Found", "Your role is not defined. Please contact support or try again later.", "info")
      //   .then(() => {

      navigate("/job/JobseekerForm", { state: window.location.pathname });  // Navigate to job add data route or any other route
      // });
    }
  }, [token, role, navigate]);

  const isAuthenticated = token && role !== '';

  // Render the element if authenticated and role is present, otherwise render nothing
  return isAuthenticated ? React.cloneElement(component, { isAuthenticated }) : null;
};





function SpinLoader({ name = "" }) {
  switch (name) {
    case "FilterCard":
      return <FilerCardsSkelton />
      break;
    case "jobs":
      return <JobsSkelton />
      break;
    case "latestjobs":
      return <LatestJobsSkelton />
      break;
    case "CategoriesCarousel":
      return <CategoriesCarouselSkelton />
      break;
    case "Category":
      return <CategoriesListSkelton />
      break;

    default:
      return <Loading />
      break;
  }




}
const useScrollablePagination = (data, itemsPerPage = 10, total = 0, currentPage, setCurrentPage) => {
  const [paginatedOptions, setPaginatedOptions] = useState([]);

  // Total number of pages is based on the total items provided
  const totalPages = total;

  // Handle loading more options when scrolling
  const loadMore = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Update paginated options when currentPage or data changes
  useEffect(() => {
    if (data) {
      if (currentPage === 1) {
        setPaginatedOptions(data);
      } else {
        const newData = data
        setPaginatedOptions((prevOptions) => {
          const combinedOptions = [...prevOptions, ...newData];
          const uniqueOptions = combinedOptions.filter(
            (option, index, self) => index === self.findIndex(o => o._id === option._id)
          );
          return uniqueOptions;
        });
      }
    }

    console.log("currentPage", currentPage);
    console.log("totalPages", totalPages);
  }, [currentPage, data]);

  return {
    paginatedOptions,
    loadMore,
    currentPage,
    totalPages,
  };
};

const useIndustryPaginatedOptions = () => {
  const [page, setPage] = useState(1);
  const [options, setOptions] = useState([]);
  const [keyword, setkeyword] = useState('');
  const [hasMore, setHasMore] = useState(true);
  const [debounceTimeout, setDebounceTimeout] = useState(null); // For custom debouncing
  // Fetch data with pagination and search term
  const { data: Industry, isFetching, isSuccess } = useGetIndustryFiltersQuery({ page, keyword });

  // Append new options when data is successfully fetched
  useEffect(() => {
    if (isSuccess && Industry?.data) {
      setOptions((prevOptions) => (page === 1 ? Industry.data : [...prevOptions, ...Industry.data]));
      setHasMore(Industry.hasMore); // Update hasMore based on the API response
    }
  }, [Industry, isSuccess, page]);

  // Function to load the next page
  const loadMore = () => {
    if (hasMore && !isFetching) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  // Custom debounce function for search input
  const debouncedSearch = useCallback((value) => {
    if (debounceTimeout) {
      clearTimeout(debounceTimeout); // Clear the previous timeout if a new search is made
    }

    const newTimeout = setTimeout(() => {
      setPage(1); // Reset page when a new search is made
      // setOptions([]); // Clear options to show fresh results
      setkeyword(value);
    }, 500); // Delay of 500ms

    setDebounceTimeout(newTimeout); // Store the new timeout
  }, [debounceTimeout]);

  return {
    options,
    isFetching,
    loadMore,
    hasMore,
    debouncedSearch,
  };
};
const useLocationPaginatedOptions = () => {
  const [page, setPage] = useState(1);
  const [options, setOptions] = useState([]);
  const [keyword, setkeyword] = useState('');
  const [hasMore, setHasMore] = useState(true);
  const [debounceTimeout, setDebounceTimeout] = useState(null); // For custom debouncing

  // Fetch data with pagination and search term
  const { data: Industry, isFetching, isSuccess } = useGetLocationFiltersQuery({ page, keyword });

  // Append new options when data is successfully fetched
  useEffect(() => {
    if (isSuccess && Industry?.data) {
      setOptions((prevOptions) => (page === 1 ? Industry.data : [...prevOptions, ...Industry.data]));
      setHasMore(Industry.hasMore); // Update hasMore based on the API response
    }
  }, [Industry, isSuccess, page]);

  // Function to load the next page
  const loadMore = () => {
    if (hasMore && !isFetching) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  // Custom debounce function for search input
  const debouncedSearch = useCallback((value) => {
    if (debounceTimeout) {
      clearTimeout(debounceTimeout); // Clear the previous timeout if a new search is made
    }

    const newTimeout = setTimeout(() => {
      setPage(1); // Reset page when a new search is made
      // setOptions([]); // Clear options to show fresh results
      setkeyword(value);
    }, 500); // Delay of 500ms

    setDebounceTimeout(newTimeout); // Store the new timeout
  }, [debounceTimeout]);

  return {
    options,
    isFetching,
    loadMore,
    hasMore,
    debouncedSearch,
  };
};
const UseJobPortalVisitorHandler = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token); // Assuming token is stored in Redux state
  const { portal, startTime } = useSelector((state) => state.portal); // Fetch portal and start time from Redux state

  const previousPath = useRef(null);

  useEffect(() => {
    const currentRoute = jobroutes.find((route) =>
      new RegExp(`^${route.path.replace(/:\w+/g, "\\w+")}$`).test(location.pathname)
    );

    console.log("Current route:", currentRoute?.path || "Not Found");

    // If there's a previous path and it's part of jobroutes, log time spent
    if (previousPath.current) {
      const previousRoute = jobroutes.find((route) =>
        new RegExp(`^${route.path.replace(/:\w+/g, "\\w+")}$`).test(previousPath.current)
      );

      if (previousRoute && portal && startTime) {
        dispatch(
          logTimeSpent({
            portal,
            start_time: startTime,
            end_time: new Date(),
          })
        )
          .unwrap()
          .then(() => console.log(`Logged time spent on ${portal}`))
          .catch((error) => console.error("Error logging time:", error));
      }
    }

    // Update the portal details if on a valid job route
    if (currentRoute && token) {
      handleJobPortal(currentRoute.path);
    }

    // Update the previous path reference
    previousPath.current = location.pathname;
  }, [location.pathname, token]);

  const handleJobPortal = async (currentPath) => {
    try {
      if (!portal || !startTime) {
        dispatch(setPortalDetails({ portal: "job", startTime: new Date() }));
        return;
      }

      // Update the last visited portal
      await dispatch(updateLastVisitedPortal({ portal: "job" })).unwrap();

      // Set new portal details in Redux state
      dispatch(setPortalDetails({ portal: "job", startTime: new Date() }));
    } catch (error) {
      console.error("Error in handleJobPortal:", error);
    }
  };
};


export {
  SpinLoader, useScrollablePagination,
  useIndustryPaginatedOptions, useLocationPaginatedOptions,
  useGetJobProfile, ProtectJObportalformrouterRoute,
  useGetAllJobsByCategory,
  useGetAllAdminJobs,
  usegetSubsription,
  useGetAllCompanies,
  useGetAllJobs,
  useGetRole,
  useGetAppliedJobs,
  useGetCompanyById,
  useGetJObCategories,
  useValidateJobDescription,
  useGetAdminJobById,
  ProtectedUserRoute, UseJobPortalVisitorHandler,
  ProtectedAdminRoute, useDebounce,
  useGetAllJobPortalUsers, useGetFiltersData
};
