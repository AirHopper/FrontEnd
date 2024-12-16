export const getHistory = async (params) => {
  const queryParams = new URLSearchParams();

  if (params.startDate)
    queryParams.append("search[startFlightDate]", params.startDate);
  if (params.endDate)
    queryParams.append("search[endFlightDate]", params.endDate);
  if (params.orderId) queryParams.append("search[orderId]", params.orderId);

  const token = localStorage.getItem("token");
  const url = `${import.meta.env.VITE_API_URL}${import.meta.env.VITE_API_VERSION}/orders?${queryParams.toString()}`;

  const response = await fetch(url, {
    method: "GET",
  });

  const result = await response.json();
  if (!result?.success) {
    throw new Error(result?.message);
  }
  return result?.data;
  try {
    const response = await fetch(url, {
      headers: {
        authorization: `Bearer ${token}`,
      },
      method: "GET",
    });
    const result = await response.json();

    if (!result?.success) {
      throw new Error(result?.message);
    }

    return result?.data;
  } catch (error) {
    console.error("Error fetching tickets:", error.message);
    throw error;
  }
};
