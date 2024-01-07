import axios from "axios";

const instance = axios.create({
    baseURL: import.meta.env.VITE_RIJKS_API_URL
});

console.log("base:",import.meta.env.VITE_RIJKS_API_URL );
instance.interceptors.response.use(
    ({ data }) => data,
    ({ message, response }) => Promise.reject(response ? response.data : message)
);
  
export default instance;