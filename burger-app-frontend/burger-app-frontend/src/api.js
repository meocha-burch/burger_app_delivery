import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // Update if backend URL changes
  withCredentials: true, // Allows cookies to be sent with requests
});

export default API;
