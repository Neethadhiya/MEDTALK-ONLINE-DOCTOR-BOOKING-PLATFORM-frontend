import axios from "axios";
import { baseUrl } from "../utils/constants";

const baseURL = `${baseUrl}/accounts/`;
const publicInstance = axios.create({
  baseURL: baseURL,
});

export default publicInstance;
