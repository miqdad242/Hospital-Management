import axios from "axios"; 

const api = axios.create({
  baseURL : process.env.baseURL,
  withCredentials: true,
  validateStatus: function (status) {
    return status < 500; // Resolve only if the status code is less than 500
  }
});

export default api;