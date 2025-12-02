import axios from "axios";

const API = axios.create({
  baseURL: "http://192.168.1.2:8080", // <-- poné tu IPv4 aquí
});

export default API;
