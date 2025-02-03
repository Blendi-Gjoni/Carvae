import axios from "axios";
import store from "../redux/store";
import { logout } from "../redux/authSlice";

const api = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        console.error("Session expired. Logging out...");
        store.dispatch(logout());
      }
      return Promise.reject(error.response.data);
    } else if (error.request) {
      console.error("No response received from the server");
    } else {
      console.error("Error in making request: ", error.message);
    }
    return Promise.reject(error);
  }
);

export default api;
