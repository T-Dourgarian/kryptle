import axios from 'axios';

export const postSolution = async (kryptoId, equation, seconds) =>{
    try { 
        const { data }  = await axios.post(`${process.env.REACT_APP_API_URL}/solution`,
        {
          id: kryptoId,
          solution: equation,
          solutionSeconds: seconds
        });
  
        return data;
  
      } catch(error) {
        console.log(error);
      }
}