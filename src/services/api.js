// api.js

import axios from 'axios';

// const BASE_URL = 'http://localhost:3000/api'; // Replace with your backend API URL
const BASE_URL = 'https://hrsystem.vercel.app/api'; // Replace with your backend API URL

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json'
        // Add any headers you need (e.g., authorization headers)
    }
});

const getCandidates = () => {
    return api.get('/forms');
};


const addCandidate = (formData) => {
    console.log('formData:', formData);
    // return api.post('/forms', formData);
    return api.post('/forms', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            
        },
        
        
    });
};

// Add more API functions as needed

export default {
    getCandidates,
    addCandidate
};
