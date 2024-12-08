import { createRootRoute, Outlet, useLocation } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { GoogleOAuthProvider } from "@react-oauth/google";
import NavBar from "../components/Buyer/NavBar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../components/Footer";

export const Route = createRootRoute({
  component: () => {
    const location = useLocation(); // Get the current location
    
    // Define paths where NavBar should be hidden
    const hiddenNavPaths = [
      "/login", 
      "/register", 
      "/forgot-password", 
      "/verify-otp", 
      "/reset-password"
    ]; // Add more paths if needed


    const hiddenFooterPaths = [
      "/verify-otp",
      "/login", 
      "/register", 
      "/forgot-password", 
      "/verify-otp", 
      "/reset-password"
    ];

    const shouldHideNavBar = hiddenNavPaths.includes(location.pathname);
    const shouldHideFooter = hiddenFooterPaths.includes(location.pathname);

    return (
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID}>
        {/* Conditionally render NavBar */}
        {!shouldHideNavBar && <NavBar />}

        {/* Main Content */}
        <Outlet minHeight="100vh"/>

        {!shouldHideFooter && <Footer />}
        {/* This is for debugging router */}
        <TanStackRouterDevtools />

        {/* React Toastify */}
        <ToastContainer theme="colored" />
        {/* <ToastContainer theme="colored" /> */}
      </GoogleOAuthProvider>
    );
  },
});
