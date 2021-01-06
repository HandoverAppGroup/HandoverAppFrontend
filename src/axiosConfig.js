import axios from 'axios';

let BASE_URL = 'https://handoverapp.herokuapp.com/';

const customInstance = axios.create({
    baseURL: BASE_URL
});

customInstance.interceptors.request.use(function (config) {
    console.log(config);
    if (config.url !== '/login') {
        config.headers.Authorization = localStorage.getItem("token").replace("\"", "");
    }
    return config;
}, function (error) {
    if (error.response) {
        if (error.response.status === 403) {
            localStorage.clear();
            window.location.assign(window.location.hostname);
        }
    }
    return Promise.reject(error);
});

export default customInstance;