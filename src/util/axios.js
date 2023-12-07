import axios from "axios";
import refreshTokens from "./refreshTokens";

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
	credentials: 'include',
    withCredentials:true
})


axiosInstance.interceptors.response.use(async res => {
    return res
}, async (error) => {
    if (error.response.data.statusCode === 401) {
        await refreshTokens();
        return axiosInstance.request(error.config)
    }
});

export default axiosInstance