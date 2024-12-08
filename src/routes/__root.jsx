import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { GoogleOAuthProvider } from "@react-oauth/google";

export const Route = createRootRoute({
  component: () => (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID}>
      {/* Navbar */}

      <Outlet />

      {/* This is for debugging router */}
      <TanStackRouterDevtools />

      {/* React Toastify */}
      {/* <ToastContainer theme="colored" /> */}
    </GoogleOAuthProvider>
  ),
});
