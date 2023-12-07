import axios from '../axios';
import useAuth from './useAuth';
const useRefreshToken = () => {

    const { setAuth } = useAuth();

    const refresh = async () => {
        const response = await axios.post('/auth/refresh')
        setAuth(prev => {
            return { ...prev, access_token: response.data.access_token}
        })

        return response.data.access_token;
    }


    return refresh
};

export default useRefreshToken;