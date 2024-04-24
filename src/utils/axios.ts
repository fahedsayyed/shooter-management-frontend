import axios, { AxiosError, AxiosRequestConfig } from "axios";
import Cookies from "js-cookie";
import { notifyMessage } from "./toastNotify";
import { getClaimsFromToken } from "src/services/token/verifyToken";
import { jwtDecode } from "jwt-decode";

// -----------------------------------------------------------------------------------------------------

const isPageReload = () => {
  const navigation = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming;

  return navigation?.type === "reload";
};

const isAuthenticated = () => {

  return !!Cookies.get("accessToken");
};

// Function to refresh the token
async function refreshToken() {
  const refreshToken = Cookies.get('refreshToken');
  const { userId }: any = getClaimsFromToken(refreshToken);

  if (!refreshToken || !userId) {
    window.location.href = '/auth/login';
  }

  const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/auth/refresh-token`, {
    refreshToken,
    userId,
  });

  console.log(response, "response of refresh token --");

  const newAccessToken = response.data.accessToken;
  localStorage.setItem('accessToken', newAccessToken);

  const endTime = new Date().getTime();
  console.log('After API call to refresh token:', endTime);

  return newAccessToken;
}

// Function to set a timer for token refresh every 10 minutes
function setRefreshTokenTimer() {

  return setInterval(async () => {
    try {
      await refreshToken();
    } catch (error) {
      console.error('Error refreshing token:', error);
    }
  }, 10 * 60 * 1000);
}

const axiosServices = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

let refreshTokenTimer: any;

// Request interceptor to attach Authorization header
axiosServices.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    if (!isPageReload()) {
      window.location.href = "/auth/login";
    }

    return Promise.reject(error);
  }
);

// Response interceptor to handle token refresh on 401 errors
axiosServices.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      try {
        const newToken = await refreshToken();
        error.config.headers['Authorization'] = `Bearer ${newToken}`;

        return axiosServices(error.config);
      } catch (refreshError) {

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export function startTokenRefreshTimer() {
  refreshTokenTimer = setRefreshTokenTimer();

  const startTime = new Date().getTime();
  console.log(refreshTokenTimer, "Timer of token start --", startTime, "Start Time --")
}

export function stopTokenRefreshTimer() {
  clearInterval(refreshTokenTimer);
  console.log("Timer of refresh-token destroyed --")

}

if (!isPageReload() && isAuthenticated()) {
  startTokenRefreshTimer();
}

export default axiosServices;