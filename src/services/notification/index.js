export const notifications = async (type, q) => {
  let params = {};
  if (type) {
    params.type = type;
  }
  if (q) {
    params.q= q;
  }
  const token = localStorage.getItem("token");
  
  let url =
    `${import.meta.env.VITE_API_URL}${import.meta.env.VITE_API_VERSION}/notifications?` +
    new URLSearchParams(params);

    const response = await fetch(url, {
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

  export const clearNotifications = async () => {
    const token = localStorage.getItem("token");
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/notifications`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
      method: "DELETE",
    });
  
    // get data
    const result = await response.json();
    if (!result?.success) {
      throw new Error(result?.message);
    }
  
    return result?.data;
  };