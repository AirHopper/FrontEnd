export const login = async (request) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/auth/login`, {
      body: JSON.stringify(request),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
  
    // get data
    const result = await response.json();
    if (!result?.success) {
      throw new Error(result?.message);
    }
  
    return result?.data;
};

export const register = async (request) => {
  const formData = new FormData();
  formData.append("fullName", request.fullName);
  formData.append("email", request.email);
  formData.append("password", request.password);
  formData.append("phoneNumber", request.phoneNumber);

  const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/v1/auth/register`,
      {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(request),
      }
  );

  // get the data if fetching succeed!
  const result = await response.json();
  if (!result?.success) {
      throw new Error(result?.message);
  }

  return result?.data;
};

export const googleLogin = async (accessToken) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/auth/google`, {
      body: JSON.stringify(accessToken),
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
  });

  // get the data if fetching succeed!
  const result = await response.json();
  if (!result?.success) {
      throw new Error(result?.message);
  }

  return result?.data;
};

export const verifyOTP = async (email, otpCode) => {
  try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/auth/otp/verify`, {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, otpCode }), // Ensure this is a plain object
      });

      const result = await response.json();

      if (!result?.success) {
          throw new Error(result?.message || 'Failed to verify email');
      }

      return result?.data;
  } catch (error) {
      console.error("Verify Email error:", error);
      throw new Error(error.message || 'Something went wrong');
  }
};

export const resendOtp = async (request) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/auth/otp/resend`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
      });
  
      const result = await response.json();
  
      if (!result?.success) {
        throw new Error(result?.message || 'Failed to resend OTP');
      }
  
      return result?.data;
    } catch (error) {
      console.error("Resend OTP error:", error);
      throw new Error(error.message || 'Something went wrong');
    }
};

export const forgotPassword = async (email) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/auth/password/forgot`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
      body: JSON.stringify({ email }),
  });

  // get the data if fetching succeed!
  const result = await response.json();
  if (!result?.success) {
      throw new Error(result?.message);
  }
  return result?.data;
};

export const resetPassword = async (request) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/auth/password/reset`, {
    body: JSON.stringify(request),
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  // get data
  const result = await response.json();
  if (!result?.success) {
    throw new Error(result?.message);
  }

  return result?.data;
};

