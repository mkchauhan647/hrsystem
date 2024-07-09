// candidateModel.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const candidateSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    education: { type: String, required: true },
    experience: { type: String, required: true },
    skills: { type: String, required: true },
    resume: {
        data: Buffer,
        contentType: String
    },
    coverLetter: {
        data: Buffer,
        contentType: String
    },
    otherFiles: [{
        data: Buffer,
        contentType: String
    }]
});

module.exports = mongoose.model('Candidate', candidateSchema);
