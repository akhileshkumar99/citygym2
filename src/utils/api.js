import axios from 'axios';

const API = axios.create({
  baseURL: "https://citygym1.onrender.com/api"   // 🔥 backend render link
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
