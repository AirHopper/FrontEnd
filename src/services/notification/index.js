export const notifications = async () => {
    const token = localStorage.getItem("token");
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/notifications`, {
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