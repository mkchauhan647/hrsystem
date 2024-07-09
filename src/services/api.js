// api.js

import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api'; // Replace with your backend API URL

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json'
        // Add any headers you need (e.g., authorization headers)
    }
});

const getCandidates = () => {
    return api.get('/candidates');
};

const addCandidate = (formData) => {
    return api.post('/candidates', formData);
};

// Add more API functions as needed

export default {
    getCandidates,
    addCandidate
};
