import axios from "axios";
import Cookies from "js-cookie";

const token = Cookies.get("userToken");

const instance = axios.create({
  baseURL: "http://localhost:4000",
  headers: {
    Authorization: token ? `Bearer ${token}` : "undefined",
  },
});

export default instance;
