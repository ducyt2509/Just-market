import axios from "axios";
import { configure } from "axios-hooks";

export default () => {
  const axiosInstance = axios.create({
    baseURL: "http://localhost:3333",
    headers: {
      "Content-Type": "application/json",
    },
  });

  axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("accessToken");
    console.log("Token axiosInstance", token);
    if (token) {
      config.headers.Authorization = `Bearer ` + token;
    } else {
      delete config.headers.Authorization;
    }
    return config;
  });
  console.log("axiosInstance", axiosInstance);
  configure({ axios: axiosInstance });
};
