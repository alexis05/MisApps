import axios from "axios";
import Cookies from "universal-cookie";
const isHandlerEnabled = (config = {}) => {
  return config.hasOwnProperty("handlerEnabled") && !config.handlerEnabled
    ? false
    : true;
};

const requestHandler = (request) => {
  if (isHandlerEnabled(request)) {
    const cookies = new Cookies(request.headers.cookies);
    const token = cookies.get("sidtk");
    if (token) request.headers["Authorization"] = "Bearer " + token;
  }
  return request;
};

const axiosInstance = axios.create({
  baseURL: `http://localhost:3001/`,
  timeout: 1000,
});

axiosInstance.interceptors.request.use((request) => requestHandler(request));

export default axiosInstance;
