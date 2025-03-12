import Axios from "axios";

const createAxiosInstance = () => {
  const apiInstance = Axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_ROUTE,
    headers: { "Content-Type": "application/json" },
  });

  return apiInstance;
};

export const api = createAxiosInstance();
