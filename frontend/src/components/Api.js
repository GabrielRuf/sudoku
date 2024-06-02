import axios from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
    baseURL: 'http://localhost:3001/',
    headers: {
        Authorization: `Bearer ${Cookies.get('jwt')}`
    }
});

export default api;
