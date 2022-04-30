import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:4000/api/";

const getPublicContent = () => {
  return axios.get(API_URL+ "user" );
};

const getUserBoard = () => {
  return axios.get(API_URL + "user", { headers: authHeader() });
};

const getModeratorBoard = () => {
  return axios.get(API_URL + "post", { headers: authHeader() });
};

const getAdminBoard = () => {
  return axios.get(API_URL + "comment", { headers: authHeader() });
};

const userService = {
  getPublicContent,
  getUserBoard,
  getModeratorBoard,
  getAdminBoard,
};

export default userService