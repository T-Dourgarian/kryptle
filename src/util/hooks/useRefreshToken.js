import axios from '../axios';
import { useDispatch } from 'react-redux';
import { updateUserData } from '../../redux/UserSlice';

const useRefreshToken = () => {

    const dispatch = useDispatch();

    const refresh = async () => {
        const response = await axios.post('/auth/refresh');

        const { username, id } = response.data;
        console.log(username, id)

        dispatch(updateUserData({ username, userId: id}))

        // return response.data.access_token;
    }


    return refresh
};

export default useRefreshToken;