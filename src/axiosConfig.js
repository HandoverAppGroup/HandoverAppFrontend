import axios from 'axios';

let BASE_URL = 'http://127.0.0.1:8080';

const customInstance = axios.create({
    baseURL: BASE_URL
});

customInstance.interceptors.request.use(function (config) {
    console.log(config);
    if (config.url !== '/login') {
        config.headers.Authorization = localStorage.getItem("token").replace("\"","");
    }
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

export default customInstance;