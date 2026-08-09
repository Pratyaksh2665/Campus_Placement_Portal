import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // apne backend ka actual port + prefix daalo
  withCredentials: true,
});

export default api;
