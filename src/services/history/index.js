export const getHistory = async (startDate, endDate, orderId) => {
  let params = {};
  if (startDate) {
    params["search[startBookingDate]"] = startDate;
  }
  if (endDate) {
    params["search[endBookingDate]"] = endDate;
  }
  if (orderId) {
    params["search[orderId]"] = orderId;
  }

  let url =
    `${import.meta.env.VITE_API_URL}${import.meta.env.VITE_API_VERSION}/orders?` +
    new URLSearchParams(params);

  const token = localStorage.getItem("token");

  const response = await fetch(url, {
    method: "GET",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  const result = await response.json();
  if (!result?.success) {
    throw new Error(result?.message);
  }
  return result?.data;
};

export const getOrderId = async (query) => {
  let params = {};

  if (query) {
    params["search[orderId]"] = orderId;
  }

  let url =
    `${import.meta.env.VITE_API_URL}${import.meta.env.VITE_API_VERSION}/orders?` +
    new URLSearchParams(params);

  const token = localStorage.getItem("token");

  const response = await fetch(url, {
    method: "GET",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  const result = await response.json();
  if (!result?.success) {
    throw new Error(result?.message);
  }
  return result?.data;
};
