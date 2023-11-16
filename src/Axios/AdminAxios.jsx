import axios from "axios";
import dayjs from "dayjs";
import jwt_decode from "jwt-decode";
import { baseUrl } from "../utils/constants";

const baseURL = `${baseUrl}/admin/`;
const URL = `${baseUrl}/`;;

const adminAxiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    Authorization: `Bearer ${
      localStorage.getItem("AdminAccessToken")
        ? localStorage.getItem("AdminAccessToken")
        : null
    }`,
  },
});

adminAxiosInstance.interceptors.request.use(async (req) => {
  if (localStorage.getItem("AdminAccessToken")) {
    req.headers.Authorization = `Bearer ${localStorage.getItem(
      "AdminAccessToken"
    )}`;
  }
  const accessTokenUser = jwt_decode(localStorage.getItem("AdminAccessToken"));
  // console.log('User',accessTokenUser)
  const isAccessTokenExpired =
    dayjs.unix(accessTokenUser.exp).diff(dayjs()) < 1;
  // console.log('expired',isAccessTokenExpired)
  if (!isAccessTokenExpired) {
    return req;
  }
  const refreshToken = localStorage.getItem("AdminRefreshToken");
  const refreshTokenUser = jwt_decode(refreshToken);
  const isRefreshTokenExpired =
    dayjs.unix(refreshTokenUser.exp).diff(dayjs()) < 1;
  if (isRefreshTokenExpired) {
   
  } else {
    // Refresh the access token using the refresh token
    const response = await axios.post(`${URL}api/token/refresh/`, {
      refresh: refreshToken,
    });
    const accessTokenString = JSON.stringify(response.data.access);
    // const response = await axios.post(`${baseURL}api/token/refresh/`,{
    localStorage.setItem("AdminAccessToken", accessTokenString);
    req.headers.Authorization = `Bearer ${response.data.access}`;
  }
  return req;
});

export default adminAxiosInstance;
