import axios from "axios";
import dayjs from "dayjs";
import jwt_decode from "jwt-decode";
import { baseUrl } from "../utils/constants";


const URL = `${baseUrl}/`;
const baseURL = `${baseUrl}/patient/`;


const patientAxiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    Authorization: `Bearer ${
      localStorage.getItem("PatientAccessToken")
        ? localStorage.getItem("PatientAccessToken")
        : null
    }`,
  },
});

patientAxiosInstance.interceptors.request.use(async (req) => {
  if (localStorage.getItem("PatientAccessToken")) {
    req.headers.Authorization = `Bearer ${localStorage.getItem(
      "PatientAccessToken"
    )}`;
  }
  const accessTokenUser = jwt_decode(
    localStorage.getItem("PatientAccessToken")
  );
  // console.log('User',accessTokenUser)
  const isAccessTokenExpired =
    dayjs.unix(accessTokenUser.exp).diff(dayjs()) < 1;
  // console.log('access token expired',isAccessTokenExpired)
  if (!isAccessTokenExpired) {
    return req;
  }
  const refreshToken = localStorage.getItem("PatientRefreshToken");
  const refreshTokenUser = jwt_decode(refreshToken);
  const isRefreshTokenExpired =
    dayjs.unix(refreshTokenUser.exp).diff(dayjs()) < 1;
  if (isRefreshTokenExpired) {
    // Handle the case where both access and refresh tokens are expired
    // For example, you might log the user out or redirect to the login page
    // console.log("Both access and refresh tokens are expired");
    // You can add your logic here to handle this situation
  } else {
    // Refresh the access token using the refresh token
    const response = await axios.post(`${URL}api/token/refresh/`, {
      refresh: refreshToken,
    });
    const accessTokenString = JSON.stringify(response.data.access);

    localStorage.setItem("PatientAccessToken", accessTokenString);
    req.headers.Authorization = `Bearer ${response.data.access}`;
    // console.log("token refreshed.....")
  }
  return req;
});
export default patientAxiosInstance;
