import axios from "axios";

// import { baseUrl } from './constants';

const qs = require("qs");

const apiClient = axios.create({
  timeout: 200000,
  baseURL: "/",
  headers: {
    Accept: "*/*",
  },
  withCredentials: true,
  paramsSerializer: (params) => qs.stringify(params, { arrayFormat: "repeat" }),
});

// const apiKey = getCookie("x-api-key") as string;
// apiClient.defaults.headers.common["X-Api-Key"] = apiKey ?? "";
apiClient.interceptors.request.use;

// apiClient.interceptors.request.use(
//   async (config: any) => {
//     const token = getCookie("access_token") as string;
//     if (token) {
//       config.headers!.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

apiClient.interceptors.response.use(
  (resp) => {
    return resp.data;
  },
  (error) => {
    // In case of status 401 user will redirect to login page because of token expire
    if (error?.response?.status === 401) {
      window.location.href = "/authenticate";
      //   deleteCookie("access_token");
    }
    return Promise.reject(error);
  }
);

export default apiClient;
