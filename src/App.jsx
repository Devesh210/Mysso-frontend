import React, { useEffect } from "react";
import RoutesData from "./services/routesdata";
import { setItemWithExpiry, getItemWithExpiry } from "./services/LocalStorageHelper";
import swal from "sweetalert";

import "./App.css";
import "./Responsive.css";
import { useNavigate } from "react-router-dom";

function App() {


  // const handleVisibilityChange = () => {
  //   if (document.visibilityState === "hidden") {
  //     console.log("The page is hidden. Clearing local storage.");
  //     localStorage.clear(); // Clear local storage on tab close
  //     if (["/login", "/Register", "/"].includes(window.location.pathname)) return;
  //     swal({
  //       title: "Your Session Has Expired",
  //       text: "Please log in again to continue.",
  //       icon: "warning",
  //     }).then(() => {
  //       window.location.href = "/login"; // Use window redirect to handle session expiration
  //     });
  //   }
  // };



  useEffect(() => {
   
    // Set an item with a TTL of 4 hours (14400000 ms)
    setItemWithExpiry("myData", "Some data", 14400000);

    // Check and clear expired local storage items on component mount
    const myData = getItemWithExpiry("myData");
    if (!myData) {
      console.log("Data has expired and has been cleared from local storage.");
      swal({
        title: "Your Session Has Expired",
        text: "Please log in again to continue.",
        icon: "warning",
      }).then(() => {
        window.location.href = '/login';
      });
    } else {
      console.log("Data is still valid:", myData);
    }

    // Optional: Set a timeout to clear local storage after a specific duration
    const sessionTimer = setTimeout(() => {
      localStorage.clear();
      console.log("Local storage has been cleared.");
      if (window.location.pathname === '/login' || window.location.pathname === '/Register' || window.location.pathname === '/') return;
      swal({
        title: "Your Session Has Expired",
        text: "Please log in again to continue.",
        icon: "warning",
      }).then(() => {
        window.location.href = '/login';
      });

    }, 14400000); // 4 hour

    // window.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      clearTimeout(sessionTimer); // Clear the session expiration timeout
      // window.removeEventListener("visibilitychange", handleVisibilityChange); // Remove event listener
    };
  }, []);


  return (
    <>
      <RoutesData />
    </>
  );
}

export default App;
