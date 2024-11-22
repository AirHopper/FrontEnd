import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { GoogleOAuthProvider } from "@react-oauth/google";
import NavBar from "../components/Buyer/NavBar";

export const Route = createRootRoute({
  component: () => (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID}>
      {/* Navbar */}
      <NavBar />

      <Outlet />

      {/* This is for debugging router */}
      <TanStackRouterDevtools />

      {/* React Toastify */}
      {/* <ToastContainer theme="colored" /> */}
    </GoogleOAuthProvider>
  ),
});
