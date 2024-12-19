import { useNavigate } from "@tanstack/react-router";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { setToken, setUser } from "../../redux/slices/auth";

// Fungsi untuk validasi token secara frontend
const isValidToken = (token) => {
  if (!token) return false;

  try {
    // Token harus memiliki 3 bagian: header.payload.signature
    const [header, payload, signature] = token.split(".");
    if (!header || !payload || !signature) {
      return false;
    }

    // Decode payload untuk memastikan itu base64 valid
    const decodedPayload = atob(payload);
    const parsedPayload = JSON.parse(decodedPayload);

    // Cek apakah token memiliki field exp (expired time) dan belum kadaluarsa
    const currentTime = Math.floor(Date.now() / 1000);
    if (parsedPayload.exp && parsedPayload.exp < currentTime) {
      return false; // Token kadaluarsa
    }

    return true; 
  } catch (error) {
    return false; // Jika error saat mem-parse, token tidak valid
  }
};

const Protected = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const [isChecking, setIsChecking] = useState(true); // State untuk menunggu validasi token

  useEffect(() => {
    // Validasi token hanya jika sudah ada token
    if (token) {
      if (!isValidToken(token)) {
        dispatch(setToken(null));
        dispatch(setUser(null));
        navigate({ to: "/login" });
      }
    } else {
      // Jika tidak ada token, langsung redirect
      navigate({ to: "/" });
    }
    setIsChecking(false); // Validasi selesai
  }, [token, navigate, dispatch]);

  // Tampilkan loading saat sedang mengecek token
  if (isChecking) return <div>Loading...</div>;

  return children;
};

export default Protected;
