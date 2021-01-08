import axios from 'axios';

// Backend api base url
let BASE_URL = 'https://handoverapp.herokuapp.com/';

const customInstance = axios.create({
    baseURL: BASE_URL
});

customInstance.interceptors.request.use(function (config) {
    console.log(config);
    if (config.url !== '/login') {
        // Add the JWT token to the Authorization header in all requests others than the login request
        config.headers.Authorization = localStorage.getItem("token").replace("\"", "");
    }
    return config;
}, function (error) {
    if (error.response) {
        if (error.response.status === 403) {
            // 403 status code is sent if JWT expires or user not logged in. 
            // In this case the old JWT is cleared and the user is redirected to the login page.
            localStorage.clear();
            window.location.assign(window.location.hostname);
        }
    }
    return Promise.reject(error);
});

export default customInstance;