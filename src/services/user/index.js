export const profile = async () => {
    const token = localStorage.getItem("token");
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/users/profile`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
      method: "GET",
    });
  
    // get data
    const result = await response.json();
    if (!result?.success) {
      throw new Error(result?.message);
    }
  
    return result?.data;
  };

export const updateProfile = async (request) => {
    const token = localStorage.getItem("token");
  
    const formData = new FormData();
    formData.append("fullName", request.fullName);
    formData.append("phoneNumber", request.phoneNumber);
    formData.append("email", request.email);
  
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/users/profile`, {
        headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify(request),
    });
  
    // get data
    const result = await response.json();
    if (!result?.success) {
        throw new Error(result?.message);
    }
  
    return result?.data;
  };

export const changePassword = async (request) => {
    const token = localStorage.getItem("token");
  
    const formData = new FormData();
    formData.append("oldPassword", request.oldPassword);
    formData.append("newPassword", request.newPassword);
    formData.append("confirmPassword", request.confirmPassword);
  
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/users/change-password`, {
        headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify(request),
    });
  
    // get data
    const result = await response.json();
    if (!result?.success) {
        throw new Error(result?.message);
    }
  
    return result?.data;
  };