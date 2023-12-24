import axios from "axios";
import store from "../store";
import { updateUserData } from "../redux/UserSlice";

const { dispatch } = store;

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
        try {
            await axiosInstance.post('/auth/refresh');
            return axiosInstance.request(error.config)
        } catch(error) {
            dispatch(updateUserData({
                username: '',
                userId: ''
            }))
            return Promise.reject(error);
        }
    }

    return Promise.reject(error);
});

export default axiosInstance