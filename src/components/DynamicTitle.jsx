import React, { useEffect } from "react";
import { useLocation } from "@tanstack/react-router"; // Jika Anda menggunakan TanStack Router

const DynamicTitle = () => {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    switch (path) {
      case "/":
        document.title = "Home - AirHopper";
        break;
      case "/login":
        document.title = "Login - AirHopper";
        break;
      case "/register":
        document.title = "Register - AirHopper";
        break;
      case "/profile":
        document.title = "Profile - AirHopper";
        break;
      case "/notification":
        document.title = "Profile - AirHopper";
        break;
      case "/forgot-password":
        document.title = "Settings - AirHopper";
        break;
      case "/reset-password":
        document.title = "Settings - AirHopper";
        break;
      case "/verify-otp":
        document.title = "Verify - AirHopper";
        break;
      // Tambahkan case untuk URL lain sesuai kebutuhan
      default:
        document.title = "AirHopper";
    }
  }, [location.pathname]); // Update title setiap kali pathname berubah

  return null; // Tidak perlu render apa pun
};

export default DynamicTitle;
