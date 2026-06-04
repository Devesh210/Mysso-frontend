import Homepage from "../pages/Homepage";
import Matrimonial from "../pages/Matrimonial";
import Matrimonialsearch from "../pages/Matrimonialsearch";
import Matrimonialform from "../components/pages/matrimonial/Matrimonialform";
import Matrimonialprofile from "../components/pages/matrimonial/Matrimonialprofile";
import Temps from "../components/pages/matrimonial/Temps";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { AuthProvider } from "./AuthContext";
import ProtectedRoute from "./ProtectedRoute";
import Profile from "../components/pages/profile/Profile";
import Userprofile from "../components/pages/profile/Userprofile";
import MyMatrimonyprofile from "../components/pages/profile/MyMatrimonyprofile";
import EditProfile from "../components/pages/profile/EditProfile";
import MatrimonyShortlisted from "../components/pages/profile/MatrimonyShortlisted";
import MatrimonyInterested from "../components/pages/profile/MatrimonyInterested";
import MatrimonyRequest from "../components/pages/profile/MatrimonyRequest";
import Aboutus from "../pages/Aboutus";
import Registerdetail from "../pages/Registerdetail";
import Nodatafound from "../components/pages/nodatafound/Nodatafound";
import ViewFavouriteProfile from "../components/pages/profile/ViewFavouriteProfile";
import ViewFavoriterequestprofiles from "../components/pages/profile/ViewFavoriterequestprofiles";
import Matchedprofile from "../components/pages/profile/Matchedprofile";
import { path } from "./path";
import Termsandcondition from "../pages/Termsandcondition";
import Cancellation from "../pages/Cancellation";
import Privacypolicy from "../pages/Privacypolicy";
import Disclaimer from "../pages/Disclaimer";
import Contactus from "../components/pages/Contactus";
import Faqs from "../components/pages/Faqs";
import Plandetails from "../components/pages/profile/Plandetails";
// import ChatApplication from "../components/pages/matrimonial/ChatApplication";
// import AllChatApplication from "../components/pages/matrimonial/AllChatApplication";
import Forgotpassword from "../pages/Forgotpassword";
import ResetPassword from "../pages/ResetPassword";
import Withoutchapters from "../components/pages/business/Withoutchapters";
import Withchapters from "../components/pages/business/Withchapters";
import Businessdetailpage from "../components/pages/business/Businessdetailpage";
import Businesslist from "../components/pages/business/Businesslist";
import Businessform from "../components/pages/business/Businessform";
import Professionalform from "../components/pages/business/Professionalform";
import Businesseditform from "../components/pages/business/Businesseditform";
import Professionaleditform from "../components/pages/business/Professionaleditform";
import Businessdetails from "../components/pages/business/Businessdetails";
import Professiondetails from "../components/pages/profile/Professiondetails";
import Professionaldetailpage from "../components/pages/business/Professionaldetailpage";
import Startup from "../components/pages/startup/Startup";
import Startupnew from "../components/pages/startup/Startupnew";
import jobroutes from "./jobroutes";
import Startupform from "../components/pages/startup/Startupform";
import Investorform from "../components/pages/startup/Investorform";
import Startupprofile from "../components/pages/startup/Startupprofile";
import Investorprofile from "../components/pages/startup/Investorprofile";
import Startupeditprofile from "../components/pages/startup/Startupeditprofile";
import Investoreditprofile from "../components/pages/startup/Investoreditprofile";
import StartupList from "../components/pages/startup/StartupList";
import InvestorList from "../components/pages/startup/InvestorList";
import Startupdetails from "../components/pages/startup/Startupdetails";
import Investordetails from "../components/pages/startup/Investordetails";
import Ourteam from "../pages/Ourteam";
import Ourdirectors from "../pages/Ourdirectors";
import Governmentregistration from "../pages/Governmentregistration";
import Achievements from "../pages/Achievements";
import Support from "../components/pages/support/Support";

import Educationalsupport from "../components/pages/support/Educational/Educationalsupport";
import EducationStudentForm from "../components/pages/support/Educational/EducationStudentForm";
import EducationExpertform from "../components/pages/support/Educational/EducationExpertform";
import EducationStudentProfile from "../components/pages/support/Educational/EducationStudentProfile";
import EducationStudentEditprofile from "../components/pages/support/Educational/EducationStudentEditprofile";
import EducationExpertprofile from "../components/pages/support/Educational/EducationExpertprofile";
import EducationExpertEditprofile from "../components/pages/support/Educational/EducationExpertEditprofile";
import EducationViewExpertprofile from "../components/pages/support/Educational/EducationViewExpertprofile";
import EducationalExpertStudentView from "../components/pages/support/Educational/EducationalExpertStudentView";
import EducationalExpertStudentProfileview from "../components/pages/support/Educational/EducationalExpertStudentProfileview";

import Medicalsupport from "../components/pages/support/Medical/Medicalsupport";
import MedicalEndUserform from "../components/pages/support/Medical/MedicalEndUserform";
import MedicalHospitalForm from "../components/pages/support/Medical/MedicalHospitalForm";
import MedicalHospitalServicesForm from "../components/pages/support/Medical/MedicalHospitalServicesForm";
import MedicalEnduserProfile from "../components/pages/support/Medical/MedicalEnduserProfile";
import MedicalHospitalProfile from "../components/pages/support/Medical/MedicalHospitalProfile";
import MedicalEnduserEditProfile from "../components/pages/support/Medical/MedicalEnduserEditProfile";
import MedicalHospitalEditProfile from "../components/pages/support/Medical/MedicalHospitalEditProfile";
import MedicalHospitalServicesList from "../components/pages/support/Medical/MedicalHospitalServicesList";
import MedicalHospitalServicesView from "../components/pages/support/Medical/MedicalHospitalServicesView";
import MedicalHospitalServicesEdit from "../components/pages/support/Medical/MedicalHospitalServicesEdit";
import MedicalHospitalView from "../components/pages/support/Medical/MedicalHospitalView";
import MedicalHospitalServices from "../components/pages/support/Medical/MedicalHospitalServices";
import MedicalHospitalServicesdetails from "../components/pages/support/Medical/MedicalHospitalServicesdetails";

import Seniorcitizen from "../components/pages/support/SeniorCitizen/Seniorcitizen";
import SeniorCitizenForm from "../components/pages/support/SeniorCitizen/SeniorCitizenForm";
import SeniorNGOForm from "../components/pages/support/SeniorCitizen/SeniorNGOForm";
import SeniorcitizenNGOEditProfile from "../components/pages/support/SeniorCitizen/SeniorcitizenNGOEditProfile";
import SeniorcitizenNGOServicesForm from "../components/pages/support/SeniorCitizen/SeniorcitizenNGOServicesForm";
import SeniorcitizenNGOServicesList from "../components/pages/support/SeniorCitizen/SeniorcitizenNGOServicesList";
import SeniorcitizenNGOServicesView from "../components/pages/support/SeniorCitizen/SeniorcitizenNGOServicesView";
import SeniorcitizenNGOServicesEdit from "../components/pages/support/SeniorCitizen/SeniorcitizenNGOServicesEdit";
import SeniorcitizenNGOServices from "../components/pages/support/SeniorCitizen/SeniorcitizenNGOServices";
import SeniorcitizenNGOView from "../components/pages/support/SeniorCitizen/SeniorcitizenNGOView";
import SeniorcitizenNGOServicesdetails from "../components/pages/support/SeniorCitizen/SeniorcitizenNGOServicesdetails";
import SeniorCitizenProfile from "../components/pages/support/SeniorCitizen/SeniorCitizenProfile";
import SeniorCitizenEditProfile from "../components/pages/support/SeniorCitizen/SeniorCitizenEditProfile";
import SeniorcitizenNGOProfile from "../components/pages/support/SeniorCitizen/SeniorcitizenNGOProfile";
import NetworkSupport from "../components/pages/business/NetworkSupport";

import Aboutmember from "../components/pages/members/Aboutmember";
import Aboutmemberdetail from "../components/pages/members/Aboutmemberdetail";
import Becamemember from "../components/pages/members/Becamemember";
import MemberForm from "../components/pages/members/MemberForm";
import MemberProfile from "../components/pages/members/MemberProfile";
import MemberProfileEdit from "../components/pages/members/MemberProfileEdit";
import PatronMember from "../components/pages/members/PatronMember";
import ChiefPatronMember from "../components/pages/members/ChiefPatronMember";
import DirectorMember from "../components/pages/members/DirectorMember";
import Feedbackform from "../pages/Feedbackform ";



export const routes = [
  {
    name: "HomePage",
    path: path.home,
    exact: true,
    element: <Homepage />,
  },
  {
    name: "No Data Found",
    path: path.notfound,
    exact: true,
    element: <Nodatafound />,
  },
  {
    name: "Matrimonial",
    path: path.matrimonial,
    exact: true,
    element: < Matrimonial />,
  },
  {
    name: "Matrimonialsearch",
    path: path.matrimonialsearch,
    exact: true,
    // element: <Matrimonialsearch />,
    element: <ProtectedRoute element={<Matrimonialsearch />} />,
  },

  {
    name: "Matrimonialform",
    path: path.temp,
    exact: true,
    element: <Temps />,
  },
  {
    name: "Matrimonialprofile",
    path: path.Matrimonialprofile,
    exact: true,
    // element: <Matrimonialprofile />,
    element: <ProtectedRoute element={<Matrimonialprofile />} />,
  },
  {
    name: "Matrimonialform",
    path: path.Matrimonialform,
    exact: true,
    // element: <Matrimonialform />,
    element: <ProtectedRoute element={<Matrimonialform />} />,
  },
  {
    name: "Profile",
    path: path.Profile,
    exact: true,
    // element: <Userprofile />,
    element: <ProtectedRoute element={<Userprofile />} />,

  },
  {
    name: "Profile",
    path: path.MyMatrimonyprofile,
    exact: true,
    // element: <MyMatrimonyprofile />,
    element: <ProtectedRoute element={<MyMatrimonyprofile />} />,

  },
  {
    name: "EditProfile",
    path: path.EditProfile,
    exact: true,
    // element: <EditProfile />,
    element: <ProtectedRoute element={<EditProfile />} />,

  },
  {
    name: "MatrimonyShortlisted",
    path: path.MatrimonyShortlisted,
    exact: true,
    // element: <MatrimonyShortlisted />,
    element: <ProtectedRoute element={<MatrimonyShortlisted />} />,

  },
  {
    name: "MatrimonyInterested",
    path: path.MatrimonyInterested,
    exact: true,
    // element: <MatrimonyInterested />,
    element: <ProtectedRoute element={<MatrimonyInterested />} />,
  },
  {
    name: "MatrimonyRequest",
    path: path.MatrimonyRequest,
    exact: true,
    element: <ProtectedRoute element={<MatrimonyRequest />} />,
  },
  {
    name: "ViewFavouriteProfile",
    path: path.ViewFavouriteProfile,
    exact: true,
    element: <ProtectedRoute element={<ViewFavouriteProfile />} />,
  },
  {
    name: "ViewFavoriterequestprofiles",
    path: path.ViewFavoriterequestprofiles,
    exact: true,
    element: <ProtectedRoute element={<ViewFavoriterequestprofiles />} />,
  },
  {
    name: "Matchedprofile",
    path: path.Matchedprofile,
    exact: true,
    element: <ProtectedRoute element={<Matchedprofile />} />,
  },
  {
    name: "Login",
    path: path.Login,
    layout: "noHeaderFooterPaths",
    exact: true,
    element: <Login />,
  },
  {
    name: "ForgotPassword",
    layout: "noHeaderFooterPaths",
    path: path.Forgotpassword,
    exact: true,
    element: <Forgotpassword />,
  },
  {
    name: "ResetPassword",
    layout: "noHeaderFooterPaths",
    path: path.ResetPassword,
    exact: true,
    element: <ResetPassword />,
  },
  {
    name: "Register",
    layout: "noHeaderFooterPaths",
    path: path.Register,
    exact: true,
    element: <Register />,
  },
  {
    name: "Register details",
    path: path.Registerdetail,
    exact: true,
    layout: "noHeaderFooterPaths",
    element: <Registerdetail />,
  },
  {
    name: "Aboutus",
    path: path.Aboutus,
    exact: true,
    element: <Aboutus />,
  },
  {
    name: "Ourteam",
    path: path.Ourteam,
    exact: true,
    element: <Ourteam />,
  },
  {
    name: "Ourdirectors",
    path: path.Ourdirectors,
    exact: true,
    element: <Ourdirectors />,
  },
  {
    name: "Governmentregistration",
    path: path.Governmentregistration,
    exact: true,
    element: <Governmentregistration />,
  },
  {
    name: "Achievements",
    path: path.Achievements,
    exact: true,
    element: <Achievements />,
  },
  {
    name: "Terms and condition",
    path: path.Termsandcondition,
    exact: true,
    element: <Termsandcondition />,
  },
  {
    name: "Aboutus",
    path: path.Cancellation,
    exact: true,
    element: <Cancellation />,
  },
  {
    name: "Privacy Policy",
    path: path.Privacypolicy,
    exact: true,
    element: <Privacypolicy />,
  },
  {
    name: "Disclaimer",
    path: path.Disclaimer,
    exact: true,
    element: <Disclaimer />,
  },
  {
    name: "Contactus",
    path: path.Contactus,
    exact: true,
    element: <Contactus />,
  },
  {
    name: "Faqs",
    path: path.Faqs,
    exact: true,
    element: <Faqs />,
  },
  {
    name: "Plandetails",
    path: path.Plandetails,
    exact: true,
    element: <Plandetails />,
  },

  {
    name: "Withoutchapters",
    path: path.Withoutchapters,
    exact: true,
    element: <Withoutchapters />,
  },
  {
    name: "Withchapters",
    path: path.Withchapters,
    exact: true,
    element: <Withchapters />,
  },

  {
    name: "Businessdetailpage",
    path: path.Businessdetailpage,
    exact: true,
    element: <Businessdetailpage />,
  },

  {
    name: "Businesslist",
    path: path.Businesslist,
    exact: true,
    element: <Businesslist />,
  },

  {
    name: "Businessform",
    path: path.Businessform,
    exact: true,
    element: <Businessform />,
  },

  {
    name: "Professionalform",
    path: path.Professionalform,
    exact: true,
    element: <Professionalform />,
  },

  {
    name: "Businesseditform",
    path: path.Businesseditform,
    exact: true,
    element: <Businesseditform />,
  },

  {
    name: "Professionaleditform",
    path: path.Professionaleditform,
    exact: true,
    element: <Professionaleditform />,
  },

  {
    name: "Businessdetails",
    path: path.Businessdetails,
    exact: true,
    element: <Businessdetails />,
  },

  {
    name: "Professiondetails",
    path: path.Professiondetails,
    exact: true,
    element: <Professiondetails />,
  },

  {
    name: "Professionaldetailpage",
    path: path.Professionaldetailpage,
    exact: true,
    element: <Professionaldetailpage />,
  },

  {
    name: "NetworkSupport",
    path: path.NetworkSupport,
    exact: true,
    element: <NetworkSupport />,
  },

  {
    name: "Startup",
    path: path.Startup,
    exact: true,
    element: <Startup />,
  },

  {
    name: "Startupnew",
    path: path.Startupnew,
    exact: true,
    element: <Startupnew />,
  },
  ...jobroutes
  ,
  {
    name: "Startupform",
    path: path.Startupform,
    exact: true,
    element: <Startupform />,
  },

  {
    name: "Investorform",
    path: path.Investorform,
    exact: true,
    element: <Investorform />,
  },

  {
    name: "Startupprofile",
    path: path.Startupprofile,
    exact: true,
    element: <Startupprofile />,
  },

  {
    name: "Investorprofile",
    path: path.Investorprofile,
    exact: true,
    element: <Investorprofile />,
  },

  {
    name: "Startupeditprofile",
    path: path.Startupeditprofile,
    exact: true,
    element: <Startupeditprofile />,
  },

  {
    name: "Investoreditprofile",
    path: path.Investoreditprofile,
    exact: true,
    element: <Investoreditprofile />,
  },

  {
    name: "StartupList",
    path: path.StartupList,
    exact: true,
    element: <StartupList />,
  },

  {
    name: "InvestorList",
    path: path.InvestorList,
    exact: true,
    element: <InvestorList />,
  },

  {
    name: "Startupdetails",
    path: path.Startupdetails,
    exact: true,
    element: <Startupdetails />,
  },

  {
    name: "Investordetails",
    path: path.Investordetails,
    exact: true,
    element: <Investordetails />,
  },

  {
    name: "Support",
    path: path.Support,
    exact: true,
    element: <Support />,
  },
  {
    name: "Educationalsupport",
    path: path.Educationalsupport,
    exact: true,
    element: <Educationalsupport />,
  },
  {
    name: "EducationStudentForm",
    path: path.EducationStudentForm,
    exact: true,
    element: <EducationStudentForm />,
  },
  {
    name: "EducationStudentProfile",
    path: path.EducationStudentProfile,
    exact: true,
    element: <EducationStudentProfile />,
  },
  {
    name: "EducationStudentEditprofile",
    path: path.EducationStudentEditprofile,
    exact: true,
    element: <EducationStudentEditprofile />,
  },
  {
    name: "EducationExpertform",
    path: path.EducationExpertform,
    exact: true,
    element: <EducationExpertform />,
  },
  {
    name: "EducationExpertprofile",
    path: path.EducationExpertprofile,
    exact: true,
    element: <EducationExpertprofile />,
  },
  {
    name: "EducationExpertEditprofile",
    path: path.EducationExpertEditprofile,
    exact: true,
    element: <EducationExpertEditprofile />,
  },
  {
    name: "EducationViewExpertprofile",
    path: path.EducationViewExpertprofile,
    exact: true,
    element: <EducationViewExpertprofile />,
  },
  {
    name: "EducationalExpertStudentView",
    path: path.EducationalExpertStudentView,
    exact: true,
    element: <EducationalExpertStudentView />,
  },
  {
    name: "EducationalExpertStudentProfileview",
    path: path.EducationalExpertStudentProfileview,
    exact: true,
    element: <EducationalExpertStudentProfileview />,
  },
  {
    name: "Medicalsupport",
    path: path.Medicalsupport,
    exact: true,
    element: <Medicalsupport />,
  },
  {
    name: "MedicalEndUserform",
    path: path.MedicalEndUserform,
    exact: true,
    element: <MedicalEndUserform />,
  },
  {
    name: "MedicalEnduserProfile",
    path: path.MedicalEnduserProfile,
    exact: true,
    element: <MedicalEnduserProfile />,
  },
  {
    name: "MedicalEnduserEditProfile",
    path: path.MedicalEnduserEditProfile,
    exact: true,
    element: <MedicalEnduserEditProfile />,
  },
  {
    name: "MedicalHospitalForm",
    path: path.MedicalHospitalForm,
    exact: true,
    element: <MedicalHospitalForm />,
  },
  {
    name: "MedicalHospitalProfile",
    path: path.MedicalHospitalProfile,
    exact: true,
    element: <MedicalHospitalProfile />,
  },
  {
    name: "MedicalHospitalEditProfile",
    path: path.MedicalHospitalEditProfile,
    exact: true,
    element: <MedicalHospitalEditProfile />,
  },
  {
    name: "MedicalHospitalServicesForm",
    path: path.MedicalHospitalServicesForm,
    exact: true,
    element: <MedicalHospitalServicesForm />,
  },
  {
    name: "MedicalHospitalServicesList",
    path: path.MedicalHospitalServicesList,
    exact: true,
    element: <MedicalHospitalServicesList />,
  },
  {
    name: "MedicalHospitalServicesView",
    path: path.MedicalHospitalServicesView,
    exact: true,
    element: <MedicalHospitalServicesView />,
  },
  {
    name: "MedicalHospitalServicesEdit",
    path: path.MedicalHospitalServicesEdit,
    exact: true,
    element: <MedicalHospitalServicesEdit />,
  },
  {
    name: "MedicalHospitalView",
    path: path.MedicalHospitalView,
    exact: true,
    element: <MedicalHospitalView />,
  },
  {
    name: "MedicalHospitalServices",
    path: path.MedicalHospitalServices,
    exact: true,
    element: <MedicalHospitalServices />,
  },
  {
    name: "MedicalHospitalServicesdetails",
    path: path.MedicalHospitalServicesdetails,
    exact: true,
    element: <MedicalHospitalServicesdetails />,
  },
  {
    name: "Seniorcitizen",
    path: path.Seniorcitizen,
    exact: true,
    element: <Seniorcitizen />,
  },
  {
    name: "SeniorCitizenForm",
    path: path.SeniorCitizenForm,
    exact: true,
    element: <SeniorCitizenForm />,
  },
  {
    name: "SeniorCitizenProfile",
    path: path.SeniorCitizenProfile,
    exact: true,
    element: <SeniorCitizenProfile />,
  },
  {
    name: "SeniorCitizenEditProfile",
    path: path.SeniorCitizenEditProfile,
    exact: true,
    element: <SeniorCitizenEditProfile />,
  },
  {
    name: "SeniorNGOForm",
    path: path.SeniorNGOForm,
    exact: true,
    element: <SeniorNGOForm />,
  },
  {
    name: "SeniorcitizenNGOProfile",
    path: path.SeniorcitizenNGOProfile,
    exact: true,
    element: <SeniorcitizenNGOProfile />,
  },
  {
    name: "SeniorcitizenNGOEditProfile",
    path: path.SeniorcitizenNGOEditProfile,
    exact: true,
    element: <SeniorcitizenNGOEditProfile />,
  },
  {
    name: "SeniorcitizenNGOServicesForm",
    path: path.SeniorcitizenNGOServicesForm,
    exact: true,
    element: <SeniorcitizenNGOServicesForm />,
  },
  {
    name: "SeniorcitizenNGOServicesList",
    path: path.SeniorcitizenNGOServicesList,
    exact: true,
    element: <SeniorcitizenNGOServicesList />,
  },
  {
    name: "SeniorcitizenNGOServicesView",
    path: path.SeniorcitizenNGOServicesView,
    exact: true,
    element: <SeniorcitizenNGOServicesView />,
  },
  {
    name: "SeniorcitizenNGOServicesEdit",
    path: path.SeniorcitizenNGOServicesEdit,
    exact: true,
    element: <SeniorcitizenNGOServicesEdit />,
  },
  {
    name: "SeniorcitizenNGOServices",
    path: path.SeniorcitizenNGOServices,
    exact: true,
    element: <SeniorcitizenNGOServices />,
  },
  {
    name: "SeniorcitizenNGOView",
    path: path.SeniorcitizenNGOView,
    exact: true,
    element: <SeniorcitizenNGOView />,
  },
  {
    name: "SeniorcitizenNGOServicesdetails",
    path: path.SeniorcitizenNGOServicesdetails,
    exact: true,
    element: <SeniorcitizenNGOServicesdetails />,
  },

  {
    name: "About Members",
    path: path.Aboutmember,
    exact: true,
    element: <Aboutmember />,
  },
  {
    name: "About Members Details",
    path: path.Aboutmemberdetail,
    exact: true,
    element: <Aboutmemberdetail />,
  },
  {
    name: "Become Members",
    path: path.Becamemember,
    exact: true,
    element: <Becamemember />,
  },
  {
    name: "MemberForm",
    path: path.MemberForm,
    exact: true,
    element: <MemberForm />,
  },
  {
    name: "MemberProfile",
    path: path.MemberProfile,
    exact: true,
    element: <MemberProfile />,
  },
  {
    name: "MemberProfileEdit",
    path: path.MemberProfileEdit,
    exact: true,
    element: <MemberProfileEdit />,
  },
  {
    name: "PatronMember",
    path: path.PatronMember,
    exact: true,
    element: <PatronMember />,
  },
  {
    name: "ChiefPatronMember",
    path: path.ChiefPatronMember,
    exact: true,
    element: <ChiefPatronMember />,
  },
  {
    name: "DirectorMember",
    path: path.DirectorMember,
    exact: true,
    element: <DirectorMember />,
  },
  {
    name: "Feedbackform",
    path: path.Feedbackform,
    exact: true,
    element: <Feedbackform />,
  },
  // {
  //   name: "ChatApplication",
  //   path: path.ChatApplication,
  //   exact: true,
  //   element: <ChatApplication />,
  // },
  // {
  //   name: "AllChatApplication",
  //   path: path.AllChatApplication,
  //   exact: true,
  //   element: <AllChatApplication />,
  // },

]