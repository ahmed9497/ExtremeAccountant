// import { store } from "@state/store";
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

const baseURL = import.meta.env.VITE_APP_SERVER_URL ;
const axiosInstance = axios.create({
  baseURL: baseURL ?? "http://localhost:3000",
});

interface FailedRequests {
  resolve: (value: AxiosResponse) => void;
  reject: (value: AxiosError) => void;
  config: AxiosRequestConfig;
  error: AxiosError;
}
const handleResponse = (response: any): any => {
  // Process the response
  hideLoader();

  // response.data = {
  //   code: response.data.code,
  //   data: response.data.data,
  //   // msg: response.data.msg
  // };
  const res ={
    statusCode:response.status,
    ...response.data
  }

  return res;
};
let failedRequests: FailedRequests[] = [];
let isTokenRefreshing = false;

axiosInstance.interceptors.response.use(
  handleResponse,
  async (error: AxiosError) => {
    
    const status = error.response?.status;
    const originalRequestConfig = error.config!;
    hideLoader();
    if (status !== 401) {
      return Promise.reject(error);
    }

    if (isTokenRefreshing) {
      return new Promise((resolve, reject) => {
        failedRequests.push({
          resolve,
          reject,
          config: originalRequestConfig,
          error: error,
        });
      });
    }

    isTokenRefreshing = true;

    try {
      let  rToken = localStorage.getItem("refresh_token") ;
      
      const response = await axios.get(`${baseURL}/auth/refresh`,{
        headers:{
          'Authorization': `Bearer ${rToken}`
        }
      });
     
      const { accessToken = null, refreshToken = null } = response.data?.data ?? {};
      if (!accessToken || !refreshToken) {
        throw new Error(
          "Something went wrong while refreshing your access token"
        );
      }

      localStorage.setItem("access_token", accessToken);
      localStorage.setItem("refresh_token", refreshToken);

      failedRequests.forEach(({ resolve, reject, config }) => {
        axiosInstance(config)
          .then((response) => resolve(response))
          .catch((error) => reject(error));
      });
    } catch (_error: unknown) {
      console.error(_error);
      failedRequests.forEach(({ reject, error }) => reject(error)); 
      // localStorage.setItem("accessToken", "");
      // localStorage.setItem("refreshToken", "");
      return Promise.reject(error);
    } finally {
      failedRequests = [];
      isTokenRefreshing = false;
    }

    return axiosInstance(originalRequestConfig);
  }
);
axiosInstance.interceptors.request.use(function (config) {
  
  // const token = store.getState()?.user?.user?.tokens?.accessToken;
  showLoader();
  
  
  const token = localStorage.getItem("access_token");
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    
  }
  return config;
});
function showLoader() {
  const loader = document.getElementById("loader");
  if (loader) {
    loader.style.display = "flex";
  }
}

function hideLoader() {
  const loader = document.getElementById("loader");
  if (loader) {
    loader.style.display = "none";
  }
}
export { axiosInstance };
