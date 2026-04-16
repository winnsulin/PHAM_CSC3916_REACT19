import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const getMovies = async () => {
  const token = localStorage.getItem('token');  
  const res = await axios.get(`${API_URL}/movies`, {
    headers: { Authorization: `JWT ${token}` }  // 'JWT '
  });
  return res.data;
};