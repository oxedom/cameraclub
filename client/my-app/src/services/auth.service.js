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
        return (err, console.log(err + "error here in 22"))
      }
      else if (response.data.token) {
        console.log(response + 1)
        localStorage.setItem("user", JSON.stringify(response.data.user))
        localStorage.setItem("token", JSON.stringify(response.data.token))

        console.log(response.data.user);
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
