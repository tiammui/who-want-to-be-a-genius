import axios from "axios";

export const baseURL = process.env.REACT_APP_BASE_URL;
export * from "./request";

const axiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json, text/plain, */*",
  },
});

// https://dev.to/charlintosh/setting-up-axios-interceptors-react-js-typescript-12k5
// This adds a token before all the requests.
// https://stackoverflow.com/questions/57251719/acquiring-a-new-token-with-axios-interceptors
const onRequest = (request) => {
  request.headers.Authorization = localStorage.getItem("key-here") || "";
  return request;
};

const onRequestError = (error) => {
  return Promise.reject(error);
};

const onResponse = (response) => {
  return response;
};

const onResponseError = (error) => {
  const statusCode = error.response.status;
  if (statusCode === 401) {
    // logout user
  }
  return Promise.reject(error);
};

// https://axios-http.com/docs/interceptors
axiosInstance.interceptors.request.use(onRequest, onRequestError);
axiosInstance.interceptors.response.use(onResponse, onResponseError);

export default axiosInstance;
