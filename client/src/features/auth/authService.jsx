import axios from 'axios';

const API_URL = 'http://localhost:5000/api/user/';

const register = async (userData) => {
  const response = await axios.post(API_URL, userData);

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  console.log('account response', response.data);
  return response.data;
};

// LOGIN

const login = async (userData) => {
  const response = await axios.post(API_URL + 'login', userData);

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  return response.data;
};

//LOg out
const logout = async () => {
  localStorage.removeItem('user');
};

const authService = { register, logout, login };
export default authService;
