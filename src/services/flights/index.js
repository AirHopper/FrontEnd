export const getFlights = async (page = 1, pageSize = 10) => {
  let params = {};
  if (page) {
    params.page = page;
  }
  if (pageSize) {
    params.pageSize = pageSize;
  }

  let url =
    `${import.meta.env.VITE_API_URL}${import.meta.env.VITE_API_VERSION}/flights?` +
    new URLSearchParams(params);

  const response = await fetch(url, {
    method: "GET",
  });

  // get data
  const result = await response.json();
  if (!result?.success) {
    throw new Error(result?.message);
  }
  return result;
};
