export const getDetailOrder = async (id) =>{
  const token = localStorage.getItem("token");
  let url = `${import.meta.env.VITE_API_URL}${import.meta.env.VITE_API_VERSION}/orders/${id}`
  const response = await fetch(url,{
    headers: {
      authorization: `Bearer ${token}`,
    },
    method: "GET",
  });
  
  const result = await response.json();
  if (!result?.success) {
    throw new Error(result?.message);
  }
  return result;
}

export const createOrder = async (formdata) =>{
  const token = localStorage.getItem("token");
  const response = await fetch(`${import.meta.env.VITE_API_URL}${import.meta.env.VITE_API_VERSION}/orders`,{
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    method: "POST",
    body: JSON.stringify(formdata),
  });

  const result = await response.json();
  if (!result?.success) {
    throw new Error(result?.message);
  }
  return result;
}