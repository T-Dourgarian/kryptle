import axios from './axios';

const postSolution = async (kryptoId, equation, seconds, formattedSolution) => {
  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_API_URL}/solution`,
      {
        kryptoId,
        solution: equation,
        solutionSeconds: seconds,
        formattedSolution
      }
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

const getDailyKrypto = async () => {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_API_URL}/dailykrypto`
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

const login = async (username, password) => {
  try {
    const response = await axios.post(`/auth/local/signin`,
    {
      username,
      password
    }, {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true
    })

    return response.data
  } catch(error) {
    return error.response.data;
  }
}

const logout = async (currentSeconds) => {
  try {
    const response = await axios.post(`/auth/logout`, { currentSeconds });

    return response.data
  } catch(error) {
    return error.response.data;
  }
}


const signUp = async (email, username, password) => {
  try {

    const response = await axios.post(`/auth/local/signup`,{
      email,
      username,
      password
    })

    return response.data

  } catch(error) {
    return error.response.data;
  }
}

export { postSolution, getDailyKrypto, login, logout, signUp };
