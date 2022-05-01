import axios from "axios";

const API_URL = "http://localhost:4000/api/user/";

const register = (username, email, password) => {
  return axios.post(API_URL + "register", {
    username,
    email,
    password,
  });
};

const login = (username, password) => {
  return axios
    .post(API_URL + "login", {
      username,
      password,
    })
    .then((response,err) => {
      if (err){
        return (err)
      }
      else if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data))
        console.log(response.data);
      }
      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  register,
  login,
  logout,
};

export default authService;
