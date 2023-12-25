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
      `/dailykrypto/game`
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
      email: 'asdf@gmail.com',
      username,
      password
    })

    return response.data

  } catch(error) {
    return error.response.data;
  }
}

const getUserStats = async () => {
  try {

    const response = await axios.get(`/stats/user`);

    return response.data;

  } catch(error) {
    return error.response.data;
  }
}

const getUserGameData = async () => {
  try {
    const response = await axios.get('/dailykrypto/user');

    return response.data;
  } catch(error) {
    console.log(error)
  }
}

const fetchLeaderboardData = async (orderBy) => {
  try {
    const response = await axios.get('/stats/leaderboard', {
      params: {
        orderBy
      }
    });

    return response.data;
  } catch(error) {
    console.log(error)
  }
}

export { 
  postSolution, 
  getDailyKrypto, 
  login, 
  logout, 
  signUp,
  getUserStats,
  getUserGameData,
  fetchLeaderboardData
};
