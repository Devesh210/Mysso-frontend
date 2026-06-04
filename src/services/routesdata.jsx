import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import { routes } from "./routes";
import ProtectedRoute from "./ProtectedRoute";
import LayoutWrapper from "../components/common/LayoutWraper"
// const Layout = ({ children }) => {
//   const location = useLocation();
//   const noHeaderFooterPaths = [
//     "/register",
//     "/registerdetail",
//     "/login",
//     "/forgotpassword",
//     "/resetpassword",
//   ];
//   const showHeaderFooter = !noHeaderFooterPaths.includes(
//     location.pathname.toLowerCase()
//   );
//   console.log(showHeaderFooter);
//   return (
//     <>
//       {showHeaderFooter && <Header />}
//       {children}
//       {showHeaderFooter && <Footer />}
//     </>
//   );
// };
function RoutesData() {
  return (
    <>
      <Router>
        {/* <Layout> */}
        <Routes>
          {routes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              // element={
              //   isAuthenticated ? route.element : <Navigate to="/" replace />
              // }
              // element={<ProtectedRoute element={route.element} />}
              element={
                <LayoutWrapper layout={route.layout || ""} >
                  {route.element}
                </LayoutWrapper>
              }
            />

          ))}
        </Routes>
        {/* </Layout> */}
      </Router>
    </>
  );
}
export default RoutesData;