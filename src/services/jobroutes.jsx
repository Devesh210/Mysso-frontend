// Job Portal Routes

// Import User Components
import JobSection from '../components/JobPortal/JobSection';
import Jobs from '../components/JobPortal/Jobs';
import JobDescription from '../components/JobPortal/JobDescription';
import Category from "../components/JobPortal/Category";
import EditJobportalform from '../components/JobPortal/EditJobportalform';
import MyJobprofile from '../components/JobPortal/MyJobprofile';
import JobPortalPricing from '../components/JobPortal/components/JobPortalPricing';
import AppliedJobTable from '../components/JobPortal/AppliedJobTable';

// Import Admin Components
import Companies from '../components/JobPortal/admin/Companies';
import CompanyCreate from '../components/JobPortal/admin/CompanyCreate';
import CompanySetup from '../components/JobPortal/admin/CompanySetup';
import AdminJobs from "../components/JobPortal/admin/AdminJobs";
import PostJob from '../components/JobPortal/admin/PostJob';
import Applicants from '../components/JobPortal/admin/Applicants';
import JobSetup from "../components/JobPortal/admin/JobSetup";
import ApplicantTracking from '../components/JobPortal/admin/ApplicantTracking';

// Import Protected Routes
import { ProtectedAdminRoute, ProtectedUserRoute, ProtectJObportalformrouterRoute } from '../hooks';
import RecuiterForm from '../components/JobPortal/components/RecuiterForm';
import JobseekerForm from '../components/JobPortal/components/JobseekerForm';
import GetCompnybyid from '../components/JobPortal/admin/GetCompnybyid';
import ExampleComponent from '../components/JobPortal/admin/ExampleComponent';
import ShortListcandidates from '../components/JobPortal/admin/ShortListcandidates';
import SkeltonLoader from '../hooks/SkeltosLoader';
// Define Routes
const jobroutes = [
    // User Routes
    {
        path: '/JobSection',
        element: <JobSection />,
    },
    {
        path: '/SkeltonLoader',
        element: <SkeltonLoader />,
    },


    {
        path: '/job/RecuiterForm',
        element: <RecuiterForm />,
    },
    {
        path: '/job/JobseekerForm',
        element: <JobseekerForm />,
    },
    {
        path: "/jobs",
        element: <Jobs />,
    },
    {
        path: "/description/:id",
        element: <JobDescription />,
    },
    {
        path: "/categories",
        element: <Category />,
    },
    {
        path: "/JobPortalPricing",
        element: <JobPortalPricing />,
    },


    {
        path: "/job/editdata",
        element: <ProtectedUserRoute component={<EditJobportalform />} />,
    },
    {
        path: "/job/profiledata",
        element: <ProtectedUserRoute component={<MyJobprofile />} />,
    },
    {
        path: "/jobs/applied",
        element: <ProtectedUserRoute component={<AppliedJobTable />} />,
    },

    // Admin Routes (Start Here)
    {
        path: "/admin/companies",
        element: <ProtectedAdminRoute component={<Companies />} />,
    },
    {
        path: "/admin/companies/create",
        element: <ProtectedAdminRoute component={<CompanyCreate />} />,
    },
    {
        path: "/admin/companies/:id",
        element: <ProtectedAdminRoute component={<CompanySetup />} />,
    },
    {
        path: "/company/:id",
        element: <GetCompnybyid />,
    },
    {
        path: "/admin/jobs",
        element: <ProtectedAdminRoute component={<AdminJobs />} />,
    },
    {
        path: "/admin/jobs/create",
        element: <ProtectedAdminRoute component={<PostJob />} />,
    },
    {
        path: "/ExampleComponent",
        element: <ExampleComponent />,
    },

    {
        path: "/admin/job/:id",
        element: <ProtectedAdminRoute component={<JobSetup />} />,
    },
    {
        path: "/admin/jobs/:id/applicants",
        element: <ProtectedAdminRoute component={<Applicants />} />,
    },
    {
        path: "/admin/applicants",
        element: <ProtectedAdminRoute component={<ApplicantTracking />} />,
    },
    {
        path: "/admin/applicants/shortlists",
        element: <ProtectedAdminRoute component={<ShortListcandidates />} />,
    },
];
export default jobroutes