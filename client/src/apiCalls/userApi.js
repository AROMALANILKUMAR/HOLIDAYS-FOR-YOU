import axios from "axios";
const serverUrl = import.meta.env.VITE_REACT_APP_SERVER_URL;

const userInstance = axios.create({
  baseURL: serverUrl,
  timeout: 60000,
  headers: {
    "Content-Type": "application/json",
  },
});
userInstance.interceptors.request.use(
  (config) => {
    const userToken = localStorage.getItem("userToken");

    if (userToken) {
      config.headers.Authorization = `Bearer ${userToken}`;
    }
    console.log(config);
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export const register = (values) => userInstance.post("/register", values);
export const login = (values) => userInstance.post("/login", values);
export const fetchUser = () => userInstance.get("/profile");

export const createPlace = (values) => userInstance.post("/places", values);
export const booking = (values) => userInstance.post("/booking", values);

export const fetchBookings = () => userInstance.get("/bookings");

export const bookedDetails= (bookingId) => userInstance.get(`/bookings/${bookingId}`)
