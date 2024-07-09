// CandidateForm.js
'use client'
import React, { useState } from 'react';
// import api from '../services/api';
// import validators from '../utils/validators';

const CandidateForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        resume: null,
        portfolio: null
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: files ? files[0] : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Perform form validation
        // if (!validators.validateCandidateForm(formData)) {
        //     // Handle validation errors
        //     return;
        // }
        // Submit data to backend
        try {
            const response = await api.post('/candidates', formData);
            console.log('Candidate submitted successfully!', response.data);
            // Optionally, reset form fields after successful submission
            setFormData({
                name: '',
                email: '',
                phone: '',
                resume: null,
                portfolio: null
            });
        } catch (error) {
            console.error('Error submitting candidate:', error);
            // Handle error state
        }
    };

    return (
        <div className="candidate-form">
            <h2>Submit Candidate</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                </label>
                <label>
                    Email:
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                </label>
                <label>
                    Phone:
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
                </label>
                <label>
                    Resume:
                    <input type="file" name="resume" onChange={handleChange} accept=".pdf,.doc,.docx" />
                </label>
                <label>
                    Portfolio:
                    <input type="file" name="portfolio" onChange={handleChange} accept=".pdf,.doc,.docx" />
                </label>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default CandidateForm;
