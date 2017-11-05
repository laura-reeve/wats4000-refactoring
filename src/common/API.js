// Base API configuration and key

import axios from 'axios';

export const API = axios.create ({
    baseURL: '//api.openweathermap.org/data/2.5/'
}) 

API.interceptors.request.use(function (config) {
    // Set common parameters on each request to the API
    config.params.APPID = 'b3c73779bc0c4c2b403c79bc2f5e5e00';
    config.params.units = 'imperial';
    return config;
}, function(error) {
    return Promise.reject(error);
}); 