import axios from 'axios';
import Swal from 'sweetalert2';


const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/',
  headers: {
    'Content-Type': 'application/json'
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  response => response,
  error => {
    Swal.fire('Error', error.response?.data?.message || 'Something went wrong', 'error');
    return Promise.reject(error);
  }
);

export default api;