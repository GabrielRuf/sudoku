import axios from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
    baseURL: 'http://localhost:3001/',
});

api.interceptors.request.use(
    config => {
        const token = Cookies.get('jwt');
        config.headers.Authorization = token ? `Bearer ${token}` : '';
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export default api;
