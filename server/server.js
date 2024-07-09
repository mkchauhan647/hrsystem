// server.js

const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const candidateRoutes = require('./routes/candidateRoutes');

const app = express();

// Middleware
app.use(express.json());
app.use(fileUpload());

// Database connection
const db = require('./utils/db');
db.connect();

// Routes
app.use('/api', candidateRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
