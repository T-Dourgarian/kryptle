import axios from './axios';
import { useDispatch } from 'react-redux';
// import { updateUserData } from '../../redux/UserSlice';

const refreshTokens = async () => {
    await axios.post('/auth/refresh');
};

export default refreshTokens;