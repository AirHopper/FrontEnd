import { format } from "date-fns";

export const getHistory = async (flightDate) => {
  let params = {};
  // if (flightDate) {
  //   params["search[flightDate]"] = format(new Date(flightDate), "yyyy-MM-dd");
  // }

  let url =
    `${import.meta.env.VITE_API_URL}${import.meta.env.VITE_API_VERSION}/orders?` +
    new URLSearchParams(params);

  const response = await fetch(url, {
    method: "GET",
  });

  const result = await response.json();
  if (!result?.success) {
    throw new Error(result?.message);
  }
  return result?.data;
};
