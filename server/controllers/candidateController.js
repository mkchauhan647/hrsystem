// candidateController.js

const Candidate = require('../models/candidateModel');
const { validationResult } = require('express-validator');
const path = require('path');
const fs = require('fs');

// Function to handle form submission
exports.submitCandidate = async (req, res) => {
    // Handle form data
    const { name, email, phone, education, experience, skills } = req.body;
    const resume = req.files['resume'][0]; // Assuming single file upload
    const coverLetter = req.files['coverLetter'][0]; // Assuming single file upload
    const otherFiles = req.files['otherFiles']; // Assuming multiple file upload

    // Validate data
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        // Create new candidate object
        const newCandidate = new Candidate({
            name,
            email,
            phone,
            education,
            experience,
            skills,
            resume: {
                data: fs.readFileSync(path.join(__dirname, '..', 'uploads', resume.filename)),
                contentType: resume.mimetype
            },
            coverLetter: {
                data: fs.readFileSync(path.join(__dirname, '..', 'uploads', coverLetter.filename)),
                contentType: coverLetter.mimetype
            },
            otherFiles: otherFiles.map(file => ({
                data: fs.readFileSync(path.join(__dirname, '..', 'uploads', file.filename)),
                contentType: file.mimetype
            }))
        });

        // Save candidate to database
        const savedCandidate = await newCandidate.save();
        res.status(201).json(savedCandidate);
    } catch (error) {
        console.error('Error submitting candidate:', error);
        res.status(500).json({ error: 'Server error' });
    }
};
