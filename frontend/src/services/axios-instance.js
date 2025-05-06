// src/services/axios-instance.js
import axios from 'axios';

const api = axios.create({
    baseURL: '/',              // confía en el proxy de CRA
});

api.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;
