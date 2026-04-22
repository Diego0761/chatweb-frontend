import axios from 'axios';

const port = 3000;
const URL = `http://${import.meta.env.VITE_IPV4}:${port}` || `http://localhost:${port}`;

const api = axios.create({
  baseURL: URL
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

export default api;